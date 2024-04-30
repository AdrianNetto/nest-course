import { Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: "NestJS",
      description: "Curso sobre os fundamentos do framework NestJS",
      tags: ["NestJS", "NodeJS", "JavaScript", "TypeScript"]
    }
  ]

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const findCourse = this.courses.find(course => course.id === id);

    if(!findCourse) {
      return "Course not found :("
    }
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
  }

  update(id: number, updateCourseDTO: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex(course => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDTO
      }
    } else {
      return "Course not found :("
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex(course => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1)
      return "Course deleted!"
    } else {
      return "Course not found :("
    }
  }
}
