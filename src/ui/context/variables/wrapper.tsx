import React from 'react';

interface IWrapper {
	children: React.ReactNode;
	styles?: { [key: string]: string } | null;
}

const Wrapper: React.FC<IWrapper> = ({ children, styles = null }) => {
	return (
		<div
			className="flex justify-between items-center px-[0.25rem] 
            text-[0.875rem] font-medium"
			style={styles ? { ...styles } : {}}
		>
			{children}
		</div>
	);
};

export default Wrapper;
