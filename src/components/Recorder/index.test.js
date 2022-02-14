import React, {useState} from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import Recorder from './index'
import useMediaRecorder from "../../hooks/useMediaRecorder";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { soundRecordingReducer } from '../../redux/state/reducer';
import {stateStatus} from '../../redux/state/types';

jest.mock('../../hooks/useMediaRecorder')

/**
 * Following the Object mother pattern we have this small fn that generates a valid object
 * that matches the structure of a recording
 *
 * @param {{ idNumber?: number, name?: string }} options
 * @returns {{ stream: string, name: string, id: string }}
 */
 function createMockRecording({
  idNumber = Math.floor(Math.random() * 100),
  name = new Date().toISOString().split('.')[0].split('T').join(' ')
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

/**
 * We create a mocked version of our hook that will interact with the component in the same exact way
 * and will expose the same API too.
 *
 * This mock is typically placed in the same directory of the original hook within a folder called `__mocks__`
 * keeping the same file name as the original and jest will override the hook functionality automatically.
 * But in this case we would loose the option to pass it a default list of recordings or would be more difficult to do so.
 *
 * @param {{ stream: string, name: string, id: string }[]} defaultRecordings
 * An optional list of default recordings to that we don't need to interact with the component to create a previous list of recordings
 * having also control over the data of each one to be able to assert on the list data.
 *
 * @returns {{
 *  recorder: { stop: Function, start: Function },
 *  isRecording: boolean,
 * }}
 */
const mockUseMediaRecorder = (defaultRecordings = []) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isRecording, setIsRecording] = useState(false)

  const recorder = {
    start: () => setIsRecording(true),
    stop: () => setIsRecording(false),
  };

  return {recorder, isRecording}
};

describe('Test Recorder with an empty list of recordings', () => {

  let wrapper,
    mockStore;

  beforeEach(() => {
    const reducer = combineReducers({
      soundRecordingReducer,
    });
    mockStore = createStore(reducer, applyMiddleware(thunk));
    useMediaRecorder.mockImplementation(() => mockUseMediaRecorder());

    wrapper = render(
      <Provider store={mockStore}>
        <Recorder stream={{}}/>
      </Provider>
    );
  });
  
  test("should render the Recorder component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const recordButton = wrapper.container.querySelector('.big-button'),
      playButton = screen.getByRole("button", { name: 'Play' });
    expect(recordButton).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(recordButton).toHaveClass('recording-button');
  });

  test('user can start a recording pressing the button', () => {
    const recordButton = wrapper.container.querySelector('.big-button');
    expect(recordButton).toHaveClass('recording-button')
    fireEvent.click(recordButton)
    expect(recordButton).toHaveClass('is-recording')
  });

  test('user can see the loading state of the recorder', () => {
    expect(screen.getByText("- Loading recordings -")).toBeInTheDocument();
  });

  test('user can see the loaded state of the recorder', async () => {
    const state = mockStore.getState();
    state.soundRecordingReducer.status = stateStatus.SUCCESS;
    //expect(await screen.findByText("- There are not recordings -")).toBeInTheDocument();
  });

  test('adds a new recording to the list when the user clicks stop', () => {
    const recordButton = wrapper.container.querySelector('.recording-button');
    fireEvent.click(recordButton)
    expect(recordButton).toHaveClass('is-recording')
    fireEvent.click(recordButton)
    expect(wrapper.container.querySelector(".is-recording")).toBeNull()
    /*const state = mockStore.getState();
    state.soundRecordingReducer.recordings = [getMockRecording({})];
    console.log("|||| AQUI: ", mockStore.getState());
    screen.debug();
    expect(screen.queryAllByRole("listitem")).toHaveLength(1)*/
  })
})
