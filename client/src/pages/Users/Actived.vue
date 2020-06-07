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
      ident: null
    }
  },

  mounted() {
    const cpf = localStorage.getItem('@CPF');
    const cnpj = localStorage.getItem('@CNPJ');

    if (cpf === null) {
      this.ident = cnpj;
    } else {
      this.ident = cpf;
    }
  },

  methods: {
    async handleActive() {
      const cpf = localStorage.getItem('@CPF');
      const cnpj = localStorage.getItem('@CNPJ');

      if (cpf === null) {
        await this.$axios.put(`http://localhost:4040/sessions/pj/active/${this.ident}`)
          .then(() => {
            this.$swal({
              icon: 'success',
              title: 'Muito Bem!',
              text: 'Sua Conta Foi Ativada Com Sucesso.',
              footer: '<small>Aguarde Um Pouco, Vamos Redirecioná-lo</small>'
            });

            setTimeout(() => {
              this.$router.push({ path: '/' });
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
      } else {
        await this.$axios.put(`http://localhost:4040/sessions/pf/active/${this.ident}`)
          .then(() => {
            this.$swal({
              icon: 'success',
              title: 'Muito Bem!',
              text: 'Sua Conta Foi Ativada Com Sucesso.',
              footer: '<small>Aguarde Um Pouco, Vamos Redirecioná-lo</small>'
            });

            setTimeout(() => {
              this.$router.push({ path: '/' });
              localStorage.removeItem('@CPF');
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

      this.$swal({
        icon: 'success',
        title: 'Muito Bem!',
        text: 'Sua Conta Foi Ativada Com Sucesso.',
        footer: '<small>Aguarde Um Pouco, Vamos Redirecioná-lo</small>'
      });

      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>