import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {create} from "react-test-renderer";
import {Marker} from 'react-leaflet';
import SearchComponent from '../src/components/Atlas/SearchComponent';
import { latLng } from 'leaflet';



describe('SearchComponent', () => {
    const createSnackBar = jest.fn();
    let SearchComponentWrapper;
    let mockLocations=jest.fn();
    let mockHandleSetLimit=jest.fn();
    let mockFindLimit=jest.fn();
    let mockFindPlaces=jest.fn();
    let mockAddLocation=jest.fn();
    let mockSetCoordinates=jest.fn();

    beforeEach(() => {
        SearchComponentWrapper = shallow(
            <SearchComponent 
                createSnackBar={createSnackBar} 
                locations={mockLocations} 
                findLimit={mockFindLimit} 
                handleSetLimit={mockHandleSetLimit}
                findPlaces={mockFindPlaces}
                addLocation={mockAddLocation}
                setCoordinates={mockSetCoordinates}
            />
        );
    });

    it('Tests Correctly', () => {
        expect(SearchComponentWrapper.exists()).toBe(true);

    });

    it('find input exists', () => {
            expect(SearchComponentWrapper.find({ id: 'find-input' }).length).toEqual(1);
        });
    
    it('find input value updates findString state', () => {
        expect(SearchComponentWrapper.state().findString).toEqual("");

        const inputField = SearchComponentWrapper.find({ id: 'find-input' }); 
        inputField.simulate('change', { target: { value: "Panthers" } });
        SearchComponentWrapper.update();

        expect(SearchComponentWrapper.state().findString).toEqual("Panthers");
    });
    
    it('setLimit function calls handleSetLimit in Atlas', () => {
        SearchComponentWrapper.instance().setLimit(10);
        expect(mockHandleSetLimit).toHaveBeenCalled();
    });

    it('dropdown selected works', () =>{
        SearchComponentWrapper.find('DropdownItem').at(0).simulate('click');
        expect(mockHandleSetLimit).toHaveBeenCalled();
        SearchComponentWrapper.find('DropdownItem').at(1).simulate('click');
        expect(mockHandleSetLimit).toHaveBeenCalled();
        SearchComponentWrapper.find('DropdownItem').at(2).simulate('click');
        expect(mockHandleSetLimit).toHaveBeenCalled();
        SearchComponentWrapper.find('DropdownItem').at(3).simulate('click');
        expect(mockHandleSetLimit).toHaveBeenCalled();
        SearchComponentWrapper.find('DropdownItem').at(4).simulate('click');
        expect(mockHandleSetLimit).toHaveBeenCalled();
    });

    it('renderSubmitButton for coordinates works', () => {
        SearchComponentWrapper.find('#submitButtonFindPlaces').simulate('click');
        expect(mockFindPlaces).toHaveBeenCalled();
    });

    it('verifyCoordinates but validcoodinates is null', () => {
        SearchComponentWrapper.setState({coordinates: {latLong: null}});
        SearchComponentWrapper.instance().verifyCoordinates();
        expect(SearchComponentWrapper.state().coordinates.valid).toEqual(false);
    });
        
    it('verifyCoordinates but validcoodinates is not null', () => {
        SearchComponentWrapper.setState({coordinates: {latLong: {"lat": 42, "lng": -105}}});
        SearchComponentWrapper.instance().verifyCoordinates();
        expect(SearchComponentWrapper.state().coordinates.valid).toEqual(true);
        expect(mockAddLocation).toHaveBeenCalled();
        //expect(mockSetCoordinates).toHaveBeenCalled();
    });

    it('toggle', () => {
        SearchComponentWrapper.instance().toggle();
        expect(SearchComponentWrapper.state().dropdownOpen).toEqual(true);
        SearchComponentWrapper.instance().toggle();
        expect(SearchComponentWrapper.state().dropdownOpen).toEqual(false);
    });

    it('getCoordinatesOrNull fails', () => {
        expect(SearchComponentWrapper.instance().getCoordinatesOrNull(null)).toBe(null);
    });
});