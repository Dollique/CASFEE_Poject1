export default class List {
    constructor(app) {
       this.app = app;
    }

    getData() {
        // test data
        this.app.get("/url", (req, res, next) => {
            res.json(["Tony","Lisa","Michael","Ginger","Food"]);
        });
    }

}