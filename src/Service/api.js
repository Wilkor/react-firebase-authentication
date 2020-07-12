import axios from 'axios';
// baseURL:'https://tindev-wilkor-backend.herokuapp.com'
const api = axios.create({
    baseURL:'http://localhost:3333'
  
})


export default api;
