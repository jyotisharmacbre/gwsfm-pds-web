import { shallow } from 'enzyme';
import React from 'react';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { initialState } from '../../../../store/ProjectOverviewForm/Test/Reducertestdata';
import ProjectApprovalForm from '../ProjectApprovalForm';

describe('Project Approval Form tests', () => {
    const testData = initialState.form.projectApprovals;

    let wrapper: any;
    beforeEach(() => {
        let props = {
            fields: {
                map: (callback) => testData.map((field, index) => callback(field, index)),
                getAll: jest.fn(x => testData),
                get: index => testData[index],
                length: testData.length,
            },
            formatUserData: jest.fn(),
            getListOfUsers: jest.fn()
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



});
