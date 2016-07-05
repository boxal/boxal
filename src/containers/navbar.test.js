import React from 'react';
import * as enzyme from 'enzyme';
import test from 'ava';
import Navigator from '../components/ui/navigator';
import NavigatorItem from '../components/ui/navigator-item';
import { Component as Navbar } from './navbar';

test('should render a Navigator', (assert) => {
  const dom = (
    <Navbar/>
  );
  const component = enzyme.shallow(dom);
  assert.is(component.type(), Navigator);
});

test('should render only NavigatorItems inside the Navigator', (assert) => {
  const dom = (
    <Navbar/>
  );
  const component = enzyme.shallow(dom);
  const children = component.children();
  const isNavigatorItem = (node) => node.type() === NavigatorItem;
  assert.truthy(children.everyWhere(isNavigatorItem));
});
