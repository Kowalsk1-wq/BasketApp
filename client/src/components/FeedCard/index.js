import React, { Component } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

import { Container, Card } from './styles';

export default class FeedCard extends Component {
  render() {
    return (
      <Container>
        <Card>
          <header>
            <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFcL-ngo8rATg/profile-displayphoto-shrink_200_200/0?e=1593648000&v=beta&t=WKiF69GzjeauRcyNmFAROZ_5Mxxzqqi-s8iX7cKZHEE" alt='Foto do Usuário'/>
            <h4>Hugo Lima</h4>
            <span>3 horas atrás</span>

            <a href=''><FaEllipsisH size={30} /></a>
          </header>
          <img src='https://i.imgur.com/fZjLyAo.jpg' />
        </Card>

        <Card>
          <header>
            <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFcL-ngo8rATg/profile-displayphoto-shrink_200_200/0?e=1593648000&v=beta&t=WKiF69GzjeauRcyNmFAROZ_5Mxxzqqi-s8iX7cKZHEE" alt='Foto do Usuário'/>
            <h4>Hugo Lima</h4>
            <span>3 horas atrás</span>

            <a href=''><FaEllipsisH size={30} /></a>
          </header>
          <img src='https://i.imgur.com/fZjLyAo.jpg' />
        </Card>
      </Container>
    );
  }
}

