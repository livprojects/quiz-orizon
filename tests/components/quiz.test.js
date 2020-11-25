import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Quiz from 'src/components/App/Quiz';

describe('Composant Quiz', () => {
  const wrapper = shallow(<Quiz />);

  it('shows the quiz component doesnt exist', () => {
    expect(wrapper.exists()).to.be.false;
  });

  it('shows the quiz component exists', () => {
    expect(wrapper.exists()).to.be.true;
  });


});
