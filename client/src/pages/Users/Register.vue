<template>
  <q-page class="row items-center justify-evenly">
    <form id="msform" @submit.prevent="onSignUp">
      <!-- fieldsets -->
      <fieldset v-if="tipo === 'Pessoa Física'">
        <h2 class="fs-title">Vamos Criar Sua Conta!!</h2>
        <q-select outlined style="margin-bottom: 10px;" v-model="tipo" :options="tiposUsuario" label="Tipo de Usuário" />
        <q-input class="input" outlined type="text" v-model="nome" label="Nome" />
        <q-input class="input" outlined type="text" v-model="sobrenome" label="Sobrenome" />
        <q-input class="input" outlined type="email" v-model="email" label="Email" />
        <q-select outlined style="margin-bottom: 10px;" v-model="genero" :options="gender" label="Gênero" />
        <q-input class="input" outlined type="text" mask="##/##/####" v-model="nascimento" label="Data de Nascimento" />
        <q-input class="input" outlined type="text" mask="###.###.###-##" v-model="cpf" label="CPF" />
        <q-input class="input" outlined type="text" mask="(##) ##### - ####" v-model="telefone" label="Telefone" />
        <q-select behavior="dialog" outlined style="margin-bottom: 10px;" v-model="estado" :options="states" label="Estado" />
        <q-input class="input" outlined type="text" v-model="cidade" label="Cidade" />

        <q-input class="input" outlined type="password" v-model="senha" label="Senha" />
        <q-input class="input" outlined type="password" v-model="rSenha" label="Confirme a Senha" />

        <q-separator /><br>

        <div class="q-pa-md" style="max-width: 300px; margin-left: 50%; transform: translate(-50%, -50%); margin-top: 75px">
          <p style="margin-bottom: 15px; font-weight: bold; font-size: 20px;">Foto de Perfil</p>
          <input type="file" @change="onFileSelected" >
        </div>

        <q-separator /><br>
        <input type="submit" name="submit" class="submit action-button" value="Cadastrar" />
      </fieldset>

      <fieldset v-if="tipo === 'Pessoa Jurídica'">
        <h2 class="fs-title">Vamos Criar Sua Conta!!</h2>
        <q-select outlined style="margin-bottom: 10px;" v-model="tipo" :options="tiposUsuario" label="Tipo de Usuário" />
        <q-input class="input" outlined type="text" v-model="razao_social" label="Razão Social" />
        <q-input class="input" outlined type="email" v-model="email" label="Email" />
        <q-input class="input" outlined type="text" mask="##.###.###/####-##" v-model="cnpj" label="CNPJ" />
        <q-input class="input" outlined type="text" mask="(##) ##### - ####" v-model="telefone" label="Telefone" />
        <q-select behavior="dialog" outlined style="margin-bottom: 10px;" v-model="estado" :options="states" label="Estado" />
        <q-input class="input" outlined type="text" v-model="cidade" label="Cidade" />

        <q-separator /><br>

        <h2 class="fs-title">Agora Digite sua Senha!</h2>

        <q-input class="input" outlined type="password" v-model="senha" label="Senha" />
        <q-input class="input" outlined type="password" v-model="rSenha" label="Confirme a Senha" />

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
  name: 'PageReg',
  components: {},
  data () {
    return {
      nome: '',
      sobrenome: '',
      email: '',
      senha: '',
      rSenha: '',
      genero: '',
      nascimento: '',
      cpf: '',
      telefone: '',
      estado: '',
      cidade: '',
      razao_social: '',
      cnpj: '',

      states: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins"
      ],

      gender: [
        'Masculino', 'Feminino'
      ],

      tiposUsuario: [
        'Pessoa Física', 'Pessoa Jurídica'
      ],

      tipo: 'Pessoa Física',

      selectedFile: null
    }
  },

  methods: {
    onFileSelected(ev) {
      this.selectedFile = ev.target.files[0]
    },

    async onSignUp() {
      if (this.senha !== this.rSenha) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'As Senhas não Conferem',
        })
      } else {
        if (this.tipo === 'Pessoa Física') {
          const data = new FormData();
          data.append('file', this.selectedFile, this.selectedFile.name);
          data.append('nome', this.nome);
          data.append('sobrenome', this.sobrenome);
          data.append('email', this.email);
          data.append('senha', this.senha);
          data.append('genero', this.genero);
          data.append('nascimento', this.nascimento);
          data.append('cpf', this.cpf);
          data.append('telefone', this.telefone);
          data.append('cidade', this.cidade);
          data.append('estado', this.estado);

          await this.$axios
            .post('http://localhost:4040/sessions/pf', data)
              .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Obaa!',
                  text: 'Sua Inscrição como '+ this.tipo +' foi Efetuada.',
                  footer: '<small>Por Favor, Verifique Seu Email!</small>'
                });

                localStorage.setItem('@CPF', this.cpf);

                setTimeout(() => {
                  this.$router.push({ path: '/user-active' })
                }, 1500);
              })
              .catch(() => {
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Não Foi Possível Realizar o Cadastro!',
                  footer: '<small>Tente Novamente</small>'
                });
              })
        } else {
          const data = new FormData();
          data.append('file', this.selectedFile, this.selectedFile.name);
          data.append('razao_social', this.razao_social);
          data.append('email', this.email);
          data.append('senha', this.senha);
          data.append('cnpj', this.cnpj);
          data.append('telefone', this.telefone);
          data.append('cidade', this.cidade);
          data.append('estado', this.estado);

          await this.$axios
            .post('http://localhost:4040/sessions/pj', data)
              .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Obaa!',
                  text: 'Sua Inscrição como '+ this.tipo +' foi Efetuada.',
                  footer: '<small>Por Favor, Verifique Seu Email!</small>'
                });

                localStorage.setItem('@CNPJ', this.cnpj);

                setTimeout(() => {
                  this.$router.push({ path: '/user-active' })
                }, 1500);
              })
              .catch(() => {
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Não Foi Possível Realizar o Cadastro!',
                  footer: '<small>Tente Novamente</small>'
                });
              })
        }
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
  #msform .input {
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
