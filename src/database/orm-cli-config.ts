import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1714742550258 } from "src/migrations/1714742550258-CreateCoursesTable";
import { CreateTagsTable1714744327290 } from "src/migrations/1714744327290-CreateTagsTable";
import { CreateCoursesTagsTable1715107081982 } from "src/migrations/1715107081982-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1715110527239 } from "src/migrations/1715110527239-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1715111263469 } from "src/migrations/1715111263469-AddTagsIdToCoursesTagsTable";

export const dataSource = new DataSource( {
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1714742550258,
    CreateTagsTable1714744327290,
    CreateCoursesTagsTable1715107081982,
    AddCoursesIdToCoursesTagsTable1715110527239,
    AddTagsIdToCoursesTagsTable1715111263469,
  ],
})