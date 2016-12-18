<a name="multivariate_gaussian_fit"></a>

## multivariate_gaussian_fit(points, n_groups, epsilon) ⇒ <code>Array.&lt;{weight:number, mu:Array.&lt;number&gt;, sigma:Array.&lt;Array.&lt;number&gt;&gt;}&gt;</code>
Fit multivariate data with a gaussian mixture model using the EM algorithm.

**Kind**: global function  
**Returns**: <code>Array.&lt;{weight:number, mu:Array.&lt;number&gt;, sigma:Array.&lt;Array.&lt;number&gt;&gt;}&gt;</code> - The groups  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;Array.&lt;numer&gt;&gt;</code> | An non-empty array of points. N-dimensional point is represented by an array with N elements. |
| n_groups | <code>number</code> | number of clusters |
| epsilon | <code>number</code> | A parameter indicating when to stop iterating. When the difference in probability varies by less than epsilon between two steps, then consider we have converged. |

