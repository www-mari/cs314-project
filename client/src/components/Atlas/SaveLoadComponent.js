import React, { Component } from 'react';
import {Button, Input, InputGroup, ButtonGroup} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import ButtonComponent from "./ButtonComponent";
import SaveModal from './SaveModal';
import LoadModal from './LoadModal';

export default class SaveLoadComponent extends Component {

    constructor(props) {
        super(props);
        this.renderSaveLoadButton = this.renderSaveLoadButton.bind(this);
        this.hideSaveModal= this.hideSaveModal.bind(this);
        this.hideLoadModal= this.hideLoadModal.bind(this);
        this.saveTrip = this.saveTrip.bind(this);
        this.loadTrip = this.loadTrip.bind(this);
        this.renderSaveModal= this.renderSaveModal.bind(this);
        // this.addLocation = this.props.addLocation.bind(this);
        this.state = {
            SaveModalOpen: false,
            LoadModalOpen: false
        }
    }

    render() {
        return (
            <InputGroup className="mt-2" key='saveLoadButton'>
                {this.renderSaveLoadButton(this.saveTrip,this.loadTrip)}
                {this.renderSaveModal()}
                {this.renderLoadModal()}
            </InputGroup>
        );
    }

    renderSaveLoadButton(clickToSaveFunction,clickToLoadFunction){
        return(
            <ButtonGroup>
                <ButtonComponent id='saveButton' color="info" onClick={(() => clickToSaveFunction.apply(this) )} text="Save"/>
                <ButtonComponent id='loadButton' color="info" onClick={(() => clickToLoadFunction.apply(this) )} text="Load"/>
            </ButtonGroup>
        );
    }


    saveTrip(){
        this.setState({SaveModalOpen: true});
    }

    renderSaveModal(){
        return(
            <SaveModal 
                isOpen={this.state.SaveModalOpen}
                hideSaveModal={this.hideSaveModal} 
                locations={this.props.locations}
            />
            
        );
    }

    hideSaveModal(){
        this.setState({SaveModalOpen: false});
    }

    loadTrip(){
        this.setState({LoadModalOpen: true});
    }

    hideLoadModal(){
        this.setState({LoadModalOpen: false});
    }

    renderLoadModal(){
        return(
            <LoadModal 
                isOpen={this.state.LoadModalOpen}
                hideLoadModal={this.hideLoadModal}
                locations={this.props.locations}
                addLocation={this.props.addLocation}
                clearLocations={this.props.removeRowandClear}
            />
        );
    }



}