import { IsEmail, Length, Min } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Index, BeforeInsert } from "typeorm"

import * as bcrypt from 'bcrypt';
import { classToPlain, Exclude } from "class-transformer";

@Entity('user')
export class User extends BaseEntity {
    constructor(){
        super()
    }

    @Exclude()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Index()
    @IsEmail()
    @Column({ unique: true})
    email: string

    @Index()
    @Length(3, 255, {message: 'Username must be at least 3 characters long'})
    @Column({ unique: true})
    username: string

    @Exclude()
    @Length(6, 255)
    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }

    toJSON(){
        return classToPlain(this)
    }

}
