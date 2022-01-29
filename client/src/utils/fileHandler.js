import Ajv from 'ajv';

export function downloadFile(fileText, fileName, fileType) {
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
}

export function downloadCsv(locations){
    let locationsCsvString = "name,type,latitude,longitude,address,notes\n"
    Object.values(locations).forEach( item => {
        locationsCsvString += item.name + ","
        locationsCsvString += item.type + ","
        locationsCsvString += item.lat  + ","
        locationsCsvString += item.lng + ","
        locationsCsvString += item.address.replaceAll(",", ";") + ","
        locationsCsvString += item.notes + ","
        locationsCsvString += "\n"
    })
    locationsCsvString = locationsCsvString.substring(0, locationsCsvString.length - 2);
    downloadFile(locationsCsvString,"tour.csv","text/csv")
}

export function downloadJson(locations) {
  const wrapped = {places: latLngsToLatitudeLongitudes(locations)};
  let locationsString = JSON.stringify(wrapped);
  downloadFile(locationsString, "tour.json", "application/json");
}

export function latLngsToLatitudeLongitudes(locations){
  let places = [];
  for(const location of locations){
    console.log(location);
    if(location.address){
      places.push({latitude: location.lat, longitude: location.lng, address: location.address, notes: location.notes})
    }
    else if(place.municipality && place.name){
      places.push({latitude: location.lat, longitude: location.lng, address: (location.name + ", " + location.municipality), notes: location.notes})
    }
    else{
      places.push({latitude: location.lat, longitude: location.lng, address: null, notes: location.notes})
    }  
  }
  return places;
}

export function latitudeLongitudestoLatLngs(places){
  let latlngs = [];
  for(const place of places){
    if(place.address){
      latlngs.push({lat: place.latitude, lng: place.longitude, address: place.address, notes: place.notes})
    }
    else if(place.municipality && place.name){
      latlngs.push({lat: place.latitude, lng: place.longitude, address: (place.name + ", " + place.municipality), notes: place.notes})
    }
    else{
      latlngs.push({lat: place.latitude, lng: place.longitude, address: null, notes: place.notes})
    }
  }
  return latlngs;
}

export function downloadKml(locations) {
  let file = getKmlHeaders();
  for(let i = 0; i < locations.length; i++) {
    file += locations[i].lng + "," + locations[i].lat + ",0 ";
  }
  file += locations[0].lng + "," + locations[0].lat + ",0 ";
  file += getKmlFooters();

  downloadFile(file, "tour.kml", "text/plain");
}

export function getKmlHeaders() {
  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
            "<kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" " +
                "xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\">" +
              "<Document>" +
              "<name>Tour</name>" +
                "<open>1</open>" +
                "<description>A line connecting all of your selected tour locations</description>" +
                "<Style id=\"CrossStyle\">" +
                  "<LineStyle>" +
                    "<color>ffffffb6</color>" +
                    "<width>4</width>" +
                  "</LineStyle>" +
                "</Style>" +
                "<Placemark>" +
                  "<name>Cross-corner line</name>" +
                  "<styleUrl>#CrossStyle</styleUrl>" +
                  "<LineString>" +
                    "<coordinates>";
}

export function getKmlFooters() {
  return "</coordinates>" +
      "</LineString>" +
    "</Placemark>" +
    "</Document>" +
    "</kml>";
}

export function downloadSvg(locations) {
  let file = getSvgHeaders();
  for(let i = 0; i < locations.length; i++) {
    file += "<line id=\"vertCenter\" x1=\"" + locations[i].lng + "\" y1=\"" + -locations[i].lat + 
              "\" x2=\"" + locations[(i + 1) % locations.length].lng + "\" y2=\"" + -locations[(i + 1) % locations.length].lat + 
              "\" stroke=\"black\" stroke-width=\"2\" transform=\"translate(360,180) scale(2,2)\"/>";
  }
  file += getSvgFooters();

  downloadFile(file, "tour.svg", "text/plain");
}

export function getSvgHeaders() {
  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"720\" height=\"360\">" +
            "<image width=\"720\" height=\"360\" href=\"https://instructor-uploaded-content.s3.amazonaws.com/MAP.svg-6983777\" />"
}

export function getSvgFooters() {
  return "</svg>";
}
 
export function schemaChecker(data){
  let schema = {
    "properties": {
      "places": {
        "type":"array"
      }
    },
    required: ["places"],
    additionalProperties: false
  };
  const anotherJsonValidator = new Ajv();
  const validate = anotherJsonValidator.compile(schema);
  
  return validate(data);
   
 }
