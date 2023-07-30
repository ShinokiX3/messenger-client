import { TUnreadMessageImportance, TUnreadMessageType } from './types.type';

interface IUnread {
	status: TUnreadMessageImportance;
	type: TUnreadMessageType;
	quantity: number;
}

const Unread: React.FC<IUnread> = ({ status, type, quantity }) => {
	return (
		<div
			className={`rounded-default-border-radius 
				p-unread-padding text-white min-w-[1.5rem] h-[1.5rem] 
				flex items-center justify-center
				${status === 'important' ? 'bg-color-primary' : 'bg-color-gray'}`}
		>
			{quantity}
		</div>
	);
};

export default Unread;
