<template>
  <v-card>
    <div>
      <h3>FAÇA SEU PEDIDO:</h3>
    </div>
    <v-tabs
      background-color="rgb(248, 248, 143)"
      color="black"
      centered
    >
      <v-tabs-slider ></v-tabs-slider>
      <v-tab
        v-for="tab in tabs"
        :key="tab.id"
        v-model="selectedTab"
        @click="setSelectedTab(tab)"
      >
        {{ tab.nome }}
      </v-tab>
    </v-tabs>

    <v-tabs-items color="black">

      <div v-if=isTabSabores>
        <v-card flat height="800px">
          <v-card-text>
            <v-row>
              <v-col md=4>
                <v-radio-group :mandatory="false" v-model="selectedTamanho">
                  <v-label>Tamanhos:</v-label>
                  <v-radio 
                    v-for="tamanho in tamanhos"
                    :key="tamanho.nome"
                    :label="`${tamanho.nome} - R$${tamanho.preco},00 - ${tamanho.diametro}cm`"
                    :value="tamanho.id"
                  />
                </v-radio-group>
              </v-col>

              <v-col>
                <v-radio-group :mandatory="false" v-model="selectedBorda">
                  <v-label>Bordas:</v-label>
                  <v-radio
                    v-for="borda in bordas"
                    :key="borda.nome"
                    :label="`${borda.nome} - R$${borda.precoAdicional}0`"
                    :value="borda.id"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <h5 class="text-left">OBS: por padrão, a tabela está ordenada do sabor mais popular para a menos popular</h5>
            <v-data-table
              v-model="selectedSabores"
              :headers="cabecalho"
              :items="sabores"
              item-key="nome"
              show-select
              class="elevation-1"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="isTabDadosPessoais">
        <v-card flat height="800px">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="formCliente.nome"
                    :rules="nameRules"
                    :counter="40"
                    label="Nome"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="formCliente.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-model="formCliente.cartao"
                    label="Cartão"
                    required
                  />
                </v-col>
              </v-row>

              <v-textarea
                name="input-7-1"
                label="Endereço"
                v-model="formCliente.endereco"
              />

              <div class="my-2">
                <v-btn color="success" @click="irParaConfirmacao">Confirmar Pedido</v-btn>
              </div>
              <h4 style="margin-top: 50px;">{{ textoConfirmacao }}</h4>
            </v-container>
          </v-form>
        </v-card>
      </div>

    </v-tabs-items>
  </v-card>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'TabPedidos',
    data () {
      return {
        nameRules: [
          v => !!v || 'Nome é obrigatório',
          v => v.length <= 40 || 'O nome precisa ter menos de 40 caracteres',
        ],
        emailRules: [
          v => !!v || 'E-mail é obrigatório',
          v => /.+@.+/.test(v) || 'E-mail deve ser válido',
        ],
        cabecalho: [
          {
            text: 'Sabor',
            align: 'left',
            value: 'nome',
          },
          { text: 'Ingredientes', value: 'ingredientes' },
          { text: 'Preço', align: 'right', value: 'precoAdicional'},
        ],
        formCliente: {nome: '', email: '', endereco: '', cartao: ''},
        tabs: [
          { id: 1, nome: 'Sabores' },
          { id: 2, nome: 'Dados Pessoais' },
        ],
        bordas: [],
        sabores: [],
        tamanhos: [],
        selectedBorda: null,
        selectedTamanho: null,
        selectedSabores: [],
        selectedTab: {},
        textoConfirmacao: '',
      }
    },
    computed: {
      isTabSabores() {
        return this.selectedTab && this.selectedTab.nome === 'Sabores';
      },
      isTabDadosPessoais() {
        return this.selectedTab && this.selectedTab.nome === 'Dados Pessoais';
      },
      isTabConfirmacao() {
        return this.selectedTab && this.selectedTab.nome === 'Confirmação';
      }
    },
    created() {
      this.selectedTab = this.tabs[0];
      this.loadSabores();
      this.loadBordas();
      this.loadTamanhos();
      this.save();
    },
    methods: {
      loadTamanhos() {
        this.axios = require("axios");
        axios({
          url: 'http://167.71.188.116:3456/graphql',
          method: 'post',
          crossdomain: true,
          mode: 'no-cors',
          data: {
            query: `{
              tamanhos {
                id,
                nome,
                preco,
                diametro
              }
            }`
          }
        }).then((result) => {
          this.tamanhos = result.data.data.tamanhos;
        });
      },
      loadBordas() {
        this.axios = require("axios");
        axios({
          url: 'http://167.71.188.116:3456/graphql',
          method: 'post',
          crossdomain: true,
          mode: 'no-cors',
          data: {
            query: `{
              bordas {
                id,
                nome,
                precoAdicional
              }
            }`
          }
        }).then((result) => {
          this.bordas = result.data.data.bordas;
        });
      },
      loadSabores() {
        this.axios = require("axios");
        axios({
          url: 'http://167.71.188.116:3456/graphql',
          method: 'post',
          crossdomain: true,
          mode: 'no-cors',
          data: {
            query: `{
              sabores {
                id,
                nome,
                ingredientes,
                precoAdicional
              }
            }`
          }
        }).then((result) => {
          this.sabores = result.data.data.sabores;
        });
      },
      setSelectedTab(tab) {
        this.selectedTab = tab;
      },
      irParaConfirmacao() {
        this.save();
        this.setSelectedTab(this.tabs[2]);
        this.textoConfirmacao = 'Um email foi enviado para INSIRA EMAIL AQUI. Confirme seu pedido por lá :)'
      },
      save() {
        const saboresIds = this.selectedSabores.map(sabor => {
          return sabor.id;
        });

        this.axios = require("axios");
        axios({
          url: 'http://167.71.188.116:3456/graphql',
          method: 'post',
          crossdomain: true,
          mode: 'no-cors',
          data: {
            query: `
              mutation {
                createPedido(
                  email: "${this.formCliente.email}",
                  endereco: "${this.formCliente.endereco}",
                  tamanho: ${this.selectedTamanho},
                  sabores: [${saboresIds}],
                  borda: ${this.selectedBorda}
                ) {
                  id
                }
              }
            `
          }
        }).then(() => {
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
.pedido-text {
  font-size: 20px;
}
</style>