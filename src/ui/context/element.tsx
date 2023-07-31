import React from 'react';

interface IContextElement {
	children: React.ReactNode;
	onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ContextElement: React.FC<IContextElement> = ({
	children,
	onMouseUp = (e) => {},
	onMouseDown = (e) => {},
	onClick = (e) => {},
}) => {
	return (
		<div
			className="text-white p-[0.25rem] hover:bg-[#00000066] 
            cursor-pointer rounded-[0.375rem]"
			onMouseDown={(e) => onMouseDown(e)}
			onMouseUp={(e) => onMouseUp(e)}
			onClick={(e) => onClick(e)}
		>
			{children}
		</div>
	);
};

export default ContextElement;
