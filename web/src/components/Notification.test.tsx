import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('Notification should render', () => {
    const component = renderer.create(
        <Notification NotificationCount={5} handleClick={[]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

 it('Notification should render icon', () => {
   const props ={
    NotificationCount: 4,
    handleClick:() => {
    }
   }
     const component = mount(
        <Notification {...props} />
    );

    expect(component.find('#BellIcon').exists());  
 });

 
