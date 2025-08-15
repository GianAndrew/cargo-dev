import { RequireAuth } from '@/components/RequireAuth';

import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import Bookings from '@/pages/Bookings';
import Complaints from '@/pages/Complaints';
import LayoutNavBar from '@/components/LayoutNavBar';
import UserDetails from '@/pages/UserDetails';
import Rentals from '@/pages/Rentals';

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
						<Route path="/users">
							<Route index element={<Users />} />
							<Route path=":id" element={<UserDetails />} />
						</Route>
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
