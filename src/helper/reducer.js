import {ResponseActionTypes} from "./action.type";

export const initialState = {
    countries: [],
    isLoading: false,
    error: ''
};

export const countriesReducer = (state, action) => {

    switch (action.type) {
        case ResponseActionTypes.started:
            return {...state, isLoading: true};
        case ResponseActionTypes.success:
            return {...state, countries: action.payload, isLoading: false};
        case ResponseActionTypes.failure:
            return {...state, error: action.payload, isLoading: false};
        default:
            return initialState;
    }
};