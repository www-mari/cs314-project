import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";

import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/ConfigResponse";
import * as findSchema from "../../../schemas/FindResponse";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            currentServerConfig: {},
            config: {},
            currentServer : null
        };
        this.saveInputText = this.state.inputText;
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                {this.renderSettings(this.getCurrentServerName())}
                {this.renderFooterActions()}
            </Modal>
        );
    }

    renderSettings(currentServerName) {
        return (
            <ModalBody>
                <Row className="m-2">
                    <Col>
                        Name: {currentServerName}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={2}>
                        URL:
                    </Col>
                    <Col xs={10}>
                        {this.renderInputField()}
                    </Col>
                </Row>
                <Row>
                    {this.renderFeaturesTable()}
                </Row>
            </ModalBody>
        );
    }

    renderFeaturesTable(){
        if(this.state.validServer == true){
            return (
                <Table>
                    <thead>
                        <tr>
                            <th>Current Server Features:</th>
                            <th>Proposed Server Features:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.getProposedServer()}</td>
                            <td>{this.getCurrentServerName()}</td>
                        </tr>
                        {this.renderFeaturesList()}
                    </tbody>
                </Table>
            );
        }
        else{}
    }

    renderFeaturesList(){
        if(this.state.config.features == null || this.props.serverSettings.serverConfig.features == null){}
        else if(this.state.config.features != null && this.props.serverSettings.serverConfig.features != null){
            return(
                <tr>
                    <td>{this.splitUpFeaturesList(this.props.serverSettings.serverConfig.features)}</td>
                    <td>{this.splitUpFeaturesList(this.state.config.features)}</td>
                </tr>
            );
        }
        else if(this.props.serverSettings.serverConfig.features != null){
            return(
                <tr>
                    <td>{this.splitUpFeaturesList(this.props.serverSettings.serverConfig.features)}</td>
                </tr>
            );
        }
    }

    splitUpFeaturesList(features){
        let rtn = "";
        for(let i = 0; i < features.length - 1; i++){
            rtn += features[i] + ", ";
        }
        rtn += features[features.length - 1];
        return rtn;
    }

    getProposedServer(){
        return (this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.serverName) ? this.props.serverSettings.serverConfig.serverName : "Unknown";
    }

    renderInputField() {
        return(
            <Input id="inputURL" onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={this.state.validServer}
                   invalid={!this.state.validServer && this.state.validServer !== null}
            />
        );
    }

    renderFooterActions() {
        return (
            <ModalFooter>
                <Button id = "cancelbutton" color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                this.props.serverSettings.serverConfig.serverName : "";
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.serverName;
        }
        return currentServerName;
    }

    updateInput(url) {
        this.setState({inputText: url}, () => {
            if (this.shouldAttemptConfigRequest(url)) {
                this.sendRequest(url,"config");
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }

    // ex. sendRequest(url, "config")    OR    sendRequest(url, "find")
    sendRequest(destinationUrl,requestType) {
        this.setState({validServer: null});
        sendServerRequest({requestType: requestType}, destinationUrl)
            .then(response => {
                if (destinationUrl === this.state.inputText) {
                    if (response) {
                        this.processResponse(response);
                    } else {
                        this.setState({validServer: false, config: null});
                    }
                }
            });
    }

    processResponse(response) {
        //checks response against schemas, executes what each should do?
        if (isJsonResponseValid(response, configSchema)) {
            this.setState({validServer: true, config: response});
        } else if(isJsonResponseValid(response, findSchema)) {////////////////////////TODO: what does find actually change
            this.setState({validServer: true, config: response});//probably going to be something else
        } else {
            this.setState({validServer: false, config: false})
        }
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }


    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
