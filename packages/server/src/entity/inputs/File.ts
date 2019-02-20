import { Stream } from 'stream';
import { InputType } from 'type-graphql';

@InputType()
export class FileInput {
  //   @Field()
  public filename: string;

  //   @Field()
  public mimetype: string;

  //   @Field()
  public encoding: string;

  //   @Field(() => Stream)
  public createReadStream: () => Stream;
}
