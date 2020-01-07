import { IUserServiceData } from '../../../../../store/UserService/Types/IUserService';
import { ILookup } from '../../../../../store/Lookups/Types/ILookup';
import { IProjectDashboardGridState } from '../../../../../store/Dashboard/Types/IProjectDashboardGridState';
import { LookupItems } from '../../../../../helpers/constants';

export const intialDashboardState: IProjectDashboardGridState = {
  actionApprovalDetails: [
    {
      name: 'a',
      modifiedBy: 'last@name.test',
      modifiedOn: '01-01-19',
      approvalStatus: '1',
      projectId: 'GUID'
    }
  ],
  error: null
};
export const intialLookupvalues: Array<ILookup> = [
  {
    lookupId: 1,
    lookupItem: LookupItems.Project_Approval_Sign_Off_Status,
    lookupKey: 1,
    description: 'Description'
  }
];
export const intialUsersEmailsData: Array<IUserServiceData> = [
  {
    id: '1',
    lastName: 'LastName',
    firstname: 'FirstName',
    email: 'last@name.test',
    displayName: 'DisplayName',
    groups: []
  }
];
export const getDashboardData: IProjectDashboardGridState = {
  actionApprovalDetails: [
    {
      name: '',
      modifiedBy: 'last@name.test',
      modifiedOn: '',
      approvalStatus: '1',
      projectId: ''
    }
  ],
  error: null
};
export const getUsersEmailData: Array<IUserServiceData> = [
  {
    id: '1',
    lastName: 'LastName',
    firstname: 'FirstName',
    email: 'last@name.test',
    displayName: 'DisplayName',
    groups: []
  }
];
