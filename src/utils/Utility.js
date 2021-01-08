import { Platform } from "react-native";
import strings from "./strings";

export function getWeekDay(timestamp) {
    var weekdays = new Array(
        strings.sunday, strings.monday, strings.tuesday, strings.wednesday, strings.thursday, strings.friday, strings.saturday
    );

    var date = new Date(timestamp * 1000)
    var day = date.getDay()
    return weekdays[day]
}

export function conditionalRender(condition, renderContent) {
    return condition ? renderContent : null
}

export function isPlatformAndroid() {
    return Platform.OS == "android"
}

export function isPlatformIOS() {
    return Platform.OS == "ios"
}