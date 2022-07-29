import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AuthorsService } from './authors/authors.service';
import { AuthorsResolver } from './authors/authors.resolvers';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      sortSchema: true,
      autoSchemaFile: join(__dirname, './schema.gql'),
    }),
  ],
  providers: [AuthorsService, AuthorsResolver, PostsService]
})
export class GraphqlModule {}
