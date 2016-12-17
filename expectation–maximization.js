// Expectation–maximization (EM) algorithm, implemented in Javascript (ES6) for floating-point variables
// Ophir LOJKINE, december 2016
// Published under WTFPL
//  == User parameters ==

var n = require("numeric");
var gaussian = require('multivariate-gaussian');

function multivariate_gaussian_fit(points, n_groups, epsilon) {

n_groups = n_groups || 1;
epsilon = epsilon || 1e-5;

var k = points[0].length; // dimension of the vector-space of the input data

// Random initialization parameters for our data groups
var groups = n.rep([n_groups], 0).map(() => ({
    sigma: n.diag(n.random([k])),
    mu: n.random([k]),
    weight:Math.random()
}));

// == Algorithm ==

// Maximization phase
function update_groups(groups, tiks) {
  const npoints = points.length;
  return groups.map(function (group, k) {
    // We use Number.EPSILON instead of zero to avoid converging to a null solution
    // If a group is currently far-off, we don't want it's weight to become 0, or its sigma to become infinite
    const tiksum = tiks.reduce((p,tik) => p + tik[k], n.epsilon);
    return tiks.reduce(function (newgroup, tik, i) {
      const tickval = tik[k], curpoint = points[i];
      newgroup.weight += tickval / npoints;
      n.addeq(newgroup.mu, n.mul(tickval/tiksum, curpoint));
      const diff = [n.sub(curpoint, group.mu)];
      n.addeq(newgroup.sigma,
              n.mul(tickval / tiksum,
                    n.dot(n.transpose(diff), diff)));
      return newgroup;
     }, {
          weight:n.epsilon,
          mu: n.mul(group.mu, 0),
          sigma: n.muleq(n.identity(group.mu.length), n.epsilon/100)
     });
  });
}

// Estimation phase
function tiks(groups) {
  // Precompute the density functions
  const density = groups.map(gaussian);
  // Return for each point, the probability of it being in each group
  return points.map(function(point) {
    // coeff = 1 / sum(density[i](point))
    const coeff = 1 / n.sum(density.map(f => f(point)));
    return groups.map((group, i) => coeff * density[i](point));
  });
}

// Itereate, alterning estimation and maximization
var ts = null;
for (var i=0; i<300; i++) {
  var oldts = ts, ts = tiks(groups);
  if (oldts) {
    var delta = n.sum(n.abs(n.sub(ts, oldts)));
    if (delta <= epsilon) break;
  }
  groups = update_groups(groups, ts);
}

return groups;
}

// Our data points
var points = [];
for(var i=0; i<500; i++)
  points.push(Math.random() > .5 ? [Math.random(), Math.random()]
                                 : [-1 + 2*Math.random(), 2*Math.random()]);

var groups = multivariate_gaussian_fit(points, 2, 1e-5);
console.log(JSON.stringify(groups, null, '  '));
