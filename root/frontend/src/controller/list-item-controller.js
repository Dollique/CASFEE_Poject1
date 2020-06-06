import {ListItem} from '../bl.js';
import {ListItemStorage} from '../dl.js';


export class ListItemController {
    constructor() {
        this.listItem = new ListItem();
        this.listItemStorage = new ListItemStorage();
        this.listItems = this.listItemStorage.getListItems();
    }

    loadListItems() {
    }

    /* append the list items to the DOM */
    appendListItems() {
        // add this.listItems to DOM
        const getEl = document.querySelector(".list__inner ul");

        if(!typeof undefined) {
            getEl.innerHTML = this.listItems;
        }   

        //getEl.innerHTML = this.listItems;
        console.log(this.listItems);
    }

    onAddListItemClick() {
        document.querySelector(".list__inner button").addEventListener("click", () => {
            this.addNewItemForm(this); // context of this is changed to the <button>
            this.onEditItemBlur();
        });
    }

    onEditItemBlur() {
        document.querySelector(".list__inner ul li input").addEventListener("blur", (el) => {
            this.addNewItem(el.target.value); // context of this is changed to the <button>
        });
    }

    addNewItemForm(self) {
        let itemForm = self.listItem.addListItemForm();

        // TODO: CHANGE TO APPEND NOT REPLACE
        document.querySelector(".list__inner ul").innerHTML = itemForm;
    }

    addNewItem(item) {
        // add item to localStorage
        this.listItemStorage.addListItem(item);

        // TODO: re-render DOM to show new item?
    }

}
