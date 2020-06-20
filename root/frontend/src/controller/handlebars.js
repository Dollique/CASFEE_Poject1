import {Utils} from '../utils.js';
import {Filter} from '../service.js';
import {Sort} from '../service.js';
export class HBlistItems {
    constructor(items = [], sortby = "name", order = "asc") {
        this.utils = new Utils();
        this.filter = new Filter();
        this.sort = new Sort();

        this.items = items;
        this.sortby = sortby;
        this.order = order;

        this.setHelpers(); // set helpers
    }

    _setHBlistItems(items) {
        let template = document.querySelector("#list-items").innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(items);
        document.querySelector(".list__inner ul").textContent = "";
        document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
    }

    /* render the list sorted/filtered */
    renderList(items = this.items) {
        items = this._renderFilteredListItems(items);
        items = this._renderSortedListItems(items);

        return this._setHBlistItems(items);
    }

    _renderSortedListItems(items) {     
        let sort = this.sort.getSort();

        if(sort === null) {
            sort = this.sort.getDefaultSort();
        }

        return this.utils.sortObjectItems(items, sort.sortby, sort.order);
    }

    _renderFilteredListItems(items) {
        let filter = this.filter.getFilter();
        if(!filter) return items;
        return this.utils.filterObjectItems(items, filter);
    }


    /* Settings & Config */
    renderSettings(menu = "settings-menu", content) {
        document.querySelector("aside").classList.add("open");
        return this._setHBSettings(menu, content);
    }

    _setHBSettings(menu, content) {
        let template = document.querySelector("#"+ menu).innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(content);
        document.querySelector("aside").innerHTML = html;
    }


    /* HANDLEBARS HELPERS */
    setHelpers() {
        // -> https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value
        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });

        Handlebars.registerHelper('sortValue', (val) => this.getSortVal(val));

        Handlebars.registerHelper('ifExists', function(obj, options) {
            return (obj != null) ? options.fn(this) : '';
        });
    }

    getSortVal(val) {
        val = val.toLowerCase().replace(', ', '_').split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''); // make first letter of every word uppercase
        
        val = val.charAt(0).toLowerCase() + val.slice(1); // make first letter lowercase

        return val;
    }
}