import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import Button from '.';

describe('Testing regular size Button component', () => {

  let wrapper;
  const onClickFuntion = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <Button
        buttonText= {"lorem"}
        onClick = {onClickFuntion}
      />
    );
  });
  
  test("should render the Button component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render correct button text', () => {
    expect(screen.getByRole('button', {name: "lorem"})).toBeInTheDocument();
  });

  test('render with correct class', () => {
    const button = screen.getByText("lorem");
    expect(button).toHaveClass("button");
  })

  test("should call the onClick function when click in the button", () => {
    const button = screen.getByRole('button', {name: 'lorem'});
    fireEvent.click(button);
    expect(onClickFuntion).toHaveBeenCalledTimes(1);
  });
})

describe('Testing large size Button component', () => {

  let wrapper;
  const onClickFuntion = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <Button
        buttonText= {"loremipsum"}
        buttonSize= {"large"}
        onClick = {onClickFuntion}
      />
    );
  });
  
  test("should render the Button component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('render correct button text', () => {
    expect(screen.getByRole('button', {name: "loremipsum"})).toBeInTheDocument();
  });

  test('render with correct class', () => {
    const button = screen.getByText("loremipsum");
    expect(button).toHaveClass("large-button");
  })

  test("should call the onClick function when click in the button", () => {
    const button = screen.getByRole('button', {name: 'loremipsum'});
    fireEvent.click(button);
    expect(onClickFuntion).toHaveBeenCalledTimes(1);
  });
})