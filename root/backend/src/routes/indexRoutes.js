import express from 'express';
import {indexController} from '../controller/indexController.js';

export class IndexRoutes {
    constructor() {
        let router = express.Router();

        router.get("/", indexController.index.bind(indexController));
        router.get("/list", indexController.list.bind(indexController));

        return router;
    }
}

export const indexRoutes = new IndexRoutes();