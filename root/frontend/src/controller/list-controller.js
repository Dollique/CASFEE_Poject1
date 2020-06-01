import {List} from '../dl.js';

export class ListController {
    constructor() {
        this.list = null;
    }

    loadList() {
        this.list = new List().getList();
    }

    appendList() {
        // add this.list to DOM
        const getEl = document.querySelector(".list");
        getEl.innerHTML = this.list;
        console.log(this.list);
    }
}
