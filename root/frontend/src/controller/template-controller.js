export class TemplateController {
    constructor(style = "default") {
        this.style = style

        this.createLink();
        this.initEventListeners();
    }

    initEventListeners() {
        // config
        document.querySelector("footer .config").addEventListener("click", () => this.onConfigClick());
    }

    onConfigClick() {
        console.log("Test");
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
