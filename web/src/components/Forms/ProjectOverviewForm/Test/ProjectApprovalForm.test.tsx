import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { initialState } from '../../../../store/ProjectOverviewForm/Test/Reducertestdata';
import ProjectApprovalForm from '../ProjectApprovalForm';
import ProjectStatus from '../../../../enums/ProjectStatus';
import { IProjectApprovals } from '../../../../store/ProjectOverviewForm/Types/IProjectApprovals';

describe('Project Approval Form tests', () => {
    let testData = initialState.form.projectApprovals;
    let wrapper: any;
    let props: any;
    beforeEach(() => {
        props = {
            fields: {
                map: (callback) => testData.map((field, index) => callback(field, index)),
                getAll: jest.fn(x => testData),
                get: index => testData[index],
                length: testData.length,
            },
            formatUserData: jest.fn(),
            getListOfUsers: jest.fn(),
            status: ProjectStatus.InReview
        };


        wrapper = shallow(<ProjectApprovalForm
            {...props}
        />);

    });

    it('Defines the component', () => {
        expect(wrapper).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('renders the ProjectApprovalForm component with no errors', () => {
        expect(findByTestAtrr(wrapper, 'project-approval-form').length).toEqual(11);
    });
    it('should not render the icons against approvers if status is not in-review', () => {
        props.status = ProjectStatus.JA;
        wrapper = shallow(<ProjectApprovalForm {...props}
        />);
        expect(findByTestAtrr(wrapper, 'icons-approval-status').length).toEqual(0);
    });
    it('should render the icons against approvers if status is JAApproved', () => {
     testData[0] = {projectApprovalId : '1',
       projectId : '1',
       projectApprovalRange : 1,
       projectApprovalRangeDescription : '1',
       approverType: 1,
       approverTypeDescription: 'string',
       approvalStatus: 1,
       approvalStatusDescription: 'string',
       userId: 'string',
       showRangeLabel: true,

    }
        
        props.status = ProjectStatus.JAApproved;
        wrapper = shallow(<ProjectApprovalForm {...props}
        />);
        expect(findByTestAtrr(wrapper, 'icons-approval-status').length).toBeGreaterThan(0);
    });


});
