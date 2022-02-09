import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    longUrl: string;

    @Column()
    shortUrl: string;

}
