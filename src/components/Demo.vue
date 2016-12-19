<template>
  <svg class="canvas" v-on:click="addpoint">
  <defs>
    <radialGradient id="gaussianGradient">
      <stop offset="0%" stop-color="white" stop-opacity=".75"/>
      <stop offset="20%" stop-opacity=".5"/>
      <stop offset="30%" stop-opacity=".34"/>
      <stop offset="60%" stop-opacity=".14"/>
      <stop offset="90%" stop-opacity=".02"/>
      <stop offset="100%" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g v-for="g in groups"
       v-bind:transform="transform(g)">
      <circle fill="url(#gaussianGradient)" cx='0' cy='0' r='1' title='gaussian' />
      <circle stroke="black" stroke-width=".001" fill="none" cx='0' cy='0' r='.1' title='0.1-sigma' />
    </g>
    <circle v-bind:cx="p[0]" v-bind:cy="p[1]" r="3" v-for="p in points"/>
    <text v-if="points.length === 0" x="100" y="50">Click to add points</text>

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
    },
    transform (g) {
      return `matrix(
        ${g.sigma[0][0]}
        ${g.sigma[1][0]}
        ${g.sigma[0][1]}
        ${g.sigma[1][1]}
        ${g.mu[0]}
        ${g.mu[1]}
      )`
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
