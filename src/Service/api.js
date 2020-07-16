import axios from 'axios';
import environment from '../constants/environment';
// baseURL:'https://tindev-wilkor-backend.herokuapp.com'
const api = axios.create({
    baseURL: environment.HOST
  
})


export default api;
