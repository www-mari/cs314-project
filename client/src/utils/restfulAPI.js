import Ajv from 'ajv';

export async function sendServerRequest(requestBody, serverPort=getOriginalServerPort()) {
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(requestBody)
    };
    try {
        const response = await fetch(`${serverPort}/api/${requestBody.requestType}`, fetchOptions);
        if (!response.ok) {
            console.log("restfulAPI,sendServerRequest: WE ARE NOT OK");
            return null;
        }
        return response.json();
    } catch (error) {
        console.log("restful api catch: " + error);
        return null;
    }
}

export function getOriginalServerPort() {
    const serverProtocol = location.protocol;
    const serverHost = location.hostname;
    const serverPort = location.port;
    const alternatePort = process.env.SERVER_PORT;
    return `${serverProtocol}\/\/${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}

export function isJsonResponseValid(object, schema) {
    const anotherJsonValidator = new Ajv();
    const validate = anotherJsonValidator.compile(schema);
    return validate(object);
}

export async function executeFindPlaces(findString, findLimit, serverSettings){
    let response;
    await sendServerRequest({
        requestType: "find",
        match: findString,
        limit: findLimit
    },
    serverSettings.serverPort
    ).then(findResponse => {
        if (findResponse) {
            response = findResponse;                
        } else {
            this.props.showMessage("The Find Request To The Server Failed. Please Try Again Later.", "error");
        }
    });

    return response;
}

export async function executeFindDistances(locations, serverSettings){
    let places = [];
    let response;
    for(let i = 0; i < locations.length; i++) {
        places.push({"latitude": locations[i].lat.toString(), "longitude": locations[i].lng.toString()});
    }
    await sendServerRequest({
        requestType: "distances",
        places: places,
        earthRadius: 3958.8,     
    },
    serverSettings.serverPort
    ).then(distanceResponse => {
        if (distanceResponse) {
            response = distanceResponse;                
        } else {
            this.props.showMessage("The Distance Request To The Server Failed. Please Try Again Later.", "error");
        }
    });
    return response;
}

export async function executeOptimizeTrip(locations, serverSettings){    
    let places = [];
    let response;
    for(let i = 0; i < locations.length; i++) {
        places.push({"latitude": locations[i].lat.toString(), "longitude": locations[i].lng.toString()});
    }
    await sendServerRequest({
        requestType: "tour",
        earthRadius: 3958.8,
        places: places,
        response: 1
    },
    serverSettings.serverPort
    ).then(tourResponse => {
        if (tourResponse) {
            response = tourResponse;
        } else {
            this.props.showMessage("The Tour Request To The Server Failed. Please Try Again Later.", "error");
        }
    });
    return response;
}