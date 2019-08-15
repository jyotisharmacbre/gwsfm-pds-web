import React from 'react';
import  HeaderPage from './HeaderPage';
import { IHeaderPageProps, IBtnActionProps } from '../props/AppProps';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('HeaderPage should render', () => {
    const component = renderer.create(
        <HeaderPage Title={''} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

 it('HeaderPage should render title', () => {
   const props ={
       Title: 'Overview'
   }
     const component = mount(
        <HeaderPage {...props} />
    );

    expect(component.find('h1').text()).toEqual('Overview');  
 });

 it('HeaderPage should render buttons', () => {

    let btn: IBtnActionProps = {
        Title: 'Test',
        Icon: 'create',
        HandleClick: () => {
        }
    }

    const props ={
        Title: 'Overview',
        ActionList:  [btn] || []
    }
      const component = mount(
         <HeaderPage {...props} />
     );
 
     expect(component.find('button').text()).toEqual('Test');  
  });
 
