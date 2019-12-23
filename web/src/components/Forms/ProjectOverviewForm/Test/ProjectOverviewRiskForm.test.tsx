import React from 'react';
import { shallow } from "enzyme";
import ProjectOverviewRiskForm from '../ProjectOverviewRiskForm';
import { findByTestAtrr } from '../../../../helpers/test-helper';

describe('ProjectOverviewRiskForm Fields', () => {
    let wrapper: any;
    const props: any = {};

    beforeEach(() => {
        wrapper = shallow(<ProjectOverviewRiskForm {...props} />);
    });

    it('Defines the component', () => {
        expect(wrapper).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('Should renders Project Risk form field', () => {
        expect(findByTestAtrr(wrapper, 'riskName')).toBeDefined();
    });
    it('Should renders Project Risk Control Measure form field', () => {
        expect(findByTestAtrr(wrapper, 'riskControlMeasureName')).toBeDefined();
    });

});