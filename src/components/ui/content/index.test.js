import test from 'ava';
import React from 'react';
import * as enzyme from 'enzyme';
import Content from './index';

test('should render the children by default', (assert) => {
  const component = enzyme.shallow(<Content><div>Hi</div></Content>);
  assert.truthy(component.contains(<div>Hi</div>));
});

test('should render the children if "isVisible" is true', (assert) => {
  const component = enzyme.shallow(<Content isVisible><div>Hi</div></Content>);
  assert.truthy(component.contains(<div>Hi</div>));
});

test('should not render the children if "isVisible" is false', (assert) => {
  const component = enzyme.shallow(<Content isVisible={false}><div>Hi</div></Content>);
  assert.falsy(component.contains(<div>Hi</div>));
});

test('should not render self when isVisible is false', (assert) => {
  const component = enzyme.shallow(<Content isVisible={false}><div>Hi</div></Content>);
  assert.is(component.prop('style').display, 'none');
});
