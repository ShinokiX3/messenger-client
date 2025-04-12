'use client';
import { Button } from '@/components/button/button';
import { Input } from '@/components/input/personal';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import authService from '@/services/auth.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import React, { useState } from 'react';

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState<string>('');
	const [redName, setRedName] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [redEmail, setRedEmail] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [redPassword, setRedPassword] = useState<boolean>(false);
	const { push } = useRouter();

	const { login } = useActions();
	const user = useTypedSelector((state) => state.user.user);

	const handleMask = () => {
		if (name.length < 1) setRedName(true);
		if (email.length < 1) setRedEmail(true);
		if (password.length < 1) setRedPassword(true);

		let allow = name.length < 1 || email.length < 1 || password.length < 1;

		console.log(allow);

		[setRedName, setRedEmail, setRedPassword].forEach((func, index) =>
			setTimeout(() => {
				func(false);
			}, (index + 1) * 400)
		);

		return allow;
	};

	const handleRegister = async () => {
		if (handleMask()) return null;

		setLoading(true);

		const response = await authService.register({
			email,
			password,
			name,
			phone: user.phone,
		});

		if (response.token) {
			login({ token: response.token, user: response.user[0] });
			setCookie(null, 'token', response.token);
			push('/a');
		}
	};

	return (
		<div className="flex items-center flex-col max-w-[25rem]">
			<div className="w-[10rem] h-[5rem] relative">
				{/* h-[10rem] mb-[2.5rem]  */}
				{/* <Image
                    src="https://web.telegram.org/a/telegram-logo.1b2bb5b107f046ea9325.svg"
                    alt="logo"
                    fill
                /> */}
			</div>
			<div className="flex items-center justify-center gap-[12px] mb-[0.5rem] text-[2rem]">
				<p>{user?.phone}</p>
				<FontAwesomeIcon
					className="text-[1.2rem] text-color-message cursor-pointer"
					onClick={() => push('/auth')}
					icon={faPen}
				/>
			</div>
			<p className="text-color-message text-center">
				This phone number is not registered. To register, we need your help.
				Fill some information listed below to continue.
			</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleRegister();
				}}
				className="grid gap-[20px] mt-[50px] w-full"
			>
				<Input
					header="Your uniq name"
					type="text"
					value={name}
					red={redName}
					handler={setName}
					placeholder="Name"
				/>
				<Input
					header="Email"
					type="email"
					value={email}
					red={redEmail}
					handler={setEmail}
					placeholder="Email"
				/>
				<Input
					header="Password"
					type="password"
					value={password}
					red={redPassword}
					handler={setPassword}
					placeholder="Password"
				/>
				<Button
					type="text"
					size="large"
					text="REGISTER"
					handler={() => {}}
					loading={loading}
				/>
			</form>
		</div>
	);
};

export default Register;
