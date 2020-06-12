<template>
  <q-page class="q-pa-md q-gutter-md justify-evenly">
    <div class="main row itens-center justify-evenly">
      <q-btn class="add" @click="donation = true" color="green" icon="add" label="Nova Doação" />
      <h1 class="nothing" v-if="donations.data.length === 0">Nada a Mostrar ☹</h1>
      <div class="q-pa-md row items-center justify-evenly q-gutter-md" style="width: 100%">
        <q-list class="rounded-borders" style="width: 75%; margin-top: 60px">
          <DonationCard
            v-for="d in donations.data"
            :key="d.titulo"
            v-bind="d"
            v-on:deleted="loadDonations()"
          />
        </q-list>
      </div>

      <q-dialog v-model="donation" persistent>
        <q-card class="createPack">
          <q-card-section>
            <div class="text-h6">Nova Doação</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <form id="msform">
              <q-input
                label="Título"
                v-model="title"
                type="text"
                outlined
                class="input"
              />
              <q-input
                label="Descrição"
                v-model="descricao"
                type="text"
                outlined
                class="input"
              />
              <q-input
                  label="Quantidade de Cestas"
                  v-model.number="quant"
                  type="number"
                  outlined
                  class="input"
                />
              <div class="rowIn">
                <q-select
                  outlined
                  v-model="produto"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="options"
                  @filter="filterFn"
                  hint="Nome do Produto"
                  style="width: 375px; padding-bottom: 32px"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum Resultado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-input
                  hint="Quantidade"
                  v-model.number="quantidade"
                  type="number"
                  outlined
                  class="prodSel"
                />
              </div>
              <q-btn class="prodBtn" @click="addItem()" color="green" icon="add" label="Adicionar Item" />
              <div class="itens">
                <p class="itemTitle">
                  Produtos Aqui
                </p>
                <div class="itemsContainer">
                  <div
                    class="items"
                    v-for="p in products"
                    :key="p"
                  >
                    <span><strong>{{ p.descricao }}</strong> - x{{ p.quantidade }}</span> 
                    <q-btn class="btnDel" round dense flat icon="delete" @click="deltItem(products.indexOf(i))" />
                  </div>
                </div>
              </div>
            </form>
          </q-card-section>
          <q-card-actions align="right" class="text-primary actions">
            <q-btn flat label="Cancelar" @click="reset()" v-close-popup />
            <q-btn @click="createDonation()" push color="primary" label="Confirmar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import DonationCard from 'components/DonationCard'

const stringOptions = [
  'Arroz',
  'Feijão',
  'Óleo de Soja',
  'Sal',
  'Açúcar',
  'Café',
  'Molho de Tomate',
  'Macarrão Espaguete',
  'Macarrão Parafuso',
  'Sardinha',
  'Atum',
  'Salsicha',
  'Charque',
  'Milho',
  'Ervilha',
  'Seleta de Legumes',
  'Farinha de Trigo',
  'Farinha de Mandioca',
  'Biscoito Doce',
  'Biscoito Salgado',
  'Leite em Pó',
  'Sabonete',
  'Creme Dental',
  'Papel Higiênico',
  'Sabonete em Pedra',
  'Detergente Líquido',
  'Sabão em Barra',
  'Sabão em Pó'
]

export default {
  name: 'Donation',
  components: {
    DonationCard
  },
  data () {
    return {
      donations: [],
      token: localStorage.getItem('@accessToken'),
			donation: false,
      title: null,
      descricao: null,
      quant: 1,

      produto: '',
      quantidade: 1,
  
      products: [],
      options: stringOptions,
      isOpen: false,
    }
  },
  
	mounted () {
    this.loadDonations()
	},
	
	methods: {
    async loadDonations () {
      this.donations = await this.$axios.post('http://localhost:4040/donation/me', '', {
        headers: {
          'x-access-token': this.token
        }
      })
    },

		addItem () {
			this.products.push({
        descricao: this.produto,
        quantidade: this.quantidade
      });
			this.produto = ''
      this.quantity = 1
    },
    
		deltItem (pos) {
			this.products.splice(pos, 1)
    },

		createDonation () {
			const data = {
        titulo: this.title,
        descricao: this.descricao,
        quantidade: this.quant,
        produtos: this.products
      }
			
      this.$axios.post('http://localhost:4040/donation/new', data, {
        headers: {
          'x-access-token': this.token
        }
      }).then(() => {
        this.donation = false
        this.$swal({
          icon: 'success',
          title: 'Muito bem!',
          text: 'Sua Doação Foi Criada Com Sucesso.',
          footer: '<small>Aguarde alguma ONG aceitar esta doação.</small>'
        })

        this.protocol = null
        this.title = null
        this.descricao = null
        this.quant = 1
        this.produto = ''
        this.quantity = 1
        this.products = []

        this.loadDonations()
      }).catch(err => {
        this.donation = false
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo Deu Errado',
          footer: '<small>'+ err +'</small>'
        })
      })
    },
    
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
	}
}
</script>

<style lang="scss" scoped>
  .nothing {
    position: fixed;
    margin-top: 170px;

    font-size: 45px;
  }

  .itens {
		margin-top: 5px;
		.itemTitle {
			text-align: center;
			font-size: 20px;
			font-weight: bold;
		}
	}
  .createPack {
    width: 100%;
    max-width: 840px;
    height: 580px;
    border-radius: 15px;
    .itemsContainer {
      position: absolute;
      padding: 0 5px 0 5px;
      width: 95%;
      height: 125px;
      overflow: auto;
      .items {
        background-color: #ccc;
        border-top: 0.5px solid #ccc;
        height: 45px;
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
        .btnDel {
          position: absolute;
          right: 15px;
          font-size: 18px;
        }
      }
    }
    .actions {
      position: absolute;
      bottom: 0.5px;
      right: 10px;
    }
  }
  .main {
    width: 100%;
    height: auto;
    .add {
      position: absolute;
      top: 5%;
      right: 15px;
    }
  }
  /*inputs*/
  #msform {
    width: 97%;
    position: absolute;
    overflow: auto;

    padding-right: 15px;

    .input {
      border-radius: 3px;
      margin-bottom: 10px;
      width: 100%;
      box-sizing: border-box;
    }
  }
  /*buttons*/
  #msform .action-button {
    width: 100px;
    background: #1976D2;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 1px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px;
  }
  #msform .action-button:hover, #msform .action-button:focus {
    box-shadow: 0 0 0 2px white, 0 0 0 3px #1976D2;
  }
  /*headings*/
  .fs-title {
    font-size: 18px;
    text-transform: uppercase;
    color: #2C3E50;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .fs-subtitle {
    font-weight: normal;
    font-size: 13px;
    color: #666;
    margin-bottom: 20px;
  }
  /*progressbar*/
  #progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    /*CSS counters to number the steps*/
    counter-reset: step;
  }
  #progressbar li {
    list-style-type: none;
    color: #1976D2;
    text-transform: uppercase;
    font-size: 9px;
    width: 33.33%;
    float: left;
    position: relative;
  }
  #progressbar li:before {
    content: counter(step);
    counter-increment: step;
    width: 20px;
    line-height: 20px;
    display: block;
    font-size: 10px;
    color: #333;
    background: white;
    border-radius: 3px;
    margin: 0 auto 5px auto;
  }
  /*progressbar connectors*/
  #progressbar li:after {
    content: '';
    width: 100%;
    height: 2px;
    background: white;
    position: absolute;
    left: -50%;
    top: 9px;
    z-index: -1; /*put it behind the numbers*/
  }
  #progressbar li:first-child:after {
    /*connector not needed before the first step*/
    content: none; 
  }
  /*marking active/completed steps green*/
  /*The number of the step and the connector before it = green*/
  #progressbar li.active:before,  #progressbar li.active:after{
    background: #27AE60;
    color: white;
  }
  .ong {
    position: absolute;
    top: 420px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .rowIn {
    display: flex;
    width: 100%;

    justify-content: space-between;

    .prodIn {
      width: 420px;
      padding-right: 40px;
    }

    .prodSel {
      width: 410px;
      padding-bottom: 32px;
    }
  }

  .prodBtn {
    margin-top: 15px;
  }

  .autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
