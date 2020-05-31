export default class Router {
    constructor(express) {
        this.route = express.Router();
    }

    getRoute() {
        this.route.get('/about', function (req, res) {
            res.send('About this wiki');
          });
    }
}