import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IChatInitialState } from './chat.types';

const initialState: IChatInitialState = {
	socket: null,
	userId: '',
	chatId: '',
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setSocket: (
			state,
			action: PayloadAction<{ socket: any; chatId: string; userId: string }>
		) => {
			state.socket = action.payload.socket;
			state.chatId = action.payload.chatId;
			state.userId = action.payload.userId;
		},
	},
});
