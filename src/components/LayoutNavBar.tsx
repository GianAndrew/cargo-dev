import { Outlet } from 'react-router-dom';
import SideBarNav from './SideBarNav';

const LayoutNavBar = () => {
	return (
		<div className="flex flex-row w-full">
			<SideBarNav />
			<div className="flex-1">
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutNavBar;
