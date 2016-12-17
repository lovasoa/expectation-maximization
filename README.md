# expectation-maximization

[![Build Status](https://travis-ci.org/lovasoa/expectation-maximization.svg?branch=master)](https://travis-ci.org/lovasoa/expectation-maximization)

Expectation–maximization (EM) algorithm for n-dimensional vectors, implemented in javascript.
This allows to fit points with a multivariate gaussian mixture model.

This can be used for statistical classification of multivariate data, anomaly
detection, or predictive analytics.

## How to use

 ```js
var expectation_maximization = require('expectation-maximization');

// n-dimensional data points are stored as a simple array of array
var points = [
  [1,2], [3,4], [5,6]
];

var n_groups = 2; // We clusterize our data into two groups
var groups = expectation_maximization(points, n_groups);

////// result:
[
  {
    weight: .5, // weight (a-priori probabibility) of the group
    mu: [2, 3], // mean vector of the group
    sigma: [[1,0],[0,1]] // covariance matrix of the group
  },
  ... // other groups
]
 ```
