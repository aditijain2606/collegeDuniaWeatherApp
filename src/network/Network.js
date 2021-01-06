import { create } from 'apisauce'
import { API_ID, BASE_URL, TIME_OUT } from '../utils/Constants'

const api = create({ 
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

class Network {

    async getRequest(path) {
        const response = await api.get(path)
        
        return new Promise((resolve, reject) => {
            if(response.ok) {
                resolve(response.data)
            } else {
                reject(true)
            }
        })
    }
    
    async getWeatherForecast(lat, lon) {
        let path = `onecall?lat=${lat}&lon=${lon}&appid=${API_ID}&exclude=minutely,hourly,alerts&units=metric`
        let response = await this.getRequest(path)
        return response
    }
}
const network = new Network();
export default network;

