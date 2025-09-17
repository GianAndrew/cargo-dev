import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import { Book, CarFront, Frown, Users } from 'lucide-react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_OPTIONS = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

type TBookings = {
	id: string;
	rate_type: 'DAILY' | 'DISTANCE';
	status: string;
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

type TCars = {
	vehicle_type: string;
};

const Dashboard = () => {
	const api = useAxios();

	const dashboard_query = useQuery({
		queryKey: ['dashboard'],
		queryFn: async () => {
			const response = await api.get('/api/admin/dashboard');
			console.log(response.data);
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
		<>
			<div className="bg-slate-50 w-full min-h-screen">
				{/* Main Content */}
				<div className="w-full p-5">
					{/* Dashboard Header */}
					<div>
						<div className="my-2 ">
							<h1 className="text-lg font-medium text-slate-900">Dashboard</h1>
						</div>

						<div className="grid rounded-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
							<div className="bg-white w-full rounded-xl p-5">
								<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
									<Users size={24} className="text-slate-800" />
									<div className="flex items-center gap-2">
										<span className="text-sm md:text-md font-semibold text-slate-900">
											{dashboard_query.data?.rentee.length + dashboard_query.data?.owner.length || 0}
										</span>
										<p className="text-sm md:text-md text-slate-900 font-medium">Users</p>
									</div>
								</div>

								<div className="w-full flex justify-center mt-2">
									<div className="h-[200px] w-full">
										<Pie
											data={{
												labels: ['Renter', 'Owner'],
												datasets: [
													{
														data: [dashboard_query.data?.rentee.length || 0, dashboard_query.data?.owner.length || 0],
														backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)'],
													},
												],
											}}
											options={CHART_OPTIONS}
										/>
									</div>
								</div>
							</div>
							<div className="bg-white w-full rounded-xl p-5">
								<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
									<CarFront size={24} className="text-slate-800" />
									<div className="flex items-center gap-2">
										<span className="text-sm md:text-md font-semibold text-slate-900">{dashboard_query.data?.cars.length || 0}</span>
										<p className="text-sm md:text-md text-slate-900 font-medium">Vehicles</p>
									</div>
								</div>

								<div className="w-full flex justify-center mt-2">
									<div className="h-[200px] w-full">
										<Pie
											data={{
												labels: ['suv', 'truck', 'sedan', 'van', 'coupe', 'hatchback'],
												datasets: [
													{
														data: [
															dashboard_query.data.cars.filter((car: TCars) => car.vehicle_type === 'suv').length || 0,
															dashboard_query.data.cars.filter((car: TCars) => car.vehicle_type === 'truck').length || 0,
															dashboard_query.data.cars.filter((car: TCars) => car.vehicle_type === 'sedan').length || 0,
															dashboard_query.data.cars.filter((car: TCars) => car.vehicle_type === 'van').length || 0,
															dashboard_query.data.cars.filter((car: TCars) => car.vehicle_type === 'coupe').length || 0,
															dashboard_query.data.cars.filter((car: TCars) => car.vehicle_type === 'hatchback').length || 0,
														],
														backgroundColor: [
															'rgba(54, 162, 235, 0.2)', // SUV - blue
															'rgba(255, 99, 132, 0.2)', // Truck - red
															'rgba(75, 192, 192, 0.2)', // Sedan - teal
															'rgba(255, 206, 86, 0.2)', // Van - yellow
															'rgba(153, 102, 255, 0.2)', // Coupe - purple
															'rgba(255, 159, 64, 0.2)', // Hatchback - orange
														],
													},
												],
											}}
											options={CHART_OPTIONS}
										/>
									</div>
								</div>
							</div>
							<div className="bg-white w-full rounded-xl p-5">
								<div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
									<Book size={24} className="text-slate-800" />

									<div className="flex items-center gap-2">
										<span className="text-sm md:text-md font-semibold text-slate-900">{dashboard_query.data?.bookings.length || 0}</span>
										<p className="text-sm md:text-md text-slate-900 font-medium">Bookings</p>
									</div>
								</div>

								<div className="w-full flex justify-center mt-2">
									<div className="h-[200px] w-full">
										<Pie
											data={{
												labels: ['PENDING', 'TO_PAY', 'RENTED', 'COMPLETED'],
												datasets: [
													{
														data: [
															dashboard_query.data?.bookings.filter((booking: TBookings) => booking.status === 'PENDING').length || 0,
															dashboard_query.data?.bookings.filter((booking: TBookings) => booking.status === 'TO_PAY').length || 0,
															dashboard_query.data?.bookings.filter((booking: TBookings) => booking.status === 'RENTED').length || 0,
															dashboard_query.data?.bookings.filter((booking: TBookings) => booking.status === 'COMPLETED').length || 0,
														],
														backgroundColor: [
															'rgba(54, 162, 235, 0.2)',
															'rgba(153, 102, 255, 0.2)',
															'rgba(255, 206, 86, 0.2)',
															'rgba(75, 192, 192, 0.2)',
														],
													},
												],
											}}
											options={CHART_OPTIONS}
										/>
									</div>
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
		</>
	);
};

export default Dashboard;
