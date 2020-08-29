import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const preloadedState = {};
const middleware = [thunk];

export default createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
);
