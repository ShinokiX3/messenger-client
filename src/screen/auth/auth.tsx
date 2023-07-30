import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, Select, TSelectItem } from '@/components/input/personal';
import Button from '@/components/button/button';
import { useRouter } from 'next/navigation';
import { useActions } from '@/hooks/useActions';
import Spinner from '@/ui/spinner';

// TODO: move to new component / file

interface ICountry {
	title: string;
	value: string;
}

const countries: ICountry[] = [
	{ title: 'Ukraine', value: '+380' },
	{ title: 'USA', value: '+1' },
	{ title: 'United Kingdom', value: '+44' },
	{ title: 'Japan', value: '+81' },
];

interface IFlags {
	[key: string]: {
		src: string;
		alt: string;
	};
}

const flags: IFlags = {
	'United Kingdom': {
		src: 'https://web.telegram.org/a/img-apple-160/1f1ec-1f1e7.png',
		alt: 'United Kingdom',
	},
	Ukraine: {
		src: 'https://web.telegram.org/a/img-apple-160/1f1fa-1f1e6.png',
		alt: 'Ukraine',
	},
	USA: {
		src: 'https://web.telegram.org/a/img-apple-160/1f1fa-1f1f8.png',
		alt: 'USA',
	},
	Japan: {
		src: 'https://web.telegram.org/a/img-apple-160/1f1ef-1f1f5.png',
		alt: 'Japan',
	},
};

const CountryItem = ({ item }: { item: TSelectItem }) => {
	return (
		<div
			className="flex justify-between items-center px-[0.25rem] 
			text-[0.875rem] font-medium"
		>
			<div className="flex items-center">
				<Image
					width={32}
					height={32}
					loader={() => flags[item.title].src}
					src={flags[item.title].src}
					alt={flags[item.title].alt}
				/>
				<p className="ml-[5px]">{item.title}</p>
			</div>
			<div>
				<p className="opacity-[0.5]">{item.value}</p>
			</div>
		</div>
	);
};

const Auth = () => {
	const [loading, setLoading] = useState(false);
	const [country, setCountry] = useState('Ukraine');
	const [phone, setPhone] = useState('');
	const [selectedCountry, setSelectedCountry] = useState<TSelectItem>({
		title: 'Ukraine',
		value: '+380',
	});

	const { push } = useRouter();
	const { setUserPhone } = useActions();

	// TODO: move to new file, create special service for these fetches, use it by react query

	const handleSubmit = async () => {
		setLoading(true);

		const response = await fetch(
			`https://messenger-server-six.vercel.app/auth/check-phone`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ phone: phone }),
			}
		).then((data) => data.json());

		if (response.statusCode === 200) push('/auth/login');
		else push('/auth/register');
	};

	useEffect(() => {
		setPhone(selectedCountry.value);
	}, [selectedCountry]);

	return (
		// <div className="flex pt-[5%] justify-center bg-theme-side-bg-color h-auth-height w-full">
		<div className="max-w-[25.5rem]">
			<div className="flex items-center justify-center flex-col mb-[3rem]">
				<div className="w-[10rem] h-[10rem] mb-[2.5rem] relative">
					<Image
						src="https://web.telegram.org/a/telegram-logo.1b2bb5b107f046ea9325.svg"
						alt="logo"
						fill
					/>
				</div>
				<p className="text-[2rem] mb-[0.5rem]">Telegram</p>
				<p className="text-color-message text-center">
					Please confirm your country code and enter your phone number.
				</p>
			</div>
			<div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setUserPhone({ phone: phone });
						handleSubmit();
					}}
					className="flex flex-col gap-[1.5rem]"
				>
					<Select
						header="Country"
						value={country}
						typingHandler={setCountry}
						selectHandler={(item: TSelectItem) => {
							setCountry(item.title);
							setSelectedCountry(item);
						}}
						items={countries}
						Element={CountryItem}
					/>
					<Input
						header="Your phone number"
						type="text"
						value={phone}
						// TODO: create new util function for phone mask
						handler={(value: string) => {
							const re = /[^\d+]/gi;
							const rightValue = value.replace(re, '').substring(0, 13);
							setPhone(rightValue);
						}}
					/>
					<Button
						type="regular"
						size="large"
						text="NEXT"
						handler={() => {}}
						loading={loading}
					/>
					<Button size="large" text="LOG IN BY QR CODE" handler={() => {}} />
				</form>
			</div>
		</div>
		// </div>
	);
};

export default Auth;
