import test from 'ava';
import React from 'react';
import * as enzyme from 'enzyme';
import NavigatorItem from './index';

test('should render the children', (assert) => {
  const dom = (
    <NavigatorItem><div>test</div></NavigatorItem>
  );

  const component = enzyme.shallow(dom);
  assert.truthy(component.contains(<div>test</div>));
});

test('should not have a "hide" class when "isVisible" is true', (assert) => {
  const dom = (
    <NavigatorItem/>
  );
  const component = enzyme.shallow(dom);
  assert.falsy(component.hasClass('hide'));
});

test('should attach the "hide" class when "isVisible" is false', (assert) => {
  const dom = (
    <NavigatorItem isVisible={false}/>
  );

  const component = enzyme.shallow(dom);
  assert.truthy(component.hasClass('hide'));
});

test('should render the children when "isVisible" is false', (assert) => {
  const dom = (
    <NavigatorItem isVisible={false}>
      <div>Test</div>
    </NavigatorItem>
  );

  const component = enzyme.shallow(dom);
  assert.truthy(component.contains(<div>Test</div>));
});

test('should have a "truncate" class', (assert) => {
  const dom = (
    <NavigatorItem/>
  );

  const component = enzyme.shallow(dom);
  assert.truthy(component.hasClass('truncate'));
});

test('should set the left margin, if "ml" is an attribute', (assert) => {
  const dom = (
    <NavigatorItem ml/>
  );

  const component = enzyme.shallow(dom);
  assert.truthy(component.hasClass('ml2'));
});

test('should not set the left margin, if "ml" is not an attribute', (assert) => {
  const dom = (
    <NavigatorItem/>
  );

  const component = enzyme.shallow(dom);
  assert.falsy(component.hasClass('ml2'));
});

test('should set the right margin, if "mr" is an attribute', (assert) => {
  const dom = (
    <NavigatorItem mr/>
  );

  const component = enzyme.shallow(dom);
  assert.truthy(component.hasClass('mr2'));
});

test('should not set the right margin, if "ml" is not an attribute', (assert) => {
  const dom = (
    <NavigatorItem/>
  );

  const component = enzyme.shallow(dom);
  assert.falsy(component.hasClass('mr2'));
});
