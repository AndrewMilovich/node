import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { IToken } from '../interface/token.interface';
import { CommonFields } from './commonFields';
import { User } from './user';

@Entity('Tokens', { database: 'db' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
