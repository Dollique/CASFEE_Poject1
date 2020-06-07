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

     validateListItem(item) {
        if(typeof item == "undefined" || item === "") {
            return false;
        }

        return true;
    }
}
