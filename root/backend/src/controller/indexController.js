export class IndexController {
    constructor() {

    }
    
    index(req, res) {
        res.json({message: "Hello World"});
    }

    list(req, res) { 
        res.json({message: "List Test"});
        res.end();
    }
}

export const indexController = new IndexController();