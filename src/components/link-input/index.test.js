import test from 'ava';
import * as enzyme from 'enzyme';
import * as td from 'testdouble';
import React from 'react';
import LinkInput from './index';

test('should call onLinkSubmit when the user clicks "Save Link"', () => {
  const onLinkSubmit = td.function();
  const dom = (
    <LinkInput onLinkSubmit={onLinkSubmit}/>
  );

  const component = enzyme.mount(dom);
  const button = component.find('button[type="button"]');
  button.simulate('click');
  td.verify(onLinkSubmit(''));
});

test('should call onLinkSubmit with the user typed dropbox link', () => {
  const onLinkSubmit = td.function();
  const link = 'dropbox.com/link';
  const dom = (
    <LinkInput onLinkSubmit={onLinkSubmit}/>
  );

  const component = enzyme.mount(dom);
  const button = component.find('button[type="button"]');
  const input = component.find('.qa-album-link-input').at(0);
  input.simulate('change', { target: { value: link } });
  button.simulate('click');
  td.verify(onLinkSubmit(link));
});
