import { AuthenticationActions } from 'react-aad-msal';
import { Dispatch } from 'redux';

const logoutSuccess = () => {
	return {
		type: AuthenticationActions.LogoutSuccess
	};
};

export const logout = () => {
	return (dispatch: Dispatch) => {
		dispatch(logoutSuccess());
	}
};
