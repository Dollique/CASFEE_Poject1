import nedb from 'nedb';
import {Utils} from '../utils.js';

export class listDB {
    constructor() {
        this.listItemsDB = new nedb({ filename: 'src/databases/lists.db', autoload: true });
        this.utils = new Utils;
    }

    /* Get all items */

    async getAll() {
        return await new Promise((resolve, reject) => {
            this.listItemsDB.find({}, function(err, doc) {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }


    /* Add new item */

    async buildNewItem(value) {
        let itemID = await this.getLastItemId() + 1;
        
        return {
            'id': itemID,
            'name': value,
            done: false,
            createDate: this.utils.toDate(),
            finishDate: null,
            dueDate: null,
            prio: 1
        };
    }

    async getLastItemId() {
        let getID = 0;
        let getData = await this.getAll();

        getData.map(function(obj) {
            if(obj.id > getID) getID = obj.id;
        });
        
        return getID;
    }

    addToDB(item) {
        this.listItemsDB.insert(item, function(err, doc) {
            if(err) console.error("error", err);
            else console.log('Inserted', doc.name, 'with ID', doc.id);
        });
    }

    async addListItem(item) {
        let addItem = await this.buildNewItem(item);
        this.addToDB(addItem);
    }


    /* edit items */

    editListItem(id, field, value) {
        this.listItemsDB.update({ id: id }, { $set: { [field]: value } }, function(err, numReplaced) {
            if(err) console.error("error", err);
            else console.log('replaced:', numReplaced);
        });
    }
}

export const listItemsDB = new listDB();