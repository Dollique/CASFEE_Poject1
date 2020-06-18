import {HBlistItems} from './handlebars.js';
import {Style} from '../bl_style.js';

export class SiteConfigController {
    constructor() {
        this.style = new Style();
        this.link = this.style.createLink();

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
        let newLink = this.style.createLink(value);
        this.replaceStyle(newLink);
    }

    appendStyleToHead() {
        document.head.append(this.link);
    }

    replaceStyle(link = this.link) {
        let oldLink = document.head.querySelector('link[rel="stylesheet"]');
        document.head.replaceChild(link, oldLink);
    }
}