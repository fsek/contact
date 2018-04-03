import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import Layout from './layout';
import styles from './navbar.css';
import headerStyle from './header.css';

export  default class Test extends Component {

  render() {
    return (
      <Layout>
        Hallå
      </Layout>
    )
  }
}
