import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight, Frown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TOwners = {
	id: string;
	car_rental_name: string;
	status: string;

	created_at: string;
	profile_file_folder: string;
	profile_pic_key: string;
	_count: {
		cars: number;
	};
};

const OwnerStatus = (status: TOwners['status']) => {
	switch (status) {
		case 'PENDING':
			return { bgclass: 'bg-amber-100', textclass: 'text-amber-500', value: 'Pending' };
		case 'WAITING_VERIFICATION':
			return { bgclass: 'bg-blue-100', textclass: 'text-blue-500', value: 'Waiting for Approval' };
		case 'APPROVED':
			return { bgclass: 'bg-emerald-100', textclass: 'text-emerald-500', value: 'Completed' };
		case 'REJECTED':
			return { bgclass: 'bg-rose-100', textclass: 'text-rose-500', value: 'Rejected' };
		default:
			return { bgclass: 'bg-slate-100', textclass: 'text-slate-500', value: 'Unknown' };
	}
};

const Rentals = () => {
	const [category, setCategory] = useState<string>('all');
	const [search, setSearch] = useState<string>('');

	// pagination state
	const [page, setPage] = useState<number>(1);
	const [pageSize] = useState<number>(10); // change page size as needed

	const navigate = useNavigate();

	const api = useAxios();

	const owners_query = useQuery({
		queryKey: ['owners'],
		queryFn: async () => {
			const response = await api.get('/api/admin/owners');
			return response.data;
		},
	});

	const filteredOwners = (owner: TOwners) => {
		let matchesCategory = false;
		const ownerSearch = owner.car_rental_name.toLowerCase().includes(search.toLowerCase());

		if (category === 'all') {
			matchesCategory = true;
		} else if (category === 'pending') {
			matchesCategory = owner.status === 'WAITING_VERIFICATION';
		} else {
			matchesCategory = owner.status === category.toUpperCase();
		}

		return matchesCategory && ownerSearch;
	};

	const navigateOwnerDetails = (owner_id: string) => {
		navigate(`/rentals/${owner_id}`);
	};

	const total = owners_query.data?.length ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	const paginated = owners_query.data ? owners_query.data.filter(filteredOwners).slice((page - 1) * pageSize, page * pageSize) : [];

	useEffect(() => {
		setPage(1);
	}, [category, search, owners_query.data]);

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	if (owners_query.isPending) {
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
		<div className="bg-slate-50 min-h-screen h-screen p-5 w-full">
			<div className="my-2 flex flex-col md:flex-row justify-between items-start gap-2">
				<div>
					<h1 className="text-lg font-medium text-slate-700">Rentals</h1>
					<p className="text-sm font-normal text-slate-500">Manage user rentals and their details.</p>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						<button
							className={`${
								category === 'all'
									? 'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-200'
									: 'bg-white text-slate-500 hover:bg-slate-300 hover:text-slate-700'
							}  px-3 py-1.5 rounded-full text-xs  transition-colors`}
							onClick={() => setCategory('all')}
						>
							<span>All</span>
						</button>
						<button
							className={`${
								category === 'pending'
									? 'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-200'
									: 'bg-white text-slate-500 hover:bg-slate-300 hover:text-slate-700'
							}  px-3 py-1.5 rounded-full text-xs hover:bg-slate-300 transition-colors`}
							onClick={() => setCategory('pending')}
						>
							<span>Pending</span>
						</button>
						<button
							className={`${
								category === 'approved'
									? 'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-200'
									: 'bg-white text-slate-500 hover:bg-slate-300 hover:text-slate-700'
							}  px-3 py-1.5 rounded-full text-xs hover:bg-slate-300 transition-colors`}
							onClick={() => setCategory('approved')}
						>
							<span>Approved</span>
						</button>
						<button
							className={`${
								category === 'rejected'
									? 'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-200'
									: 'bg-white text-slate-500 hover:bg-slate-300 hover:text-slate-700'
							}  px-3 py-1.5 rounded-full text-xs hover:bg-slate-300 transition-colors`}
							onClick={() => setCategory('rejected')}
						>
							<span>Rejected</span>
						</button>
					</div>
				</div>
				<div className="flex items-center gap-2 w-full md:max-w-60 rounded-full py-2.5 px-3 bg-white">
					<Search size={14} className="text-slate-400" />
					<input
						type="text"
						placeholder="Search owner"
						className="w-full bg-white text-xs font-normal text-slate-700 placeholder:text-slate-400 outline-0"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex-1 mt-5">
				{paginated.length === 0 ? (
					<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
						<Frown size={30} className="text-slate-500" />
						<p className="text-sm text-slate-500 font-medium">No Owners found.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-1.5">
						{paginated.map((owner: TOwners) => (
							<div
								key={owner.id}
								className="flex items-center justify-between bg-white rounded-lg py-2.5 px-4 hover:bg-slate-100"
								onClick={() => navigateOwnerDetails(owner.id)}
							>
								<div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4">
									<div className="flex-1 flex items-center gap-4">
										{owner.profile_file_folder && owner.profile_pic_key ? (
											<img
												src={`${SPACES_ENDPOINT}/${owner.profile_file_folder}/${owner.profile_pic_key}`}
												alt="owner-pic"
												className="w-8 h-8 object-cover rounded-full ring-2 ring-slate-200 flex-shrink-0"
											/>
										) : (
											<img
												src={'/images/default_image.jpg'}
												alt={'defualt'}
												className="w-8 h-8 object-cover rounded-full ring-2 ring-slate-200 flex-shrink-0"
											/>
										)}
										<h2 className="text-xs text-slate-900 font-medium">{owner.car_rental_name}</h2>
									</div>
									<div className="flex-1">
										<span className="text-xs font-regular text-slate-500">Vehicles:</span>
										<p className="text-sm text-slate-900 font-medium">
											{owner._count.cars} <span className="text-xs text-slate-500 font-normal">unit</span>
										</p>
									</div>
									<div className="flex-1">
										<span className="text-xs font-regular text-slate-500">Joined at:</span>
										<p className="text-xs text-slate-900 font-medium">{dayjs(owner.created_at).format('MMMM D, YYYY')}</p>
									</div>
									<div className="flex-1 flex justify-center items-center">
										<div className={`${OwnerStatus(owner.status).bgclass} px-2 py-1 rounded-full`}>
											<p className={`font-medium text-xs ${OwnerStatus(owner.status).textclass}`}>{OwnerStatus(owner.status).value}</p>
										</div>
									</div>
								</div>

								<div className=" flex justify-end items-center">
									<button className="p-1.5 rounded-full bg-slate-200 cursor-pointer" onClick={() => navigateOwnerDetails(owner.id)}>
										<ChevronRight size={16} className="text-slate-400" />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-2">
				<div className="text-xs text-slate-500">
					Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total}
				</div>
				<div className="flex items-center gap-2">
					<button className="px-3 py-1 text-xs rounded-md bg-white disabled:opacity-50" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
						Previous
					</button>

					{/* simple page numbers */}
					<div className="flex items-center gap-1">
						{Array.from({ length: totalPages }).map((_, i) => {
							const pageNumber = i + 1;
							return (
								<button
									key={pageNumber}
									className={`px-3 py-1 text-xs rounded-md ${pageNumber === page ? 'bg-slate-900 text-white' : 'bg-white'}`}
									onClick={() => setPage(pageNumber)}
								>
									{pageNumber}
								</button>
							);
						})}
					</div>

					<button className="px-3 py-1 text-xs rounded-md bg-white disabled:opacity-50" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Rentals;
