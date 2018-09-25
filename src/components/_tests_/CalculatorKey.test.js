import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalculatorKey from './../CalculatorKey';

configure({adapter: new Adapter()});

describe('renders main component with default state', () => {

    let wrapper = undefined;
    let actionCalled = false;
    beforeEach(() => {

        const action = jest.fn(()=>{actionCalled= true});
        const value = '3';

        wrapper = shallow(<CalculatorKey action={action} value={value}/>);
    });

    afterEach( () => {
        actionCalled = false;
    });

    it('renders key component wi', () => {
        const keyComp = wrapper.find('div.key');
        expect(keyComp.length).toBe(1);
        expect(keyComp.text()).toEqual("3");
    });

    it('calls action prop onClick', () => {
        const keyComp = wrapper.find('div.key');
        keyComp.simulate('click');
        expect(actionCalled).toEqual(true);
    });

});
