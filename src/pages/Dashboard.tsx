import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Book, CarFront, Frown, SquareUser, Users } from 'lucide-react';

type TBookings = {
	id: string;
	car: {
		car_model: string;
		car_brand: string;
		car_year: string;
		car_images: { file_folder: string; image_name: string }[];
		owner: {
			car_rental_name: string;
		};
	};
	user: {
		first_name: string;
		last_name: string;
	};
	created_at: string;
};

const Dashboard = () => {
	const api = useAxios();

	const dashboard_query = useQuery({
		queryKey: ['dashboard'],
		queryFn: async () => {
			const response = await api.get('/api/admin/dashboard');
			return response.data;
		},
	});
	if (dashboard_query.isPending) {
		return (
			<>
				<div className="flex bg-slate-50 h-screen min-h-screen w-full">
					<div className="flex flex-col p-5 flex-1">
						<div className="w-full max-w-40 h-8  bg-white rounded-xl my-2"></div>
						<div className="flex w-full py-4 px-3 h-40 bg-white gap-2 rounded-xl flex-wrap">
							<div className="h-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="h-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="h-full flex-1 bg-slate-100 rounded-xl"></div>
							<div className="h-full flex-1 bg-slate-100 rounded-xl"></div>
						</div>
						<div className="w-full max-w-40 h-8  bg-white rounded-xl my-2"></div>
						<div className="w-full flex flex-col py-4 px-3 bg-white mt-2 flex-1 gap-2  rounded-xl">
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
		<div className="bg-slate-50 w-full min-h-screen">
			{/* Main Content */}
			<div className="w-full p-5">
				{/* Dashboard Header */}
				<div>
					<div className="my-2 ">
						<h1 className="text-lg font-medium text-slate-900">Dashboard</h1>
					</div>
					<div className="grid rounded-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
						<div className="bg-white w-full rounded-xl p-5">
							<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
								<Users size={24} className="text-slate-800" />
								<p className="text-sm md:text-md text-slate-900 font-medium">Rentee</p>
							</div>
							<div className="mt-2 flex justify-center md:justify-start items-center">
								<span className="text-xl md:text-2xl font-semibold text-slate-900">{dashboard_query.data?.rentee.length || 0}</span>
							</div>
						</div>
						<div className="bg-white w-full rounded-xl p-5">
							<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
								<SquareUser size={24} className="text-slate-800" />
								<p className="text-sm md:text-md text-slate-900 font-medium">Owner</p>
							</div>
							<div className="mt-2 flex justify-center md:justify-start items-center">
								<span className="text-xl md:text-2xl font-semibold text-slate-900">{dashboard_query.data?.owner.length || 0}</span>
							</div>
						</div>
						<div className="bg-white w-full rounded-xl p-5">
							<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
								<CarFront size={24} className="text-slate-800" />
								<p className="text-sm md:text-md text-slate-900 font-medium">Cars</p>
							</div>
							<div className="mt-2 flex justify-center md:justify-start items-center">
								<span className="text-xl md:text-2xl font-semibold text-slate-900">{dashboard_query.data?.cars.length || 0}</span>
							</div>
						</div>
						<div className="bg-white w-full rounded-xl p-5">
							<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
								<Book size={24} className="text-slate-800" />

								<p className="text-sm md:text-md text-slate-900 font-medium">Bookings</p>
							</div>
							<div className="mt-2 flex justify-center md:justify-start items-center">
								<span className="text-xl md:text-2xl font-semibold text-slate-900">{dashboard_query.data?.bookings.length || 0}</span>
							</div>
						</div>
					</div>
				</div>

				{/* recent bookings */}
				<div>
					<div className="my-2">
						<h1 className="text-sm font-medium text-slate-700">Recent Bookings</h1>
					</div>
					<div className="mt-2">
						{dashboard_query.data?.bookings.length === 0 ? (
							<div className="w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
								<Frown size={30} className="text-slate-500" />
								<p className="text-sm text-slate-500 font-medium">No recent bookings found.</p>
							</div>
						) : (
							dashboard_query.data?.bookings.slice(0, 10).map((booking: TBookings) => (
								<div key={booking.id} className="flex flex-col md:flex-row items-center gap-5 bg-white rounded-lg py-3 px-4 mb-1.5 hover:bg-slate-100">
									{booking.car.car_images[0].file_folder && booking.car.car_images[0].image_name ? (
										<img
											src={`${SPACES_ENDPOINT}/${booking.car.car_images[0].file_folder}/${booking.car.car_images[0].image_name}`}
											alt="car image"
											height={80}
											width={80}
											className="rounded-md w-full md:max-w-10 md:w-1/4 object-cover"
										/>
									) : (
										<img src={`/images/default_image.jpg`} alt="dp" className="w-full md:max-w-10 md:w-1/4 rounded-md object-cover" />
									)}

									<div className="flex flex-col md:flex-row justify-between md:items-center w-full gap-2">
										<div className="flex-1 flex flex-col gap-0.5">
											<p className="text-xs font-medium text-slate-900 capitalize">
												{booking.car.car_brand} {booking.car.car_model} {booking.car.car_year}
											</p>
											<p className="text-xs font-normal text-slate-500">{booking.car.owner.car_rental_name}</p>
										</div>
										<div className="flex-1">
											<span className="text-xs font-normal text-slate-500">Renter name:</span>
											<p className="text-xs font-medium text-slate-900 capitalize">
												{booking.user.first_name} {booking.user.last_name}
											</p>
										</div>
										<div className="flex-1">
											<span className="text-xs font-normal text-slate-500">Date:</span>
											<p className="text-xs font-medium text-slate-900">{dayjs(booking.created_at).format('MMM D, YYYY h:mm A')}</p>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
