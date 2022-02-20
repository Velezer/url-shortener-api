import { Url } from "src/url/entities/url.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Url, url => url.user)
    urls: Url[]

    // @BeforeInsert()  
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);  
    // }
}