import React, { useEffect, useMemo, useState } from 'react';
import { ReadStatus, parseToStringTime } from '../preview/preview';
import Appendix from './appendix';
import Image from 'next/image';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import { dynamicBlurDataUrl } from '@/utils/dynamicBlurDataUrl';

type TMessageType =
	| 'own'
	| 'stranger'
	| 'system'
	| 'system-date'
	| 'system-message';
type TSystemImportance = 'date' | 'usual' | 'regular';

// TODO: need to rework message 'text' types and create new .type file for it

export type TCasualMessage = string;
export type TWithImageMessage = { pictures: string[]; message: string };

export type TCombinedMessageTypes = TCasualMessage | TWithImageMessage;

interface IMessage {
	type?: TMessageType;
	text: TCombinedMessageTypes;
	time?: Date | null;
	importance?: TSystemImportance;
}

interface IStyledMessage {
	text: TCombinedMessageTypes;
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
				<p>{typeof text === 'string' ? text : ''}</p>
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
					<p>{typeof text === 'string' ? text : ''}</p>
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
				{typeof text === 'string' ? text : ''}
			</p>
		</div>
	);
};

interface IOnwImage {
	text: TWithImageMessage;
	time: Date;
}

// rounded-br-none

const OnwImage: React.FC<IOnwImage> = ({ text, time }) => {
	const [image, setImage] = useState<{ url: string; placeholder: string }>({
		url: '',
		placeholder: '',
	});

	useEffect(() => {
		(async () => {
			const url = `https://messenger-server-production-06a1.up.railway.app/${text?.pictures?.[0]}`;
			const placeholder = await dynamicBlurDataUrl(url);
			if (placeholder) setImage({ url, placeholder });
		})();
	}, [text]);

	return (
		<div
			className={`mb-s-message-m-b w-fit h-fit
			bg-color-bg-s-message rounded-s-message-br-tb-lr 
			text-s-message-fs relative max-w-s-message-max-w
			justify-self-end
			${
				text.message
					? 'rounded-br-default-border-radius'
					: 'rounded-br-default-border-radius'
			}`}
		>
			<div
				className={`block 
				${text.message ? '' : 'rounded-b-default-border-radius'}`}
			>
				{/* TODO: Implement <Image /> from NextJS with its width \ height settings */}
				{/* TODO: Create new component for pre-loading images */}
				<Image
					src={image.url}
					alt="User picture"
					width={200}
					height={200}
					sizes="100vw"
					placeholder="blur"
					blurDataURL={image.placeholder || staticBlurDataUrl()}
					style={{
						width: '100%',
						height: 'auto',
					}}
					className={`rounded-t-default-border-radius
					${text.message ? '' : 'rounded-b-default-border-radius'}`}
				/>
				{text.message ? (
					<p className="p-[0.4rem] max-w-[85%]">{text.message}</p>
				) : null}
				<div
					className="flex items-end justify-center bg-[#00000033] py-[0.3rem] px-[0.5rem]
					ml-[0.4375rem] mr-[-0.5rem] absolute right-[0.8rem] bottom-[0.4rem] rounded-default-border-radius"
				>
					<p className="text-small-ltime-fs mr-[0.1875rem] leading-none">
						{parseToStringTime(time ? new Date(time) : new Date())}
					</p>
					<ReadStatus status={'read'} color="white" />
					{/* {text.message ? <Appendix color="--color-bg-s-message" /> : null} */}
				</div>
			</div>
		</div>
	);
};

interface IStrangerImage {
	text: TWithImageMessage;
	time: Date;
}

// rounded-br-none

const StrangerImage: React.FC<IStrangerImage> = ({ text, time }) => {
	const [image, setImage] = useState<{ url: string; placeholder: string }>({
		url: '',
		placeholder: '',
	});

	useEffect(() => {
		(async () => {
			const url = `https://messenger-server-production-06a1.up.railway.app/${
				text?.pictures?.[0] || 'image/'
			}`;
			const placeholder = await dynamicBlurDataUrl(url);
			if (placeholder) setImage({ url, placeholder });
		})();
	}, [text]);

	if (!text) return <div>Loading...</div>;

	return (
		<div className="grid grid-cols-s-message-grid-t-col">
			<div
				className="rounded-[50%] bg-white 
				w-preview-image-sm-w h-preview-image-sm-h
				mr-[0.625rem] self-end mb-[0.5rem]"
			></div>
			<div
				className={`mb-s-message-m-b w-fit h-fit
				bg-color-bg-s-message rounded-s-message-br-tb-lr 
				text-s-message-fs relative max-w-s-message-max-w
				justify-self-start
			${
				text?.message
					? 'rounded-br-default-border-radius'
					: 'rounded-br-default-border-radius'
			}`}
			>
				<div
					className={`block 
				${text?.message ? '' : 'rounded-b-default-border-radius'}`}
				>
					<Image
						src={image.url}
						alt="User picture"
						width={200}
						height={200}
						sizes="100vw"
						placeholder="blur"
						blurDataURL={image.placeholder || staticBlurDataUrl()}
						style={{
							width: '100%',
							height: 'auto',
						}}
						className={`rounded-t-default-border-radius
						${text.message ? '' : 'rounded-b-default-border-radius'}`}
					/>
					{text?.message ? (
						<p className="p-[0.4rem] max-w-[85%]">{text?.message}</p>
					) : null}
					<div
						className="flex items-end justify-center bg-[#00000033] py-[0.3rem] px-[0.5rem]
					ml-[0.4375rem] mr-[-0.5rem] absolute right-[0.8rem] bottom-[0.4rem] rounded-default-border-radius"
					>
						<p className="text-small-ltime-fs mr-[0.1875rem] leading-none">
							{parseToStringTime(time ? new Date(time) : new Date())}
						</p>
						<ReadStatus status={'read'} color="white" />
						{/* {text.message ? <Appendix color="--color-bg-s-message" /> : null} */}
					</div>
				</div>
			</div>
		</div>
	);
};

const Message: React.FC<IMessage> = ({
	type = 'own',
	importance = 'regular',
	text,
	time = null,
}) => {
	// TODO: temporary solution
	const isImage = typeof text === 'string' ? false : true;

	if (type === 'system' && !isImage)
		return <System text={text} type={importance} />;
	if (type === 'own' && !isImage) return <Onw text={text} time={time} />;
	if (type === 'stranger' && !isImage)
		return <Stranger text={text} time={time} />;

	const nested: TWithImageMessage =
		typeof text !== 'string'
			? { ...text }
			: { pictures: ['picture'], message: '' };

	if (type === 'own' && isImage)
		return <OnwImage text={nested} time={time ? time : new Date()} />;
	if (type === 'stranger' && isImage)
		return <StrangerImage text={nested} time={time ? time : new Date()} />;

	return null;
};

export default Message;
