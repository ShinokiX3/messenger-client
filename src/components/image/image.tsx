import React from 'react';

interface IImage {
	w?: string;
	h?: string;
	mr?: string;
	alt?: string;
}

const Image = ({
	w = 'preview-image-w',
	h = 'preview-image-h',
	mr = 'ico-margin-right',
}) => {
	return (
		<div className={`w-${w} h-${h} mr-${mr}`}>
			<div
				className="w-preview-image-w h-preview-image-h rounded-[50%] 
                bg-gradient-to-r from-white-500 to-red-500 bg-white"
			>
				{/* Image */}
			</div>
		</div>
	);
};

export default Image;
