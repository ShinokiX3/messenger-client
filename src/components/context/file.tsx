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
import {
	IconDefinition,
	faThumbtack,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { IContext } from './types.type';

interface TFileContext {
	items: { ico: IconDefinition; text: string; handler: () => void }[];
}

const ContextFile: React.FC<IContext & TFileContext> = ({
	chatId = '',
	styles = null,
	items = [],
}) => {
	return (
		<ContextWrapper styles={styles ? { ...styles } : null}>
			{items.map((item) => (
				<ContextElement key={item.text}>
					<ChatItem item={item} handler={item.handler} />
				</ContextElement>
			))}
		</ContextWrapper>
	);
};
export default ContextFile;
