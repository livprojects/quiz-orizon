import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from 'src/components/App';

describe('Composant App', () => {
  const wrapper = shallow(<App />);

  it('shows the app component doesnt exist', () => {
    expect(wrapper.exists()).to.be.false;
  });

  it('shows the app component exists', () => {
    expect(wrapper.exists()).to.be.true;
  });


});
