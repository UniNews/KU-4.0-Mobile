import * as types from './actionTypes';

const initialState = {
    loading: false,
    news: null,
    error: false,
    query: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                news: null,
                query: action.payload
            };
        case types.SEARCH_OK:
            return {
                ...state,
                loading: false,
                error: false,
                news: action.payload,
            };
        case types.SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                news: null,
                error: true,
            };
        case types.SEARCH_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;