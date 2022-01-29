import {getLocation, buildAddress} from "../src/utils/geocoding";

describe('geocoding', () => {

    beforeEach(() => {
        global.getReverseGeolocationInfo = jest.fn();
    });

    it('Returns', () => {
        expect(getLocation({"lat": 0, "lng": 0}));
    });
}); 

it('build address with unknown', () =>{
    let location = {
        "amenity": null,
        "houseNumber": null,
        "building": null,
        "road": null,
        "city": null,
        "state": null,
        "county": null,
        "country": null,
        "zip": null,
        "lat": 0,
        "lng": 0
    };
    const address = buildAddress(location);
    expect(address).toEqual("Unknown");
});

it('build address with an actual address', () =>{
    let location = {
        "amenity": "The Human Bean",
        "houseNumber": null,
        "building": null,
        "road": "Spring Creek Trail",
        "city": "Fort Collins",
        "state": "Colorado",
        "county": null,
        "country": "United States",
        "zip": "80525-1422",
        "lat": 40.5623079493678,
        "lng": -105.07711871411023
    };
    const humanBean = buildAddress(location);
    expect(humanBean).toEqual("The Human Bean, Spring Creek Trail, Fort Collins, Colorado, 80525-1422, United States");
});