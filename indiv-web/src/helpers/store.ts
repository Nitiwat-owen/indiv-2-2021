import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '../reducers';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);