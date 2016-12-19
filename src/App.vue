<template>
  <div id="app">
    <h1>expectation-maximization demo</h1>
    <demo></demo>
  </div>
</template>

<script>
import Demo from './components/Demo'

export default {
  name: 'DemoApp',
  components: {
    Demo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
