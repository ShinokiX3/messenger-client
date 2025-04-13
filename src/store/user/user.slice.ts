import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUISettings, IUser, IUserInitialState } from './user.types';

const initialUser = {
	email: '',
	favourites: [],
	joindate: '',
	name: '',
	password: '',
	phone: '',
	role: [''],
	picture: [],
	__v: 0,
	_id: '',
};

const initialUI: IUISettings = {
	menuW: null,
	contentW: null,
	shouldHideMenu: false,
	shouldHideContent: false,
	shouldShowSettings: false,
	shouldShowProfile: false,
};

const initialState: IUserInitialState = {
	upperDrawer: false,
	searchLoading: false,
	token: '',
	ui: initialUI,
	user: { ...initialUser },
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserPhone: (state, action: PayloadAction<{ phone: string }>) => {
			state.user.phone = action.payload.phone;
		},

		login: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
			const { token, user } = action.payload;
			state.token = token;
			state.user = user;
		},

		quit: (state, _) => {
			state.token = '';
			state.user = initialUser;
		},

		pushFavourite: (state, action: PayloadAction<{ id: string }>) => {
			state.user.favourites = [...state.user.favourites, action.payload.id];
		},

		removeFavourite: (state, action: PayloadAction<{ id: string }>) => {
			state.user.favourites = state.user.favourites.filter(
				(item) => item !== action.payload.id
			);
		},

		toggleUpperDrawer: (state, action: PayloadAction<boolean>) => {
			state.upperDrawer = action.payload;
		},

		setSearchLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
			state.searchLoading = action.payload.loading;
		},

		setMenuWidth: (state, action: PayloadAction<string>) => {
			state.ui.menuW = action.payload;
		},

		setContentWidth: (state, action: PayloadAction<string>) => {
			state.ui.contentW = action.payload;
		},

		setShouldHideMenu: (state, action: PayloadAction<boolean>) => {
			state.ui.shouldHideMenu = action.payload;
			state.ui.shouldHideContent = !action.payload;
		},

		setShouldHideContent: (state, action: PayloadAction<boolean>) => {
			state.ui.shouldHideContent = action.payload;
			state.ui.shouldHideMenu = !action.payload;
		},
		
		setShouldShowSettings: (state, action: PayloadAction<boolean>) => {
			state.ui.shouldShowSettings = action.payload;
		},

		setShouldShowProfile: (state, action: PayloadAction<boolean>) => {
			state.ui.shouldShowProfile = action.payload;
		},

		updateUserPhotos: (state, action: PayloadAction<string>) => {
			state.user.picture = [action.payload, ...state.user.picture];
		},

		reset: (state) => {
			state.upperDrawer = false;
		},
	},
});
