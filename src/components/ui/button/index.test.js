import test from 'ava';
import Button from './index';
import React from 'react';
import * as td from 'testdouble';
import * as enzyme from 'enzyme';

test('should default the type to "button"', (assert) => {
  const component = enzyme.shallow(<Button/>);
  const button = component.find('button').at(0);
  assert.is(button.prop('type'), 'button');
});

test('should forward the button type', (assert) => {
  const component = enzyme.shallow(<Button type="submit"/>);
  const button = component.find('button').at(0);
  assert.is(button.prop('type'), 'submit');
});

test('should attach the "style" prop', (assert) => {
  const style = { backgroundColor: 'white' };
  const component = enzyme.shallow(<Button style={style}/>);
  const button = component.find('button').at(0);
  assert.deepEqual(button.prop('style'), style);
});

test('should attach a btn class', (assert) => {
  const component = enzyme.shallow(<Button/>);
  const button = component.find('button').at(0);
  assert.truthy(button.hasClass('btn'));
});

test('should attach a btn-primary class', (assert) => {
  const component = enzyme.shallow(<Button/>);
  const button = component.find('button').at(0);
  assert.truthy(button.hasClass('btn-primary'));
});

test('should attach arbitrary classes', (assert) => {
  const component = enzyme.shallow(<Button className="arbitrary horse"/>);
  const button = component.find('button').at(0);
  assert.truthy(button.hasClass('arbitrary'));
  assert.truthy(button.hasClass('horse'));
});

test('should render the children passed in', (assert) => {
  const component = enzyme.shallow(<Button><div>Test</div></Button>);
  const button = component.find('button').at(0);
  assert.truthy(button.contains(<div>Test</div>));
});

test('should handle click events', (assert) => {
  const onClick = td.function();
  const component = enzyme.shallow(<Button onClick={onClick}/>);
  const event = {};
  component.simulate('click', event);
  assert.notThrows(() => td.verify(onClick(event)));
});
