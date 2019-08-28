import React from 'react';
import ReactDOM from 'react-dom';
import PreferredChart from './PreferredChart';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Doughnut, Pie, Polar, Bubble, Line } from 'react-chartjs-2';
it('Preferred Chart should render', () => {
    const component = shallow(
        <PreferredChart Preferred={4} NotPreferred={6}  />
    );
   // let tree = component.toJSON();
    expect(component.getElements()).toMatchSnapshot();
});

 it('Graph Grid exist', () => {
   const props ={
    Preferred:4, NotPreferred:6  
   }
     const component = mount(
        <PreferredChart {...props} />
    );

    expect(component.find('#GridPreferredChart').exists);  
 });

 
