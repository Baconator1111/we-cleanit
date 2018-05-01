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
    clientType: store.getState().clientType,
    contactInfo: store.getState().contactInfo,
    floorSectionsCarpet: store.getState().floorSectionsCarpet,
    floorSectionsGrout: store.getState().floorSectionsGrout,
    upholstery: store.getState().upholstery,
    otherServices: store.getState().otherServices,
    frequency: store.getState().frequency
  });
});