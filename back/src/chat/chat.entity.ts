import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field((type) => Int)
  id: number;

  @Field()
  message: string;

  @Field((type) => Int)
  roomId: number;
}
