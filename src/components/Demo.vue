<template>
  <svg class="canvas" v-on:click="addpoint">
  <defs>
    <gaussian-gradiant />
  </defs>

    <gaussian-group v-for="g in groups" v-bind:group="g"/>
    <circle v-bind:cx="p[0]" v-bind:cy="p[1]" r="3" v-for="p in points"/>
    <text v-if="points.length === 0" x="100" y="50">Click to add points</text>

  </svg>
</template>

<script>
var em = require('expectation-maximization')
import GaussianGradiant from './GaussianGradiant'
import GaussianGroup from './Group'

export default {
  name: 'canvas',
  components: {GaussianGradiant, GaussianGroup},
  data () {
    return {
      points: [],
      groups: []
    }
  },
  methods: {
    addpoint (evt) {
      const box = this.$el.getBoundingClientRect()
      const x = evt.clientX - box.left
      const y = evt.clientY - box.top
      this.points.push([x, y])
      setTimeout(() => {
        var res = em(this.points, 2)
        this.groups = res
      }, 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  margin:auto;
  width: 1000px;
  height: 750px;
  background-color: #7FDBFF;
  margin: auto;
  border: 1px solid #2c3e50;
  border-radius: 3px;
  box-shadow: 1px 1px 2px #2c3e5099;
}
</style>
