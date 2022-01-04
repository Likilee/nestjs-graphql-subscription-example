import { Module } from '@nestjs/common';
import { PubSubModule } from 'src/pubsub/pubsub.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
