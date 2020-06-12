<template>
  <div class="q-pa-md q-gutter-md">
    <q-item class="item">
      <q-item-section avatar top>
        <q-icon name="shopping_basket" color="black" size="34px" />
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm"><strong>Nº</strong> {{ numero }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ titulo }}<br><br></span>
          <span class="text-grey-8">{{ descricao }}</span>
        </q-item-label>
        <q-item-label caption lines="1">{{ quantidade }} cesta(s)</q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn @click="basket = true" flat color="primary" icon="info" label="Detalhes" />
        </div>
      </q-item-section>
    </q-item>
    <q-separator />


    <q-dialog style="width: 100%; height: 100%;" v-model="basket" persistent>
      <q-card style="min-width: 350px; max-height: 450px; overflow-x: hidden;">
        <q-card-section>
          <div class="text-h6">{{ titulo }}</div>
          <span>{{ descricao }}</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered padding>
            <q-item-label header>Itens</q-item-label>

            <q-item v-for="p in produto" :key="p.descricao" tag="label" v-ripple>
              <q-item-section side top>
                <input type="checkbox" :value="p" v-model="itms">
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ p.descricao }}</q-item-label>
                <q-item-label caption>
                  Quantidade: {{ p.quantidade }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn color="red" push title="Deletar" icon="delete" @click="del(numero)" />
          <q-btn flat title="Fechar" icon="close" v-close-popup />
          <q-btn v-if="this.itms.length === 0" push disabled icon="edit" />
          <q-btn v-if="this.itms.length !== 0" push title="Efetuar Doação" color="primary" icon="edit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DonationCard',
  props: {
    numero: {
      type: String
    },

    titulo: {
      type: String
    },

    descricao: {
      type: String
    },

    quantidade: {
      type: Number
    },

    produto: {
      type: String
    },
  },

  data () {
    return {
      basket: false,
      itms: [],

      token: null
    }
  },

  mounted () {
    this.token = localStorage.getItem('@accessToken')
  },

  methods: {
    edit (id) {
      console.log(id)
    },

    del (number) {
      this.basket = false
      this.$swal({
        title: 'Você Tem Certeza?',
        text: 'Lembre-se que esta ação é irreversível',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova isso!',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.$axios.delete(`http://localhost:4040/donation/${number}`, {
            headers: {
              'x-access-token': this.token
            }
          }).then(() => {
            this.$swal(
              'Removido!',
              'Sua Doação Foi Removida Com Sucesso.',
              'success'
            )
            this.$emit('deleted')
          }).catch(err => {
            this.$swal(
              'Oops!',
              'Não foi possível remover a doação',
              'error'
            )
          })
        } else {
          this.basket = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    padding: 15px 15px 15px 15px;
  }

  $checkbox-size: 16px;
  $margin: 16px;
  $margin-small: $margin / 2;
  $text-lighter: #ccc;
  $brand: #12CBC4;
  *:focus {
    outline: none;
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
