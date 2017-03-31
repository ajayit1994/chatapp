import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ChatComponent } from './pages/chat/chat.component';
import {UserService} from './shared/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    UserListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
