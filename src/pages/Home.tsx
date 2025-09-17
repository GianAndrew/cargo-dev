const Home = () => {
	return (
		<>
			<div className="bg-slate-50 w-full h-screen flex flex-col">
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
								<button className="bg-white/10 backdrop-blur-xl text-white/90 text-sm py-2 px-4 rounded-full">Get the app</button>
							</div>
						</div>
						<div className="h-full flex items-center z-10">
							<div className=" max-w-xl">
								<h1 className="text-white text-5xl font-bold">Find, Reserve &</h1>
								<h1 className="text-white text-5xl font-bold mb-6 mt-1">Get Vehicle Easily</h1>
								<p className="text-white mb-6">whether it’s a quick drive around the city or a weekend getaway, we’ve got the perfect ride for you.</p>
								<button className="bg-white text-black text-sm py-3 px-6 rounded-full font-semibold hover:bg-white/90 transition">Get Started</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
