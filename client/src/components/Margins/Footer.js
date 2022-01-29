import React, { Component } from "react";
import { Container } from "reactstrap";

import ServerSettings from "./ServerSettings";

const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";
const UNICODE_WARNING_SIGN = "\u26A0";
const UNKNOWN_SERVER_NAME = "Unknown";

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverSettingsOpen: false,
            currentServerName: null,
            //proposedSeverName: null
        };
        this.setCurrentServerStates = this.setCurrentServerStates.bind(this);
        this.setCurrentServerStates();
        //this.setProposedServerStates = this.setProposedServerStates.bind(this);

    }

    setCurrentServerStates(){
        const currServerName = this.getServerNameFromConnectionStatus();
        this.setState({currentServerName : currServerName});
    }

    // setProposedServerStates(propServerName){
    //     this.setState({proposedServerName : propServerName});
    // }

    render() {
        return (
            <div className="full-width footer">
                {this.renderServerInformation()}
            </div>
        );
    }

    renderServerInformation() {
        const serverName = this.getServerNameFromConnectionStatus();
        //this.setProposedServerStates(serverName);
        const linkStatusSymbol = this.getSymbolFromConnectionStatus();
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {linkStatusSymbol} Connected to {serverName} &nbsp;
                        <a className="tco-text" onClick={() => this.setState({serverSettingsOpen: true})}>
                            ({this.props.serverSettings.serverPort}).
                        </a>
                        {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
        );
    }

    getSymbolFromConnectionStatus() {
        return this.connectedToValidServer() ? UNICODE_LINK_SYMBOL : UNICODE_WARNING_SIGN;
    }

    getServerNameFromConnectionStatus() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.serverName : UNKNOWN_SERVER_NAME;
    }

    connectedToValidServer() {
        return this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.serverName;
    }

    renderServerSettings() {
        return (
            <ServerSettings
                currentServerName={this.state.currentServerName}
                getServerNameFromConnectionStatus={this.getServerNameFromConnectionStatus}
                isOpen={this.state.serverSettingsOpen}
                toggleOpen={(isOpen = !this.state.serverSettingsOpen) => this.setState({serverSettingsOpen: isOpen})}
                serverSettings={this.props.serverSettings}
                processServerConfigSuccess={this.props.processServerConfigSuccess}
            />
        );
    }
}
