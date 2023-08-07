import React, { useMemo, useState } from 'react';
import Wrapper from './wrapper';
import Dialog from './dialog';
import { Message } from '../input/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCross,
	faEllipsisVertical,
	faTrash,
	faUpload,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ControlWrapper } from '@/screen/content/content';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface IHeader {
	showHandler: (status: boolean) => void;
}

const Header: React.FC<IHeader> = ({ showHandler }) => {
	return (
		<div className="flex items-center justify-between px-[0.20rem]">
			<ControlWrapper
				styles={{ cursor: 'pointer' }}
				handler={() => showHandler(false)}
			>
				<FontAwesomeIcon
					className="text-color-message text-large-font-size"
					icon={faXmark}
				/>
			</ControlWrapper>
			<div className="font-bold font-white text-[1.25rem]">Send Photo</div>
			<ControlWrapper styles={{ cursor: 'pointer' }}>
				<FontAwesomeIcon
					className="text-color-message text-large-font-size"
					icon={faEllipsisVertical}
				/>
			</ControlWrapper>
		</div>
	);
};

interface IControl {
	children: React.ReactNode;
	handler?: () => void | React.Dispatch<React.SetStateAction<any>>;
}

const Control: React.FC<IControl> = ({ children, handler = () => {} }) => {
	return (
		<div
			className="rounded-default-border-radius py-[0.35rem] px-[0.4rem] 
			hover:bg-[#00000026] leading-none cursor-pointer transition-colors"
			onClick={() => handler()}
		>
			{children}
		</div>
	);
};

interface IContent {
	file: File | string | null;
	setFile: React.Dispatch<React.SetStateAction<File | string | null>>;
}

const Content: React.FC<IContent> = ({ file, setFile }) => {
	const url = useMemo(
		() => (file && typeof file !== 'string' ? URL.createObjectURL(file) : ''),
		[file]
	);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		if (input && input.files) setFile(input.files[0]);
	};

	return (
		<div
			className="max-h-max-file-upload-h min-w-[17.5rem] max-w-[26.25rem] 
			my-[0.45rem] rounded-default-border-radius overflow-auto scrollbar 
			hover:text-color-primary transition-colors"
		>
			{file ? (
				<div className="relative">
					<img src={url} alt="uploaded image" className="w-[auto] h-[auto]" />
					<div
						className="absolute bottom-[0.5rem] right-[0.5rem] bg-[#00000040] 
						rounded-default-border-radius flex items-center transition-colors 
						backdrop-blur-[10px] text-white text-[14px]"
					>
						<Control>
							<FontAwesomeIcon icon={faImages} />
						</Control>
						<Control handler={() => setFile(null)}>
							<FontAwesomeIcon icon={faTrash} />
						</Control>
					</div>
				</div>
			) : (
				<>
					<label
						htmlFor="uploadimage"
						className="flex items-center justify-center w-full h-full
						cursor-pointer min-h-[300px]"
					>
						<FontAwesomeIcon icon={faUpload} className="w-[5rem] h-[5rem]" />
					</label>
					<input
						id="uploadimage"
						name="image"
						type="file"
						className="hidden"
						onChange={handleChange}
					/>
				</>
			)}
		</div>
	);
};

interface IInput {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	sendHandler: () => void;
}

const Input: React.FC<IInput> = ({ value, setValue, sendHandler }) => {
	return (
		<Message
			value={value}
			placeholder={'Add a caption...'}
			handlerInput={setValue}
			handlerSend={() => {
				console.log('send');
				sendHandler();
			}}
			sendButton={{ show: true, type: 'button-usual' }}
			isFileButton={false}
			styles={{ boxShadow: 'none' }}
		/>
	);
};

interface IFile {
	showHandler: (status: boolean) => void;
}

const File: React.FC<IFile> = ({ showHandler }) => {
	const [value, setValue] = useState<string>('');
	const [file, setFile] = useState<File | string | null>(null);

	const { token } = useTypedSelector((state) => state.user);
	const { chatId, userId } = useTypedSelector((state) => state.chat);

	// TODO: make loading logic

	const sendMessage = async () => {
		const formData = new FormData();
		formData.append('picture', file ? file : '');
		formData.append('userId', userId);
		formData.append('chatId', chatId);
		formData.append('message', value);

		showHandler(false);

		await fetch(
			`https://messenger-server-production-06a1.up.railway.app/chat/send/photo`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			}
		);
	};

	return (
		<Wrapper showHandler={showHandler}>
			<Dialog>
				<Header showHandler={showHandler} />
				<Content file={file} setFile={setFile} />
				<Input value={value} setValue={setValue} sendHandler={sendMessage} />
			</Dialog>
		</Wrapper>
	);
};

export default File;
