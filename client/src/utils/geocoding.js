export async function getReverseGeolocationInfo(latlng){
    // URL used for reverse geolocation
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`;
    
    let address;
    // Async execute the call
    try{
        await fetch(geoUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    address = result.address;
                }
        );
    } catch (e){
        return latlng;
    }
    return address ? address : latlng;
}

export async function getLocation(latlng) {
    let address = await getReverseGeolocationInfo(latlng);
    let location = {
        "amenity": address.amenity,
        "houseNumber": address.house_number,
        "building": address.building,
        "road": address.road,
        "city": address.city,
        "state": address.state,
        "county": address.county,
        "country": address.country,
        "zip": address.postcode,
        "lat": latlng.lat,
        "lng": latlng.lng,
        "address": null,
        "notes": null
    };
    buildAddress(location);
    return location;
}

export function buildAddress(location){
    let address = 
    verifyAddressAttribute(location.amenity) +
    (location.houseNumber ? `${location.houseNumber} ` : "") +
    verifyAddressAttribute(location.building) +
    verifyAddressAttribute(location.road) +
    verifyAddressAttribute(location.city) +
    verifyAddressAttribute(location.state) +
    verifyAddressAttribute(location.zip) +
    (location.country ? location.country : "");
    if(address === ""){
        location.address = "Unknown";
        return "Unknown"
    } else {
        location.address = address;
        return address;
    }
}

export function verifyAddressAttribute(attr){
    return attr ? `${attr}, ` : "";
}

export function addNotesToLocation(location, notes){
    location.notes = notes;
}

export function editAddress(location, address){
    location.address = address;
}