import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from '../../shared/services/user.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    private messages;
    private message;
    private userName;
    private socket;

    constructor(private userService: UserService) {
        this.messages = [];
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.userName = this.userService.getUserName();

        this.socket = io.connect('http://localhost:3020');
        let temp = this;
        this.socket.on('sendMsg', (data) => {
            console.log(data);
            temp.messages.push(data);
        });
        
    }

    sendMsg($event) {
        const keyCode = $event.which || $event.keyCode;	
        const selectedUser = this.userService.getSelectedUser();

        if (keyCode === 13 && this.message !== null) {
            this.socket.emit('getMsg',  {
                toid : selectedUser,
                msg : this.message,
                userName : this.userName
            });
            this.message = null;       
        }
    }

    

    

}
