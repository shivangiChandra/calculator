import {calcData} from '../calcData';
import * as ActionTypes from '../../actions/index';

const defaultState = {
    waitingForNextOperand: false,
    lastExpression: '',
    display: undefined,
    userInput: '',
    resultCalculated: false,
};

describe('test calcData states for different scenarios', () => {

        it('returns default state correctly when no action is passed', () => {
            const resultState = calcData(defaultState, {});
            expect(resultState).toEqual(defaultState);
        });


        it('updates userInput,lastExpression and display when UPDATE_OPERAND called', () => {
            let initialState = {...defaultState, userInput: '32', display: 32, lastExpression: '32'};
            const resultState = calcData(initialState, {type: ActionTypes.UPDATE_OPERAND, payload: 3});
            expect(resultState.userInput).toBe('323');
            expect(resultState.lastExpression).toBe('323');
            expect(resultState.display).toBe(323);
        });

        it('If waitingForNextOperand is true updates userInput,lastExpression and display when UPDATE_OPERAND called', () => {
            let initialState = {
                ...defaultState,
                userInput: '32+',
                display: 32,
                lastExpression: '+',
                waitingForNextOperand: true,
            };
            const resultState = calcData(initialState, {type: ActionTypes.UPDATE_OPERAND, payload: 3});
            expect(resultState.userInput).toBe('32+3');
            expect(resultState.lastExpression).toBe('+3');
            expect(resultState.display).toBe(3);
        });

        it('updates userInput, lastExpression and not display when UPDATE_OPERATOR is called', () => {
            let initialState = {...defaultState, userInput: '32', display: 32};
            const resultState = calcData(initialState, {type: ActionTypes.UPDATE_OPERATOR, payload: '-'});
            expect(resultState.userInput).toBe('32-');
            expect(resultState.lastExpression).toBe('-');
            expect(resultState.display).toBe(32);
        });

        it('displays correct result when CALCULATE RESULT called after sequence of number and operator inputs', () => {
            let initialState = {...defaultState, userInput: '43+32/5-8', lastExpression: '-8'};
            const resultState = calcData(initialState, {type: ActionTypes.CALCULATE_RESULT});
            expect(resultState.display).toBe(41.4);
            expect(resultState.resultCalculated).toBe(true);

        });

        it('If no number is entered after second operator then display is used as second operand', () => {
            let initialState = {
                ...defaultState,
                userInput: '32-',
                display: 32,
                waitingForNextOperand: true,
                lastExpression: '-',
            };
            const resultState = calcData(initialState, {type: ActionTypes.CALCULATE_RESULT});
            expect(resultState.display).toBe(0);
            expect(resultState.lastExpression).toBe('-32');
            expect(resultState.resultCalculated).toBe(true);
        });

        it('If CALCULATE_RESULT is called without entering operator then lastExpression value is used for second operand', () => {
            let initialState = {
                ...defaultState,
                userInput: '32',
                display: 32,
                waitingForNextOperand: true,
                lastExpression: '-2',
            };
            const resultState = calcData(initialState, {type: ActionTypes.CALCULATE_RESULT});
            expect(resultState.display).toBe(30);
            expect(resultState.resultCalculated).toBe(true);
            expect(resultState.lastExpression).toBe('-2');
        });

        it('does not break when number is divided by 0', () => {
            let initialState = {
                ...defaultState,
                userInput: '4/0',
                display: 4,
                waitingForNextOperand: false,
                lastExpression: '/0',
            };
            const resultState = calcData(initialState, {type: ActionTypes.CALCULATE_RESULT});
            expect(resultState.display).toEqual(Infinity);
        });


        it('when more than one expressions are calculated results are not affected results', () => {

            // calculate 3+2 and display should show 5
            // then calculate 8*7 display should show 56

            let initialState = {...defaultState, userInput: '3+2', display: undefined, waitingForNextOperand: false, lastExpression:'+2'};
            const resultState = calcData(initialState, {type: ActionTypes.CALCULATE_RESULT});
            expect(resultState.display).toEqual(5);

            const nextState = calcData(resultState, {type: ActionTypes.UPDATE_OPERAND, payload: 8});

            const nextState2 = calcData(nextState, {type: ActionTypes.UPDATE_OPERATOR, payload: '*'});

            const nextState3 = calcData(nextState2, {type: ActionTypes.UPDATE_OPERAND, payload: 7});


            const result2 = calcData(nextState3, {type: ActionTypes.CALCULATE_RESULT});

            expect(result2.display).toEqual(56);

        });


        it('clears user input when CLEAR action called', () => {
            let initialState = {
                ...defaultState,
                userInput: '32+',
                display: 32,
                waitingForNextOperand: true,
                lastExpression: '+',
            };
            const resultState = calcData(initialState, {type: ActionTypes.CLEAR});
            expect(resultState).toEqual(defaultState);

        });

    },
);
