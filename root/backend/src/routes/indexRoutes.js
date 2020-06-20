import express from 'express';
import {indexController} from '../controller/indexController.js';

export class IndexRoutes {
    constructor() {
        let router = express.Router();

        router.post("/list", indexController.add.bind(indexController));
        router.put("/list", indexController.put.bind(indexController));
        router.get("/list", indexController.list.bind(indexController));

        return router;
    }
}

export const indexRoutes = new IndexRoutes();