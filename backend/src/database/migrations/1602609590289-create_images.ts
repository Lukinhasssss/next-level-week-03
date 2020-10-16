import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602609590289 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orphanage_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage', // Pode dar o nome que quiser, esse nome só serve para o caso de querer deletar a foreign key
                    columnNames: ['orphanage_id'], // Coluna que vai armazenar o relacionamento
                    referencedTableName: 'orphanages', // Com qual tabela ela está se relacionando
                    referencedColumnNames: ['id'], // Qual coluna na tabela de orfanatos que está se relacionando
                    onUpdate: 'CASCADE', // Se o id do orfanato mudar o id da imagem também vai mudar
                    onDelete: 'CASCADE' // Se eu excluir um orfanato as imagens também serão excluídas.
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
