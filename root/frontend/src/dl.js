// @todo: move this to NodeJS server
import {Utils} from './utils.js';

export class ListItemStorage {
    constructor() {
        this.utils = new Utils();
        this.listItemArr = localStorage.getItem('listItemArr');

        if(this.listItemArr === null || this.listItemArr.length === 0) {
            this.listItemArr = [];
        } else {
            this.listItemArr = JSON.parse(this.listItemArr); // decode the stringified JSON array to array + object
        }
    }

    getListItems() {
        return this.listItemArr;
    }

    addListItem(item) {
        // 1. get listItemArr from localStorage + ID
        
        let itemID = this.getLastItemId() + 1;
        let myItem = {
            'id': itemID,
            'name': item,
            done: false,
            createDate: this.utils.toDate(),
            finishDate: null,
            dueDate: null,
            prio: 1
        };

        // 2. append to listItemArr
        this.listItemArr.push(myItem);

        // 3. replace listItemArr in localStorage
        this.overwriteStorage(this.listItemArr);
        
        return true; // no error
    }

    editListItem(id, value, field) {
        // get the list item array and change the value of the field
        let obj = this.listItemArr.map((object) => {
            if(object.id == id) {
                if(field === "done") {
                    object.done = value;

                    if(value === true) {
                        object.finishDate = this.utils.toDate();
                    } else {
                        object.finishDate = null;
                    }
                } else if(field === "prio") {
                    object.prio = value;
                } else if(field === "dueDate") {
                    object.dueDate = value;
                } else {
                    object.name = value;
                }
            }
            return object;
        });

        // overwrite current listItemArr with content of new temp variable
        this.overwriteStorage(obj);

        return true; // no error
    }

    overwriteStorage(newObject) {
        localStorage.setItem('listItemArr', JSON.stringify(newObject));
    }

    getLastItemId() {
        let getID = 0;
        this.listItemArr.map(function(obj) {
            if(obj.id > getID) getID = obj.id;
        });
        
        return getID;
    }
}









/**
 * 
 * TODO:
 * FIRST BUILD ONE WORKING TO DO LIST (ESSENTIAL). AFTER THIS BUILD LISTS LOGIC
 * 
 * **/

// get to do lists
export class List {
    constructor() {
        // this.listArr = [ ];
        this.list = { };
    }

    getList() {
        // example data
        // this.listArr.push({ list_id: 1, list_name: "Test", list_sorting: "desc" });
        // this.listArr.push({ list_id: 2, list_name: "List nr 2", list_sorting: "asc" });

        let listArr = localStorage.getItem('listArr');

        if(listArr != null && listArr.length !== 0) {
            return listArr;
        }

        // return this.getListHTML();
        return;
    }

    addList(listName) {
        let listArr;
        if (!localStorage['listArr']) listArr = [];
        else listArr = JSON.parse(localStorage['listArr']);            
        
        if (!(listArr instanceof Array)) listArr = [];
        listArr.push(listName);

        localStorage.setItem('listArr', JSON.stringify(listArr));
    }

    getListHTML() {
        let res = "";

        for(let li of this.listArr) {
            res += `<div class="list">
                <header>
                    <h1>${li.list_name}</h1>
                    <button>+</button>
                </header>
            </div>`;
        }
        

        return res;
    }

    getListItems() {
        this.listItem = new ListItem();
    }
}