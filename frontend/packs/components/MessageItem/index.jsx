import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class MessageItem extends Component {
  render() {
    const { content, author } = this.props;

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            {author}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {content}
        </Panel.Body>
      </Panel>
    );
  }
}

export { MessageItem as default };
