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
      this.points.push([evt.clientX, evt.clientY])
      var res = em(this.points, 2)
      this.groups = res
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: #7FDBFF;
  margin: auto;
}
</style>
