import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardImg, CardText, CardTitle} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

import ZachBioPic from '../../static/images/zach.bio.jpg';
import SarahBio from '../../static/images/SarahBio.jpg';
import LindseyBio from '../../static/images/lindsey.bio.jpg';
import TeamImage from '../../static/images/t04.logo.jpg';
import MariBio from '../../static/images/mari.bio.jpg';
import NickBio from '../../static/images/nickBio.jpg';

export default class About extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>{CLIENT_TEAM_NAME}</h2>
                    </Col>
                    <Col xs="auto">
                        <Button color="primary" onClick={this.props.closePage} xs={1}>Close</Button>
                    </Col>
                </Row>
                    <Row><CardImg width="100%" src={TeamImage} alt="Team Image"/></Row>
                <Row>
                    <Col>
                        <strong>Mission Statment: </strong> Our mission is to create a user-friendly application to take all the stress away from trip planning. We are committed to developing a product that exceeds expectations. So, relax and enjoy your bar-hopping adventure! 
                    </Col>
                </Row>
                {this.renderCards()}
            </Container>
        );
    }
    renderCards(){
        return(
            <Row xs="1" sm="2" md="3" lg="4" xl="5">
                {this.renderBios(LindseyBio, "Lindsey Image", "Lindsey Nielsen", "I'm Lindsey, a second year at CSU majoring in computer science with a minor in mathematics.")}
                {this.renderBios(NickBio, "Nick Image", "Nick Lertola", "I'm Nick, a senior majoring in Applied Computing Technology.")}
                {this.renderBios(SarahBio, "Sarah Image", "Sarah Walz", "I'm Sarah, a junior at CSU majoring in Computer Science with a minor in Conservation Biology.")}
                {this.renderBios(MariBio, "Mari Image", "Mari Dudek", "I'm Mari, a senior at CSU majoring in computer science.")}
                {this.renderBios(ZachBioPic, "Zach Image", "Zach Aubin","I'm Zach, a Computer Science Major planning to graduate this semester.")}
            </Row>
        );
    }
    renderBios(pic, alttext, name, bio){
        return(
            <Col>
                <Card body>
                    <CardImg top width="100%" src={pic} alt={alttext} />
                    <CardTitle className="text-center" tag="h5">{name}</CardTitle>
                    <CardText>{bio}</CardText>
                </Card>
            </Col>
        );
    } 
}
