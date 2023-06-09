import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
// const token = cookies.get('token');
// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  (request) => {
    //console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    //console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status == 401) window.location.href = '/login';
    if (error.response.status == 500) message.error('oops, an error happened!');

    return Promise.reject(error);
  }
);

export default instance;
