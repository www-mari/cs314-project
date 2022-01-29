import React, {Component} from 'react';
import {Row, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import {latitudeLongitudestoLatLngs, schemaChecker} from '../../utils/fileHandler'

export default class LoadModal extends Component {

    constructor(props) {
        super(props);
        this.hideLoadModal = this.props.hideLoadModal.bind(this);
        this.addLocation = this.props.addLocation.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.onloadEvent = this.onloadEvent.bind(this);
        this.state={
            fileData: "",
            locations: this.props.locations,
            loadLocations: [], 
        }
    }

    render() {
        return (
            <Modal toggle={this.props.hideLoadModal} isOpen={this.props.isOpen} className="">
                <ModalHeader toggle={this.props.hideLoadModal}>Upload File</ModalHeader>
                <ModalBody>
                    {this.renderFileUploadButton()}
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        );
    }

    renderFileUploadButton(){
        return(
            <Row> 
                <Row className="ml-2"> 
                    <Input type="file" name="file" accepts='.json, .csv' id="load-file" onChange={this.loadFile}/>
                    Accepts valid .json and .csv filetypes only
                </Row>
            </Row>
        );
    }

    loadFile(event){
        let extension = event.target.files[0].name;
        extension = extension.substring(extension.length -4);
        let reader = new FileReader();
        reader.onload = () => this.onloadEvent(extension, reader);
        reader.readAsText(event.target.files[0]);
    }

    onloadEvent(extension, reader){
        let data = null;
        let isValidSchema = true;
        if(extension === '.csv'){
            data = this.csvToJsonConverter(reader.result);
        }
        else{
            data = JSON.parse(String("" + reader.result));
            isValidSchema = schemaChecker(data);
        }
        if(isValidSchema){
            if(data.places){
                data = data.places;
            }     
            data = latitudeLongitudestoLatLngs(data);
            this.props.clearLocations([]);
            this.setState({locations: data});
            Object.values(this.state.locations).forEach( location =>
            {
                let notes = "";
                let address = "";
                if(location.notes){
                    notes = location.notes;
                }
                if(location.address){
                    address = location.address.replaceAll(";", ",");
                }
                this.addLocation({latlng:{lat:location.lat,lng:location.lng}, notes: notes, address: address});
            })
            this.props.hideLoadModal();
        }
    }

    //method inspired by http://techslides.com/convert-csv-to-json-in-javascript
    csvToJsonConverter(csv){
        let lines=csv.split("\n");
        let result = [];
        let headers=lines[0].split(",");
        for(let i=1;i<lines.length;i++){
            let obj = {};
            let currentLine=lines[i].split(",");
            if(currentLine.length <= 1){
                continue;
            }
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        return result;
    }
}
