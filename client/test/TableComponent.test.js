import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import TableComponent from '../src/components/Atlas/TableComponent';



describe('TableComponent', () => {
    const createSnackBar = jest.fn();
    let TableComponentWrapper;
    let mockLocations=jest.fn(); 
    let mockRemoveRowandClear=jest.fn();

    beforeEach(() => {
        TableComponentWrapper = shallow(<TableComponent 
            createSnackBar={createSnackBar} 
            removeRowandClear={mockRemoveRowandClear} 
            locations={mockLocations} />);
            
    });

    it('Tests Correctly', () => {
        expect(TableComponentWrapper).toBeDefined();
    });

    it('clearLocationTable clears the location table', ()=>{
        TableComponentWrapper.instance().clearLocationTable();
        expect(mockRemoveRowandClear).toHaveBeenCalled();
    });

    it('Cumulative Distances with two locations', ()=>{
        let mockLocations=jest.fn();
        let distances=[2, 5, 2];
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} locations={mockLocations} distances= {distances} />);
        let actualCumulativeDistance= TableComponentWrapper.instance().getCumulativeDistance(3);
        expect(actualCumulativeDistance).toEqual(9);
    });

    it('Calling mark selected', ()=>{
        let mockLocations=jest.fn();
        let markerPositionAndDetails=jest.fn();
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} locations={mockLocations} markerPositionAndDetails= {markerPositionAndDetails} />);
        TableComponentWrapper.instance().markSelected(location);
        expect(markerPositionAndDetails).toHaveBeenCalled();
    });

    it('removeRow clears the location table', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}];
        let distances=[2, 5, 2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations} removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
        />);
        TableComponentWrapper.instance().removeRow(5);
        expect(mockRemoveRowandClear).toHaveBeenCalled();
    });

    it('removeRow clears the location table with 2 distances', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}];
        let distances=[2, 5];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations} removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
        />);
        TableComponentWrapper.instance().removeRow(5);
        expect(mockRemoveRowandClear).toHaveBeenCalled();
    });

    it('removeRow clears the location table with 1 distances', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations} removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
        />);
        TableComponentWrapper.instance().removeRow(5);
        expect(mockRemoveRowandClear).toHaveBeenCalled();
    });

    it('removeRow clears the location table with 2 locations and index 2', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations} removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
            markerPositionAndDetails= {markerPositionAndDetails}
        />);
        TableComponentWrapper.instance().removeRow(1);
        expect(mockRemoveRowandClear).toHaveBeenCalled();
    });

    it('toggle', () => {
        TableComponentWrapper.instance().toggle();
        expect(TableComponentWrapper.state().dropdownOpen).toEqual(true);
        TableComponentWrapper.instance().toggle();
        expect(TableComponentWrapper.state().dropdownOpen).toEqual(false);
    });

    it('dropdown Function works', () =>{
        TableComponentWrapper.instance().renderModifyTableDropdown();
    });

    it('optimizeTrip Function works', () =>{
        TableComponentWrapper.instance().optimizeTrip();
    });

    it('processTourResponse Function works', () =>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn();
        let mockAddLocation= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}  distances= {distances}
            addLocation={mockAddLocation}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected}
        />);

        let response = {"places":[{"latitude":39.484679,"longitude":-104.78278739999999}]};
       
        TableComponentWrapper.instance().processTourResponse(response);
        expect(mockAddLocation).toHaveBeenCalled(); 

    });

    it('Showselected button', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn(); 
        let MockMarkerPositionAndDetails=jest.fn();
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected} markerPositionAndDetails= {MockMarkerPositionAndDetails} 
        />);
        TableComponentWrapper.instance().createRow(mockLocations, 1);
        TableComponentWrapper.find('#ShowSelected').at(0).simulate('click');
    });

    it('RemoveRowButton button', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn(); 
        let MockMarkerPositionAndDetails=jest.fn();
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected} markerPositionAndDetails= {MockMarkerPositionAndDetails} 
        />);
        TableComponentWrapper.instance().createRow(mockLocations, 1);
        TableComponentWrapper.find('#RemoveRowButton').at(0).simulate('click');
    });

    it('createNotesModal works', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}];
        let distances=[2, 5, 2];

        TableComponentWrapper.instance().createNotesModal(mockLocations, 0);
    });

    it('hideNotesModal works', ()=>{
        TableComponentWrapper.instance().hideNotesModal(mockLocations, 0);
    });

    it('First chunk of drop downs- the renderModifyTableDropdown', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn(); 
        let MockMarkerPositionAndDetails=jest.fn();
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected} markerPositionAndDetails= {MockMarkerPositionAndDetails} 
        />);
        TableComponentWrapper.find('DropdownItem').at(1).simulate('click');
        TableComponentWrapper.find('DropdownItem').at(2).simulate('click');
        TableComponentWrapper.find('DropdownItem').at(3).simulate('click');
    });

    it('Dropdown in distanceInTableWithAccordion greater than 2', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn(); 
        let MockMarkerPositionAndDetails=jest.fn();
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected} markerPositionAndDetails= {MockMarkerPositionAndDetails} 
        />);
        TableComponentWrapper.instance().distanceInTableWithAccordion(1, mockLocations);
        TableComponentWrapper.find('DropdownItem').at(5).simulate('click');
    });

    it('Dropdown in distanceInTableWithAccordion greater than 2', ()=>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2, 2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn(); 
        let MockMarkerPositionAndDetails=jest.fn();
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress} distances= {distances}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected} markerPositionAndDetails= {MockMarkerPositionAndDetails} 
        />);
        TableComponentWrapper.instance().distanceInTableWithAccordion(1, mockLocations);
        TableComponentWrapper.find('DropdownItem').at(6).simulate('click');
    }); 
    
    it('moveUp Function works', () =>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn();
        let mockAddLocation= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}  distances= {distances}
            addLocation={mockAddLocation}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected}
        />);
       
        TableComponentWrapper.instance().moveUp(0);
        expect(mockRemoveRowandClear).toHaveBeenCalled(); 

    });

    it('moveDown Function works', () =>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn();
        let mockAddLocation= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}  distances= {distances}
            addLocation={mockAddLocation}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected}
        />);
       
        TableComponentWrapper.instance().moveDown(1);
        expect(mockRemoveRowandClear).toHaveBeenCalled(); 

    });

    it('moveToStart Function works', () =>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn();
        let mockAddLocation= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}  distances= {distances}
            addLocation={mockAddLocation}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected}
        />);
       
        TableComponentWrapper.instance().moveToStart(1);
        expect(mockRemoveRowandClear).toHaveBeenCalled(); 

    });

    it('Dropdowns in renderEditTableDropdown', () =>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];
        let distances=[2];
        let mockRemoveRowandClear=jest.fn();
        let mockBuildAddress= jest.fn(); 
        let markerPositionAndDetails= jest.fn(); 
        let mockMarkSelected= jest.fn();
        let mockAddLocation= jest.fn(); 
        TableComponentWrapper = shallow(<TableComponent createSnackBar={createSnackBar} 
            locations={mockLocations}  distances= {distances}
            addLocation={mockAddLocation}
            removeRowandClear={mockRemoveRowandClear}
            buildAddress={mockBuildAddress}
            markerPositionAndDetails= {markerPositionAndDetails}
            markSelected={mockMarkSelected}
        />);
       
        TableComponentWrapper.instance().renderEditTableDropdown();
        TableComponentWrapper.find('DropdownItem').at(6).simulate('click');
        TableComponentWrapper.find('DropdownItem').at(7).simulate('click');
        TableComponentWrapper.find('DropdownItem').at(8).simulate('click');

    });

});