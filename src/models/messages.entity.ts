import * as TypeORM from 'typeorm'

import Clusters from './Cluster.entity'
@TypeORM.Entity()
class Messages extends TypeORM.BaseEntity {
    @TypeORM.PrimaryGeneratedColumn()
    id : number 

    @TypeORM.Column()
    fullname : string

    @TypeORM.Column()
    email : string

    @TypeORM.Column()
    phone : string

    @TypeORM.Column()
    subject : string

    @TypeORM.Column()
    message : string

    @TypeORM.Column()
    created_at : Date

    //cluster 
    @TypeORM.ManyToOne(
        type => Clusters,
        cluster => cluster.id
    )
    clusters : Clusters

    @TypeORM.Column({default : false})
    read : boolean

    @TypeORM.Column()
    updated_at : Date
}

export default Messages