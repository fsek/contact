import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import ConversationItem from '../ConversationItem';
import MessageItem from '../MessageItem';
import ResponseForm from '../ResponseForm';
import styles from './styles.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      currentConversation: null,
      messages: null,
      authenticated: null
    };

    this.setMessage = this.setMessage.bind(this);
    this.onResponseSend = this.onResponseSend.bind(this);
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
      this.setState({ messages: result.data, currentConversation: id });
    }
  }

  async onResponseSend(content) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
    const { currentConversation } = this.state;

    try {
      const result = await axios.post(
        `${window.location.origin}/api/admin_conversations/${currentConversation}/messages`,
        {
          content
        },
        {
          headers: { 'X-CSRF-Token': csrf_token }
        }
      );

      this.setMessage(currentConversation);

      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  renderMessages() {
    const { messages } = this.state;

    if (!messages) return <div/>;

    const messageItems = messages.map(message =>
      <MessageItem key={message.id} content={message.content} author={message.author} />
    );

    return (
      <div>
        {messageItems}
        <ResponseForm onSend={this.onResponseSend} />
      </div>
    );
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated === null) {
      return <div />;
    } else if (authenticated === false) {
      return <Redirect to={{ pathname: '/logga_in' }} />;
    }

    const { conversations, currentConversation } = this.state;
    const { history } = this.props;
    const messageView = this.renderMessages();
    const conversationItems = conversations.map(conversation =>
      <ConversationItem
        key={conversation.id}
        updated_at={conversation.updated_at}
        id={conversation.id}
        setMessage={this.setMessage}
        currentConversation={currentConversation}
      />
    );

    return (
      <div className={styles.container}>
        <AdminNavbar history={history} />
        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <ListGroup>
                {conversationItems}
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
