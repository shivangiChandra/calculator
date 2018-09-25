import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Header from '../Header';

configure({adapter: new Adapter()});

describe('Header components rendered', () => {

    let wrapper = undefined;

    beforeEach(() => {
        wrapper = shallow(<Header/>);
    });

    it('test main header is rendered', () => {
        const mainHeaderCmp = wrapper.find('[data-cmp="header-cmp"]');
        expect(mainHeaderCmp.length).toBe(1);
    });

    it('test logo is rendered', () => {
        const logoCmp = wrapper.find('img[data-cmp="header-logo"]');
        expect(logoCmp.length).toBe(1);
    });

    it('test logo is rendered with src and alt property', () => {
        const logoCmp = wrapper.find('img[data-cmp="header-logo"]');

        const logoProps = logoCmp.props();

        expect(logoProps.src).toMatch('logo.svg');
        expect(logoProps.alt).toMatch('[=] Equal Experts');

    });

});
