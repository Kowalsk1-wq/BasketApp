<template>
  <q-layout view="lHh Lpr lFf" class="main">
    <q-header elevated>
      <q-toolbar class="toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="absolute-center">
          BasketApp
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-1"
    >
      <div class="user column items-center">
        <q-avatar size="72px">
          <img :src="user.doador.foto" />
        </q-avatar>

        <div class="text-subtitle1 text-white q-mt-md q-mb-xs">{{ user.nome }} {{ user.sobrenome }}</div>
        <div class="text-subtitle1 text-white q-mt-md q-mb-xs">{{ user.razao_social }}</div>
      </div>

      <q-separator inset class="q-mx-lg" />

      <q-list>
        <q-item-label header class="text-white headerBar">
          
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-separator inset class="q-mx-lg" />

      <q-btn @click="handleLogOut" align="between" class="sair btn-fixed-width" color="primary" label="Sair" icon="exit_to_app" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="copyright">
      <span>@Rocket.IO | {{ year }}</span>
    </div>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

import { logout } from '../validators/auth'

export default {
  name: 'AppLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      year: new Date().getFullYear(),
      id: EssentialLink.id,
      leftDrawerOpen: false,
      essentialLinks: [
        {
          id: '1',
          title: 'Página Inicial',
          icon: 'home',
          link: '/app'
        },
        {
          id: '2',
          title: 'Efetuar Doação',
          icon: 'folder',
          link: '/donation'
        },
        {
          id: '3',
          title: 'Configurações',
          icon: 'settings',
          link: '/settings'
        }
      ],
      user: null
    }
  },

  mounted () {
    this.user = JSON.parse(localStorage.getItem('@currentUser'));
  },

  methods: {
    handleLogOut() {
      logout();
      this.$router.push('/');
    },

    redirect(link) {
      this.$router.push({ path: link });
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    @media (max-width: 768px) {
      overflow: hidden;
    }
  }

  .user {
    background-color: #1976D2;
    padding: 50px 15px 15px 15px;
  }

  .sair {
    position: absolute;
    bottom: 50px;
    left: 30%;
    transform: translateX(-50%, -50%);
  }
  
  .main {
    background-color: #FFFDF7;
  }

  .expansion {
    position: relative;
  }

  .menuUser {
    list-style: none;
  }

  .column {
    span {
      margin-top: 10px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .copyright {
    position: fixed;
    bottom: 15px;
    right: 30px;

    font-size: 16px;
  }
</style>
