import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import Page from '../src/components/Page';
import {Button, Modal} from 'reactstrap';

describe('Page', () => {
    const createSnackBar = jest.fn();
    let PageWrapper;
    let showMessage= jest.fn(); 

    beforeEach(() => {
        PageWrapper = shallow(<Page createSnackBar={createSnackBar} showMessage={showMessage} />);
    });

    it('Displays Correctly', () => {
        expect(PageWrapper.exists()).toBe(true);
    });

    it('ToggleAbout Works', () => {
        expect(PageWrapper.state().showAbout).toEqual(false);
        PageWrapper.instance().toggleAbout(); 
        expect(PageWrapper.state().showAbout).toEqual(true);
        PageWrapper.instance().toggleAbout(); 
        expect(PageWrapper.state().showAbout).toEqual(false);
    });

    it('Proccess Response with a bad response', () => {
        PageWrapper.instance().processResponse("help"); 
        expect(showMessage).toHaveBeenCalled();
    });



}); 