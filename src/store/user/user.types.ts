export interface IUser {
	email: string;
	favourites: Array<any>;
	joindate: string;
	name: string;
	password: string;
	phone: string;
	role: string[];
	__v: number;
	_id: string;
}

export interface IUISettings {
	menuW: string | null;
	contentW: string | null;
	shouldHideContent: boolean;
	shouldHideMenu: boolean;
	shouldShowSettings: boolean;
}

export interface IUserInitialState {
	upperDrawer: boolean;
	searchLoading: boolean;
	ui: IUISettings;
	token: string;
	user: IUser;
}
