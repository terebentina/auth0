import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';
import Message from '../Message';

test('Components:Message', (t) => {
  const onHide = Sinon.spy();
  let wrapper = shallow(<Message onHide={onHide} />);
  t.equal(wrapper.type(), null, 'does not render anything without a message');
  wrapper = shallow(<Message text="foo" type="bar" onHide={onHide} />);
  t.ok(wrapper.is('div'), 'renders a <div>');
  t.equal(wrapper.props().className.trim(), 'alert', 'no className if wrong type');
  t.equal(wrapper.text(), 'foo', 'message is displayed');


  wrapper = shallow(<Message text="foo" type="error" onHide={onHide} />);
  t.equal(wrapper.props().className, 'alert alert-danger', 'correct className is used');
  t.equal(wrapper.text(), 'foo', 'message is displayed');
  t.end();
});
