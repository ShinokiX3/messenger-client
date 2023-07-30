import React from 'react';

type TSpinnerColor =
	| 'light-blue'
	| 'blue'
	| 'black'
	| 'white'
	| 'yellow'
	| 'gray'
	| 'green';

interface ISpinner {
	color?: TSpinnerColor;
}

const getSpinnerColor = (color: string) => {
	switch (color) {
		case 'blue':
			return 'bg-spinner-blue';
		case 'white':
			return 'bg-spinner-white';
		case 'green':
			return 'bg-spinner-green';
		default:
			return 'bg-spinner-white';
	}
};

// color === 'green' ? 'bg-spinner-green' : ''
// ${color === 'blue' ? 'bg-spinner-blue' : 'bg-spinner-white'}`}

const Spinner: React.FC<ISpinner> = ({ color = 'blue' }) => {
	return (
		<div
			className={`spinner-rotation-effect w-full h-full
            ${getSpinnerColor(color)} 
			`}
		></div>
	);
};

export default Spinner;
