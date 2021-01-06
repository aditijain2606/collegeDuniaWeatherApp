
export function getWeekDay(timestamp) {
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    
    var date = new Date(timestamp * 1000)
    console.log("Date: " + date)
    var day = date.getDay()
    console.log("Weekday: " + weekdays[day])
    return weekdays[day]
}