// src/app/components/chat/chat.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  username: string = '';
  room: string = '';
  message: string = '';
  messages: Array<any> = [];
  joined: boolean = false;
  messageSub!: Subscription;
  typingSub!: Subscription;
  typingStatuses: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Listen for incoming messages
    this.messageSub = this.socketService
      .receiveMessage()
      .subscribe((message) => {
        this.messages.push(message);
      });
    this.typingSub = this.socketService
      .getTypingStatus()
      .subscribe((message) => {
        if (this.username !== message.username && message.status === 'typing') {
          const index = this.typingStatuses.findIndex(
            (t) => t === message.username
          );
          if (index < 0) {
            this.typingStatuses.push(message?.username);
          }
          console.log(`${message.username} is typing.....`);
        } else if (
          this.username !== message.username &&
          message.status === 'stopped'
        ) {
          const index = this.typingStatuses.findIndex(
            (t) => t === message.username
          );
          if (index > -1) {
            this.typingStatuses.splice(index, 1);
          }
        }
      });
  }

  // Join a chat room
  joinRoom() {
    if (this.username !== '' && this.room !== '') {
      this.socketService.joinRoom({ username: this.username, room: this.room });
      this.joined = true;
    }
  }

  sendTypingStatus() {
    if (this.username !== '' && this.room !== '') {
      this.socketService.sendTypingStatus({
        username: this.username,
        room: this.room,
      });
    }
  }

  stopTyping() {
    this.socketService.sendStopTypingStatus({
      username: this.username,
      room: this.room,
    });
  }

  // Send a chat message
  sendMessage() {
    if (this.message.trim() !== '') {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();

      this.socketService.sendMessage({
        username: this.username,
        room: this.room,
        message: this.message,
        date,
        time,
      });

      this.message = ''; // Clear input
    }
  }

  // Leave the chat room
  leaveRoom() {
    this.socketService.leaveRoom({ username: this.username, room: this.room });
    this.joined = false;
    this.messages = []; // Clear chat history when leaving
  }

  ngOnDestroy(): void {
    // Disconnect from the socket when the component is destroyed
    this.messageSub.unsubscribe();
    this.typingSub.unsubscribe();
    this.socketService.disconnect();
  }
}
