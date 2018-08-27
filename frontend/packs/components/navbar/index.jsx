import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './navbar.css';

export default class MyNav extends Component {
  render() {
    const loginBtnClass = `${styles.login} navbar-btn`;

    return (
      <Navbar className={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img src={require('./f.png')} className={styles.navicon} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">
              Start
            </NavItem>
          </Nav>
          <Nav pullRight>
            <Link to="/logga_in">
              <Button className={loginBtnClass}>
                <NavItem eventKey={3}>
                  Logga in
                </NavItem>
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
