import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import network from '../network/Network'
import { conditionalRender, getWeekDay } from '../utils/Utility'
import Error from './Error'
import Forecast from './Forecast'

const Main = (props) => {

    const [location, setLocation] = useState({ lat: null, lon: null })
    const [currentTemp, setCurrentTemp] = useState(null)
    const [forecast, setForecast] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        setLocation({
            lat: 28.488772095224803,
            lon: 77.0959881108008
        })
        getWeatherForecast()
    }, [])

    function getWeatherForecast() {
        setError(false)
        network.getWeatherForecast(location.lat, location.lon).then((response) => {
           // console.log("Response: " + JSON.stringify(response))
            if(response.current && response.current.temp) {
                setCurrentTemp(response.current.temp)
            }
            if(response.daily) {
                var allForecasts = get5DayForecast(response.daily)
                setForecast(allForecasts)
            }
            
        }).catch((error) => {
            console.log("Error: " + error)
            setError(true)
        })
    }

    return (
        <>
            <View style={{ flex: 1}}>
                {conditionalRender(!error, <Forecast currentTemp={currentTemp} location={location} forecast={forecast} />)}
                {conditionalRender(error, <Error retry={getWeatherForecast}/>)}
            </View>
        </>
    )
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
    return allForecasts
}

export default Main;