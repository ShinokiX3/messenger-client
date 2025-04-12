import { IUser } from '@/store/user/user.types';
import { SOURCE } from './sources.const';

type TError = unknown;

interface IUserFromServer {
	token: string;
	user: IUser[];
}

interface ICheckPhone {
	phone: string;
}

type TCheckPhonePromise = { statusCode: number };

interface ILogin {
	phone: string;
	password: string;
}

type TLoginPromise = IUserFromServer;

interface IRegister {
	email: string;
	password: string;
	name: string;
	phone: string;
	birthdate?: Date | null;
}

type TRegisterPromise = IUserFromServer;

class AuthService {
	async checkPhone({ phone }: ICheckPhone): Promise<TCheckPhonePromise> {
		try {
			const response: TCheckPhonePromise = await fetch(
				`${SOURCE}/auth/check-phone`,
				{
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ phone: phone }),
				}
			).then((data) => data.json());

			return response;
		} catch (error) {
			throw new Error();
		}
	}

	async login({ phone, password }: ILogin): Promise<TLoginPromise> {
		try {
			const response: TLoginPromise = await fetch(`${SOURCE}/auth/login`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: phone,
					password: password,
				}),
			}).then((res) => res.json());

			return response;
		} catch (error) {
			throw new Error();
		}
	}

	async register({
		email,
		password,
		name,
		phone,
		birthdate = new Date(),
	}: IRegister): Promise<TRegisterPromise> {
		try {
			const response: TRegisterPromise = await fetch(
				`${SOURCE}/auth/register`,
				{
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
						name: name,
						phone: phone,
						birthdate: birthdate,
					}),
				}
			).then((data) => data.json());

			return response;
		} catch (error) {
			throw new Error();
		}
	}
}

export default new AuthService();
