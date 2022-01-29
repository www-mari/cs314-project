import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {create} from "react-test-renderer";
import {Marker} from 'react-leaflet';
import SaveLoadComponent from '../src/components/Atlas/SaveLoadComponent';



describe('SaveLoadComponent', () => {
    const createSnackBar = jest.fn();
    let SaveLoadComponentWrapper;

    beforeEach(() => {
        SaveLoadComponentWrapper = shallow(<SaveLoadComponent createSnackBar={createSnackBar}/>);
    });

    it('Tests Correctly', () => {
        expect(SaveLoadComponentWrapper).toBeDefined();
    });

    it('Default SaveModalOpen is false', () => {
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(false);
    });

    it('Function hideSaveModal works', () => {
        SaveLoadComponentWrapper.state().SaveModalOpen=true; 
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(true);
        SaveLoadComponentWrapper.instance().hideSaveModal(); 
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(false);
    });

    it('Function saveTrip works', () => {
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(false);
        SaveLoadComponentWrapper.instance().saveTrip(); 
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(true);
    });

    it('Function saveTrip works', () => {
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(false);
        SaveLoadComponentWrapper.instance().saveTrip(); 
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(true);
        SaveLoadComponentWrapper.instance().hideSaveModal(); 
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(false);
    });

    it('Save Button Works', () =>{
        SaveLoadComponentWrapper.find('#saveButton').at(0).simulate('click');
        expect(SaveLoadComponentWrapper.state().SaveModalOpen).toEqual(true);
    });

    //Load Button isn't tested right now as it doesn't do anything yet...


});
