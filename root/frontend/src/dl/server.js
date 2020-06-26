import {Utils} from '../utils.js';

export class ListItemStorage {
    constructor() {
        this.utils = new Utils();

        this.server = "http://localhost:3000";
        this.body = [];
    }

    async fetchData(method, body = null, route = '/list') {
        const rawResponse = await fetch(this.server + route, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
        return await rawResponse.json(); // json() returns another promise
    }

    test() {
        return this.fetchData('GET', null, '/test');
    }

    getListItems() {
        return this.fetchData('GET');
    }

    addListItem(item) {
        return this.fetchData('POST', JSON.stringify({name: item}));
    }

    editListItem(id, value, field) {
        let body = JSON.stringify({id: Number(id), field: field, value: value});
        return this.fetchData('PUT', body);
    }
}
