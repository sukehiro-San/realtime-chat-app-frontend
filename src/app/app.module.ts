import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { SocketService } from './services/socket.service';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    ErrorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(), SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
