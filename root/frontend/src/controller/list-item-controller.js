import {ListItem} from '../bl.js';
import {ListItemStorage} from '../dl.js';


export class ListItemController {
    constructor() {
        this.listItem = new ListItem();
        this.listItemStorage = new ListItemStorage();
        this.listItems = this.listItemStorage.getListItems();
    }

    loadListItems() {
        return this.listItems;
    }

    /* append the list items to the DOM */
    appendListItems() {
        // add this.listItems to DOM
        const getEl = document.querySelector(".list__inner ul");

        if(!typeof undefined) {
            getEl.innerHTML = this.listItems;
        }
    }

    onAddListItemClick() {
        document.querySelector(".list__inner button").addEventListener("click", () => {
            this.addNewItemForm(this); // context of this is changed to the <button>
            this.onEditItemBlur();
        });
    }

    onEditItemBlur() {
        document.querySelector(".list__inner ul").addEventListener("focusout", (el) => { // event bubbling does not work on blur
            if(el.target.className == "addNewItem") { // event bubbling
                if(this.addNewItem(el.target.value)) { // context of this is changed to the <button>
                    console.log("TEST"); // REMOVE FORM OR RE RENDER?
                }
            }
        });
    }

    addNewItemForm(self) {
        let itemForm = self.listItem.addListItemForm();
        
        document.querySelector(".list__inner ul").insertAdjacentHTML('afterbegin', itemForm);
    }

    addNewItem(item) {
        // add item to localStorage
        
        return this.listItemStorage.addListItem(item); // returns boolean

        // TODO: re-render DOM to show new item?
    }

}
