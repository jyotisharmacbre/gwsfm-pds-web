import * as axios from '../client';

let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const getUsersForEmailService = (search: string) => {
	return axios.userServiceAPI.get(`/api/identity/users/GetListOfUsers/${search}`);
};

export const getUsersForEmailsService = (data: Array<string>) => {
	return axios.userServiceAPI.post(`/api/identity/users/getusernamesforemailids`, data, config);
};
