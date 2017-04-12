const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash')

let userListSchema = new Schema({
    userNames: {
        type: Array
    },
    socketInfo: {
        type: Array
    }
});

let userListModel = mongoose.model('userList', userListSchema);
let users = [];

let messageSchema = new Schema({
    from: { type: String },
    to: { type: String },
    messages: { type: Array }
});

let messageModel = mongoose.model('messages', messageSchema);


class Routes {
    constructor(app, socket) {
        this.app = app;
        this.io = socket;

        /* 
        	Array to store the list of users along with there respective socket id.
        */
        this.users = [];
        this.sockets = {};
    }
    socketEvents() {
        let me = this;
        this.io.on('connection', (socket) => {
            this.sockets[socket.id] = socket;
            me.users = [];
            socket.on('userName', (userName) => {
                userListModel.findOne({ userNames: { "$in": [userName] } }, function(error, userListInfo) {
                    if (error) {
                        console.error(err);
                    } else {
                        userListModel.findOne({}, function(error, userList) {
                            if (error) {
                                console.error(error)
                                    // first user
                            } else if (userList == null) {
                                var user = new userListModel();
                                user.userNames.push(userName);
                                //user.socketInfo.set(userName, socket.id)
                                let socInfo = {
                                    userName: userName,
                                    id: socket.id
                                }
                                user.socketInfo.push(socInfo);
                                user.save(function(error, user) {
                                        if (error) {
                                            console.error(error)
                                        } else {
                                            me.io.emit('userList', user.socketInfo, socket.id);
                                            //socket.broadcast.to(socket.id).emit('userList', user.socketInfo, socket.id)
                                        }
                                    })
                                    // username exists but socket id is different
                            } else if (userListInfo != null) {

                                var index = userList.socketInfo.map(function(soc, index) {
                                    return soc.userName
                                }).indexOf(userName);
                                userList.socketInfo[index].id = socket.id;

                                userListModel.findOneAndUpdate({
                                        userNames: { "$in": [userName] }
                                    }, { socketInfo: userList.socketInfo }, { upsert: true },
                                    function(error, user) {
                                        if (error) {
                                            console.error(error)
                                        } else {
                                            me.io.emit('userList', userList.socketInfo, socket.id);
                                        }
                                    })
                            } else {
                                userList.userNames.push(userName);
                                let socInfo = {
                                    userName: userName,
                                    id: socket.id
                                }
                                userList.socketInfo.push(socInfo);
                                userList.save(function(error, user) {
                                    if (error) {
                                        console.error(error);
                                    } else {
                                        me.io.emit('userList', user.socketInfo, socket.id);
                                        //socket.broadcast.to(socket.id).emit('userList', user.socketInfo, socket.id)
                                    }
                                });
                            }
                        });
                    }
                });
            });

            // when client send getMsg event to server
            // this will contain to user, message and username
            socket.on('getMsg', (data) => {

                let m = data.from + ' : ' + data.msg;
                socket.broadcast.to(data.toid).emit('sendMsg', {
                    msg: m,
                    from: data.from,
                    fromId: data.fromId
                });
                //socket.broadcast.emit('sendMsg', data.from + ' : ' + data.msg)

                messageModel.findOne({
                    $or: [{ $and: [{ 'from': data.from }, { 'to': data.to }] },
                        { $and: [{ 'from': data.to }, { 'to': data.from }] }
                    ]
                }, function(error, msg) {
                    if (error) {
                        console.error(error)
                    } else if (msg == null) {
                        var m = new messageModel({
                            from: data.from,
                            to: data.to
                        })
                        m.messages.push(data.from + ' : ' + data.msg);
                        m.save(function(error, result) {
                            if (error) {
                                console.error(error)
                            } else {}
                        })
                    } else {
                        msg.messages.push(data.from + ' : ' + data.msg);
                        msg.save(function(error, mResult) {
                            if (error) {
                                console.error(error)
                            } else {}
                        });
                    }
                });
            });


            socket.on('selectedUserMsg', (data) => {
                messageModel.findOne({
                    $or: [{ $and: [{ 'from': data.from }, { 'to': data.to }] },
                        { $and: [{ 'from': data.to }, { 'to': data.from }] }
                    ]
                }, function(error, msg) {
                    if (error) {
                        console.error(error)
                    } else {
                        if (msg == null) {
                            var sendData = {
                                to: data.to,
                                messages: []
                            }
                            socket.emit('selectedUserMsgList', sendData);
                        } else {
                            var sendData = {
                                to: data.to,
                                messages: msg.messages
                            }
                            socket.emit('selectedUserMsgList', sendData);
                        }
                    }
                })
            })


        });
    }

    routesConfig() {
        this.socketEvents();
    }
}


module.exports = Routes;