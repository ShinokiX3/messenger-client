import React from 'react';
import Unread from '../preview/unread';
import { TUnreadMessageImportance } from '../preview/types.type';

export interface IUnreadMessages {
	status: TUnreadMessageImportance;
	quantity: number;
}

interface ITab {
	id: string;
	title: string;
	active: boolean;
	unread?: IUnreadMessages;
}

// 0.1875rem 0.1875rem 0rem 0rem

const Platform = ({ unread }: { unread: IUnreadMessages | null }) => {
	return (
		<div
			className={`absolute  
            h-[0.1875rem] w-full 
            bg-color-primary rounded-t-[0.1875rem]
			${unread ? 'bottom-[-40%]' : 'bottom-[-60%]'}`}
		></div>
	);
};

const Tab: React.FC<ITab> = ({ id, title, active, unread = null }) => {
	return (
		<div
			className="p-tab-padding 
            w-fit px-tab-paddinglxr 
            rounded-t-border-radius-message-small 
            hover:bg-theme-side-bg-shade 
            cursor-pointer"
		>
			<div
				className={`px-tab-padding-inner 
				font-tab-font-w relative flex 
				justify-center items-center 
				gap-[0.5rem]
				${active ? 'text-color-primary' : 'text-color-message'}`}
			>
				<p>{title}</p>
				{unread ? (
					<Unread
						status={unread.status}
						type="medium"
						quantity={unread.quantity}
					/>
				) : null}
				{active ? <Platform unread={unread} /> : null}
			</div>
		</div>
	);
};

export default Tab;
