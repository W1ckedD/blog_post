import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
    headers: {
        authorization: 'Bearer ' + token
    }
})