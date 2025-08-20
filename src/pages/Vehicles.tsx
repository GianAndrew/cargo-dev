import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Frown, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CarImage {
	id: number;
	image_name: string;
	file_folder?: string | null;
}

interface ICar {
	id: number;
	user_id: number;
	car_brand: string;
	car_model?: string | null;
	car_year?: number | null;
	car_number_plate?: string | null;
	vehicle_type: string;
	status: string;
	created_at: Date;
	car_images: CarImage[];
}

const CarStatus = (status: ICar['status']) => {
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

const VehiclesPage = () => {
	const [search, setSearch] = useState<string>('');

	const [category, setCategory] = useState<string>('all');

	const navigate = useNavigate();

	const api = useAxios();

	const vehicles_query = useQuery({
		queryKey: ['vehicles'],
		queryFn: async () => {
			const response = await api.get('/api/admin/vehicles');
			return response.data;
		},
	});

	const filteredCars = (cars: ICar) => {
		const matchesCategory = category === 'all' || cars.status === category.toUpperCase();
		const matchesSearch = search ? cars.car_brand.toLowerCase().includes(search.toLowerCase()) || cars.car_model?.toLowerCase().includes(search.toLowerCase()) : true;
		return matchesCategory && matchesSearch;
	};

	const openVehicleDetails = (vehicle_id: number) => {
		navigate(`/vehicles/${vehicle_id}`);
	};

	if (vehicles_query.isPending) {
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
			<div className="my-2 flex flex-col md:flex-row justify-between items-start gap-2 ">
				<div>
					<h1 className="text-lg font-medium text-slate-700">{vehicles_query.data.filter(filteredCars).length} Vehicles</h1>
					<p className="text-sm font-normal text-slate-500">Manage vehicles and their details</p>
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
							onClick={() => setCategory('available')}
						>
							<span>Approved</span>
						</button>
						<button
							className={`${
								category === 'archived'
									? 'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-200'
									: 'bg-white text-slate-500 hover:bg-slate-300 hover:text-slate-700'
							}  px-3 py-1.5 rounded-full text-xs hover:bg-slate-300 transition-colors`}
							onClick={() => setCategory('archived')}
						>
							<span>Archived</span>
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
						placeholder="Search vehicle"
						className="w-full bg-white text-xs font-normal text-slate-700 placeholder:text-slate-400 outline-0"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			<div className="flex-1 mt-5">
				<div className="h-full w-full py-2 space-y-1.5">
					{vehicles_query.data.filter(filteredCars).length === 0 ? (
						<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
							<Frown size={30} className="text-slate-500" />
							<p className="text-sm text-slate-500 font-medium">No Vehicles found.</p>
						</div>
					) : (
						vehicles_query.data?.filter(filteredCars).map((car: ICar, index: number) => (
							<div
								key={`CAR${index}`}
								className="flex md:items-center justify-between rounded-lg py-2.5 px-4 bg-white hover:bg-slate-50"
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
											<img src={`/images/default_image.jpg`} alt="default" className="w-12 h-10 object-cover ring-1 ring-slate-100 rounded-md" />
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
									<button className="p-2 bg-slate-50 rounded-full cursor-pointer" onClick={() => openVehicleDetails(car.id)}>
										<ChevronRight size={16} className="text-slate-400" />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default VehiclesPage;
