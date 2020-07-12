import axios from 'axios';
// baseURL:'https://tindev-wilkor-backend.herokuapp.com'
const api = axios.create({
    baseURL:'http://tindev-wilkor-backend.herokuapp.com'
  
})


export default api;
