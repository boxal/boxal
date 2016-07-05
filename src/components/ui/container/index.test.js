import test from 'ava';
import React from 'react';
import * as enzyme from 'enzyme';
import Container from './index';

test('should have a "clearfix" class', (assert) => {
  const component = enzyme.shallow(<Container/>);
  assert.truthy(component.hasClass('clearfix'));
});

test('should have horizontal padding', (assert) => {
  const component = enzyme.shallow(<Container/>);
  assert.truthy(component.hasClass('px1'));
});

test('should default the width class to "max-width-1"', (assert) => {
  const component = enzyme.shallow(<Container/>);
  assert.truthy(component.hasClass('max-width-1'));
});

test('should not be centered horizontally by default', (assert) => {
  const component = enzyme.shallow(<Container/>);
  assert.falsy(component.hasClass('mx-auto'));
});

test('should set the horizontal margin to auto, when centered', (assert) => {
  const component = enzyme.shallow(<Container center/>);
  assert.truthy(component.hasClass('mx-auto'));
});

test('should set the width class to "max-width-2" when size is 2', (assert) => {
  const component = enzyme.shallow(<Container size={2}/>);
  assert.truthy(component.hasClass('max-width-2'));
});

test('should set the width class to "max-width-3" when size is 3', (assert) => {
  const component = enzyme.shallow(<Container size={3}/>);
  assert.truthy(component.hasClass('max-width-3'));
});

test('should set the width class to "max-width-4" when size is 4', (assert) => {
  const component = enzyme.shallow(<Container size={4}/>);
  assert.truthy(component.hasClass('max-width-4'));
});
