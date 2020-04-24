import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

import Swal from 'sweetalert2';
import { creds } from './index';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.3),
    backgroundColor: '#34C796',
    color: '#fff'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

export default function Social() {
  const classes = useStyles();

  const [fb, setFb] = useState('');
  const [twitter, setTwitter] = useState('');
  const [ig, setIg] = useState('');

  function onSave() {
    creds.push(fb);
    creds.push(twitter);
    creds.push(ig);

    Swal.fire({
      icon: 'success',
      text: 'Redes Sociais Salvas com Sucesso!'
    })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Redes Sociais
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <CssTextField
            className={classes.margin}
            id="facebook"
            name="FB"
            label="Cole o Link da sua Conta do Facebook"
            fullWidth
            value={fb}
            onChange={e => setFb(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            className={classes.margin}
            id="twitter"
            name="TW"
            label="Cole o Link da sua Conta do Twitter"
            fullWidth
            value={twitter}
            onChange={e => setTwitter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            className={classes.margin}
            id="ig"
            name="IG"
            label="Cole o Link da sua Conta do Instagram"
            fullWidth
            value={ig}
            onChange={e => setIg(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
