import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity({ name: "Apeals" })
export class Apeals {

    id: string;


    content: string;

    deadline: Date;

    doneTime: Date;

    status: string;


    comment: string;

    @CreateDateColumn   ()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}