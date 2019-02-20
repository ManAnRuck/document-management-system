import { Mutation, Resolver, Arg } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';

// Models
import Document from '../../entity/Document';
import Tag from '../../entity/Tag';
import { FileInput } from '../../entity/inputs/File';
import { createWriteStream } from 'fs';

@Resolver(() => Document)
export default class NewDocument {
  @Mutation(() => Document)
  public async newDocument(
    @Arg('title') title: string,
    @Arg('tags', () => String, { nullable: true }) tags: string[] = [],
    @Arg('file', () => GraphQLUpload) file: FileInput,
  ): Promise<Document> {
    try {
      // TODO upsert tags with return Tag[]
      let existingTags: Tag[] = [];

      if (tags.length) {
        existingTags = await Tag.createQueryBuilder()
          .where('title IN (:...tags)', { tags })
          .getMany();
      }

      let newTags = tags
        .filter(
          tag => !existingTags.some(({ title: tagTitle }) => tagTitle === tag),
        )
        .map(tag => {
          const newTag = new Tag();
          newTag.title = tag;
          return newTag;
        });

      if (newTags.length) {
        newTags = await Promise.all(newTags.map(tag => tag.save()));
      }

      await new Promise((resolve, reject) => {
        file
          .createReadStream()
          .pipe(
            createWriteStream(`${__dirname}/../../../uploads/${file.filename}`),
          )
          .on('finish', () => resolve(true))
          .on('error', err => {
            console.log(err);
            return reject(false);
          });
      });

      const document = Document.create();
      document.title = title;
      document.tags = [...newTags, ...existingTags];
      document.file = file.filename;
      return document.save();
    } catch (error) {
      console.log('ERROR', error);
      return Document.create();
    }
  }
}
