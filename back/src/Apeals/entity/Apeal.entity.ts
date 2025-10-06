import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { E_Status } from "../types/type";
import { User } from "src/User/entity/User.entity";
import { Service } from "src/Services/entity/Services.entity";

@Entity({ name: "Apeals" })
export class Apeal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type : "varchar", nullable : false})
    content: string;

    @Column({type : "datetime", nullable : false})
    deadline: Date;

    @Column({type : "datetime", nullable : false})
    doneTime: Date;

    @Column({type :"enum", enum : E_Status, default : E_Status.Expected})
    status: string;

    @Column({type : "text", nullable : true})
    comment: string;

    @CreateDateColumn   ()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    // Jo'natuvchi shaxslar uchun Apeals.fromUser[] => User.SendApeals 
    @ManyToOne(()=>User,{nullable : false})
    @JoinColumn({name : "fromUser"})
    fromUser : User;

    // Qabul qiliuvchi Apeals.responsible[] => User
    @ManyToOne(()=>User, {nullable : true})
    @JoinTable({name : "responsible"})
    responsible : User;

    @ManyToOne(()=>Service, (service=>service))

}