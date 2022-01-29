import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React from 'react';
import NotesModal from '../src/components/Atlas/NotesModal';


describe('NotesModal', () => {
    const createSnackBar = jest.fn();
    let NotesModalWrapper;
    //let mockLocations=jest.fn(); 

    beforeEach(() => {
        NotesModalWrapper = shallow(<NotesModal 
            createSnackBar={createSnackBar} 
        />);
            
    });

    it('Tests Correctly', () => {
        expect(NotesModalWrapper).toBeDefined();
    });

    it('editInputAddress works', () => {
        expect(NotesModalWrapper.state().edit).toEqual(false);
        NotesModalWrapper.instance().editInputAddress(); 
        expect(NotesModalWrapper.state().edit).toEqual(true);
    });

    it('saveNotesToLocation works', () => {
        let mockLocation= {
        "address": null,
        "notes": null
        };
        
        NotesModalWrapper = shallow(<NotesModal 
            createSnackBar={createSnackBar} location={mockLocation}
        />);

        expect(NotesModalWrapper.state().notes).toEqual(null);
        NotesModalWrapper.instance().saveNotesToLocation("Hi"); 
        expect(NotesModalWrapper.state().notes).toEqual(null);
    });

    it('printAddress works', () => {
        let mockLocation= {
            "address": null,
            "notes": null
        };
            
        NotesModalWrapper = shallow(<NotesModal 
                createSnackBar={createSnackBar} location={mockLocation}
        />);

        NotesModalWrapper.instance().printAddress(); 
    });

    it('saveNewAddress works', () => {
        let mockLocation= {
        "address": null,
        "notes": null
        };
        
        NotesModalWrapper = shallow(<NotesModal 
            createSnackBar={createSnackBar} location={mockLocation}
        />);

        expect(NotesModalWrapper.state().address).toEqual(null);
        NotesModalWrapper.instance().saveNewAddress("12th street"); 
    });

    
    it('setNotes works', () => {
        let ChangeEvent = {"target":{"value":"Hi"}};

        expect(NotesModalWrapper.state().notes).toEqual(null);
        NotesModalWrapper.instance().setNotes(ChangeEvent); 
        expect(NotesModalWrapper.state().notes).toEqual("Hi");
    });

    it('setAddress works', () => {
        let ChangeEvent = {"target":{"value":"12"}};

        expect(NotesModalWrapper.state().address).toEqual(null);
        NotesModalWrapper.instance().setAddress(ChangeEvent); 
    });

    it('editNotes button works', () => {
        NotesModalWrapper.find('#editNotes').simulate('click');
    });

    it('submitNotes button works', () => {
        let mockLocation= {
            "address": null,
            "notes": null
        };
            
        NotesModalWrapper = shallow(<NotesModal 
                createSnackBar={createSnackBar} location={mockLocation}
        />);
        NotesModalWrapper.state().address= "12th"; 
        NotesModalWrapper.state().edit= true; 
        NotesModalWrapper.find('#submitNotes').simulate('click');
    });


});