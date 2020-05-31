import {TemplateController} from './controller/template-controller.js';

class Bootstrapper {
    static start() {
        const templateController = new TemplateController().appendStyleToHead();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);