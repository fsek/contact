import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import Modal from '../Modal';
import styles from './styles.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      withResponse: false,
      error: false,
      contact: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onChange(event) {
    this.setState({ content: event.target.value });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contact !== prevState.contact) {
      return {
        contact: nextProps.contact,
        content: ''
      };
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const result = await axios.post(
        'http://localhost:5000/api/conversations',
        {
          user_id: this.state.contact,
          message: this.state.content
        },
        {
          headers: { 'X-CSRF-Token': csrf_token }
        }
      );

      if (result && result.status === 200) {
        // Close the modal
        this.closeModal();
        return;
      }
    } catch(error) {
      console.log(error);
    }

    this.setState({ error: true });
  }

  closeModal() {
    const { setVisibility } = this.props;
    setVisibility(false);
  }

  renderAlert() {
    const { error } = this.state;
    if (!error) return <div />;

    return (
      <Alert bsStyle="danger">
        <b>Fel </b>
        Kunde inte skicka meddelandet.
      </Alert>
    );
  }

  render() {
    const { visible, name } = this.props;
    const { content } = this.state;

    if (!visible) return <div />;

    const alert = this.renderAlert();

    return (
      <Modal onOuterClick={this.closeModal}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <p className={styles.receiver}>Kontakta {name}</p>
            {alert}
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
      </Modal>
    );
  }
}

export { MessageForm as default };
