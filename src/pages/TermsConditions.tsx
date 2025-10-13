const terms_conditions = {
	defintions_of_terms: {
		title: 'Definitions',
		content: [
			{
				id: 1,
				term: 'Application',
				content: ['refers to the CarGO mobile application'],
			},
			{
				id: 2,
				term: 'User',
				content: ['refers to any individual who accesses or uses the Application, including vehicle owners and renters.'],
			},
			{
				id: 3,
				term: 'Vehicle Owner',
				content: ['refers to individuals who list their vehicles for rent through the Application'],
			},
			{
				id: 4,
				term: 'Renter',
				content: [
					'Rentals begin and end at the agreed pickup and return time.',
					'Early returns: No refunds.',
					'Late returns: A penalty applies after the agreed return time.',
					'Pickup/Return Location: Failure to return the vehicle at the designated location results in forfeiture of the deposit and additional retrieval fees.',
				],
			},
		],
	},
	user_registration: {
		title: 'User Registration',
		content: 'To use the Application, users must create an account by providing accurate and complete information. Users must accept these Terms and Conditions and our Privacy Policy during the registration process.',
	},
	vehicle_owner_responsibilities: {
		title: 'Vehicle Owner Responsibilities',
		content: [
			'Vehicle Owners must ensure that their vehicles are in good condition and meet 	safety standards.',
			'Vehicle Owners are responsible for providing accurate information about their vehicles, including availability, pricing, and any applicable fees.',
			'Vehicle Owners must manage their rental appointments and respond to requests in a timely manner.',
		],
	},
	renter_responsibilities: {
		title: ' Renter Responsibilities',
		content: [
			'Renters must provide valid identification and any required documentation during the registration process.',
			'Renters are responsible for adhering to the rental terms, including payment of fees and returning the vehicle in the same condition as received.',
			'Renters must report any issues or concerns regarding the vehicle to the Vehicle Owner promptly.',
		],
	},
	payment_terms: {
		title: 'Payment Terms',
		content: [
			'All rental fees must be paid through the payment methods supported by the Application, which currently include GCash and cash payments.',
			'Renters are responsible for any additional fees, including but not limited to late return fees, damage fees, and cancellation fees.',
		],
	},
	cancellation_policy: {
		title: 'Cancellation Policy',
		content: [
			'Renters may cancel their bookings and request a refund according to the guidelines provided in the Application.',
			'Refunds will be processed in accordance with the terms specified at the time of booking.',
		],
	},
	liability: {
		title: 'Liability',
		content: 'CarGO is not liable for any damages, losses, or claims arising from the use of the Application, including but not limited to vehicle damage, personal injury, or theft. Users agree to indemnify and hold CarGO harmless from any claims arising from their use of the Application.',
	},

	modification_of_terms: {
		title: 'Modification of Terms',
		content: 'CarGO reserves the right to modify these Terms and Conditions at any time. Users will be notified of any changes, and continued use of the Application constitutes acceptance of the modified terms.',
	},
};

const TermsConditions = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl flex flex-col justify-center items-center mx-auto text-center">
						<div className="inline-block mb-4">
							<span className="bg-white/10 backdrop-blur-xl text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full">Legal Agreement</span>
						</div>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Terms & Conditions</h1>
						<p className="text-slate-300 text-lg md:text-xl max-w-lg">Please read these terms carefully before using our platform. By using CarGO, you agree to these terms.</p>
						<div className="mt-6 text-sm text-slate-400">Last Updated: October 13, 2025</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
				<div className="max-w-4xl mx-auto">
					{/* Definitions */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4 mb-6">
							<div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{terms_conditions.defintions_of_terms.title}</h2>
								<p className="text-slate-600 text-sm">Key terms used throughout this agreement:</p>
							</div>
						</div>
						<div className="space-y-4">
							{terms_conditions.defintions_of_terms.content.map((item) => (
								<div key={item.id} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
									<h3 className="font-bold text-lg text-slate-900 mb-2">{item.term}</h3>
									<ul className="space-y-2">
										{item.content.map((text, idx) => (
											<li key={idx} className="text-slate-600 text-sm leading-relaxed pl-4 border-l-2 border-slate-300">
												{text}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* User Registration */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.user_registration.title}</h2>
								<p className="text-slate-600 leading-relaxed">{terms_conditions.user_registration.content}</p>
							</div>
						</div>
					</div>

					{/* Vehicle Owner Responsibilities */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.vehicle_owner_responsibilities.title}</h2>
								<ul className="space-y-3">
									{terms_conditions.vehicle_owner_responsibilities.content.map((item, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
												<svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<span className="text-slate-600 leading-relaxed flex-1">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Renter Responsibilities */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.renter_responsibilities.title}</h2>
								<ul className="space-y-3">
									{terms_conditions.renter_responsibilities.content.map((item, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
												<svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<span className="text-slate-600 leading-relaxed flex-1">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Payment Terms */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.payment_terms.title}</h2>
								<ul className="space-y-3">
									{terms_conditions.payment_terms.content.map((item, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
												<svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<span className="text-slate-600 leading-relaxed flex-1">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Cancellation Policy */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.cancellation_policy.title}</h2>
								<ul className="space-y-3">
									{terms_conditions.cancellation_policy.content.map((item, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
												<svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<span className="text-slate-600 leading-relaxed flex-1">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Liability */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.liability.title}</h2>
								<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
									<p className="text-slate-600 leading-relaxed">{terms_conditions.liability.content}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Modification of Terms */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{terms_conditions.modification_of_terms.title}</h2>
								<p className="text-slate-600 leading-relaxed">{terms_conditions.modification_of_terms.content}</p>
							</div>
						</div>
					</div>

					{/* Acceptance Notice */}
					<div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 md:p-10">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Agreement Acceptance</h2>
								<p className="text-slate-300 leading-relaxed">
									By creating an account and using CarGO, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If
									you do not agree with any part of these terms, please do not use our services.
								</p>
								<div className="mt-6 flex flex-col sm:flex-row gap-4">
									<a
										href="/privacy-policy"
										className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
											/>
										</svg>
										Privacy Policy
									</a>
									<a
										href="mailto:cargoph2025@gmail.com"
										className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										Contact Support
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TermsConditions;
