import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new HttpException('Course not found :(', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);

    return createCourseDTO;
  }

  update(id: number, updateCourseDTO: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse as any) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDTO,
      };
    } else {
      return 'Course not found :(';
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1);
      return 'Course deleted!';
    } else {
      return 'Course not found :(';
    }
  }
}
