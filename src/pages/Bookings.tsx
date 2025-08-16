import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';

type TBooking = {
	id: number;
	reference_number: string;
	status: 'PENDING' | 'TO_PAY' | 'RENTED' | 'COMPLETED';
	created_at: Date;
	downpay_is_paid: boolean;
	file_folder: string;
	file_name: string;
	payment_method: string;
	late_return_percentage: number;
	is_with_driver: boolean;
	payment_request_id: string;
	price_rate: number;
	rate_type: string;
	total_days: number;
	total_down_pay: number;
	pickup_date: Date;
	return_date: Date;
	pickup_location: string;
	return_location: string;
	pickup_time: string;
	return_time: string;
	is_refundable: boolean;
	refund_percentage: number;
	note?: string;
	user: {
		first_name: string;
		last_name: string;
		profile_file_folder: string;
		profile_pic_key: string;
	};
	car: {
		car_brand: string;
		car_model: string;
		car_year: number;
		car_images: {
			file_folder: string;
			image_name: string;
		}[];
		owner: {
			profile_file_folder: string;
			profile_pic_key: string;
			car_rental_name: string;
		};
	};
};

const BookStatus = (status: TBooking['status']) => {
	switch (status) {
		case 'PENDING':
			return { class: 'bg-yellow-100 text-yellow-500', value: 'Pending' };
		case 'TO_PAY':
			return { class: 'bg-orange-100 text-orange-500', value: 'To Pay' };
		case 'RENTED':
			return { class: 'bg-blue-100 text-blue-500', value: 'Rented' };
		case 'COMPLETED':
			return { class: 'bg-emerald-100 text-emerald-500', value: 'Completed' };
		default:
			return { class: 'bg-slate-100 text-slate-500', value: 'Unknown' };
	}
};

const Bookings = () => {
	const api = useAxios();
	const bookings_query = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => {
			const response = await api.get<TBooking[]>('/api/admin/bookings');
			return response.data;
		},
	});

	return (
		<div className="bg-slate-50 min-h-screen p-5 w-full">
			<div className="my-2 ">
				<h1 className="text-lg font-medium text-slate-700">Bookings</h1>
				<p className="text-sm font-normal text-slate-500">Manage bookings and transactions.</p>
			</div>
			<div className="flex-1 mt-5">
				{bookings_query.data?.map((b) => {
					const rentalPic = `${SPACES_ENDPOINT}/${b.car.owner.profile_file_folder}/${b.car.owner.profile_pic_key}`;
					const renterName = `${b.user.first_name} ${b.user.last_name}`;
					const carUnit = `${b.car.car_brand} ${b.car.car_model} (${b.car.car_year})`;
					const CarRentalName = b.car.owner.car_rental_name;

					return (
						<div key={b.id} className="w-full flex justify-between items-center py-2.5 px-3 bg-white my-2 rounded-lg gap-2 lg:gap-10">
							<div className="w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-5 lg:gap-8">
								<div className="w-full lg:w-1/3 flex gap-10 items-center">
									{b.car.car_images[0].file_folder === null && b.car.car_images[0].image_name === null ? (
										<img src={'/images/default_image.jpg'} alt={'defualt'} className="w-8 h-8 object-cover rounded-full flex-shrink-0" />
									) : (
										<img src={rentalPic} alt={carUnit} className="w-8 h-8 object-cover rounded-full flex-shrink-0" />
									)}
									<div className="flex flex-col justify-start items-start gap-1">
										<p className=" text-xs text-slate-900 font-medium">{CarRentalName}</p>
										<p className=" text-xs text-slate-500 font-normal capitalize">
											{b.car.car_brand} {b.car.car_model} ({b.car.car_year})
										</p>
									</div>
								</div>

								<div className="w-full lg:w-2/3 flex items-start lg:items-center gap-8">
									<img
										src={`${SPACES_ENDPOINT}/${b.user.profile_file_folder}/${b.user.profile_pic_key}`}
										alt="renter_dp"
										className="h-10 w-10 lg:h-8 lg:w-8 object-cover ring-2 ring-slate-200 rounded-full"
									/>
									<div className="w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-1">
										<div className="w-full lg:w-1/3">
											<span className="text-xs text-slate-500 font-normal">Renter name:</span>
											<p className="text-xs text-slate-900 font-medium">{renterName}</p>
										</div>
										<div className="lg:w-2/3 mt-2 lg:mt-0 w-full flex flex-col lg:flex-row items-start lg:items-center gap-2 justify-between">
											<div className="w-full lg:p-0 flex flex-col lg:flex-row  items-start lg:items-center justify-around gap-2">
												<div>
													<span className="text-xs font-regular text-slate-500">Rent at:</span>
													<p className={`text-xs font-medium text-slate-900`}>{dayjs(b.created_at).format('MMM D, YYYY, h:mm A')}</p>
												</div>
												<span className={`text-xs font-medium rounded-full py-1 px-2 my-2 lg:my-0 ${BookStatus(b.status).class}`}>
													{BookStatus(b.status).value}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button className="p-1.5 rounded-full bg-slate-200 cursor-pointer">
								<ChevronRight size={16} className="text-slate-400" />
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Bookings;
