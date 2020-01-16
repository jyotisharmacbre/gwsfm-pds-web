import * as axios from '../../client';
import { isProjectStateInReview } from '../store-helper';

let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const changeProjectStatusToBidLost = (projectId: string, success, error) => {
	axios.baseAPI
		.put(`api/Workflow/${projectId}/bidlost`, config)
		.then((response) => {
			success(response.data);
		})
		.catch((exception) => {
			error(exception);
		});
};
export const changeProjectStatusToOnHold = (projectId: string, success, error) => {
	axios.baseAPI
		.put(`api/Workflow/${projectId}/onHold`, config)
		.then((response) => {
			success(response.data);
		})
		.catch((exception) => {
			error(exception);
		});
};
export const reactivateProject = (projectId: string, success, error) => {
	axios.baseAPI
		.put(`api/Workflow/${projectId}/reactivate`, config)
		.then((response) => {
			success(response.data, 'reactivate');
		})
		.catch((exception) => {
			error(exception);
		});
};
export const updateProjectStatusToInReview = (projectId: string, success, error) => {
	if (isProjectStateInReview()) error('error');
	axios.baseAPI
		.put(`/api/Workflow/${projectId}/inReview`, null, config)
		.then((response) => {
			success(response.data);
		})
		.catch((exception) => {
			error(exception);
		});
};

export const projectApprove = (projectId: string, success, error) => {
  axios.baseAPI
    .put(`/api/Workflow/${projectId}/Approve`, null, config)
    .then(response => {
      success(response.data);
    })
    .catch(exception => {
      error(exception);
    });
};
export const changeProjectStatusToOrderReceived = (projectId: string, success, error) => {
	axios.baseAPI
		.put(`api/Workflow/${projectId}/OrderReceived`, config)
		.then((response) => {
			success(response.data);
		})
		.catch((exception) => {
			error(exception);
		});
};

