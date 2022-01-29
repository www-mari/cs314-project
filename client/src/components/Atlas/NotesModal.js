import React, {Component} from 'react';
import {Container, InputGroup, Input, InputGroupAddon, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Dropdown, Table} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import {downloadCsv, downloadJson, downloadKml, downloadSvg} from "../../utils/fileHandler";
import {getLocation, buildAddress, editAddress, addNotesToLocation} from '../../utils/geocoding';


export default class NotesModal extends Component {

    constructor(props) {
        super(props);
        this.saveNotesToLocation = this.saveNotesToLocation.bind(this);
        this.editInputAddress = this.editInputAddress.bind(this);
        this.setNotes = this.setNotes.bind(this);
        this.saveNewAddress = this.saveNewAddress.bind(this);
        this.setAddress = this.setAddress.bind(this);

        this.state={
            dropDownOpen: false,
            edit: false,
            notes: null,
            address: this.printAddress()
        }
    }

    render() {
        return (
            <Modal toggle={this.props.hideNotesModal} isOpen={this.props.isOpen} className="">
                <ModalHeader toggle={this.props.hideNotesModal}>Notes: </ModalHeader>
                <ModalBody>
                    <Row className="mb-2">
                        <Col>
                            Current Location:{" "}
                            {this.printAddress()}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Button id='editNotes' color="primary" onClick={(() => this.editInputAddress())}>Edit Existing Address</Button>
                            {this.renderEditAddress()}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            {this.renderNotesImput()}
                            {this.renderNotes()}
                        </Col></Row>
                </ModalBody> <ModalFooter> </ModalFooter>
            </Modal>
        );}

    renderEditAddress(){
        if(this.state.edit){
            return(
                <InputGroup className="mt-2">
                    <Input
                        //placeholder="Edit Existing Address"
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.saveNewAddress(this.state.address);
                            }
                        }}
                        value={this.state.address}
                        onChange={this.setAddress}
                        id="notes-input"/>
                    <InputGroupAddon addonType="append">
                        <Button id='submitNotes' color="primary" onClick={(() => this.saveNewAddress(this.state.address))}>Save</Button>
                    </InputGroupAddon> 
                </InputGroup> 
            );
        }
        else{
            this.state.address = this.printAddress();
        }
    }

    renderNotesImput(){
        return(
            <InputGroup className="mb-2">
                <Input
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            this.saveNotesToLocation(this.state.notes);
                        }
                    }}
                    placeholder="Add Notes to this location"
                    value={this.state.notes}
                    onChange={this.setNotes}
                    id="notes-input"/>
                <InputGroupAddon addonType="append">
                    <Button id='submitNotes' color="primary" onClick={(() => this.saveNotesToLocation(this.state.notes))}>Submit</Button>
                </InputGroupAddon> 
            </InputGroup> 
        );
    }

    renderNotes(){
        if(this.props.location != null){ //eventually turn into this.props.location.notes
            if(this.props.location.notes != null){
                return(
                    <Row>
                        <Col>
                            Notes: {this.props.location.notes}
                        </Col>
                    </Row>
                );
            }
        }
    }

    editInputAddress(){
        this.setState({edit: true});
    }

    saveNotesToLocation(notesString){
        addNotesToLocation(this.props.location, notesString);
        this.setState({notes: null});
    }

    setNotes(onChangeEvent){
        const inputText = onChangeEvent.target.value;
        this.setState({notes: inputText});
    }
    
    saveNewAddress(newAddress){
        editAddress(this.props.location, newAddress);
        this.setState({edit: false});
        this.setState({address: null});
    }

    setAddress(onChangeEvent){
        const inputText = onChangeEvent.target.value;
        this.setState({address: inputText});
    }

    printAddress(){
        if(this.props.location != null){
            return(this.props.location.address)
        }
        else{
            return null;
        }
    }

    
}
