export class Utils {
    sortObjectItems(object, sortby = "name", order = "asc") {
        let propComparator;
        if(!object) return;
        
        if(order === "asc") {
            propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : this.getComparableString(a[propName]) < this.getComparableString(b[propName]) ? -1 : 1
        } else {
            propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : this.getComparableString(a[propName]) > this.getComparableString(b[propName]) ? -1 : 1
        }
        
        return object.sort(propComparator(sortby));
    }
    
    filterObjectItems(object, filterby) {
        let res;
        if(!object || object.length === 0 || !filterby) return object;

        // @TODO: Currently only works with "done" parameter
        for(let prop in filterby) {
            res = object.filter(obj => obj.done == filterby[prop]);
        }

        return res;
    }

    getComparableString(val) {
        val = this.returnDate(val);
        val = this.makeLower(val);

        return val;
    }

    returnDate(val) {
        if((new Date(val) !== "Invalid Date") && !isNaN(new Date(val))) return new Date(val);
        return val;
    }

    makeLower(val) {
        if(typeof val === "string") return val.toLowerCase();
        return val;
    }

    toDate(value = null, lang = "en-CA") { // en-CA will show value in input field (https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today)
        let date = (!value) ? new Date() : new Date(value);
        return date.toLocaleDateString(lang);
    }
}