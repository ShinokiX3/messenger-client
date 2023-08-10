'use client';
import React, { memo, useRef } from 'react';
import {
	faThumbtack,
	faCheck,
	faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Unread from './unread';
import { TUnreadMessageImportance } from './types.type';
import { useRouter } from 'next/navigation';
import { ripple } from '@/utils/ripple';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import chatService from '@/services/chat.service';

export type TType = 'chat' | 'group' | 'channel';
export type TMessageDeliveryStatus = 'sended' | 'read' | null;

interface IRead {
	status: TUnreadMessageImportance;
	quantity: number;
}

interface ILast {
	from: string;
	message: string;
	status?: TMessageDeliveryStatus;
}

export interface IPreview {
	id: string;
	type: TType | string;
	image: string;
	source: string;
	last: ILast;
	time: Date;
	read: IRead | null;
	pinned: boolean;
}

interface IPreviewComponent {
	data: IPreview;
	active?: boolean;
	setActive: Function;
	revieving?: string;
}

interface IReadStatus {
	status: TMessageDeliveryStatus;
	active?: boolean;
	color?: string;
}

// TODO: move to new file

export const parseToStringTime = (date: Date) => {
	const month = date.toLocaleString('en-US', {
		month: 'long',
	});
	const hour = date.toLocaleString('ru-RU', {
		hour: '2-digit',
	});
	const minute = date.toLocaleString('ru-RU', { minute: '2-digit' });

	return `${month} ${hour}:${+minute < 10 ? `0${minute}` : minute}`;
};

// TODO: move to new component

export const ReadStatus: React.FC<IReadStatus> = ({
	status,
	active = false,
	color = '',
}) => {
	if (status === 'sended') {
		return (
			<FontAwesomeIcon
				className={`text-send-status-ico-wxh 
				${active ? 'white' : 'text-meta-colored'}
				${color ? `text-${color}` : ''}`}
				icon={faCheck}
			/>
		);
	}

	if (status === 'read') {
		return (
			<FontAwesomeIcon
				className={`text-send-status-ico-wxh 
				${active ? 'white' : 'text-meta-colored'}
				${color ? `text-${color}` : ''}`}
				icon={faCheckDouble}
			/>
		);
	}

	return null;
};

const Preview: React.FC<IPreviewComponent> = ({
	data,
	active,
	setActive,
	revieving = '',
}) => {
	const previewRef = useRef(null);
	const router = useRouter();

	const { setShouldHideContent, setShouldHideMenu } = useActions();
	const token = useTypedSelector((state) => state.user.token);

	const handleRoute = async () => {
		if (data.id.length < 11) {
			router.push('/a/' + data.id);
			return null;
		}

		const response = await chatService.searchByRevieving({ token, revieving });

		if (response.length > 0) {
			router.push('/a/' + response[0].chatId);
		}
	};

	return (
		<div
			onClick={() => {
				setShouldHideContent(false);
				handleRoute();
			}}
		>
			<div
				className={`p-preview-padding 
				rounded-default-border-radius 
				cursor-pointer select-none
				flex relative overflow-hidden
			${
				active
					? 'bg-theme-active-bg-color hover:bg-theme-active-bg-color'
					: 'hover:bg-theme-side-bg-shade'
			}`}
				ref={previewRef}
				onClick={(e) => {
					ripple(e, previewRef);
					setActive(data.id);
				}}
			>
				<div className="w-preview-image-w h-preview-image-h mr-ico-margin-right">
					<div
						className="w-preview-image-w h-preview-image-h rounded-[50%] 
						bg-gradient-to-r from-white-500 to-red-500 bg-white"
					>
						{/* Image */}
					</div>
				</div>
				<div className="flex flex-col justify-center w-full">
					<div className="flex justify-between">
						<div className="font-[500]">{data.source}</div>
						<div
							// mr-[0.1875rem]
							className={`text-small-text-size
							flex justify-center items-center
							${active ? 'white' : 'text-color-meta'}`}
						>
							{data.last.status ? (
								<div className="flex justify-center items-center mr-[2px]">
									<ReadStatus status={data.last.status} active={active} />
								</div>
							) : null}
							{parseToStringTime(data.time)}
						</div>
					</div>
					<div className="flex justify-between overflow-hidden">
						<div
							className={`whitespace-nowrap overflow-hidden 
							text-ellipsis w-preview-content-w flex text-[1rem]
							${active ? 'white' : 'text-color-message'}`}
						>
							{data.last.from ? (
								<p className="text-white font-[500] mr-[0.25rem]">{`${data.last.from}:`}</p>
							) : null}
							<p>
								{typeof data.last.message === 'string'
									? data.last.message
									: 'Image'}
							</p>
						</div>
						<div>
							{data.pinned && !data.read ? (
								<FontAwesomeIcon
									className={`text-default-pin-size ${
										active ? 'white' : 'text-color-pinned'
									}`}
									icon={faThumbtack}
								/>
							) : null}
							{data.read ? (
								<Unread
									status={data.read.status}
									type="large"
									quantity={data.read.quantity}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Preview);
