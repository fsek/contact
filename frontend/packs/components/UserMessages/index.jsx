import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import NavBar from '../navbar/index';
import MessageItem from '../MessageItem';
import queryString from 'query-string';
import axios from 'axios';
import ResponseForm from '../ResponseForm';
import styles from './styles';

class UserMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.onSend = this.onSend.bind(this);
  }

  async getMessages() {
    const { reference, password } = this;
    const { history } = this.props;

    try {
      const result =
        await axios.get(`${window.location.origin}/api/conversation?reference=${reference}&password=${password}`);

      const { data } = result;

      if (data) {
        this.setState({ data });
        return;
      }
    } catch(error) {
      console.error(error);
    }

    history.push('/');
  }

  componentDidMount() {
    const { location, history } = this.props;
    const values = queryString.parse(location.search);
    const { reference, password } = values;

    if (reference && password) {
      this.reference = reference;
      this.password = password;
      this.getMessages();
    } else {
      history.push('/');
    }
  }

  async onSend(content) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
    const { reference, password } = this;

    try {
      const result = await axios.post(
        `${window.location.origin}/api/messages`,
        {
          reference,
          password,
          content
        },
        {
          headers: { 'X-CSRF-Token': csrf_token }
        }
      );

      this.getMessages();

      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  render() {
    const { data } = this.state;
    if (data === null) return <div />;

    const messages = data.map(message =>
      <MessageItem key={message.id} content={message.content} author={message.author} />
    );

    return (
      <div>
        <NavBar />
        <Grid className={styles.content}>
          <Row>
            {messages}
            <ResponseForm onSend={this.onSend} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export { UserMessages as default };
