// @todo: move this to NodeJS server


export class ListItemStorage {
    constructor() {

    }

    getListItems() {
        let listItemArr = localStorage.getItem('listItemArr');

        if(listItemArr != null && listItemArr.length !== 0) {
            return listItemArr;
        }
        
        return;
    }

    addListItem(item) {
        console.log("adding new item", item);

        if(this.validateListItem()) {
            // 1. get listItemArr from localStorage
            // 2. append to listItemArr
            // 3. replace listItemArr in localStorage

            // localStorage.setItem('listItemArr', 'Tom');
        
        } else {
            console.error("check input field");
        }
    }
    
    validateListItem(item) {
        return true; // TODO: add validation logic
    }
}







/**
 * 
 * TODO:
 * FIRST BUILD ONE WORKING TO DO LIST (ESSENTIAL). AFTER THIS BUILD LISTS LOGIC
 * 
 * **/

// get to do lists
export class List {
    constructor() {
        // this.listArr = [ ];
        this.list = { };
    }

    getList() {
        // example data
        // this.listArr.push({ list_id: 1, list_name: "Test", list_sorting: "desc" });
        // this.listArr.push({ list_id: 2, list_name: "List nr 2", list_sorting: "asc" });

        let listArr = localStorage.getItem('listArr');

        if(listArr != null && listArr.length !== 0) {
            return listArr;
        }

        // return this.getListHTML();
        return;
    }

    addList(listName) {
        let listArr;
        if (!localStorage['listArr']) listArr = [];
        else listArr = JSON.parse(localStorage['listArr']);            
        
        if (!(listArr instanceof Array)) listArr = [];
        listArr.push(listName);

        localStorage.setItem('listArr', JSON.stringify(listArr));
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