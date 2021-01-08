
import { combineReducers } from 'redux'
import { COMPLETE_SEARCH, ERROR_OCCURED, INITATE_SEARCH, UPDATE_LOCATION } from './LocationActions';

const INITIAL_STATE = {
    isError: false,
    isLoading: false,
    latitude: null,
    longitude: null
};

const locationReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case UPDATE_LOCATION: 
            return {
                ...state,
                isError: false,
                latitude: action.latitude,
                longitude: action.longitude
            }

        case INITATE_SEARCH:
            return {
                ...state,
                isLoading: true,
            }
        case COMPLETE_SEARCH:
            return {
                ...state,
                isLoading: false,
            }
        case ERROR_OCCURED:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state
    }
}

export default combineReducers({
    locationReducer: locationReducer
});