import * as ActionTypes from './index';

export function registerOperator(payload) {
    return {type: ActionTypes.UPDATE_OPERATOR, payload};
}

export function registerOperand(payload) {
    return {type: ActionTypes.UPDATE_OPERAND, payload};
}

export function clearUserInput() {
    return {type: ActionTypes.CLEAR};
}

export function calculateResult() {
    return {type: ActionTypes.CALCULATE_RESULT};
}
