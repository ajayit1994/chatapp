const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let messageSchema = new Schema({
    from: { type: String },
    to: { type: String },
    messages: { type: Array }
});

let messageModel = mongoose.model('messages', messageSchema);

let userListSchema = new Schema({
    userNames: {
        type: Array
    }
});


let userListModel1 = mongoose.model('userList1', userListSchema);


class appController {
    constructor() {

    }

    saveMsg(msgDetails, callback) {

        messageModel.findOne({ $or: [{ 'from': msgDetails.from }, { 'from': msgDetails.to }, { 'to': msgDetails.from }, { 'to': msgDetails.to }] }, function(err, msg) {
            if (err) {
                callback(err)
            } else if (msg == null) {
                var m = new messageModel({
                    from: msgDetails.from,
                    to: msgDetails.to
                })
                m.messages.push(msgDetails.from + ' says ' + msgDetails.message);
                m.save(function(err, result) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result)
                    }
                })
            } else {
                msg.messages.push(msgDetails.from + ' says ' + msgDetails.message);
                msg.save(function(err, mResult) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, mResult)
                    }
                });
            }
        });
    }


    userExists(userDetails, callback) {

        userListModel1.findOne({ userList: { "$in": [userDetails.userName] } }, function(err, userInfo) {

            if (err) {
                callback(err, null)
            } else {
                userListModel1.findOne({}, function(err, userList) {
                    if (err) {
                        callback(err);
                    } else if (userList == null) {
                        var user = new userListModel1();
                        user.userList.push(userDetails.userName);
                        user.save(function(err, user) {
                            if (err) {
                                callback(err, null)
                            } else {
                                callback(null, false)
                            }
                        })
                    } else if (userInfo && userList) {
                        callback(null, true);
                    } else if (userInfo == null && userList) {
                        userList.userList.push(userDetails.userName);
                        userList.save(function(err, user) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, false)
                            }
                        });
                    }
                })
            }
        })


    }

    userList(callback) {
        userListModel1.findOne({}, function(err, user) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, user.userList);
            }
        })
    }
}

module.exports = appController