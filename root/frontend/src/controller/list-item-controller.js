import {ListItem} from '../bl/listItem.js';
import {HBlistItems} from './handlebars.js';

export class ListItemController {
    constructor() {
        this.listItem = new ListItem();
        
        this.hb = new HBlistItems();
    }

    loadListItems() {
        return this.listItem.getItems();
    }

    initEventListeners() {
        /* CLICK HANDLERS */

        // new
        document.querySelector(".list__inner button").addEventListener("click", () => this.onAddListItemClick());
        
        /* EDIT HANDLERS */

        document.querySelector(".list__inner ul").addEventListener("click", () => {
            // edit item
            if(event.target.tagName == "LABEL") {
                event.preventDefault(); // disable checkbox functionality
                this.onEditListItemClick(event.target.parentNode.dataset.id, event.target.textContent);
            }

            // done (checkbox)
            if(event.target.className == "done") {
                this.onDoneListItemClick(event.target.parentNode.dataset.id, event.target.checked);
            }

            // edit prio
            if(event.target.classList.contains("prio")) {
                if(!document.querySelector(".list__inner ul li .editListItemPrio") && !document.querySelector(".list__inner ul li .editListItemDate")) {
                    this.onEditListItemPrioClick(event.target.parentNode.dataset.id, event.target.dataset.prio);
                    
                    // edit due date
                    if(event.target.parentNode.querySelector(".dueDate").innerHTML === "") {
                        this.onEditListItemDateClick(event.target.parentNode.dataset.id);
                    }
                }
            }

            // edit due date
            if(event.target.classList.contains("dueDate")) {
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
                this.onSetItemBlur(event.target.value, event.target.parentNode.dataset.id, "dueDate");
            }
        });
    }

    /* ACTIONS */

    // add list item
    onAddListItemClick() {
        if(!document.querySelector(".list__inner ul .addItemForm")) { // only execute once
            let itemForm = this.addListItemForm();
            document.querySelector(".list__inner ul").insertAdjacentHTML('afterbegin', itemForm);
        }
    }

    // edit list item
    onEditListItemClick(id, value) {
        if(!document.querySelector(".list__inner ul li .editListItem")) { // only execute once
            id = Number(id);
            let editForm = this.editListItemForm(value);
            document.querySelector(".list__inner ul li[data-id='"+id+"'] label").outerHTML = editForm;
        }
    }

    // click done checkbox
    onDoneListItemClick(id, value) {
        this.listItem.setItem(value, id, "done");
    }

    // edit prio
    onEditListItemPrioClick(id, value) {
        let editForm = this.editListItemPrio(value);
        document.querySelector(".list__inner ul li[data-id='"+id+"'] .prio").style.display='none'; // hide with css, so due date click target still exists
        document.querySelector(".list__inner ul li[data-id='"+id+"'] .prio").insertAdjacentHTML('afterend', editForm);
    }

    // edit due date
    onEditListItemDateClick(id, value = null) {
        let editForm = this.editListItemDate(value);
        document.querySelector(".list__inner ul li[data-id='"+id+"'] .dueDate").outerHTML = editForm;
    }

    // save edits
    onSetItemBlur(value, id = Number(), field = "name") {
        //console.log("target", value);
        if(this.listItem.validateListItem(value, field)) {
            if(this.listItem.setItem(value, id, field)) {
                this.hb.renderList(this.loadListItems());
            }
        } else {
            console.warn("input validation error");
        }
    }


    /* GET HTML FORMS */

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

}
