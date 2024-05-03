import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1714742550258 } from "src/migrations/1714742550258-CreateCoursesTable";
import { CreateTagsTable1714744327290 } from "src/migrations/1714744327290-CreateTagsTable";

export const dataSource = new DataSource( {
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1714742550258,
    CreateTagsTable1714744327290,
  ],
})