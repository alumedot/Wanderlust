//function get current date
function yyyymmdd() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const mm = month < 10 ? '0' + month : month;
    const dd = day < 10 ? '0' + day : day;
    return '' + year + mm + dd;
}
const curDate = yyyymmdd();