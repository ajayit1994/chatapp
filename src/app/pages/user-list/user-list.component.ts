import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from '../../shared/services/user.service';

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
    constructor(private userService: UserService) {

    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        this.userName = this.userService.getUserName();

        this.socket = io.connect('http://localhost:3020');

        this.socket.emit('userName', this.userName);

        this.socket.on('userList', (userList, socketId) =>{
            if(this.socketId == null) {
                this.socketId = socketId;
            }
            this.userList = userList;
        })

    }

    seletedUser(userId) {
        this.selectedUser = userId;
        this.userService.setSelectedUser(userId);

    }


}
