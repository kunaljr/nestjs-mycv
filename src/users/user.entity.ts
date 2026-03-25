import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with Id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with Id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with Id ', this.id);
  }
}
