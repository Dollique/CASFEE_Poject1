import List from './modules/list.js';
import express from 'express';

class App {
    constructor() {
        this.app = express();
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
boot.getList();
boot.startServer();