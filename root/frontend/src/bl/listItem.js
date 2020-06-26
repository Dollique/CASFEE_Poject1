import {Utils} from '../utils.js';
import {ListItemStorage} from '../dl/server.js';

export class ListItem {
    constructor() {
        this.utils = new Utils();

        this.testConnection = new ListItemStorage();
    }

    // test server connection
    async testConnect() {
        try {
            await this.testConnection.test();
        } catch(e) {
            return false;
        }
        return true;
    }
    
    // load data logic from server or frontend
    async loadDataLogic() {
        if(await this.testConnect()) {
            console.log("Info: Server is running. Getting data from NodeJS");
            return await import('../dl/server.js'); // dl.js = localStorage, dl_node.js = node server
        } else {
            console.warn("Warning: Server is not running. Getting data from LocalStorage")
            return await import('../dl/local.js');
        }
    }
    

    // List logic
    
    getItems() {
        return this.loadDataLogic().then((obj) => {
            let list = new obj.ListItemStorage;
            return list.getListItems();
        });
    }
    
    setItem(value, id, field) {
        if(id === 0) {
            // add item to localStorage
            return this.loadDataLogic().then((obj) => {
                let list = new obj.ListItemStorage;
                return list.addListItem(value);
            });
        } else {
            // edit item in localStorage
            value = (field === "dueDate") ? this.utils.toDate(value) : value;
            
            return this.loadDataLogic().then((obj) => {
                let list = new obj.ListItemStorage;
                return list.editListItem(id, value, field);
            });
        }
    }

    
     // validate input
     validateListItem(value, field) {
        if(typeof value == "undefined" || value === "" && field !== "date") {
            return false;
        }

        if(field === "prio") {
            value = Number(value);
            if(typeof value !== "number" || value < 1 || value > 3) {
                return false;
            }
        }

        if(field === "dueDate") {
            // TODO: Check if due date is valid
        }

        return true;
    }
}