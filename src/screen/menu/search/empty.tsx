import React from 'react';
import MenuWrapper from '../wrapper';

interface INoResults {
	title?: string;
	reason?: string;
	suggest?: string;
}

// TODO: move to global components folder

const NoResults: React.FC<INoResults> = ({
	title = 'No Results',
	reason = 'There were no results.',
	suggest = 'Try a new search.',
}) => {
	return (
		<MenuWrapper items={0}>
			<div className="grid items-center justify-center h-full">
				<div className="flex flex-col items-center">
					<p className="text-color-meta mb-[1rem]">{title}</p>
					<p className="text-color-message text-[0.875rem]">{reason}</p>
					<p className="text-color-message text-[0.875rem]">{suggest}</p>
				</div>
			</div>
		</MenuWrapper>
	);
};

export default NoResults;
