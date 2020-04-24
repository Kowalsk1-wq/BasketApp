import React, { Component } from 'react';

import { Container } from './styles';

import Map from '../../components/Map';

export default class Dash extends Component {
  render() {
    return (
      <Container>
        <Map />
      </Container>
    );
  }
}
