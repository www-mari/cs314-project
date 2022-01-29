import React, { Component } from "react";

import { Collapse } from "reactstrap";

import Header from "./Margins/Header";
import Footer from "./Margins/Footer";
import About from "./About/About";
import Atlas from "./Atlas/Atlas";

import {LOG} from "../utils/constants";
import * as configSchema from "../../schemas/ConfigResponse";
import { getOriginalServerPort, isJsonResponseValid, sendServerRequest } from "../utils/restfulAPI";
import * as findSchema from "../../schemas/FindResponse.json";

export default class Page extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showAbout: false,
			serverSettings: {
				serverPort: getOriginalServerPort(), 
				serverConfig: null
			},
		};

		this.toggleAbout = this.toggleAbout.bind(this);
		this.processServerConfigSuccess = this.processServerConfigSuccess.bind(this);

		sendServerRequest({requestType: "config"}, this.state.serverSettings.serverPort)
			.then(configResponse => {
				if (configResponse) {
					this.processResponse(configResponse);
				} else {
					this.props.showMessage("The Request To The Server Failed. Please Try Again Later.", "error");
				}
			});
	}

	render() {
		return (
			<>
				<Header toggleAbout={this.toggleAbout}/>
				{this.renderAbout()}
				{this.renderAtlas()}
				<Footer
					serverSettings={this.state.serverSettings}
					processServerConfigSuccess={this.processServerConfigSuccess}
				/>
			</>
		);
	}

	renderAbout() {
		return(
			<Collapse isOpen={this.state.showAbout}>
				<About closePage={this.toggleAbout}/>
			</Collapse>
		);
	}

	renderAtlas() {
		console.log("Server Port: " + this.state.serverSettings.serverPort);
		return (
			<Collapse isOpen={!this.state.showAbout}>
				<Atlas showMessage={this.props.showMessage}
					toggleAbout={this.toggleAbout} 
					serverSettings={this.state.serverSettings}/>
			</Collapse>
		);
	}

	toggleAbout() {
		this.setState({showAbout: !this.state.showAbout});
	}

	processResponse(response) {
		//checks response against schemas, executes what each should do?
		if (isJsonResponseValid(response, configSchema)) {
			this.processServerConfigSuccess(response);
		} else if(isJsonResponseValid(response, findSchema)) {////////////////////////TODO: what does find actually change
			// this.processServerConfigSuccess(response);   this.processFind?

		} else {
			this.processServerConfigError("Server (Configuration) Response Not Valid. Check The Server.");
		}
	}

	processServerConfigSuccess(config, port=this.state.serverSettings.serverPort) {
		LOG.info("Switching to Server:", this.state.serverSettings.serverPort);
		const updatedSettings = { serverConfig: config, serverPort: port };
		this.setState({serverSettings: updatedSettings});
	}

	processServerConfigError(message) {
		LOG.error(message);
		const updatedSettings = Object.assign(this.state.serverSettings);
		updatedSettings.serverConfig = null;
		this.setState({serverSettings: updatedSettings});
		this.props.showMessage(message, "error");
	}
}