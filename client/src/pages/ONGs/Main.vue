<template>
  <q-page class="row items-center justify-evenly">
    <div class="general">
      <h5>Bem-Vindo <strong>{{ ong.name }}</strong>!</h5>
      <q-avatar class="avatar" @click="toolbar = true" size="150px">
        <img :src="ong.picture">
      </q-avatar>
      <p>
        <strong>Informações Gerais</strong>
      </p>
    </div>

    <q-dialog v-model="toolbar">
      <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-img
          class="col"
          :src="ong.picture"
        />

        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn flat round color="blue" title="Ver Perfil" icon="person" />
          <q-btn flat round color="grey" title="Cestas" icon="folder" />
        </q-card-actions>
      </q-card-section>
    </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageMain',
  components: {},
  data() {
    return {
      ong: null,
      toolbar: false
    }
  },

  mounted () {
    this.ong = JSON.parse(localStorage.getItem('@currentONG'));
  },
}
</script>

<style lang="scss" scoped>
  .my-card {
    width: 100%;
    max-width: 450px;
  }

  .general {
    position: absolute;
    top: 0;
    width: 75%;
    height: 450px;

    border: 1px solid #ccc;
    background-color: rgb(255, 255, 255);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .avatar {
      position: absolute;
      top: 30px;
      left: 650px;

      &:hover {
        cursor: pointer;
      }
    }

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