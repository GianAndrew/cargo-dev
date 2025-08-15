import React from 'react';
import { Info } from 'lucide-react';
interface AlertModalProps {
	isOpen: boolean;
	content: {
		title: string;
		message: string;
	};
	onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, content, onClose }: AlertModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
			<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
				<div className="mb-4 flex flex-col justify-center items-center">
					<Info className="text-slate-900" size={30} />
					<div className="text-center mt-4">
						<h2 className="text-lg font-semibold text-slate-900">{content.title}</h2>
						<p className="text-sm font-medium text-slate-500">{content.message}</p>
					</div>
				</div>

				<div className="w-full">
					<button onClick={onClose} className="text-xs font-semibold w-full px-5 py-3 bg-slate-900 text-white rounded-4xl hover:bg-slate-800">
						Okay
					</button>
				</div>
			</div>
		</div>
	);
};

export default AlertModal;
