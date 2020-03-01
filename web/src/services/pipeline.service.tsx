import * as axios from '../client';

let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const getAllPipelineData = () => {
	return axios.baseAPI.get('api/Projects/GetAll', config)
};
