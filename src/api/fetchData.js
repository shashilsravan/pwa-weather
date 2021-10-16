// importing axios
import axios from 'axios';

// URL for api calls
const URL = 'https://api.openweathermap.org/data/2.5/weather'

// place your API KEY here
const API_KEY = '5a66d9c1ac43a1b342b1fb2b1a16fa68'

export default async function fetchData(q) {
    const res = await axios.get(URL, {
        params: {
            q, units: 'metric', APPID: API_KEY
        }
    })
    return res.data
}
