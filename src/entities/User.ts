import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;
}
