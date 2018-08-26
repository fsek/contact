import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import ConversationItem from '../ConversationItem';
import styles from './styles.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      conversationsLoaded: false,
      message: null,
      authenticated: null
    };

    this.setMessage = this.setMessage.bind(this);
  }

  async componentDidMount() {
    const authenticated = await this.checkIfAuthenticated();

    if (authenticated) {
      this.setState( { authenticated: true } );
      this.getConversations();
    } else {
      this.setState({ authenticated: false });
    }
  }

  async checkIfAuthenticated() {
    try {
      const result = await axios.get(`${window.location.origin}/api/users/check_auth`);

      if (result && result.status === 200) {
        return true;
      }
    } catch(error) {
      console.error(error);
    }

    return false;
  }

  async getConversations() {
    const result = await axios.get(`${window.location.origin}/api/admin_conversations`);
    const { data } = result;

    if (data) {
      this.setState({ conversations: data });
    }
  }

  async setMessage(id) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
    const result = await axios.get(
      `${window.location.origin}/api/admin_conversations/${id}`,
      {
        headers: { 'X-CSRF-Token': csrf_token }
      }
    );

    if (result.data) {
      this.setState({ message: result.data });
    }
  }

  renderMessage() {
    const { message } = this.state;

    if (!message) return <div/>;

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            Meddelande
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {message}
        </Panel.Body>
      </Panel>
    );
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated === null) {
      return <div />;
    } else if (authenticated === false) {
      return <Redirect to={{ pathname: '/logga_in' }} />;
    }

    const { conversations, conversationsLoaded } = this.state;
    const { history } = this.props;
    const messageView = this.renderMessage();
    const conv = conversations.map(c =>
      <ConversationItem key={c.id} updated_at={c.updated_at} id={c.id} setMessage={this.setMessage} />
    );

    return (
      <div className={styles.container}>
        <AdminNavbar history={history} />
        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <ListGroup>
                {conv}
              </ListGroup>
            </Col>
            <Col xs={6} md={9}>
              {messageView}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export { AdminPage as default };
