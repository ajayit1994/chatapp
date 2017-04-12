const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('../utils/routes');
//const appRoutes = require('../utils/approutes');
let db;

class Server {
    constructor() {
        this.port = 3020;
        this.host = 'localhost';
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);

    }

    appConfig() {

        //this.app.use((req, res, next) => {
        if (db == undefined) {
            mongoose.connect('mongodb://localhost/test');

            db = mongoose.connection;

            db.on('error', console.error.bind(console, 'connection error'));

            db.once('open', function() {
                console.log('mongoDB connection is established');
            });
        }
        //next();
        //})


        this.app.use(bodyParser.json());

        //this.app.use(cors());


    }

    includeRoutes() {
            new routes(this.app, this.socket).routesConfig();
            //new appRoutes(this.app).appRoutesConfig();
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