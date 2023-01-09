import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { alert } from './alert.reducer';

export const rootReducer = combineReducers({
    authentication,
    alert
});