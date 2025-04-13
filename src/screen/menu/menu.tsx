'use client';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';
import { Settings } from './screens/settings';
import { Profile } from './screens/profile';
import Social from './screens/social';

interface IParticipant {
	id: string;
	title: string;
}

export interface IChat {
	chatId: string;
	created: Date;
	last: {
		from: string;
		userId: string;
		message: string;
		writed: Date;
	};
	messages: any;
	pinned: boolean;
	read: {
		importance: string;
		quantity: number;
	};
	picture?: string[];
	participants: IParticipant[];
}

const Menu = () => {
	const user = useTypedSelector(state => state.user);

	if (user.ui.shouldShowProfile) return <Profile />
	if (user.ui.shouldShowSettings) return <Settings />

	return <Social />;
};

export default Menu;
