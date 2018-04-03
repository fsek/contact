import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Footer from '../footer/index';

import style from './sign_in.css'

export  default class SignIn extends Component {

  render() {
    return (
      <Grid className={style.container}>
        <Col xs={8} md={6}>
          <Panel className={style.panel}>
            <Panel.Body>
              <img src={require('./sektionsmarke.png')} className={style.logo}/>
              <form>
                <FormGroup bsSize="lg">
                  <ControlLabel>E-mail:</ControlLabel>
                  <FormControl type="email"/>
                </FormGroup>
                <FormGroup bsSize="lg">
                  <ControlLabel>Lösenord:</ControlLabel>
                  <FormControl type="password"/>
                </FormGroup>
                <Button type="submit">Logga in</Button>
              </form>
            </Panel.Body>
          </Panel>
        </Col>
      </Grid>
    )
  }
}
