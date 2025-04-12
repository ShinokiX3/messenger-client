import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, Select, TSelectItem } from '@/components/input/personal';
import { Button } from '@/components/button/button';
import { useRouter } from 'next/navigation';
import { useActions } from '@/hooks/useActions';
import Spinner from '@/ui/spinner';
import CountryItem, { countries } from '@/ui/context/variables/country';
import authService from '@/services/auth.service';
import { COUNTRY_RULES, formatPhoneNumber, formatPhoneToRegular, validationPhoneNumber } from '@/utils/phone';

// TODO: move to new component / file

const Auth = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [country, setCountry] = useState<string>('Ukraine');
	const [phone, setPhone] = useState<string>('');
	const [selectedCountry, setSelectedCountry] = useState<TSelectItem>({
		title: 'Ukraine',
		value: '+380',
	});
	const [red, setRed] = useState<boolean>(false);

	const { push } = useRouter();
	const { setUserPhone } = useActions();

	// TODO: move to new file, create special service for these fetches, use it by react query

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const status = validationPhoneNumber(phone, selectedCountry.value);

		if (!status.l_completed) {
			setLoading(false);
			setRed(true);
			setTimeout(() => setRed(false), 1000);
			return null;
		}

		const _phone = formatPhoneToRegular(phone);
		const response = await authService.checkPhone({ phone: _phone });

		if (response.statusCode === 200) {
			setUserPhone({ phone });
			push('/auth/login');
		}
		else push('/auth/register');
	};

	useEffect(() => {
		setPhone(selectedCountry.value);
	}, [selectedCountry]);

	const handlePhoneChange = (value: string) => {
        const formatted = formatPhoneNumber(value, selectedCountry.value);
        const validation = validationPhoneNumber(formatted, selectedCountry.value);

		if (validation.l <= validation.l_required) setPhone(formatted);
    };

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
					onSubmit={handleSubmit}
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
						red={red}
						// TODO: create new util function for phone mask
						handler={handlePhoneChange}
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
