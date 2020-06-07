import {ListItem} from '../bl.js';
import {ListItemStorage} from '../dl.js';
import {HBlistItems} from './handlebars.js';


export class ListItemController {
    constructor() {
        this.listItem = new ListItem();
        this.listItemStorage = new ListItemStorage();
        this.listItems = this.listItemStorage.getListItems();
    }

    loadListItems() {
        return this.listItems;
    }

    initEventListeners() {
        document.querySelector(".list__inner button").addEventListener("click", () => this.onAddListItemClick()); // context of this is changed to the <button>

        document.querySelector(".list__inner ul").addEventListener("focusout", () => { // event bubbling does not work on blur
            if(event.target.className == "addNewItem") { // event bubbling
                this.onSetItemBlur(event.target.value);
            }

            if(event.target.className == "editListItem") {
                this.onSetItemBlur(event.target.value, event.target.parentNode.dataset.id);
            }
        });

        document.querySelector(".list__inner ul").addEventListener("click", () => {
            if(event.target.tagName == "LABEL") {
                event.preventDefault(); // disable checkbox functionality
                this.onEditListItemClick(event.target.parentNode.dataset.id, event.target.textContent);
            }
        });
    }

    onAddListItemClick() {
        let itemForm = this.listItem.addListItemForm();
        document.querySelector(".list__inner ul").insertAdjacentHTML('afterbegin', itemForm); 
    }

    onSetItemBlur(value, id = Number()) {
        //console.log("target", value);
        if(this.listItem.validateListItem(value)) {
            if(this.setItem(value, id)) { // context of this is changed to the <button>
                new HBlistItems().setHBlistItems(this.listItemStorage.getListItems());
            }
        } else {
            console.warn("input validation error");
        }
    }

    onEditListItemClick(id, value) {
        id = Number(id);
        let editForm = this.listItem.editListItemForm(value);
        document.querySelector(".list__inner ul li[data-id='"+id+"'] label").outerHTML = editForm;
    }


    setItem(item, id) {
        if(id === 0) {
            // add item to localStorage
            return this.listItemStorage.addListItem(item); // returns boolean
        } else {
            // edit item in localStorage
            return this.listItemStorage.editListItem(id, item); // returns boolean
        }
    }

}
