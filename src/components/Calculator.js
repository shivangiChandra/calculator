import React, {Component} from 'react';
import CalculatorKey from './CalculatorKey';
import {connect} from 'react-redux';

import {calculateResult, clearUserInput, registerOperand, registerOperator} from './../actions/operator';

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.createCalculatorNumberPad = this.createCalculatorNumberPad.bind(this);
        this.createOperatorPad = this.createOperatorPad.bind(this);
    }

    createCalculatorNumberPad() {
        let numberPad = [];
        for (let i = 0; i < 10; i++) {
            numberPad.push(<CalculatorKey key={`number_${i}`} value={`${i}`} action={this.props.registerOperand}/>);
        }

        return numberPad;
    }

    createOperatorPad() {
        let operatorPad = [];
        operatorPad.push(<CalculatorKey key={`operator_add`} value="+" action={this.props.registerOperator}/>);
        operatorPad.push(<CalculatorKey key={`operator_minus`} value="-" action={this.props.registerOperator}/>);
        operatorPad.push(<CalculatorKey key={`operator_divide`} value="/" action={this.props.registerOperator}/>);
        operatorPad.push(<CalculatorKey key={`operator_multiply`} value="*"
                                        action={this.props.registerOperator}/>);
        operatorPad.push(<CalculatorKey key={`equate`} value="=" action={this.props.calculateResult}/>);

        return operatorPad;
    }

    render() {
        return (
            <div data-cmp='calculator-cmp' className="mainCmp">
                <section data-cmp='calculator-cmp-display' className="row display">{this.props.display}</section>
                <section data-cmp='calculator-cmp-keys'>
                    <div className="numberPad">
                        {this.createCalculatorNumberPad()}
                        <CalculatorKey key={`clear`} value={'C'} action={this.props.clearUserInput}/>
                    </div>
                    <div className="operatorPad">{this.createOperatorPad()}</div>
                </section>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.calcData.display,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerOperator: (payload) => dispatch(registerOperator(payload)),
        registerOperand: (payload) => dispatch(registerOperand(payload)),
        clearUserInput: () => dispatch(clearUserInput()),
        calculateResult: () => dispatch(calculateResult()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
