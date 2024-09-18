// src/app/services/socket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // URL of the backend server
  }

  // Emit event: Join a chat room
  joinRoom(data: { username: string; room: string }) {
    this.socket.emit('join-room', data);
  }

  // Emit event: Send a message
  sendMessage(data: {
    username: string;
    room: string;
    message: string;
    date: string;
    time: string;
  }) {
    this.socket.emit('chat-message', data);
  }

  // Listen for messages from the server
  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (messageData) => {
        observer.next(messageData);
      });
    });
  }

  getTypingStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('typing', (messageData) => {
        observer.next(messageData);
      });
    });
  }

  // Emit event: Leave a room
  leaveRoom(data: { username: string; room: string }) {
    this.socket.emit('leave-room', data);
  }

  sendTypingStatus(data: { username: string; room: string }) {
    // console.log(data.username + ' is typing.');
    this.socket.emit('typing-start', data);
  }

  sendStopTypingStatus(data: { username: string; room: string }) {
    this.socket.emit('typing-stop', data);
  }

  // Disconnect from the server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
