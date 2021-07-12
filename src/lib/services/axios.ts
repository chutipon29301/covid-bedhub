import { parseCookies } from 'nookies';
import { setIsLoading } from '$lib/store';
import _axios from 'axios';

const axios = _axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

axios.interceptors.request.use((config) => {
	setIsLoading(true);
	const { access_token } = parseCookies();
	config.headers.Authorization = `${access_token}`;
	return config;
});

axios.interceptors.response.use((config) => {
	setIsLoading(false);
	return config;
});

export default axios;
