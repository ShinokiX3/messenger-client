import React, { useMemo, useState } from 'react';

interface ISlider {
	side?: 'left' | 'right';
	color?: string;
	handler?: (e: MouseEvent) => void;
	ref?: null | typeof React.useRef;
}

const Slider: React.FC<ISlider> = ({
	side = 'left',
	color = 'color-border',
	handler = () => {},
	ref = null,
}) => {
	const position = useMemo(
		() => (side === 'left' ? 'left-[0px]' : 'right-[-2.5px]'),
		[side]
	);
	const bgcolor = useMemo(() => `bg-${color}`, [color]);
	const onDownHandler = () => {
		document.addEventListener('mousemove', handler);
		document.addEventListener('mouseup', onUpHandler);
	};
	const onUpHandler = () => {
		document.removeEventListener('mousemove', handler);
	};
	return (
		<div
			ref={ref}
			className={`absolute h-full w-[0.3rem] cursor-e-resize 
			hover:w-[0.5rem] transition-width duration-200 ease-in-out
			select-none ${bgcolor} bg-color-border ${position}`}
			onMouseDown={(e) => onDownHandler()}
			onMouseUpCapture={(e) => onUpHandler()}
		></div>
	);
};

export default Slider;
