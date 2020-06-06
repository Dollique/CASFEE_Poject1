export class HBlistItems {
    constructor() {
        
    }

    setHBlistItems(items) {
        var template = document.querySelector("#list-items").innerHTML;
        var templateScript = Handlebars.compile(template);

        var html = templateScript(items);
        document.querySelector(".list__inner ul").insertAdjacentHTML("beforeend", html);
    }
    
}