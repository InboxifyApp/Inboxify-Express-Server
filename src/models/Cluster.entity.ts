import * as TypeORM from 'typeorm'
import Users from './users.schema'
import Messages from './messages.entity'
@TypeORM.Entity()
class Clusters extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id : number 

    @TypeORM.Column()
    name : string
    @TypeORM.Column()
    domain : string

    @TypeORM.Column({nullable : true })
    color : string 

    @TypeORM.Column()
    description : string

    @TypeORM.Column({nullable : true })
    image : string


    @TypeORM.Column()
    created_at : Date

    @TypeORM.Column()
    updated_at : Date

    @TypeORM.OneToMany(type => Messages, message => message.clusters)
    messages : Messages[]


    @TypeORM.ManyToOne(type => Users, user => user.clusters)
    owner : Users[]
    

}

export default Clusters