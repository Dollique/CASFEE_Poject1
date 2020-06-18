export class Style {
    constructor(style = "default") {
        this.style = style;
    }

    createLink(style = this.style) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", 'styling/'+ style +'/style.css');

        this.style = style;

        return link;
    }

    saveStyle() {
        localStorage.setItem('style', this.style);
    }
}