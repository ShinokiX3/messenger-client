import Spinner from '@/ui/spinner';
import React from 'react';

type TButtonType = 'regular' | 'text' | 'primary';
type TButtonSize = 'regular' | 'large';

interface IButton {
	type?: TButtonType;
	size?: TButtonSize;
	bgColor?: string;
	style?: Object;
	loading?: boolean;
	text: string;
	handler: Function;
}

const styles = {
	regular: 'text-white bg-color-primary hover:bg-button-bg-regular-shade-color',
	text: 'text-color-primary hover:bg-button-bg-shade-color',
	primary: '',
};

const sizes = {
	regular: 'p-[0.4rem]',
	large: 'p-[0.625rem] h-[3.5rem]',
};

const Button: React.FC<IButton> = ({
	type = 'text',
	size = 'regular',
	bgColor = '',
	style = {},
	loading = false,
	text = '',
	handler,
}) => {
	return (
		<button
			style={style}
			className={`cursor-pointer rounded-default-border-radius 
            transition-all relative
            ${styles[type]}
            ${sizes[size]}`}
			onClick={() => handler()}
		>
			<p>{text}</p>
			{loading ? (
				<div className="w-spinner-size h-spinner-size absolute right-[15px] top-[25%]">
					<Spinner color={type === 'regular' ? 'white' : 'blue'} />
				</div>
			) : null}
		</button>
	);
};

export default Button;
