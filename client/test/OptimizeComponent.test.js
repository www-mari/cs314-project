import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import OptimizeComponent from '../src/components/Atlas/OptimizeComponent';



describe('OptimizeComponent', () => {
    const createSnackBar = jest.fn();
    let OptimizeComponentWrapper;
    let mockaddLocation=jest.fn(); 
    let mockclearLocationTable=jest.fn();
    //let mockDistances= jest.fn();  


    beforeEach(() => {
        OptimizeComponentWrapper = shallow(<OptimizeComponent 
            createSnackBar={createSnackBar} addLocation={mockaddLocation} clearLocationTable={mockclearLocationTable} />);
            
    });

    it('Tests Correctly', () => {
        expect(OptimizeComponentWrapper).toBeDefined();
    });

    it('Optimze Button Works', () =>{
        OptimizeComponentWrapper.find('#optimizeButton').simulate('click'); 
    });

    it('processTourResponse Button Works', () =>{

        let response = {"places":[{"latitude":39.484679,"longitude":-104.78278739999999}]};

        OptimizeComponentWrapper.instance().processTourResponse(response); 
        expect(mockclearLocationTable).toHaveBeenCalled();
    });


});