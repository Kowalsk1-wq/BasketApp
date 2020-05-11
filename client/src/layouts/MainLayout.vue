<template>
  <q-layout view="lHh Lpr lFf" class="main">
    <q-header elevated>
      <q-toolbar class="toolbar"> 
        <q-toolbar-title class="absolute-center">
          BasketApp
          <q-badge v-if="this.isONG() === true" color="secondary" align="top">ONG Edition</q-badge>
        </q-toolbar-title>

        <q-btn 
          push 
          color="default" 
          label="Cadastrar" 
          @click="redirect('/signup')"
          v-if="this.isSignUp() === false && isONG() === false"
          class="btnEntry"
        />

        <q-btn 
          push 
          color="default" 
          label="Entrar" 
          @click="redirect('/')"
          v-if="this.isSignUp() === true && isONG() === false"
          class="btnEntry"
        />

        <q-btn 
          push 
          color="default" 
          label="Cadastre Sua ONG" 
          @click="redirect('/signup-ong')"
          v-if="this.isSignUp() === false && isONG() === true"
          class="btnEntry"
        />

        <q-btn 
          push 
          color="default" 
          label="Entrar" 
          @click="redirect('/auth-ong')"
          v-if="this.isSignUp() === true && isONG() === true"
          class="btnEntry"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer>
      <div class="copyright">
        <span class="mark">@Rocket.IO</span>
        <span class="privacy">Privacy Policy</span>
        <span class="year">Copyright © {{ year }}</span>
      </div>
    </footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      year: new Date().getFullYear()
    }
  },
  methods: {
    redirect (link) {
      this.$router.push({path: link})
    },

    isSignUp() {
      if (window.location.href === 'http://localhost:8080/signup' || window.location.href === 'http://localhost:8080/signup-ong') return true
      else return false
    },

    isONG() {
      if (window.location.href === 'http://localhost:8080/auth-ong' || window.location.href === 'http://localhost:8080/signup-ong') return true
      else return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    overflow: hidden;
  }

  .toolbar {
    height: 60px;
  }

  .btnEntry {
    position: absolute;
    right: 15px;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #1976D2;

    .copyright {
      position: fixed;
      bottom: 0;

      width: 100%;
      height: 30px;
      background-color: rgb(0, 33, 66);

      .mark {
        position: absolute;
        color: #fff;
        font-size: 18px;
        top: 50%;
        left: 75px;
        transform: translate(-50%, -50%);
      }

      .privacy {
        @extend .mark;
        left: 50%;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }

      .year {
        @extend .mark;
        left: auto;
        right: 50px;
      }
    }
  }
</style>
