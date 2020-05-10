<template>
  <q-page class="justify-evenly">
    <div class="main row itens-center justify-evenly">
      <q-btn class="add" @click="pack = true" color="green" icon="add" label="Novo Pacote" />
      <q-btn class="see" color="grey" icon="visibility" label="Ver Pacotes" />
    </div>

    <q-dialog v-model="pack" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Novo Pacote</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <form id="msform" @submit="onSubmit" @reset="onReset">
            <!-- fieldsets -->
            <fieldset>
              <input type="text" v-model="name" name="name" placeholder="Nome do Pacote" />
              <input type="text" v-model="description" name="desc" placeholder="Descrição" />
            </fieldset>
          </form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat  label="Cancelar" v-close-popup />
          <q-btn push color="primary" label="Confirmar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PagePack',
  data () {
    return {
      pack: false,
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: auto;

    .add {
      position: absolute;
      top: 2%;
      right: 185px;
    }

    .see {
      @extend .add;
      right: 15px;
    }
  }
  #msform fieldset {
    font-family: 'Roboto';
    background: white;
    border: 0 none;
    border-radius: 3px;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
    padding: 20px 30px;
    box-sizing: border-box;
    width: 80%;
    margin: 0 10%;
    
    /*stacking fieldsets above each other*/
    position: relative;
  }
  /*Hide all except first fieldset*/
  #msform fieldset:not(:first-of-type) {
    display: none;
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