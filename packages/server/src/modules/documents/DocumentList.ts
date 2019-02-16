import { Query, Resolver } from 'type-graphql';

// Models
import Document from '../../entity/Document';

@Resolver(() => Document)
export default class DocumentResolver {
  @Query(() => [Document])
  public async documents() {
    return Document.find({ relations: ['tags'], order: { id: 'DESC' } });
  }
}
