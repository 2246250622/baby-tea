var _
,   FN = "constructor"
,   PT = "prototype"
,   FP = _Function[PT]

,   AP     = _Array[PT]
,   _slice = AP.slice

,   OP           = _Object[PT]
,   hasProtoProp = typeof ''.__proto__ == "object"
,   objToString  = OP.toString
,   hasOwn       = OP.hasOwnProperty
,   getget       = OP.__lookupGetter__
,   getset       = OP.__lookupSetter__
,   setget       = OP.__defineGetter__
,   setset       = OP.__defineSetter__

,   nativeForEach      = AP.forEach
,   nativeMap          = AP.map
,   nativeReduce       = AP.reduce
,   nativeReduceRight  = AP.reduceRight
,   nativeFilter       = AP.filter
,   nativeEvery        = AP.every
,   nativeSome         = AP.some
,   nativeIndexOf      = AP.indexOf
,   nativeLastIndexOf  = AP.lastIndexOf
,   nativeIsArray      = _Array.isArray
,   nativeKeys         = _Object.keys
,   nativeBind         = FP.bind
;
