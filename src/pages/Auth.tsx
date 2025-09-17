import { useAxios } from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import AlertModal from '@/components/AlertModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

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
					<h1 className="text-center text-slate-900 text-md md:text-xl font-bold">Login To Developer Account</h1>
					<p className="text-center max-w-80 text-slate-500 text-xs md:text-sm font-normal">Hello Admin, sign in your account by entering your developer code.</p>
				</div>
				<div className="mt-5 flex justify-center items-center gap-2">
					<div className="flex justify-between items-center w-full max-w-sm rounded-4xl border bg-white border-slate-200 px-3 py-2 ">
						<input
							ref={developer_code_ref}
							type={seePass ? 'text' : 'password'}
							placeholder="Developer Code"
							disabled={auth_mutation.isPending}
							className="w-full bg-white text-xs placeholder:text-xs placeholder:text-slate-300 outline-none"
						/>
						<button onClick={handleSeePass} className="ml-2">
							{seePass ? <EyeOff size={20} className="text-slate-300" /> : <Eye size={20} className="text-slate-300" />}
						</button>
					</div>
					<button
						onClick={handleSubmit}
						disabled={auth_mutation.isPending}
						className="flex justify-center items-center bg-white text-slate-900 text-xs font-semibold border border-slate-200 rounded-4xl px-2 py-2 hover:bg-slate-100 transition-colors"
					>
						<ArrowRight size={16} className="text-slate-400 inline-block" />
					</button>
				</div>
				<AlertModal isOpen={openAlert} content={alertMessage} onClose={() => setOpenAlert(false)} />
				{auth_mutation.isPending && <LoadingSpinner text="Authenticating..." size="md" color="primary" className="" />}
			</div>
		</div>
	);
};

export default Auth;
