//import express from 'express';
import {indexRoutes} from './indexRoutes.js';

export class Router {
    constructor() {
        
    }
    
    getRoutes(app) {
        app.use("/", indexRoutes);
    }
}

export const router = new Router();