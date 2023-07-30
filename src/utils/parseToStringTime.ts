interface IType {
	year: 'numeric' | '2-digit';
	month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
	day: 'numeric' | '2-digit';
	hour: 'numeric' | '2-digit';
	minute: 'numeric' | '2-digit';
	seconds?: 'numeric' | '2-digit';
}

export const parseToStringTime = (
	date: Date,
	reason: 'message' | 'initial' = 'initial',
	type: IType = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	}
) => {
	const year = date.toLocaleString('en-US', { year: type.year });
	const month = date.toLocaleString('en-US', {
		month: type.month,
	});
	const day = date.toLocaleString('en-US', {
		day: type.day,
	});
	const hour = date.toLocaleString('ru-RU', {
		hour: type.hour,
	});
	const minute = date.toLocaleString('ru-RU', { minute: type.minute });

	if (reason === 'message') return `${month} ${day} ${year}`;

	return `${month} ${day} ${hour}:${+minute < 10 ? `0${minute}` : minute}`;
};
