import React, { Component } from 'react';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import bg from '../../assets/img/bg.svg';
import wave from '../../assets/img/wave.png';

import './styles.css';

import Personal from './personalInfo';
import ProfileMedia from './profile';
import Social from './socialInfo';

export const creds = [];
export const response = [];

class SignUp extends Component {
  state = {
    step: 0,
    error: ''
  }

  handleNext = async e => {
    e.preventDefault();
    if (this.state.step !== 2) {
      this.setState({ step: this.state.step + 1 })
    } else this.handleSignUp();
  }

  handleSignUp = async () => {
    console.log(creds);
    const data = {
      firstName: creds[0],
      lastName: creds[1],
      email: creds[2],
      password: creds[4],
      phone: creds[3],
      bio: creds[8],
      gender: creds[9],
      city: creds[6],
      uf: creds[7],
      fbLink: creds[10],
      twLink: creds[11],
      igLink: creds[12]
    };

    try {
      const res = await api.post('/users', data);
      response.push(res.data);
      this.props.history.push('/activate');
      console.log(response.data);
    } catch (err) {
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao registrar sua conta!' });
    }
  }

  render() {
    return (
      <>
        <img src={wave} className='wave' alt='Wave' />
        <div className='container'>
          <div className='img'>
            <img src={bg} alt='BackGround' />
          </div>
          <div className='login-content'>
            <form>
              <h2 className='title'>Cadastre-se</h2>
              {this.state.step === 0 ? <Personal /> : this.state.step === 1 ? <ProfileMedia /> : this.state.step === 2 ? <Social /> : ''}
              {this.state.error && <p style={{color: '#fc0317'}}>{this.state.error}</p>}
              <a style={{ marginTop: '30px' }} id='cad' href='/signin'>
                <FiLogIn size={14} color='#E02041' style={{ marginRight: '8px' }} />
                Já Tenho Cadastro
              </a>
              <input onClick={this.handleNext} type='submit' className='btn' value={this.state.step !== 1 ? 'Próximo' : 'Cadastrar'} />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
