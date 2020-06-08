// @todo: move this to NodeJS server


export class ListItem {
    constructor() {

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
