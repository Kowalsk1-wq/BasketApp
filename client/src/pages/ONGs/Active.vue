<template>
  <q-page class="column items-center justify-evenly">
    <h3>Parabéns!</h3>
    <span>Seu email {{ ongEmail }} foi cadastrado com sucesso, clique no botão abaixo para ativar sua conta!</span>
    <q-btn color="primary" label="Ativar Agora!" @click="onActive" />
  </q-page>
</template>

<script>
export default {
  name: 'pageONGActive',
  components: {},
  data() {
    return {
      ongEmail: null,
      ongCnpj: null
    }
  },

  mounted() {
    this.ongEmail = localStorage.getItem('@OngEmail');
    this.ongCnpj = localStorage.getItem('@OngCnpj');
  },

  methods: {
    onActive() {
      this.$axios.post('http://localhost:4000/ongs/auth/activate', '', {
        headers: {
          'x-access-cnpj' : this.ongCnpj
        }
      }).then(res => {
        console.log(res.data);

        localStorage.removeItem('@OngEmail');
        localStorage.removeItem('@OngCnpj');

        this.$router.push({ path: '/auth-ong' });
      }).catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>

</style>