import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import Popup from '.';
import {PopupType} from './popupConstants';

/**
 * Following the Object mother pattern we have this small fn that generates a valid object
 * that matches the structure of a recording
 *
 * @param {{ idNumber?: number, name?: string }} options
 * @returns {{ stream: string, name: string, id: string }}
 */
function getMockRecording({
  idNumber = Math.floor(Math.random() * 100),
  name = new Date().toISOString().split('.')[0].split('T').join(' ') + idNumber
}) {
  return {
    stream: "audioUrl",
    name,
    id: `id${idNumber}`
  }
}

describe('Testing Popup component when is used as a delete popup', () => {

  let wrapper;
  const selectedRecording = getMockRecording({}),
    onConfirm = jest.fn(),
    onDeny = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <Popup
        popupType={PopupType.DELETE_POPUP}
        selectedRecording={selectedRecording}
        onConfirm={onConfirm}
        onDeny={onDeny}
      />
    );
  });
  
  test("should render the Popup component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders the deleting popup title', () => {
    expect(screen.queryByText('Are you sure you want to delete this recording?')).toBeInTheDocument();
  });
  
  test('renders delete and cancel button', () => {
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
  });

  test("should call the onConfirm function when click in the delete button", () => {
    const deleteButton = screen.getByRole('button', {name: 'Delete'});
    fireEvent.click(deleteButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
  
  test("should call the onDeny function when click in the cancel button", () => {
    const cancelButton = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(cancelButton);
    expect(onDeny).toHaveBeenCalledTimes(1);
  });
});

describe('Testing Popup component when is used as a edit popup', () => {

  let wrapper;
  const selectedRecording = getMockRecording({}),
    onConfirm = jest.fn(),
    onDeny = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <Popup
        popupType={PopupType.EDIT_POPUP}
        selectedRecording={selectedRecording}
        onConfirm={onConfirm}
        onDeny={onDeny}
      />
    );
  });
  
  test("should render the Popup component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders the editing popup title', () => {
    expect(screen.queryByText('Enter a new name')).toBeInTheDocument();
  });
  
  test('renders the editing popup input', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  
  test('renders edit and cancel button', () => {
    expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
  });

  test("should call the onConfirm function when click in the edit button", () => {
    const editButton = screen.getByRole('button', {name: 'Edit'});
    fireEvent.click(editButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
  
  test("should call the onDeny function when click in the cancel button", () => {
    const cancelButton = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(cancelButton);
    expect(onDeny).toHaveBeenCalledTimes(1);
  });
})
