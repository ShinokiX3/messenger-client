import ContextElement from '@/ui/context/element';
import ChatItem from '@/ui/context/variables/chat';
import ContextWrapper from '@/ui/context/wrapper';
import {
	faBell,
	faFileZipper,
	faFlag,
	faFolderOpen,
	faMessage,
	faWindowRestore,
} from '@fortawesome/free-regular-svg-icons';
import { faThumbtack, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { IContext } from './types.type';

const items = [
	{ ico: faWindowRestore, text: 'Open in new tab', handler: () => {} },
	{ ico: faFolderOpen, text: 'Add to folder...', handler: () => {} },
	{ ico: faMessage, text: 'Mark as unread', handler: () => {} },
	{ ico: faThumbtack, text: 'Unpin from top', handler: () => {} },
	{ ico: faBell, text: 'Mute  Unmute', handler: () => {} },
	{ ico: faFileZipper, text: 'Archive', handler: () => {} },
	{ ico: faFlag, text: 'Report', handler: () => {} },
	{ ico: faTrash, text: 'Delete', red: true, handler: () => {} },
];

const ContextChat: React.FC<IContext> = ({ chatId = '', styles = null }) => {
	return (
		<ContextWrapper styles={styles ? { ...styles } : null}>
			{items.map((item) => (
				<ContextElement key={item.text}>
					<ChatItem item={item} />
				</ContextElement>
			))}
		</ContextWrapper>
	);
};
export default ContextChat;
