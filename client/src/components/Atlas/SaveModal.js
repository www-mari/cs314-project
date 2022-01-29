import React, {Component} from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Dropdown, Table} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import {downloadCsv, downloadJson, downloadKml, downloadSvg} from "../../utils/fileHandler";

export default class SaveModal extends Component {

    constructor(props) {
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
        this.state={
            dropDownOpen: false
        }
    }

    render() {
        return (
            <Modal toggle={this.props.hideSaveModal} isOpen={this.props.isOpen} className="">
                <ModalHeader toggle={this.props.hideSaveModal}>Save Options</ModalHeader>
                <ModalBody>
                    {this.formatOptions()}
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        );
    }

    formatOptions(){
        return(
            <Row> 
                <Row className="ml-1"> 
                    Please choose what part of your trip you want to save and in what corresponding format you want: 
                </Row>
                <ButtonGroup vertical className="ml-1"> 
                    Tour
                    <ButtonGroup>
                        <Button id="DownloadCSV" size="sm" color="info" onClick={() => this.downloadFile(downloadCsv)}>CSV</Button>
                        <Button id="DownloadJSON" size="sm" color="info" onClick={() => this.downloadFile(downloadJson)}>JSON</Button>
                    </ButtonGroup>
                
                    Map
                    <ButtonGroup>
                        <Button id="DownloadSVG" size="sm" color="info" onClick={() => this.downloadFile(downloadSvg)}>SVG</Button>
                        <Button id="DownloadKML" size="sm" color="info" onClick={() => this.downloadFile(downloadKml)}>KML</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Row>
        );
    }

    downloadFile(downloadFileType){
        downloadFileType(this.props.locations);
        this.props.hideSaveModal();
    }
}
