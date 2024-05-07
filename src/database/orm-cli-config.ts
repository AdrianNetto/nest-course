import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1714742550258 } from "src/migrations/1714742550258-CreateCoursesTable";
import { CreateTagsTable1714744327290 } from "src/migrations/1714744327290-CreateTagsTable";
import { CreateCoursesTagsTable1714745957606 } from "src/migrations/1714745957606-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTags1714746402126 } from "src/migrations/1714746402126-AddCoursesIdToCoursesTags";
import { AddTagsIdToCoursesTagsTable1714746970118 } from "src/migrations/1714746970118-AddTagsIdToCoursesTagsTable";

export const dataSource = new DataSource( {
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1714742550258,
    CreateTagsTable1714744327290,
    CreateCoursesTagsTable1714745957606,
    AddCoursesIdToCoursesTags1714746402126,
    AddTagsIdToCoursesTagsTable1714746970118
  ],
})