import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Col, Button, Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import style from './sign_in.css';

export  default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.signIn = this.signIn.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  async signIn(event) {
    event.preventDefault();

    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
    const result = await axios.post(
      'http://localhost:5000/users/sign_in',
      {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      },
      {
        headers: { 'X-CSRF-Token': csrf_token }
      }
    );

    console.log(result);
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

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
                  <FormControl type="email" onChange={this.setEmail} />
                </FormGroup>
                <FormGroup bsSize="lg">
                  <ControlLabel>Lösenord:</ControlLabel>
                  <FormControl type="password" onChange={this.setPassword} />
                </FormGroup>
                <Button type="submit" onClick={this.signIn}>Logga in</Button>
              </form>
            </Panel.Body>
          </Panel>
        </Col>
      </Grid>
    );
  }
}
