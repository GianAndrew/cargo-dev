import { SPACES_ENDPOINT } from '@/constant/aws';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight, Frown } from 'lucide-react';
import { truncateWords } from '@/utils/TruncateWord';
import { useState } from 'react';

interface ComplaintUserSummary {
	id: number;
	first_name: string;
	last_name: string;
	profile_file_folder?: string | null;
	profile_pic_key?: string | null;
}

interface ComplaintItem {
	id: number;
	complaint_title?: string | null;
	complaint_type: string;
	description?: string | null;
	reference_number?: string | null;
	against_user?: ComplaintUserSummary | null;
	reporter_user: ComplaintUserSummary;
	created_at: Date;
	status: string;
}

const Complaints = () => {
	const api = useAxios();

	const [openComplaintModal, setOpenComplaintModal] = useState<boolean>(false);
	const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem | null>(null);

	// pagination state
	const [page, setPage] = useState<number>(1);
	const [pageSize] = useState<number>(10); // change page size as needed

	const complaints_query = useQuery({
		queryKey: ['complaints'],
		queryFn: async () => {
			const response = await api.get('/api/admin/complaints');
			return response.data;
		},
	});

	// derived pagination values
	const total = complaints_query.data?.length ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	const paginated = complaints_query.data ? complaints_query.data.slice((page - 1) * pageSize, page * pageSize) : [];

	const handleComplaintClick = (complaint: ComplaintItem) => {
		setSelectedComplaint(complaint);
		setOpenComplaintModal(true);
	};

	const handleCloseComplaintModal = () => {
		setOpenComplaintModal(false);
	};

	if (complaints_query.isPending) {
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
			<div className="bg-slate-50 min-h-screen  p-5 w-full">
				<div className="my-2 ">
					<h1 className="text-lg font-medium text-slate-700">Complaints</h1>
					<p className="text-sm font-normal text-slate-500">Manage user complaints and feedback.</p>
				</div>
				<div className="flex-1 mt-5">
					{paginated?.length === 0 ? (
						<div className="h-full w-full bg-white rounded-xl p-5 flex flex-col justify-center items-center gap-2">
							<Frown size={30} className="text-slate-500" />
							<p className="text-sm text-slate-500 font-medium">No Complaints found.</p>
						</div>
					) : (
						<div className="flex flex-col w-full gap-1.5">
							{paginated?.map((complaint: ComplaintItem) => (
								<div
									key={complaint.id}
									className="flex items-center justify-between bg-white rounded-lg py-2.5 px-4 hover:bg-slate-100"
									onClick={() => handleComplaintClick(complaint)}
								>
									<div className="w-full flex-1 flex flex-col md:flex-row items-start md:items-center gap-4">
										<div className="flex-1 flex flex-col gap-0.5">
											<h2 className="text-xs font-medium text-slate-900">{truncateWords(complaint.complaint_title, 8)}</h2>
											<span className="text-slate-500 text-xs">{complaint.reference_number}</span>
										</div>
										{/* reporter */}
										<div className="flex-1 flex items-center gap-4">
											<img
												src={`${SPACES_ENDPOINT}/${complaint.reporter_user?.profile_file_folder}/${complaint.reporter_user?.profile_pic_key}`}
												alt="reporter_user"
												className="w-10 h-10 object-cover rounded-full"
											/>
											<div>
												<span className="text-xs text-slate-500">Reported By:</span>
												<p className="text-xs text-slate-900">
													{complaint.reporter_user?.first_name} {complaint.reporter_user?.last_name}
												</p>
											</div>
										</div>
										{/* against user */}
										<div className="flex-1 flex items-center gap-4">
											<img
												src={`${SPACES_ENDPOINT}/${complaint.against_user?.profile_file_folder}/${complaint.against_user?.profile_pic_key}`}
												alt="against_user"
												className="w-10 h-10 object-cover rounded-full"
											/>
											<div>
												<span className="text-xs text-slate-500">Against:</span>
												<p className="text-xs text-slate-900">
													{complaint.against_user?.first_name} {complaint.against_user?.last_name}
												</p>
											</div>
										</div>

										<div className="flex-1 f">
											<span className="text-xs text-slate-500">Date:</span>
											<p className="text-xs text-slate-900">{dayjs(complaint.created_at).format('MMM D, h:mm A')}</p>
										</div>
									</div>
									<div className="flex justify-end items-center">
										<button className="p-1.5 rounded-full bg-slate-200 cursor-pointer" onClick={() => handleComplaintClick(complaint)}>
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
			</div>

			{/* User Details Modal */}
			{openComplaintModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl mx-2">
						<div className="flex justify-between items-center gap-0.5">
							<div className="flex flex-col gap-0.5">
								<p className="text-slate-700 text-lg font-medium">{selectedComplaint?.complaint_title}</p>
								<span className="text-xs text-slate-500">{selectedComplaint?.reference_number}</span>
							</div>
							<span className="text-slate-500 text-xs">{dayjs(selectedComplaint?.created_at).format('MMMM D, h:mm A')}</span>
						</div>
						<div className="flex gap-2 mb-2 mt-4">
							<div className="w-full flex flex-col gap-2">
								<span className="text-xs text-slate-500">Reported by:</span>
								<div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4">
									<img
										src={`${SPACES_ENDPOINT}/${selectedComplaint?.reporter_user?.profile_file_folder}/${selectedComplaint?.reporter_user?.profile_pic_key}`}
										alt=""
										className="w-10 h-10 object-cover rounded-full"
									/>
									<p className="text-xs ">
										{selectedComplaint?.reporter_user?.first_name} {selectedComplaint?.reporter_user?.last_name}
									</p>
								</div>
							</div>
							<div className="w-full flex flex-col gap-2">
								<span className="text-xs text-slate-500">Against to:</span>
								<div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4">
									<img
										src={`${SPACES_ENDPOINT}/${selectedComplaint?.against_user?.profile_file_folder}/${selectedComplaint?.against_user?.profile_pic_key}`}
										alt=""
										className="w-10 h-10 object-cover rounded-full"
									/>
									<p className="text-xs ">
										{selectedComplaint?.against_user?.first_name} {selectedComplaint?.against_user?.last_name}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-slate-50 p-2 rounded-lg mt-2">
							<span className="text-xs text-slate-500">Description:</span>
							<p className="text-slate-700 text-xs">{selectedComplaint?.description}</p>
						</div>

						<div className="w-full flex flex-col gap-2 mt-2">
							<button className="text-xs font-semibold w-full px-5 py-3 bg-slate-900 text-white rounded-4xl hover:bg-slate-800" onClick={handleCloseComplaintModal}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Complaints;
