import React from 'react';
import test from 'ava';
import * as enzyme from 'enzyme';
import * as I from 'immutable';
import * as td from 'testdouble';
import { Component as AlbumLinksPage } from './album-links-page';
import LinkInput from '../components/link-input';

test('should render in a "Container"', (assert) => {
  const albumLinks = I.List();
  const dispatch = td.function();
  const dom = (
    <AlbumLinksPage albumLinks={albumLinks} dispatch={dispatch}/>
  );

  const component = enzyme.shallow(dom);
  assert.is(component.find('Container').length, 1);
});

test('should render a "LinkInput"', (assert) => {
  const albumLinks = I.List();
  const dispatch = td.function();
  const dom = (
    <AlbumLinksPage albumLinks={albumLinks} dispatch={dispatch}/>
  );

  const component = enzyme.shallow(dom);
  assert.is(component.find(LinkInput).length, 1);
});

test('should render all albums', (assert) => {
  const albumLinks = I.List.of(1, 2, 3);
  const dispatch = td.function();
  const dom = (
    <AlbumLinksPage albumLinks={albumLinks} dispatch={dispatch}/>
  );

  const component = enzyme.shallow(dom);
  const container = component.find('.qa-album-links').at(0);
  const toText = element => element.text().trim();
  const links = container.children().map(toText);
  assert.deepEqual(links, albumLinks.map(String).toJS());
});
