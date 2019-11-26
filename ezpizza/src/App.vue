<template>
  <div>
    <v-app>
      <v-app-bar
        app
        color="rgb(248, 248, 143)"
      >
        <h2>EzPizza</h2>
      </v-app-bar>

      <v-content class="color-site">
        <router-view color-site/>
      </v-content>
    </v-app>
  </div>
</template>

<style lang="scss" scoped>
.color-site {
  background-color: rgb(254, 99, 63);
}
</style>
