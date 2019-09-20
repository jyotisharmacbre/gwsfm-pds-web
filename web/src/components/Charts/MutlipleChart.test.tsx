import React from 'react';
import ReactDOM from 'react-dom';
import LostRunRateChart from './LostRunRateChart';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MultipleChart from './MultipleCharts';
Enzyme.configure({ adapter: new Adapter() });

it('Lost Run Rate & OnHold Chart should render', () => {
    const component = shallow(
      <MultipleChart ProjectTotal={200} ICE={50} Rejected={50} JandA={50} LostProjects={30} OrderReceived={20} OnHoldProject={15} InProgress={24} Completed={20}/> 
      );
     // let tree = component.toJSON();
     expect(component.getElements()).toMatchSnapshot();
});

 it('Graph Grid exist', () => {
   const props ={
   ProjectTotal:200 , ICE:56, JandA:12, Rejected:12,LostProjects:40, OrderReceived:34, InProgress:56, Completed:45,OnHoldProject:30
   }
     const component = mount(
        <MultipleChart {...props} />
    );

    expect(component.find('#GridMultipleChart').exists);  
 });

 
