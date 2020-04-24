import React, { Component } from 'react';

import { Container, Title, Button } from './styles';

export default class PageNotFound extends Component {
  render() {
    return (
      <Container>
        <Title>Página Não Encontrada</Title>
        <Button onClick={() => this.props.history.push('/app')}>Voltar</Button>
      </Container>
    );
  }
}
