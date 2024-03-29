#y
Sometimes you just want to see the content of an object and not be to ugly
and verbose about it. This is a simple node module to help with that.
## Usage

```javacript
require('y')(somethingToInpect)
```

You can inspect multiple objects.
```javascript
require('y')(obj1, obj2);
```

The default recursion depth of an inspected object is 2. This can be change by
calling the ``set()`` function with a new settings object.
```javascript
require('y').set({depth: 4});
require('y')(obj);
```

To make it recurse indefinitely set ``depth`` to ``null``. 
```javascript
var y = require('y').set({depth: null});
y(obj);
```
