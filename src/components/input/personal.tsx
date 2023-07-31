import ContextElement from '@/ui/context/element';
import ContextWrapper from '@/ui/context/wrapper';
import React, { useState } from 'react';

interface IWrapper {
	title: string;
	children: React.ReactNode;
}

const Wrapper: React.FC<IWrapper> = ({ title, children }) => {
	const [active, setActive] = useState<boolean>(false);
	return (
		<div
			className={`rounded-[0.75rem] relative p-personal-input-padding 
            border-border-width border-borders-color text-color-message
            hover:border-color-primary hover:text-color-primary
            transition-[all] ease-in-out
			${active ? 'border-color-primary text-color-primary' : ''}`}
			onClick={() => setActive(true)}
			onBlur={() => setActive(false)}
		>
			{children}
			<label
				className="absolute top-[-25%] left-[4px] bg-theme-side-bg-color 
                px-[4px] text-[0.8rem] leading=[1.5]"
			>
				{title}
			</label>
		</div>
	);
};

type TInputType = 'text' | 'password' | 'button' | 'email' | 'tel';

interface IInput {
	header: string;
	type: TInputType;
	placeholder?: string;
	value: string;
	handler: Function;
}

const Input: React.FC<IInput> = ({
	header = '',
	type = 'text',
	placeholder = '',
	value = '',
	handler = () => {},
}) => {
	return (
		<Wrapper title={header}>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => handler(e.target.value)}
				className="text-white w-full h-full 
                bg-transparent focus:outline-0 caret-color-primary"
			/>
		</Wrapper>
	);
};

interface ISelectItem {
	item: TSelectItem;
}

const SelectItem: React.FC<ISelectItem> = ({ item }) => {
	return <div>{item.title}</div>;
};

export type TSelectItem = {
	title: string;
	value: string;
};

interface ISelect {
	header: string;
	items: TSelectItem[];
	value: string;
	typingHandler: Function;
	selectHandler: Function;
	Element: any;
}

const Select: React.FC<ISelect> = ({
	header,
	value,
	typingHandler,
	selectHandler,
	items,
	Element,
}) => {
	const [shouldShow, setShouldShow] = useState(false);

	return (
		<Wrapper title={header}>
			<input
				type="text"
				value={value}
				onChange={(e) => typingHandler(e.target.value)}
				className="text-white w-full h-full bg-transparent 
                focus:outline-0 caret-color-primary"
				onClick={() => setShouldShow(true)}
				onBlur={() => setShouldShow(false)}
			/>
			{shouldShow ? (
				<ContextWrapper>
					{items.map((item) => (
						<ContextElement
							key={item.value}
							onMouseDown={() => selectHandler(item)}
						>
							{Element ? <Element item={item} /> : <SelectItem item={item} />}
						</ContextElement>
					))}
				</ContextWrapper>
			) : null}
		</Wrapper>
	);
};

const Personal = ({}) => {
	return <div></div>;
};

export { Personal, Input, Select };
