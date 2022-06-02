function getFormattedDate(param: Date): string {
	const year = param.getFullYear().toString();
	const rawMonth = String(Number(param.getMonth().toString()) + 1);
	const rawDate = String(param.getDate().toString());

	const month = rawMonth === '13' ? '01' : rawMonth.length === 1 ? '0' + rawMonth : rawMonth;
	const date = rawDate.length === 1 ? '0' + rawDate : rawDate;

	return [year, month, date].join('');
}

const ServerError = {
	SERVER_ERROR: { message: 'SERVER_ERROR', code: 500 },
};

export { getFormattedDate, ServerError };
