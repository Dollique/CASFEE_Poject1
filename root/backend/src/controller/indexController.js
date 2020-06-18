export class IndexController {
    constructor() {

    }
    
    index(req, res) {
        res.json({message: "Hello World"});
    }

    list(req, res) { 

        // test data
        let listItems = [{"id":7,"name":"New und so","done":false,"createDate":"2020-06-15","finishDate":null,"dueDate":"2020-06-05","prio":1},{"id":1,"name":"Test","done":true,"createDate":"2020-06-14","finishDate":"2020-06-14","dueDate":"2020-06-26","prio":1},{"id":8,"name":"test","done":false,"createDate":"2020-06-15","finishDate":null,"dueDate":"2020-06-02","prio":1},{"id":9,"name":"test","done":false,"createDate":"2020-06-15","finishDate":null,"dueDate":null,"prio":1},{"id":5,"name":"zkzku","done":false,"createDate":"2020-06-14","finishDate":null,"dueDate":null,"prio":1},{"id":2,"name":"aasdfasf","done":false,"createDate":"2020-05-14","finishDate":null,"dueDate":"2020-06-17","prio":"2"},{"id":3,"name":"afewee","done":true,"createDate":"2020-06-04","finishDate":"2020-06-14","dueDate":null,"prio":"2"},{"id":4,"name":"awefewf","done":false,"createDate":"2020-06-14","finishDate":null,"dueDate":"2020-06-17","prio":"2"},{"id":6,"name":"Testaaa","done":false,"createDate":"2020-06-14","finishDate":null,"dueDate":null,"prio":"3"}];
        
        res.json(listItems);
        res.end();
    }
}

export const indexController = new IndexController();