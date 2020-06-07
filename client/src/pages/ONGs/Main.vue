<template>
  <q-page class="row items-center justify-evenly">
    <div class="general">
      <h5>Bem-Vindo <strong>{{ ong.razao_social }}</strong>!</h5>
      <p>
        <strong>Informações Gerais</strong>
        <q-list>
          <q-item-label header class="text-white headerBar">
            
          </q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
      </q-list>
      </p>
    </div>
  </q-page>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'PageMain',
  components: {
    EssentialLink
  },
  data() {
    return {
      essentialLinks: [
        {
          id: '1',
          title: 'Doações',
          icon: 'shopping_basket',
          caption: 'Aqui é o Lugar Onde Você Vai Encontrar Pessoas de Bom Coração!'
        },
        {
          id: '2',
          title: 'Configurações',
          icon: 'settings',
          caption: 'Personalize o seu BasketApp 😉'
        }
      ],
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