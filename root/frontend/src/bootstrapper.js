import {TemplateController} from './controller/template-controller.js';
//import {ListController} from './controller/list-controller.js';
import {ListItemController} from './controller/list-item-controller.js';
import {HBlistItems} from './controller/handlebars.js';

class Bootstrapper {
    constructor() {
        this.templateController = new TemplateController().appendStyleToHead();
        //const listController = new ListController();
        this.listItemController = new ListItemController();

        this.listItemController.appendListItems();
        this.listItemController.onAddListItemClick();
    }

    getItemList() { // for handlebars
        return this.listItemController.loadListItems();;
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', () => {
    let start = new Bootstrapper;
    const itemList = start.getItemList();

    new HBlistItems().setHBlistItems(itemList);
});