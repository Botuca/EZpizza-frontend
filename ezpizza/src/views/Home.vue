<template>
  <div class="home">
    <HelloWorld color="rgb(248, 248, 143)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/home.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
