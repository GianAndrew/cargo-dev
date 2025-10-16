import { Mail, Lock, Eye, EyeOff, AlertCircle, Trash2, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '@/hooks/useAxios';
import { isAxiosError } from 'axios';
import AlertModal from '@/components/AlertModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const LoginDeleteAccount = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [emailFocused, setEmailFocused] = useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [showOtpModal, setShowOtpModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [otp, setOtp] = useState(['', '', '', '']);
	const [otpError, setOtpError] = useState('');
	const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

	const navigate = useNavigate();

	const login_mutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			const response = await api.post('/api/users/login-delete-account', { email, password });
			return response.data;
		},
		onSuccess: (data) => {
			console.log('Login successful:', data);
			setShowOtpModal(true);
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				console.log(error);
				if (error.response?.status === 400) {
					setAlertMessage({
						title: 'Login Failed',
						message: error.response?.data.message || 'Invalid credentials',
						type: 'error',
					});
					setOpenAlert(true);
				}
				if (error.response?.status === 404) {
					setAlertMessage({
						title: 'Login Failed',
						message: error.response?.data.message || 'Invalid credentials',
						type: 'error',
					});
					setOpenAlert(true);
				}
			}
		},
	});

	const verify_otp_mutation = useMutation({
		mutationKey: ['verify-otp'],
		mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
			const response = await api.post('/api/users/login-delete-account/verify-otp', { email: email, otp: parseInt(otp) });
			return response.data;
		},
		onSuccess: (data) => {
			console.log('OTP verification successful:', data);
			setShowConfirmModal(true);
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				console.log(error);
				if (error.response?.status === 400) {
					setAlertMessage({
						title: 'OTP Verification Failed',
						message: error.response?.data.message || 'OTP verification failed. Please try again.',
						type: 'error',
					});
					setOpenAlert(true);
					setOtp(['', '', '', '']);
				}
			}
		},
	});

	const delete_account_mutation = useMutation({
		mutationKey: ['delete-account'],
		mutationFn: async ({ email }: { email: string }) => {
			const response = await api.post('/api/users/delete-account', { email: email });
			return response.data;
		},
		onSuccess: (data) => {
			console.log('Account deletion successful:', data);
			setShowConfirmModal(false);
			setShowSuccessModal(true);
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				console.log(error);
				setAlertMessage({
					title: 'Account Deletion Failed',
					message: error.response?.data.message || 'Account deletion failed. Please try again.',
					type: 'error',
				});
				setOpenAlert(true);
			}
		},
		onSettled: () => {
			// Reset states
			setEmail('');
			setPassword('');
			setShowPassword(false);
			setEmailError('');
			setPasswordError('');
			setOtp(['', '', '', '']);
			setOtpError('');
		},
	});

	// Email validation
	const validateEmail = (value: string) => {
		if (!value) {
			setEmailError('Email is required');
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setEmailError('Please enter a valid email address');
		} else {
			setEmailError('');
		}
	};

	// Password validation
	const validatePassword = (value: string) => {
		if (!value) {
			setPasswordError('Password is required');
		} else if (value.length < 6) {
			setPasswordError('Password must be at least 6 characters');
		} else {
			setPasswordError('');
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		validateEmail(value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		validatePassword(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		validateEmail(email);
		validatePassword(password);
		setOtp(['', '', '', '']);

		if (!emailError && !passwordError && email && password) {
			login_mutation.mutate({ email, password });
		}
	};

	const handleOtpChange = (index: number, value: string) => {
		// Only allow numbers
		if (value && !/^\d$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		setOtpError('');

		// Auto-focus next input
		if (value && index < 3) {
			otpInputRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		// Handle backspace
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			otpInputRefs.current[index - 1]?.focus();
		}
	};

	const handleOtpPaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').slice(0, 4);
		if (/^\d+$/.test(pastedData)) {
			const newOtp = pastedData.split('');
			while (newOtp.length < 4) newOtp.push('');
			setOtp(newOtp);
			// Focus last filled input
			const lastIndex = Math.min(pastedData.length - 1, 3);
			otpInputRefs.current[lastIndex]?.focus();
		}
	};

	const handleVerifyOtp = () => {
		const otpValue = otp.join('');
		if (otpValue.length !== 4) {
			setOtpError('Please enter the complete 4-digit code');
			return;
		}
		setShowOtpModal(false);
		verify_otp_mutation.mutate({ email: email, otp: otpValue } as { email: string; otp: string });

		// Verify OTP (replace with your actual verification logic)
		console.log('Verifying OTP:', otpValue);

		// If OTP is correct, show confirmation modal
	};

	const handleDeleteAccount = () => {
		// Handle account deletion
		console.log('Account deletion confirmed:', { email, password });
		setShowConfirmModal(false);

		delete_account_mutation.mutate({ email: email });

		// Add your deletion logic here
	};

	return (
		<div className="min-h-screen bg-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Card Container */}
				<div className="bg-slate-50 rounded-2xl shadow-sm p-8 md:p-10">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="inline-block p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full mb-4">
							<Trash2 className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-md md:text-xl font-bold text-slate-900 mb-2">Delete Account</h1>
						<p className="text-slate-600 text-sm">Enter your credentials to permanently delete your account</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Input */}
						<div className="space-y-2">
							<label htmlFor="email" className="block text-sm font-semibold text-slate-700">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Mail className={`w-5 h-5 transition-colors duration-200 ${emailFocused ? 'text-slate-600' : 'text-slate-400'}`} />
								</div>
								<input
									disabled={login_mutation.isPending}
									type="email"
									id="email"
									value={email}
									onChange={handleEmailChange}
									onFocus={() => setEmailFocused(true)}
									onBlur={() => setEmailFocused(false)}
									placeholder="you@example.com"
									className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400  placeholder:text-sm text-sm
										focus:outline-none focus:bg-white transition-all duration-200
										${emailError ? 'border-slate-500 focus:border-slate-500' : 'border-slate-200 focus:border-slate-600'}`}
								/>
								{emailError && (
									<div className="absolute inset-y-0 right-0 pr-4 flex items-center">
										<AlertCircle className="w-5 h-5 text-slate-500" />
									</div>
								)}
							</div>
							{emailError && (
								<div className="flex items-center gap-2 text-slate-600 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
									<AlertCircle className="w-4 h-4" />
									<span>{emailError}</span>
								</div>
							)}
						</div>

						{/* Password Input */}
						<div className="space-y-2">
							<label htmlFor="password" className="block text-sm font-semibold text-slate-700">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Lock className={`w-5 h-5 transition-colors duration-200 ${passwordFocused ? 'text-slate-600' : 'text-slate-400'}`} />
								</div>
								<input
									disabled={login_mutation.isPending}
									type={showPassword ? 'text' : 'password'}
									id="password"
									value={password}
									onChange={handlePasswordChange}
									onFocus={() => setPasswordFocused(true)}
									onBlur={() => setPasswordFocused(false)}
									placeholder="Enter your password"
									className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 placeholder:text-sm text-sm
										focus:outline-none focus:bg-white transition-all duration-200
										${passwordError ? 'border-slate-500 focus:border-slate-500' : 'border-slate-200 focus:border-slate-600'}`}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-slate-100 rounded-r-xl transition-colors"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5 text-slate-600 hover:text-slate-900" />
									) : (
										<Eye className="w-5 h-5 text-slate-600 hover:text-slate-900" />
									)}
								</button>
							</div>
							{passwordError && (
								<div className="flex items-center gap-2 text-slate-600 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
									<AlertCircle className="w-4 h-4" />
									<span>{passwordError}</span>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-3 pt-4">
							<button
								disabled={login_mutation.isPending}
								type="submit"
								className="flex-1 text-sm bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-6 rounded-full font-semibold
									hover:from-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/50
									transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg
									flex items-center justify-center gap-2"
							>
								<Trash2 className="w-5 h-5" />
								Delete Account
							</button>
						</div>
					</form>
				</div>

				{/* Footer */}
				<div className="mt-8 text-center text-sm text-slate-300">
					<p>
						Need help?{' '}
						<a href="mailto:cargoph2025@gmail.com" className="text-slate-900 hover:text-slate-200 transition-colors font-md">
							Contact Support
						</a>
					</p>
				</div>
			</div>

			{/* show otp modal */}
			{showOtpModal && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
					<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
						<div className="text-center mb-6">
							<div className="inline-block p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full mb-4">
								<Shield className="w-8 h-8 text-white" />
							</div>
							<h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Identity</h2>
							<p className="text-slate-600 text-sm">
								We've sent a 4-digit verification code to
								<br />
								<span className="font-semibold text-slate-900">{email}</span>
							</p>
						</div>

						{/* OTP Input */}
						<div className="mb-6">
							<label className="block text-sm font-semibold text-slate-700 mb-3 text-center">Enter Verification Code</label>
							<div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
								{otp.map((digit, index) => (
									<input
										disabled={verify_otp_mutation.isPending}
										key={index}
										ref={(el) => {
											otpInputRefs.current[index] = el;
										}}
										type="text"
										inputMode="numeric"
										maxLength={1}
										value={digit}
										onChange={(e) => handleOtpChange(index, e.target.value)}
										onKeyDown={(e) => handleOtpKeyDown(index, e)}
										className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl
											focus:outline-none focus:border-slate-900 focus:bg-slate-50 transition-all duration-200
											${otpError ? 'border-red-500' : 'border-slate-200'}`}
										placeholder="•"
									/>
								))}
							</div>
							{otpError && (
								<div className="flex items-center justify-center gap-2 text-red-600 text-sm mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
									<AlertCircle className="w-4 h-4" />
									<span>{otpError}</span>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-3">
							<button
								disabled={verify_otp_mutation.isPending}
								onClick={handleVerifyOtp}
								className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-6 rounded-full font-semibold text-sm
									hover:from-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/50
									transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
							>
								Verify & Continue
							</button>
							<button
								disabled={verify_otp_mutation.isPending}
								onClick={() => {
									setShowOtpModal(false);
									setOtp(['', '', '', '']);
									setOtpError('');
								}}
								className="w-full py-3 px-6 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all duration-200"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Confirmation Modal */}
			{showConfirmModal && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
					<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
						<div className="text-center mb-6">
							<div className="inline-block p-4 bg-red-100 rounded-full mb-4">
								<AlertTriangle className="w-8 h-8 text-red-600" />
							</div>
							<h2 className="text-xl font-bold text-slate-900 mb-2">Are you absolutely sure?</h2>
							<p className="text-slate-600 text-sm">This will permanently delete your account and remove all your data from our servers. This action cannot be undone.</p>
						</div>

						<div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
							<div className="flex items-start gap-3 text-xs">
								<AlertCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
								<div className="space-y-2 text-slate-700">
									<p>• All your bookings will be cancelled</p>
									<p>• Your rental history will be deleted</p>
									<p>• You will lose access to your account immediately</p>
									<p>• This cannot be reversed</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<button
								disabled={delete_account_mutation.isPending}
								onClick={handleDeleteAccount}
								className="flex-1 bg-red-600 text-white py-3 px-6 rounded-full font-semibold text-sm
									hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
							>
								<Trash2 className="w-5 h-5" />
								Yes, Delete My Account
							</button>
							<button
								disabled={delete_account_mutation.isPending}
								onClick={() => setShowConfirmModal(false)}
								className="flex-1 py-3 px-6 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all duration-200"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Success Modal */}
			{showSuccessModal && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
					<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
						<div className="text-center mb-6">
							<div className="inline-block p-4 bg-green-100 rounded-full mb-4">
								<CheckCircle className="w-8 h-8 text-green-600" />
							</div>
							<h2 className="text-xl font-bold text-slate-900 mb-2">Account Deleted Successfully</h2>
							<p className="text-slate-600 text-sm">Your account has been permanently deleted. All your data has been removed from our servers.</p>
						</div>

						<div className="flex flex-col gap-3">
							<button
								onClick={() => {
									setShowSuccessModal(false);
									navigate('/');
								}}
								className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-6 rounded-full font-semibold text-sm
									hover:from-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/50
									transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
							>
								Return to Home
							</button>
						</div>
					</div>
				</div>
			)}

			<AlertModal isOpen={openAlert} content={alertMessage} onClose={() => setOpenAlert(false)} />
			{(login_mutation.isPending || verify_otp_mutation.isPending || delete_account_mutation.isPending) && <LoadingSpinner text="Loading..." size="md" color="primary" className="" />}
		</div>
	);
};

export default LoginDeleteAccount;
