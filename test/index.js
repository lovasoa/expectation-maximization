'use strict';

var multivariate_gaussian_fit = require('../');
var n = require('numeric');
var tape = require('tape');

function isNear(a, b, epsilon) {
  epsilon = epsilon || .1;
  return n.norm2(n.sub(a, b)) < epsilon;
}

tape('works with 10000 points', function(assert) {
  // Our data points
  // We create two groups: one centered on (5,5), the other on(0,1)
  var points = [];
  var groups = [{
    weight: .3,
    mu: [5, 5]
  }, {
    weight: .7,
    mu: [0, 1]
  }];
  for (var i = 0; i < 10000; i++) {
    var group = Math.random() < groups[0].weight ? 0 : 1;
    var mu = groups[group].mu;
    var r = n.clone(mu);
    var N = 10;
    for (var k = 0; k < N; k++) {
      n.addeq(r, n.sub(n.random([2]), [.5, .5]));
    }
    points.push(r);
  }

  var result = multivariate_gaussian_fit(points, 2);
  result.sort(function (a, b) {
    return a.weight - b.weight;
  });

  assert.ok(isNear(result[0].weight, groups[0].weight));
  assert.ok(isNear(result[0].mu, groups[0].mu));
  assert.ok(isNear(result[1].weight, groups[1].weight));
  assert.ok(isNear(result[1].mu, groups[1].mu));
  assert.end();
});

tape('works with just two points', function(assert) {
  var points = [[    241,    253  ],  [    1240,    214  ]];
  var groups;
  assert.doesNotThrow(function() {
    groups = multivariate_gaussian_fit(points, 2);
  });
  assert.ok(isNear(groups[0].weight, .5), 'first group weight = 50%');
  assert.ok(isNear(groups[1].weight, .5), 'second group weight = 50%');
  /*
  var max;
  max = Math.max(groups[0]._gaussian.density(points[0]), groups[1]._gaussian.density(points[0]));
  assert.ok(max > .8, 'The first point is in a group');
  max = Math.max(groups[0]._gaussian.density(points[1]), groups[1]._gaussian.density(points[1]));
  assert.ok(max > .8, 'The second point is in a group');
  */
  assert.end();
});
