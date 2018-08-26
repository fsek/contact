import React, { Component } from 'react';
import styles from './styles.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleOuterClick = this.handleOuterClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOuterClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOuterClick);
  }

  handleOuterClick(event) {
    const { onOuterClick } = this.props;

    if (this.innerContentRef && !this.innerContentRef.contains(event.target)) {
      if (onOuterClick) onOuterClick();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className={styles.overlay} />
        <div ref={(ref) => { this.innerContentRef = ref; } }>
          {children}
        </div>
      </div>
    );
  }
}

export { Modal as default };
