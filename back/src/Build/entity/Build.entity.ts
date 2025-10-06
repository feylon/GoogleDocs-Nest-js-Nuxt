import { Department } from "src/Department/entity/Department.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name : "build"})
export class Build {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Build => Department[] 
    @OneToMany(() => Department, (Department => Department.build), { cascade: true })
    departments: Department[]
}