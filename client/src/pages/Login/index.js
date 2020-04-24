import React, { Component } from 'react';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import { login } from '../../services/auth';

import avatar from '../../assets/img/avatar.svg';
import bg from '../../assets/img/bg.svg';
import wave from '../../assets/img/wave.png';

import './styles.css';


class Login extends Component {
  state = {
    id: '',
    password: '',
    error: ''
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { id, password } = this.state;

    if (!id || !password) {
      this.setState({ error: 'Preencha o EnvID e a senha para continuar!' });
    } else {
      try {
        const response = await api.post('/users/auth', { id, password });
        const user = await api.get('/users', {
          headers: { 'x-access-token' : response.data.token }
        });
        login(response.data.token, user.data.me);
        this.props.history.push('/app');
      } catch (err) {
        this.setState({
          error:
            'Houve um problema com o login, verifique suas credenciais!'
        });
      }
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
            <form onSubmit={this.handleSignIn}>
              <img src={avatar} alt='Avatar' />
              <h2 className='title'>Bem-Vindo</h2>
              <div className='input-div one'>
                <div className='i'>
                  <i className='fas fa-user'></i>
                </div>
                <div className='div'>
                  {this.state.id === '' ? <h5 id='envidH5'>EnvID</h5> : ''}
                  <input
                    name='envId'
                    type='text'
                    className='input'
                    onChange={e => this.setState({ id: e.target.value })}
                  />
                </div>
              </div>
              <div className='input-div pass'>
                <div className='i'>
                  <i className='fas fa-lock'></i>
                </div>
                <div className='div'>
                  {this.state.password === '' ? <h5>Senha</h5> : ''}
                  <input
                    name='pass'
                    type='password'
                    className='input'
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
              </div>
              {this.state.error && <p style={{color: '#fc0317', marginTop: '8px'}}>{this.state.error}</p>}
              <a href='/'>Esqueceu a Senha?</a>
              <a id='cad' href='/signup'>
                <FiLogIn size={14} color='#E02041' style={{ marginRight: '8px' }} />
                Não Tenho Cadastro
              </a>
              <input type='submit' className='btn' value='Login' />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
