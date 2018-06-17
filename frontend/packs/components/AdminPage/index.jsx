import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

import AdminNavbar from '../AdminNavbar';
import ConversationItem from '../ConversationItem';
import styles from './styles.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      conversationsLoaded: false
    };
  }

  componentDidMount() {
    this.getConversations();
  }

  async getConversations() {
    const result = await axios.get('http://localhost:5000/api/admin_conversations');
    const { data } = result;

    if (data) {
      console.log(data);
      this.setState({ conversations: data });
    }
  }

  render() {
    const { conversations, conversationsLoaded } = this.state;
    const conv = conversations.map(c =>
      <ConversationItem key={c.id} updated_at={c.updated_at} id={c.id} />
    );

    return (
      <div className={styles.container}>
        <AdminNavbar />
        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <ListGroup>
                {conv}
              </ListGroup>
            </Col>
            <Col xs={6} md={9}>
              Message content
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export { AdminPage as default };
