import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './navbar.css';

export default class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    const { history } = this.props;
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
    await axios.delete(
      `${window.location.origin}/users/sign_out`,
      {
        headers: { 'X-CSRF-Token': csrf_token }
      }
    );

    history.push('/');
  }

  render() {
    const logoutBtnClass = `${styles.logout} navbar-btn`;

    return (
      <Navbar className={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img src={require('./f.png')} className={styles.navicon} />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <a href="#" onClick={this.signOut}>
            <Button className={logoutBtnClass}>
              <NavItem eventKey={3}>
                Logga ut
              </NavItem>
            </Button>
          </a>
        </Nav>
      </Navbar>
    );
  }
}
