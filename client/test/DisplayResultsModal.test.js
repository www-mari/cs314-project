import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import DisplayResultsModal from '../src/components/Atlas/DisplayResultsModal';
import {Button, Modal} from 'reactstrap';

describe('DisplayResultsModal', () => {
    const createSnackBar = jest.fn();
    let DisplayResultsModalWrapper;
    let buildAddress = jest.fn();
    beforeEach(() => {
        DisplayResultsModalWrapper = shallow(<DisplayResultsModal createSnackBar={createSnackBar} buildAddress={buildAddress}/>);
    });

    it('Displays Correctly', () => {
        expect(DisplayResultsModalWrapper.exists()).toBe(true);
    });

    it('Display Open no places', () => {
        let isOpen = true;
        let places = [];
        DisplayResultsModalWrapper = shallow(<DisplayResultsModal 
            createSnackBar={createSnackBar} 
            buildAddress={buildAddress} isOpen={isOpen} places={places}/>);
        expect(DisplayResultsModalWrapper.find(Modal).length).toEqual(1);
    });

    it('Display Open one place', () => {
        let isOpen = true;
        let mapClickInfo = {
            "name": "Test",
            "latitude": 0,
            "longitude": 0
        }
        let places = [mapClickInfo];
        DisplayResultsModalWrapper = shallow(<DisplayResultsModal 
            createSnackBar={createSnackBar} 
            buildAddress={buildAddress} isOpen={isOpen} places={places}/>);
        expect(DisplayResultsModalWrapper.find("tr").length).toEqual(2);
    });

    it('Click button calls addLocation', () => {
        let isOpen = true;
        let mapClickInfo = {
            "name": "Test",
            "latitude": 0,
            "longitude": 0
        }
        let places = [mapClickInfo];
        let addLocation = jest.fn();
        DisplayResultsModalWrapper = shallow(<DisplayResultsModal 
            createSnackBar={createSnackBar} 
            buildAddress={buildAddress} isOpen={isOpen} places={places}
            addLocation={addLocation}/>);

        DisplayResultsModalWrapper.find('#addLocationButton').at(0).simulate('click');
        expect(addLocation).toHaveBeenCalled();
    });

    it('createFilterTermsRow Functions Works', () =>{
        DisplayResultsModalWrapper.instance().createFilterTermsRow("Marocco"); 
    });

    it('renderClearFiltersButton Functions Works', () =>{
        DisplayResultsModalWrapper.state().filtered=true; 
        DisplayResultsModalWrapper.instance().renderClearFiltersButton(); 
        expect(DisplayResultsModalWrapper.state().filtered).toEqual(true);
    });

    it('clearFilters Functions Works', () =>{
        DisplayResultsModalWrapper.state().filtered=true; 
        DisplayResultsModalWrapper.instance().clearFilters(); 
        expect(DisplayResultsModalWrapper.state().filtered).toEqual(false);
    });

    it('renderPlaces with filtered= true Works', () =>{

        let isOpen = true;
        let mapClickInfo = {
            "name": "Test",
            "latitude": 0,
            "longitude": 0
        }
        let places = [mapClickInfo];
        let addLocation = jest.fn();
        DisplayResultsModalWrapper = shallow(<DisplayResultsModal 
            createSnackBar={createSnackBar} 
            buildAddress={buildAddress} isOpen={isOpen} places={places}
            addLocation={addLocation}/>);

        DisplayResultsModalWrapper.state().filtered=true; 
        DisplayResultsModalWrapper.instance().renderPlaces(); 
        DisplayResultsModalWrapper.find('#addLocationButton').at(0).simulate('click');
        expect(addLocation).toHaveBeenCalled();
    });

    it('setFilterResultsInputString Functions Works', () =>{
        let onChangeEvent={
            target: {value: "Morocco"}
        };
        DisplayResultsModalWrapper.instance().setFilterResultsInputString(onChangeEvent); 
        expect(DisplayResultsModalWrapper.state().filterResultsInputString).toEqual("Morocco");
    });

    it('filterResults Functions Works with filtered true', () =>{
        DisplayResultsModalWrapper.state().filtered=true; 
        DisplayResultsModalWrapper.instance().filterResults("Morocco"); 
    });

});
