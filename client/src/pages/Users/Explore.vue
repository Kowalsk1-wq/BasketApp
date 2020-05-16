<template>
  <q-page class="q-pa-md q-gutter-md items-center justify-evenly">
    <div class="main row itens-center justify-evenly">
    	<q-list bordered class="rounded-borders" style="max-width: 600px">
        <q-item-label header>Pacotes Recentes</q-item-label>

        <Packages v-for="p in packs" :key="p.name" v-bind="p" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import Packages from 'components/Packages'

export default { 
  name: 'PageAppExplore',
  components: {
  	Packages
  },
  data() {
  	return {
  		token: localStorage.getItem('@accessToken'),

  		packs: null
  	}
  },

  mounted() {
  	this.$axios.get("http://localhost:4000/requests", {
			headers: {
				'x-access-token' : this.token
			}
		}).then(res => {
      this.packs = res.data.packages;
    });
  }
}
</script>
