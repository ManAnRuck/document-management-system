import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import Document from './Document';

@ObjectType()
@Entity()
export default class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({ type: 'text', unique: true })
  public title: string;

  @Field(() => [Document], { nullable: true })
  @ManyToMany(() => Document, document => document.tags)
  public documents?: Document[];
}
