import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = `${BASE_URL}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
