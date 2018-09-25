import * as ActionTypes from './../actions';

/*
* waitingForNextOperand: indicator that an operator is button is pressed and calculator is waiting for next operand number,
* lastExpression: tracks what was last operator and following operand; useful when user hasn't entered last operand of the expression
* display : value to be printed in calculator display
* userInput: sequence of user inputs
* resultCalculated: indicator that result has been calculated, therefore if  anew operator or operand key is pressed then that is a new calculation
* */

const defaultState = {
    waitingForNextOperand: false,
    lastExpression: '',
    display: undefined,
    userInput: '',
    resultCalculated: false,
};

export const calcData = (initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_OPERATOR: {
            const {waitingForNextOperand, userInput} = initialState;
            if (!waitingForNextOperand && userInput !== '') {
                return {
                    ...initialState,
                    waitingForNextOperand: true,
                    userInput: `${userInput}${action.payload}`,
                    lastExpression: action.payload,
                    resultCalculated: false,
                };
            }
            else {
                return {
                    ...initialState,
                };
            }
        }
        case ActionTypes.UPDATE_OPERAND: {
            const {display, waitingForNextOperand, userInput, lastExpression, resultCalculated} = initialState;
            let checkedUserInput;
            let checkedLastExpression;
            if (resultCalculated) {
                checkedUserInput = '';
                checkedLastExpression = '';
            } else {
                checkedUserInput = `${userInput}`;
                checkedLastExpression = `${lastExpression}`;
            }
            let newOperand = (checkedUserInput === '' || waitingForNextOperand) ? action.payload : parseInt(display + '' + action.payload);
            if (!waitingForNextOperand) {
                return {
                    ...initialState,
                    display: newOperand,
                    userInput: `${checkedUserInput}${action.payload}`,
                    lastExpression: `${checkedLastExpression}${action.payload}`,
                    resultCalculated: false,
                };
            } else {
                return {
                    ...initialState,
                    display: newOperand,
                    userInput: `${checkedUserInput}${action.payload}`,
                    lastExpression: `${checkedLastExpression}${action.payload}`,
                    waitingForNextOperand: false,
                    resultCalculated: false,
                };
            }
        }


        case ActionTypes.CALCULATE_RESULT: {
            const {userInput, waitingForNextOperand, display, lastExpression, resultCalculated} = initialState;
            if (waitingForNextOperand && lastExpression.length === 1) {

                const expr = `${lastExpression}${display}`;
                const userInputForEval = `${userInput}${display}`;

                const newResult = eval(userInputForEval);
                return {
                    ...initialState,
                    display: newResult,
                    userInput: newResult,
                    lastExpression: expr,
                    resultCalculated: true,
                };
            } else if (waitingForNextOperand || resultCalculated) {
                const userInputForEval = `${userInput}${lastExpression}`;

                const newResult = eval(userInputForEval);
                return {
                    ...initialState,
                    display: newResult,
                    userInput: newResult,
                    resultCalculated: true,
                };
            }
            const newResult = eval(userInput);
            return {
                ...initialState,
                display: newResult,
                userInput: newResult,
                resultCalculated: true,
            };
        }


        case ActionTypes.CLEAR: {
            return defaultState;
        }
        default:
            return defaultState;
    }
};
