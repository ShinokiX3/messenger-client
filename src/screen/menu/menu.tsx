'use client';
import Search from '@/components/input/search';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import NavUsers from './nav/users';
import NavChats from './nav/chats';
import MenuChats from './content/chats';
import UsersSearch from './search/user';
import FriendsSlider from './search/friends';
import { useActions } from '@/hooks/useActions';
import ContextSettings from '@/components/context/settings';
import esourcingService from '@/services/esourcing.service';
import chatService from '@/services/chat.service';
import { IconButton } from '@/components/button/button';
import { Section } from './wrappers/section';
import { Header } from './wrappers/header';
import { Settings } from './screens/settings';

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

const Menu = () => {
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [animate, setAnimate] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [chats, setChats] = useState<IChat[]>([]);
	const [shouldSettings, setShouldSettings] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [reload, setReload] = useState('');

	const user = useTypedSelector((state) => state.user);
	const {
		setShouldHideContent
	} = useActions();

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

	const clickHandler = useCallback(() => {
		setIsSearch(true);
		setAnimate(true);
	}, [animate, isSearch]);

	if (user.ui.shouldShowSettings) return <Settings />

	return (
		// TODO: side exprmental
		// TODO: set env variable for bottom window width to resize: 1275
		<Section>
			<Header sub={isSearch ? <NavUsers /> : <NavChats />}>
				<div className="flex justify-center items-center">
					<IconButton
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
					</IconButton>
				</div>
				<Search
					value={search}
					placeholder="Search"
					handlerInput={setSearch}
					handlerClick={clickHandler}
					loading={user.searchLoading}
				/>
			</Header>
			{isSearch && <MenuUsers type={search ? 'search' : 'contacts'} value={search} />}
			{!isSearch && <MenuChats animate={animate} chats={chats} loading={loading} />}
		</Section>
	);
};

export default Menu;
