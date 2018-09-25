import React from 'react';
import PropTypes from 'prop-types';

const CalculatorKey = (props) => <div className="key" onClick={() => {
    props.action(props.value);
}}>{props.value}</div>;

CalculatorKey.propTypes = {
    value: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
};

export default CalculatorKey;
