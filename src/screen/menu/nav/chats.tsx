import Tab from '@/components/folder/tab';
import NavWrapper from './wrapper';
import { memo } from 'react';

const NavChats = () => {
	return (
		<NavWrapper>
			<Tab id={'1'} title={'All'} active={true} />
			<Tab id={'2'} title={'Personal'} active={false} />
			<Tab id={'3'} title={'Books'} active={false} />
			<Tab id={'4'} title={'News'} active={false} />
			<Tab id={'5'} title={'React'} active={false} />
		</NavWrapper>
	);
};

export default memo(NavChats);

{
	/* <Tab
    id={'1'}
    title={'All'}
    active={true}
    unread={{ status: 'important', quantity: 100 }}
/> */
}
