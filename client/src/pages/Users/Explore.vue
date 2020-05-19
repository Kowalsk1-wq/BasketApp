<template>
  <q-page class="q-pa-md q-gutter-md items-center justify-evenly">
    <div class="main row itens-center justify-evenly">
    	<q-list bordered class="rounded-borders mainPacks" style="max-width: 95%">
        <q-item-label header>Cestas Recentes</q-item-label>

        <Baskets v-for="b in baskets" :key="b.name" v-bind="b" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import Baskets from 'components/Baskets'

export default { 
  name: 'PageAppExplore',
  components: {
  	Baskets
  },
  data() {
  	return {
  		token: localStorage.getItem('@accessToken'),

  		baskets: null
  	}
  },

  mounted() {
  	this.$axios.get("http://localhost:4000/baskets", {
			headers: {
				'x-access-token' : this.token
			}
		}).then(res => {
      this.baskets = res.data.baskets;
    });
  }
}
</script>

<style lang="scss" scoped>
  .mainPacks {
    width: 90%;
  }
</style>
