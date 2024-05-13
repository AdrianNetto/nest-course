import { randomUUID } from 'crypto';
import { CoursesService } from './courses.service';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let createdAt: Date;
  let expectOutputTags: any[];
  let expectOutputCourses: any[];
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    createdAt = new Date();
    expectOutputTags = [
      {
        id: '1',
        name: 'NestJS',
        createdAt,
      },
    ];
    expectOutputCourses = [
      {
        id: '1',
        name: 'NestJS Course',
        description: 'NestJS course description',
        createdAt,
        tags: expectOutputTags,
      },
    ];
    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };
    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO = {
      name: 'NestJS Course',
      description: 'NestJS course description',
      tags: ['NestJS'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse);
  });

  it('should find all courses', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should update a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO = {
      name: 'NestJS Course',
      description: 'NestJS course description',
      tags: ['NestJS'],
    };

    const updatedCourse = await service.update(id, updateCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(updatedCourse);
  });

  it('should remove a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const removedCourse = await service.remove(id);

    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(removedCourse);
  });

  it('should find a course by id', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const course = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });
});
