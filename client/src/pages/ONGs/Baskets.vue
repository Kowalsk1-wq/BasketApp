<template>
  <q-page class="q-pa-md q-gutter-md justify-evenly">
    <div class="main row itens-center justify-evenly">
      <q-btn class="add" @click="basket = true" color="green" icon="add" label="Novo Pacote" />
      
      <q-list bordered class="rounded-borders" style="max-width: 100%">
        <q-item-label class="headerItem align-center" header>Minhas Cestas</q-item-label>

        <BasketItem v-for="b in baskets" :key="b.name" v-bind="b" />
      </q-list>
    </div>

    <q-dialog v-model="basket" persistent>
      <q-card class="createPack">
        <q-card-section>
          <div class="text-h6">Nova Cesta</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <form id="msform">
						<q-input type="text" v-model="name" label="Nome da Cesta" />
						<q-input type="text" v-model="description" label="Descrição" />
						<q-input type="text" v-model="item" label="Item">
							<template v-slot:after>
                <q-select v-model="quantity" :options="options" />
								<q-btn round dense flat icon="add" @click="addItem()" />
							</template>
						</q-input>
						<div class="itens">
							<p class="itemTitle">
								Items Aqui
							</p>
              <div class="itemsContainer">
                <div
                  class="items"
                  v-for="i in items" 
                  :key="i"
                >
                  <span><strong>{{ i.name }}</strong> - x{{ i.quantity }}</span> 
                  <q-btn class="btnDel" round dense flat icon="delete" @click="deltItem(items.indexOf(i))" />
                </div>
              </div>
						</div>
          </form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary actions">
          <q-btn flat label="Cancelar" @click="reset()" v-close-popup />
          <q-btn @click="createPack()" push color="primary" label="Confirmar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import BasketItem from 'components/BasketItem'

export default {
  name: 'PageBasket',
  components: {
    BasketItem
  },
  data () {
    return {
      token: localStorage.getItem('@accessToken'),
			basket: false,
			name: '',
			description: '',
			item: '',
      quantity: 1,

      options: [
        1, 
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],

			items: [],

			baskets: null
    }
	},

	mounted () {
		this.$axios.get("http://localhost:4000/baskets/me", {
			headers: {
				'x-access-token' : this.token
			}
		}).then(res => {
      this.baskets = res.data.baskets;
    });
	},
	
	methods: {
		addItem () {
			this.items.push({
        name: this.item,
        quantity: this.quantity
      });

			this.item = '';
      this.quantity = 1;
		},

		deltItem (pos) {
			this.items.splice(pos, 1);
		},

    reset() {
      this.name = '';
      this.description = '';

      this.item = '';
      this.quantity = 1;
    },

		createPack () {
			const data = {
				name: this.name,
				description: this.description,
        items: this.items
      };

			this.$axios.post("http://localhost:4000/baskets", {
        name: data.name,
        description: data.description,
        items: data.items
      }, {
				headers: {
					'x-access-token' : this.token
				}
      }).then(res => {
        console.log(res.data);

        this.name = '';
        this.description = '';
        this.items = [];
      });
		}
	}
}
</script>

<style lang="scss" scoped>
	.itens {
		margin-top: 15px;

		.itemTitle {
			text-align: center;
			font-size: 20px;
			font-weight: bold;
		}
	}

  .createPack {
    width: 100%;
    max-width: 840px;
    height: 540px;

    border-radius: 15px;

    .itemsContainer {
      position: absolute;
      width: 95%;
      height: 180px;

      overflow: auto;

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
      right: 5px;
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
  #msform input, #msform textarea {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    font-size: 13px;
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
</style>