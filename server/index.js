const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const routes = require('../utils/routes');

class Server {
    constructor() {
        this.port = 3020;
        this.host = 'localhost';
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);

    }

    appConfig() {
        this.app.use(bodyParser.json());
    }

    includeRoutes() {
            new routes(this.app, this.socket).routesConfig();
        }
        /* Including app Routes ends*/

    appExecute() {

        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();