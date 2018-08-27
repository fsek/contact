import React, { Component } from 'react';
import { Alert, FormControl, ControlLabel } from 'react-bootstrap';
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
      contact: null,
      buttonActive: true,
      respondLink: null
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
    this.setState({ buttonActive: false });

    const csrf_token = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const result = await axios.post(
        `${window.location.origin}/api/conversations`,
        {
          user_id: this.state.contact,
          message: this.state.content
        },
        {
          headers: { 'X-CSRF-Token': csrf_token }
        }
      );

      if (result && result.status === 200) {
        const { reference, password } = result.data;
        const respondLink =
          `${window.location.origin}/meddelanden?reference=${reference}&password=${password}`;
        this.setState({ buttonActive: true, respondLink, content: '' });

        return;
      }
    } catch(error) {
      console.log(error);
    }

    this.setState({ error: true, buttonActive: true });
  }

  closeModal() {
    const { setVisibility } = this.props;

    this.setState({ respondLink: null });
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

  renderContent() {
    const { content, buttonActive, respondLink } = this.state;

    if (respondLink) {
      return (
        <div>
          <b><h4>Meddelandet har skickats!</h4></b>
          <p>Glöm inte att kopiera länken nedan om du vill kunna läsa mottagarens svar och fortsätta konversationen.</p>
          <ControlLabel>Länk</ControlLabel>
          <FormControl type="text" value={respondLink} readOnly />
        </div>
      );
    }

    const alert = this.renderAlert();

    // Render the message form
    return (
      <div className={styles.formContainer}>
        <p className={styles.receiver}>Kontakta {name}</p>
        {alert}
        <form className={styles.form} onSubmit={this.onSubmit}>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={this.onChange}
          />
          <input disabled={!buttonActive} type="submit" value="Skicka" />
        </form>
      </div>
    );
  }

  render() {
    const { visible, name } = this.props;
    if (!visible) return <div />;

    const content = this.renderContent();

    return (
      <Modal onOuterClick={this.closeModal}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            {content}
          </div>
        </div>
      </Modal>
    );
  }
}

export { MessageForm as default };
