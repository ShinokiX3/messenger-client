import React from 'react';
import { ReadStatus, parseToStringTime } from '../preview/preview';
import Appendix from './appendix';

type TMessageType =
	| 'own'
	| 'stranger'
	| 'system'
	| 'system-date'
	| 'system-message';
type TSystemImportance = 'date' | 'usual' | 'regular';

interface IMessage {
	type?: TMessageType;
	text: string;
	time?: Date | null;
	importance?: TSystemImportance;
}

interface IStyledMessage {
	text: string;
	time?: Date | null;
}

const Onw: React.FC<IStyledMessage> = ({ text, time }) => {
	return (
		<div
			className="mb-s-message-m-b p-s-message-out-p w-fit
			bg-color-bg-s-message rounded-s-message-br-tb-lr 
			rounded-br-none text-s-message-fs relative max-w-s-message-max-w
			justify-self-end"
		>
			<div className="flex">
				<p>{text}</p>
				<div
					className="flex items-end justify-center 
					px-[0.25rem] ml-[0.4375rem] mr-[-0.5rem]"
				>
					<p className="text-small-ltime-fs mr-[0.1875rem] leading-none">
						{parseToStringTime(time ? new Date(time) : new Date())}
					</p>
					<ReadStatus status={'read'} color="white" />
					<Appendix color="--color-bg-s-message" />
				</div>
			</div>
		</div>
	);
};

const Stranger: React.FC<IStyledMessage> = ({ text, time }) => {
	return (
		<div className="grid grid-cols-s-message-grid-t-col">
			<div
				className="rounded-[50%] bg-white 
				w-preview-image-sm-w h-preview-image-sm-h
				mr-[0.625rem] self-end mb-[0.5rem]"
			></div>
			<div
				className="mb-s-message-m-b p-s-message-out-p w-fit
				bg-theme-side-bg-color rounded-s-message-br-tb-lr 
				rounded-bl-none text-s-message-fs relative max-w-s-message-max-w
				justify-self-start"
			>
				<div className="flex">
					<p>{text}</p>
					<div
						className="flex items-end justify-center 
                        px-[0.25rem] ml-[0.4375rem] mr-[-0.5rem]"
					>
						<p className="text-small-ltime-fs mr-[0.1875rem] leading-none">
							{parseToStringTime(time ? new Date(time) : new Date())}
						</p>
						<ReadStatus status={'read'} color="white" />
						<Appendix color="--theme-side-bg-color" side="right" />
					</div>
				</div>
			</div>
		</div>
	);
};

interface ISystemMessage {
	type: string;
}

const System: React.FC<IStyledMessage & ISystemMessage> = ({ text, type }) => {
	return (
		<div
			className={`flex items-center justify-center leading-[1.75]
			${type === 'date' ? 'sticky top-[0px] my-[1rem] z-[30]' : 'py-[0.5rem]'}`}
		>
			<p
				className="px-[0.5rem] text-[calc(16px - 0.0625rem)] 
				font-[500] rounded-default-border-radius bg-pattern-color
				select-none cursor-pointer"
			>
				{text}
			</p>
		</div>
	);
};

const Message: React.FC<IMessage> = ({
	type = 'own',
	importance = 'regular',
	text,
	time = null,
}) => {
	if (type === 'system') return <System text={text} type={importance} />;

	if (type === 'own') return <Onw text={text} time={time} />;

	if (type === 'stranger') return <Stranger text={text} time={time} />;

	return null;
};

export default Message;
