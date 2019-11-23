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
        <sabores-card/>
      </div>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import SaboresCard from './sabores-card';

  export default {
    name: 'TabPedidos',
    components: {
      SaboresCard,
    },
    data () {
      return {
        selectedTab: {},
        tabs: [
          { id: 1, nome: 'Sabores' },
          { id: 2, nome: 'Dados Pessoais' },
          { id: 3, nome: 'Pagamento' },
          { id: 4, nome: 'Confirmação' },
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    computed: {
      isTabSabores() {
        return this.selectedTab && this.selectedTab.nome === 'Sabores';
      },
    },
    methods: {
      setSelectedTab(tab) {
        this.selectedTab = tab;
      },
    },
  }
</script>

<style lang="scss" scoped>
.pedido-text {
  font-size: 20px;
}
</style>