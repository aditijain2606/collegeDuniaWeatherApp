import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import strings from "../utils/strings";

const Error = (props) => {
    return (<View style={styles.errorView}>
        <Text style={styles.errorText}>{strings.error}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={props.retry} >
            <Text style={styles.buttonText}>{strings.retry}</Text>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    errorView: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    errorText: {
        marginHorizontal: 20,
        fontSize: 60,
        alignSelf: "center"
    },
    button: {
        borderColor: "black",
        borderWidth: 2,
        alignSelf: "center",
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    buttonText: {
        fontSize: 15
    }
})

export default Error;