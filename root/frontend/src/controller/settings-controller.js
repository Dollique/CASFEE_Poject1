import {Filter} from '../service.js';
import {Sort} from '../service.js';
import {HBlistItems} from './handlebars.js';

export class ListSettingsController {
    constructor() {
        this.filter = new Filter();
        this.sort = new Sort();

        this.sortItems = {sortItems: [
            'Name, asc',
            'Finish date, asc',
            'Finish date, desc',
            'Create date, asc',
            'Create date, desc',
            'Due date, asc',
            'Due date, desc',
            'Prio, asc',
            'Prio, desc'
        ]};

        this.hb = new HBlistItems();
    }
    
    initEventListeners() {
        // settings
        document.querySelector(".list__inner .settings").addEventListener("click", () => this.onListSettingsClick());

        /* ON CHANGE (save) */

        document.querySelector("aside").addEventListener("change", () => {
            if(event.target.id == "sortList") { // event bubbling
                this.onChangeSorting(event.target.value);
            }

            if(event.target.id == "filterDone") { // event bubbling
                this.onChangeFilterDone(event.target.checked);
            }
        });

        document.querySelector("aside").addEventListener("click", () => {
            if(event.target.className == "resetFilter") { // event bubbling
                this.onFilterReset();
            }
        });
    }


    /* SETTINGS */

    /* click settings */
    onListSettingsClick() {
        this.renderSettings();
    }

    onChangeSorting(value) {
        let sortedValue = this.getSortValue(value);
        this.sort.writeSort(sortedValue.sortby, sortedValue.order);

        this.hb.renderList();
    }

    onChangeFilterDone(value) {
        this.filter.writeFilter('done', value);
        
        this.hb.renderList();
        this.renderSettings();
    }

    renderSettings() {
        let settings = this.getCurrentSettings();
        this.hb.renderSettings('settings-menu', settings);
    }

    onFilterReset() {
        this.filter.resetFilter();
        this.hb.renderList();
        this.renderSettings();
    }

    getCurrentSettings() {
        let obj = {
            sortItems: this.sortItems.sortItems,
            filter: this.filter.getFilter(),
            sort: this.getSortString(this.sort.getSort())
        };

        return obj;
    }

    getSortString(obj) {
        return obj.sortby + "_" + obj.order;
    }

    getSortValue(value) {
        let valArr = value.split("_");
        var myobj = JSON.parse('{ "sortby":"'+ valArr[0] +'", "order":"'+ valArr[1] +'" }');

        return myobj;
    }
}