import { Mutation, Resolver, Arg } from 'type-graphql';

// Models
import Document from '../../entity/Document';
import Tag from '../../entity/Tag';

@Resolver(() => Document)
export default class NewDocument {
  @Mutation(() => Document)
  public async newDocument(
    @Arg('title') title: string,
    @Arg('tags', () => String, { nullable: true }) tags: string[] = [],
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

      const document = Document.create();
      document.title = title;
      document.tags = [...newTags, ...existingTags];
      return document.save();
    } catch (error) {
      console.log('', error);
      return Document.create();
    }
  }
}
