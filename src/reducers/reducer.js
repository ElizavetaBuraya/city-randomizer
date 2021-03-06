import {actionTypes} from '../actions/actionTypes';

const initialState = {
  history: [],
  pairs: [],
  canGenerate: true,
  height: 1,
  isFetching: false
};

export default function renderApp(state = initialState, action) {
    switch(action.type){
        case actionTypes.REQUEST_DATA:
            return {...state, isFetching: true};
        case actionTypes.UPDATE_HISTORY:
            return {...state, history: action.payload};
        case actionTypes.GENERATE_PAIRS:
            return {...state, pairs: action.payload, isFetching: false};
        case actionTypes.UPDATE_TEXT_AREA_HEIGHT:
            return {...state, height: action.payload};
        case actionTypes.TOGGLE_CAN_GENERATE:
            return {...state, canGenerate: action.payload};
        default:
            return state
    }
}