import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type User = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_no: string;
	role: 'rentee' | 'owner';
	profile_file_folder: string;
	profile_pic_key: string;
};

const Users = () => {
	const api = useAxios();

	const navigate = useNavigate();

	const users_query = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await api.get('/api/admin/users');
			return response.data;
		},
	});

	const viewUserDetails = (id: string) => {
		navigate(`/users/${id}`);
	};

	if (users_query.isPending) {
		return (
			<>
				<div className="flex bg-slate-50 h-screen min-h-screen w-full">
					<div className="flex flex-col py-2 px-4 flex-1">
						<div className="w-full max-w-40 h-8  bg-white rounded-xl my-2"></div>
						<div className="w-full max-w-72 h-8  bg-white rounded-xl "></div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-4 px-3 bg-white mt-2 flex-1 gap-2  rounded-xl">
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="w-full flex-1 bg-slate-100 rounded-xl"></div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="bg-slate-50 min-h-screen p-5 w-full">
			<div className="my-2 ">
				<h1 className="text-lg font-medium text-slate-700">{users_query.data?.length || 0} Users</h1>
				<p className="text-sm font-normal text-slate-500">Manage renter accounts and their details</p>
			</div>

			<div className="flex-1">
				{users_query.data?.length === 0 ? (
					<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
						<Frown size={30} className="text-slate-500" />
						<p className="text-sm text-slate-500 font-medium">No users found.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
						{users_query.data?.map((user: User) => (
							<div key={user.id} className="bg-white py-4 px-6 rounded-xl hover:bg-slate-100">
								<div className="flex flex-col lg:flex-row justify-evenly items-start gap-5">
									{user.profile_file_folder === null && user.profile_pic_key === null ? (
										<img src={`/images/default_image.jpg`} alt="dp" className="max-w-16 w-full h-16 rounded-4xl object-cover ring-3 ring-slate-200" />
									) : (
										<img
											src={`${SPACES_ENDPOINT}/${user.profile_file_folder}/${user.profile_pic_key}`}
											alt="dp"
											className="w-16 h-16 rounded-4xl object-cover ring-3 ring-slate-200"
										/>
									)}

									<div className="flex flex-col justify-start items-start gap-1">
										<h2 className="text-slate-900 text-md font-semibold capitalize">
											{user.first_name} {user.last_name}
										</h2>
										<p className="text-xs text-slate-500 font-medium">{user.phone_no}</p>
										<span className=" text-xs text-slate-500 font-normal">{user.email}</span>
									</div>
								</div>
								<div>
									<button
										className="w-full mt-4 text-slate-500 px-4 py-3 rounded-4xl flex justify-center items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
										onClick={() => viewUserDetails(user.id)}
									>
										<span className="text-xs text-slate-500 font-medium">View details</span>
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Users;
