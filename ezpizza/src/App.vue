<template>
  <v-app>
    <v-app-bar
      app
      color="rgb(248, 248, 143)"
    >
      <h2>EzPizza</h2>
    </v-app-bar>

    <v-content class="color-site">
      <home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.color-site {
  background-color: rgb(254, 99, 63);
}
</style>
