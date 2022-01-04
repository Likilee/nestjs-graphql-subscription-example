import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PubSubModule } from './pubsub/pubsub.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 그래프 큐엘을 Code First로 작성하기 위해서는 이 옵션을 사용해야 한다.
      installSubscriptionHandlers: true, // 그래프 큐엘의
    }),
    ChatModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
