import React from 'react';

import App from '../App';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('renders main component with default state', () => {

    let wrapper = undefined;

    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('renders without crashing', () => {
        const mainDivComp = wrapper.find('[data-cmp="app-cmp"]');
        expect(mainDivComp.length).toBe(1);
    });

    it('renders header', () => {
        const headerCmp = wrapper.find('[data-cmp="app-cmp"]').find('Header');
        expect(headerCmp.length).toBe(1);
    });

    it('renders Calculator', () => {
        const calculatorCmp = wrapper.find('[data-cmp="app-cmp"]').find('Connect(Calculator)');
        expect(calculatorCmp.length).toBe(1);
    });


});
