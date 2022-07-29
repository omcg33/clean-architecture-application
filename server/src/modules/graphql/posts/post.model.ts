import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  // @ts-ignore
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  // @ts-ignore
  @Field(type => Int, { nullable: true })
  votes?: number;
}