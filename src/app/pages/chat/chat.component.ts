import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { SocketService } from '../../shared/services/socket.service';



@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    private messages = {};
    private msgs = [];
    private message;

    private userName;
    private socket;
    private selectedUserName;

    constructor(private userService: UserService, private socketService: SocketService) {
        this.messages = [];
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.userName = this.userService.getUserName();

        this.socket = this.socketService.getSocket();

        this.selectedUserName = this.userService.getSelectedUser().selectedUserName;

        this.socketService.on('sendMsg', (data) => {
            //this.messages.push(data.msg);
            if (this.messages[data.from] == undefined) {
                this.messages[data.from] = [];
                this.messages[data.from].push(data.msg);
                this.msgs = this.messages[data.from];
            } else {
                this.messages[data.from].push(data.msg);
                this.msgs = this.messages[data.from];
            }
            
        });

        this.socketService.on('selectedUserMsgList', (data) => {

            
            this.messages[data.to]=[];
            this.messages[data.to] = data.messages;
            this.msgs = this.messages[data.to];
        });

    }

    // send message enter event to server
    sendMsg($event) {

        const selectedUserId = this.userService.getSelectedUser().selectedUserId;
        const selectedUserName = this.userService.getSelectedUser().selectedUserName;
        const socketId = this.userService.getSocketId();
        switch (typeof $event) {
            case 'object': {
                const keyCode = $event.which || $event.keyCode;
                if (keyCode === 13 && this.message !== null) {
                    this.socketService.emit('getMsg', {
                        toid: selectedUserId,
                        fromId: socketId,
                        msg: this.message,
                        from: this.userName,
                        to: selectedUserName
                    });
                }
                break;
            }
            case 'string': {
                this.socketService.emit('getMsg', {
                        toid: selectedUserId,
                        fromId: socketId,
                        msg: this.message,
                        from: this.userName,
                        to: selectedUserName
                    });
            }
            this.messages[selectedUserName].push('You : ' + this.message);
            this.msgs = this.messages[selectedUserName];
                    this.message = null;

        }
        
    }
}
