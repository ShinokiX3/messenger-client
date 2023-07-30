import { useMemo, useState } from 'react';
import MenuWrapper from '../wrapper';
import Preview, { IPreview } from '@/components/preview/preview';
import { IChat } from '../menu';

// TODO: to utils

type GetObjDifferentKeys<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;

type TChatData = {
	data?: IPreview;
};

interface IMenuChats {
	animate: boolean;
	chats: GetObjDifferentKeys<IChat, TChatData>[];
}

const MenuChats: React.FC<IMenuChats> = ({ animate = false, chats = [] }) => {
	const [active, setActive] = useState('');
	const memochats = useMemo(() => {
		if (chats.length < 1) return [];
		return chats
			.sort((a, b) => {
				const da = new Date(a.last.writed);
				const db = new Date(b.last.writed);

				if (da > db) return -1;
				else return 1;
			})
			.sort((a, b) => {
				if (a.pinned && !b.pinned) return -1;
				else return 1;
			})
			.map((chat) => {
				return {
					...chat,
					data: {
						id: chat.chatId,
						type: 'chat',
						image: '',
						source: chat.participants[0].title,
						last: { from: chat.last.from, message: chat.last.message },
						time: new Date(chat.last.writed),
						read: null,
						pinned: chat.pinned,
					},
				};
			});
	}, [chats]);

	return (
		<MenuWrapper items={chats?.length}>
			<div className={`${animate ? 'menu-content-appearance-effect-b' : ''}`}>
				{memochats?.map((chat) => (
					<Preview
						key={chat.chatId}
						data={chat.data}
						active={active === chat.chatId}
						setActive={setActive}
						revieving={chat.participants[0].id}
					/>
				))}
			</div>
		</MenuWrapper>
	);
};

export default MenuChats;
