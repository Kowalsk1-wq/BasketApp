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
        
        <q-btn-dropdown
          flat
          class="absolute-right"
          color="default"
          label="Conta"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Informações</div>
              <span @click="redirect('/me')">Perfil</span>
              <span @click="redirect('/donations')">Doações</span>
              <span @click="redirect('/relatories')">Relatórios</span>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="user.picture" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user.firstName }} {{ user.lastName }}</div>

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
      <span>@Rocktech.IO | {{ year }}</span>
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
          title: 'ONG Explorer',
          icon: 'explore',
          link: '/requests'
        },
        {
          id: '3',
          title: 'Verificar Doações',
          icon: 'attach_money',
          link: '/requests'
        },
        {
          id: '4',
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

  .headerBar {
    background-color: #1976D2;
    height: 50px;
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
