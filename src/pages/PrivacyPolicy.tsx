import React from 'react';

const privacy_policy = {
	introduction: {
		title: 'Introduction',
		content: 'This Privacy Policy outlines how CarGO collects, uses, and protects the personal information of users. By using our Application, you consent to the data practices described in this policy.',
	},
	information_collection: {
		title: 'Information Collection',
		content: [
			'Personal Information: We collect personal information such as name, contact details, identification documents, and payment information during the registration process.',
			'Usage Data: We may collect information about how you use the Application, including 	device information, IP address, and location data.',
		],
	},
	information_use: {
		title: 'Information Use',

		content: [
			'To facilitate the rental process and manage bookings.',
			'To communicate with users regarding their accounts, bookings, and customer service inquiries',
			'To improve our services and enhance user experience.',
			'To comply with legal obligations and protect our rights.',
		],
	},
	information_sharing: {
		title: 'Information Sharing',
		content: [
			'Vehicle Owners for the purpose of facilitating rentals.',
			'Service providers who assist us in operating the Application and providing services.',
			'Law enforcement or regulatory authorities when required by law.',
		],
	},
	data_security: {
		title: 'Data Security',
		content: 'We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.',
	},
	user_rights: {
		title: 'User Rights',
		content: [
			'Access their personal information and request corrections if necessary.',
			'Request the deletion of their personal information, subject to legal obligations.',
			'Withdraw consent for the processing of their personal information at any time.',
		],
	},
	changes_to_policy: {
		title: 'Changes to Policy',
		content: 'CarGO reserves the right to modify this Privacy Policy at any time. Users will be notified of any changes, and continued use of the Application constitutes acceptance of the modified policy.',
	},
	contact_us: {
		title: 'Contact Us',
		content: 'If you have any questions or concerns about this Privacy Policy or our data practices',
		email: 'cargoph2025@gmail.com',
	},
};

const PrivacyPolicy = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl flex flex-col justify-center items-center mx-auto text-center">
						<div className="inline-block mb-4">
							<span className="bg-white/10 backdrop-blur-xl text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full">Legal</span>
						</div>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
						<p className="text-slate-300 text-lg md:text-xl max-w-lg">Your privacy matters to us. Learn how we protect and manage your personal information.</p>
						<div className="mt-6 text-sm text-slate-400">Last Updated: October 13, 2025</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
				<div className="max-w-4xl mx-auto">
					{/* Introduction */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.introduction.title}</h2>
								<p className="text-slate-600 leading-relaxed">{privacy_policy.introduction.content}</p>
							</div>
						</div>
					</div>

					{/* Information Collection */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.information_collection.title}</h2>
								<ul className="space-y-3">
									{privacy_policy.information_collection.content.map((item, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
												<svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
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

					{/* Information Use */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.information_use.title}</h2>
								<ul className="space-y-3">
									{privacy_policy.information_use.content.map((item, index) => (
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

					{/* Information Sharing */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.information_sharing.title}</h2>
								<p className="text-slate-600 mb-3">We may share your information with:</p>
								<ul className="space-y-3">
									{privacy_policy.information_sharing.content.map((item, index) => (
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

					{/* Data Security */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.data_security.title}</h2>
								<p className="text-slate-600 leading-relaxed">{privacy_policy.data_security.content}</p>
							</div>
						</div>
					</div>

					{/* User Rights */}
					<div className="bg-white rounded-2xl p-8 md:p-10 mb-4 border border-slate-100">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.user_rights.title}</h2>
								<p className="text-slate-600 mb-3">As a user, you have the right to:</p>
								<ul className="space-y-3">
									{privacy_policy.user_rights.content.map((item, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
												<svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
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

					{/* Changes to Policy */}
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
								<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{privacy_policy.changes_to_policy.title}</h2>
								<p className="text-slate-600 leading-relaxed">{privacy_policy.changes_to_policy.content}</p>
							</div>
						</div>
					</div>

					{/* Contact Us */}
					<div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 md:p-10">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{privacy_policy.contact_us.title}</h2>
								<p className="text-slate-300 mb-4 leading-relaxed">{privacy_policy.contact_us.content}</p>
								<a
									href={`mailto:${privacy_policy.contact_us.email}`}
									className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
									{privacy_policy.contact_us.email}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
