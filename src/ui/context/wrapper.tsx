import React from 'react';

interface IWrapper {
	children: React.ReactNode;
	styles?: { [key: string]: string } | null;
}

const ContextWrapper: React.FC<IWrapper> = ({ children, styles = null }) => {
	return (
		<div
			className={`absolute top-[120%] left-0 bg-compact-bg-color 
            w-full h-fit z-[15] p-[0.25rem] shadow-compact-menu-shadow max-h-[23.5rem]
            rounded-default-border-radius backdrop-blur-[10px] compact-menu-appearance-effect
            scrollbar overflow-auto`}
			style={styles ? { ...styles } : {}}
		>
			{children}
		</div>
	);
};

export default ContextWrapper;
