import { Mutation, Resolver, Arg } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { v4 as uuidV4 } from 'uuid';
import mime from 'mime';

// Models
import Document from '../../entity/Document';
import Tag from '../../entity/Tag';
import File from '../../entity/File';
import { FileInput } from '../../entity/inputs/File';
import docEvents, { NEW_FILE_SAVED } from '../../lib/docEvents';

@Resolver(() => Document)
export default class NewDocument {
  @Mutation(() => Document)
  public async newDocument(
    @Arg('title') title: string,
    @Arg('tags', () => String, { nullable: true }) tags: string[] = [],
    @Arg('file', () => GraphQLUpload) file: FileInput,
  ): Promise<Document> {
    console.log('FILE', file);
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

      const filenameServer = `${uuidV4()}.${mime.getExtension(file.mimetype)}`;

      await new Promise((resolve, reject) => {
        file
          .createReadStream()
          .pipe(
            createWriteStream(
              `${__dirname}/../../../uploads/${filenameServer}`,
            ),
          )
          .on('finish', () => resolve(true))
          .on('error', err => {
            console.log(err);
            return reject(false);
          });
      });

      const newFile = File.create();
      newFile.filename = file.filename;
      newFile.filenameServer = filenameServer;
      newFile.mimetype = file.mimetype;
      newFile.encoding = file.encoding;
      newFile.save();

      docEvents.emit(NEW_FILE_SAVED, newFile);

      const document = Document.create();
      document.title = title;
      document.tags = [...newTags, ...existingTags];
      document.file = newFile;
      return document.save();
    } catch (error) {
      console.log('ERROR', error);
      return Document.create();
    }
  }
}
