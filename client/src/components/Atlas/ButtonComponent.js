import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'leaflet/dist/leaflet.css';

export default class ButtonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Button
                id={this.props.id}
                color={this.props.color}
                onClick={this.props.onClick}
                className={this.props.className}
            >
                {this.props.text}
            </Button>
        );
    }
}
