import { Department } from "src/Department/entity/Department.entity";
import { User } from "src/User/entity/User.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name : "work"})
export class Work {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
    
    // Work[] => Deparment 
    @ManyToOne(()=>Department, (department=>department.works), {cascade : true})
    department : Department;


    // Work [] => User []
    @ManyToMany(()=>User, (user=>user.works))
    users : User[]
}