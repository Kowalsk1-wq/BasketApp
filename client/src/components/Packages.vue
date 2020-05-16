<template>
  <div class="q-pa-md q-gutter-md">
    <q-item>
        <q-item-section avatar top>
          <q-avatar>
            <img :src="author.picture">
          </q-avatar>
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ author.name }}</q-item-label>
        </q-item-section>

        <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ name }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          {{ description }}
        </q-item-label>
        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn @click="pack = true" flat color="primary" icon="info" label="Detalhes" />
        </div>
      </q-item-section>
      </q-item>

      <q-dialog style="width: 100%; height: 100%;" v-model="pack" persistent>
      <q-card style="min-width: 350px; max-height: 450px; overflow-x: hidden;">
        <q-card-section>
          <div class="text-h6">{{ name }}</div>
          <span>{{ description }}</span>
        </q-card-section>

        <div class="infoOng">
          <q-chip size="xl">
            <q-avatar>
              <img :src="author.picture">
            </q-avatar>
            {{ author.name }}
          </q-chip>
        </div>

        <q-card-section class="q-pt-none">
          <div class="item" v-for="i in items">
            <span style="margin-top: 15px; font-weight: bold;">Nome: <a style="font-weight: 400;">{{ i.name }}</a></span><br>
            <small>>  Quantidade: {{ i.quantity }}</small> 
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat title="Fechar" icon="close" v-close-popup />
          <q-btn push title="Efetuar Doação" color="primary" icon="done" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'PackageItem',

  data() {
    return {
      pack: false,
      token: null
    }
  },

  mounted() {
    this.token = localStorage.getItem('@accessToken');
  },

  props: {
    _id: {
      type: String
    },
    author: String,
    name: {
      type: String
    },
    description: {
      type: String
    },
    items: {
      type: String
    }
  },

  methods: {
    handleDelete(id) {
      this.$axios.delete('http://localhost:4000/requests', {
        headers: {
          'x-access-token' : this.token,
          'x-target-pack-id' : id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    width: 650px;
    border-left: 2px solid #000;

    margin: 15px 0 15px 0;

    @media (max-width: 768px) {
      width: 450px;
    }
  }

  .infoOng {
    position: absolute;
    right: 5px;
    top: 15px;
  }
</style>