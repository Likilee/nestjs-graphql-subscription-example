import { Injectable } from '@nestjs/common';
import { Chat } from './chat.entity';
import { AddChatInput } from './dto/add-chat.input';

@Injectable() // 의존성 주입으로 서비스를 사용하자
export class ChatService {
  chats: Chat[];
  constructor() {
    this.chats = [];
  }
  getChats(): Chat[] {
    return this.chats;
  }

  addChat(newChat: AddChatInput): Chat {
    this.chats.push(newChat);
    return newChat;
  }
}
