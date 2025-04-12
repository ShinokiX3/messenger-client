import { IChat } from '@/screen/menu/menu';
import { IUser } from '@/store/user/user.types';
import { SOURCE } from './sources.const';

type TToken = string;

interface ISearchById {
	token: TToken;
	room: string;
}

type TSearchByIdPromise = [IChat, IUser[]];

interface ISearchByRevieving {
	token: TToken;
	revieving: string;
}

interface IGetAllChats {
	token: TToken;
}

class ChatService {
	async searchById({ token, room }: ISearchById): Promise<TSearchByIdPromise> {
		try {
			const response: [IChat, IUser[]] = await fetch(
				`${SOURCE}/chat/search/id`,
				{
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ chatId: room }),
				}
			).then((data) => data.json());

			return response;
		} catch (error) {
			throw new Error();
		}
	}

	async searchByRevieving({ token, revieving }: ISearchByRevieving) {
		try {
			const response = await fetch(`${SOURCE}/chat/search`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ revieving: revieving }),
			}).then((data) => data.json());

			return response;
		} catch (error) {
			throw new Error();
		}
	}

	async getAll({ token }: IGetAllChats) {
		try {
			const response = await fetch(`${SOURCE}/chat/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}).then((data) => data.json());

			return response;
		} catch (error) {
			throw new Error();
		}
	}
}

export default new ChatService();
