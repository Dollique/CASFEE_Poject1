// @todo: move this to NodeJS server


export class ListItem {
    constructor() {

    }
    
    addListItemForm() {
       let newEl = `<li>
            <input class="addNewItem" type="text" placeholder="New List Item" />
        </li>`;

        return newEl;
    }
}
