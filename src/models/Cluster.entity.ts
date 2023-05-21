import * as TypeORM from 'typeorm'
import Users from './users.schema'

@TypeORM.Entity()
class Cluster extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id : number 

    @TypeORM.Column()
    name : string
    @TypeORM.Column()
    domain : string

    @TypeORM.Column()
    color : string 

    

    @TypeORM.Column()
    description : string

    @TypeORM.Column()
    image : string

    @TypeORM.Column()
    link : string

    @TypeORM.Column()
    created_at : Date

    @TypeORM.Column()
    updated_at : Date


    @TypeORM.ManyToMany(type => Users, user => user.clusters)
    owner : Users[]
    

}

export default Cluster 