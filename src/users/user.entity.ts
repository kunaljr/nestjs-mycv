import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

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
