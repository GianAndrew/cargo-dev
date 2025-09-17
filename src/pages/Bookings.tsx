import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { FormatAsPrice } from '@/utils/FormatPrice';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight, Frown, Mail, Phone, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type TBooking = {
	id: number;
	reference_number: string;
	status: 'PENDING' | 'TO_PAY' | 'RENTED' | 'COMPLETED' | 'REJECTED';
	created_at: Date;
	downpay_is_paid: boolean;
	file_folder: string;
	file_name: string;
	payment_method: string;
	late_return_percentage: number;
	is_with_driver: string;
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
	delivery_fee: number;
	total_amount: number;
	note?: string;
	user: {
		first_name: string;
		last_name: string;
		phone_no: string;
		email: string;
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
			phone_no: string;
			email: string;
			profile_file_folder: string;
			profile_pic_key: string;
			car_rental_name: string;
		};
	};
};

type TRentals = {
	id: number;
	car_rental_name: string;
};

type TBookingsResponse = {
	bookings: TBooking[];
	rentals: TRentals[];
};

const BookStatus = (status: TBooking['status']) => {
	switch (status) {
		case 'PENDING':
			return { class: 'bg-amber-100 text-amber-500', value: 'Pending' };
		case 'TO_PAY':
			return { class: 'bg-violet-100 text-violet-500', value: 'To Pay' };
		case 'RENTED':
			return { class: 'bg-blue-100 text-blue-500', value: 'Rented' };
		case 'COMPLETED':
			return { class: 'bg-emerald-100 text-emerald-500', value: 'Completed' };
		case 'REJECTED':
			return { class: 'bg-red-100 text-red-500', value: 'Rejected' };
		default:
			return { class: 'bg-slate-100 text-slate-500', value: 'Unknown' };
	}
};

const Bookings = () => {
	const api = useAxios();

	const [category, setCategory] = useState<string>('all');
	const [dateFilter, setDateFilter] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const [rentalFilter, setRentalFilter] = useState<string>('all');
	// booking details modal state

	const [openBookingDetailsModal, setOpenBookingDetailModal] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);

	// pagination state
	const [page, setPage] = useState<number>(1);
	const [pageSize] = useState<number>(15); // change page size as needed

	const bookings_query = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => {
			const response = await api.get<TBookingsResponse>('/api/admin/bookings');
			console.log(response.data);
			return response.data;
		},
	});

	const filteredBookings = (booking: TBooking) => {
		// 1. Filter by category
		if (category !== 'all' && booking.status.toLowerCase() !== category.toLowerCase()) {
			return false;
		}

		// 2. Filter by search term (if provided)
		if (search.trim() !== '') {
			const searchLower = search.toLowerCase();
			const matchesSearch =
				// Reference number
				booking.reference_number.toLowerCase().includes(searchLower) ||
				// Car details
				booking.car.car_brand.toLowerCase().includes(searchLower) ||
				booking.car.car_model.toLowerCase().includes(searchLower) ||
				booking.car.owner.car_rental_name.toLowerCase().includes(searchLower) ||
				// User (renter) details
				booking.user.first_name.toLowerCase().includes(searchLower) ||
				booking.user.last_name.toLowerCase().includes(searchLower) ||
				// Location
				booking.pickup_location.toLowerCase().includes(searchLower) ||
				booking.return_location.toLowerCase().includes(searchLower);

			if (!matchesSearch) return false;
		}

		// 2.5 Filter by rental (if provided)
		if (rentalFilter !== 'all' && booking.car.owner.car_rental_name.toString() !== rentalFilter) {
			return false;
		}

		// 3. Filter by date (if provided)
		if (dateFilter) {
			const filterDate = new Date(dateFilter);
			// Reset hours to compare just the date
			filterDate.setHours(0, 0, 0, 0);

			const bookingDate = new Date(booking.created_at);
			bookingDate.setHours(0, 0, 0, 0);

			const pickupDate = new Date(booking.pickup_date);
			pickupDate.setHours(0, 0, 0, 0);

			const returnDate = new Date(booking.return_date);
			returnDate.setHours(0, 0, 0, 0);

			// Check if the date matches created_at, pickup_date, or return_date
			if (bookingDate.getTime() !== filterDate.getTime() && pickupDate.getTime() !== filterDate.getTime() && returnDate.getTime() !== filterDate.getTime()) {
				return false;
			}
		}

		// If it passed all filters, include it
		return true;
	};

	// Update pagination effect to reset page when filters change
	useEffect(() => {
		setPage(1);
	}, [category, search, dateFilter, bookings_query.data]);

	const handleSelectBooking = (booking: TBooking) => {
		setSelectedBooking(booking);
		setOpenBookingDetailModal(true);
	};

	const handleCloseBookingDetails = () => {
		setOpenBookingDetailModal(false);
	};

	// derived pagination values
	const total = bookings_query.data?.bookings.length ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	const paginated = bookings_query.data ? bookings_query.data.bookings.filter(filteredBookings).slice((page - 1) * pageSize, page * pageSize) : [];

	if (bookings_query.isPending) {
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
				<div className="my-2 ">
					<h1 className="text-lg font-medium text-slate-700">Bookings</h1>
					<p className="text-sm font-normal text-slate-500">Manage bookings and transactions.</p>

					<div className="mt-2 flex flex-wrap items-center gap-2">
						{/* search */}
						<div className=" px-3 gap-2 flex items-center justify-between w-full max-w-md rounded-full  border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400">
							<Search size={16} className=" text-slate-400" />
							<input
								type="text"
								placeholder="Search by renter name, car model, or reference number"
								className="w-full text-xs py-1.5 outline-0"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>

						{/* filter by rentals */}
						<div>
							<select
								className="px-3 py-1.5 rounded-full text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
								onChange={(e) => setRentalFilter(e.target.value)}
							>
								<option value="all">All Rentals</option>
								{bookings_query.data?.rentals.map((r) => (
									<option key={r.id} value={r.car_rental_name}>
										{r.car_rental_name}
									</option>
								))}
							</select>
						</div>

						{/* filter by date */}
						<div>
							<input
								type="date"
								className="px-3 py-1.5 rounded-full text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
								onChange={(e) => setDateFilter(e.target.value)}
							/>
						</div>

						{/* status */}
						<div>
							<select
								className="px-3 py-1.5 rounded-full text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="all">All Status</option>
								<option value="pending">Pending</option>
								<option value="to_pay">To Pay</option>
								<option value="rented">Rented</option>
								<option value="completed">Completed</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>
					</div>
				</div>
				<div className="flex-1 mt-5">
					{paginated.length === 0 ? (
						<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
							<Frown size={30} className="text-slate-500" />
							<p className="text-sm text-slate-500 font-medium">No Bookings found.</p>
						</div>
					) : (
						paginated.map((b) => {
							const rentalPic = `${SPACES_ENDPOINT}/${b.car.owner.profile_file_folder}/${b.car.owner.profile_pic_key}`;
							const renterName = `${b.user.first_name} ${b.user.last_name}`;
							const carUnit = `${b.car.car_brand} ${b.car.car_model} (${b.car.car_year})`;
							const CarRentalName = b.car.owner.car_rental_name;

							return (
								<div
									key={b.id}
									className="w-full flex justify-between items-center py-2.5 px-3 bg-white my-1.5 rounded-lg gap-2 lg:gap-10 hover:bg-slate-100"
									onClick={() => handleSelectBooking(b)}
								>
									<div className="w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-8">
										<div className="w-full lg:w-1/3 flex gap-8 items-center">
											{b.car.car_images[0].file_folder === null && b.car.car_images[0].image_name === null ? (
												<img src={'/images/default_image.jpg'} alt={'defualt'} className="w-8 h-8 object-cover rounded-full flex-shrink-0" />
											) : (
												<img src={rentalPic} alt={carUnit} className="w-8 h-8 object-cover ring-2 ring-slate-200 rounded-full" />
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
												className="h-8 w-8 object-cover ring-2 ring-slate-200 rounded-full"
											/>
											<div className="w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-1">
												<div className="w-full lg:w-1/3">
													<span className="text-xs text-slate-500 font-normal">Renter name:</span>
													<p className="text-xs text-slate-900 font-medium">{renterName}</p>
												</div>
												<div className="lg:w-2/3 mt-2 lg:mt-0 w-full flex flex-col lg:flex-row items-start lg:items-center gap-2 justify-between">
													<div className="w-full lg:p-0 flex flex-col lg:flex-row  items-start lg:items-center justify-around gap-2">
														<div>
															<span className="text-xs font-regular text-slate-500">Rented at:</span>
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
									<button
										className="p-1.5 rounded-full bg-slate-200 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleSelectBooking(b);
										}}
									>
										<ChevronRight size={16} className="text-slate-400" />
									</button>
								</div>
							);
						})
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

			{/* Booking Details Modal */}
			{openBookingDetailsModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full h-11/12 md:h-auto max-w-4xl m-2 overflow-auto">
						<div className="w-full mb-4 flex flex-col justify-center items-center">
							<div className="w-full py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
								<div>
									<p className="text-slate-900 font-semibold text-md">Book at {dayjs(selectedBooking?.created_at).format('MMMM DD, YYYY')}</p>
									<span className="text-xs text-slate-500 font-normal">Ref NO. {selectedBooking?.reference_number}</span>
								</div>
								<div>
									<span className={`text-xs font-medium rounded-full py-1 px-2 my-2 lg:my-0 ${BookStatus(selectedBooking?.status ?? 'PENDING').class}`}>
										{BookStatus(selectedBooking?.status ?? 'PENDING').value}
									</span>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
								<div className="py-2 px-2 space-y-8">
									<div className="flex flex-col">
										<p className="text-slate-500 text-xs font-medium">Owner Information</p>

										<div className="flex items-center gap-4 mt-4">
											{selectedBooking?.car.owner.profile_file_folder === null && selectedBooking.car.owner.profile_pic_key === null ? (
												<img src={'/images/default_image.jpg'} alt={'defualt'} className="w-8 h-8 object-cover rounded-full flex-shrink-0" />
											) : (
												<img
													src={`${SPACES_ENDPOINT}/${selectedBooking?.car.owner.profile_file_folder}/${selectedBooking?.car.owner.profile_pic_key}`}
													alt="renter_dp"
													className="h-8 w-8 object-cover ring-2 ring-slate-200 rounded-full"
												/>
											)}
											<div>
												<p className="text-slate-900 text-xs font-medium">{selectedBooking?.car.owner.car_rental_name}</p>
											</div>
										</div>

										<div className="flex items-center gap-2 mt-4">
											<div className="bg-slate-100 p-2 rounded-full">
												<Phone size={10} className="text-slate-500" />
											</div>
											<span className="text-xs text-slate-500 font-normal">{selectedBooking?.car.owner.phone_no}</span>
										</div>

										<div className="flex items-center gap-2 mt-2">
											<div className="bg-slate-100 p-2 rounded-full">
												<Mail size={10} className="text-slate-500" />
											</div>
											<span className="text-xs text-slate-500 font-normal">{selectedBooking?.car.owner.email}</span>
										</div>
									</div>
									<div className="flex flex-col">
										<p className="text-slate-500 text-xs font-medium">Renter Information</p>
										<div className="flex items-center gap-4 mt-4">
											{selectedBooking?.car.car_images[0].file_folder === null && selectedBooking.car.car_images[0].image_name === null ? (
												<img src={'/images/default_image.jpg'} alt={'defualt'} className="w-8 h-8 object-cover rounded-full flex-shrink-0" />
											) : (
												<img
													src={`${SPACES_ENDPOINT}/${selectedBooking?.user.profile_file_folder}/${selectedBooking?.user.profile_pic_key}`}
													alt="renter_dp"
													className="h-8 w-8 object-cover ring-2 ring-slate-200 rounded-full"
												/>
											)}

											<p className="text-slate-900 text-xs font-medium">
												{selectedBooking?.user.first_name} {selectedBooking?.user.last_name}
											</p>
										</div>

										<div className="flex items-center gap-2 mt-4">
											<div className="bg-slate-100 p-2 rounded-full">
												<Phone size={10} className="text-slate-500" />
											</div>
											<span className="text-xs text-slate-500 font-normal">{selectedBooking?.user.phone_no}</span>
										</div>

										<div className="flex items-center gap-2 mt-2">
											<div className="bg-slate-100 p-2 rounded-full">
												<Mail size={10} className="text-slate-500" />
											</div>
											<span className="text-xs text-slate-500 font-normal">{selectedBooking?.user.email}</span>
										</div>
									</div>
								</div>
								<div className="py-2 px-2">
									<p className="text-slate-500 text-xs font-medium">Booking Details</p>
									<div className="flex flex-col gap-3 mt-4">
										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Vehicle:</span>
											<span className="text-xs text-slate-700 font-medium capitalize">
												{selectedBooking?.car.car_brand} {selectedBooking?.car.car_model} {selectedBooking?.car.car_year}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Pickup Location:</span>
											<span className="text-xs text-slate-700 font-medium">{selectedBooking?.pickup_location}</span>
										</div>
										{selectedBooking?.is_with_driver === 'without_driver' && (
											<div className="flex items-center justify-between">
												<span className="text-xs text-slate-500 font-normal">Return Location:</span>
												<span className="text-xs text-slate-700 font-medium">{selectedBooking?.return_location}</span>
											</div>
										)}

										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Pickup Date:</span>
											<span className="text-xs text-slate-700 font-medium">
												{dayjs(selectedBooking?.pickup_date).format('MMM D, YYYY')} at {selectedBooking?.pickup_time}
											</span>
										</div>

										{selectedBooking?.is_with_driver === 'without_driver' && (
											<div className="flex items-center justify-between">
												<span className="text-xs text-slate-500 font-normal">Return Date:</span>
												<span className="text-xs text-slate-700 font-medium">
													{dayjs(selectedBooking?.return_date).format('MMM D, YYYY')} at {selectedBooking?.return_time}
												</span>
											</div>
										)}

										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Total Days:</span>
											<span className="text-xs text-slate-700 font-medium">{selectedBooking?.total_days} Days</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Payment Method:</span>
											<span className="text-xs text-slate-700 font-medium">{selectedBooking?.payment_method}</span>
										</div>

										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Price Rate:</span>
											<span className="text-xs text-slate-700 font-medium">
												PHP {FormatAsPrice((selectedBooking?.price_rate ?? 0).toString())} / {selectedBooking?.rate_type}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-xs text-slate-500 font-normal">Delivery Fee:</span>
											<span className="text-xs text-slate-700 font-medium">PHP {FormatAsPrice((selectedBooking?.delivery_fee ?? 0).toString())}</span>
										</div>

										{selectedBooking?.is_with_driver === 'without_driver' && selectedBooking.rate_type === 'DISTANCE' && (
											<div className="flex items-center justify-between">
												<span className="text-xs text-slate-500 font-normal">Total Down Pay:</span>
												<span className="text-xs text-slate-700 font-medium">
													PHP {FormatAsPrice((selectedBooking?.total_down_pay ?? 0).toString())}
												</span>
											</div>
										)}
										{selectedBooking?.rate_type === 'DAILY' && (
											<>
												<div className="flex items-center justify-between">
													<span className="text-xs text-slate-500 font-normal">Total Amount:</span>
													<span className="text-xs text-slate-700 font-medium">
														PHP {FormatAsPrice((selectedBooking?.total_amount ?? 0).toString())}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-xs text-slate-500 font-normal">Total Down Pay:</span>
													<span className="text-xs text-slate-700 font-medium">
														PHP {FormatAsPrice((selectedBooking?.total_down_pay ?? 0).toString())}
													</span>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="w-full flex flex-col gap-2">
							<button className="text-xs font-semibold w-full px-5 py-3 bg-slate-900 text-white rounded-4xl hover:bg-slate-800" onClick={handleCloseBookingDetails}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Bookings;
