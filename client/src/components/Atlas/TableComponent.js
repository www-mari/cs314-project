import React, {Component} from 'react';
import {Collapse, Card, CardBody, Popover, PopoverHeader, UncontrolledPopover, PopoverBody, UncontrolledDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Row, Button, Table, Container} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import icon from '../../static/images/csu_marker_1.png';
import info from '../../static/images/info.png';
import OptimizeTripButton from './OptimizeComponent';
import {executeOptimizeTrip} from "../../utils/restfulAPI";
import NotesModal from './NotesModal';
import {distanceToggle} from '../../utils/geocoding';


export default class TableComponent extends Component {

    constructor(props) {
        super(props);
        this.clearLocationTable = this.clearLocationTable.bind(this);
        this.createNotesModal = this.createNotesModal.bind(this);
        this.hideNotesModal = this.hideNotesModal.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            dropdownText: "Modify Tour",
            moveDropdownText: "↑↓",
            notesModalOpen: false,
            currentIndex: null,
            currentLocation: null,
        }
    }  
        
    toggle() {
        this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}));
    }

    render(){
        if(this.props.locations.length > 0){
            return(
                <Row className="mt-2">
                    <Col>
                        {this.renderModifyTableDropdown()}
                        <Table hover id="myTable" className="table">
                            <thead>
                                <tr>
                                    <th className="hide-on-mobile">Latitude</th>
                                    <th className="hide-on-mobile">Longitude</th>
                                    <th>Address</th>
                                    <th>Move/Edit</th>
                                    <th></th>
                                    <th>{this.renderModifyTableDropdown}</th>
                                </tr>
                            </thead>
                            {this.props.locations.map((location, index) => (this.createRow(location, index))).reverse()}
                        </Table>
                        {this.renderCalculateTotal()}
                        {this.renderNotesModal()}
                    </Col>                
                </Row>     
            );} else {return false;}
    }

    renderModifyTableDropdown(){
        return (
            <Row className="mb-2">
                <Col>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret> {this.state.dropdownText} </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.props.locations.reverse()}>Reverse</DropdownItem>
                        <DropdownItem onClick={() => this.optimizeTrip()}>Optimize</DropdownItem>
                        <DropdownItem onClick={() => this.clearLocationTable()}>Clear</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </Col>
            </Row>
        );
    }

    renderNotesModal(){
        return(
            <NotesModal 
                isOpen={this.state.notesModalOpen}
                hideNotesModal={this.hideNotesModal} 
                index={this.state.currentIndex}
                location={this.state.currentLocation}
                locations={this.props.locations}
            />
            
        );
    }

    async optimizeTrip(){   
        let response = await executeOptimizeTrip(this.props.locations, this.props.serverSettings);     
        this.processTourResponse(response);
    }

    processTourResponse(response){
        this.clearLocationTable();
        //addLocations in reverse order from response.places
        for(let i = 0; i < response.places.length; i++){
            this.props.addLocation({latlng:{lat:response.places[i].latitude,lng:response.places[i].longitude}})
        }
    }    

    distanceInTableWithAccordion(index, location){
        let length = this.props.distances.length;
        let minusOne = (index + (length - 1)) % length;
        if(length >= 2){
            return(
                <UncontrolledDropdown direction="right">
                    <DropdownToggle color="white"> <img src={info} alt="info" /> </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem > {"To next: " + this.props.distances[index]}</DropdownItem>
                        <DropdownItem > {"Cumulative distance: " + this.getCumulativeDistance(index)}</DropdownItem>
                        <DropdownItem onClick={(() => this.createNotesModal(location, index))}> Add Notes or Edit Address </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        } else {
            return(
                <UncontrolledDropdown direction="right">
                    <DropdownToggle color="white"> <img src={info} alt="info" />  </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem > {"Cumulative distance: " + this.getCumulativeDistance(index)}</DropdownItem>
                        <DropdownItem onClick={(() => this.createNotesModal(location, index))}> Add Notes or Edit Address </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }
    }

    createRow(location, index){
        let id = "id" + index + "";
        return( 
            <tbody key={index}>
                <tr id= 'OnClickHandler' key={index}>
                    <td scope="row" className="hide-on-mobile">{this.props.locations[index].lat}</td>
                    <td className="hide-on-mobile">{this.props.locations[index].lng}</td>
                    <td> 
                        {location.address}{this.distanceInTableWithAccordion(index, location)}
                    </td> 
                    <td>{this.renderEditTableDropdown(index)}</td>
                    <td><Button id='ShowSelected' className="mt-0" color="white"><img src={icon} alt="icon" onClick={(() => this.markSelected(location))} /></Button></td>
                    <td><Button id='RemoveRowButton' close aria-label="Cancel" onClick={(() => this.removeRow(index))} > x </Button></td> 
                </tr>
            </tbody>
            
        );
    }

    renderEditTableDropdown(index){
        return (
            <Row>
                <Col>
                <UncontrolledDropdown direction="right">
                    <DropdownToggle color="primary" caret> {this.state.moveDropdownText} </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={(() => this.moveUp(index))}> ↑ Move Up</DropdownItem>
                        <DropdownItem onClick={(() => this.moveDown(index))}> ↓ Move Down</DropdownItem>
                        <DropdownItem onClick={(() => this.moveToStart(index))}> ⤒ Move To Start</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </Col>
            </Row>
        );
    }

    moveUp(index) {
        let copyLocations = this.props.locations;
        if(this.props.locations.length > 1 && index != copyLocations.length -1){
            let temp = copyLocations[index];
            copyLocations[index] = copyLocations[index + 1];
            copyLocations[index + 1] = temp;
        }
        this.props.removeRowandClear(copyLocations);
    }

    moveDown(index) {
        let copyLocations = this.props.locations;
        if(this.props.locations.length > 1 && index != 0){
            let temp = copyLocations[index];
            copyLocations[index] = copyLocations[index - 1];
            copyLocations[index - 1] = temp;
        }
        this.props.removeRowandClear(copyLocations);
    }

    markSelected(location){
        const latlng = {lat: location.lat, lng: location.lng};
        let newMarkerPosition = latlng; 
        this.props.markerPositionAndDetails(newMarkerPosition, location)
    }

    removeRow = (index) => {
        let copyLocations = this.props.locations;
        if(copyLocations.length >= 2 && index === copyLocations.length - 1){
            let location = copyLocations[copyLocations.length - 2];
            let markerPos = {"lat": location.lat, "lng": location.lng};
            this.props.markerPositionAndDetails(markerPos, location)
        }
        copyLocations.splice(index,1);
        this.props.removeRowandClear(copyLocations);
    }

    createNotesModal(location, index){
        this.setState({notesModalOpen: true});
        this.setState({currentIndex: index});
        this.setState({currentLocation: location});
    }

    hideNotesModal(){
        this.setState({notesModalOpen: false});
    }

    clearLocationTable(){
        this.props.removeRowandClear([]);
    }

    getCumulativeDistance(index){
        let cumulative = 0;
        for(let i = 0; i < index; i++){
            cumulative += this.props.distances[i];
        }
        return cumulative;
    }

    renderCalculateTotal(){
        let total = 0;
        for(let i = 0; i < this.props.distances.length; i++){
            total += this.props.distances[i];
        }
        return(
            <h2>
                Total Distance: {total}
            </h2>
        );
    }

    moveToStart(index){
        let copyLocations = this.props.locations;
        let shiftedLocations = [];
        for(let i = 0; i < copyLocations.length; i++){
            shiftedLocations.push(copyLocations[(index + i) % copyLocations.length]);
        }
        this.props.removeRowandClear(shiftedLocations);
    }
}