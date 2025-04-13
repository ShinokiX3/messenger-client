import { useEffect, useMemo, useRef, useState } from 'react';
import MenuWrapper from '../wrapper';
import Preview, { IPreview } from '@/components/preview/preview';
import { IChat } from '../menu';
import ContextChat from '@/components/context/chat';
import ChatsLoader from '@/ui/loader/loader';

// TODO: to utils

type GetObjDifferentKeys<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;

type TChatData = {
	data?: IPreview;
};

interface IMenuChats {
	animate: boolean;
	chats: GetObjDifferentKeys<IChat, TChatData>[];
	loading: boolean;
}

const MenuChats: React.FC<IMenuChats> = ({
	animate = false,
	chats = [],
	loading = false,
}) => {
	const [active, setActive] = useState('');
	const [shouldShow, setShouldShow] = useState(false);
	const [styles, setStyles] = useState<{ [key: string]: string } | {}>({});

	const flag = useRef<boolean>(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const memochats = useMemo(() => {
		if (chats.length < 1) return [];
		flag.current = true;
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
						picture: chat.picture,
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

	// TODO: move to utils

	const calcHeight = (y: number, iH: number) => {
		// TODO: create reference for context menu for getting its height
		const blockH = 270;
		if (iH - y > blockH && y - blockH > 0) return `${y}px`;
		if (iH - y < blockH && y - blockH > 0) return `${y - blockH}px`;
		if (iH - y > blockH && y - blockH < 0) return `${y}px`;
		else return `${y}px`;
	};

	const calcLeft = (x: number, oW: number) => {
		// TODO: create reference for context menu for getting its height
		const blockW = 220;
		console.log(x, oW);

		if (x + blockW > oW && x - blockW > 0) return `${x - blockW}px`;
		// if (x + blockW < oW && x - blockW < 0) return `${x + 220}px`;
		else return `${x}px`;
	};
	
	if (loading && !flag.current)
		return (
			<MenuWrapper>
				{[...new Array(9)].map((_, index) => (
					<div className="p-preview-padding" key={index}>
						<ChatsLoader />
					</div>
				))}
			</MenuWrapper>
		);

	return (
		<MenuWrapper items={chats?.length}>
			<div
				ref={ref}
				className={`${animate ? 'menu-content-appearance-effect-b' : ''}`}
				onContextMenu={(e) => {
					setShouldShow(false);
					e.preventDefault();

					const chatsBlock = ref.current;

					const x = e.pageX;
					const y = e.pageY;

					const offsetWidth = chatsBlock
						? chatsBlock.offsetWidth
						: window.innerWidth;
					const innerHeight = window.innerHeight;

					setStyles({
						left: calcLeft(x, offsetWidth),
						top: calcHeight(y, innerHeight),
						bottom: 'auto',
						width: 220,
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
