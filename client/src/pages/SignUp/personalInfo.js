import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

const GreenRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color='default' {...props} />);

export default function Personal() {
  const classes = useStyles();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [rPass, setRpass] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');

  
  function onSave() {
    if (pass === rPass) {
      while(creds.length !== 0) {
        creds.pop();
      }

      creds.push(fname);
      creds.push(lname);
      creds.push(email);
      creds.push(phone);
      creds.push(pass);
      creds.push(rPass);
      creds.push(city);
      creds.push(uf);
      creds.push(bio);
      creds.push(gender);

      Swal.fire({
        icon: 'success',
        text: 'Credenciais Salvas com Sucesso!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Senhas Não conferem'
      });
      setPass('');
      setRpass('');
    }
  }

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Informações Pessoais
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin} 
            required
            id='firstName'
            name='firstName'
            label='Primeiro Nome'
            fullWidth
            autoComplete='fname'
            value={fname}
            onChange={e => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='lastName'
            name='lastName'
            label='Último Nome'
            fullWidth
            autoComplete='lname'
            value={lname}
            onChange={e => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='phone'
            name='phone'
            label='Telefone'
            fullWidth
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='password'
            name='password'
            label='Senha'
            type='password'
            fullWidth
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='rpass'
            name='rpass'
            label='Redigite a Senha'
            type='password'
            fullWidth
            value={rPass}
            onChange={e => setRpass(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='city'
            name='city'
            label='Cidade'
            fullWidth
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='state' 
            name='state' 
            label='UF' 
            fullWidth
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CssTextField
            className={classes.margin}
            required
            id='bio'
            name='bio'
            label='Bio'
            fullWidth
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Gênero</FormLabel>
            <RadioGroup aria-label='gender' name='gender1' value={gender} onChange={e => setGender(e.target.value)}>
              <FormControlLabel value='F' control={<GreenRadio />} label='Feminino' />
              <FormControlLabel value='M' control={<GreenRadio />} label='Masculino' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            size='small'
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={onSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
