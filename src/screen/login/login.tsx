'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/input/personal';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Button } from '@/components/button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useActions } from '@/hooks/useActions';
import { setCookie } from 'nookies';
import authService from '@/services/auth.service';
import { formatPhoneToRegular } from '@/utils/phone';

const Login = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [red, setRed] = useState<boolean>(false);

	const { push } = useRouter();

	const { login } = useActions();
	const user = useTypedSelector((state) => state.user.user);

	const handleAuth = async () => {
		setLoading(true);

		const _phone = formatPhoneToRegular(user.phone);
		const response = await authService.login({ phone: _phone, password });

		if (response.user) {
			login({ token: response.token, user: response.user[0] });
			setCookie(null, 'token', response.token);
			push('/a');
		} else {
			setLoading(false);
			setRed(true);
			setTimeout(() => setRed(false), 1000);
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
					red={red}
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
