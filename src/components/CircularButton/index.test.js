import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import CircularButton from '.';

describe('Testing small CircularButton component', () => {

  let wrapper;
  const onClickFuntion = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <CircularButton
        iconName= {"settings"}
        iconSize= {"small"}
      />
    );
  });
  
  test("should render the CircularButton component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render with correct class', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass("small-button");
    expect(button).toHaveClass("settings-button");
  });
})

describe('Testing medium CircularButton component', () => {

  let wrapper;
  const onClickFuntion = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <CircularButton
        iconName= {"trash"}
        iconSize= {"medium"}
        onClick= {onClickFuntion}
      />
    );
  });
  
  test("should render the CircularButton component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render with correct class', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass("medium-button");
    expect(button).toHaveClass("trash-button");
  })

  test("should call the onClick function when click in the button", () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickFuntion).toHaveBeenCalledTimes(1);
  });
})

describe('Testing big CircularButton component', () => {

  let wrapper;
  const onClickFuntion = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <CircularButton
        iconName= {"recording"}
        iconSize= {"big"}
        isRecording= {true}
        onClick= {onClickFuntion}
      />
    );
  });
  
  test("should render the CircularButton component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render with correct class', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass("big-button");
    expect(button).toHaveClass("recording-button");
  })

  test("should call the onClick function when click in the button", () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickFuntion).toHaveBeenCalledTimes(1);
  });
})