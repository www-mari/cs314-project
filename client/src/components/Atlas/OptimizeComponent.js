import React, { Component } from 'react';
import {InputGroup} from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import ButtonComponent from './ButtonComponent';
import {executeOptimizeTrip} from "../../utils/restfulAPI";

export default class OptimizeComponent extends Component {

    constructor(props) {
        super(props);
        this.renderOptimizeButton = this.renderOptimizeButton.bind(this);
        this.addLocation = this.props.addLocation.bind(this);
        this.clearLocationTable = this.props.clearLocationTable.bind(this);
        // this.removeRowandClear = this.props.removeRowandClear.bind(this);

        this.state={
            locations: this.props.locations,
            showMessage: this.props.showMessage,
            optimized_places: [],
        }
    }

    render() {
        return (
            <InputGroup className="mt-2">
                {this.renderOptimizeButton(this.optimizeTrip)}
            </InputGroup>
        );
    }

    renderOptimizeButton(clickToOptimizeTrip){
        return(
                <ButtonComponent
                    id='optimizeButton'
                    color="info"
                    onClick={(() => clickToOptimizeTrip.apply(this) )}
                    text="Optimize"
                />
        );
    }

    async optimizeTrip(){   
        let response = await executeOptimizeTrip(this.state.locations, this.props.serverSettings);     
        this.processTourResponse(response);
    }

    processTourResponse(response){
        this.clearLocationTable();
        //addLocations in reverse order from response.places
        for(let i = 0; i < response.places.length; i++){
            this.addLocation({latlng:{lat:response.places[i].latitude,lng:response.places[i].longitude}})

        }

    }
}
