import React, { Component } from 'react';
import NavBar from './navbar/index';
import Footer from './footer/index';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar/>
          {this.props.children}
        <Footer/>
      </div>
    )
  }
}
