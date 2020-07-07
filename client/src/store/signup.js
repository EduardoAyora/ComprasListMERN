import * as ActionTypes from './ActionTypes';

export const SignUp = (state = {
        message: '',
        isLoading: false,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state,
                isLoading: false,
                errMess: '',
                message: action.status
            };
        case ActionTypes.SIGNUP_FAILURE:
            return {...state,
                isLoading: false,
                message: '',
                errMess: action.message
            };
        case ActionTypes.SIGNUP_CLEAR:
            return {...state,
                isLoading: false,
                message: '',
                errMess: ''
            };
        default:
            return state
    }
}
