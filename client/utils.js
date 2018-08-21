export function FormattedDate(dateIntMonDay){
    const d = dateIntMonDay < 1000 ? '0' + dateIntMonDay.toString() : dateIntMonDay.toString();

    this.month = d.substring(0,2);
    this.day = d.substring(2);
    this.year = (new Date()).getFullYear();
    this.date = this.month + '/' + this.day + '/' + this.year;
}