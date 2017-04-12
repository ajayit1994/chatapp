const appController = require('./appController');

class AppRoutes {

    constructor(app) {
        this.app = app;
    }

    appRoutes() {
        this.app.get('/hello', (req, res) => {
            console.log('hello');
            res.send('hello');
        });

        this.app.post('/save/msg', (req, res) => {
            let body = req.body;
            new appController().saveMsg(body, function(err, result) {
                console.log(result);
            });
            res.send('message saved');
        });

        this.app.post('/user/exists', (req, res) => {
            let body = req.body;
            new appController().userExists(body, (err, result) =>
                res.send(result));
        });

        this.app.get('/user/list', (req, res) => {
            new appController().userList((err, result) => {
                res.send(result)
            })
        })
    }

    appRoutesConfig() {
        this.appRoutes();
    }
}

module.exports = AppRoutes