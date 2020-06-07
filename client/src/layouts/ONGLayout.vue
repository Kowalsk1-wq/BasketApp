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
          <q-badge color="secondary" align="top">ONG Edition</q-badge>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
    >
      <div class="ong column items-center">
        <q-avatar size="72px">
          <img :src="ong.foto" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ ong.razao_social }}</div>
      </div>

      <q-list>
        <q-item-label header class="text-white headerBar">
          
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-separator inset class="q-mx-lg" />

        <q-btn @click="handleLogOut" align="between" class="sair btn-fixed-width" color="primary" label="Sair" icon="exit_to_app" />
      </q-list>
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

import { ONGlogout } from '../validators/auth'

export default {
  name: 'ONGLayout',

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
          link: '/main'
        },
        {
          id: '2',
          title: 'Doações',
          icon: 'shopping_basket',
          link: '/baskets'
        },
        {
          id: '3',
          title: 'Doações Aprovadas',
          icon: 'check_box',
          link: '/approved'
        },
        {
          id: '4',
          title: 'Configurações',
          icon: 'settings'
        }
      ],
      ong: null
    }
  },

  mounted () {
    this.ong = JSON.parse(localStorage.getItem('@currentONG'));
  },

  methods: {
    handleLogOut() {
      ONGlogout();
      this.$router.push('/auth-ong');
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

  .ong {
    background-color: #1976D2;
    padding: 50px 15px 15px 15px;
  }

  .headerBar {
    background-color: #1976D2;
    height: 50px;
  }
  
  .main {
    background-color: #FFFDF7;
  }

  .sair {
    position: absolute;
    bottom: 50px;
    left: 30%;
    transform: translateX(-50%, -50%);
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
