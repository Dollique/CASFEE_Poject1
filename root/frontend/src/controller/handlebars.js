import {Utils} from '../utils.js';
import {Filter} from '../service.js';
import {Sort} from '../service.js';
import {ListItem} from '../bl.js';
export class HBlistItems {
    constructor(items = [], sortby = "name", order = "asc") {
        this.utils = new Utils();
        this.filter = new Filter();
        this.sort = new Sort();
        this.listItem = new ListItem();

        this.items = items;
        this.sortby = sortby;
        this.order = order;

        this.items = this._renderSortedListItems();
    }

    _setHBlistItems(items = this.items) {
        let template = document.querySelector("#list-items").innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(items);
        document.querySelector(".list__inner ul").textContent = "";
        document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
        //document.querySelector(".list__inner ul").textContent = html;
    }

    /* render the list sorted/filtered */
    renderList() {
        this.items = this._renderFilteredListItems();
        this.items = this._renderSortedListItems();

        return this._setHBlistItems(this.items);
    }

    _renderSortedListItems() {     
        let sort = this.sort.getSort();
        return this.utils.sortObjectItems(this.items, sort.sortby, sort.order);
    }

    _renderFilteredListItems() {
        let filter = this.filter.getFilter();
        let items = this.listItem.getItems(); // always get items from db

        if(!filter) return items;
        return this.utils.filterObjectItems(items, filter);
    }

    setHBSettings(menu = "settings-menu", content) {
        let template = document.querySelector("#"+ menu).innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(content);
        document.querySelector("aside").innerHTML = html;
    }
}