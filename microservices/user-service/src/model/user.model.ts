// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ name: 'name', nullable: true })
//   name: string;
//   @Column({ name: 'email', nullable: true })
//   email: string;

//   @Column({ name: 'birth_date', nullable: true })
//   birthDate: Date;
//   @Column({ name: 'tel_no', nullable: true })
//   telNo: string;

//   @Column({ name: 'active', default: true })
//   active: boolean;

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date;
//   @UpdateDateColumn({ name: 'updated_at' })
//   updateAt: Date;
//   @Column({ name: 'deleted_at', default: false })
//   deleted: Date;
// }

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  // @Column(DataType.DATEONLY)
  // birthday: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
