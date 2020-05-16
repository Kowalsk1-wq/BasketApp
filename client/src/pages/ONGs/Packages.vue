<template>
  <q-page class="q-pa-md q-gutter-md justify-evenly">
    <div class="main row itens-center justify-evenly">
      <q-btn class="add" @click="pack = true" color="green" icon="add" label="Novo Pacote" />
      
      <q-list bordered class="rounded-borders" style="max-width: 600px">
        <q-item-label header>Meus Pacotes</q-item-label>

        <PackageItem v-for="p in packs" :key="p.name" v-bind="p" />
      </q-list>
    </div>

    <q-dialog v-model="pack" persistent>
      <q-card style="min-width: 350px; max-height: 450px;">
        <q-card-section>
          <div class="text-h6">Novo Pacote</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <form id="msform">
						<q-input type="text" v-model="name" label="Nome do Pacote" />
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

							<p 
								v-for="i in items" 
								:key="i">
									{{ i.name }} - x{{ i.quantity }} 
									<q-btn round dense flat icon="delete" @click="deltItem(items.indexOf(i))" />
							</p>
						</div>
          </form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="reset()" v-close-popup />
          <q-btn @click="createPack()" push color="primary" label="Confirmar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PackageItem from 'components/PackageItem'

export default {
  name: 'PagePack',
  components: {
    PackageItem
  },
  data () {
    return {
      token: localStorage.getItem('@accessToken'),
			pack: false,
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

			packs: null
    }
	},

	mounted () {
		this.$axios.get("http://localhost:4000/requests/me", {
			headers: {
				'x-access-token' : this.token
			}
		}).then(res => {
      this.packs = res.data.packages;
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

			this.$axios.post("http://localhost:4000/requests", {
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

  .packs {
    
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