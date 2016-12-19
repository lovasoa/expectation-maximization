# expectation-maximization

[![Build Status](https://travis-ci.org/lovasoa/expectation-maximization.svg?branch=master)](https://travis-ci.org/lovasoa/expectation-maximization)

Expectation–maximization (EM) algorithm for n-dimensional vectors, implemented in javascript.
This allows to fit points with a multivariate gaussian mixture model.

This can be used for statistical classification of multivariate data, anomaly
detection, or predictive analytics.

## Goal

You have n-dimensional datapoints that belong to k groups.
With this algorithm, you can detect not only which point belongs to which group, but also what the features of each group (mean, covariance) are.

The algorithm works by repetitively estimating the probability of each point to belong to each group, and maximizing the parameters of the groups so that they best fit the data. [Detailed description of the algorithm on wikipedia](https://en.wikipedia.org/wiki/Expectation%E2%80%93maximization_algorithm)

![Visualization of the consecutive steps of the algorithm. Image from Wikipedia](https://upload.wikimedia.org/wikipedia/commons/6/69/EM_Clustering_of_Old_Faithful_data.gif)

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

## Documentation

Auto-generated *jsdoc* documentation
[is available here](https://github.com/lovasoa/expectation-maximization/tree/master/docs)

## Demo

A basic demo is availaible here:
https://lovasoa.github.io/expectation-maximization/dist/
