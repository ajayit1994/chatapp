class Routes {
    constructor(app, socket) {
        this.app = app;
        this.io = socket;

        /* 
        	Array to store the list of users along with there respective socket id.
        */
        this.users = [];
    }
    socketEvents() {
        this.io.on('connection', (socket) => {
            socket.on('userName', (userName) => {
                this.users.push({
                    id: socket.id,
                    userName: userName
                });
                let len = this.users.length;
                len--;
                this.io.emit('userList', this.users, this.users[len].id);
            });

            // when client send getMsg event to server
            // this will contain to user, message and username
            socket.on('getMsg', (data) => {
                console.log(data)

                socket.to(data.toid).emit('sendMsg', {
                        msg: data.msg,
                        name: data.userName
                    })
                    // socket.broadcast.to(data.toid).emit('sendMsg', {
                    //     msg: data.msg,
                    //     name: data.userName
                    // })

                // socket.broadcast.emit('sendMsg', {
                //     msg: data.msg,
                //     name: data.userName
                // })
            })
        });
    }

    routesConfig() {
        this.socketEvents();
    }
}


module.exports = Routes;