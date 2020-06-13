import {Utils} from '../utils.js';
export class HBlistItems {
    constructor(items, sortby = "name", order = "asc") {
        this.utils = new Utils();

        this.items = items;
        this.sortby = sortby;
        this.order = order;

        this.items = this.utils.sortObjectItems(this.items);
    }

    setHBlistItems(items = this.items) {
        let template = document.querySelector("#list-items").innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(items);
        document.querySelector(".list__inner ul").textContent = "";
        document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
        //document.querySelector(".list__inner ul").textContent = html;
    }

    renderSortedListItems(sortby, order) {
        sortby = (!sortby) ? this.sortby : sortby;
        order = (!order) ? this.order : order;
        
        return this.setHBlistItems(this.utils.sortObjectItems(this.items, sortby, order));
    }

    setHBSettings(content) {
        let template = document.querySelector("#settings-menu").innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(content);
        document.querySelector("aside").innerHTML = html;
    }
}