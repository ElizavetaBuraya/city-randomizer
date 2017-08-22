import {actionTypes} from './actionTypes';

export function fetchData() {
    return (dispatch) => {
        const url = 'https://gp-js-test.herokuapp.com/api';
        dispatch(requestData());
        fetch(url)
            .then((response) => {
                return response.json()})
            .then((json) => {
                let generatedPairsList = [];

                json.adjectives.forEach((adjective) => {
                    json.cities.forEach((city) => generatedPairsList.push(adjective + " " + city))
                });

                dispatch(generatePairs(generatedPairsList));
            });
    }
}

export function requestData() {
    return {
        type: actionTypes.REQUEST_DATA,
        isFetching: true
    }
}

export function updateHistory(history){
    return {
        type: actionTypes.UPDATE_HISTORY,
        payload: history
    };
}

export function generatePairs(pairs){
    return {
        type: actionTypes.GENERATE_PAIRS,
        isFetching:false,
        payload: pairs
    };
}

export function updateTextAreaHeight(height){
    return {
        type: actionTypes.UPDATE_TEXT_AREA_HEIGHT,
        payload: height
    };
}

export function toggleCanGenerate(canGenerate){
    return {
        type: actionTypes.TOGGLE_CAN_GENERATE,
        payload: canGenerate
    };
}