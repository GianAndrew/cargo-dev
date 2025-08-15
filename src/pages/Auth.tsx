import { useAxios } from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import AlertModal from '@/components/AlertModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type AuthProps = {
	code: string | undefined;
};

const Auth = () => {
	const navigate = useNavigate();
	const { auth, storeAuth } = useAuth();

	const developer_code_ref = useRef<HTMLInputElement>(null);

	const [seePass, setSeePass] = useState<boolean>(false);

	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		message: string;
		type: 'error' | 'success';
	}>({
		title: 'Login Failed',
		message: 'Invalid developer code',
		type: 'error',
	});

	const api = useAxios();

	const auth_mutation = useMutation({
		mutationFn: async (data: AuthProps) => {
			const response = await api.post('/api/admin/login', data);
			return response.data;
		},
		onSuccess: (data) => {
			storeAuth(data.token);
			navigate('/dashboard', { replace: true });
			console.log('Authentication successful:', data);
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				setOpenAlert(true);
				setAlertMessage((prev) => ({
					...prev,
					message: error.response?.data.message || 'Login failed',
					type: 'error',
				}));
			}
		},
	});

	const handleSubmit = () => {
		if (!developer_code_ref.current?.value) {
			setOpenAlert(true);
			setAlertMessage((prev) => ({
				...prev,
				message: 'Developer code is required',
				type: 'error',
			}));
			return;
		}

		const data = {
			code: developer_code_ref.current?.value,
		} as AuthProps;

		auth_mutation.mutate(data);
	};

	const handleSeePass = () => {
		setSeePass((prev) => !prev);
	};

	useEffect(() => {
		if (auth && auth.token) {
			navigate('/dashboard', { replace: true });
			return;
		}
	}, [auth, navigate]);

	return (
		<div className="bg-slate-50 min-h-screen">
			<div className="h-screen container mx-auto flex flex-col justify-center items-center px-4">
				<div className="flex flex-col justify-center items-center gap-2">
					<img src="/logo/cargo-logo-black.png" alt="Admin Login logo" className="w-full max-w-40 h-40 object-contain" />
					<h1 className="text-center text-slate-900 text-md md:text-xl font-bold">Login To Your Admin Account</h1>
					<p className="text-center max-w-80 text-slate-500 text-xs md:text-sm font-normal">Hello Admin, sign in your account by entering your developer code.</p>
				</div>
				<div className="mt-5 flex flex-col justify-center items-center gap-4">
					<div className="flex items-center w-full max-w-sm">
						<input
							ref={developer_code_ref}
							type={seePass ? 'text' : 'password'}
							placeholder="Developer Code"
							className="w-full bg-white text-sm placeholder:text-sm placeholder:text-slate-300 rounded-4xl border border-slate-200 px-5 py-2"
						/>
						<button onClick={handleSeePass} className="ml-2">
							{seePass ? <EyeOff size={20} className="text-slate-300" /> : <Eye size={20} className="text-slate-300" />}
						</button>
					</div>
					<button onClick={handleSubmit} className="bg-slate-900 text-white text-xs font-semibold rounded-4xl px-8 py-3 ml-2 hover:bg-slate-800 transition-colors">
						Continue
					</button>
				</div>
				<AlertModal isOpen={openAlert} content={alertMessage} onClose={() => setOpenAlert(false)} />
			</div>
		</div>
	);
};

export default Auth;
