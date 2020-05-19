<template>
  <div class="q-pa-md q-gutter-md">
    <q-item>
        <q-item-section avatar top>
          <q-avatar @click="toolbar = true">
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
          <q-btn @click="basket = true" flat color="primary" icon="info" label="Detalhes" />
        </div>
      </q-item-section>
      </q-item>

      <q-dialog v-model="toolbar">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-img
              class="col"
              :src="author.picture"
            />

            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn flat round color="blue" title="Ver Perfil" icon="person" />
              <q-btn flat round color="grey" title="Cestas" icon="folder" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog style="width: 100%; height: 100%;" v-model="basket" persistent>
      <q-card style="min-width: 350px; max-height: 450px; overflow-x: hidden;">
        <q-card-section>
          <div class="text-h6">{{ name }}</div>
          <span>{{ description }}</span>
        </q-card-section>

        <div class="infoOng">
          <q-chip size="md">
            <q-avatar>
              <img :src="author.picture">
            </q-avatar>
            {{ author.name }}
          </q-chip>
        </div>

        <q-card-section class="q-pt-none">
          <q-badge color="primary" text-color="white">Items a serem Doados: {{ this.itms.length }}</q-badge> <br>

          <q-list bordered padding>
            <q-item-label header>Itens</q-item-label>

            <q-item v-for="item in items" :key="item.label" tag="label" v-ripple>
              <q-item-section side top>
                <input type="checkbox" :value="item" v-model="itms">
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>
                  Quantidade: {{ item.quantity }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat title="Fechar" icon="close" v-close-popup />
          <q-btn v-if="this.itms.length === 0" push disabled icon="done" />
          <q-btn v-if="this.itms.length !== 0" push @click="createDonation(_id, author)" title="Efetuar Doação" color="primary" icon="done" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Baskets',

  data() {
    return {
      basket: false,
      token: null,

      toolbar: false,

      itms: [],

      user: null
    }
  },

  mounted() {
    this.token = localStorage.getItem('@accessToken');
    this.user = JSON.parse(localStorage.getItem('@currentUser'));
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
    async createDonation(_id, author) {
      const data = new FormData();
      const date = new Date();

      data.append(
        'date',
        `${
          date.getDay()
        }/${
          date.getMonth()
        }/${
          date.getFullYear()
        }
          //
        ${
          date.getHours()
        }:${
          date.getMinutes()
        }:${
          date.getSeconds()
        }`
      );

      data.append('items', this.itms);

      await this.$axios.post(`http://localhost:4000/baskets/${_id}/donations`, data, {
        headers: {
          'user_id': this.user._id,
          'ong_id': author._id
        }
      }).then(res => {
        console.log({
          data: res.data,
        });
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  $checkbox-size: 16px;
  $margin: 16px;
  $margin-small: $margin / 2;
  $text-lighter: #ccc;
  $brand: #12CBC4;

  *:focus {
    outline: none;
  }

  .item {
    width: 650px;
    border-left: 2px solid #000;

    margin: 15px 0 15px 0;

    display: flex;

    @media (max-width: 768px) {
      width: 450px;
    }
  }

  .my-card {
    width: 100%;
    max-width: 450px;
  }

  .preview {
    @extend .item;
    border: 0;
    flex-direction: column;

    &_header {
      display: flex;
      flex-direction: row;

      align-items: center;

      #basketItems {
        position: absolute;
        top: 38%;
        left: 5%;
      }

      #userItems {
        @extend #basketItems;
        top: 36.5%;
        left: 55%;
      }
    }

    &_body {
      display: flex;
      flex-direction: row;

      .basketUl {
        margin-top: 30px;
      }

      .userUl {
        position: absolute;
        margin-top: 30px;
        left: 54%;
      }
    } 
  }

  .infoOng {
    position: absolute;
    right: 5px;
    top: 15px;
  }

  input {
    position: relative !important;
    appearance: none;
    margin: $margin-small;
    box-sizing: content-box;
    overflow: hidden;

    // circle
    &:before {
      content: '';
      display: block;
      box-sizing: content-box;
      width: $checkbox-size;
      height: $checkbox-size;
      border: 2px solid $text-lighter;
      transition: 0.2s border-color ease;
    }
    
    &:checked:before {
      border-color: $brand;
      transition: 0.5s border-color ease;
    }
    
    &:disabled:before {
      border-color: $text-lighter;
      background-color: $text-lighter;
    }

    // dot
    &:after {
      content: '';
      display: block;
      position: absolute;
      box-sizing: content-box;
      top: 50%;
      left: 50%;
      transform-origin: 50% 50%;
      background-color: $brand;
      width: $checkbox-size;
      height: $checkbox-size;
      border-radius: 100vh;
      transform: translate(-50%, -50%) scale(0);
    }

    &[type="checkbox"] {
      &:before {
        border-radius: $checkbox-size / 4;
      }

      &:after {
        width: $checkbox-size * 0.6;
        height: $checkbox-size;
        border-radius: 0;
        transform: translate(-50%, -85%) scale(0) rotate(45deg);
        background-color: transparent;
        box-shadow: 4px 4px 0px 0px $brand;
      }

      &:checked:after {
        animation: toggleOnCheckbox 0.2s ease forwards;
      }
    }
    
    &[type="checkbox"].filled  {
      &:before {
        border-radius: $checkbox-size / 4;
        transition: 0.2s border-color ease, 0.2s background-color ease;
      }
      
      &:checked:not(:disabled):before {
        background-color: $brand;
      }

      &:not(:disabled):after {
        box-shadow: 4px 4px 0px 0px white;
      }
    }
  }

  @keyframes toggleOnCheckbox {
    0% {
      opacity: 0;
      transform: translate(-50%, -85%) scale(0) rotate(45deg);
    }

    70% {
      opacity: 1;
      transform: translate(-50%, -85%) scale(0.9) rotate(45deg);
    }
    
    100% {
      transform: translate(-50%, -85%) scale(0.8) rotate(45deg);
    }
  }

  @keyframes toggleOnRadio {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
    }

    70% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.9);
    }
    
    100% {
      transform: translate(-50%, -50%) scale(0.8);
    }
  }

</style>