import React from 'react';

interface IWrapper {
	children: React.ReactNode;
	showHandler: (status: boolean) => void;
}

export const Wrapper: React.FC<IWrapper> = ({ children, showHandler }) => {
	return (
		<div
			className="absolute left-0 top-0 z-[100] w-screen h-[100dvh] 
            bg-[#00000040] flex items-center justify-center modal-wrapper"
			onClick={(e: any) =>
				e.target?.classList.contains('modal-wrapper')
					? showHandler(false)
					: () => {}
			}
		>
			{children}
		</div>
	);
};

export default Wrapper;
