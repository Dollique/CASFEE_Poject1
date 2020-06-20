export class Utils {
    toDate(value = null, lang = "en-CA") { // en-CA will show value in input field (https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today)
        let date = (!value) ? new Date() : new Date(value);
        return date.toLocaleDateString(lang);
    }
}