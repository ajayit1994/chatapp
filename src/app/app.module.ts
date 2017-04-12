import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ChatComponent } from './pages/chat/chat.component';
import {UserService} from './shared/services/user.service';
import {SocketService} from './shared/services/socket.service';
import {MessageService} from './shared/services/messgae.service';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ChatUserListComponent } from './pages/chat-user-list/chat-user-list.component'

import  {routes} from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    UserListComponent,
    ChatComponent,
    AddUserComponent,
    ChatUserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, SocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
