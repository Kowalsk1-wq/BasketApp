<template>
  <q-page class="row items-center justify-evenly">
    <!-- multistep form -->
    <form id="msform" @submit="onSubmit" @reset="onReset">
      <!-- fieldsets -->
      <fieldset>
        <h2 class="fs-title">Entrar</h2>
        <h3 class="fs-subtitle">Preencha os Campos Abaixo!</h3>
        <input type="text" v-model="email" name="email" placeholder="Email" />
        <input type="password" v-model="pwd" name="pass" placeholder="Senha" />

        <q-toggle v-model="accept" label="Eu Aceito os Termos de Licença!" />

        <br>
        <div>
          <q-btn label="Entrar" type="submit" color="primary"/>
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </fieldset>
      
      <span @click="redirect('/auth-ong')" class="ong">És uma ONG?</span>
    </form>
  </q-page>
</template>

<script>
import { login } from '../../validators/auth'

export default {
  name: 'PageLogin',
  components: {},
  data() {
    return {
      email: null,
      pwd: null,

      accept: false
    }
  },

  methods: {
    onSubmit (e) {
      e.preventDefault();

      if (this.accept !== true) {
        alert('You need to accept the license and terms first');
      }
      else {
        this.$axios.post('http://localhost:4000/users/auth', {
          email: this.email,
          password: this.pwd
        }).then(response => {
          login(response.data.token, response.data.user);

          this.$router.push({path: '/app'});
        }).catch(err => {
          console.log(err);
        })
      }
    },

    onReset () {
      this.email = null
      this.pwd = null
      this.accept = false
    },

    redirect (link) {
      this.$router.push({ path: link });
    }
  }
}
</script>

<style lang="scss" scoped>
  /*custom font*/
  @import url(https://fonts.googleapis.com/css?family=Montserrat);

  /*basic reset*/
  * {margin: 0; padding: 0;}

  html {
    height: 100%;
    /*Image only BG fallback*/
    
    /*background = gradient + image pattern combo*/
    background: 
      linear-gradient(rgba(196, 102, 0, 0.6), rgba(155, 89, 182, 0.6));
  
  }

  body {
    font-family: montserrat, arial, verdana;
  }
  /*form styles*/
  #msform {
    width: 400px;
    margin: 50px auto;
    text-align: center;
    position: relative;
    margin-bottom: 130px;
  }
  #msform fieldset {
    background: white;
    border: 0 none;
    border-radius: 3px;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
    padding: 20px 30px;
    box-sizing: border-box;
    width: 80%;
    margin: 0 10%;
    
    /*stacking fieldsets above each other*/
    position: relative;
  }
  /*Hide all except first fieldset*/
  #msform fieldset:not(:first-of-type) {
    display: none;
  }
  /*inputs*/
  #msform input, #msform textarea {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    font-size: 13px;
  }
  /*buttons*/
  #msform .action-button {
    width: 100px;
    background: #1976D2;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 1px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px;
  }
  #msform .action-button:hover, #msform .action-button:focus {
    box-shadow: 0 0 0 2px white, 0 0 0 3px #1976D2;
  }
  /*headings*/
  .fs-title {
    font-size: 18px;
    text-transform: uppercase;
    color: #2C3E50;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .fs-subtitle {
    font-weight: normal;
    font-size: 13px;
    color: #666;
    margin-bottom: 20px;
  }
  /*progressbar*/
  #progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    /*CSS counters to number the steps*/
    counter-reset: step;
  }
  #progressbar li {
    list-style-type: none;
    color: #1976D2;
    text-transform: uppercase;
    font-size: 9px;
    width: 33.33%;
    float: left;
    position: relative;
  }
  #progressbar li:before {
    content: counter(step);
    counter-increment: step;
    width: 20px;
    line-height: 20px;
    display: block;
    font-size: 10px;
    color: #333;
    background: white;
    border-radius: 3px;
    margin: 0 auto 5px auto;
  }
  /*progressbar connectors*/
  #progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: white;
    position: absolute;
    left: -50%;
    top: 9px;
    z-index: -1; /*put it behind the numbers*/
  }
  #progressbar li:first-child:after {
    /*connector not needed before the first step*/
    content: none; 
  }
  /*marking active/completed steps green*/
  /*The number of the step and the connector before it = green*/
  #progressbar li.active:before,  #progressbar li.active:after{
    background: #27AE60;
    color: white;
  }

  .ong {
    position: absolute;
    top: 420px;
    left: 50%;

    transform: translate(-50%, -50%);

    font-size: 20px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
    }
  }
</style>
