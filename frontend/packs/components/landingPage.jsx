import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button, Panel } from 'react-bootstrap';
import NavBar from './navbar/index';
import Footer from './footer/index';
import MessageForm from './MessageForm';
import styles from './navbar.css';
import headerStyle from './header.css';

export  default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formUp: false,
      currentContact: null,
      contactName: null
    };

    this.contactFoset = this.contactFoset.bind(this);
    this.contactLibu = this.contactLibu.bind(this);
    this.setFormVisibility = this.setFormVisibility.bind(this);
  }

  contactFoset() {
    this.setState({
      formUp: true,
      currentContact: 1,
      contactName: 'Föset'
    });
  }

  contactLibu() {
    this.setState({
      formUp: true,
      currentContact: 2,
      contactName: 'Liakabehandlinsutskottet'
    });
  }

  setFormVisibility(visible) {
    this.setState({ formUp: visible });
  }

  render() {
    const { formUp, currentContact, contactName } = this.state;

    return (
      <div>
        <MessageForm visible={formUp} contact={currentContact} name={contactName} setVisibility={this.setFormVisibility} />
        <NavBar/>
        <Jumbotron className={styles.orange}>
          <div className="container">
            <Grid>
              <Row>
                <Col xs={12} md={6} className={headerStyle.center}>
                  <h1>F-sektionen</h1>
                  <h2>Anonym kontaktsida</h2>
                  <br/>
                  <h4>Här kan du enkelt och <strong>anonymt</strong> kontakta <strong>föset</strong> eller</h4>
                  <h4><strong>likabehandlingsutskottet</strong> och även få svar.</h4>
                </Col>
                <Col xs={12} md={6} className={headerStyle.center}>
                  <img src={require('./mail.svg')} height={200} />
                </Col>
              </Row>
            </Grid>
          </div>
        </Jumbotron>

        <Jumbotron className={headerStyle.white}>
          <Grid>
            <Row>
              <Col xs={12} md={6}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">Föset</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body display="block">
                    <Button bsStyle="primary" onClick={this.contactFoset}>Kontakta</Button>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={12} md={6}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">Likabehandlingsutskottet</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Button bsStyle="primary" onClick={this.contactLibu}>Kontakta</Button>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>

        <Jumbotron className={headerStyle.blue}>
          <div className="container">
            <Grid>
              <Row>
                <Col xs={12} md={6} className={headerStyle.center}>
                  <img src={require('./secret.svg')} height={175} />
                </Col>
                <Col xs={12} md={6} className={headerStyle.center}>
                  <h2>Hur fungerar det?</h2>
                  <br/>
                  <h4>När du kontaktar oss behöver du inte ange några uppgifter om dig själv. Om du vill ha svar skapas en slumpmässigt genererad länk som kan användas för vidare kommunikation.</h4>
                </Col>
              </Row>
            </Grid>
          </div>
        </Jumbotron>
        <Footer/>
      </div>
    );
  }
}
