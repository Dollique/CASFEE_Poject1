import nedb from 'nedb';
import {Utils} from '../utils.js';

export class listDB {
    constructor() {
        this.listItemsDB = new nedb({ filename: 'src/databases/lists.db', autoload: true });
        this.utils = new Utils;
    }

    initDB() {
        return;
    }

    addTest() {
        let listItems = [{"id":7,"name":"New und so","done":false,"createDate":"2020-06-15","finishDate":null,"dueDate":"2020-06-05","prio":1},{"id":1,"name":"Test","done":true,"createDate":"2020-06-14","finishDate":"2020-06-14","dueDate":"2020-06-26","prio":1},{"id":8,"name":"test","done":false,"createDate":"2020-06-15","finishDate":null,"dueDate":"2020-06-02","prio":1},{"id":9,"name":"test","done":false,"createDate":"2020-06-15","finishDate":null,"dueDate":null,"prio":1},{"id":5,"name":"zkzku","done":false,"createDate":"2020-06-14","finishDate":null,"dueDate":null,"prio":1},{"id":2,"name":"aasdfasf","done":false,"createDate":"2020-05-14","finishDate":null,"dueDate":"2020-06-17","prio":"2"},{"id":3,"name":"afewee","done":true,"createDate":"2020-06-04","finishDate":"2020-06-14","dueDate":null,"prio":"2"},{"id":4,"name":"awefewf","done":false,"createDate":"2020-06-14","finishDate":null,"dueDate":"2020-06-17","prio":"2"},{"id":6,"name":"Testaaa","done":false,"createDate":"2020-06-14","finishDate":null,"dueDate":null,"prio":"3"}];

        this.listItemsDB.insert(listItems, function(err, doc) {
            console.log('Inserted', doc.name, 'with ID', doc.id);
        });
    }

    async getAll() {
        return await new Promise((resolve, reject) => {
            this.listItemsDB.find({}, function(err, doc) {
                if(err) reject(err);
                resolve(doc);
            });
        });
    }

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
}

export const listItemsDB = new listDB();