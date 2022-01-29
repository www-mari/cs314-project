import React, {Component, createRef} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import {getLocation, buildAddress, editAddress, addNotesToLocation} from '../../utils/geocoding';
import Control from 'react-leaflet-control';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {isJsonResponseValid, executeFindPlaces, executeFindDistances} from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/FindResponse.json";
import * as distancesSchema from "../../../schemas/DistancesResponse.json";
import DisplayResultsModal from './DisplayResultsModal';
import SearchComponent from './SearchComponent';
import TableComponent from './TableComponent';
import SaveLoadComponent from './SaveLoadComponent';
const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {
    constructor(props) {
        super(props);
        this.mapRef = createRef();
        this.constructorBinders();
        this.constructorState();
        this.requestUserLocation();
    }

    constructorBinders(){
        this.addLocation = this.addLocation.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.requestUserLocation = this.requestUserLocation.bind(this);
        this.handleGeolocation = this.handleGeolocation.bind(this);
        this.getMarker = this.getMarker.bind(this);
        this.setMarkerPositionDetails = this.setMarkerPositionDetails.bind(this);        
        this.findPlaces = this.findPlaces.bind(this);    
        this.renderResultsModal = this.renderResultsModal.bind(this);
        this.renderSearchComponent = this.renderSearchComponent.bind(this);
        this.handleRemoveRowAndClear = this.handleRemoveRowAndClear.bind(this);
        this.renderPolyline = this.renderPolyline.bind(this);
    }

    constructorState(){
        this.state = {
            mapCenter : MAP_CENTER_DEFAULT,
            markerPosition: null,
            markerPositionDetails: null,
            locations: [], 
            coordinates: {
                inputText: "",
                latLong: null,
                valid: true,
            },
            foundLocations: {
                foundPlaces: null,
                numberFound: null,
                foundSearchInputString: ""
            },
            distances: [],
            showResultsModal: false,
            findLimit: 10
        };
    }

    render() {
        return (
            <div>
                <Container>
                    {this.renderAboutButton()}
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderSearchComponent()}
                            {this.renderLeafletMap()}
                            {this.renderSaveLoadComponent()}
                            {this.renderTableComponent()}                   
                            {this.renderResultsModal()}
                        </Col>
                    </Row>                   
                </Container>
            </div>
        );
    }

    requestUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.handleGeolocation, console.log("Error retrieving the user's position."));
        }
    }

    handleGeolocation(position) {
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.setState({mapCenter: latlng, markerPosition: latlng});
        this.addLocation({"latlng":latlng}).then();
    }

    renderSaveLoadComponent() {
        return(
            <SaveLoadComponent
                locations={this.state.locations}
                addLocation={this.addLocation}
                removeRowandClear={this.handleRemoveRowAndClear}/>
        )
    }

    renderSearchComponent() {
        return(
            <SearchComponent 
                setCoordinates={(latlng, coordinates) => this.setState({mapCenter: latlng, markerPosition: latlng, coordinates: coordinates})} 
                addLocation={this.addLocation} 
                findPlaces={this.findPlaces} 
                handleSetLimit={(limit) => this.setState({findLimit: limit})}/>
        );
    }

    renderTableComponent() {
        return(
            <TableComponent 
                removeRowandClear={this.handleRemoveRowAndClear}
                markerPositionAndDetails={(markerPos, details) => this.setState({mapCenter: details, markerPosition: markerPos, markerPositionDetails: details})}
                buildAddress={buildAddress}
                distances={this.state.distances}
                locations={this.state.locations}
                showMessage={this.state.showMessage}
                addLocation={this.addLocation}
                serverSettings={this.props.serverSettings}
            />
        );
    }

    handleRemoveRowAndClear(newLocations){
        this.setState({locations: newLocations})
        this.findDistances();
    }

    async findPlaces(findString){
        let response = await executeFindPlaces(findString, this.state.findLimit, this.props.serverSettings);
        if(isJsonResponseValid(response, findSchema)) {
            let locations = this.state.foundLocations;
            locations.foundPlaces = response.places;
            this.setState({foundLocations: locations, showResultsModal: true});
        } else {
            console.log("Atlas.js, processResponse FAILED");
        }
    }

    async findDistances(){
        let response = await executeFindDistances(this.state.locations, this.props.serverSettings);
        if(isJsonResponseValid(response, distancesSchema)) {
            this.setState({distances : response.distances});
        } else {
            console.log("Atlas.js, processDistanceResponse FAILED");
        }
    }

    renderResultsModal(){
        return(
            <DisplayResultsModal 
                isOpen={this.state.showResultsModal}
                hideResultsModal={() => this.setState({showResultsModal: false})}
                addLocation={this.handleMapClick}
                buildAddress={buildAddress}
                getLocation={getLocation}
                places={this.state.foundLocations.foundPlaces}
                foundSearchInputString={this.state.foundLocations.foundSearchInputString}/>
        );
    }

    renderAboutButton(){
        return (
            <Row>
                <Col sm={12} md={{size: 10, offset: 1 }}>
                    <Button id= "toggleAbout" color="primary" block onClick={(() => this.props.toggleAbout())} className="mb-2">
                        View More About Our Team
                    </Button>
                </Col>
            </Row>
        );
    }

    renderFindMeButton(){
        return(
            <Button style={{ background: 'white' }} onClick={this.requestUserLocation} className="mt-2">
                Find Me 📌
            </Button>
        );
    }

    renderPolyline(locations) {
        if(locations.length > 1){
            let positions = [];
            for(let i = 0; i < locations.length; i++){
                positions.push([locations[i].lat, locations[i].lng]);
            }
            positions.push([locations[0].lat, locations[0].lng]);
            return (
                <Polyline color="blue" positions={positions} />
            );
        }
    }

    renderLeafletMap() {
        return (
            <Map
                ref = {this.mapRef}
                className={'mapStyle'}
                boxZoom={false}
                useFlyTo={true}
                zoom={this.getZoom()}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center= {this.state.mapCenter}
                onClick={this.handleMapClick}>
                {this.renderPolyline(this.state.locations)}
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                    {this.getMarker()}
                <Control position="bottomright">
                    {this.renderFindMeButton()}
                </Control>
            </Map>
        );
    }

    getZoom(){
        if(this.mapRef && this.mapRef.current){
            return this.mapRef.current.leafletElement.getZoom();
        }
        return 15;    
    }

    handleMapClick(mapClickInfo){
        let newMarkerPosition = mapClickInfo.latlng;
        this.addLocation(mapClickInfo);
        this.setState({markerPosition: newMarkerPosition});
    }

    getMarker() {
        if (this.state.markerPosition) {
            let latlngText = "Loading...";
            if(this.state.markerPositionDetails) {
                latlngText = this.state.markerPositionDetails.address;
            } else {
                this.setMarkerPositionDetails(this.state.markerPosition);
            }
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {latlngText}
                    </Popup>
                </Marker>
            );
        }
    }

    showMarkerPopup(ref) {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    async setMarkerPositionDetails(latLng) {
        await getLocation(latLng).then(
            (result) => {
                this.setState({markerPositionDetails: result});
            }
        );
    }

    async addLocation(mapClickInfo){
        let newLocations = this.state.locations;
        let location = await getLocation(mapClickInfo.latlng);
        location.name = mapClickInfo.name;
        location.type = mapClickInfo.type;
        if(mapClickInfo.address){
            editAddress(location, mapClickInfo.address)
        }
        if(mapClickInfo.notes){
            addNotesToLocation(location, mapClickInfo.notes)
        }
        newLocations.push(location);
        this.setState({
            locations: newLocations, 
            markerPositionDetails: location, 
            showResultsModal: false, 
            mapCenter: mapClickInfo.latlng
        });

        this.findDistances();
    }
}