import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';

class ConversationItem extends Component {
  static printDate(string) {
    const date = new Date(string);

    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const day = [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');

    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    const time = `${hours}:${minutes}`;
    return `${day} ${time}`;
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { setMessage, id } = this.props;
    setMessage(id);
  }

  render() {
    const { updated_at, currentConversation, id } = this.props;
    const date = ConversationItem.printDate(updated_at);
    const active = currentConversation === id;

    return (
      <ListGroupItem header={date} href="#" onClick={this.onClick} active={active} />
    );
  }
}

export { ConversationItem as default };
