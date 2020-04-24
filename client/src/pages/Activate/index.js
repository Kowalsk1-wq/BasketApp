import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { LockOpen } from '@material-ui/icons';

import Swal from 'sweetalert2';

import { response } from '../SignUp/index';

import api from '../../services/api';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.3),
    backgroundColor: '#34C796',
    color: '#fff'
  },
}));

async function onActive() {
  try {
    await api.post('/users/auth/activate', '', { 
      headers: {'x-access-id': response[0].id} 
    });

    Swal.fire({
      icon: 'success',
      text: 'Conta Ativada com Sucesso!'
    });
  } catch (err) {
    console.log(err);
  }
}

const Activate = () => {
  const classes = useStyles();
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-bg">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>Parabéns :)</h1>
        <h2>O Email <strong>{response[0].email}</strong> Está Cadastrado com Sucesso!</h2>
        <p>Clique no botão abaixo para ativar a sua conta, e logo após entre no seu email e resgate o seu EnvID!</p>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<LockOpen />}
          onClick={onActive}
        >
          Ativar Agora!
        </Button>
      </div>
    </div>
  );
}

export default Activate;
