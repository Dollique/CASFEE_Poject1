import {TemplateController} from './controller/template-controller.js';
import {ListController} from './controller/list-controller.js';

class Bootstrapper {
    static start() {
        const templateController = new TemplateController().appendStyleToHead();
        const listController = new ListController();

        listController.loadList();
        listController.appendList();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);