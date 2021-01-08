import GetLocation from 'react-native-get-location'
import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, View } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import network from '../network/Network'
import { initiateSearch, updateLocation, errorOccured, completeSearch } from '../Redux/LocationActions'
import { conditionalRender, getWeekDay, isPlatformAndroid } from '../utils/Utility'
import Error from './Error'
import Forecast from './Forecast'
import Loader from './Loader'

const Main = (props) => {

    const dispatch = useDispatch()
    const [currentTemp, setCurrentTemp] = useState(null)
    const [forecast, setForecast] = useState([])

    useEffect(() => {
        getCurrentLocation()
    }, [])

    async function requestLocationPermission() {
        try{
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if(permission) {
                return true
            }
        } catch(error) {
            console.log("Error in permission: " + error)
        }

        return false
    }
    async function getCurrentLocation() {
        if(isPlatformAndroid()) {
            if(! await requestLocationPermission()){
                dispatch(errorOccured())
                return;
            }
        }
        dispatch(initiateSearch())
        GetLocation.getCurrentPosition().then((position) => {
            
            dispatch(updateLocation(position.latitude, position.longitude))
            getWeatherForecast(position.latitude, position.longitude)
        }).catch((error) => {
            dispatch(errorOccured())
            
        })
    }

    function getWeatherForecast(lat, lon) {
        
        network.getWeatherForecast(lat, lon).then((response) => {
            console.log("Response: " + JSON.stringify(response))
            dispatch(completeSearch())
            if(response.current && response.current.temp) {
                setCurrentTemp(response.current.temp)
            }
            if(response.daily) {
                var allForecasts = get5DayForecast(response.daily)
                setForecast(allForecasts)
            }
            
        }).catch((error) => {
            console.log("Error: " + error)
            dispatch(errorOccured())
        })
    }

    return (
        <>
            <View style={{ flex: 1}}>
                {conditionalRender(!props.isError && !props.isLoading, <Forecast currentTemp={currentTemp} location={{ lat: props.latitude, lon: props.longitude }} forecast={forecast} />)}
                {conditionalRender(props.isError && !props.isLoading, <Error retry={getCurrentLocation}/>)}
                {conditionalRender(props.isLoading, <Loader />)}
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

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        initiateSearch,
        updateLocation,
        errorOccured,
        completeSearch,
    }, dispatch)
)

const mapStateToProps = (state) => {
    const {isError, isLoading, latitude, longitude} = state.locationReducer
    console.log("State: " + JSON.stringify(state))
    return {isError, isLoading, latitude, longitude};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);