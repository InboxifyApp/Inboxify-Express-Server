import * as TypeORM from 'typeorm'


@TypeORM.Entity()
class DeadTokens extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id: number;

    @TypeORM.Column({
        nullable : false
    })
    token: string;

    @TypeORM.Column()
    addedat: Date;
}

export default DeadTokens