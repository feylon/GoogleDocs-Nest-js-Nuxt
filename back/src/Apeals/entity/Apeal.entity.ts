import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { E_Status } from "../types/type";
import { User } from "src/User/entity/User.entity";
import { Service } from "src/Services/entity/Services.entity";
import { Department } from "src/Department/entity/Department.entity";
import { Work } from "src/Work/entity/Work.entity";

@Entity({ name: "Apeals" })
export class Apeal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", nullable: false })
    content: string;

    @Column({ type: "timestamptz", nullable: false })
    deadline: Date;

    @Column({ type: "timestamptz", nullable: false })
    doneTime: Date;

    @Column({ type: "enum", enum: E_Status, default: E_Status.Expected })
    status: string;

    @Column({ type: "text", nullable: true })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    // Jo'natuvchi shaxslar uchun Apeals.fromUser[] => User.SendApeals 
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "fromUser" })
    fromUser: User;

    // Qabul qiliuvchi Apeals.responsible[] => User
    @ManyToOne(() => User, { nullable: true })
    @JoinTable({ name: "responsible" })
    responsible: User;

    // Apeals [] => Service
    @ManyToOne(() => Service, { onDelete: "CASCADE", nullable: false })
    @JoinTable({ name: "service_id" })
    service: Service;


    // Apeal [] => Department
    @ManyToOne(() => Department, { onDelete: "CASCADE", nullable: false })
    @JoinTable({ name: 'department_id' })
    department: Department;


    // Apeal [] => Work
    @ManyToOne(() => Work, { onDelete: "CASCADE", nullable: false })
    @JoinTable({ name: "work_id" })
    work : Work;



}