import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import Tag from './Tag';
import File from './File';

@ObjectType()
@Entity()
export default class Document extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({ type: 'text' })
  public title: string;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, tag => tag.documents)
  @JoinTable()
  public tags: Tag[];

  @OneToOne(() => File, file => file.document)
  public file: File;
}
