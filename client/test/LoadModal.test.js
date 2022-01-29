import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import LoadModal from '../src/components/Atlas/LoadModal';
import {Button, Modal} from 'reactstrap';

describe('LoadModal', () => {
    const createSnackBar = jest.fn();
    let LoadModalWrapper;
    let hideLoadModal = jest.fn();
    let addLocation = jest.fn();
    let mockLocations=[{"lat": 10, "lng": 10}, {"lat": 5, "lng": 5}];

    beforeEach(() => {
        LoadModalWrapper = shallow(<LoadModal createSnackBar={createSnackBar} 
            hideLoadModal={hideLoadModal} addLocation={addLocation}
            locations={mockLocations}/>);
    });

    it('Displays Correctly', () => {
        expect(LoadModalWrapper.exists()).toBe(true);
    });

    it('LoadFile Method works', () => {
        var blob = new Blob(['{"places":[{"latitude":39.484679,"longitude":-104.78278739999999}]}'], { type: 'json' });
        blob["name"] = "tour.json";
        var file= blob; 

        let event= {
            target: {files: [file] },
        }; 
        LoadModalWrapper.instance().loadFile(event);
    });

    it('CSV to JSON Converter works', () => {
        var CSV = [
            '"1","val1","val2","val3","val4"',
            '"2","val1","val2","val3","val4"',
            '"3","val1","val2","val3","val4"'
        ].join('\n');

        LoadModalWrapper.instance().csvToJsonConverter(CSV);
    });
    
}); 