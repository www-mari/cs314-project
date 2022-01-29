import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {create} from "react-test-renderer";
import {Marker} from 'react-leaflet';
import Atlas from '../src/components/Atlas/Atlas';



describe('Atlas', () => {
    const createSnackBar = jest.fn();
    let atlasWrapper;

    beforeEach(() => {
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar}/>);
    });

    it('initializes as expected', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
    });

    it('renders a marker on click', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

        const clickPosition = {lat: 0, lng: 0};
        simulateOnClickEvent(atlasWrapper, {latlng: clickPosition});

        expect(atlasWrapper.state().markerPosition).toEqual(clickPosition);
        expect(atlasWrapper.find(Marker).length).toEqual(1);
    });
   
    test("Matches the snapshot", () => {
        const button = create(<Button />);
        expect(button.toJSON()).toMatchSnapshot();
    });

    it('findLimit is default 10', () =>{
        expect(atlasWrapper.state().findLimit).toEqual(10);
    });

    it('requestUserLocation works', () =>{
        atlasWrapper.instance().requestUserLocation(); 
    });

    it('handleGeolocation works', () =>{
        let position= {"coords":[{"latitude":"12"},{"longitude":"12"}] };
        atlasWrapper.instance().handleGeolocation(position); 
    });

    it('handleRemoveRowAndClear works', () =>{
        let NewLocations= ["hi"];
        atlasWrapper.instance().handleRemoveRowAndClear(NewLocations); 
    });

    it('toggleAbout button works', () => {
        let toggleAbout= jest.fn(); 
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar} toggleAbout={toggleAbout}/>);

        atlasWrapper.find('#toggleAbout').simulate('click');
    });

    it('renderPolyline works', () =>{
        let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}, {"lat": 15, "lng": 15}];
        atlasWrapper.instance().renderPolyline(mockLocations); 
    });

    function Button(props) {
        return <button>Nothing to do for now</button>;
      }

    function simulateOnClickEvent(wrapper, event) {
        wrapper.find('Map').at(0).simulate('click', event);
        wrapper.update();
    }
});