import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    userName : String = '';
    
  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  addUser(userName) {
      this.userService.setUserName(userName);
  }

}
