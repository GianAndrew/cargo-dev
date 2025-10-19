import { ArrowRight, CheckCircle, Download } from 'lucide-react';

const Home = () => {
	const downloadUrl = 'https://cargo-rental-bucket.nyc3.cdn.digitaloceanspaces.com/apk-file/app-release.apk';

	const handleDownload = () => {
		window.open(downloadUrl, '_blank');
	};

	const carBrands = [
		{ name: 'Toyota', logo: '/brands/toyota.png' },
		{ name: 'Honda', logo: '/brands/honda.png' },
		{ name: 'Mitsubishi', logo: '/brands/mitsubishi.png' },
		{ name: 'Nissan', logo: '/brands/nissan.png' },
		{ name: 'Ford', logo: '/brands/ford.png' },
		{ name: 'Chevrolet', logo: '/brands/chevrolet.png' },
		{ name: 'Mazda', logo: '/brands/mazda.png' },
		{ name: 'Isuzu', logo: '/brands/isuzu.png' },
		{ name: 'Suzuki', logo: '/brands/suzuki.png' },
	];

	return (
		<>
			{/* Hero Section */}
			<div className="bg-white w-full h-screen flex flex-col">
				<div className="m-8 h-full">
					<div className="relative flex flex-col  h-full w-full py-4 px-8 rounded-4xl">
						<video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl z-0">
							<source src="/video/landing-video-bg.mp4" type="video/mp4" />
						</video>

						<div className="absolute inset-0 bg-black/50 rounded-4xl z-10"></div>

						<div className="flex justify-between items-center w-full py-2 z-10">
							<div>
								<img src={'/logo/cargo-logo-white.png'} alt="Logo" width={105} height={105} />
							</div>

							<div>
								<button
									onClick={(e) => {
										e.preventDefault();
										document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
									}}
									className="bg-white backdrop-blur-xl text-slate-900 text-sm  font-medium py-2 px-4 rounded-full cursor-pointer"
								>
									Get the app
								</button>
							</div>
						</div>
						<div className="h-full flex items-center z-10">
							<div className=" max-w-lg">
								<h1 className="text-white text-3xl md:text-5xl font-bold">Find, Reserve &</h1>
								<h1 className="text-white text-3xl md:text-5xl font-bold mb-4 mt-1">Get Vehicle Easily</h1>
								<p className="text-white mb-6 text-sm md:text-base">
									whether it's a quick drive around the city or a weekend getaway, we've got the perfect ride for you.
								</p>
								<a
									href="#about"
									onClick={(e) => {
										e.preventDefault();
										document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
									}}
									className="bg-white text-sm md:text-md text-black py-3 px-6 rounded-full font-semibold hover:bg-white/90 transition inline-block cursor-pointer"
								>
									Get Started
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Car Brands Section */}
			<section className="py-10 overflow-hidden">
				<div className="container mx-auto px-8">
					<div className="text-center mb-12">
						<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Available Vehicle Brands</h2>
						<p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">Choose from a wide selection of trusted automotive brands for your rental needs</p>
					</div>

					{/* Marquee Animation */}
					<div className="relative">
						{/* Add custom CSS animation */}
						<style>{`
							@keyframes marquee {
								0% { transform: translateX(0); }
								100% { transform: translateX(-50%); }
							}
							.animate-marquee {
								animation: marquee 30s linear infinite;
							}
							.animate-marquee:hover {
								animation-play-state: paused;
							}
						`}</style>

						<div className="flex">
							<div className="flex animate-marquee">
								{/* First set of brands */}
								{carBrands.map((brand, index) => (
									<div key={`brand-1-${index}`} className="flex-shrink-0 mx-4">
										<div className="bg-white p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center group hover:scale-105 w-32 md:w-40 h-24 md:h-28">
											<img
												src={brand.logo}
												alt={brand.name}
												className="h-12 md:h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
											/>
										</div>
									</div>
								))}
								{/* Duplicate set for seamless loop */}
								{carBrands.map((brand, index) => (
									<div key={`brand-2-${index}`} className="flex-shrink-0 mx-4">
										<div className="bg-white p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center group hover:scale-105 w-32 md:w-40 h-24 md:h-28">
											<img
												src={brand.logo}
												alt={brand.name}
												className="h-12 md:h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section id="about" className="bg-white py-20">
				<div className="container mx-auto px-8">
					{/* Section Header */}
					<div className="text-center mb-16">
						<span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">About Cargo</span>
						<h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">A Fresh Start in Vehicle Rental</h2>
						<p className="text-slate-600 text-lg max-w-2xl mx-auto">We're launching a new era of vehicle rentals - simple, accessible, and built with you in mind.</p>
					</div>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
						{/* Left: Image/Visual */}
						<div className="relative">
							<div className="absolute -top-6 -left-6 w-24 h-24 bg-slate-900/5 rounded-3xl -z-10"></div>
							<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-900/5 rounded-3xl -z-10"></div>
							<img src="/images/hilux-grs.jpg" alt="About Cargo" className="rounded-3xl shadow-md w-full h-[500px] object-contain" />
							<div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-md max-w-xs">
								<div className="flex items-center space-x-4">
									<div className="bg-slate-900 text-white rounded-full w-12 h-12 flex items-center justify-center">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-slate-500">Now</p>
										<p className="text-lg font-semibold text-slate-900">Launching</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right: Text Content */}
						<div className="space-y-6">
							<h3 className="text-3xl font-bold text-slate-900">Your Journey Starts Here</h3>
							<p className="text-slate-600 leading-relaxed">
								Cargo is a brand-new platform designed to revolutionize how you rent vehicles. We're just beginning our journey, and we're excited to have you join us
								from the very start. Our mission is simple: make mobility accessible, affordable, and hassle-free for everyone.
							</p>
							<p className="text-slate-600 leading-relaxed">
								Whether you're planning a road trip, need a vehicle for work, or want to explore the city, we're building a platform that connects you with quality
								vehicles from trusted owners. Every listing is carefully verified to ensure your safety and satisfaction.
							</p>

							{/* Stats */}
							<div className="grid grid-cols-3 gap-4 pt-6">
								<div className="text-center p-4 bg-slate-50 rounded-xl">
									<p className="text-3xl font-bold text-slate-900">New</p>
									<p className="text-sm text-slate-600 mt-1">Platform</p>
								</div>
								<div className="text-center p-4 bg-slate-50 rounded-xl">
									<p className="text-3xl font-bold text-slate-900">100%</p>
									<p className="text-sm text-slate-600 mt-1">Verified</p>
								</div>
								<div className="text-center p-4 bg-slate-50 rounded-xl">
									<p className="text-3xl font-bold text-slate-900">24/7</p>
									<p className="text-sm text-slate-600 mt-1">Support</p>
								</div>
							</div>
						</div>
					</div>

					{/* Features/Values Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Feature 1 */}
						<div className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
							<div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									/>
								</svg>
							</div>
							<h4 className="text-xl font-bold text-slate-900 mb-3">Trusted & Safe</h4>
							<p className="text-slate-600">All vehicles are thoroughly inspected and insured. Your safety is our top priority with 24/7 roadside assistance.</p>
						</div>

						{/* Feature 2 */}
						<div className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
							<div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<h4 className="text-xl font-bold text-slate-900 mb-3">Instant Booking</h4>
							<p className="text-slate-600">Book your vehicle in seconds with our streamlined process. No paperwork hassles, just quick and easy reservations.</p>
						</div>

						{/* Feature 3 */}
						<div className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
							<div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h4 className="text-xl font-bold text-slate-900 mb-3">Best Prices</h4>
							<p className="text-slate-600">Transparent pricing with no hidden fees. Get competitive rates and flexible payment options that work for you.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Download APK Section */}
			<section id="download" className="py-10">
				<div className="container mx-auto px-8">
					{/* Download CTA Section */}
					<div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 py-20 rounded-4xl">
						<div className="container mx-auto px-4">
							<div className="max-w-4xl mx-auto text-center">
								<div className="inline-block mb-6">
									<div className="bg-white/10 backdrop-blur-xl p-4 rounded-full">
										<img src="/logo/cargo-logo-white.png" alt="CarGO Logo" className="w-12 h-12 object-contain" />
									</div>
								</div>
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Download the CarGO App</h2>
								<p className="text-slate-300 text-sm mb-10 max-w-2xl mx-auto">
									Get the full experience with our mobile app. Book vehicles, track rentals, and manage everything on the go.
								</p>

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
				</div>
			</section>

			<section>
				{/* How It Works Section */}
				<div className="py-10">
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
			</section>

			{/* FAQ Section */}
			<div className="container mx-auto px-4 py-20">
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
						<details key={index} className="bg-slate-50 rounded-xl p-6 transition-all duration-300 group">
							<summary className="font-bold text-slate-900 cursor-pointer flex items-center justify-between">
								{faq.question}
								<ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
							</summary>
							<p className="text-slate-600 text-sm mt-4 leading-relaxed">{faq.answer}</p>
						</details>
					))}
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-white">
				<div className="container mx-auto px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{/* Company Info */}
						<div className="col-span-1 md:col-span-2">
							<img src={'/logo/cargo-logo-black.png'} alt="Cargo Logo" width={120} height={40} className="mb-2" />
							<p className="text-slate-500 text-sm mb-4 max-w-md">
								Your trusted partner for vehicle rentals. Find, reserve, and get the perfect vehicle for your journey, whether it's a quick city drive or a weekend
								adventure.
							</p>
							<div className="flex space-x-4">
								<a href="#" className="text-slate-400 hover:text-slate-600 transition">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
									</svg>
								</a>
								<a href="#" className="text-slate-400 hover:text-slate-600 transition">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
									</svg>
								</a>
								<a href="#" className="text-slate-400 hover:text-slate-600 transition">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									</svg>
								</a>
								<a href="#" className="text-slate-400 hover:text-slate-600 transition">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
									</svg>
								</a>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="text-md text-slate-900 font-semibold mb-4">Quick Links</h3>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										onClick={(e) => {
											e.preventDefault();
											document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
										}}
										className="text-slate-500 hover:text-slate-900 text-sm transition"
									>
										About Us
									</a>
								</li>

								<li>
									<a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition">
										Contact
									</a>
								</li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h3 className="text-md text-slate-900 font-semibold mb-4">Support</h3>
							<ul className="space-y-2">
								<li>
									<a href="/terms-conditions" className="text-slate-500 hover:text-slate-900 text-sm transition">
										Terms of Service
									</a>
								</li>
								<li>
									<a href="/privacy-policy" className="text-slate-500 hover:text-slate-900 text-sm transition">
										Privacy Policy
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Footer */}
					<div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
						<p className="text-slate-500 text-sm">© 2025 CarGo Rental. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Home;
