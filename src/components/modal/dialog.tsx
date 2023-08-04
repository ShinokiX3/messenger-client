import React from 'react';

interface IDialog {
	children: React.ReactNode;
}

// 0 .25rem .5rem .125rem var(--color-default-shadow) #1010109c

const Dialog: React.FC<IDialog> = ({ children }) => {
	return (
		<div
			className="min-w-[22rem] rounded-default-border-radius bg-theme-side-bg-color
            shadow-modal-dialog-shadow p-[0.4rem] max-w-[26.25rem]"
		>
			{children}
		</div>
	);
};

export default Dialog;
