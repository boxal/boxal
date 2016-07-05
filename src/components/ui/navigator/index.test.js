import React from 'react';
import * as enzyme from 'enzyme';
import Navigator from './index';
import test from 'ava';

test('should be a flex container', (assert) => {
  const component = enzyme.shallow(<Navigator/>);
  assert.truthy(component.hasClass('flex'));
});

test('should vertically center the children', (assert) => {
  const component = enzyme.shallow(<Navigator/>);
  assert.truthy(component.hasClass('items-center'));
});

test('should render the children', (assert) => {
  const component = enzyme.shallow(<Navigator><div>test</div></Navigator>);
  assert.truthy(component.contains(<div>test</div>));
});
