// @todo: move this to NodeJS server


export class ListItem {
    constructor() {

    }
    
    addListItemForm() {
       let newEl = `<li>
            <input type="text" placeholder="New List Item" />
        </li>`;

        return newEl;
    }
}
