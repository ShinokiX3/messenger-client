'use client';
import Spinner from '@/ui/spinner';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useState } from 'react';

interface ISearch {
	placeholder: string;
	value: string;
	handlerInput: Function;
	handlerClick: Function;
	loading?: boolean;
}

const Search: React.FC<ISearch> = ({
	placeholder = 'Search',
	value = '',
	handlerInput = () => {},
	handlerClick = () => {},
	loading = false,
}) => {
	const [focused, setFocused] = useState<boolean>(false);

	return (
		<div
			className="h-full 
            w-full bg-theme-side-bg-shade 
            rounded-search-border-r relative"
		>
			<input
				type="text"
				className="h-search-input-h 
                    bg-transparent 
                    w-full rounded-search-border-r 
                    border-2 border-solid 
                    border-theme-side-bg-shade 
                    focus:outline-none focus:ring-0 
                    focus:border-color-primary
                    focus:bg-theme-side-bg-color
					focus:caret-color-primary
                    p-search-padding"
				placeholder={placeholder}
				value={value}
				onChange={(e) => handlerInput(e.target.value)}
				onClick={(e) => handlerClick()}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			<FontAwesomeIcon
				className={`absolute top-[0.7rem] left-[1rem] 
					${focused ? 'text-color-primary' : 'text-color-message-rbga'}`}
				icon={faMagnifyingGlass}
			/>
			{loading ? (
				<div
					className="w-[26px] h-[26px] absolute top-[0.5rem] 
					right-[0.5rem] appearance-effect"
				>
					<Spinner color="blue" />
				</div>
			) : null}
			{!loading && value ? (
				<div
					className="text-[24px] text-color-message absolute top-[0.4rem] hover:bg-[#aaaaaa14]
					right-[0.5rem] appearance-effect rounded-[50%] leading-none w-[30px] h-[30px]
					flex justify-center items-center cursor-pointer"
					onClick={() => handlerInput('')}
				>
					<FontAwesomeIcon icon={faXmark} />
				</div>
			) : null}
		</div>
	);
};

export default memo(Search);
