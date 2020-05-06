<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md main" style="max-width: 400px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md form"
      >
        <q-input
          class="input"
          outlined
          v-model="id"
          label="ID *"
          hint="O Que Te Enviamos No Teu Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Informe O Seu ID!']"
        />

        <q-input
          class="input"
          outlined
          type="password"
          v-model="pwd"
          label="Senha *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Informe sua Senha!'
          ]"
        />

        <q-toggle v-model="accept" label="Eu Aceito os Termos de Licença!" />

        <div>
          <q-btn label="Entrar" type="submit" color="primary"/>
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>

        <span @click="redirect('/auth-ong')" class="ong">És uma ONG?</span>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { login } from '../../validators/auth'

export default {
  name: 'PageLogin',
  components: {},
  data() {
    return {
      id: null,
      pwd: null,

      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        alert('You need to accept the license and terms first');
      }
      else {
        this.$axios.post('http://localhost:4000/users/auth', {
          id: this.id,
          password: this.pwd
        }).then(response => {
          login(response.data.token, response.data.user[0]);

          this.$router.push({path: '/app'});
        }).catch(err => {
          console.log(err);
        })
      }
    },

    onReset () {
      this.id = null
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
  @import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

  * {
    font-family: 'Poppins';
  }

  .main {
    position: absolute;
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
  }

  .form {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 350px;

    border-radius: 15px;

    @media (max-width: 768px) {
      left: 0;
    }

    .input {
      width: 300px;
    }
  }

  .ong {
    position: absolute;
    top: 350px;

    font-size: 20px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
    }
  }
</style>
