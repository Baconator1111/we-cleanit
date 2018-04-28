import { createStore, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './ducks/reducer';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

let store = createStore( reducer, persistedState, composeWithDevTools(applyMiddleware(reduxPromiseMiddleware())));

export default store;

store.subscribe(() => {
  saveState({
    storiesArray: store.getState().storiesArray,
    currentStoryOrig: store.getState().currentStoryOrig,
    currentEventOrig: store.getState().currentEventOrig,
    currentStory: store.getState().currentStory,
    currentEvent: store.getState().currentEvent,
    currentEventIndex: store.getState().currentEventIndex,
    importedMedia: store.getState().importedMedia,
    user: store.getState().user
  });
});