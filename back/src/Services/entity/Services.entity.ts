import { User } from "src/User/entity/User.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "service" })
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 500, unique: true, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 500 })
    description: string;

    @Column({ type: "boolean", default: true, nullable: false })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Services[] => User
    @ManyToOne(()=>User, (user=>user.services), {onDelete : 'CASCADE'})
    user : User;

}
