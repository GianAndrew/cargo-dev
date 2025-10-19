import { Download, Smartphone, CheckCircle, Car, Shield, Zap, Globe, ArrowRight } from 'lucide-react';

const GetApp = () => {
	const downloadUrl = 'https://cargo-rental-bucket.nyc3.cdn.digitaloceanspaces.com/apk-file/app-release.apk';

	const features = [
		{
			icon: Car,
			title: 'Browse Vehicles',
			description: 'Access thousands of rental vehicles at your fingertips',
		},
		{
			icon: Zap,
			title: 'Instant Booking',
			description: 'Book your ride in seconds with our fast checkout',
		},
		{
			icon: Shield,
			title: 'Secure Payments',
			description: 'Your transactions are protected with encryption',
		},
		{
			icon: Globe,
			title: 'Track Anywhere',
			description: 'Monitor your bookings and rentals in real-time',
		},
	];

	const handleDownload = () => {
		window.open(downloadUrl, '_blank');
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-slate-900 to-slate-900">
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
				</div>

				<div className="relative container mx-auto px-4 py-20 md:py-32">
					<div className="max-w-6xl mx-auto">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Left Content */}
							<div className="text-white">
								<div className="inline-block mb-4">
									<span className="bg-white/10 backdrop-blur-xl text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
										<Smartphone className="w-4 h-4" />
										Now Available on Android
									</span>
								</div>
								<h1 className="text-4xl md:text-6xl lg:text-5xl font-bold mb-6 leading-tight">
									Get the <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">CarGO</span> <br />
									App
								</h1>
								<p className="text-slate-300 text-sm mb-8 leading-relaxed">
									Take your vehicle rental experience to the next level. Book, manage, and track your rentals on the go with our powerful mobile app.
								</p>

								{/* Download Button */}
								<button
									onClick={handleDownload}
									className="group bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm
										hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-white/50
										transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl
										flex items-center gap-3"
								>
									<Download className="w-6 h-6 group-hover:animate-bounce" />
									Download APK Now
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</button>
							</div>

							{/* Right - Phone Mockup */}
							<div className="relative">
								<div className="relative mx-auto w-72 md:w-80 lg:w-96">
									{/* Glow Effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-500 rounded-[3rem] blur-3xl opacity-30 animate-pulse"></div>

									{/* Phone Frame */}
									<div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
										<div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
											{/* Notch */}
											<div className="bg-slate-900 h-6 w-32 mx-auto rounded-b-3xl"></div>

											{/* Screen Content */}
											<div className="bg-gradient-to-br from-slate-900 to-slate-800 h-full flex flex-col items-center justify-center p-8 text-center">
												<div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl mb-6">
													<img src="/logo/cargo-logo-white.png" alt="CarGO Logo" className="w-16 h-16 object-contain" />
												</div>
												<h3 className="text-white text-2xl font-bold mb-2">CarGO</h3>
												<p className="text-slate-300 text-sm mb-6">Rent. Drive. Explore.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="container mx-auto px-4 py-20">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Everything You Need in One App</h2>
						<p className="text-slate-600 text-sm max-w-2xl mx-auto">Experience seamless vehicle rental with features designed for convenience and security</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature, index) => {
							const Icon = feature.icon;

							return (
								<div
									key={index}
									className="bg-white rounded-2xl p-6 transition-all duration-300 
										transform hover:-translate-y-2 border border-slate-100"
								>
									<div className={`inline-block p-4 rounded-xl mb-4 bg-slate-900 text-slate-100`}>
										<Icon className="w-5 h-5" />
									</div>
									<h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
									<p className="text-slate-600 text-sm">{feature.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* How It Works Section */}
			<div className="bg-slate-50 py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">How to Get Started</h2>
							<p className="text-slate-600 text-sm max-w-2xl mx-auto">Three simple steps to start renting vehicles</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{ step: '1', title: 'Download the App', description: 'Click the download button to get the APK file on your Android device' },
								{ step: '2', title: 'Install & Sign Up', description: 'Install the app and create your account in seconds' },
								{ step: '3', title: 'Start Renting', description: 'Browse vehicles and book your first ride instantly' },
							].map((item, index) => (
								<div key={index} className="relative">
									<div className="bg-white rounded-2xl p-8 transition-all duration-300">
										<div className="absolute -top-6 left-8">
											<div className="w-12 h-12 bg-gradient-to-r from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
												{item.step}
											</div>
										</div>
										<div className="pt-8">
											<h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
											<p className="text-slate-600 text-sm">{item.description}</p>
										</div>
									</div>
									{index < 2 && (
										<div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
											<ArrowRight className="w-8 h-8 text-slate-300" />
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Download CTA Section */}
			<div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-block mb-6">
							<div className="bg-white/10 backdrop-blur-xl p-4 rounded-full">
								<img src="/logo/cargo-logo-white.png" alt="CarGO Logo" className="w-12 h-12 object-contain" />
							</div>
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
						<p className="text-slate-300 text-sm mb-10 max-w-2xl mx-auto">Join thousands of users who are already enjoying the convenience of CarGO mobile app</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button
								onClick={handleDownload}
								className="group bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm
									hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-white/50
									transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl
									flex items-center gap-3"
							>
								<Download className="w-6 h-6 group-hover:animate-bounce" />
								Download for Android
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>
						</div>

						<div className="mt-10 flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
							<div className="flex items-center gap-2 text-white">
								<CheckCircle className="w-5 h-5 text-green-400" />
								<span>Free to Download</span>
							</div>
							<div className="flex items-center gap-2 text-white">
								<CheckCircle className="w-5 h-5 text-green-400" />
								<span>No Subscription Required</span>
							</div>
							<div className="flex items-center gap-2 text-white">
								<CheckCircle className="w-5 h-5 text-green-400" />
								<span>Regular Updates</span>
							</div>
						</div>

						<p className="text-slate-400 text-sm mt-8">* Compatible with Android 6.0 and above. File size: ~200MB</p>
					</div>
				</div>
			</div>

			{/* FAQ Section */}
			<div className="container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
					</div>

					<div className="space-y-4">
						{[
							{
								question: 'Is the app free to download?',
								answer: 'Yes! The CarGO app is completely free to download and use. You only pay for the vehicle rentals you book.',
							},
							{
								question: 'What devices are supported?',
								answer: 'Currently, the app is available for Android devices running Android 6.0 or higher. iOS version coming soon!',
							},
							{
								question: 'How do I install the APK file?',
								answer: 'After downloading, go to your device Settings > Security > Enable "Install from Unknown Sources", then open the downloaded APK file to install.',
							},
						].map((faq, index) => (
							<details key={index} className="bg-white rounded-xl p-6 transition-all duration-300 group">
								<summary className="font-bold text-slate-900 cursor-pointer flex items-center justify-between">
									{faq.question}
									<ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
								</summary>
								<p className="text-slate-600 text-sm mt-4 leading-relaxed">{faq.answer}</p>
							</details>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetApp;
