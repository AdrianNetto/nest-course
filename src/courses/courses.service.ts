import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException('Course not found :(', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async create(createCourseDTO: any) {
    const courses = this.courseRepository.create(createCourseDTO);

    return await this.courseRepository.save(courses);
  }

  async update(id: number, updateCourseDTO: any) {
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
    });

    if (!course) {
      throw new HttpException('Course not found :(', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
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
}
