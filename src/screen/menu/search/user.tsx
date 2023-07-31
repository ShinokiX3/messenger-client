import { useDebounce } from '@/hooks/useDebounce';
import NoResults from './empty';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { memo, useEffect, useMemo, useState } from 'react';
import Preview from '@/components/preview/preview';
import { IUser } from '@/store/user/user.types';
import MenuWrapper from '../wrapper';

interface IUsersSearch {
	value: string;
}

let timeout: null | ReturnType<typeof setTimeout> = null;

const UsersSearch: React.FC<IUsersSearch> = ({ value = '' }) => {
	const [users, setUsers] = useState<any[]>([]);
	const [active, setActive] = useState<string>('');

	const user = useTypedSelector((state) => state.user);
	const { setSearchLoading } = useActions();

	const debounced = useDebounce(value, 1000);

	timeout = useMemo(() => {
		if (timeout !== null) clearTimeout(timeout);
		return setTimeout(() => {
			setSearchLoading({ loading: false });
		}, 2000);
	}, [value]);

	useEffect(() => {
		if (value && !user.searchLoading) setSearchLoading({ loading: true });
	}, [value]);

	useEffect(() => {
		(async () => {
			if (debounced.length < 2) return [];
			const users = await fetch(
				`https://messenger-server-six.vercel.app/users/search`,
				{
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ query: debounced }),
				}
			).then((data) => data.json());
			setUsers(users);
		})();
	}, [debounced]);

	if (users.length === 0 && !user.searchLoading) return <NoResults />;

	return (
		<MenuWrapper items={users.length}>
			<div
				className="flex justify-between pt-[0.5rem] 
                pb-[0.4rem] pl-[0.6rem] pr-[0.3rem] text-[0.9375rem]"
			>
				<p className="text-color-message font-[500]">Chats and contacts</p>
				<p
					className="text-color-primary cursor-pointer border-b-[1px] 
                    border-transparent hover:border-b-[1px] hover:border-color-primary"
				>
					Show More
				</p>
			</div>
			<div>
				{users.map((user: IUser) => {
					return (
						<Preview
							key={user._id}
							data={{
								id: user._id,
								type: 'chat',
								last: { from: '', message: 'Last seen recently' },
								time: new Date(),
								read: null,
								pinned: false,
								image: '',
								source: user.name,
							}}
							active={active === user._id}
							setActive={setActive}
							revieving={user._id}
						/>
					);
				})}
			</div>
		</MenuWrapper>
	);
};

export default memo(UsersSearch);
