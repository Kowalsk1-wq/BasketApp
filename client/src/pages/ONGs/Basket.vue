<template>
  <q-page class="q-pa-md q-gutter-md justify-evenly">
    <div class="main row itens-center justify-evenly">
      <h1 class="nothing" v-if="donations.data.length === 0">Nada a Mostrar ☹</h1>
      <div v-if="donations.data.length !== 0" class="q-pa-md row items-center justify-evenly q-gutter-md" style="width: 100%">
        <q-list class="rounded-borders" style="width: 75%; margin-top: 60px">
          <DonationONG
            v-for="d in donations.data"
            :key="d.titulo"
            v-bind="d"
          />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import DonationONG from 'components/DonationONG'

export default {
  name: 'PageBasket',

  components: {
    DonationONG
  },

  data () {
    return {
      donations: null,
      token: localStorage.getItem('@accessToken')
    }
  },
  
  async mounted () {
    setInterval(async () => {
      this.donations = await this.$axios.get('http://localhost:4040/donation/all', {
        headers: {
          'x-access-token': this.token
        }
      })  
    }, 100)
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .nothing {
    position: fixed;
    margin-top: 170px;

    font-size: 45px;
  }
</style>
