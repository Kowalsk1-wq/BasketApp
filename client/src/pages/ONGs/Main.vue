<template>
  <q-page class="row items-center justify-evenly">
    <div class="general">
      <h5>Bem-Vindo <strong>{{ ong.name }}</strong>!</h5>

      <p>
        <strong>Informações Gerais</strong>
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageMain',
  components: {},
  data() {
    return {
      ong: null
    }
  },

  mounted () {
    this.ong = JSON.parse(localStorage.getItem('@currentONG'));
  },
}
</script>

<style lang="scss" scoped>
  .general {
    position: absolute;
    top: 0;
    width: 75%;
    height: 450px;

    border: 1px solid #ccc;
    background-color: rgb(255, 255, 255);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    h5 {
      position: absolute;
      top: 15px;
      left: 45px;
    }

    p {
      position: absolute;
      top: 40%;
      left: 45px;

      width: 650px;
      height: auto;

      strong {
        font-size: 25px;
      }
    }
  }
</style>