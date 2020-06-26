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

    // set list or menu HB
    _setHBTemplate(content, menu = '') { // menu -> settings or config menu
        let getID = (menu !== '') ? '#' + menu : '#list-items';

        let template = document.querySelector(getID).innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(content);

        if(menu !== '') {
            document.querySelector("aside").innerHTML = html;
        } else {
            document.querySelector(".list__inner ul").textContent = "";
            document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
        }
    }
    
    /* render the list sorted/filtered */
    async renderList(items = this.items) {
        let obj = await items; // await changes items to a promise and resolves it.

        obj = this._renderFilteredListItems(obj);
        obj = this._renderSortedListItems(obj);
        
        return this._setHBTemplate(obj);
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
        return this._setHBTemplate(content, menu);
    }


    /* HANDLEBARS HELPERS */
    setHelpers() {
        // -> https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value
        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });

        // sort helper
        Handlebars.registerHelper('sortValue', (val) => this.getSortVal(val));

        // if Exists helper
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