import ContextElement from '@/ui/context/element';
import ChatItem from '@/ui/context/variables/chat';
import ContextWrapper from '@/ui/context/wrapper';
import React from 'react';
import { IContext } from './types.type';
import {
	faBookmark,
	faCircleQuestion,
	faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
	faBug,
	faDownload,
	faGear,
	faK,
	faMeteor,
	faMoon,
} from '@fortawesome/free-solid-svg-icons';

const items = [
	{ ico: faBookmark, text: 'Saved Messages', handler: () => {} },
	{ ico: faUser, text: 'Contacts', handler: () => {} },
	{ ico: faGear, text: 'Settings', handler: () => {} },
	{ ico: faMoon, text: 'Night mode', handler: () => {} },
	{ ico: faMeteor, text: 'Animations', handler: () => {} },
	{ ico: faCircleQuestion, text: 'Telegran Features', handler: () => {} },
	{ ico: faBug, text: 'Report Bug', handler: () => {} },
	{ ico: faK, text: 'Switch to K Version', handler: () => {} },
	{ ico: faDownload, text: 'Install App', handler: () => {} },
];

const ContextSettings: React.FC<IContext> = ({ styles }) => {
	return (
		<ContextWrapper styles={styles ? { ...styles } : null}>
			{items.map((item) => (
				<ContextElement key={item.text}>
					<ChatItem item={item} />
				</ContextElement>
			))}
			<div
				className="text-color-message text-[0.8125rem] 
				flex justify-center py-[5px]"
			>
				Telegram Web A 1.61.44
			</div>
		</ContextWrapper>
	);
};

export default ContextSettings;
