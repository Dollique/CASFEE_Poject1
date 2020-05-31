import List from './modules/list.js';
import Router from './routings/router.js';
import express from 'express';

class App {
    constructor() {
        this.app = express();
    }

    routeTo() {
        this.route = new Router(express);
        this.route.getRoute();
    }

    getList() {
        this.list = new List(this.app);
        this.list.getData();
    }

    startServer() {
        this.app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    }
}

const boot = new App;
boot.routeTo();
boot.startServer();