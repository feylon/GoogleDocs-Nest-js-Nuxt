import { Build } from "src/Build/entity/Build.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "department" })
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    // Department[] => Build
    @ManyToOne(() => Build, (build => build.departments), { onDelete: "CASCADE" })
    build: Build;
}