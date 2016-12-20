"use strict";
// Expectation–maximization (EM) algorithm, implemented in js
// Ophir LOJKINE, december 2016
// Published under WTFPL

//  == User parameters ==
var n = require("numeric");
var Gaussian = require('multivariate-gaussian');

/**
 * Represents group of points (a single gaussian in the gaussian mixture)
 * @class
 */
function Group(weight, mu, sigma) {
  /** The number of points in the group divided by the total number of points
   * (*a-priori* probability of the group)
   * @member {number}
   **/
  this.weight = weight;

  /**
   * The mean vector of the gaussian
   * @member {Array<number>}
   **/
  this.mu = mu;

  /**
   * The covariance matrix
   * @member {Array<Array<number>>}
   **/
  this.sigma = sigma;

  /**
   * Gaussian object
   * @private
   */
  this._gaussian = new Gaussian(this);
}

/**
 * Evaluates the probability that a point belongs to the group
 * @param {Array<number>} point
 * @return {number} The probability
 */
Group.prototype.probability = function(point) {
  return this.weight * this._gaussian.density(point);
};

/**
 * Fit multivariate data with a gaussian mixture model using the EM algorithm.
 * @param {Array<Array<numer>>} points An non-empty array of points. N-dimensional point is represented by an array with N elements.
 * @param {number} n_groups number of clusters
 * @param {?number} epsilon A parameter indicating when to stop iterating. When the difference in probability varies by less than epsilon between two steps, then consider we have converged.
 * @return {Array<Group>} The groups
 */
function multivariate_gaussian_fit(points, n_groups, epsilon) {
  n_groups = n_groups || 1;
  epsilon = epsilon || n.epsilon;

  // dimension of the vector-space of the input data
  var dim = points[0].length;

  var transposed_points = n.transpose(points);

  // == Algorithm ==
  // Maximization phase
  function compute_groups(tiks) {
    var len = tiks.length;
    var res = new Array(len);
    var sum = n.sum(tiks);
    for(var g=0; g<len; g++) {
      var tik = tiks[g];
      var tiksum = n.sum(tik);
      if (tiksum < n.epsilon) {
        tik = n.rep([tik.length], n.epsilon);
        tiksum = tik.length * n.epsilon;
      }
      // Compute the weight
      var weight = tiksum / sum;
      // Compute the mean
      var mu = n.div(transposed_points, tiksum);
      for(var m=0; m<mu.length; m++) mu[m] = n.sum(n.muleq(mu[m], tik));
      // Compute the covariance
      var sigma = n.diag(n.rep([dim], n.epsilon));
      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var diff = n.sub(point, mu);
        var coeff = tik[i] / tiksum;
        var diffdiff = n.rep([dim, dim], 0);
        for (var a=0; a<diff.length; a++) {
          for (var b=0; b<=a; b++) {
            var tmp = coeff * diff[a] * diff[b];
            sigma[a][b] += tmp;
            if (b !== a) sigma[b][a] += tmp;
          }
        }
      }
      res[g] = new Group(weight, mu, sigma);
    }
    return res;
  }

  // == Estimation phase ==
  function tiks(groups) {
    var res = new Array(points.length);

    for (var p = 0; p < points.length; p++) {
      var point = points[p];
      var line = new Array(n_groups);
      var sum = 0;
      // Compute the raw density values
      for (var g = 0; g < n_groups; g++) {
        var group = groups[g];
        var proba =  group.probability(point);
        line[g] = proba;
        sum += proba;
      }
      // Convert to probabilities by dividing by the sum
      if (sum > 0) for (var g = 0; g < n_groups; g++) line[g] /= sum;
      else for (var g = 0; g < n_groups; g++) line[g] = 1/n_groups;
      res[p] = line;
    }

    return n.transpose(res);
  }

  // == Main loop ==
  // Attribute points to groups randomly
  var ts = n.random([n_groups, points.length]);
  // Itereate, alterning estimation and maximization
  for (var i = 0; i < 1000; i++) {
    var groups = compute_groups(ts);
    var oldts = ts;
    ts = tiks(groups);
    var delta = n.norminf(n.sub(ts, oldts));
    if (delta <= epsilon) break;
  }
  return groups;
}

module.exports = multivariate_gaussian_fit;
