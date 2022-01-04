import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { AddChatInput } from './dto/add-chat.input';

@Resolver(() => Chat) // 이 애노테이션을 붙여주면 이 클래스가 GraphQL 쿼리를 처리할 수 있다. 리졸버의 인자는 없어도 되지만, 클래스 내에서 부모를 참조하기 위해서는 이 애노테이션을 붙여줘야 한다.
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {} // 의존성 주입으로 서비스를 사용하자

  @Query(() => [Chat])
  async getChats(): Promise<Chat[]> {
    return this.chatService.getChats();
  }

  @Subscription((returns) => Chat)
  messageAdded() {
    return this.pubSub.asyncIterator('messageAdded');
  }

  @Mutation((returns) => Chat)
  async addChat(
    @Args('addChatInput') addChatInput: AddChatInput,
  ): Promise<Chat> {
    const newChat = await this.chatService.addChat(addChatInput);
    this.pubSub.publish('messageAdded', { messageAdded: newChat });
    return newChat;
  }
}
