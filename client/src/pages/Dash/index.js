import React, { Component } from 'react';
import { FaHome, FaPaperPlane, FaCompass, FaHeart } from 'react-icons/fa';

import { Container, NavBar, SearchBox, Tabs, Body } from './styles';

import FeedCard from '../../components/FeedCard';
import InfoUser from '../../components/InfoUser';

export default class Dash extends Component {
  render() {
    return (
      <Container>
        <NavBar>
          <p>Env<strong>.X</strong></p>
          <SearchBox>
            <input type='text' placeholder='           &#xF002;   Pesquisa' />
          </SearchBox>
          <Tabs>
            <ul>
              <li><a href=''><FaHome size={28} className='icon' /></a></li>
              <li><a href=''><FaPaperPlane size={28} className='icon' /></a></li>
              <li><a href=''><FaCompass size={28} className='icon' /></a></li>
              <li><a href=''><FaHeart size={28} className='icon' /></a></li>
              <li><a href=''><img className='prof' src='https://media-exp1.licdn.com/dms/image/C4D03AQFcL-ngo8rATg/profile-displayphoto-shrink_200_200/0?e=1593648000&v=beta&t=WKiF69GzjeauRcyNmFAROZ_5Mxxzqqi-s8iX7cKZHEE' alt='Foto do Perfil'/></a></li>
            </ul>
          </Tabs>
        </NavBar>
        <Body>
          <FeedCard />
          <InfoUser />
        </Body>
      </Container>
    );
  }
}
