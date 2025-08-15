import { useParams } from 'react-router-dom';

const UserDetails = () => {
	const { id } = useParams();

	return (
		<div className="bg-slate-50 min-h-screen h-screen p-5 w-full">
			<h1 className="text-lg font-semibold text-slate-700">User Details : {id}</h1>
		</div>
	);
};

export default UserDetails;
