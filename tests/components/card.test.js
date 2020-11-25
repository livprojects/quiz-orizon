import React from 'react';
import { shallow } from 'enzyme';
import { expect, should } from 'chai';

import Card from 'src/components/App/Quiz/Card/Card';

should();

describe('Composant Card', () => {
  const wrapper = shallow(<Card />);

  it('has class cardquiz', () => {
    expect(wrapper.is('.cardquiz')).to.equal(true);
  });


});
