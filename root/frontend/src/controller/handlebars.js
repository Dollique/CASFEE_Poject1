export class HBlistItems {
    constructor() {
        
    }

    setHBlistItems(items) {
        let template = document.querySelector("#list-items").innerHTML;
        let templateScript = Handlebars.compile(template);
        
        let html = templateScript(items);
        document.querySelector(".list__inner ul").textContent = "";
        document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
        //document.querySelector(".list__inner ul").textContent = html;
    }
    
}