/* get and set filter in localStorage */
export class Filter {
    constructor() {
        this.filter = new Object;
    }

    /*set filter() {
        
    }

    get filter() {
        
    }*/

    getFilter() {
        return this.filter = JSON.parse(localStorage.getItem('filter'));
    }

    resetFilter() {
        localStorage.removeItem('filter');
    }

    writeFilter(filter, filterby) {
        let obj = new Object;
        obj[filter] = filterby;

        this.appendFilter(obj);

        return localStorage.setItem('filter', JSON.stringify(this.filter));
    }

    appendFilter(filter) {
        if(!this.filter) this.filter = {};
        return Object.assign(this.filter, filter);
    }
}



/* get and set sorting in localStorage */
export class Sort {
    constructor() {
        this.sort = new Object;
    }

    /*set sort() {
        
    }

    get sort() {
        
    }*/

    getSort() {
        return this.sort = JSON.parse(localStorage.getItem('sort'));
    }

    getDefaultSort() {
        let sort = {};
        sort.sortby = 'name';
        sort.order = 'asc';

        return sort;
    }

    writeSort(sortby, order) {
        let obj = new Object;
        obj.sortby = sortby;
        obj.order = order;
        this.sort = obj;

        return localStorage.setItem('sort', JSON.stringify(this.sort));
    }
}