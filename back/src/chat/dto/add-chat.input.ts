import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddChatInput {
  @Field((type) => Int)
  id: number;

  @Field()
  message: string;

  @Field((type) => Int)
  roomId: number;
}
