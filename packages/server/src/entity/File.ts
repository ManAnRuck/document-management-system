import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import Document from './Document';

@ObjectType()
@Entity()
export default class File extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({ type: 'text' })
  public filename: string;

  @Field()
  @Column({ type: 'text' })
  public filenameServer: string;

  @Column({ type: 'text' })
  public mimetype: string;

  @Column({ type: 'text' })
  public encoding: string;

  @Column({ type: 'text', nullable: true })
  public content?: string;

  @OneToOne(() => Document, document => document.file)
  public document: Document;
}
