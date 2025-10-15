import AlertModal from '@/components/AlertModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Frown, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface OwnerDocumentFile {
	id: number;
	owner_document_id: number;
	file_name: string;
	file_type: string;
	file_folder?: string | null;
	file_url: string;
	created_at: Date;
	updated_at: Date;
}

interface OwnerDocument {
	id: number;
	user_id: number;
	reference_number?: string | null;
	status: string;
	created_at: Date;
	updated_at: Date;
	owner_document_files: OwnerDocumentFile[];
}

interface CarImage {
	id: number;
	image_name: string;
	file_folder?: string | null;
}

interface OwnerCar {
	id: number;
	user_id: number;
	car_brand: string;
	car_model?: string | null;
	car_year?: number | null;
	car_transmission: string;
	car_fuel_type: string;
	car_number_plate?: string | null;
	vehicle_type: string;
	rate_type?: string | null;
	price_rate?: number | null;
	down_payment_price?: number | null;
	refund_percentage?: number | null;
	late_return_percentage?: number | null;
	is_refundable?: boolean | null;
	is_with_driver?: string | null;
	status: string;
	is_available?: boolean | null;
	delivery_fee?: number | null;
	latest_submitted_document_id?: number | null;
	created_at: Date;
	updated_at: Date;
	car_images: CarImage[];
}

interface OwnerWithDocuments {
	id: number;
	xendit_id?: string | null;
	first_name: string;
	last_name: string;
	email?: string | null;
	phone_no?: string | null;
	car_rental_name?: string | null;
	birth_date: Date;
	profile_pic_key?: string | null;
	profile_file_folder?: string | null;
	status: string;
	gender: string | null;
	province?: string | null;
	city?: string | null;
	address?: string | null;
	new_submitted_document_id?: number | null;
	created_at: Date;
	cars: OwnerCar[];
	documents?: OwnerDocument | null;
}

const CarStatus = (status: OwnerCar['status']) => {
	switch (status) {
		case 'PENDING':
			return { bgclass: 'bg-amber-100', textclass: 'text-amber-500', value: 'Pending' };
		case 'AVAILABLE':
			return { bgclass: 'bg-emerald-100', textclass: 'text-emerald-500', value: 'Available' };
		case 'ARCHIVED':
			return { bgclass: 'bg-slate-100', textclass: 'text-slate-500', value: 'Archived' };
		case 'REJECTED':
			return { bgclass: 'bg-rose-100', textclass: 'text-rose-500', value: 'Declined' };
		default:
			return { bgclass: 'bg-slate-100', textclass: 'text-slate-500', value: 'Unknown' };
	}
};
const DocumentStatus = (status: OwnerWithDocuments['status']) => {
	switch (status) {
		case 'PENDING':
			return { bgclass: 'bg-amber-100', textclass: 'text-amber-500', value: 'Pending' };
		case 'APPROVED':
			return { bgclass: 'bg-emerald-100', textclass: 'text-emerald-500', value: 'Approved' };
		case 'REJECTED':
			return { bgclass: 'bg-rose-100', textclass: 'text-rose-500', value: 'Rejected' };
		default:
			return { bgclass: 'bg-slate-100', textclass: 'text-slate-500', value: 'Unknown' };
	}
};

const OwnerDetails = () => {
	const { owner_id } = useParams();

	const navigate = useNavigate();

	const [category, setCategory] = useState<string>('all');

	const [search, setSearch] = useState<string>('');

	const [openDocumentModal, setOpenDocumentModal] = useState<boolean>(false);

	const [openDisableModal, setOpenDisableModal] = useState<boolean>(false);
	const [disableReason, setDisableReason] = useState<string>('');

	const [alertMessage, setAlertMessage] = useState({
		title: '',
		message: '',
	});
	const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);

	// pagination state
	const [page, setPage] = useState<number>(1);
	const [pageSize] = useState<number>(15); // change page size as needed

	const api = useAxios();

	const queryClient = useQueryClient();

	const owner_query = useQuery<OwnerWithDocuments>({
		queryKey: ['owner', owner_id],
		queryFn: async () => {
			const response = await api.get(`/api/admin/owners/${owner_id}`);
			return response.data;
		},
		enabled: !!owner_id,
	});

	const verdict_mutation = useMutation({
		mutationFn: async (data: { owner_id: number | undefined; document_id: number | undefined; verdict: 'APPROVED' | 'REJECTED' }) => {
			const response = await api.post(`/api/admin/owners/${data.owner_id}/documents/${data.document_id}/verdict`, { verdict: data.verdict });
			return response.data;
		},
		onSuccess: () => {
			// Invalidate the owner query to refetch the updated data
			queryClient.invalidateQueries({
				queryKey: ['owner'],
			});
			queryClient.invalidateQueries({
				queryKey: ['owners'],
			});
		},
		onError: (error, variables) => {
			// Handle error
			if (isAxiosError(error)) {
				setAlertMessage({
					title: 'Error',
					message: error.response?.data.message || error.message,
				});
				setOpenAlertModal(true);
				console.log(`Error updating verdict for owner ${variables.owner_id}:`, error.response?.data || error.message);
			}
		},
	});

	const disable_mutation = useMutation({
		mutationFn: async (data: { owner_id: number | undefined; reason: string }) => {
			const response = await api.post(`/api/admin/owners/${data.owner_id}/disable`, { reason: data.reason });
			return response.data;
		},
		onSuccess(data) {
			// Invalidate the owner query to refetch the updated data
			queryClient.invalidateQueries({
				queryKey: ['owner'],
			});
			queryClient.invalidateQueries({
				queryKey: ['owners'],
			});
			console.log('data:', data);
			setOpenDisableModal(false);
		},
		onError(error) {
			if (isAxiosError(error)) {
				setAlertMessage({
					title: 'Error',
					message: error.response?.data.message || error.message,
				});
				setOpenAlertModal(true);
			}
		},
	});

	const handleBackBtn = () => {
		navigate('/rentals');
	};

	const openDocumentModalBtn = () => {
		setOpenDocumentModal(true);
	};

	const openVehicleDetails = (vehicle_id: number) => {
		navigate(`/vehicles/${vehicle_id}`);
	};

	const verdictBtn = (data: { owner_id: number | undefined; document_id: number | undefined; verdict: 'APPROVED' | 'REJECTED' }) => {
		if (data.owner_id === undefined || data.document_id === undefined) {
			return;
		}
		verdict_mutation.mutate({
			owner_id: data.owner_id,
			document_id: data.document_id,
			verdict: data.verdict,
		});
		setOpenDocumentModal(false);
	};

	const filteredCars = (cars: OwnerCar) => {
		const matchesCategory = category === 'all' || cars.status === category.toUpperCase();
		const matchesSearch = search ? cars.car_brand.toLowerCase().includes(search.toLowerCase()) || cars.car_model?.toLowerCase().includes(search.toLowerCase()) : true;
		return matchesCategory && matchesSearch;
	};

	const total = owner_query.data?.cars.length ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	const paginated = owner_query.data?.cars ? owner_query.data?.cars.filter(filteredCars).slice((page - 1) * pageSize, page * pageSize) : [];

	if (owner_query.isPending) {
		return (
			<div className="flex bg-slate-50 h-screen min-h-screen w-full">
				<div className="flex flex-col p-5 flex-1">
					<div className="w-full max-w-10 h-10  bg-white rounded-full my-2"></div>
					<div className="flex-1 flex flex-row gap-2">
						<div className="h-full w-full lg:w-1/3 bg-white rounded-xl"></div>
						<div className="h-full w-full lg:w-2/3 bg-white rounded-xl p-4 space-y-2">
							<div className="h-16 bg-slate-100 rounded-xl"></div>
							<div className="h-16 bg-slate-100 rounded-xl"></div>
							<div className="h-16 bg-slate-100 rounded-xl"></div>
							<div className="h-16 bg-slate-100 rounded-xl"></div>
							<div className="h-16 bg-slate-100 rounded-xl"></div>
							<div className="h-16 bg-slate-100 rounded-xl"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="bg-slate-50 min-h-screen h-screen flex flex-col p-5 w-full overflow-auto">
				<div>
					<button className="bg-white rounded-full p-2.5 cursor-pointer" onClick={handleBackBtn}>
						<ChevronLeft size={16} className="text-slate-700" />
					</button>
				</div>

				<div className="flex-1 flex flex-col lg:flex-row gap-2 mt-5">
					<div className="w-full h-full lg:w-1/3 p-4 bg-white rounded-lg">
						<div>
							<h2 className="font-medium text-xs text-slate-500">Owner information</h2>
						</div>
						<div className="w-full mt-4 flex flex-col justify-center items-center gap-2">
							{owner_query.data?.profile_file_folder && owner_query.data?.profile_pic_key ? (
								<img
									src={`${SPACES_ENDPOINT}/${owner_query.data?.profile_file_folder}/${owner_query.data?.profile_pic_key}`}
									alt="owner_image"
									className="rounded-full w-16 h-16 object-cover"
								/>
							) : (
								<img src={`/images/default_image.jpg`} alt="default_image" className="rounded-full w-16 h-16 object-cover" />
							)}

							<h2 className="font-medium text-md text-slate-900">{owner_query.data?.car_rental_name}</h2>
							<p className="text-xs text-slate-500">{owner_query.data?.xendit_id}</p>
						</div>
						<div className="p-4 bg-slate-50 rounded-lg mt-4">
							<div className="flex justify-between items-center mt-2">
								<span className="text-xs text-slate-500 font-normal">Owner:</span>
								<span className="text-xs text-slate-500 font-normal">
									{owner_query.data?.first_name} {owner_query.data?.last_name}
								</span>
							</div>
							<div className="flex justify-between items-center mt-2">
								<span className="text-xs text-slate-500 font-normal">Phone:</span>
								<span className="text-xs text-slate-500 font-normal">{owner_query.data?.phone_no}</span>
							</div>
							<div className="flex justify-between items-center mt-2">
								<span className="text-xs text-slate-500 font-normal">Email:</span>
								<span className="text-xs text-slate-500 font-normal">{owner_query.data?.email}</span>
							</div>
							<div className="flex justify-between items-center mt-2">
								<span className="text-xs text-slate-500 font-normal">Gender:</span>
								<span className="text-xs text-slate-500 font-normal capitalize">{owner_query.data?.gender}</span>
							</div>
							<div className="flex justify-between items-center mt-2">
								<span className="text-xs text-slate-500 font-normal">Birth Date:</span>
								<span className="text-xs text-slate-500 font-normal">{dayjs(owner_query.data?.birth_date).format('MMMM D, YYYY')}</span>
							</div>
							<div className="flex justify-between items-center mt-2">
								<span className="text-xs text-slate-500 font-normal">Joined at:</span>
								<span className="text-xs text-slate-500 font-normal">{dayjs(owner_query.data?.created_at).format('MMMM D, YYYY')}</span>
							</div>
						</div>
						<div className="rounded-lg p-4 mt-2 bg-slate-50">
							<p className="text-xs text-slate-500 font-medium">Documents</p>
							<div className="flex justify-between items-center mt-2">
								<div className={`rounded-full flex items-center py-1.5 px-3 ${DocumentStatus(owner_query.data?.documents?.status ?? '').bgclass}`}>
									<span className={`text-xs font-normal ${DocumentStatus(owner_query.data?.documents?.status ?? '').textclass}`}>
										{DocumentStatus(owner_query.data?.documents?.status ?? '').value}
									</span>
								</div>
								<button className="flex items-center bg-slate-900 rounded-full py-2 px-3 cursor-pointer" onClick={openDocumentModalBtn}>
									<span className="text-xs text-slate-100">View Documents</span>
								</button>
							</div>
							<div className="flex flex-col mt-4 gap-1 p-4 bg-white rounded-lg">
								<p className="text-slate-400 text-xs">Submit At: {dayjs(owner_query.data?.documents?.created_at).format('MMMM D, YYYY h:mm A')}</p>
								<p className="text-slate-400 text-xs">Doc Ref No. {owner_query.data?.documents?.reference_number}</p>
							</div>
						</div>

						<div className="rounded-lg p-2 mt-2">
							<p className="text-xs text-slate-500 font-medium">Account Action</p>
							<div className="mt-2 space-y-2">
								<div className="flex">
									<h1
										className={`${
											owner_query.data?.status === 'DISABLED' ? 'text-red-500 bg-red-100' : 'text-green-500 bg-green-100'
										} py-2 px-4 rounded-full text-xs font-medium`}
									>
										{owner_query.data?.status === 'DISABLED' ? 'Disabled' : 'Enabled'}
									</h1>
								</div>
								<p className="text-xs text-slate-400 font-normal">
									Disabling the account will prevent the owner from accessing their account and vehicles will be set to unavailable.
								</p>
								{owner_query.data?.status === 'DISABLED' ? (
									<button
										className="flex items-center bg-slate-900 rounded-full py-2 px-3 mt-2 cursor-pointer"
										onClick={() => {
											disable_mutation.mutate({ owner_id: owner_query.data?.id, reason: disableReason });
										}}
										disabled={disable_mutation.isPending}
									>
										<span className="text-xs text-slate-100 font-normal">{disable_mutation.isPending ? 'Disabling Account...' : 'Enable Account'}</span>
									</button>
								) : (
									<button className="flex items-center bg-slate-900 rounded-full py-2 px-3 mt-2 cursor-pointer" onClick={() => setOpenDisableModal(true)}>
										<span className="text-xs text-slate-100 font-normal">Disable Account</span>
									</button>
								)}
							</div>
						</div>
					</div>
					{/*  vehicles */}
					<div className="flex flex-col lg:w-2/3 p-4 bg-white rounded-lg">
						<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
							<div>
								<h2 className="font-medium text-xs text-slate-500">{owner_query.data?.cars.filter(filteredCars).length} Vehicle Units</h2>
								<div className="mt-2 flex flex-wrap items-center gap-1">
									<button
										className={`text-xs font-normal rounded-full py-1.5 px-3 ${
											category === 'all' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
										}`}
										onClick={() => setCategory('all')}
									>
										All
									</button>
									<button
										className={`text-xs font-normal rounded-full py-1.5 px-3 ${
											category === 'PENDING' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
										}`}
										onClick={() => setCategory('pending')}
									>
										Pending
									</button>
									<button
										className={`text-xs font-normal rounded-full py-1.5 px-3 ${
											category === 'AVAILABLE' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
										}`}
										onClick={() => setCategory('available')}
									>
										Approved
									</button>
									<button
										className={`text-xs font-normal rounded-full py-1.5 px-3 ${
											category === 'ARCHIVED' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
										}`}
										onClick={() => setCategory('ARCHIVED')}
									>
										Archived
									</button>
									<button
										className={`text-xs font-normal rounded-full py-1.5 px-3 ${
											category === 'REJECTED' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
										}`}
										onClick={() => setCategory('rejected')}
									>
										Rejected
									</button>
								</div>
							</div>
							<div className="flex items-center gap-2 w-full lg:max-w-60 rounded-full py-2.5 px-3 bg-slate-50">
								<Search size={14} className="text-slate-400" />
								<input
									type="text"
									placeholder="Enter vehicle details"
									className="w-full bg-slate-50 text-xs font-normal text-slate-700 placeholder:text-slate-400 outline-0"
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full gap-2 mt-4">
							{paginated.length === 0 ? (
								<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
									<Frown size={30} className="text-slate-500" />
									<p className="text-sm text-slate-500 font-medium">No vehicles found.</p>
								</div>
							) : (
								<div className="h-full w-full py-2 space-y-1.5">
									{paginated.map((car, index) => (
										<div
											key={`CAR${index}`}
											className="flex md:items-center justify-between rounded-lg py-2.5 px-4 bg-slate-50 hover:bg-slate-100"
											onClick={() => openVehicleDetails(car.id)}
										>
											<div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-4">
												<div className="flex-1 flex items-center gap-4">
													{car.car_images[0]?.file_folder && car.car_images[0]?.image_name ? (
														<img
															src={`${SPACES_ENDPOINT}/${car.car_images[0]?.file_folder}/${car.car_images[0]?.image_name}`}
															alt="image_car"
															className="w-12 h-10 object-cover ring-1 ring-slate-100 rounded-md"
														/>
													) : (
														<img
															src={`/images/default_image.jpg`}
															alt="default"
															className="w-12 h-10 object-cover ring-1 ring-slate-100 rounded-md"
														/>
													)}
													<div className="flex flex-col items-start gap-1">
														<p className="font-medium text-xs text-slate-700 capitalize">
															{car.car_brand} {car.car_model}
														</p>
														<span className="text-xs text-slate-500">{car.car_year}</span>
													</div>
												</div>
												<div className="flex-1 flex flex-col items-start lg:items-center">
													<div>
														<span className="text-xs font-regular text-slate-500">Plate No:</span>
														<p className="text-xs text-slate-900 font-medium">{car.car_number_plate}</p>
													</div>
												</div>
												<div className="flex-1 flex flex-col items-start lg:items-center">
													<div>
														<span className="text-xs font-regular text-slate-500">Type:</span>
														<p className="text-xs text-slate-900 font-medium capitalize">{car.vehicle_type}</p>
													</div>
												</div>
												<div className="flex-1 flex justify-center items-center">
													<div className={`flex items-center rounded-full py-1.5 px-3 ${CarStatus(car.status).bgclass}`}>
														<span className={`text-xs font-medium ${CarStatus(car.status).textclass}`}>{CarStatus(car.status).value}</span>
													</div>
												</div>
											</div>
											<div className="flex justify-end items-center">
												<button className="p-2 bg-slate-50 rounded-full" onClick={() => openVehicleDetails(car.id)}>
													<ChevronRight size={16} className="text-slate-400" />
												</button>
											</div>
										</div>
									))}
								</div>
							)}
							<div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-2">
								<div className="text-xs text-slate-500">
									Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total}
								</div>
								<div className="flex items-center gap-2">
									<button
										className="px-3 py-1 text-xs rounded-md bg-white disabled:opacity-50"
										disabled={page <= 1}
										onClick={() => setPage((p) => Math.max(1, p - 1))}
									>
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

									<button
										className="px-3 py-1 text-xs rounded-md bg-white disabled:opacity-50"
										disabled={page >= totalPages}
										onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									>
										Next
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* document modal */}
			{openDocumentModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full h-11/12 md:h-auto max-w-4xl m-2 overflow-auto">
						<div>
							<p className="text-xs text-slate-500">Submit At: {dayjs(owner_query.data?.documents?.created_at).format('MMMM D, YYYY h:mm A')}</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between items-center gap-2 overflow-x-scroll overflow-y-hidden mt-2">
							{owner_query.data?.documents?.owner_document_files.map((file, index) => (
								<div key={index} className="flex items-center">
									{file.file_folder && file.file_name ? (
										<img
											src={`${SPACES_ENDPOINT}/${file.file_folder}/${file.file_name}`}
											alt=""
											className="w-72 h-full object-cover ring-1 ring-slate-100 rounded-md"
										/>
									) : (
										<img src={`/images/default_image.jpg`} alt="" className="w-72 h-full object-cover ring-1 ring-slate-100 rounded-md" />
									)}
								</div>
							))}
						</div>

						{owner_query.data?.status === 'WAITING_VERIFICATION' && (
							<div className="flex flex-col md:flex-row items-center my-4 gap-2 rounded-full p-2 bg-slate-100">
								<button
									className="w-full text-xs text-slate-50 bg-slate-900 rounded-full py-2 px-3"
									onClick={() => verdictBtn({ owner_id: owner_query.data?.id, document_id: owner_query.data?.documents?.id, verdict: 'APPROVED' })}
								>
									Approve
								</button>
								<button
									className="w-full text-xs text-slate-900 bg-slate-50 rounded-full py-2 px-3"
									onClick={() => verdictBtn({ owner_id: owner_query.data?.id, document_id: owner_query.data?.documents?.id, verdict: 'REJECTED' })}
								>
									Reject
								</button>
							</div>
						)}

						<button className="text-xs font-medium cursor-pointer w-full flex items-center justify-center text-slate-900" onClick={() => setOpenDocumentModal(false)}>
							Close
						</button>
					</div>
				</div>
			)}

			{/* disable modal */}
			{openDisableModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full h-1/2 md:h-auto max-w-2xl m-2 overflow-auto">
						<div>
							<p className="text-sm text-slate-900 font-medium">Disable Owner Account</p>
						</div>
						<div className="mt-4">
							<p className="text-xs text-slate-500">Please provide a reason for disabling this account:</p>
							<textarea
								className="w-full mt-2 p-2 border border-slate-300 rounded-md text-xs text-slate-700 placeholder:text-slate-400 outline-0"
								placeholder="Enter reason..."
								rows={4}
								maxLength={50}
								value={disableReason}
								onChange={(e) => setDisableReason(e.target.value)}
							></textarea>
						</div>

						<div className="flex flex-col md:flex-row items-center my-4 gap-2 rounded-full p-2 bg-slate-100">
							<button
								className="w-full text-xs text-slate-50 bg-slate-900 rounded-full py-2 px-3 disabled:opacity-50"
								disabled={disableReason.trim() === '' || disable_mutation.isPending}
								onClick={() => {
									disable_mutation.mutate({ owner_id: owner_query.data?.id, reason: disableReason });
								}}
							>
								{disable_mutation.isPending ? 'Disabling...' : 'Disable Account'}
							</button>
							<button
								className="w-full text-xs text-slate-900 bg-slate-50 rounded-full py-2 px-3 cursor-pointer"
								onClick={() => {
									setOpenDisableModal(false);
									setDisableReason('');
								}}
							>
								Cancel
							</button>
						</div>

						<button className="text-xs font-medium w-full flex items-center justify-center text-slate-900 cursor-pointer" onClick={() => setOpenDisableModal(false)}>
							Close
						</button>
					</div>
				</div>
			)}

			{verdict_mutation.isPending && <LoadingSpinner text="Submitting..." />}

			<AlertModal content={alertMessage} isOpen={openAlertModal} onClose={() => setOpenAlertModal(false)} />
		</>
	);
};

export default OwnerDetails;
