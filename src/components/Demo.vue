<template>
  <svg class="canvas" v-on:click="addpoint">
  <defs>
    <radialGradient id="gaussianGradient">
      <stop offset='0.00' stop-color='#FF4136' stop-opacity='0.477465'/>
      <stop offset='0.03' stop-color='#FF851B' stop-opacity='0.475083'/>
      <stop offset='0.05' stop-color='#FFDC00' stop-opacity='0.46801'/>
      <stop offset='0.08' stop-color='white' stop-opacity='0.456455'/>
      <stop offset='0.10' stop-color='white' stop-opacity='0.440756'/>
      <stop offset='0.12' stop-color='white' stop-opacity='0.421361'/>
      <stop offset='0.15' stop-color='white' stop-opacity='0.398812'/>
      <stop offset='0.18' stop-color='white' stop-opacity='0.373714'/>
      <stop offset='0.20' stop-color='white' stop-opacity='0.346711'/>
      <stop offset='0.23' stop-color='white' stop-opacity='0.318458'/>
      <stop offset='0.25' stop-color='white' stop-opacity='0.289597'/>
      <stop offset='0.28' stop-color='white' stop-opacity='0.260731'/>
      <stop offset='0.30' stop-color='white' stop-opacity='0.232407'/>
      <stop offset='0.33' stop-color='white' stop-opacity='0.205099'/>
      <stop offset='0.35' stop-color='white' stop-opacity='0.179198'/>
      <stop offset='0.38' stop-color='white' stop-opacity='0.15501'/>
      <stop offset='0.40' stop-color='white' stop-opacity='0.132753'/>
      <stop offset='0.43' stop-color='white' stop-opacity='0.11256'/>
      <stop offset='0.45' stop-color='white' stop-opacity='0.0944897'/>
      <stop offset='0.48' stop-color='white' stop-opacity='0.0785308'/>
      <stop offset='0.50' stop-color='white' stop-opacity='0.0646178'/>
      <stop offset='0.53' stop-color='white' stop-opacity='0.0526407'/>
      <stop offset='0.55' stop-color='white' stop-opacity='0.0424569'/>
      <stop offset='0.58' stop-color='white' stop-opacity='0.0339026'/>
      <stop offset='0.60' stop-color='white' stop-opacity='0.0268024'/>
      <stop offset='0.62' stop-color='white' stop-opacity='0.0209783'/>
      <stop offset='0.65' stop-color='white' stop-opacity='0.0162565'/>
      <stop offset='0.68' stop-color='white' stop-opacity='0.0124721'/>
      <stop offset='0.70' stop-color='white' stop-opacity='0.00947342'/>
      <stop offset='0.73' stop-color='white' stop-opacity='0.00712415'/>
      <stop offset='0.75' stop-color='white' stop-opacity='0.00530416'/>
      <stop offset='0.78' stop-color='white' stop-opacity='0.00390982'/>
      <stop offset='0.80' stop-color='white' stop-opacity='0.00285334'/>
      <stop offset='0.83' stop-color='white' stop-opacity='0.00206162'/>
      <stop offset='0.85' stop-color='white' stop-opacity='0.00147475'/>
      <stop offset='0.88' stop-color='white' stop-opacity='0.00104445'/>
      <stop offset='0.90' stop-color='white' stop-opacity='0.000732341'/>
      <stop offset='0.93' stop-color='white' stop-opacity='0.000508388'/>
      <stop offset='0.95' stop-color='white' stop-opacity='0.00034941'/>
      <stop offset='0.98' stop-color='white' stop-opacity='0.000237756'/>
    </radialGradient>
  </defs>

  <g v-for="g in groups"
       v-bind:transform="transform(g)">
      <circle fill="url(#gaussianGradient)" cx='0' cy='0' r='1' title='gaussian' />
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
