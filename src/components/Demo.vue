<template>
  <svg class="canvas" v-on:click="addpoint">
    <circle v-bind:cx="p[0]" v-bind:cy="p[1]" r="3" v-for="p in points"/>
    <text v-if="points.length === 0" x="100" y="50">Click to add points</text>

    <g v-for="g in groups">
      <!--
      <ellipse fill="rgba(200,189,170,0.5)"
               v-bind:cx="g.mu[0]" v-bind:cy="g.mu[1]"
               v-bind:rx="g.eigenvalues[0]" v-bind:ry="g.eigenvalues[1]">
    -->
      <circle fill="#de9985" v-bind:cx="g.mu[0]" v-bind:cy="g.mu[1]" r="5"/>
    </g>
  </svg>
</template>

<script>
var em = require('expectation-maximization')

export default {
  name: 'canvas',
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
