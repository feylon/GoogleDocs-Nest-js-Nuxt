import { User } from "src/User/entity/User.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinTable } from "typeorm";

@Entity({ name: "RefreshToken" })
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "text" })
    token: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinTable({ name: "user_id" })
    user: User;
}