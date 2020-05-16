<template>
  <q-page class="column items-center justify-evenly">
    <h3>Parabéns!</h3>
    <span>Seu email {{ userEmail }} foi cadastrado com sucesso, clique no botão abaixo para ativar sua conta!</span>
    <q-btn color="primary" label="Ativar Agora!" @click="onActive" />
  </q-page>
</template>

<script>
export default {
  name: 'pageActive',
  components: {},
  data() {
    return {
      userEmail: null
    }
  },

  mounted() {
    this.userEmail = localStorage.getItem('@userEmail');
  },

  methods: {
    onActive() {
      this.$axios.post('http://localhost:4000/users/auth/activate', '', {
        headers: {
          'x-access-email' : this.userEmail
        }
      }).then(res => {
        console.log(res.data);

        localStorage.removeItem('@userEmail');

        this.$router.push({ path: '/' });
      }).catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>

</style>