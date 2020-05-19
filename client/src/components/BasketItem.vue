<template>
  <div class="q-pa-md q-gutter-md">
    <q-item class="item">
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
          <q-btn @click="basket = true" flat color="primary" icon="info" label="Detalhes" />
        </div>
      </q-item-section>
    </q-item>

    <q-dialog style="width: 100%; height: 100%;" v-model="basket" persistent>
      <q-card style="min-width: 450px; max-height: 450px; overflow-x: hidden;">
        <q-card-section>
          <div class="text-h6">{{ name }}</div>
          <span>{{ description }}</span>
        </q-card-section>

        <q-badge class="badgeStatus" :color="status === 'Em Andamento' ? 'grey' : 'green'">
          <strong>STATUS</strong>:  {{ status }}
        </q-badge>

        <q-card-section class="q-pt-none">
          <div class="itemsContainer">
            <div
              class="items"
              v-for="i in items" 
              :key="i"
            >
              <span><strong>{{ i.name }}</strong> - x{{ i.quantity }}</span> 
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat title="Fechar" icon="close" v-close-popup />
          <q-btn v-if="status !== 'Concluída'" flat title="Ver Status" icon="access_time" />
          <q-btn v-if="status !== 'Concluída'" push title="Confirmar Doação" color="primary" icon="done" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'BasketItem',

  data() {
    return {
      basket: false,
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
    name: {
      type: String
    },
    description: {
      type: String
    },
    items: {
      type: String
    },
    status: {
      type: String
    }
  },

  methods: {
    handleDelete(id) {
      this.$axios.delete('http://localhost:4000/baskets', {
        headers: {
          'x-access-token' : this.token,
          'x-target-basket-id' : id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .badgeStatus {
    position: absolute;
    top: 88%;
    left: 15px;

    border-radius: 15px;
  }

  .item {
    width: 100%;
    border-left: 2px solid #000;
  }

  .items {
    background-color: #ccc;
    border-bottom: 0.5px solid #ccc;
    border-top: 0.5px solid #ccc;

    height: 50px;

    font-size: 18px;
    font-weight: bold;

    &:nth-child(n+1) {
      margin-top: 10px;
    }

    span {
      position: absolute;
      margin-top: 10px;
      left: 15px;

      strong {
        font-size: 18px;
      }

      font-size: 14px;
      font-weight: 400;
    }
  }

  .status {
    position: absolute;
    right: 65px;
    top: -30px;

    font-size: 25px;
  }
</style>