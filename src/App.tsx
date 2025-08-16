import { RequireAuth } from '@/components/RequireAuth';

import LayoutNavBar from '@/components/LayoutNavBar';
import Auth from '@/pages/Auth';
import Bookings from '@/pages/Bookings';
import Complaints from '@/pages/Complaints';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Rentals from '@/pages/Rentals';
import Users from '@/pages/Users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				{/* public routes */}
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="/auth" element={<Auth />} />
				</Route>

				{/* private routes */}
				<Route element={<RequireAuth />}>
					<Route element={<LayoutNavBar />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/rentals" element={<Rentals />} />
						<Route path="/users" element={<Users />} />
						<Route path="/bookings" element={<Bookings />} />
						<Route path="/complaints" element={<Complaints />} />
					</Route>
				</Route>
			</>
		)
	);
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};

export default App;
