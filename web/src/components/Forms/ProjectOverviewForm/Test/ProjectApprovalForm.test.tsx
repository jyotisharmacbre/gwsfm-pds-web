import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import ProjectApprovalForm from '../ProjectApprovalForm';
import ProjectStatus from '../../../../enums/ProjectStatus';
import { projectApprovalsList } from './ProjectApprovalFormTestData';
import { initialState } from '../../../../store/ProjectOverviewForm/Test/Reducertestdata';

const testData = initialState.form.projectApprovals;

let wrapper: any;
let props: any;

const getFields = (approvalsList)=>{
   return {
        map: (callback) => approvalsList.map((field, index) => callback(field, index)),
        getAll: jest.fn(x => approvalsList),
        get: index => approvalsList[index],
        length: approvalsList.length,
    }
}
props = {
    fields: getFields(testData),
    formatUserData: jest.fn(),
    getListOfUsers: jest.fn(),
    status: ProjectStatus.InReview
};

let mountComponent= (props)=>{
    wrapper = shallow(<ProjectApprovalForm
        {...props}
    />);
}


describe('Project Approval Form tests', () => {

    it('Defines the component', () => {
        mountComponent(props);
        expect(wrapper).toBeDefined();
    });
    it('should match the snapshot', () => {
        mountComponent(props);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders the ProjectApprovalForm component with no errors', () => {
        mountComponent(props);
        expect(findByTestAtrr(wrapper, 'project-approval-form').length).toEqual(11);
    });
    it('should not render the icons against approvers if status is not in-review', () => {
        mountComponent(props);
        expect(findByTestAtrr(wrapper, 'icons-approval-status').length).toEqual(0);
    });

    it('should render the icons against approvers if status is JAApproved', () => {
        props.fields = getFields(projectApprovalsList)
        props.status = ProjectStatus.JAApproved;
        mountComponent(props);
        expect(findByTestAtrr(wrapper, 'icons-approval-status').length).toBeGreaterThan(0);
    });

});