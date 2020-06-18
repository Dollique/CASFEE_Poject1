import express from 'express';
//import List from './modules/list.js';
import {router} from './routes/router.js';

class App {
    constructor() {
        this.app = express();
        this.initCORS();
    }

    initCORS() {
        /* init CORS (middleware) */
        const allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };
        
        this.app.use(allowCrossDomain);
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