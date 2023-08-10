'use client';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
	faMagnifyingGlass,
	faEllipsisVertical,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Message as MessageInput } from '@/components/input/message';
// import Message from '@/components/message/Message';
import Message from '@/components/message/message';
import { io } from 'socket.io-client';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { parseToStringTime } from '@/utils/parseToStringTime';
import { IChat } from '../menu/menu';
import { IUser } from '@/store/user/user.types';
import { useActions } from '@/hooks/useActions';
import socketService from '@/services/socket.service';
import chatService from '@/services/chat.service';

export type TMessageUnreadImportance = 'regular' | 'important';
export type TMessageDeliveryStatus = 'sended' | 'read';

export interface IRead {
	importance: TMessageUnreadImportance;
	quantity: number;
}

export type TCasualMessage = string;
export type TWithImageMessage = { pictures: string[]; message: string };

export type TCombinedMessageTypes = TCasualMessage | TWithImageMessage;

export interface IMessage {
	userId: string;
	messageId: string;
	message: TCombinedMessageTypes;
	writed: Date;
	read: TMessageDeliveryStatus | null;
}

export interface IMessages {
	[day: string]: IMessage[];
}

interface IControlWrapper {
	children: React.ReactNode;
	styles?: { [key: string]: string } | {};
	classes?: string;
	handler?: Function;
}

export const ControlWrapper: React.FC<IControlWrapper> = ({
	children,
	styles = {},
	classes = '',
	handler = () => {},
}) => {
	return (
		<div
			className={`w-[2.5rem] h-[2.5rem] p-[0.3125rem] rounded-[50%] 
          hover:bg-[#aaaaaa14] flex justify-center items-center text-[1.15rem]
		  	${classes}`}
			style={styles}
			onClick={() => handler()}
		>
			{children}
		</div>
	);
};

interface IContent {
	clear?: boolean;
	room?: string;
}

let timeout: ReturnType<typeof setTimeout> | null = null;

const Content: React.FC<IContent> = ({ clear = false, room }) => {
	const socket = useMemo(() => socketService.connect(), []);

	const [messageInput, setMessageInput] = useState('');
	// const [messages, setMessages] = useState<IMessages>([]);
	const [messages, setMessages] = useState<IMessages[]>([]);
	const [typingDisplay, setTypingDisplay] = useState('');
	const [joined, setJoined] = useState(false);
	const messageLastRef = useRef<null | HTMLDivElement>(null);
	const [chatInfo, setChatInfo] = useState<[IChat, IUser[]] | []>([]);

	const { user, token, ui } = useTypedSelector((state) => state.user);
	const { setShouldHideMenu, setShouldHideContent, setSocket } = useActions();

	// TODO: remove socket from global store

	useEffect(() => {
		setSocket({ socket: '', chatId: room ? room : '', userId: user._id });
	}, []);

	useEffect(() => {
		(async () => {
			const response = await chatService.searchById({
				token,
				room: room ? room : '',
			});

			setChatInfo([response[0], response[1].map((item: any) => item[0])]);
		})();
	}, []);

	useEffect(() => {
		socket.emit('findAllMesseges', { room }, (response: IMessages[]) => {
			setMessages(response);
		});
	}, [room]);

	useEffect(() => {
		if (room) join(user.name, room);
	}, [room]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((prev) => {
				const messages = [...prev];
				if (
					messages[messages.length - 1][
						parseToStringTime(new Date(), 'message')
					]
				)
					messages[messages.length - 1][
						parseToStringTime(new Date(), 'message')
					].push(message);
				else
					messages.push({
						[parseToStringTime(new Date(), 'message')]: [message],
					});
				return messages;
			});
		});

		socket.on('typing', ({ name, isTyping }) => {
			if (isTyping) {
				setTypingDisplay(`${name} is typing...`);
			} else setTypingDisplay('');
		});

		return () => {
			socket.removeAllListeners('message');
		};
	}, [user]);

	// JSX.IntrinsicElements.div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

	useEffect(() => {
		const messageLast = messageLastRef.current;
		if (messageLast)
			setTimeout(
				() => messageLast.scrollIntoView({ behavior: 'smooth', block: 'end' }),
				250
			);
	}, [messages]);

	useEffect(() => {
		if (messageInput !== '') handleTyping();
	}, [messageInput]);

	useEffect(() => {
		console.log(socket);
	}, [socket]);

	const join = (username: string, room: string) => {
		socket.emit('join', { name: username, room }, (names: string[]) => {
			setJoined(true);
		});
	};

	const sendMessage = () => {
		if (messageInput) {
			socket.emit(
				'createMessege',
				{ userId: user._id, message: messageInput, room: room },
				() => {
					setMessageInput('');
				}
			);
		}
	};

	const handleTyping = () => {
		socket.emit('typing', { room: room, isTyping: true }, () => {});
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			socket.emit('typing', { room: room, isTyping: false });
		}, 2000);
	};

	const handleArrowBack = () => {
		setShouldHideMenu(false);
		setShouldHideContent(true);
	};

	const title = useMemo(() => {
		if (chatInfo[1]?.[0])
			return chatInfo[1]?.[0]._id === chatInfo[1]?.[1].name
				? 'Saved Messages'
				: chatInfo[1]?.[0].name !== user.name
				? chatInfo[1]?.[0].name
				: chatInfo[1]?.[1].name;
		else return 'Loading...';
	}, [chatInfo]);

	if (clear) {
		return (
			<div
				className="bg-theme-background-color 
				relative border-l border-color-border
				after:bg-[url('https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png')] 
				after:w-full after:h-full after:top-0 after:block after:z-10
				after:absolute after:bg-content-bg-image-size"
			></div>
		);
	}

	return (
		// > border-l border-color-border
		<div
			className={`bg-theme-background-color 
            relative
            after:bg-[url('https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png')] 
            after:w-full after:h-full after:top-0 after:block after:z-10
            after:absolute after:bg-content-bg-image-size
			${ui.shouldHideContent ? 'hide' : 'fullscreen'}`}
			// style={{ width: ui.contentW ? `${ui.contentW}` : '' }}
		>
			<div
				className="absolute top-0 
                bg-theme-side-bg-color
                py-middle-header-p-txb
                pl-middle-header-p-l
                pr-middle-header-p-r
                z-20 w-full flex cursor-pointer
                items-center justify-between
                shadow-middle-light-shadow"
			>
				<div className="flex items-center justify-between">
					<ControlWrapper
						styles={{ marginRight: '10px' }}
						classes="arrow-back"
						handler={handleArrowBack}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</ControlWrapper>
					<div
						className="rounded-[50%] bg-white 
                        w-preview-image-sm-w h-preview-image-sm-h
                        mr-[0.625rem]"
					></div>
					<div className="flex flex-col justify-center items-start">
						<p className="font-medium text-[1.125rem] leading-none">{title}</p>
						<p className="text-[0.875rem] text-color-message">
							{typingDisplay ? typingDisplay : 'Online'}
						</p>
					</div>
				</div>
				<div className="text-color-message flex">
					<ControlWrapper>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</ControlWrapper>
					<ControlWrapper>
						<FontAwesomeIcon icon={faEllipsisVertical} />
					</ControlWrapper>
				</div>
			</div>
			<div
				className="absolute bottom-middle-message-bottom 
                z-50 px-[1rem] max-w-message-container-max-w w-message-container-w
                transform translate-x-message-translate-percent"
			>
				<MessageInput
					value={messageInput}
					handlerInput={(value: string) => setMessageInput(value)}
					handlerSend={sendMessage}
				/>
			</div>
			<div
				// TODO: temporary max height!
				className="z-[15] max-w-message-container-max-w px-[1rem]
				w-message-container-w absolute bottom-middle-content-bottom 
				transform translate-x-message-translate-percent
				max-h-middle-content-height overflow-auto scrollbar grid"
			>
				{messages.map((date: IMessages) => {
					const day = Object.keys(date);
					if (date[day[0]]?.[0]?.message !== day[0])
						date[day[0]].unshift({
							userId: 'system',
							message: day[0],
							messageId: day[0],
							writed: new Date(),
							read: null,
						});

					return date[day[0]]?.map((message) => {
						if (message?.userId === 'system')
							return (
								<Message
									key={message?.messageId}
									type="system"
									text={message?.message}
									importance={message?.messageId === day[0] ? 'date' : 'usual'}
								/>
							);
						if (message?.userId === user._id)
							return (
								<Message
									key={message?.messageId}
									type="own"
									text={message?.message}
									time={message.writed}
								/>
							);
						if (message?.userId !== user._id)
							return (
								<Message
									key={message?.messageId}
									type="stranger"
									text={message?.message}
									time={message?.writed}
								/>
							);
					});
				})}
				<div ref={messageLastRef} className="w-[1px]"></div>
			</div>
			<div className="bg-transparent"></div>
		</div>
	);
};

export default memo(Content);

// const socket = useMemo(
// 	() => io('https://messenger-server-production-06a1.up.railway.app'),
// 	[]
// );
