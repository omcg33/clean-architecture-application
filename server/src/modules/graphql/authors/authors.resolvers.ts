import { Resolver, Query, ResolveField, Args, Parent, Int } from '@nestjs/graphql'
import { PostsService } from '../posts/posts.service';

import { Author } from './author.model';
import { AuthorsService } from './authors.service';

// @ts-ignore
@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}
  
  // @ts-ignore
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}