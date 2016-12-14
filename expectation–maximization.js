//  == User parameters ==

// Random initialization parameters for our 2 data groups
var groups = [{sigma:1, mu:0, weight:1}, {sigma:1, mu:5, weight:1}];
// Our data points
var points = [-1,0,1,1,1,1,1,1,1,1,1,2,3,4,5,5,5,5,5,5,5,6,7,8,50,50];

function prob_fun(params, x) {
  // Gaussian function
  var w = params.weight, sigma = params.sigma, mu = params.mu;
  var sqrt2PI = Math.sqrt(2 * Math.PI);
  var d = (x - mu) / sigma;
  return w * Math.exp(-d*d/2) / (sigma * sqrt2PI); 
}

// == Algorithm ==

// Maximization phase
function update_groups(groups, tiks) {
  const n = points.length;
  return groups.map(function (group, k) {
    const tiksum = tiks.reduce((p,tik) => p + tik[k], Number.EPSILON);
    return tiks.reduce(function (newgroup, tik, i) {
      const tickval = tik[k], curpoint = points[i];
      newgroup.weight += tickval / n;
      newgroup.mu += tickval * curpoint / tiksum;
      const diff = curpoint - group.mu;
      newgroup.sigma += tickval * diff*diff / tiksum;
      return newgroup;
     }, {weight:Number.EPSILON, mu:Number.EPSILON, sigma:Number.EPSILON});
  });
}

// Estimation phase
function tiks(groups) {
  return points.map(function(point) {
    const sum = groups.reduce(
                (part, group) => part + prob_fun(group, point),
                Number.EPSILON);
    return groups.map(group => prob_fun(group, point)/sum);
  });
}

// Itereate, alterning estimation and maximization
for (var i=0; i<2000; i++) {
  var ts = tiks(groups);
  groups = update_groups(groups, ts);
}

console.log(groups);
