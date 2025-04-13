import ContextElement from '@/ui/context/element';
import ChatItem from '@/ui/context/variables/chat';
import ContextWrapper from '@/ui/context/wrapper';
import React, { useMemo } from 'react';
import { IContext } from './types.type';
import {
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/navigation';

const ContextLogout: React.FC<IContext> = ({ styles }) => {
	const { push } = useRouter();
	const { quit } = useActions();

    const logout = () => { quit(); push('/auth'); };

	const items = useMemo(() => ([
		{ ico: faRightFromBracket, text: 'Logout', handler: logout },
	]), []);

	return (
		<ContextWrapper styles={styles ? { ...styles } : null}>
			{items.map((item) => (
				<ContextElement key={item.text}>
					<ChatItem handler={item.handler} item={item} />
				</ContextElement>
			))}
		</ContextWrapper>
	);
};

export default ContextLogout;
