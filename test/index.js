var multivariate_gaussian_fit = require('../');
var n = require('numeric');
var assert = require('assert');

function assertNear(a, b, epsilon) {
  epsilon = epsilon || .1;
  assert(n.norm2(n.sub(a,b)) < epsilon,
         JSON.stringify(a) + ' near ' + JSON.stringify(b));
}

// Our data points
// We create two groups: one centered on (5,5), the other on(0,1)
var points = [];
var groups = [{weight: .3, mu: [5,5]},{weight: .7, mu: [0,1]}];
for(var i=0; i<10000; i++) {
  var group = Math.random() < groups[0].weight ? 0 : 1;
  var mu = groups[group].mu;
  var r = n.clone(mu);
  var N = 10;
  for(var k=0; k<N; k++) n.addeq(r, n.sub(n.random([2]),[.5,.5]));
  points.push(r);
}

var result = multivariate_gaussian_fit(points, 2);
result.sort((a,b) => a.weight - b.weight);
console.log(result)

assertNear(result[0].weight, groups[0].weight);
assertNear(result[0].mu, groups[0].mu);
assertNear(result[1].weight, groups[1].weight);
assertNear(result[1].mu, groups[1].mu);
