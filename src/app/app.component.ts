import { Component, OnInit } from '@angular/core';
import {UserService} from './shared/services/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private userName;
    constructor(private userService : UserService) {

    }
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.userName = window.prompt('Enter your name');
        this.userService.setUserName(this.userName);
    }
    

    
   
}
