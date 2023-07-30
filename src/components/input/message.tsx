import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import {
	faMicrophone,
	faPaperPlane,
	faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IMessage {
	value: string;
	handlerInput: Function;
	handlerSend: Function;
}

export const Message: React.FC<IMessage> = ({
	value,
	handlerInput,
	handlerSend,
}) => {
	return (
		<div className="flex items-center justify-center w-full gap-[0.5rem]">
			<div className="relative w-full shadow-message-shadow">
				<input
					type="text"
					value={value}
					onChange={(e) => handlerInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handlerSend();
					}}
					className="p-message-input-p px-[55px] leading-[1.3125]
                    bg-theme-side-bg-color rounded-message-border-radius w-full
                    focus:outline-none rounded-br-none"
					placeholder="Message"
				/>
				<FontAwesomeIcon
					className="absolute left-0 top-[50%] text-message-control-fs 
                    translate-x-message-control-pos-l translate-y-[-50%]
                    text-color-composer-button hover:text-color-primary 
                    cursor-pointer hover:cursor-default"
					icon={faFaceSmile}
				/>
				<FontAwesomeIcon
					className="absolute right-0 top-[50%] text-message-control-fs 
                    translate-x-message-control-pos-r translate-y-[-50%]
                    text-color-composer-button hover:text-color-primary 
                    cursor-pointer hover:cursor-default"
					icon={faPaperclip}
				/>
				<svg
					className="absolute right-[-9px] bottom-[-3px]"
					width="9"
					height="20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<filter
							x="-50%"
							y="-14.7%"
							width="200%"
							height="141.2%"
							filterUnits="objectBoundingBox"
							id="a"
						>
							<feOffset
								dy="1"
								in="SourceAlpha"
								result="shadowOffsetOuter1"
							></feOffset>
							<feGaussianBlur
								stdDeviation="1"
								in="shadowOffsetOuter1"
								result="shadowBlurOuter1"
							></feGaussianBlur>
							<feColorMatrix
								values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
								in="shadowBlurOuter1"
							></feColorMatrix>
						</filter>
					</defs>
					<g fill="none" fillRule="evenodd">
						<path
							d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
							fill="#000"
							filter="url(#a)"
						></path>
						<path
							d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
							fill="var(--theme-side-bg-color)"
							className="corner"
						></path>
					</g>
				</svg>
			</div>
			<div
				className="rounded-[50%] bg-theme-side-bg-color 
                w-[3.855rem] h-message-mic-control-wxh flex items-center
                justify-center text-message-control-fs message-input-form
                shadow-message-shadow text-color-composer-button
                hover:bg-color-primary hover:text-white cursor-pointer"
				onClick={value ? (e) => handlerSend() : (e) => {}}
			>
				{value ? (
					<FontAwesomeIcon
						className="message-ico-appearance-effect text-color-primary"
						icon={faPaperPlane}
					/>
				) : (
					<FontAwesomeIcon
						className="message-ico-appearance-effect-mic"
						icon={faMicrophone}
					/>
				)}
			</div>
		</div>
	);
};
