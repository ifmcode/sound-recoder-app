import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; // thunk middleware allows us to use asynchronous calls
import {soundRecordingReducer} from '../state/reducer';

// This makes it possible to handle more than one reducer
const rootReducer = combineReducers({
  soundRecordingReducer,
});

// It's using redux browser extension to watch store state in real time
const composeEhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  store = createStore(rootReducer, composeEhancers(applyMiddleware(thunk)));

export default store;
