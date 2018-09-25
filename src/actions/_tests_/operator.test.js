import * as OperatorFunctions from '../operator';
import configureStore from 'redux-mock-store';
import * as ActionTypes from '../index';

const mockStore = configureStore();

describe('test operator functions dispatch updates states correctly', () => {
    let store;

    beforeEach(() => {
        const initialState = {};
        store = mockStore(initialState);
    });

    it('updates state when UPDATE_OPERATOR called', () => {
        store.dispatch(OperatorFunctions.registerOperator('+'));
        expect(store.getActions()).toEqual([{type: ActionTypes.UPDATE_OPERATOR, payload: '+'}]);
    });

    it('updates state when UPDATE_OPERATOR called', () => {
        store.dispatch(OperatorFunctions.registerOperand('5'));
        expect(store.getActions()).toEqual([{type: ActionTypes.UPDATE_OPERAND, payload: '5'}]);
    });


    it('updates state when UPDATE_OPERATOR called', () => {
        store.dispatch(OperatorFunctions.clearUserInput());
        expect(store.getActions()).toEqual([{type: ActionTypes.CLEAR}]);
    });

    it('updates state when UPDATE_OPERATOR called', () => {
        store.dispatch(OperatorFunctions.calculateResult());
        expect(store.getActions()).toEqual([{type: ActionTypes.CALCULATE_RESULT}]);
    });
});







