import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import styles from './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <Navbar fixedBottom={true} className={styles.navbar}>
        <Navbar.Text className={styles.copyright}>
          Copyright © F-sektionen inom TLTH, 2018.

        </Navbar.Text>
        <Navbar.Text className={styles.right}>
          Icons by Twiter from www.flaticon.com
        </Navbar.Text>
      </Navbar>
    )
  }
}
