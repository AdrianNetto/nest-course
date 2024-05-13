import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1714742550258 } from 'src/migrations/1714742550258-CreateCoursesTable';
import { CreateTagsTable1714744327290 } from 'src/migrations/1714744327290-CreateTagsTable';
import { CreateCoursesTagsTable1715107081982 } from 'src/migrations/1715107081982-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1715110527239 } from 'src/migrations/1715110527239-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1715111263469 } from 'src/migrations/1715111263469-AddTagsIdToCoursesTagsTable';
import { Tag } from 'src/courses/entities/tags.entity';
import { Course } from 'src/courses/entities/courses.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1714742550258,
    CreateTagsTable1714744327290,
    CreateCoursesTagsTable1715107081982,
    AddCoursesIdToCoursesTagsTable1715110527239,
    AddTagsIdToCoursesTagsTable1715111263469,
  ],
});
