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
import ContextSettings from '@/components/context/settings';
import esourcingService from '@/services/esourcing.service';
import chatService from '@/services/chat.service';
import throttle from 'lodash/throttle';

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

const MenuUsers: React.FC<IMenuUsers> = ({ type = 'contacts', value = '' }) =>
	type === 'contacts' ? <FriendsSlider /> : <UsersSearch value={value} />;

const MIN_MENU_WIDTH = 400;
const MAX_MENU_WIDTH = 600;

const Menu = () => {
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [animate, setAnimate] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [chats, setChats] = useState<IChat[]>([]);
	const [shouldSettings, setShouldSettings] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [reload, setReload] = useState('');
	const ref = useRef(null);

	const user = useTypedSelector((state) => state.user);
	const { shouldHideMenu } = useTypedSelector((state) => state.user.ui);
	const { setMenuWidth, setShouldHideContent } = useActions();

	const menuW = useMemo(() => `${user.ui?.menuW}`, [user.ui.menuW]);

	useEffect(() => {
		// TODO: mobile test
		setShouldHideContent(true);
		esourcingService.chatConnection(setReload);
	}, []);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const chats = await chatService.getAll({ token: user.token });
			if (chats) setChats(chats);
			setLoading(false);
		})();
	}, [reload]);

	useEffect(() => {
		const windowClickHandler = () => setShouldSettings(false);
		document.addEventListener('click', windowClickHandler);
		return () => document.removeEventListener('click', windowClickHandler);
	}, [shouldSettings]);

	const throttledSetWidth = useMemo(
        () =>
            throttle((width: number) => {
                setMenuWidth(`${width}px`);
            }, 60),
        [setMenuWidth]
    );

	const handler = useCallback(
        (e: React.MouseEvent<Element, MouseEvent> | MouseEvent) => {
            const x = e.pageX;
            // Ограничиваем ширину между MIN_MENU_WIDTH и MAX_MENU_WIDTH
            const newWidth = Math.max(MIN_MENU_WIDTH, Math.min(MAX_MENU_WIDTH, x));
            throttledSetWidth(newWidth);
        },
        [throttledSetWidth]
    );

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
							onClick={() =>
								isSearch
									? setIsSearch(false)
									: setShouldSettings(!shouldSettings)
							}
						>
							{isSearch ? (
								<FontAwesomeIcon
									className="text-color-message text-large-font-size search-ico-rotate-effect"
									onClick={() => setIsSearch(false)}
									icon={faArrowLeft}
								/>
							) : (
								<div className="relative leading-none">
									<FontAwesomeIcon
										className="text-color-message text-large-font-size search-ico-rotate-b-effect"
										icon={faBars}
									/>
									{shouldSettings ? (
										<ContextSettings
											styles={{ left: '-65%', top: '200%', width: '270px' }}
										/>
									) : null}
								</div>
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
				<MenuChats animate={animate} chats={chats} loading={loading} />
			)}
		</div>
	);
};

export default Menu;
