import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {
    private userName;
    private userSocketId
    private selectedUserId;
    private selectedUserName;
    private socket;
    private apiUrl = 'http://localhost:3020';

  constructor(private http : Http) { 
  }
  // set user name at the application level
  setUserName(userName) {
      this.userName = userName;
  }

  setSocketId(socketId) {
      this.userSocketId = socketId
  }

  getSocketId() {
    return this.userSocketId;
  }

  // get the user name of the application level
  getUserName() {
      return this.userName;
  }

  // set the list of selected user at application level
  setSelectedUser(userId, userName) {
    this.selectedUserId = userId;
    this.selectedUserName = userName;
  }

  // get the selected user by user at application level
  getSelectedUser() {
      return {
        selectedUserId : this.selectedUserId,
        selectedUserName : this.selectedUserName
      } 
  }

  userExists() : Observable<any> {
    return this.http.post(this.apiUrl + '/user/exists', {userName : this.userName}).map((res:Response) =>JSON.parse(res.text()));
  }

  userList() : Observable<any> {
      return this.http.get(this.apiUrl + '/user/list').map((res : Response) => JSON.parse(res.text()));
  }

}
