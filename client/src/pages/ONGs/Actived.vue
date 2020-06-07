<template>
  <q-page class="column items-center justify-evenly">
    <h3>Estamos Quase Lá!</h3>
    <span>Clique No Botão Abaixo para Ativar Sua Conta!</span>
    <q-btn color="primary" label="Ativar Agora!" @click="handleActive" />
  </q-page>
</template>

<script>
export default {
  name: 'pageActive',
  components: {},
  data() {
    return {
      cnpj: null
    }
  },

  mounted() {
    this.cnpj = localStorage.getItem('@CNPJ');
  },

  methods: {
    async handleActive() {
      await this.$axios.put(`http://localhost:4040/sessions/ong/active/${this.cnpj}`)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Muito Bem!',
            text: 'Sua Conta Foi Ativada Com Sucesso.',
            footer: '<small>Aguarde Um Pouco, Vamos Redirecioná-lo</small>'
          });

          setTimeout(() => {
            this.$router.push({ path: '/auth-ong' });
            localStorage.removeItem('@CNPJ');
          }, 3000);
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: 'Oops!',
            text: 'Algo Deu Errado',
            footer: '<small>Tente Novamente!</small>'
          });
        });
    }   
  }
}
</script>

<style lang="scss" scoped>
</style>