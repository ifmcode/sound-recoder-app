import React from 'react';
import {render} from '@testing-library/react'
import Icon from '.';

describe('Testing Icon component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Icon
        iconName= {"settings"}
      />
    );
  });
  
  test("should render the Icon component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render with correct class', () => {
    const icon = wrapper.container.querySelector(".icon");
    expect(icon).toHaveClass("settings-icon");
  });
})

