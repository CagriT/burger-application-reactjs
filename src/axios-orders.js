import axios from 'axios';

const instance = axios.create({ baseURL: 'https://my-react-project-c3202.firebaseio.com/' });

export default instance;
