<template>
<svg>
  <circle
    v-bind:transform="transformMatrix"
    fill="url(#gaussianGradient)"
    cx='0' cy='0' r='1' title='gaussian'
    />
</svg>
</template>

<script>
export default {
  name: 'group',
  props: ['group'],
  data () {
    return {}
  },
  computed: {
    transformMatrix () {
      const g = this.group
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
