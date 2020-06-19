import {HBlistItems} from './handlebars.js';
import {Style} from '../bl_style.js';

export class SiteConfigController {
    constructor() {
        this.style = new Style();

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
        this.hb.renderSettings("config-menu", this.style);
    }

    onChangeStyle(value) {
        let newLink = this.style.createLink(value);
        this.replaceStyle(newLink);
    }
    
    getStyle() {
        let link, style = this.getStyleFromStorage();
        
        if(style) {
            link = this.style.createLink(style);
        } else {
            link = this.style.createLink();
        }

        this.appendStyleToHead(link);
    }

    getStyleFromStorage() {
        return localStorage.getItem('style');
    }

    appendStyleToHead(link) {
        document.head.append(link);
    }

    replaceStyle() {
        this.style.saveStyle();

        let link = this.style.createLink();
        let oldLink = document.head.querySelector('link[rel="stylesheet"]');
        document.head.replaceChild(link, oldLink);
    }
}