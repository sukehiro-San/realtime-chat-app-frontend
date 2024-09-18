import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { provideHttpClient } from '@angular/common/http';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent, SignupComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(), SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
