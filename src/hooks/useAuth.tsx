import { useState } from 'react';

const useAuth = () => {
	const [token] = useState(sessionStorage.getItem('token'));

	const [auth, setAuth] = useState({ token });

	const storeAuth = (newToken: string) => {
		sessionStorage.setItem('token', newToken);
		setAuth({ token: newToken });
	};
	const deleteAuth = () => {
		sessionStorage.removeItem('token');
		setAuth({ token: null });
	};
	return { auth, token, storeAuth, deleteAuth };
};

export { useAuth };
