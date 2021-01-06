import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import network from '../network/Network'
import { getWeekDay } from '../utils/Utility'

const Main = (props) => {

    const [location, setLocation] = useState({ lat: null, lon: null })
    const [currentTemp, setCurrentTemp] = useState(null)
    const [forecast, setForecast] = useState([])

    useEffect(() => {
        setLocation({
            lat: 28.488772095224803,
            lon: 77.0959881108008
        })
        getWeatherForecast()
    }, [])

    function getWeatherForecast() {
        network.getWeatherForecast(location.lat, location.lon).then((response) => {
           // console.log("Response: " + JSON.stringify(response))
            if(response.current && response.current.temp) {
                setCurrentTemp(response.current.temp)
            }
            if(response.daily) {
                get5DayForecast(response.daily)
            }
        }).catch((error) => {
            console.log("Error: " + error)
        })
    }

    function get5DayForecast(dailyForecast) {
        var allForecasts = []
        //first element is current temperature, skipping first
        for(var i = 1; i < dailyForecast.length && i <= 5; i++) {
            var day = getWeekDay(dailyForecast[i].dt)
            var tmp = dailyForecast[i].temp.day
            allForecasts.push({
                day: day,
                temperature: tmp
            })
        }

        setForecast(allForecasts)
    }

    const renderForecast = ({item}) => {
        
        return (<>
        <Text>{item.day}{'     '}{item.temperature}</Text>
        </>)
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <Text>{currentTemp}</Text>
                <FlatList 
                style={{backgroundColor: "yellow"}}
                    data={forecast}
                    renderItem={renderForecast}
                    keyExtractor={item => item.day}
                />
            </View>
        </>
    )
}

export default Main;