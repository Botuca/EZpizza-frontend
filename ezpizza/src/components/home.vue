<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/pizza.gif')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex xs12>
        <div class="tab-pedido-size">
          <tab-pedidos />
        </div>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
import TabPedidos from './tab-pedidos';

export default {
  name: 'Home',
  components: {
    TabPedidos,
  },
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
.tab-pedido-size {
  margin-left: 190px;
  margin-right: 190px;
}
</style>
