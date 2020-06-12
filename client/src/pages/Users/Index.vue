<template>
  <q-page class="row items-center justify-evenly">
    <div class="general">
      <h5 v-if="user.genero === 'Masculino'">Bem-Vindo <strong>{{ user.nome }} {{ user.sobrenome }}</strong>!</h5>
      <h5 v-if="user.genero === 'Feminino'">Bem-Vinda <strong>{{ user.nome }} {{ user.sobrenome }}</strong>!</h5>
      <h5 v-if="user.cnpj">Bem-Vindo <strong>{{ user.razao_social }}</strong>!</h5>

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
  name: 'PageAppMain',
  components: {
    EssentialLink
  },
  data() {
    return {
      essentialLinks: [
        {
          id: '1',
          title: 'Efetuar Doação',
          icon: 'folder',
          caption: 'Faça Novas Doações, Ajude o Próximo!'
        },
        {
          id: '2',
          title: 'Configurações',
          icon: 'settings',
          caption: 'Personalize o seu BasketApp 😉'
        }
      ],
      user: null
    }
  },

  mounted () {
    this.user = JSON.parse(localStorage.getItem('@currentUser'));
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
