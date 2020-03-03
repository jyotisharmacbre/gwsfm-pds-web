import * as axios from '../client';

let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const getAllPipelineData = (data:any) => {
	return axios.baseAPI.post('api/Projects/GetAll', data,config)
};
