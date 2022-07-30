import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ClientService } from '../pages/helpers/services/client.service';
import { PagesModule } from '../pages/pages.module';

import { AuthorsService } from './authors/authors.service';
import { AuthorsResolver } from './authors/authors.resolvers';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [PagesModule],
      inject: [ClientService],
      useFactory: async (clientService: ClientService) => ({
        transformSchema: (schema: GraphQLSchema) => {
          clientService.setGraphQLSchema(schema);
          return schema;
        },
        debug: true,
        playground: false,
        sortSchema: true,
        autoSchemaFile: true,
      }),
    }),
  ],
  providers: [AuthorsService, AuthorsResolver, PostsService]
})
export class GraphqlModule {}
