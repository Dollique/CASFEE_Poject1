export class HBlistItems {
    constructor() {
        
    }

    setHBlistItems(items) {
        let template = document.querySelector("#list-items").innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(this.sortListItems(items));
        document.querySelector(".list__inner ul").textContent = "";
        document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
        //document.querySelector(".list__inner ul").textContent = html;
    }

    sortListItems(items, sortby = "name", order = "asc") {
        const propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
        
        return items.sort(propComparator(sortby));
        //return items;
    }
    
}