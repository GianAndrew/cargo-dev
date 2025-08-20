import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight, Frown, Search } from 'lucide-react';
import { useState } from 'react';

type User = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone_no: string;
	role: 'rentee' | 'owner';
	status: string;
	profile_file_folder: string;
	profile_pic_key: string;
	created_at: string;
	birth_date: string;
};

const Users = () => {
	const api = useAxios();

	const [search, setSearch] = useState<string>('');

	const [openUserDetailsModal, setOpenUserDetailModal] = useState(false);
	const [userDetails, setUserDetails] = useState({
		id: 0,
		first_name: '',
		last_name: '',
		email: '',
		phone_no: '',
		role: '',
		profile_file_folder: '',
		profile_pic_key: '',
		status: '',
		birth_date: '',
		created_at: '',
	});

	const users_query = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await api.get('/api/admin/users');
			return response.data;
		},
	});

	const setUserDetailsFromQuery = (user: User) => {
		setUserDetails(user);
		setOpenUserDetailModal(true);
	};

	const handleCloseUserDetails = () => {
		setOpenUserDetailModal(false);
	};

	const filteredUsers = (user: User) => {
		return user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase());
	};

	if (users_query.isPending) {
		return (
			<>
				<div className="flex bg-slate-50 h-screen min-h-screen w-full">
					<div className="flex flex-col py-2 px-4 flex-1">
						<div className="w-full max-w-40 h-8  bg-white rounded-xl my-2"></div>
						<div className="w-full max-w-72 h-8  bg-white rounded-xl "></div>
						<div className="flex flex-col w-full gap-2 mt-4">
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
							<div className="w-full h-14 bg-white rounded-xl"></div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="bg-slate-50 min-h-screen p-5 w-full">
				<div className="my-2 flex flex-col md:flex-row justify-between items-start gap-2">
					<div>
						<h1 className="text-lg font-medium text-slate-700">{users_query.data?.length || 0} Users</h1>
						<p className="text-sm font-normal text-slate-500">Manage renter accounts and their details</p>
					</div>
					<div className="flex items-center gap-2 w-full md:max-w-60 rounded-full py-2.5 px-3 bg-white">
						<Search size={14} className="text-slate-400" />
						<input
							type="text"
							placeholder="Search user"
							className="w-full bg-white text-xs font-normal text-slate-700 placeholder:text-slate-400 outline-0"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex-1 mt-5">
					{users_query.data?.filter(filteredUsers).length === 0 ? (
						<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
							<Frown size={30} className="text-slate-500" />
							<p className="text-sm text-slate-500 font-medium">No users found.</p>
						</div>
					) : (
						<>
							{users_query.data?.filter(filteredUsers).map((user: User) => (
								<div
									key={user.id}
									className="w-full flex justify-start items-center py-2.5 px-4 bg-white rounded-lg my-1.5 overflow-hidden hover:bg-slate-100"
									onClick={() => setUserDetailsFromQuery(user)}
								>
									<div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-5 md:gap-10">
										{user.profile_file_folder === null && user.profile_pic_key === null ? (
											<img src={`/images/default_image.jpg`} alt="dp" className="max-w-8 w-full h-8 rounded-4xl object-cover ring-2 ring-slate-200" />
										) : (
											<img
												src={`${SPACES_ENDPOINT}/${user.profile_file_folder}/${user.profile_pic_key}`}
												alt="dp"
												className="w-8 h-8 rounded-4xl object-cover ring-2 ring-slate-200"
											/>
										)}

										<div className="w-full flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2">
											<p className="w-full text-xs text-slate-900 font-medium">
												{user.first_name} {user.last_name}
											</p>

											<div className="w-full">
												<span className="text-xs font-regular text-slate-500">Joined at:</span>
												<p className="w-full text-xs text-slate-900 font-medium">{dayjs(user.created_at).format('MMM D, YYYY h:mm A')}</p>
											</div>
										</div>
									</div>
									<button className="p-1.5 rounded-full bg-slate-200 cursor-pointer" onClick={() => setUserDetailsFromQuery(user)}>
										<ChevronRight size={16} className="text-slate-400" />
									</button>
								</div>
							))}
						</>
					)}
				</div>
			</div>

			{/* User Details Modal */}
			{openUserDetailsModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-2">
						<div className="mb-4 flex flex-col justify-center items-center">
							<img
								src={
									userDetails.profile_file_folder === null && userDetails.profile_pic_key === null
										? `/images/default_image.jpg`
										: `${SPACES_ENDPOINT}/${userDetails.profile_file_folder}/${userDetails.profile_pic_key}`
								}
								alt="dp"
								className="w-24 h-24 rounded-full object-cover ring-2 ring-slate-200 mb-4"
							/>
							<h2 className="text-lg font-semibold text-slate-900">
								{userDetails.first_name} {userDetails.last_name}
							</h2>
							<div className="w-full p-4 bg-slate-50 mt-2 space-y-2">
								<div>
									<span className="text-xs font-normal text-slate-500">Phone no:</span>
									<p className="text-xs font-medium text-slate-500">{userDetails.phone_no}</p>
								</div>
								<div>
									<span className="text-xs font-normal text-slate-500">Email:</span>
									<p className="text-xs font-medium text-slate-500">{userDetails.email}</p>
								</div>
								<div>
									<span className="text-xs font-normal text-slate-500">Birth date:</span>
									<p className="text-xs font-medium text-slate-500">{dayjs(userDetails.birth_date).format('MMMM D, YYYY')}</p>
								</div>
								<div>
									<span className="text-xs font-normal text-slate-500">Joined at:</span>
									<p className="text-xs font-medium text-slate-500">{dayjs(userDetails.created_at).format('MMMM D, YYYY')}</p>
								</div>
							</div>
						</div>

						<div className="w-full flex flex-col gap-2">
							<button className="text-xs font-semibold w-full px-5 py-3 bg-slate-900 text-white rounded-4xl hover:bg-slate-800" onClick={handleCloseUserDetails}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Users;
