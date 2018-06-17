import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './navbar.css';

export default class AdminNavbar extends Component {
  render() {
    return (
      <Navbar className={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">
              <img src={require('./f.png')} className={styles.navicon} />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
