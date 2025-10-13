interface SpinnerProps {
	text?: string;
	size?: 'sm' | 'md' | 'lg';
	color?: 'primary' | 'white' | 'slate';
	className?: string;
}

const LoadingSpinner = ({ text = 'Loading...', size = 'md', color = 'primary', className = '' }: SpinnerProps) => {
	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-8 w-8 border-3',
		lg: 'h-12 w-12 border-4',
	};
	const colorClasses = {
		primary: 'border-slate-900/10 border-t-slate-900',
		white: 'border-white/30 border-t-white',
		slate: 'border-slate-200 border-t-slate-800',
	};

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ">
				<div className="relative bg-white rounded-2xl shadow-lg p-6 h-11/12 h-auto  m-2 overflow-auto">
					<div className={`${className} flex items-center justify-center`}>
						<div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`} role="status" aria-label="Loading" />
					</div>
					<p className="mt-4 text-xs font-medium text-slate-700">{text}</p>
				</div>
			</div>
		</>
	);
};

export default LoadingSpinner;
