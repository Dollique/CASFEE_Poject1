import {SiteConfigController} from './controller/config-controller.js';
import {ListItemController} from './controller/list-item-controller.js';
import {ListSettingsController} from './controller/settings-controller.js';
import {HBlistItems} from './controller/handlebars.js';

class Bootstrapper {
    constructor() {
        this.siteConfigController = new SiteConfigController().getStyle();

        this.listItemController = new ListItemController();
        this.listItemController.initEventListeners();

        this.listSettingsController = new ListSettingsController().initEventListeners();

        this.hb = new HBlistItems(this.getItemList());
        this.hb.renderList();
    }

    getItemList() { // for handlebars
        return this.listItemController.loadListItems();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', () => {
    new Bootstrapper;
});