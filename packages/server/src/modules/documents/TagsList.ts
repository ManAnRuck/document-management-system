import { Query, Resolver } from 'type-graphql';

// Models
import Tag from '../../entity/Tag';

@Resolver(() => Tag)
export default class TagResolver {
  @Query(() => [Tag])
  public async allTags() {
    return Tag.find({ order: { id: 'DESC' }, take: 100 });
  }
}
