import React from 'react';
import ReactDOM from 'react-dom';
import { PageBtnActions } from './BtnActions';
import { IBtnActionProps } from '../../props/AppProps';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('PageBtnActions should render', () => {
    const component = renderer.create(
        <PageBtnActions Actions={[]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('PageBtnActions should render buttons', () => {
    let btn1: IBtnActionProps = {
        Title: 'Test',
        Icon: 'create',
        HandleClick: () => {
        }
    }

    const component = mount(
        <PageBtnActions Actions={[btn1]} />
    );

    expect(component.find('button').text()).toEqual('Test');
    
 

});
