import { alertActions } from './';
import { history } from '../helpers';
import { authService } from '../services';
import { userConstants } from '../constants';

export const userActions = {
    login,
    logout,
};

function login(username, password, from): any {
    return dispatch => {
        dispatch(request({ username }));

        authService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                    document.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: userConstants.LOGOUT };
}