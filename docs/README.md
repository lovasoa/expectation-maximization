## Classes

<dl>
<dt><a href="#Group">Group</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#multivariate_gaussian_fit">multivariate_gaussian_fit(points, n_groups, epsilon)</a> ⇒ <code><a href="#Group">Array.&lt;Group&gt;</a></code></dt>
<dd><p>Fit multivariate data with a gaussian mixture model using the EM algorithm.</p>
</dd>
</dl>

<a name="Group"></a>

## Group
**Kind**: global class  

* [Group](#Group)
    * [new Group()](#new_Group_new)
    * [.weight](#Group+weight) : <code>number</code>
    * [.mu](#Group+mu) : <code>Array.&lt;number&gt;</code>
    * [.sigma](#Group+sigma) : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

<a name="new_Group_new"></a>

### new Group()
Represents group of points (a single gaussian in the gaussian mixture)

<a name="Group+weight"></a>

### group.weight : <code>number</code>
The number of points in the group divided by the total number of points
(*a-priori* probability of the group)

**Kind**: instance property of <code>[Group](#Group)</code>  
<a name="Group+mu"></a>

### group.mu : <code>Array.&lt;number&gt;</code>
The mean vector of the gaussian

**Kind**: instance property of <code>[Group](#Group)</code>  
<a name="Group+sigma"></a>

### group.sigma : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
The covariance matrix

**Kind**: instance property of <code>[Group](#Group)</code>  
<a name="multivariate_gaussian_fit"></a>

## multivariate_gaussian_fit(points, n_groups, epsilon) ⇒ <code>[Array.&lt;Group&gt;](#Group)</code>
Fit multivariate data with a gaussian mixture model using the EM algorithm.

**Kind**: global function  
**Returns**: <code>[Array.&lt;Group&gt;](#Group)</code> - The groups  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;Array.&lt;numer&gt;&gt;</code> | An non-empty array of points. N-dimensional point is represented by an array with N elements. |
| n_groups | <code>number</code> | number of clusters |
| epsilon | <code>number</code> | A parameter indicating when to stop iterating. When the difference in probability varies by less than epsilon between two steps, then consider we have converged. |

