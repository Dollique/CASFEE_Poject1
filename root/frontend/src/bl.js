// @todo: move this to NodeJS server
import {ListItemStorage} from './dl.js';

export class ListItem {
    constructor() {
        this.listItemStorage = new ListItemStorage();
    }
    
    addListItemForm() {
       let newEl = `<li class="addItemForm">
            <input class="addNewItem" type="text" placeholder="New List Item" />
        </li>`;

        return newEl;
    }

    editListItemForm(value) {
        let newEl = `<input class="editListItem" type="text" placeholder="${value}" value="${value}" />`;
        return newEl;
    }

    editListItemPrio(value) {
        let newEl = `<input class="editListItemPrio" type="number" min="1" max="3" value="${value}" />`;
        return newEl;
    }

    editListItemDate(value) {
        let newEl = `<input class="editListItemDate" type="date" value="${value}" />`;
        return newEl;
    }
    
    getItems() {
        return this.listItemStorage.getListItems();
    }
    
    setItem(item, id, field) {
        if(id === 0) {
            // add item to localStorage
            return this.listItemStorage.addListItem(item); // returns boolean
        } else if(field === "prio") {
            return this.listItemStorage.editListItem(id, item, "prio");
        } else if(field === "date") {
            return this.listItemStorage.editListItem(id, item, "date");
        } else {
            // edit item in localStorage
            return this.listItemStorage.editListItem(id, item); // returns boolean
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

        if(field === "date") {
            // TODO: Check if date is valid
        }

        return true;
    }
}
