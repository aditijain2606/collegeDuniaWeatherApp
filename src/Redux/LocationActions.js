
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const INITATE_SEARCH = 'INITATE_SEARCH';
export const ERROR_OCCURED = 'ERROR_OCCURED';
export const COMPLETE_SEARCH = 'COMPLETE_SEARCH';

export const updateLocation = (latitude, longitude) => (
    {
        type: UPDATE_LOCATION,
        latitude: latitude,
        longitude: longitude
    }
)

export const initiateSearch = () => (
    {
        type: INITATE_SEARCH
    }
)

export const errorOccured = () => (
    {
        type: ERROR_OCCURED
    }
)

export const completeSearch = () => (
    {
        type: COMPLETE_SEARCH
    }
)