import axios from 'axios';
import { useState } from 'react';

const BASE_URL = 'http://192.168.100.57:3000';

const useAxios = () => {
	const token_session = localStorage.getItem('token');

	const [token] = useState<string | null>(token_session ? JSON.parse(token_session) : null);

	const api = axios.create({
		baseURL: BASE_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	api.interceptors.request.use((config) => {
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	return api;
};

export { useAxios };
