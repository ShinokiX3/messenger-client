'use client';
import Search from '@/components/input/search';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import NavUsers from './nav/users';
import NavChats from './nav/chats';
import MenuChats from './content/chats';
import UsersSearch from './search/user';
import FriendsSlider from './search/friends';
import Slider from './slider';
import { useActions } from '@/hooks/useActions';
import ContextChat from '@/components/context/chat';

// TODO: temporary solution

interface IMenuUsers {
	type: 'contacts' | 'search';
	value?: string;
}

interface IParticipant {
	id: string;
	title: string;
}

export interface IChat {
	chatId: string;
	created: Date;
	last: {
		from: string;
		userId: string;
		message: string;
		writed: Date;
	};
	messages: any;
	pinned: boolean;
	read: {
		importance: string;
		quantity: number;
	};
	participants: IParticipant[];
}

const MenuUsers: React.FC<IMenuUsers> = ({ type = 'contacts', value = '' }) => {
	useEffect(() => {
		console.log('rerender by value');
	}, []);
	return (
		<>
			{type === 'contacts' ? <FriendsSlider /> : <UsersSearch value={value} />}
		</>
	);
};

const Menu = () => {
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [animate, setAnimate] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [chats, setChats] = useState<IChat[]>([]);
	const [shouldShow, setShouldShow] = useState(false);

	const [reload, setReload] = useState('');
	const ref = useRef(null);

	const user = useTypedSelector((state) => state.user);
	const { shouldHideMenu } = useTypedSelector((state) => state.user.ui);
	const { setMenuWidth, setShouldHideMenu, setShouldHideContent } =
		useActions();

	const menuW = useMemo(() => `${user.ui?.menuW}`, [user.ui.menuW]);

	useEffect(() => {
		// TODO: mobile test
		setShouldHideContent(true);
		(async () => {
			const eventSource = new EventSource(
				`https://messenger-server-production-06a1.up.railway.app/chat/connection`
			);
			eventSource.onmessage = (event: any) => {
				const message = JSON.parse(event.data);
				setReload(message);
			};
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const chats = await fetch(
				`https://messenger-server-six.vercel.app/chat/all`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				}
			).then((data) => data.json());
			if (chats) setChats(chats);
		})();
	}, [reload]);

	const handler = (e: React.MouseEvent<Element, MouseEvent> | MouseEvent) => {
		const x = e.pageX - 1;
		setMenuWidth(`${String(x)}px`);
	};

	const clickHandler = useCallback(() => {
		setIsSearch(true);
		setAnimate(true);
	}, [animate, isSearch]);

	return (
		// TODO: side exprmental
		// TODO: set env variable for bottom window width to resize: 1275
		<div
			ref={ref}
			className={`h-full bg-theme-side-bg-color w-grid-side-w
			relative transition-[width]
			${shouldHideMenu ? 'hide' : ''}`}
			style={menuW && window.innerWidth > 1275 ? { width: menuW } : {}}
		>
			<Slider side="right" handler={handler} />
			<header className="shadow-side-nav-shadow">
				<div className="flex items-center gap-[0.8125rem] p-side-header-padding">
					<div className="flex justify-center items-center">
						<div
							className="p-bttn-smaller-p w-bttn-smaller-w 
							h-bttn-smaller-h rounded-[50%] cursor-pointer
							hover:bg-theme-side-bg-shade flex items-center justify-center"
							onClick={() => (isSearch ? setIsSearch(false) : () => {})}
						>
							{isSearch ? (
								<FontAwesomeIcon
									className="text-color-message text-large-font-size search-ico-rotate-effect"
									onClick={() => setIsSearch(false)}
									icon={faArrowLeft}
								/>
							) : (
								<FontAwesomeIcon
									className="text-color-message text-large-font-size search-ico-rotate-b-effect"
									icon={faBars}
								/>
							)}
						</div>
					</div>
					<Search
						value={search}
						placeholder="Search"
						handlerInput={setSearch}
						handlerClick={clickHandler}
						loading={user.searchLoading}
					/>
				</div>
				{isSearch ? <NavUsers /> : <NavChats />}
			</header>
			{isSearch ? (
				<MenuUsers type={search ? 'search' : 'contacts'} value={search} />
			) : (
				<MenuChats animate={animate} chats={chats} />
			)}
		</div>
	);
};

export default Menu;
