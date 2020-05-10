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

        <q-toolbar-title class="title">
          BasketApp
          <q-badge color="secondary" align="top">ONG Edition</q-badge>
        </q-toolbar-title>
        
        <q-btn-dropdown
          class="push"
          color="default"
          label="Conta"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Informações</div>
              <span @click="redirect('/ong')">Perfil</span>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="ong.picture" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ ong.name }}</div>

              <q-btn
                color="primary"
                label="Sair"
                push
                size="sm"
                @click="handleLogOut"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-white headerBar">
          
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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
          title: 'Pacotes',
          icon: 'folder',
          link: '/packages'
        },
        {
          id: '3',
          title: 'Status das Doações',
          icon: 'schedule',
          link: ''
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

  .headerBar {
    background-color: #1976D2;
    height: 50px;
  }
  
  .main {
    background-color: #FFFDF7;
  }

  .title {
    margin-left: 50px;
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
