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
	{ ico: faWindowRestore, text: 'Photo or Video', handler: () => {} },
	{ ico: faFolderOpen, text: 'File', handler: () => {} },
];

const ContextFile: React.FC<IContext> = ({ chatId = '', styles = null }) => {
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
export default ContextFile;
