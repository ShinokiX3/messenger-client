import React, { useCallback, useEffect, useState } from 'react';
import { Section } from '../wrappers/section';
import { Header } from '../wrappers/header';
import { IconButton } from '@/components/button/button';
import { BackButton } from '../ui/button';
import FriendsSlider from '../search/friends';
import UsersSearch from '../search/user';
import ContextSettings from '@/components/context/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Search from '@/components/input/search';
import { IChat } from '../menu';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import esourcingService from '@/services/esourcing.service';
import chatService from '@/services/chat.service';
import NavUsers from '../nav/users';
import NavChats from '../nav/chats';
import MenuChats from '../content/chats';

interface Social {}

interface IMenuUsers {
	type: 'contacts' | 'search';
	value?: string;
}


const MenuUsers: React.FC<IMenuUsers> = ({ type = 'contacts', value = '' }) =>
    type === 'contacts' ? <FriendsSlider /> : <UsersSearch value={value} />;

const Social: React.FC<Social> = ({ }) => {
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

    return (
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
						{isSearch ? <BackButton /> : (
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

export default Social;