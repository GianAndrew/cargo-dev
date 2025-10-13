import axios from 'axios';

const BASE_URL = 'https://api.cargorental.me';

const useAxios = () => {
	const token_session = sessionStorage.getItem('token');

	const api = axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	api.interceptors.request.use((config) => {
		if (token_session) {
			config.headers.Authorization = `Bearer ${token_session}`;
		}
		return config;
	});

	return api;
};

export { useAxios };
