import React from 'react';
import LostRunRateChart from './LostRunRateChart';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('Lost Run Rate & OnHold Chart should render', () => {
  const component = shallow(
    <LostRunRateChart
      ICE={56}
      JandA={12}
      BidSubmitted={30}
      OrderReceived={20}
      InProgress={24}
      Completed={20}
    />
  );
  // let tree = component.toJSON();
  expect(component.getElements()).toMatchSnapshot();
});

it('Graph Grid exist', () => {
  const props = {
    ICE: 56,
    JandA: 12,
    BidSubmitted: 12,
    OrderReceived: 34,
    InProgress: 56,
    Completed: 45
  };
  const component = mount(<LostRunRateChart {...props} />);

  expect(component.find('#GridLostRunRateChart').exists);
});
