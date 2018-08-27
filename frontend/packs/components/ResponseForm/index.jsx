import React, { Component } from 'react';
import { Alert, Panel } from 'react-bootstrap';
import styles from './styles.css';

class ResponseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      error: false,
      formActive: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ content: event.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ formActive: false });

    const { onSend } = this.props;
    const { content } = this.state;
    const result = await onSend(content);

    if (result) {
      this.setState({ error: false, formActive: true, content: '' });
    } else {
      this.setState({ error: true, formActive: true });
    }
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
    const { content, formActive } = this.state;
    const alert = this.renderAlert();

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Skicka meddelande</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {alert}
          <form className={styles.form} onSubmit={this.onSubmit}>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={this.onChange}
              rows={5}
            />
            <input disabled={!formActive} type="submit" value="Skicka" />
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

export { ResponseForm as default };
