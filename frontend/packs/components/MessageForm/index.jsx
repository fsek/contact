import React, { Component } from 'react';
import axios from 'axios';

import styles from './styles.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      withResponse: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ content: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
    const result = axios.post(
      'http://localhost:5000/api/conversations',
      {
        user_id: 2,
        message: this.state.content
      },
      {
        headers: { 'X-CSRF-Token': csrf_token }
      }
    );

    console.log(result.data);
  }

  render() {
    const { visible, contact, name } = this.props;
    const { content } = this.state;

    if (!visible) return <div />;

    return (
      <div>
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <p className={styles.receiver}>Kontakta {name}</p>
            <form className={styles.form} onSubmit={this.onSubmit}>
              <textarea
                className={styles.textarea}
                value={content}
                onChange={this.onChange}
              />
              <input type="submit" value="Skicka" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export { MessageForm as default };
