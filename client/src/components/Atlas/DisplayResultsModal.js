import React, {Component} from 'react';
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
    Label,
    Input,
    InputGroupAddon,
    InputGroup,
    Row,
    Container
} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import ButtonComponent from "./ButtonComponent";

export default class DisplayResultsModal extends Component {

    constructor(props) {
        super(props);
        this.setFilterResultsInputString = this.setFilterResultsInputString.bind(this);
        this.filterResults = this.filterResults.bind(this);
        this.createFilterTermsRow = this.createFilterTermsRow.bind(this);
        this.renderClearFiltersButton = this.renderClearFiltersButton.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.state={
            filterResultsInputString: "",
            filtered: false,
            filtered_places: [],
            filterItems: []
        }
    }

    render() {
        if(!this.props.isOpen){
            return null; }
        return (
            <Modal toggle={this.props.hideResultsModal} isOpen={this.props.isOpen} className="">
                <ModalHeader toggle={this.props.hideResultsModal}>Search Results</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="filterResults">Filter these results:</Label>
                        <InputGroup>
                            <Input type="text" name="filterResults" id="filterResultsInput" placeholder="Search Within Results (ex. Colorado)"
                                   value={this.state.filterResultsInputString}
                                   onChange={this.setFilterResultsInputString}
                                   onKeyPress={event => {if (event.key === "Enter") {this.filterResults(this.state.filterResultsInputString)}}}/>
                            <InputGroupAddon addonType="append">
                                <ButtonComponent id="filterResultsButton" color="primary" onClick={( ()=> this.filterResults(this.state.filterResultsInputString) )} className="float-right" text='Filter'/>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <Container> {this.state.filterItems.map( item => this.createFilterTermsRow(item))}
                        {this.renderClearFiltersButton()}
                    </Container>
                    {this.renderPlaces()}
                </ModalBody> <ModalFooter> </ModalFooter>
            </Modal>
        );}

    createFilterTermsRow(item){
        return(
            <Row key={item}>Filtered result for "{item}"</Row>
        )
    }

    renderClearFiltersButton(){
        if(this.state.filtered){
            return(
                <ButtonComponent id="clearFilters" color="info" onClick={( ()=> this.clearFilters() )} className="float-sm-right" text='Clear Filters'/>
            )
        }
    }

    clearFilters(){
        this.setState({filtered_places:[],filtered:false,filterResultsInputString:"",filterItems:[]})
    }

    renderPlaces(){
        let locationsToDisplay = null;
        if(this.state.filtered){
            locationsToDisplay = this.state.filtered_places;
        } else {
            locationsToDisplay = this.props.places;
        }
        if(this.props.places.length > 0){
            return(
                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationsToDisplay.map((location, index) => (this.createRow(location, index)))}
                    </tbody>
                </Table>
            );
        } else {
            return "No locations found";
        }
    }

    createRow(location, index){
        let mapClickInfo = {
            "latlng": {
                "lat" : location.latitude,
                "lng" : location.longitude
            },
            "name": location.name,
            "type": location.type
        };
        return(
            <tr key={index}>
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td><Button id='addLocationButton' className="float-right" color="primary"
                            onClick={(() => this.props.addLocation(mapClickInfo))}>Add</Button></td>
            </tr>
        );
    }

    setFilterResultsInputString(onChangeEvent){
        const inputText = onChangeEvent.target.value;
        this.setState({filterResultsInputString: inputText});
    }

    filterResults(inputString){
        let filtered_places_local = [];
        let locationsToFilter = null;
        if(this.state.filtered){
            locationsToFilter = this.state.filtered_places;
        } else {
            locationsToFilter = this.props.places;
        }
        this.setState({filtered: true});

        Object.values(locationsToFilter).forEach( place => {
            Object.values(place).forEach( detail => {
                if(detail.includes(inputString)){
                    filtered_places_local.push(place)
                }
            })
        });
        let newFilterItems = this.state.filterItems
        newFilterItems.push(inputString);
        this.setState({filtered_places:filtered_places_local,filterResultsInputString:"",filterItems:newFilterItems});
    }
}
