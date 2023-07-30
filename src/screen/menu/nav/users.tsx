import { memo } from 'react';
import NavWrapper from './wrapper';
import Tab from '@/components/folder/tab';

const NavUsers = () => {
	return (
		<NavWrapper>
			<Tab id={'1'} title={'Chats'} active={true} />
			<Tab id={'2'} title={'Media'} active={false} />
			<Tab id={'3'} title={'Links'} active={false} />
			<Tab id={'4'} title={'Files'} active={false} />
			<Tab id={'5'} title={'Music'} active={false} />
			<Tab id={'5'} title={'Voice'} active={false} />
		</NavWrapper>
	);
};

export default memo(NavUsers);
