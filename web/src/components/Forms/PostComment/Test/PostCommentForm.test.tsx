import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PostCommentForm from '../PostCommentForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';

const mockStore = configureStore([]);
let store;
let wrapper;
const setUpStore = () => {
	store = mockStore({
		form: {PostCommentForm:{values:{comment:'test comment'}}},
	});
};
const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<PostCommentForm {...Props} />
			</IntlProvider>
		</Provider>
	);
};
describe('Post comment form test case', () => {
	const props = {
	    postComment: jest.fn(),
	};
	beforeEach(() => {
      setUpStore();
      mountComponent(props);
	});
	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
    it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
    it('should render the correct value in comment text area', () => {
            expect(wrapper.find('textarea[name="comment"]').text()).toEqual('test comment');
    });  
});
