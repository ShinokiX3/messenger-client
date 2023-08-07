import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userSlice } from '@/store/user/user.slice';
import { chatSlice } from '@/store/chat/chat.slice';

const rootAction = {
	...userSlice.actions,
	...chatSlice.actions,
};

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
