export class Utils {
    toDate(value = null) { // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
        let date = (!value) ? new Date() : new Date(value);
        return date.toISOString().replace('T', ' ').substr(0, 19);
    }
}