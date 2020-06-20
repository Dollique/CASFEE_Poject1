// @todo: move this to NodeJS server
import {Utils} from './utils.js';

export class ListItemStorage {
    constructor() {
        this.utils = new Utils();

        this.server = "http://localhost:3000";
        this.body = [];
    }

    async getListItems() {
        const rawResponse = await fetch(this.server + '/list', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await rawResponse.json(); // json() returns another promise
    }

    async addListItem(item) {
        const rawResponse = await fetch(this.server + '/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: item})
        })
        return rawResponse;
    }

    async editListItem(id, value, field) {
        const rawResponse = await fetch(this.server + '/list', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: Number(id), field: field, value: value})
        })
        return rawResponse;
    }
}
