import React, { Component, useState } from 'react';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Coordinates from "coordinate-parser";
import 'leaflet/dist/leaflet.css';

export default class SearchComponent extends Component {

    constructor(props) {
        super(props); 
        this.processCoordinatesInput = this.processCoordinatesInput.bind(this);
        this.setFindString = this.setFindString.bind(this);
        this.toggle = this.toggle.bind(this);
        this.coordinatesOrWords = this.coordinatesOrWords.bind(this);
        this.state = {
            coordinates: {
                inputText: "",
                latLong: null,
                valid: true,
            },
            findString: "",
            dropdownOpen: false,
            dropdownText: "Results"
        }
    }

    toggle() {
        this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}));
    }

    render() {
        return (
            <div>
                {this.renderFindInput()}
            </div>
        );
    }

    renderFindInput(){
        return (
            <InputGroup className="mb-2"> {this.renderInputGroupAddon()}
                <Input
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            this.coordinatesOrWords(this.state.findString);
                        }}}
                    placeholder="Search by keyword(s), or add to trip with Latitude,Longitude"
                    value={this.state.findString} onChange={this.setFindString} id="find-input"/>
                <InputGroupAddon addonType="append">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret> {this.state.dropdownText} </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.setLimit(10)}>10</DropdownItem>
                        <DropdownItem onClick={() => this.setLimit(20)}>20</DropdownItem>
                        <DropdownItem onClick={() => this.setLimit(50)}>50</DropdownItem>
                        <DropdownItem onClick={() => this.setLimit(100)}>100</DropdownItem>
                        <DropdownItem onClick={() => this.setLimit(0)}>All</DropdownItem>
                    </DropdownMenu>
                </Dropdown> </InputGroupAddon>
                <InputGroupAddon addonType="append">
                    <Button id='submitButtonFindPlaces' color="primary" onClick={(() => this.coordinatesOrWords(this.state.findString) )}>Search</Button>
                </InputGroupAddon> </InputGroup> 
    );}

    renderInputGroupAddon(){
        return(
            <InputGroupAddon addonType="prepend" className="hide-on-mobile">
                    <InputGroupText>🔎</InputGroupText>
                </InputGroupAddon>
        );
    }

    setFindString(onChangeEvent){
        const inputText = onChangeEvent.target.value;
        this.setState({findString: inputText});
    }

    setLimit(num){
        this.props.handleSetLimit(num);
        this.state.dropdownText = num.toString();
        if(this.state.dropdownText === "0"){
            this.state.dropdownText = "All";
        }
    }

    coordinatesOrWords(inputString){
        this.processCoordinatesInput(inputString);
        if(this.state.coordinates.latLong != null){
            this.verifyCoordinates().then(r => null)
        } else {
            this.props.findPlaces(inputString)
        }
    }

    processCoordinatesInput(inputText) {
        const coordinates = this.state.coordinates;
        coordinates.inputText = inputText;
        coordinates.latLong = this.getCoordinatesOrNull(inputText);
        coordinates.valid = true;
        this.setState({coordinates: coordinates});
    }

    getCoordinatesOrNull(coordinateString) {
        try {
            const convertedCoordinates = new Coordinates(coordinateString);
            return {
                lat: convertedCoordinates.getLatitude(),
                lng: convertedCoordinates.getLongitude()
            };
        }
        catch (error) {
            return null;
        }
    }

    async verifyCoordinates(){
        const validCoordinates = this.state.coordinates.latLong != null;
        const coordinates = this.state.coordinates;
        if(!validCoordinates){
            coordinates.valid = false;
            this.setState({coordinates: coordinates});
        } else {
            coordinates.valid = true;
            let latlng = this.state.coordinates.latLong;
            let newCoords = {
                "latlng": this.state.coordinates.latLong
            }
            await this.props.addLocation(newCoords);
            this.props.setCoordinates(latlng, coordinates);
        }
    }

}
