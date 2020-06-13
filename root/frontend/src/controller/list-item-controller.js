import {ListItem} from '../bl.js';
import {HBlistItems} from './handlebars.js';


export class ListItemController {
    constructor() {
        this.listItem = new ListItem();
        this.listItems = this.listItem.getItems();

        this.hb = new HBlistItems(this.loadListItems());
    }

    loadListItems() {
        return this.listItems;
    }

    initEventListeners() {
        /* CLICK HANDLERS */

        // new
        document.querySelector(".list__inner button").addEventListener("click", () => this.onAddListItemClick());
        
        // settings
        document.querySelector(".list__inner .settings").addEventListener("click", () => this.onListSettingsClick());

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

        document.querySelector("aside").addEventListener("change", () => {
            if(event.target.id == "sortList") { // event bubbling
                this.onChangeSorting(event.target.value);
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
            if(this.listItem.setItem(value, id, field)) {
                this.hb.renderSortedListItems();
            }
        } else {
            console.warn("input validation error");
        }
    }


    onListSettingsClick() {
        this.hb.setHBSettings();
    }

    onChangeSorting(value) {
        let sortedValue = this.getSortValue(value);
        this.hb.renderSortedListItems(sortedValue.sortby, sortedValue.order);
    }

    getSortValue(value) {
        let valArr = value.split("_");
        var myobj = JSON.parse('{ "sortby":"'+ valArr[0] +'", "order":"'+ valArr[1] +'" }');

        return myobj;
    }

}
