import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import {
	faFolderOpen,
	faMicrophone,
	faPaperPlane,
	faPaperclip,
	faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ContextFile from '../context/file';
import { createPortal } from 'react-dom';
import File from '../modal/file';
import Button from '../button/button';

const body = document.querySelector('body');

type TSendButtonType = 'initial' | 'button-usual';

type TSendButton = {
	show: boolean;
	type: TSendButtonType;
};

interface IMessage {
	value: string;
	placeholder?: string;
	handlerInput: Function;
	handlerSend: Function;
	sendButton?: TSendButton;
	isFileButton?: boolean;
	styles?: {};
}

interface ISendButton {
	value: string;
	handlerSend: Function;
	type?: TSendButtonType;
}

const SendButton: React.FC<ISendButton> = ({
	value,
	handlerSend,
	type = 'initial',
}) => {
	if (type === 'initial')
		return (
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
		);
	if (type === 'button-usual')
		return (
			<Button
				type="regular"
				text="SEND"
				handler={() => handlerSend()}
				style={{ minWidth: '80px', height: '100%' }}
			/>
		);
};

export const Message: React.FC<IMessage> = ({
	value,
	placeholder = 'Message',
	handlerInput,
	handlerSend,
	sendButton = { show: true, type: 'initial' },
	isFileButton = true,
	styles = {},
}) => {
	const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
	const [filePicker, setFilePicker] = useState<boolean>(false);
	const [showFileModal, setShowFileModal] = useState<boolean>(false);

	const ref = useRef<HTMLInputElement | null>(null);

	const items = useMemo(
		() => [
			{
				ico: faWindowRestore,
				text: 'Photo or Video',
				handler: () => setShowFileModal(true),
			},
			{ ico: faFolderOpen, text: 'File', handler: () => {} },
		],
		[]
	);

	useEffect(() => {
		const handleWindowClick = () => setFilePicker(false);
		document.addEventListener('click', handleWindowClick);
		return () => document.removeEventListener('click', handleWindowClick);
	}, [filePicker]);

	useEffect(() => {
		console.log(showFileModal);
	}, [showFileModal]);

	return (
		<div className="flex items-center justify-center w-full gap-[0.5rem]">
			<div className="relative w-full shadow-message-shadow" style={styles}>
				<input
					ref={ref}
					type="text"
					value={value}
					placeholder={placeholder}
					onChange={(e) => handlerInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handlerSend();
					}}
					className="p-message-input-p px-[55px] leading-[1.3125]
                    bg-theme-side-bg-color rounded-message-border-radius w-full
                    focus:outline-none rounded-br-none"
				/>
				<div>
					<FontAwesomeIcon
						icon={faFaceSmile}
						className={`absolute left-0 top-[50%] text-message-control-fs 
						translate-x-message-control-pos-l translate-y-[-50%]
						text-color-composer-button hover:text-color-primary 
						cursor-pointer hover:cursor-default`}
						style={emojiPicker ? { color: 'var(--color-primary)' } : {}}
						onClick={() => setEmojiPicker(!emojiPicker)}
						onMouseOver={() => setEmojiPicker(true)}
					/>
					{emojiPicker ? (
						<div className="absolute bottom-[115%]">
							<EmojiPicker
								data={data}
								previewPosition="none"
								searchPosition="static"
								onClickOutside={() => setEmojiPicker(false)}
								onEmojiSelect={(e: any) => {
									const emoji = e.native;
									const input = ref.current;
									const carret = input ? input.selectionStart : null;
									const v = carret
										? value.substring(0, carret) +
										  emoji +
										  value.substring(carret)
										: value + emoji;
									handlerInput(v);
									setEmojiPicker(false);
								}}
							/>
						</div>
					) : null}
				</div>
				{isFileButton ? (
					<div>
						<FontAwesomeIcon
							className="absolute right-0 top-[50%] text-message-control-fs 
							translate-x-message-control-pos-r translate-y-[-50%]
							text-color-composer-button hover:text-color-primary 
							cursor-pointer hover:cursor-default"
							icon={faPaperclip}
							onClick={() => setFilePicker(true)}
							onMouseOver={() => setFilePicker(true)}
						/>
						{filePicker ? (
							<ContextFile
								styles={{
									width: '250px',
									right: '0px',
									left: 'auto',
									top: '-150%',
								}}
								items={items}
							/>
						) : null}
					</div>
				) : null}
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
			{sendButton.show ? (
				<SendButton
					value={value}
					handlerSend={handlerSend}
					type={sendButton.type}
				/>
			) : null}
			{showFileModal && body
				? createPortal(<File showHandler={setShowFileModal} />, body)
				: null}
		</div>
	);
};
