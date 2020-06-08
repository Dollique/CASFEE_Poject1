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
        /* CLICK HANDLERS */

        // new
        document.querySelector(".list__inner button").addEventListener("click", () => this.onAddListItemClick()); // context of this is changed to the <button>

        // edit
        document.querySelector(".list__inner ul").addEventListener("click", () => {
            // edit item
            if(event.target.tagName == "LABEL") {
                event.preventDefault(); // disable checkbox functionality
                this.onEditListItemClick(event.target.parentNode.dataset.id, event.target.textContent);
            }

            // edit prio
            if(event.target.classList.contains("prio")) {
                if(!document.querySelector(".list__inner ul li .editListItemPrio") && !document.querySelector(".list__inner ul li .editListItemDate")) {
                    this.onEditListItemPrioClick(event.target.parentNode.dataset.id, event.target.dataset.prio);
                    
                    // edit date
                    if(event.target.parentNode.querySelector(".date").innerHTML === "") {
                        this.onEditListItemDateClick(event.target.parentNode.dataset.id);
                    }
                }

                
            }

            // edit date
            if(event.target.classList.contains("date")) {
                if(!document.querySelector(".list__inner ul li .editListItemDate")) { // only execute once 
                    this.onEditListItemDateClick(event.target.parentNode.dataset.id, event.target.textContent);
                }
            }
        });

        /* BLUR HANDLERS (save) */

        document.querySelector(".list__inner ul").addEventListener("focusout", () => { // event bubbling does not work on blur
            if(event.target.className == "addNewItem") { // event bubbling
                this.onSetItemBlur(event.target.value);
            }

            if(event.target.className == "editListItem") {
                this.onSetItemBlur(event.target.value, event.target.parentNode.dataset.id);
            }

            if(event.target.className == "editListItemPrio") {
                this.onSetItemBlur(event.target.value, event.target.parentNode.dataset.id, "prio");
            }

            if(event.target.className == "editListItemDate") {
                this.onSetItemBlur(event.target.value, event.target.parentNode.dataset.id, "date");
            }
        });
    }


    onAddListItemClick() {
        if(!document.querySelector(".list__inner ul .addItemForm")) { // only execute once
            let itemForm = this.listItem.addListItemForm();
            document.querySelector(".list__inner ul").insertAdjacentHTML('afterbegin', itemForm);
        }
    }

    onEditListItemClick(id, value) {
        if(!document.querySelector(".list__inner ul li .editListItem")) { // only execute once
            id = Number(id);
            let editForm = this.listItem.editListItemForm(value);
            document.querySelector(".list__inner ul li[data-id='"+id+"'] label").outerHTML = editForm;
        }
    }

    // edit prio
    onEditListItemPrioClick(id, value) {
        let editForm = this.listItem.editListItemPrio(value);
        document.querySelector(".list__inner ul li[data-id='"+id+"'] .prio").style.display='none'; // hide with css, so date click target still exists
        document.querySelector(".list__inner ul li[data-id='"+id+"'] .prio").insertAdjacentHTML('afterend', editForm);
    }

    onEditListItemDateClick(id, value = null) {
        let editForm = this.listItem.editListItemDate(value);
        document.querySelector(".list__inner ul li[data-id='"+id+"'] .date").outerHTML = editForm;
    }

    onSetItemBlur(value, id = Number(), field = "name") {
        //console.log("target", value);
        if(this.listItem.validateListItem(value, field)) {
            if(this.setItem(value, id, field)) {
                new HBlistItems().setHBlistItems(this.listItemStorage.getListItems());
            }
        } else {
            console.warn("input validation error");
        }
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

}
