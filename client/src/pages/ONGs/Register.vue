<template>
  <q-page class="row items-center justify-evenly">
    <!-- multistep form -->
    <form id="msform" @submit.prevent="onSignUp">
      <!-- fieldsets -->
      <fieldset>
        <h2 class="fs-title">Vamos Criar Sua Conta!!</h2>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="text" v-model="cnpj" placeholder="CNPJ" />
        <input type="password" v-model="pwd" placeholder="Senha" />
        <input type="password" v-model="rPwd" placeholder="Confirme a Senha" />
        <q-separator /><br>
        <h2 class="fs-title">Detalhes Sobre a Sua ONG</h2>
        <h3 class="fs-subtitle"></h3>
        <input type="text" v-model="ongName" placeholder="Nome da ONG" />
        <input type="text" v-model="repName" placeholder="Nome do Representante" />
        <input type="text" v-model="phone" placeholder="Telefone" />
        <input type="text" v-model="city" placeholder="Cidade" />
        <input type="text" v-model="uf" placeholder="Estado" />

        <q-separator /><br>

        <div class="q-pa-md" style="max-width: 300px; margin-left: 50%; transform: translate(-50%, -50%); margin-top: 75px">
          <p style="margin-bottom: 15px; font-weight: bold; font-size: 20px;">Foto de Perfil</p>
          <input type="file" @change="onFileSelected" >
        </div>
        <q-separator /><br>
        <input type="submit" name="submit" class="submit action-button" value="Cadastrar" />
      </fieldset>
    </form>
  </q-page>
</template>

<script>
export default {
  name: 'PageRegONG',
  components: {},
  data() {
    return {
      email: '',
      cnpj: '',
      pwd: '',
      rPwd: '',
      ongName: '',
      repName: '',
      phone: '',
      city: '',
      uf: '',

      selectedFile: null
    }
  },

  methods: {
    onFileSelected(ev) {
      this.selectedFile = ev.target.files[0]
    },

    onSignUp() {
      if (this.pwd !== this.rPwd) {
        alert('Passwords Not Matching!');
      } else {
        const data = new FormData();
        data.append('file', this.selectedFile, this.selectedFile.name);
        data.append('name', this.ongName);
        data.append('repName', this.repName);
        data.append('cnpj', this.cnpj);
        data.append('email', this.email);
        data.append('password', this.pwd);
        data.append('phone', this.phone);
        data.append('city', this.city);
        data.append('uf', this.uf);

        this.$axios.post('http://localhost:4000/ongs', data).then(res => {
          console.log(res.data);

          localStorage.setItem('@OngEmail', res.data.email);
          localStorage.setItem('@OngID', res.data.id);

          this.$router.push({ path: '/ong-active' });
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /*custom font*/
  @import url(https://fonts.googleapis.com/css?family=Montserrat);

  /*basic reset*/
  * {margin: 0; padding: 0;}

  body {
    font-family: montserrat, arial, verdana;
  }
  /*form styles*/
  #msform {
    width: 890px;
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
    font-size: 15px;
    text-transform: uppercase;
    color: #2C3E50;
    margin-bottom: 10px;
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
</style>
