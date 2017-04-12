import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

    private socket;
    constructor() {
        this.socket = io.connect('http://localhost:3020');
    }

    // this will give socket instance as a singleton
    getSocket() {
        return this.socket;
    }

    // listen event
    on (eventName, callback) {
        this.socket.on(eventName, function () {
            let args = arguments;
            callback.apply(this.socket, args);
        })
    }

    // broadcast event
    emit (eventName, data) {
        this.socket.emit(eventName, data, function () {
        });
    }
}
