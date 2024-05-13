import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { INestApplication } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'src/database/orm-cli-config';

describe('CoursesController e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_TEST_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true,
  };

  beforeAll(async () => {
    module: await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();
    app = module.createNestApplication();

    await app.init();

    data = {
      name: 'NestJS',
      description: 'NestJS course description',
      tags: ['NestJS', 'Backend'],
    };
  });

  beforeEach(async () => {
    const dataSources = await new DataSource(dataSourceTest).initialize();
    const repository = dataSources.getRepository(Course);
    courses = await repository.find();
    await dataSource.destroy();
  });
});
