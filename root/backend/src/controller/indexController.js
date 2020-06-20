import {listItemsDB} from '../modules/listDB.js';

export class IndexController {
    constructor() {
        this.listDB = listItemsDB;
    }
    
    async add(req, res) {
        await this.listDB.addListItem(req.body.name);
        res.end();
    }

    async list(req, res) { 
        let data = await this.listDB.getAll();
        res.json(data);
        res.end();
    }
}

export const indexController = new IndexController();