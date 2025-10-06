import { Build } from "src/Build/entity/Build.entity";
import { Work } from "src/Work/entity/Work.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    // Department => Work[]
    @OneToMany(()=>Work, (work=>work.department), {onDelete : "CASCADE"})
    works : Work[]
}