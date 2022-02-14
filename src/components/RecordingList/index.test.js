import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import {stateStatus} from '../../redux/state/types';
import RecordingList from ".";

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

/**
 * Applying the same pattern above we wrap the previous recording generator
 * to create a random list of recordings
 *
 * @param {number} length
 * @returns {{ stream: string, name: string, id: string }[]}
 */
function createMockRecordingList(length = 10) {
  const emptyList = new Array(length).fill(null);
  return emptyList.map(() => getMockRecording({}))
}

describe('Testing RecordingList component when store status is zero', () => {

  let wrapper;

  beforeEach(() => {
    const onSelectRecordingHandler = jest.fn();

    wrapper = render(
      <RecordingList
        recordings= {[]}
        selectedRecording= {null}
        storeStatus= {stateStatus.ZERO}
        onSelectRecordingHandler= {onSelectRecordingHandler}
      />
    );
  });
  
  test("should render the RecordingList component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders without crashing showing default loading message', () => {
    expect(wrapper.container.querySelector(".default-phrase-recording-list")).toBeInTheDocument();
    expect(screen.getByText("- Loading recordings -")).toBeInTheDocument();
  });
})

describe('Testing RecordingList component with failed store status', () => {

  let wrapper;

  beforeEach(() => {
    const onSelectRecordingHandler = jest.fn();

    wrapper = render(
      <RecordingList
        recordings= {[]}
        selectedRecording= {null}
        storeStatus= {stateStatus.FAILED}
        onSelectRecordingHandler= {onSelectRecordingHandler}
      />
    );
  });
  
  test("should render the RecordingList component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders without crashing showing error message', () => {
    expect(wrapper.container.querySelector(".default-phrase-recording-list")).toBeInTheDocument();
    expect(screen.getByText("- An error retrieving data has ocurred -")).toBeInTheDocument();
  });
})

describe('Testing RecordingList component when store status is success without recordings', () => {

  let wrapper;

  beforeEach(() => {
    const onSelectRecordingHandler = jest.fn();

    wrapper = render(
      <RecordingList
        recordings= {[]}
        selectedRecording= {null}
        storeStatus= {stateStatus.SUCCESS}
        onSelectRecordingHandler= {onSelectRecordingHandler}
      />
    );
  });
  
  test("should render the RecordingList component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders without crashing the default message', () => {
    expect(wrapper.container.querySelector(".default-phrase-recording-list")).toBeInTheDocument();
    expect(screen.getByText("- There are not recordings -")).toBeInTheDocument();
  });
})

describe('Testing RecordingList component when store status is success with recordings', () => {

  let wrapper;
  const recordings = createMockRecordingList(),
    selectedRecording = recordings[0];

  beforeEach(() => {
    const onSelectRecordingHandler = jest.fn();

    wrapper = render(
      <RecordingList
        recordings= {recordings}
        selectedRecording= {selectedRecording}
        storeStatus= {stateStatus.SUCCESS}
        onSelectRecordingHandler= {onSelectRecordingHandler}
      />
    );
  });
  
  test("should render the RecordingList component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders the recording list instead the default phrase', () => {
    expect(screen.queryByText(selectedRecording.name)).toBeInTheDocument();
    expect(wrapper.container.querySelector(".default-phrase-recording-list")).toBeNull();
  });

  test('renders the recording list without crashing', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(10);
  });

  test('renders the selected recording with indicator icon', () => {
    expect(wrapper.container.querySelector(".indicator-icon")).toBeInTheDocument();
    expect(wrapper.container.querySelector(".selected-recording")).toBeInTheDocument();
  });
})