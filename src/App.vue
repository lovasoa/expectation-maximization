<template>
  <div id="app">
    <h1>expectation-maximization demo</h1>
    <demo v-bind:ngroups="ngroups"></demo>
    <label>Number of groups: <input type="number" v-model="ngroups"></label>
  </div>
</template>

<script>
import Demo from './components/Demo'

export default {
  name: 'DemoApp',
  components: {
    Demo
  },
  data () {
    return {
      ngroups: 2
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none;
}

label {
  display: block;
}
</style>
