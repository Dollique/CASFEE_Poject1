export class Utils {
    sortObjectItems(object, sortby = "name", order = "asc") {
        let propComparator;
        
        if(order === "asc") {
            propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : this.makeLower(a[propName]) < this.makeLower(b[propName]) ? -1 : 1
        } else {
            propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : this.makeLower(a[propName]) > this.makeLower(b[propName]) ? -1 : 1
        }
        
        return object.sort(propComparator(sortby));
    }

    makeLower(val) {
        if(typeof val === "string") return val.toLowerCase();
        return val;
    }
}