import React from 'react';
import  Dashboard from './Dashboard';

import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('Dashboard should render', () => {
    const tree = renderer
      .create( <Dashboard  />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

 it('Dashboard should render preferred Graphs', () => {
   
     const component = mount(
        <Dashboard  />
    );

    expect(component.find('#GridPreferredChart').exists);  
 });
 it('Dashboard should render runrate Graphs', () => {
   
    const component = mount(
       <Dashboard  />
   );

   expect(component.find('#GridRunRateChart').exists);  
});