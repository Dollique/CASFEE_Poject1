import express from 'express';
//import List from './modules/list.js';
import {router} from './routes/router.js';

class App {
    constructor() {
        this.app = express();
    }

    loadRoutes() {
        router.getRoutes(this.app);
    }

    startServer() {
        this.app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    }
}

const boot = new App;
boot.loadRoutes();
boot.startServer();