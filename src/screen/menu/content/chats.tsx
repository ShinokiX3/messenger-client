import { useEffect, useMemo, useState } from 'react';
import MenuWrapper from '../wrapper';
import Preview, { IPreview } from '@/components/preview/preview';
import { IChat } from '../menu';
import ContextChat from '@/components/context/chat';

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
	const [shouldShow, setShouldShow] = useState(false);
	const [styles, setStyles] = useState<{ [key: string]: string } | {}>({});

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

	useEffect(() => {
		const handleClick = () => setShouldShow(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	const calcHeight = (y: number, iH: number) => {
		const blockH = 270;
		if (iH - y > blockH && y - blockH > 0) return `${y}px`;
		if (iH - y < blockH && y - blockH > 0) return `${y - blockH}px`;
		if (iH - y > blockH && y - blockH < 0) return `${y}px`;
		else return `${y}px`;
	};

	return (
		<MenuWrapper items={chats?.length}>
			<div
				className={`${animate ? 'menu-content-appearance-effect-b' : ''}`}
				onContextMenu={(e) => {
					setShouldShow(false);
					e.preventDefault();

					const x = e.pageX;
					const y = e.pageY;

					const innerWidth = window.innerWidth;
					const innerHeight = window.innerHeight;
					console.log(x, y, innerWidth);

					setStyles({
						left: `${x}px`,
						top: calcHeight(y, innerHeight),
						bottom: 'auto',
						width: '220px',
						zIndex: '25',
						backdropFilter: 'blur(5px)',
					});
					setShouldShow(true);
				}}
				onBlur={() => setShouldShow(false)}
			>
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
			{shouldShow ? <ContextChat styles={styles} /> : null}
		</MenuWrapper>
	);
};

export default MenuChats;
