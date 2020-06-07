<template>
  <div class="q-pa-md q-gutter-md">
    <q-item>
      <q-item-section avatar top>
        <q-avatar @click="toolbar = true">
          <img :src="doador.foto">
        </q-avatar>
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label v-if="doador.pessoa_fisica.length !== 0" class="q-mt-sm">{{ doador.pessoa_fisica[0].nome }} {{ doador.pessoa_fisica[0].sobrenome }}</q-item-label>
        <q-item-label v-if="doador.pessoa_juridica.length !== 0" class="q-mt-sm">{{ doador.pessoa_juridica[0].razao_social }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ titulo }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          {{ descricao }}
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
      <q-card style="min-width: 350px; max-height: 500px; overflow-x: hidden;">
        <q-card-section>
          <div class="text-h6">{{ titulo }}</div>
          <span>{{ descricao }}</span>
        </q-card-section>

        <div class="info">
          <q-chip size="md">
            <q-avatar>
              <img :src="doador.foto">
            </q-avatar>
            {{ doador.pessoa_fisica.length === 0 ? doador.pessoa_juridica[0].razao_social :  doador.pessoa_fisica[0].nome }}
          </q-chip>
        </div>

        <q-card-section class="q-pt-none">
          <q-list bordered padding>
            <q-item-label header>Itens</q-item-label>

            <q-item v-for="p in produto" :key="p.descricao" v-bind="p" v-ripple>
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
          <q-btn style="position: absolute; left: 10px" @click="contact = true" push title="Contato" color="blue" icon="phone" /> 
          <q-btn flat title="Fechar" icon="close" v-close-popup />
          <q-btn v-if="approved === false" push @click="acceptDonation(numero)" title="Aceitar a Doação" color="primary" icon="done" />
          <q-btn v-if="approved === true" push @click="sentDonation(numero)" title="Sinalizar Como Entregue" color="primary" icon="done_all" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
    <q-dialog style="width: 100%; height: 100%" v-model="contact" persistent>
      <q-card class="justify-evenly items-center" style="background-color: #1976D2; min-width: 350px; min-height: 350px; overflow-x: hidden;">
        <q-btn flat style="position: absolute; right: 2px; top: 5px; color: #fff" icon="close" v-close-popup />
        <q-card-section class="content">
          <div class="q-pa-md q-gutter-md items-center justify-evenly">
            <q-item v-ripple>
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img :src="doador.foto" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ doador.pessoa_fisica.length !== 0 ? doador.pessoa_fisica[0].nome : doador.pessoa_juridica[0].razao_social }}</q-item-label>
                <q-item-label style="color: #fff; font-weight: bold" caption>{{ doador.telefone }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label style="color: #fff">Cadastre este número no seu celular e entre em contato com <strong>{{ doador.pessoa_fisica.length !== 0 ? doador.pessoa_fisica[0].nome : doador.pessoa_juridica[0].razao_social }}</strong></q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DonationONG',

  data () {
    return {
      basket: false,
      contact: false,
      donations: null,
      token: null,
      toolbar: false,
      ong: null
    }
  },

  mounted () {
    this.token = localStorage.getItem('@accessToken');
    this.ong = JSON.parse(localStorage.getItem('@currentONG'));
  },

  props: {
    approved: {
      type: Boolean
    },

    numero: {
      type: String
    },

    doador: {
      type: String
    },

    titulo: {
      type: String
    },

    descricao: {
      type: String
    },

    produto: {
      type: String
    }
  },

  methods: {
    async acceptDonation (number) {
      this.basket = false
      this.$swal({
        title: 'Você Tem Certeza?',
        text: 'Lembre-se que esta ação é irreversível',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, eu aceito!',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.$axios.put(`http://localhost:4040/donation/${number}/accept`, '', {
            headers: {
              'x-access-token': this.token
            }
          }).then(() => {
            this.$swal(
              'Muito Bem!',
              'Você aceitou esta doação.\n<small>Entre em contato com o doador, para definir as condições de entrega</small>',
              'success'
            )
          }).catch(err => {
            this.$swal(
              'Oops!',
              'Não foi possível aceitar a doação',
              'error'
            )
          })
        } else {
          this.basket = true
        }
      })
    },

    async sentDonation (number) {
      this.basket = false
      this.$swal({
        title: 'Você Tem Certeza?',
        text: 'Lembre-se que esta ação é irreversível',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, Foi Entregue!',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.$axios.delete(`http://localhost:4040/donation/${number}/sent`, {
            headers: {
              'x-access-token': this.token
            }
          }).then(() => {
            this.$swal(
              'Muito Bem!',
              'Doação Entregue Com Sucesso!',
              'success'
            )
          }).catch(err => {
            this.$swal(
              'Oops!',
              'Não foi possível finalizar a doação',
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

<style>
  .phone {
    color: #fff;
    position: absolute;
    margin-top: 60%;
    margin-left: 10%;
  }

  .content {
    color: #fff;
    margin-top: 100px;
  }

  .info {
    position: absolute;
    right: 8px;
    top: 15px;
  }
</style>
