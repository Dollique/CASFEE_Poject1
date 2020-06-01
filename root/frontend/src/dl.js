// @todo: move this to NodeJS server


// get to do lists
export class List {
    constructor() {
        this.listArr = [ ];
        this.list = { };
    }

    getList() {
        // example data
        this.listArr.push({ list_id: 1, list_name: "Test", list_sorting: "desc" });
        this.listArr.push({ list_id: 2, list_name: "List nr 2", list_sorting: "asc" });
        
        return this.getListHTML();
    }

    getListHTML() {
        let res = "";

        for(let li of this.listArr) {
            res += `<div class="list">
                <header>
                    <h1>${li.list_name}</h1>
                    <button>+</button>
                </header>
            </div>`;
        }
        

        return res;
    }

    getListItems() {
        this.listItem = new ListItem();
    }
}


class ListItem {
    constructor() {

    }

}

