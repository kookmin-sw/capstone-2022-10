const UserError = {
	NOT_FOUND: { message: 'USER_NOT_FOUND', code: 404 },
	NOT_AUTHORIZED: { message: 'NOT_AUTHORIZED', code: 401 },
	PASSWORD_NOT_MATCH: { message: 'PASSWORD_NOT_MATCH', code: 403 },
	USER_ID_EXISTS: { message: 'USER_ID_EXISTS', code: 403 },
};

export default UserError;
