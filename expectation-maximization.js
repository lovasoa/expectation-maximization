// Expectation–maximization (EM) algorithm, implemented in Javascript (ES6) for floating-point variables
// Ophir LOJKINE, december 2016
// Published under WTFPL
//  == User parameters ==

var n = require("numeric");
var gaussian = require('multivariate-gaussian');

function multivariate_gaussian_fit(points, n_groups, epsilon) {

n_groups = n_groups || 1;
epsilon = epsilon || n.epsilon;

var dim = points[0].length; // dimension of the vector-space of the input data

// == Algorithm ==

// Maximization phase
function compute_groups(tiks) {
  const sum = n.sum(tiks);
  return tiks.map(function (tik) {
    // We use Number.EPSILON instead of zero to avoid converging to a null solution
    // If a group is currently far-off, we don't want it's weight to become 0, or its sigma to become infinite
    const tiksum = n.sum(tik);
    const weight = tiksum / sum;
    const mu = n.transpose(n.div(points,tiksum))
                  .map(xs => n.sum(n.mul(xs, tik)));
    var sigma =n.diag(n.rep([dim], n.epsilon));
    for(var i=0; i<points.length; i++) {
        var point = points[i];
        var diff = [n.sub(point, mu)];
        n.addeq(sigma, n.mul(tik[i] / tiksum,
                             n.dot(n.transpose(diff), diff)));
    }
    return {
        weight: weight,
        sigma:sigma,
        mu:mu
    }
  });
}

// Estimation phase
function tiks(groups) {
  var res = [];
  for (var g=0; g<n_groups; g++) {
    var line = [];
    var group = groups[g];
    // Precompute the density functions
    var density_fun = gaussian(group);
    for(var p=0; p<points.length; p++) {
      var point = points[p];
      line.push(group.weight * density_fun(point));
    }
    res.push(line);
  }
  for(var p=0; p<points.length; p++) {
    var sum = 0;
    for(var g=0; g<n_groups; g++) {
      sum += res[g][p];
    }
    for(var g=0; g<n_groups; g++) {
      res[g][p] /= sum;
    }
  }
  return res;
}

// Itereate, alterning estimation and maximization
var ts = n.random([n_groups, points.length]);
for (var i=0; i<1000; i++) {
  var groups = compute_groups(ts);
  var oldts = ts, ts = tiks(groups);

  var delta = n.norminf(n.sub(ts, oldts));
  if (delta <= epsilon) break;
}

return groups;
}

module.exports = multivariate_gaussian_fit;
