import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);


it('Notification should render', () => {
    const component = renderer.create(
        <Provider store={mockStore()}> <Notification /></Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('Notification should render icon', () => {
    const props = {
        notificationCount: 4,
        handleClick: () => {
        }
    }
    const component = mount(
        <Provider store={mockStore()}> <Notification {...props} /></Provider>
    );

    expect(component.find('#BellIcon').exists());
});


