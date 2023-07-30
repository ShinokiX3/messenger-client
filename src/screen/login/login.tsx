'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/input/personal';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useActions } from '@/hooks/useActions';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState<string>('');
	const { push } = useRouter();

	const { login } = useActions();
	const user = useTypedSelector((state) => state.user.user);

	const handleAuth = async () => {
		setLoading(true);

		const response = await fetch(
			`https://messenger-server-six.vercel.app/auth/login`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: user.phone,
					password: password,
				}),
			}
		).then((res) => res.json());

		if (response.user) {
			login({ token: response.token, user: response.user[0] });
			push('/a');
		}
	};

	return (
		<div className="flex items-center flex-col mb-[3rem] max-w-[25rem]">
			<div className="w-[10rem] h-[10rem] mb-[2.5rem] relative">
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
				We are not sending the code for auth, than you must input your password.
			</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAuth();
				}}
				className="grid gap-[20px] mt-[50px] w-full"
			>
				<Input
					header="Password"
					type="password"
					value={password}
					handler={setPassword}
					placeholder="Password"
				/>
				<Button
					type="text"
					size="large"
					text="LOGIN"
					handler={() => {}}
					loading={loading}
				/>
			</form>
		</div>
	);
};

export default Login;
