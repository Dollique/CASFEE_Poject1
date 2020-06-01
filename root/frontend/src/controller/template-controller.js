export class TemplateController {
    constructor(style = "default") {
        this.style = style

        this.createLink();
    }
    
    createLink() {
        this.link = document.createElement("link");
        this.link.setAttribute("rel", "stylesheet");
        this.link.setAttribute("rtypeel", "text/css");
        this.link.setAttribute("href", 'styling/'+ this.style +'/style.css');
    }

    appendStyleToHead() {
        document.head.append(this.link);
    }
}
