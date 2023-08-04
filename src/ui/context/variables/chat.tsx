import React from 'react';
import Wrapper from './wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IChatItem {
	item: {
		ico: IconProp;
		text: string;
		red?: boolean;
	};
	handler?: Function;
}

const ChatItem: React.FC<IChatItem> = ({ item, handler = () => {} }) => {
	return (
		<Wrapper
			styles={{
				justifyContent: 'start',
				padding: '0.15rem',
				fontSize: '0.875rem',
			}}
			handler={handler}
		>
			<FontAwesomeIcon
				className={`max-w-[1.25rem] text-[1.20rem] ml-[0.5rem] mr-[1.25rem]
                text-color-svg
                ${item.red ? 'text-red-600' : ''}`}
				icon={item.ico}
			/>
			<div className={`${item.red ? 'text-red-600' : ''}`}>{item.text}</div>
			<div></div>
		</Wrapper>
	);
};

export default ChatItem;
