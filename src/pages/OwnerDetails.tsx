import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
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

	const api = useAxios();

	const owner_query = useQuery<OwnerWithDocuments>({
		queryKey: ['owner', owner_id],
		queryFn: async () => {
			const response = await api.get(`/api/admin/owners/${owner_id}`);
			return response.data;
		},
		enabled: !!owner_id,
	});

	const handleBackBtn = () => {
		navigate('/rentals');
	};

	const filteredCars = (cars: OwnerCar) => {
		const matchesCategory = category === 'all' || cars.status === category.toUpperCase();
		const matchesSearch = search ? cars.car_brand.toLowerCase().includes(search.toLowerCase()) || cars.car_model?.toLowerCase().includes(search.toLowerCase()) : true;
		return matchesCategory && matchesSearch;
	};

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
				</div>
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
										category === 'pending' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
									}`}
									onClick={() => setCategory('pending')}
								>
									Pending
								</button>
								<button
									className={`text-xs font-normal rounded-full py-1.5 px-3 ${
										category === 'AVAILABLE' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
									}`}
									onClick={() => setCategory('AVAILABLE')}
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
										category === 'rejected' ? 'bg-slate-900 hover:bg-slate-800 text-slate-50' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
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
						{owner_query.data?.cars.filter(filteredCars).length === 0 ? (
							<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
								<Frown size={30} className="text-slate-500" />
								<p className="text-sm text-slate-500 font-medium">No vehicles found.</p>
							</div>
						) : (
							<div className="h-full w-full py-2 space-y-1.5">
								{owner_query.data?.cars.filter(filteredCars).map((car, index) => (
									<div key={`CAR${index}`} className="flex md:items-center justify-between rounded-lg py-2.5 px-4 hover:bg-slate-100 ring-1 ring-slate-100">
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
													<span className="text-xs font-regular text-slate-500">Created at:</span>
													<p className="text-xs text-slate-900 font-medium">{dayjs(car.created_at).format('MMMM D, YYYY')}</p>
												</div>
											</div>
											<div className="flex-1 flex justify-center items-center">
												<div className={`rounded-full py-0.5 px-4 ${CarStatus(car.status).bgclass}`}>
													<span className={`text-xs font-medium ${CarStatus(car.status).textclass}`}>{CarStatus(car.status).value}</span>
												</div>
											</div>
										</div>
										<div className="flex justify-end items-center">
											<button className="p-2 bg-slate-50 rounded-full">
												<ChevronRight size={16} className="text-slate-400" />
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OwnerDetails;
