import React from 'react'
import { Text, FlatList, StyleSheet, View } from "react-native";

const renderForecastItem = ({ item }) => {

    return (<>
        <View style={styles.listView}>
            <Text style={styles.dayText}>{item.day} </Text>
            <Text style={styles.tempText}>{item.temperature}</Text>
        </View>
    </>)
}

const seperator = () => {
    return <View style={styles.seperator} />
}

const Forecast = (props) => {

    return (<>
        <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
            <Text style={styles.currentTemp}>{props.currentTemp}</Text>
            <Text style={styles.locationText}>{props.location ? "Delhi" : "New Delhi"}</Text>
        </View>
        <View style={{ width: "100%", alignSelf: "flex-end" }}>
            {seperator()}
            <FlatList
                data={props.forecast}
                renderItem={renderForecastItem}
                keyExtractor={item => item.day}
                ItemSeparatorComponent={seperator}
            />
        </View>


    </>)
}

const styles = StyleSheet.create({
    currentTemp: {
        fontSize: 100,
        alignSelf: "center"
    },
    locationText: {
        fontSize: 50,
        alignSelf: "center"
    },
    listView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginVertical: 20
    },
    dayText: {
        fontSize: 25
    },
    tempText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    seperator: {
        height: 1,
        backgroundColor: "black"
    }
})

export default Forecast;