import Image from 'next/image';
import Wrapper from './wrapper';

interface ICountry {
	title: string;
	value: string;
}

export const countries: ICountry[] = [
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

export type TSelectItem = {
	title: string;
	value: string;
};

const CountryItem = ({ item }: { item: TSelectItem }) => {
	return (
		<Wrapper>
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
		</Wrapper>
	);
};

export default CountryItem;
