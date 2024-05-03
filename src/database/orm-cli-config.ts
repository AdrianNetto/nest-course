import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1714742550258 } from "src/migrations/1714742550258-CreateCoursesTable";

export const dataSource = new DataSource( {
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1714742550258],
})