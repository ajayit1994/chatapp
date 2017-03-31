import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private userName;
    private selectedUser;


  constructor() { }
  setUserName(userName) {
      this.userName = userName
  }

  getUserName() {
      return this.userName;
  }

  setSelectedUser(userId) {
    this.selectedUser = userId;
  }

  getSelectedUser() {
      return this.selectedUser;
  }

}
