import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCoursesIdToCoursesTagsTable1715110527239
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const coursesIdColumn = new TableColumn({
      name: 'coursesId',
      type: 'uuid',
      isNullable: true,
    });

    const coursesTagsTable = await queryRunner.getTable('courses_tags_tags');
    if (!coursesTagsTable!.findColumnByName('coursesId')) {
      await queryRunner.addColumn('courses_tags_tags', coursesIdColumn);

      await queryRunner.createForeignKey(
        'courses_tags_tags',
        new TableForeignKey({
          name: 'courses_tags_courses',
          columnNames: ['coursesId'],
          referencedTableName: 'courses',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags_tags', 'courses_tags_courses');
    await queryRunner.dropColumn('courses_tags_tags', 'coursesId');
  }
}
