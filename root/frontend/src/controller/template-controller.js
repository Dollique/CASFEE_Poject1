import {HBlistItems} from './handlebars.js';

export class TemplateController {
    constructor(style = "default") {
        this.style = style

        this.createLink();
        this.initEventListeners();

        this.hb = new HBlistItems();
    }

    initEventListeners() {
        // config
        document.querySelector("footer .config").addEventListener("click", () => this.onConfigClick());

        document.querySelector("aside").addEventListener("change", () => {
            if(event.target.id == "styleSwitcher") { // event bubbling
                this.onChangeStyle(event.target.value);
            }
        });
    }

    onConfigClick() {
        this.hb.setHBSettings("config-menu");
    }

    onChangeStyle(value) {
        console.log("style changed to:", value);
        let newLink = this.createLink(value);
        this.replaceStyle(newLink);
    }
    
    createLink(style = this.style) {
        this.link = document.createElement("link");
        this.link.setAttribute("rel", "stylesheet");
        this.link.setAttribute("type", "text/css");
        this.link.setAttribute("href", 'styling/'+ style +'/style.css');
    }

    appendStyleToHead() {
        document.head.append(this.link);
    }

    replaceStyle(link = this.link) {
        let oldLink = document.head.querySelector('link[rel="stylesheet"]');
        document.head.replaceChild(link, oldLink);
    }
}
