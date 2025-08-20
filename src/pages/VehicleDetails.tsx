import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronLeft, OctagonX } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormatAsPrice } from '@/utils/FormatPrice';
import { useState } from 'react';
import { isAxiosError } from 'axios';

interface CarImage {
	id: number;
	image_name: string;
	file_folder?: string | null;
}
interface CarFeatures {
	id: number;
	feature_name: string;
}
interface CarRules {
	id: number;
	rule_name: string;
}
interface CarCoding {
	id: number;
	coding_day_value: string;
}
interface IVehicle {
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
	car_features: CarFeatures[];
	car_coding: CarCoding[];
	car_rules: CarRules[];
	car_images: CarImage[];
}

const DocumentStatus = (status: IVehicle['status']) => {
	switch (status) {
		case 'PENDING':
			return { bgclass: 'bg-amber-100', textclass: 'text-amber-500', value: 'Pending' };
		case 'AVAILABLE':
			return { bgclass: 'bg-emerald-100', textclass: 'text-emerald-500', value: 'Approved' };
		case 'ARCHIVED':
			return { bgclass: 'bg-slate-200', textclass: 'text-slate-500', value: 'Archived' };
		case 'REJECTED':
			return { bgclass: 'bg-rose-100', textclass: 'text-rose-500', value: 'Rejected' };
		default:
			return { bgclass: 'bg-slate-100', textclass: 'text-slate-500', value: 'Unknown' };
	}
};

const VehicleDetails = () => {
	const { vehicle_id } = useParams();

	const [openDocumentModal, setOpenDocumentModal] = useState<boolean>(false);

	const navigate = useNavigate();

	const api = useAxios();

	const queryClient = useQueryClient();

	const vehicle_query = useQuery({
		queryKey: ['vehicle', vehicle_id],
		queryFn: async () => {
			const response = await api.get(`/api/admin/vehicles/${vehicle_id}`);
			return response.data;
		},
		enabled: !!vehicle_id,
	});

	const verdict_mutation = useMutation({
		mutationFn: async (data: { car_id: number | undefined; document_id: number | undefined; verdict: 'APPROVED' | 'REJECTED' }) => {
			const response = await api.post(`/api/admin/vehicles/${data.car_id}/documents/${data.document_id}/verdict`, { verdict: data.verdict });
			return response.data;
		},
		onSuccess: () => {
			// Invalidate the vehicle query to refetch the updated data
			queryClient.invalidateQueries({
				queryKey: ['vehicles'],
			});
			queryClient.invalidateQueries({
				queryKey: ['vehicle'],
			});
			setOpenDocumentModal(false);
		},
		onError: (error, variables) => {
			// Handle error
			if (isAxiosError(error)) {
				console.log(`Error updating verdict for owner ${variables.car_id}:`, error.response?.data || error.message);
			}
		},
	});

	const handleBackBtn = () => {
		navigate('/vehicles');
	};

	const openDocumentModalBtn = () => {
		setOpenDocumentModal(true);
	};

	const verdictBtn = (data: { car_id: number | undefined; document_id: number | undefined; verdict: 'APPROVED' | 'REJECTED' }) => {
		verdict_mutation.mutate({
			car_id: data.car_id,
			document_id: data.document_id,
			verdict: data.verdict,
		});
	};

	if (vehicle_query.isPending) {
		return (
			<div className="flex bg-slate-50 h-screen min-h-screen w-full">
				<div className="flex flex-col p-5 flex-1">
					<div className="w-full max-w-10 h-10  bg-white rounded-full my-2"></div>
					<div className="flex-1 flex flex-row gap-2">
						<div className="h-full w-full lg:w-1/2 bg-white rounded-xl"></div>
						<div className="h-full w-full lg:w-1/2 bg-white rounded-xl p-4 space-y-2">
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
					<div className="w-full h-full lg:w-1/2 p-4 bg-white rounded-lg">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
							{vehicle_query.data?.car_images.length === 0
								? null
								: vehicle_query.data?.car_images.map((image: CarImage, index: number) => (
										<img
											key={index}
											src={`${SPACES_ENDPOINT}/${image.file_folder}/${image.image_name}`}
											alt={`Car Image ${index + 1}`}
											className={`object-fill rounded-lg`}
										/>
								  ))}
						</div>
						<div className="mt-2">
							<h1 className="text-slate-900 text-md font-medium capitalize">
								{vehicle_query.data.car_brand} {vehicle_query.data.car_model} ({vehicle_query.data.car_year})
							</h1>
						</div>
						{/* details */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 bg-slate-50 p-4 rounded-lg">
							<div>
								<p className="text-xs font-medium text-slate-900">Category</p>
								<span className="text-slate-500 text-xs font-medium">{vehicle_query.data.vehicle_type}</span>
							</div>
							<div>
								<p className="text-xs font-medium text-slate-900">Fuel</p>
								<span className="text-slate-500 text-xs font-medium">{vehicle_query.data.car_fuel_type}</span>
							</div>
							<div>
								<p className="text-xs font-medium text-slate-900">Plate No.</p>
								<span className="text-slate-500 text-xs font-medium">{vehicle_query.data.car_number_plate}</span>
							</div>
							<div>
								<p className="text-xs font-medium text-slate-900">Transmission</p>
								<span className="text-slate-500 text-xs font-medium">{vehicle_query.data.car_transmission}</span>
							</div>
							<div>
								<p className="text-xs font-medium text-slate-900">Model</p>
								<span className="text-slate-500 text-xs font-medium">
									{vehicle_query.data.car_model} {vehicle_query.data.car_year}
								</span>
							</div>
							<div>
								<p className="text-xs font-medium text-slate-900">Driver</p>
								<span className="text-slate-500 text-xs font-medium">{vehicle_query.data.is_with_driver}</span>
							</div>
						</div>
						{/* rental prices */}
						<div className="mt-2 bg-slate-50 p-4 rounded-lg">
							<p className="text-sm font-medium text-slate-500">Rental Prices</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
								<div>
									<p className="text-xs font-medium text-slate-900">Price per {vehicle_query.data?.rate_type || 'Unknown'}</p>
									<span className="text-slate-500 text-xs font-medium">PHP {FormatAsPrice(vehicle_query.data?.price_rate.toFixed(2) || '0.00')}</span>
								</div>
								<div>
									<p className="text-xs font-medium text-slate-900">Delivery Fee</p>
									<span className="text-slate-500 text-xs font-medium">PHP {FormatAsPrice(vehicle_query.data?.delivery_fee.toFixed(2) || '0.00')}</span>
								</div>
								{vehicle_query.data.is_refundable && (
									<div>
										<p className="text-xs font-medium text-slate-900">Refund (%)</p>
										<span className="text-slate-500 text-xs font-medium">{vehicle_query.data?.refund_percentage.toFixed(2) || '0.00'}%</span>
									</div>
								)}

								<div>
									<p className="text-xs font-medium text-slate-900">Down Payment</p>
									<span className="text-slate-500 text-xs font-medium">
										PHP{' '}
										{vehicle_query.data?.down_payment_price === null ? 'PHP 0.00' : `PHP ${FormatAsPrice(vehicle_query.data?.down_payment_price.toFixed(2))}`}
									</span>
								</div>
								{vehicle_query.data?.late_return_percentage !== null && vehicle_query.data.is_with_driver === 'without_driver' && (
									<div>
										<p className="text-xs font-medium text-slate-900">Late Return (%)</p>
										<span className="text-slate-500 text-xs font-medium">{vehicle_query.data?.late_return_percentage.toFixed(2) || '0.00'}%</span>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="w-full h-full lg:w-1/2 p-4 bg-white rounded-lg">
						{/* documents */}
						<div className="rounded-lg p-4 mt-2 bg-slate-50">
							<p className="text-xs text-slate-500 font-medium">Documents</p>
							<div className="flex justify-between items-center mt-2">
								<div className={`rounded-full flex items-center py-1.5 px-3 ${DocumentStatus(vehicle_query.data?.status ?? '').bgclass}`}>
									<span className={`text-xs font-medium ${DocumentStatus(vehicle_query.data?.status ?? '').textclass}`}>
										{DocumentStatus(vehicle_query.data?.status ?? '').value}
									</span>
								</div>
								<button className="flex items-center bg-slate-900 rounded-full py-2 px-3 cursor-pointer" onClick={openDocumentModalBtn}>
									<span className="text-xs text-slate-100">View Documents</span>
								</button>
							</div>
							<div className="flex flex-col mt-4 gap-1 p-4 bg-white rounded-lg">
								<p className="text-slate-400 text-xs">Submit At: {dayjs(vehicle_query.data?.documents?.created_at).format('MMMM D, YYYY h:mm A')}</p>
								<p className="text-slate-400 text-xs">Doc Ref No. {vehicle_query.data?.documents?.reference_number}</p>
							</div>
						</div>
						<div className="mt-2 bg-slate-50 p-4 rounded-lg">
							<p className="text-sm font-medium text-slate-500">Coding days</p>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 place-content-center">
								{vehicle_query.data?.car_coding.length === 0 ? (
									<p className="cols-span-4 text-center text-xs font-medium text-slate-500">No coding days available</p>
								) : (
									vehicle_query.data?.car_coding.map((code: CarCoding) => (
										<p key={code.id} className="capitalize text-center font-medium text-xs text-amber-700 bg-amber-200 rounded-full px-3 py-1.5">
											{code.coding_day_value}
										</p>
									))
								)}
							</div>
						</div>
						<div className="mt-2 bg-slate-50 p-4 rounded-lg">
							<p className="text-sm font-medium text-slate-500">Features</p>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 place-content-center">
								{vehicle_query.data?.car_features.length === 0 ? (
									<p className="cols-span-4 text-center text-xs font-medium text-slate-500">No features available</p>
								) : (
									vehicle_query.data?.car_features.map((ftrs: CarFeatures) => (
										<p key={ftrs.id} className="capitalize text-center text-xs font-medium text-slate-700 bg-slate-200 rounded-full px-3 py-1.5">
											{ftrs.feature_name}
										</p>
									))
								)}
							</div>
						</div>
						<div className="mt-2 bg-slate-50 p-4 rounded-lg">
							<p className="text-sm font-medium text-slate-500">Rules</p>
							<div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-2 place-content-center">
								{vehicle_query.data?.car_rules.length === 0 ? (
									<p className="col-span-2 text-center text-xs font-medium text-slate-500">No rules available</p>
								) : (
									vehicle_query.data?.car_rules.map((rls: CarRules) => (
										<div className="flex items-center gap-1	" key={rls.id}>
											<OctagonX size={14} />
											<p className="capitalize text-start text-xs font-medium text-slate-700">{rls.rule_name}</p>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{openDocumentModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full h-11/12 md:h-auto max-w-4xl m-2 overflow-auto">
						<div>
							<p className="text-xs text-slate-500">Submit At: {dayjs(vehicle_query.data?.documents?.created_at).format('MMMM D, YYYY h:mm A')}</p>
						</div>
						<div className="flex flex-col md:flex-row justify-start items-center gap-2 overflow-x-scroll overflow-y-hidden mt-2">
							{vehicle_query.data?.documents?.car_document_files.length === 0
								? null
								: vehicle_query.data?.documents?.car_document_files.map(
										(
											file: {
												file_folder: string;
												file_name: string;
											},
											index: number
										) => (
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
										)
								  )}
						</div>

						{vehicle_query.data.status === 'PENDING' && (
							<div className="flex flex-col md:flex-row items-center my-4 gap-2 rounded-full p-2 bg-slate-100">
								<button
									className="w-full text-xs text-slate-50 bg-slate-900 rounded-full py-2 px-3"
									onClick={() => verdictBtn({ car_id: vehicle_query.data?.id, document_id: vehicle_query.data?.documents?.id, verdict: 'APPROVED' })}
								>
									Approve
								</button>
								<button
									className="w-full text-xs text-slate-900 bg-slate-50 rounded-full py-2 px-3"
									onClick={() => verdictBtn({ car_id: vehicle_query.data?.id, document_id: vehicle_query.data?.documents?.id, verdict: 'REJECTED' })}
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
		</>
	);
};

export default VehicleDetails;
