import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureStore from 'redux-mock-store';

import Calculator from '../Calculator';


configure({adapter: new Adapter()});

const mockStore = configureStore();

describe('renders component correctly', () => {
    let wrapper;

    beforeEach(() => {
        const store = mockStore({
            calcData: {
                waitingForNextOperand: false,
                display: undefined,
                userInput: '',
            },
        });

        wrapper = shallow(<Calculator store={store}/>).dive();
    });

    it('renders main Calculator component', () => {
        let mainCalcDiv = wrapper.find('[data-cmp="calculator-cmp"]');
        expect(mainCalcDiv.length).toBe(1);
    });

    it('renders display section', () => {
        let mainCalcDiv = wrapper.find('[data-cmp="calculator-cmp-display"]');
        expect(mainCalcDiv.length).toBe(1);
    });

    it('renders 10 number keys and clear button', () => {
        const numberKeys = wrapper.find('div.numberPad').find('CalculatorKey');
        expect(numberKeys.length).toBe(11);

    });

    it('renders 4 operator keys and equate key', () => {
        const operatorKeys = wrapper.find('div.operatorPad').find('CalculatorKey');
        expect(operatorKeys.length).toBe(5);
    });

});

describe('props are mapped correctly', () => {
    let wrapper;

    beforeEach(() => {
        const store = mockStore({
            calcData: {
                waitingForNextOperand: true,
                display: 32,
                userInput: '32+',
            },
        });

        wrapper = shallow(<Calculator store={store}/>);
    });

    it('should display user inputs', () => {
        // test that the state values were correctly passed as props
        expect(wrapper.props().display).toBe(32);
    });

    it('number key action prop should contain function to update operand', () => {
        const numberKeys = wrapper.dive().find('div.numberPad').find('CalculatorKey');
        const firstNumberKey = numberKeys.at(0);
        expect(firstNumberKey.props().value).toEqual('0');
        expect(firstNumberKey.props().action).toBeInstanceOf(Function);
    });

    it('operator key action prop should contain function to update operator', () => {
        const operatorKeys = wrapper.dive().find('div.operatorPad').find('CalculatorKey');
        const firstOperatorKey = operatorKeys.at(0);
        expect(firstOperatorKey.props().value).toEqual('+');
        expect(firstOperatorKey.props().action).toBeInstanceOf(Function);
    });

    it('equate key action prop should contain function to calculate result', () => {
        const equateKey = wrapper.dive().find('div.operatorPad').find(`CalculatorKey[value="="]`);
        expect(equateKey.props().value).toEqual('=');
        expect(equateKey.props().action).toBeInstanceOf(Function);
    });

    it('clear key action prop should contain function to clear user input', () => {
        const equateKey = wrapper.dive().find('div.numberPad').find(`CalculatorKey[value="C"]`);
        expect(equateKey.props().value).toEqual('C');
        expect(equateKey.props().action).toBeInstanceOf(Function);
    });

});

