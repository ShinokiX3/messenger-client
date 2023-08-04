'use client';
import Button from '@/components/button/button';
import { Input } from '@/components/input/personal';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
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

		let allow = redName || redEmail || redPassword;

		[setRedName, setRedEmail, setRedPassword].forEach((func, index) =>
			setTimeout(() => {
				func(false);
			}, (index + 1) * 400)
		);

		return !allow;
	};

	const handleRegister = async () => {
		if (handleMask()) return null;

		setLoading(true);

		const response = await fetch(
			`https://messenger-server-six.vercel.app/auth/register`,
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
					phone: user.phone,
					birthdate: new Date(),
				}),
			}
		).then((data) => data.json());

		if (response.token) {
			login({ token: response.token, user: response.user[0] });
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
