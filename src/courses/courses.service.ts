import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository?: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository?: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });

    if (!course) {
      throw new HttpException('Course not found :(', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map(tag => this.preloadTagByName(tag)),
    );
    const courses = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    return await this.courseRepository.save(courses);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const tags = updateCourseDTO.tags && await Promise.all(
      updateCourseDTO.tags.map(tag => this.preloadTagByName(tag)),
    );
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    });

    if (!course) {
      throw new HttpException('Course not found :(', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException('Course not found :(', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: {
        name,
      },
    });

    return existingTag || this.tagRepository.create({ name });
    
  }
}
