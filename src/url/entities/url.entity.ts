import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    longUrl: string;

    @Column({ unique: true, nullable: false })
    shortName: string;

    @ManyToOne(() => User, user => user.urls)
    user: User;

}
