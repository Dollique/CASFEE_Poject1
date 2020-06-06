import {TemplateController} from './controller/template-controller.js';
//import {ListController} from './controller/list-controller.js';
import {ListItemController} from './controller/list-item-controller.js';

class Bootstrapper {
    static start() {
        const templateController = new TemplateController().appendStyleToHead();
        //const listController = new ListController();
        const listItemController = new ListItemController();

        /*listController.loadList();
        listController.appendList();*/

        listItemController.loadListItems();
        listItemController.appendListItems();
        listItemController.onAddListItemClick();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);