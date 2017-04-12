import { Component, OnInit } from '@angular/core';
import { SocketService} from '../../shared/services/socket.service';
import { UserService } from '../../shared/services/user.service';
import { MessageService } from '../../shared/services/messgae.service';
import {Http, Response} from '@angular/http'


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    private userList;
    private userName = ''; 
    private socket;
    private socketId;
    private selectedUser;
    constructor(private userService: UserService, private socketService : SocketService, private messageService: MessageService, private http : Http) {
        
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.userName = this.userService.getUserName();

        this.socket = this.socketService.getSocket();

        if(this.userName != undefined && this.userName != null && this.userName != '') {
            this.socketService.emit('userName', this.userName);
        } 

        this.socketService.on('userList', (userList, socketId) =>{
            if(this.socketId == null) {
                this.socketId = socketId;
            }
            this.userService.setSocketId(this.socketId);
            this.userList = userList;
            
        });
    }

    // select the user that you want chat
    seletedUser(userId, userName) {
        this.selectedUser = userId;
        this.userService.setSelectedUser(userId, userName);
        var data = {
            from : this.userName,
            to : userName,
            toUserId : userId,
            fromUserId: this.socketId
        }
        this.socketService.emit('selectedUserMsg', data);
    }


}
