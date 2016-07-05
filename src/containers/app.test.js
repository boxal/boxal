import React from 'react';
import test from 'ava';
import * as enzyme from 'enzyme';
import Navbar from './navbar';
import Container from '../components/ui/container';
import App from './app';

test('should render the navbar', (assert) => {
  const dom = (
    <App/>
  );
  const component = enzyme.shallow(dom);
  assert.is(component.find(Navbar).length, 1);
});

test('should into a Container', (assert) => {
  const dom = (
    <App/>
  );
  const component = enzyme.shallow(dom);
  assert.is(component.find(Container).length, 1);
});

test('should render all children', (assert) => {
  const children = (
    <div> I'm a child! </div>
  );

  const dom = (
    <App>
      {children}
    </App>
  );

  const component = enzyme.shallow(dom);
  const section = component.find('section').at(0);
  assert.truthy(section.contains(children));
});
