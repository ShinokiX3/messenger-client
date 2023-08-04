import React from 'react';
import Wrapper from './wrapper';
import Dialog from './dialog';
import { Message } from '../input/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCross,
	faEllipsisVertical,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ControlWrapper } from '@/screen/content/content';

interface IFile {
	showHandler: (status: boolean) => void;
}

const Header = () => {
	return (
		<div className="flex items-center justify-between px-[0.25rem]">
			<ControlWrapper>
				<FontAwesomeIcon
					className="text-color-message text-large-font-size"
					icon={faXmark}
				/>
			</ControlWrapper>
			<div className="font-bold font-white">Send Photo</div>
			<ControlWrapper>
				<FontAwesomeIcon
					className="text-color-message text-large-font-size"
					icon={faEllipsisVertical}
				/>
			</ControlWrapper>
		</div>
	);
};

const Input = () => {
	return (
		<Message
			value=""
			handlerInput={() => {}}
			handlerSend={() => {}}
			isFileButton={false}
			isSendButton={false}
		/>
	);
};

const Content = () => {
	return (
		<div className="h-[300px] w-full bg-pink-800 my-[0.45rem] rounded-default-border-radius"></div>
	);
};

const File: React.FC<IFile> = ({ showHandler }) => {
	return (
		<Wrapper showHandler={showHandler}>
			<Dialog>
				<Header />
				<Content />
				<Input />
			</Dialog>
		</Wrapper>
	);
};

export default File;
