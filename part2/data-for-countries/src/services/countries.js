import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (city, cca2) => {
    const request = axios.get(`${weatherUrl}${city},${cca2}&APPID=${api_key}`)
    return request.then(response => response.data)
}

export default { getAll, getWeather }