import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import SaveModal from '../src/components/Atlas/SaveModal';
import {Button, Modal} from 'reactstrap';

describe('SaveModal', () => {
    const createSnackBar = jest.fn();
    let SaveModalWrapper;
    let replaceAll = jest.fn();
    let hideSaveModal = jest.fn();
    let addr1 ="12345, NE";
    let addr2 = "00000, Hawaii"
    let notes1 = "home"
    let notes2 = "favorite"
    let mockLocations=[{"lat": 10, "lng": 10, "address": addr1, "notes": notes1}, {"lat": 5, "lng": 5, "address": addr2, "notes": notes2}];

    beforeEach(() => {
        SaveModalWrapper = shallow(<SaveModal createSnackBar={createSnackBar} hideSaveModal={hideSaveModal} replaceAll={replaceAll} locations={mockLocations}/>);
    });

    it('Displays Correctly', () => {
        expect(SaveModalWrapper.exists()).toBe(true);
    });

    // it('DownloadCSV Button works', () => {
    //     SaveModalWrapper.find('#DownloadCSV').at(0).simulate('click');
    //     expect(hideSaveModal).toHaveBeenCalled();
    // });

    it('DownloadJSON Button works', () => {
        SaveModalWrapper.find('#DownloadJSON').at(0).simulate('click');
        expect(hideSaveModal).toHaveBeenCalled();
    });

    it('DownloadSVG Button works', () => {
        SaveModalWrapper.find('#DownloadSVG').at(0).simulate('click');
        expect(hideSaveModal).toHaveBeenCalled();
    });

    it('DownloadKML Button works', () => {
        SaveModalWrapper.find('#DownloadKML').at(0).simulate('click');
        expect(hideSaveModal).toHaveBeenCalled();
    });

});