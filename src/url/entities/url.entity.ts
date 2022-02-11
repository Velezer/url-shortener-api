import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    longUrl: string;

    @Column({ unique: true, nullable: false })
    shortUrl: string;

}
