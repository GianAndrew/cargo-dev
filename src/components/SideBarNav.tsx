import { useAuth } from '@/hooks/useAuth';
import { Book, CarFront, House, Info, LogOut, MessageCircleWarning, SquareUser, Users } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
	{ icon: <House size={18} className="text-slate-700" />, label: 'Dashboard', to: '/dashboard' },
	{ icon: <Book size={18} className="text-slate-700" />, label: 'Bookings', to: '/bookings' },
	{ icon: <Users size={18} className="text-slate-700" />, label: 'Users', to: '/users' },
	{ icon: <SquareUser size={18} className="text-slate-700" />, label: 'Rentals', to: '/rentals' },
	{ icon: <CarFront size={18} className="text-slate-700" />, label: 'Vehicles', to: '/vehicles' },
	{ icon: <MessageCircleWarning size={18} className="text-slate-700" />, label: 'Complaints', to: '/complaints' },
];

const SideBarNav = () => {
	const { deleteAuth } = useAuth();
	const navigate = useNavigate();

	const [openLogOutModal, setOpenLogOut] = useState<boolean>(false);
	const [logOutMessage, setLogOutMessage] = useState<{
		title: string;
		message: string;
		type: 'error' | 'success';
	}>({
		title: 'Login Failed',
		message: 'Invalid developer code',
		type: 'error',
	});

	const confirmLogOut = () => {
		setOpenLogOut(true);
		setLogOutMessage({
			title: 'Confirm Logout',
			message: 'Are you sure you want to log out?',
			type: 'error',
		});
	};

	const logOut = () => {
		navigate('/auth', { replace: true });
		deleteAuth();
	};

	const cancelLogOut = () => {
		setOpenLogOut(false);
	};
	return (
		<>
			<div className="w-full flex flex-col max-w-20 sm:max-w-52 h-screen min-h-screen px-5 py-8 overflow-hidden bg-white">
				<div className="w-full justify-center flex items-center">
					<Link to={'/dashboard'}>
						<img src={'/logo/cargo-logo-black.png'} alt="Logo" width={125} height={125} />
					</Link>
				</div>

				<div className="flex flex-col flex-1 mt-2 px-1">
					{NAV_ITEMS.map((item) => (
						<Link key={item.label} className="flex justify-center sm:justify-start items-center py-3 transition-colors duration-300 transform rounded-lg" to={item.to}>
							{item.icon}
							<span className="hidden sm:block text-slate-700 mx-2 text-sm font-medium">{item.label}</span>
						</Link>
					))}
					<button onClick={confirmLogOut} className="flex justify-center sm:justify-start items-center py-3 transition-colors duration-300 transform rounded-lg cursor-pointer">
						<LogOut size={18} className="text-slate-700" />
						<span className="hidden sm:block text-slate-700 mx-2 text-sm font-medium">Log out</span>
					</button>
				</div>
			</div>

			{openLogOutModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-2">
						<div className="mb-4 flex flex-col justify-center items-center">
							<Info className="text-slate-900" size={30} />
							<div className="text-center mt-4">
								<h2 className="text-lg font-semibold text-slate-900">{logOutMessage.title}</h2>
								<p className="text-sm font-medium text-slate-500">{logOutMessage.message}</p>
							</div>
						</div>

						<div className="w-full flex flex-col gap-2">
							<button onClick={logOut} className="text-xs font-semibold w-full px-5 py-3 bg-slate-900 text-white rounded-4xl hover:bg-slate-800">
								Okay
							</button>
							<button onClick={cancelLogOut} className="text-xs font-semibold w-full px-5 py-3 text-slate-900 rounded-4xl hover:bg-slate-100">
								Not now
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SideBarNav;
