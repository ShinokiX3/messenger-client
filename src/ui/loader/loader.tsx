import React from 'react';
import ContentLoader from 'react-content-loader';

const ChatsLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={'100%'}
		height={60}
		viewBox="0 0 100% 100"
		backgroundColor="#ebebeb"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="4.687rem" y="15" rx="3" ry="3" width="88" height="8" />
		<rect x="4.687rem" y="37" rx="3" ry="3" width="52" height="8" />
		<circle cx="30" cy="30" r="1.687rem" />
		<rect x="82%" y="15" rx="3" ry="3" width="52" height="8" />
	</ContentLoader>
);

export default ChatsLoader;
