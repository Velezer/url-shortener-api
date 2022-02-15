import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    email: string;
    
    @Column({ unique: true})
    username: string;
    
    @Column()
    password: string;

    // @BeforeInsert()  
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);  
    // }
}