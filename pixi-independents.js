const typeof_ = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ?
    "symbol" : typeof obj
}

const export_to_ = (src, dst) => {
  for (const k in src) {
    dst[k] = src[k]
  }
}

const create_class_ = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

const class_call_check_ = (instance, Constructor) => {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

const put_in_module_ = (src, dst) => {
  for (const name in src) {
    Object.defineProperty(dst, name, {
      enumerable: true,
      get: () => src[name]
    })
  }
  return dst
}

const interop_require_default_ = obj => {
  return obj && obj.__esModule ? obj : {
    default: obj
  }
}

const interop_require_wildcard_ = obj => {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}

const get_constructor_ = (self, call) => {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self
}

const inherits_ = (subClass, superClass) => {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
}

const bit_twiddle = (() => {
  "use strict"
  "use restrict"
  const exports = {}
  /**
   * Bit twiddling hacks for JavaScript.
   *
   * Author: Mikola Lysenko
   *
   * Ported from Stanford bit twiddling hack library:
   *    http://graphics.stanford.edu/~seander/bithacks.html
   */

  //Number of bits in an integer
  var INT_BITS = 32

  //Constants
  exports.INT_BITS = INT_BITS
  exports.INT_MAX = 0x7fffffff
  exports.INT_MIN = -1 << (INT_BITS - 1)

  //Returns -1, 0, +1 depending on sign of x
  exports.sign = function (v) {
    return (v > 0) - (v < 0)
  }

  //Computes absolute value of integer
  exports.abs = function (v) {
    var mask = v >> (INT_BITS - 1)
    return (v ^ mask) - mask
  }

  //Computes minimum of integers x and y
  exports.min = function (x, y) {
    return y ^ ((x ^ y) & -(x < y))
  }

  //Computes maximum of integers x and y
  exports.max = function (x, y) {
    return x ^ ((x ^ y) & -(x < y))
  }

  //Checks if a number is a power of two
  exports.isPow2 = function (v) {
    return !(v & (v - 1)) && (!!v)
  }

  //Computes log base 2 of v
  exports.log2 = function (v) {
    var r, shift
    r = (v > 0xFFFF) << 4
    v >>>= r
    shift = (v > 0xFF) << 3
    v >>>= shift
    r |= shift
    shift = (v > 0xF) << 2
    v >>>= shift
    r |= shift
    shift = (v > 0x3) << 1
    v >>>= shift
    r |= shift
    return r | (v >> 1)
  }

  //Computes log base 10 of v
  exports.log10 = function (v) {
    return (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
      (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
        (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0
  }

  //Counts number of bits
  exports.popCount = function (v) {
    v = v - ((v >>> 1) & 0x55555555)
    v = (v & 0x33333333) + ((v >>> 2) & 0x33333333)
    return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24
  }

  //Counts number of trailing zeros
  function countTrailingZeros(v) {
    var c = 32
    v &= -v
    if (v) c--
    if (v & 0x0000FFFF) c -= 16
    if (v & 0x00FF00FF) c -= 8
    if (v & 0x0F0F0F0F) c -= 4
    if (v & 0x33333333) c -= 2
    if (v & 0x55555555) c -= 1
    return c
  }
  exports.countTrailingZeros = countTrailingZeros

  //Rounds to next power of 2
  exports.nextPow2 = function (v) {
    v += v === 0
    --v
    v |= v >>> 1
    v |= v >>> 2
    v |= v >>> 4
    v |= v >>> 8
    v |= v >>> 16
    return v + 1
  }

  //Rounds down to previous power of 2
  exports.prevPow2 = function (v) {
    v |= v >>> 1
    v |= v >>> 2
    v |= v >>> 4
    v |= v >>> 8
    v |= v >>> 16
    return v - (v >>> 1)
  }

  //Computes parity of word
  exports.parity = function (v) {
    v ^= v >>> 16
    v ^= v >>> 8
    v ^= v >>> 4
    v &= 0xf
    return (0x6996 >>> v) & 1
  }

  var REVERSE_TABLE = new Array(256)

  void (function (tab) {
    for (var i = 0; i < 256; ++i) {
      var v = i,
        r = i,
        s = 7
      for (v >>>= 1; v; v >>>= 1) {
        r <<= 1
        r |= v & 1
        --s
      }
      tab[i] = (r << s) & 0xff
    }
  })(REVERSE_TABLE)

  //Reverse bits in a 32 bit word
  exports.reverse = function (v) {
    return (REVERSE_TABLE[v & 0xff] << 24) |
      (REVERSE_TABLE[(v >>> 8) & 0xff] << 16) |
      (REVERSE_TABLE[(v >>> 16) & 0xff] << 8) |
      REVERSE_TABLE[(v >>> 24) & 0xff]
  }

  //Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
  exports.interleave2 = function (x, y) {
    x &= 0xFFFF
    x = (x | (x << 8)) & 0x00FF00FF
    x = (x | (x << 4)) & 0x0F0F0F0F
    x = (x | (x << 2)) & 0x33333333
    x = (x | (x << 1)) & 0x55555555

    y &= 0xFFFF
    y = (y | (y << 8)) & 0x00FF00FF
    y = (y | (y << 4)) & 0x0F0F0F0F
    y = (y | (y << 2)) & 0x33333333
    y = (y | (y << 1)) & 0x55555555

    return x | (y << 1)
  }

  //Extracts the nth interleaved component
  exports.deinterleave2 = function (v, n) {
    v = (v >>> n) & 0x55555555
    v = (v | (v >>> 1)) & 0x33333333
    v = (v | (v >>> 2)) & 0x0F0F0F0F
    v = (v | (v >>> 4)) & 0x00FF00FF
    v = (v | (v >>> 16)) & 0x000FFFF
    return (v << 16) >> 16
  }


  //Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
  exports.interleave3 = function (x, y, z) {
    x &= 0x3FF
    x = (x | (x << 16)) & 4278190335
    x = (x | (x << 8)) & 251719695
    x = (x | (x << 4)) & 3272356035
    x = (x | (x << 2)) & 1227133513

    y &= 0x3FF
    y = (y | (y << 16)) & 4278190335
    y = (y | (y << 8)) & 251719695
    y = (y | (y << 4)) & 3272356035
    y = (y | (y << 2)) & 1227133513
    x |= (y << 1)

    z &= 0x3FF
    z = (z | (z << 16)) & 4278190335
    z = (z | (z << 8)) & 251719695
    z = (z | (z << 4)) & 3272356035
    z = (z | (z << 2)) & 1227133513

    return x | (z << 2)
  }

  //Extracts nth interleaved component of a 3-tuple
  exports.deinterleave3 = function (v, n) {
    v = (v >>> n) & 1227133513
    v = (v | (v >>> 2)) & 3272356035
    v = (v | (v >>> 4)) & 251719695
    v = (v | (v >>> 8)) & 4278190335
    v = (v | (v >>> 16)) & 0x3FF
    return (v << 22) >> 22
  }

  //Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
  exports.nextCombination = function (v) {
    var t = v | (v - 1)
    return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1))
  }
  return exports
})()

const earcut = (() => {
  'use strict'

  function earcut(data, holeIndices, dim) {

    dim = dim || 2

    var hasHoles = holeIndices && holeIndices.length,
      outerLen = hasHoles ? holeIndices[0] * dim : data.length,
      outerNode = linkedList(data, 0, outerLen, dim, true),
      triangles = []

    if (!outerNode) return triangles

    var minX, minY, maxX, maxY, x, y, invSize

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim)

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
      minX = maxX = data[0]
      minY = maxY = data[1]

      for (var i = dim; i < outerLen; i += dim) {
        x = data[i]
        y = data[i + 1]
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }

      // minX, minY and invSize are later used to transform coords into integers for z-order calculation
      invSize = Math.max(maxX - minX, maxY - minY)
      invSize = invSize !== 0 ? 1 / invSize : 0
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize)

    return triangles
  }

  // create a circular doubly linked list from polygon points in the specified winding order
  function linkedList(data, start, end, dim, clockwise) {
    var i, last

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
      for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last)
    } else {
      for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last)
    }

    if (last && equals(last, last.next)) {
      removeNode(last)
      last = last.next
    }

    return last
  }

  // eliminate colinear or duplicate points
  function filterPoints(start, end) {
    if (!start) return start
    if (!end) end = start

    var p = start,
      again
    do {
      again = false

      if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
        removeNode(p)
        p = end = p.prev
        if (p === p.next) break
        again = true

      } else {
        p = p.next
      }
    } while (again || p !== end)

    return end
  }

  // main ear slicing loop which triangulates a polygon (given as a linked list)
  function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize)

    var stop = ear,
      prev, next

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
      prev = ear.prev
      next = ear.next

      if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
        // cut off the triangle
        triangles.push(prev.i / dim)
        triangles.push(ear.i / dim)
        triangles.push(next.i / dim)

        removeNode(ear)

        // skipping the next vertice leads to less sliver triangles
        ear = next.next
        stop = next.next

        continue
      }

      ear = next

      // if we looped through the whole remaining polygon and can't find any more ears
      if (ear === stop) {
        // try filtering points and slicing again
        if (!pass) {
          earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1)

          // if this didn't work, try curing all small self-intersections locally
        } else if (pass === 1) {
          ear = cureLocalIntersections(ear, triangles, dim)
          earcutLinked(ear, triangles, dim, minX, minY, invSize, 2)

          // as a last resort, try splitting the remaining polygon into two
        } else if (pass === 2) {
          splitEarcut(ear, triangles, dim, minX, minY, invSize)
        }

        break
      }
    }
  }

  // check whether a polygon node forms a valid ear with adjacent nodes
  function isEar(ear) {
    var a = ear.prev,
      b = ear,
      c = ear.next

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next

    while (p !== ear.prev) {
      if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
        area(p.prev, p, p.next) >= 0) return false
      p = p.next
    }

    return true
  }

  function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
      b = ear,
      c = ear.next

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
      minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
      maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
      maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y)

    // z-order range for the current triangle bbox
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
      maxZ = zOrder(maxTX, maxTY, minX, minY, invSize)

    var p = ear.prevZ,
      n = ear.nextZ

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
      if (p !== ear.prev && p !== ear.next &&
        pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
        area(p.prev, p, p.next) >= 0) return false
      p = p.prevZ

      if (n !== ear.prev && n !== ear.next &&
        pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
        area(n.prev, n, n.next) >= 0) return false
      n = n.nextZ
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
      if (p !== ear.prev && p !== ear.next &&
        pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
        area(p.prev, p, p.next) >= 0) return false
      p = p.prevZ
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
      if (n !== ear.prev && n !== ear.next &&
        pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
        area(n.prev, n, n.next) >= 0) return false
      n = n.nextZ
    }

    return true
  }

  // go through all polygon nodes and cure small local self-intersections
  function cureLocalIntersections(start, triangles, dim) {
    var p = start
    do {
      var a = p.prev,
        b = p.next.next

      if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

        triangles.push(a.i / dim)
        triangles.push(p.i / dim)
        triangles.push(b.i / dim)

        // remove two nodes involved
        removeNode(p)
        removeNode(p.next)

        p = start = b
      }
      p = p.next
    } while (p !== start)

    return p
  }

  // try splitting polygon into two and triangulate them independently
  function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start
    do {
      var b = a.next.next
      while (b !== a.prev) {
        if (a.i !== b.i && isValidDiagonal(a, b)) {
          // split the polygon in two by the diagonal
          var c = splitPolygon(a, b)

          // filter colinear points around the cuts
          a = filterPoints(a, a.next)
          c = filterPoints(c, c.next)

          // run earcut on each half
          earcutLinked(a, triangles, dim, minX, minY, invSize)
          earcutLinked(c, triangles, dim, minX, minY, invSize)
          return
        }
        b = b.next
      }
      a = a.next
    } while (a !== start)
  }

  // link every hole into the outer loop, producing a single-ring polygon without holes
  function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
      i, len, start, end, list

    for (i = 0, len = holeIndices.length; i < len; i++) {
      start = holeIndices[i] * dim
      end = i < len - 1 ? holeIndices[i + 1] * dim : data.length
      list = linkedList(data, start, end, dim, false)
      if (list === list.next) list.steiner = true
      queue.push(getLeftmost(list))
    }

    queue.sort(compareX)

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
      eliminateHole(queue[i], outerNode)
      outerNode = filterPoints(outerNode, outerNode.next)
    }

    return outerNode
  }

  function compareX(a, b) {
    return a.x - b.x
  }

  // find a bridge between vertices that connects hole with an outer ring and and link it
  function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode)
    if (outerNode) {
      var b = splitPolygon(outerNode, hole)
      filterPoints(b, b.next)
    }
  }

  // David Eberly's algorithm for finding a bridge between hole and outer polygon
  function findHoleBridge(hole, outerNode) {
    var p = outerNode,
      hx = hole.x,
      hy = hole.y,
      qx = -Infinity,
      m

    // find a segment intersected by a ray from the hole's leftmost point to the left
    // segment's endpoint with lesser x will be potential connection point
    do {
      if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
        var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y)
        if (x <= hx && x > qx) {
          qx = x
          if (x === hx) {
            if (hy === p.y) return p
            if (hy === p.next.y) return p.next
          }
          m = p.x < p.next.x ? p : p.next
        }
      }
      p = p.next
    } while (p !== outerNode)

    if (!m) return null

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint
    // if there are no points found, we have a valid connection
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
      mx = m.x,
      my = m.y,
      tanMin = Infinity,
      tan

    p = m.next

    while (p !== stop) {
      if (hx >= p.x && p.x >= mx && hx !== p.x &&
        pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

        tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

        if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
          m = p
          tanMin = tan
        }
      }

      p = p.next
    }

    return m
  }

  // interlink polygon nodes in z-order
  function indexCurve(start, minX, minY, invSize) {
    var p = start
    do {
      if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize)
      p.prevZ = p.prev
      p.nextZ = p.next
      p = p.next
    } while (p !== start)

    p.prevZ.nextZ = null
    p.prevZ = null

    sortLinked(p)
  }

  // Simon Tatham's linked list merge sort algorithm
  // http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
  function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
      inSize = 1

    do {
      p = list
      list = null
      tail = null
      numMerges = 0

      while (p) {
        numMerges++
        q = p
        pSize = 0
        for (i = 0; i < inSize; i++) {
          pSize++
          q = q.nextZ
          if (!q) break
        }
        qSize = inSize

        while (pSize > 0 || (qSize > 0 && q)) {

          if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
            e = p
            p = p.nextZ
            pSize--
          } else {
            e = q
            q = q.nextZ
            qSize--
          }

          if (tail) tail.nextZ = e
          else list = e

          e.prevZ = tail
          tail = e
        }

        p = q
      }

      tail.nextZ = null
      inSize *= 2

    } while (numMerges > 1)

    return list
  }

  // z-order of a point given coords and inverse of the longer side of data bbox
  function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize
    y = 32767 * (y - minY) * invSize

    x = (x | (x << 8)) & 0x00FF00FF
    x = (x | (x << 4)) & 0x0F0F0F0F
    x = (x | (x << 2)) & 0x33333333
    x = (x | (x << 1)) & 0x55555555

    y = (y | (y << 8)) & 0x00FF00FF
    y = (y | (y << 4)) & 0x0F0F0F0F
    y = (y | (y << 2)) & 0x33333333
    y = (y | (y << 1)) & 0x55555555

    return x | (y << 1)
  }

  // find the leftmost node of a polygon ring
  function getLeftmost(start) {
    var p = start,
      leftmost = start
    do {
      if (p.x < leftmost.x) leftmost = p
      p = p.next
    } while (p !== start)

    return leftmost
  }

  // check if a point lies within a convex triangle
  function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
      (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
      (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0
  }

  // check if a diagonal between two polygon nodes is valid (lies in polygon interior)
  function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
      locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b)
  }

  // signed area of a triangle
  function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
  }

  // check if two points are equal
  function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y
  }

  // check if two segments intersect
  function intersects(p1, q1, p2, q2) {
    if ((equals(p1, q1) && equals(p2, q2)) ||
      (equals(p1, q2) && equals(p2, q1))) return true
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
      area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0
  }

  // check if a polygon diagonal intersects any polygon segments
  function intersectsPolygon(a, b) {
    var p = a
    do {
      if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
        intersects(p, p.next, a, b)) return true
      p = p.next
    } while (p !== a)

    return false
  }

  // check if a polygon diagonal is locally inside the polygon
  function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
      area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
      area(a, b, a.prev) < 0 || area(a, a.next, b) < 0
  }

  // check if the middle point of a polygon diagonal is inside the polygon
  function middleInside(a, b) {
    var p = a,
      inside = false,
      px = (a.x + b.x) / 2,
      py = (a.y + b.y) / 2
    do {
      if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
        (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
        inside = !inside
      p = p.next
    } while (p !== a)

    return inside
  }

  // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two
  // if one belongs to the outer ring and another to a hole, it merges it into a single ring
  function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
      b2 = new Node(b.i, b.x, b.y),
      an = a.next,
      bp = b.prev

    a.next = b
    b.prev = a

    a2.next = an
    an.prev = a2

    b2.next = a2
    a2.prev = b2

    bp.next = b2
    b2.prev = bp

    return b2
  }

  // create a node and optionally link it with previous one (in a circular doubly linked list)
  function insertNode(i, x, y, last) {
    var p = new Node(i, x, y)

    if (!last) {
      p.prev = p
      p.next = p

    } else {
      p.next = last.next
      p.prev = last
      last.next.prev = p
      last.next = p
    }
    return p
  }

  function removeNode(p) {
    p.next.prev = p.prev
    p.prev.next = p.next

    if (p.prevZ) p.prevZ.nextZ = p.nextZ
    if (p.nextZ) p.nextZ.prevZ = p.prevZ
  }

  function Node(i, x, y) {
    // vertice index in coordinates array
    this.i = i

    // vertex coordinates
    this.x = x
    this.y = y

    // previous and next vertice nodes in a polygon ring
    this.prev = null
    this.next = null

    // z-order curve value
    this.z = null

    // previous and next nodes in z-order
    this.prevZ = null
    this.nextZ = null

    // indicates whether this is a steiner point
    this.steiner = false
  }

  // return a percentage difference between the polygon area and its triangulation area
  // used to verify correctness of triangulation
  earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim))
    if (hasHoles) {
      for (var i = 0, len = holeIndices.length; i < len; i++) {
        var start = holeIndices[i] * dim
        var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length
        polygonArea -= Math.abs(signedArea(data, start, end, dim))
      }
    }

    var trianglesArea = 0
    for (i = 0; i < triangles.length; i += 3) {
      var a = triangles[i] * dim
      var b = triangles[i + 1] * dim
      var c = triangles[i + 2] * dim
      trianglesArea += Math.abs(
        (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
        (data[a] - data[b]) * (data[c + 1] - data[a + 1]))
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
      Math.abs((trianglesArea - polygonArea) / polygonArea)
  }

  function signedArea(data, start, end, dim) {
    var sum = 0
    for (var i = start, j = end - dim; i < end; i += dim) {
      sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1])
      j = i
    }
    return sum
  }

  // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
  earcut.flatten = function (data) {
    var dim = data[0][0].length,
      result = {
        vertices: [],
        holes: [],
        dimensions: dim
      },
      holeIndex = 0

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d])
      }
      if (i > 0) {
        holeIndex += data[i - 1].length
        result.holes.push(holeIndex)
      }
    }
    return result
  }
  return earcut
})()

const EventEmitter = (() => {

  'use strict'

  var has = Object.prototype.hasOwnProperty,
    prefix = '~'

  /**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @api private
   */
  function Events() { }

  //
  // We try to not inherit from `Object.prototype`. In some engines creating an
  // instance in this way is faster than calling `Object.create(null)` directly.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // character to make sure that the built-in object properties are not
  // overridden or used as an attack vector.
  //
  if (Object.create) {
    Events.prototype = Object.create(null)

    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false
  }

  /**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {Mixed} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @api private
   */
  function EE(fn, context, once) {
    this.fn = fn
    this.context = context
    this.once = once || false
  }

  /**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @api public
   */
  function EventEmitter() {
    this._events = new Events()
    this._eventsCount = 0
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @api public
   */
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [],
      events, name

    if (this._eventsCount === 0) return names

    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name)
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events))
    }

    return names
  }

  /**
   * Return the listeners registered for a given event.
   *
   * @param {String|Symbol} event The event name.
   * @param {Boolean} exists Only check if there are listeners.
   * @returns {Array|Boolean}
   * @api public
   */
  EventEmitter.prototype.listeners = function listeners(event, exists) {
    var evt = prefix ? prefix + event : event,
      available = this._events[evt]

    if (exists) return !!available
    if (!available) return []
    if (available.fn) return [available.fn]

    for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
      ee[i] = available[i].fn
    }

    return ee
  }

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {String|Symbol} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @api public
   */
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event

    if (!this._events[evt]) return false

    var listeners = this._events[evt],
      len = arguments.length,
      args, i

    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true)

      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true
        case 2:
          return listeners.fn.call(listeners.context, a1), true
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
      }

      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i]
      }

      listeners.fn.apply(listeners.context, args)
    } else {
      var length = listeners.length,
        j

      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true)

        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context)
            break
          case 2:
            listeners[i].fn.call(listeners[i].context, a1)
            break
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2)
            break
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3)
            break
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j]
              }

            listeners[i].fn.apply(listeners[i].context, args)
        }
      }
    }

    return true
  }

  /**
   * Add a listener for a given event.
   *
   * @param {String|Symbol} event The event name.
   * @param {Function} fn The listener function.
   * @param {Mixed} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @api public
   */
  EventEmitter.prototype.on = function on(event, fn, context) {
    var listener = new EE(fn, context || this),
      evt = prefix ? prefix + event : event

    if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++
    else if (!this._events[evt].fn) this._events[evt].push(listener)
    else this._events[evt] = [this._events[evt], listener]

    return this
  }

  /**
   * Add a one-time listener for a given event.
   *
   * @param {String|Symbol} event The event name.
   * @param {Function} fn The listener function.
   * @param {Mixed} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @api public
   */
  EventEmitter.prototype.once = function once(event, fn, context) {
    var listener = new EE(fn, context || this, true),
      evt = prefix ? prefix + event : event

    if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++
    else if (!this._events[evt].fn) this._events[evt].push(listener)
    else this._events[evt] = [this._events[evt], listener]

    return this
  }

  /**
   * Remove the listeners of a given event.
   *
   * @param {String|Symbol} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {Mixed} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @api public
   */
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event

    if (!this._events[evt]) return this
    if (!fn) {
      if (--this._eventsCount === 0) this._events = new Events()
      else delete this._events[evt]
      return this
    }

    var listeners = this._events[evt]

    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        if (--this._eventsCount === 0) this._events = new Events()
        else delete this._events[evt]
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i])
        }
      }

      //
      // Reset the array, or remove it completely if we have no more listeners.
      //
      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events
      else if (--this._eventsCount === 0) this._events = new Events()
      else delete this._events[evt]
    }

    return this
  }

  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {String|Symbol} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @api public
   */
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt

    if (event) {
      evt = prefix ? prefix + event : event
      if (this._events[evt]) {
        if (--this._eventsCount === 0) this._events = new Events()
        else delete this._events[evt]
      }
    } else {
      this._events = new Events()
      this._eventsCount = 0
    }

    return this
  }

  //
  // Alias methods names because people roll like that.
  //
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener
  EventEmitter.prototype.addListener = EventEmitter.prototype.on

  //
  // This function doesn't apply anymore.
  //
  EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
    return this
  }

  //
  // Expose the prefix.
  //
  EventEmitter.prefixed = prefix

  //
  // Allow `EventEmitter` to be imported as container namespace.
  //
  EventEmitter.EventEmitter = EventEmitter

  return EventEmitter
})()

const IsMobile = (() => {
  /**
   * isMobile.js v0.4.1
   *
   * A simple library to detect Apple phones and tablets,
   * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
   * and any kind of seven inch device, via user agent sniffing.
   *
   * @author: Kai Mallea (kmallea@gmail.com)
   *
   * @license: http://creativecommons.org/publicdomain/zero/1.0/
   */

  var apple_phone = /iPhone/i,
    apple_ipod = /iPod/i,
    apple_tablet = /iPad/i,
    android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
    android_tablet = /Android/i,
    amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
    amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
    windows_phone = /Windows Phone/i,
    windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
    other_blackberry = /BlackBerry/i,
    other_blackberry_10 = /BB10/i,
    other_opera = /Opera Mini/i,
    other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
    other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
    seven_inch = new RegExp(
      '(?:' + // Non-capturing group
      'Nexus 7' + // Nexus 7
      '|' + // OR
      'BNTV250' + // B&N Nook Tablet 7 inch
      '|' + // OR
      'Kindle Fire' + // Kindle Fire
      '|' + // OR
      'Silk' + // Kindle Fire, Silk Accelerated
      '|' + // OR
      'GT-P1000' + // Galaxy Tab 7 inch
      ')', // End non-capturing group
      'i'); // Case-insensitive matching

  var match = function (regex, userAgent) {
    return regex.test(userAgent)
  }

  var IsMobileClass = function (userAgent) {
    var ua = userAgent || navigator.userAgent

    // Facebook mobile app's integrated browser adds a bunch of strings that
    // match everything. Strip it out if it exists.
    var tmp = ua.split('[FBAN')
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0]
    }

    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
    // iPhone" string. Same probable happens on other tablet platforms.
    // This will confuse detection so strip it out if it exists.
    tmp = ua.split('Twitter')
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0]
    }

    this.apple = {
      phone: match(apple_phone, ua),
      ipod: match(apple_ipod, ua),
      tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
      device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
    }
    this.amazon = {
      phone: match(amazon_phone, ua),
      tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
      device: match(amazon_phone, ua) || match(amazon_tablet, ua)
    }
    this.android = {
      phone: match(amazon_phone, ua) || match(android_phone, ua),
      tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
      device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
    }
    this.windows = {
      phone: match(windows_phone, ua),
      tablet: match(windows_tablet, ua),
      device: match(windows_phone, ua) || match(windows_tablet, ua)
    }
    this.other = {
      blackberry: match(other_blackberry, ua),
      blackberry10: match(other_blackberry_10, ua),
      opera: match(other_opera, ua),
      firefox: match(other_firefox, ua),
      chrome: match(other_chrome, ua),
      device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
    }
    this.seven_inch = match(seven_inch, ua)
    this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch

    // excludes 'other' devices and ipods, targeting touchscreen phones
    this.phone = this.apple.phone || this.android.phone || this.windows.phone

    // excludes 7 inch devices, classifying as phone or tablet is left to the user
    this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet

    if (typeof window === 'undefined') {
      return this
    }
  }
  
  var IM = new IsMobileClass()
  IM.Class = IsMobileClass
  return IM
})()

const MiniSignal = (() => {
  'use strict'

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }

  var MiniSignalBinding = (function () {
    function MiniSignalBinding(fn, once, thisArg) {
      if (once === undefined) once = false

      _classCallCheck(this, MiniSignalBinding)

      this._fn = fn
      this._once = once
      this._thisArg = thisArg
      this._next = this._prev = this._owner = null
    }

    create_class_(MiniSignalBinding, [{
      key: 'detach',
      value: function detach() {
        if (this._owner === null) return false
        this._owner.detach(this)
        return true
      }
    }])

    return MiniSignalBinding
  })()

  function _addMiniSignalBinding(self, node) {
    if (!self._head) {
      self._head = node
      self._tail = node
    } else {
      self._tail._next = node
      node._prev = self._tail
      self._tail = node
    }

    node._owner = self

    return node
  }

  var MiniSignal = (function () {
    function MiniSignal() {
      _classCallCheck(this, MiniSignal)

      this._head = this._tail = undefined
    }

    create_class_(MiniSignal, [{
      key: 'handlers',
      value: function handlers() {
        var exists = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0]

        var node = this._head

        if (exists) return !!node

        var ee = []

        while (node) {
          ee.push(node)
          node = node._next
        }

        return ee
      }
    }, {
      key: 'has',
      value: function has(node) {
        if (!(node instanceof MiniSignalBinding)) {
          throw new Error('MiniSignal#has(): First arg must be a MiniSignalBinding object.')
        }

        return node._owner === this
      }
    }, {
      key: 'dispatch',
      value: function dispatch() {
        var node = this._head

        if (!node) return false

        while (node) {
          if (node._once) this.detach(node)
          node._fn.apply(node._thisArg, arguments)
          node = node._next
        }

        return true
      }
    }, {
      key: 'add',
      value: function add(fn) {
        var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1]

        if (typeof fn !== 'function') {
          throw new Error('MiniSignal#add(): First arg must be a Function.')
        }
        return _addMiniSignalBinding(this, new MiniSignalBinding(fn, false, thisArg))
      }
    }, {
      key: 'once',
      value: function once(fn) {
        var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1]

        if (typeof fn !== 'function') {
          throw new Error('MiniSignal#once(): First arg must be a Function.')
        }
        return _addMiniSignalBinding(this, new MiniSignalBinding(fn, true, thisArg))
      }
    }, {
      key: 'detach',
      value: function detach(node) {
        if (!(node instanceof MiniSignalBinding)) {
          throw new Error('MiniSignal#detach(): First arg must be a MiniSignalBinding object.')
        }
        if (node._owner !== this) return this

        if (node._prev) node._prev._next = node._next
        if (node._next) node._next._prev = node._prev

        if (node === this._head) {
          this._head = node._next
          if (node._next === null) {
            this._tail = null
          }
        } else if (node === this._tail) {
          this._tail = node._prev
          this._tail._next = null
        }

        node._owner = null
        return this
      }
    }, {
      key: 'detachAll',
      value: function detachAll() {
        var node = this._head
        if (!node) return this

        this._head = this._tail = null

        while (node) {
          node._owner = null
          node = node._next
        }
        return this
      }
    }])

    return MiniSignal
  })()

  MiniSignal.MiniSignalBinding = MiniSignalBinding

  return MiniSignal
})()

const assign = (() => {
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  'use strict'
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols
  var hasOwnProperty = Object.prototype.hasOwnProperty
  var propIsEnumerable = Object.prototype.propertyIsEnumerable

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined')
    }

    return Object(val)
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
      test1[5] = 'de'
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {}
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n]
      })
      if (order2.join('') !== '0123456789') {
        return false
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {}
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter
      })
      if (Object.keys(Object.assign({}, test3)).join('') !==
        'abcdefghijklmnopqrst') {
        return false
      }

      return true
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false
    }
  }
  return (shouldUseNative() ? Object.assign : function (target, source) {
    var from
    var to = toObject(target)
    var symbols

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s])

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key]
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from)
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]]
          }
        }
      }
    }

    return to
  })
})()

const parseURI = (str, opts) => {
  'use strict'

  opts = opts || {}

  var o = {
    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  }

  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str)
  var uri = {}
  var i = 14

  while (i--) uri[o.key[i]] = m[i] || ''

  uri[o.q.name] = {}
  uri[o.key[12]].replace(o.q.parser, ($0, $1, $2) => {
    if ($1) uri[o.q.name][$1] = $2
  })

  return uri
}

const GLBuffer = (() => {
  var EMPTY_ARRAY_BUFFER = new ArrayBuffer(0)

  /**
   * Helper class to create a webGL buffer
   *
   * @class
   * @memberof PIXI.glCore
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   * @param type {gl.ARRAY_BUFFER | gl.ELEMENT_ARRAY_BUFFER} @mat
   * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
   * @param drawType {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
   */
  var Buffer = function (gl, type, data, drawType) {
    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    /**
     * The WebGL buffer, created upon instantiation
     *
     * @member {WebGLBuffer}
     */
    this.buffer = gl.createBuffer()

    /**
     * The type of the buffer
     *
     * @member {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
     */
    this.type = type || gl.ARRAY_BUFFER

    /**
     * The draw type of the buffer
     *
     * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
     */
    this.drawType = drawType || gl.STATIC_DRAW

    /**
     * The data in the buffer, as a typed array
     *
     * @member {ArrayBuffer| SharedArrayBuffer|ArrayBufferView}
     */
    this.data = EMPTY_ARRAY_BUFFER

    if (data) {
      this.upload(data)
    }

    this._updateID = 0
  }

  /**
   * Uploads the buffer to the GPU
   * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data to upload
   * @param offset {Number} if only a subset of the data should be uploaded, this is the amount of data to subtract
   * @param dontBind {Boolean} whether to bind the buffer before uploading it
   */
  Buffer.prototype.upload = function (data, offset, dontBind) {
    // todo - needed?
    if (!dontBind) this.bind()

    var gl = this.gl

    data = data || this.data
    offset = offset || 0

    if (this.data.byteLength >= data.byteLength) {
      gl.bufferSubData(this.type, offset, data)
    } else {
      gl.bufferData(this.type, data, this.drawType)
    }

    this.data = data
  }
  /**
   * Binds the buffer
   *
   */
  Buffer.prototype.bind = function () {
    var gl = this.gl
    gl.bindBuffer(this.type, this.buffer)
  }

  Buffer.createVertexBuffer = function (gl, data, drawType) {
    return new Buffer(gl, gl.ARRAY_BUFFER, data, drawType)
  }

  Buffer.createIndexBuffer = function (gl, data, drawType) {
    return new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, drawType)
  }

  Buffer.create = function (gl, type, data, drawType) {
    return new Buffer(gl, type, data, drawType)
  }

  /**
   * Destroys the buffer
   *
   */
  Buffer.prototype.destroy = function () {
    this.gl.deleteBuffer(this.buffer)
  }
  return Buffer
})()

const GLTexture = (() => {
  /**
   * Helper class to create a WebGL Texture
   *
   * @class
   * @memberof PIXI.glCore
   * @param gl {WebGLRenderingContext} The current WebGL context
   * @param width {number} the width of the texture
   * @param height {number} the height of the texture
   * @param format {number} the pixel format of the texture. defaults to gl.RGBA
   * @param type {number} the gl type of the texture. defaults to gl.UNSIGNED_BYTE
   */
  var Texture = function (gl, width, height, format, type) {
    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    /**
     * The WebGL texture
     *
     * @member {WebGLTexture}
     */
    this.texture = gl.createTexture()

    /**
     * If mipmapping was used for this texture, enable and disable with enableMipmap()
     *
     * @member {Boolean}
     */
    // some settings..
    this.mipmap = false

    /**
     * Set to true to enable pre-multiplied alpha
     *
     * @member {Boolean}
     */
    this.premultiplyAlpha = false

    /**
     * The width of texture
     *
     * @member {Number}
     */
    this.width = width || -1
    /**
     * The height of texture
     *
     * @member {Number}
     */
    this.height = height || -1

    /**
     * The pixel format of the texture. defaults to gl.RGBA
     *
     * @member {Number}
     */
    this.format = format || gl.RGBA

    /**
     * The gl type of the texture. defaults to gl.UNSIGNED_BYTE
     *
     * @member {Number}
     */
    this.type = type || gl.UNSIGNED_BYTE
  }

  /**
   * Uploads this texture to the GPU
   * @param source {HTMLImageElement|ImageData|HTMLVideoElement} the source image of the texture
   */
  Texture.prototype.upload = function (source) {
    this.bind()

    var gl = this.gl

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)

    var newWidth = source.videoWidth || source.width
    var newHeight = source.videoHeight || source.height

    if (newHeight !== this.height || newWidth !== this.width) {
      gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source)
    } else {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source)
    }

    // if the source is a video, we need to use the videoWidth / videoHeight properties as width / height will be incorrect.
    this.width = newWidth
    this.height = newHeight

  }

  var FLOATING_POINT_AVAILABLE = false

  /**
   * Use a data source and uploads this texture to the GPU
   * @param data {TypedArray} the data to upload to the texture
   * @param width {number} the new width of the texture
   * @param height {number} the new height of the texture
   */
  Texture.prototype.uploadData = function (data, width, height) {
    this.bind()

    var gl = this.gl


    if (data instanceof Float32Array) {
      if (!FLOATING_POINT_AVAILABLE) {
        var ext = gl.getExtension("OES_texture_float")

        if (ext) {
          FLOATING_POINT_AVAILABLE = true
        } else {
          throw new Error('floating point textures not available')
        }
      }

      this.type = gl.FLOAT
    } else {
      // TODO support for other types
      this.type = this.type || gl.UNSIGNED_BYTE
    }

    // what type of data?
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha)


    if (width !== this.width || height !== this.height) {
      gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, data || null)
    } else {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, this.format, this.type, data || null)
    }

    this.width = width
    this.height = height


    //	texSubImage2D
  }

  /**
   * Binds the texture
   * @param  location
   */
  Texture.prototype.bind = function (location) {
    var gl = this.gl

    if (location !== undefined) {
      gl.activeTexture(gl.TEXTURE0 + location)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

  /**
   * Unbinds the texture
   */
  Texture.prototype.unbind = function () {
    var gl = this.gl
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  /**
   * @param linear {Boolean} if we want to use linear filtering or nearest neighbour interpolation
   */
  Texture.prototype.minFilter = function (linear) {
    var gl = this.gl

    this.bind()

    if (this.mipmap) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST)
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST)
    }
  }

  /**
   * @param linear {Boolean} if we want to use linear filtering or nearest neighbour interpolation
   */
  Texture.prototype.magFilter = function (linear) {
    var gl = this.gl

    this.bind()

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST)
  }

  /**
   * Enables mipmapping
   */
  Texture.prototype.enableMipmap = function () {
    var gl = this.gl

    this.bind()

    this.mipmap = true

    gl.generateMipmap(gl.TEXTURE_2D)
  }

  /**
   * Enables linear filtering
   */
  Texture.prototype.enableLinearScaling = function () {
    this.minFilter(true)
    this.magFilter(true)
  }

  /**
   * Enables nearest neighbour interpolation
   */
  Texture.prototype.enableNearestScaling = function () {
    this.minFilter(false)
    this.magFilter(false)
  }

  /**
   * Enables clamping on the texture so WebGL will not repeat it
   */
  Texture.prototype.enableWrapClamp = function () {
    var gl = this.gl

    this.bind()

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  }

  /**
   * Enable tiling on the texture
   */
  Texture.prototype.enableWrapRepeat = function () {
    var gl = this.gl

    this.bind()

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  }

  Texture.prototype.enableWrapMirrorRepeat = function () {
    var gl = this.gl

    this.bind()

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
  }

  /**
   * Destroys this texture
   */
  Texture.prototype.destroy = function () {
    var gl = this.gl
    //TODO
    gl.deleteTexture(this.texture)
  }

  /**
   * @static
   * @param gl {WebGLRenderingContext} The current WebGL context
   * @param source {HTMLImageElement|ImageData} the source image of the texture
   * @param premultiplyAlpha {Boolean} If we want to use pre-multiplied alpha
   */
  Texture.fromSource = function (gl, source, premultiplyAlpha) {
    var texture = new Texture(gl)
    texture.premultiplyAlpha = premultiplyAlpha || false
    texture.upload(source)

    return texture
  }

  /**
   * @static
   * @param gl {WebGLRenderingContext} The current WebGL context
   * @param data {TypedArray} the data to upload to the texture
   * @param width {number} the new width of the texture
   * @param height {number} the new height of the texture
   */
  Texture.fromData = function (gl, data, width, height) {
    //console.log(data, width, height)
    var texture = new Texture(gl)
    texture.uploadData(data, width, height)

    return texture
  }

  return Texture
})()

/**
 * Helper class to create a webGL Context
 *
 * @class
 * @memberof PIXI.glCore
 * @param canvas {HTMLCanvasElement} the canvas element that we will get the context from
 * @param options {Object} An options object that gets passed in to the canvas element containing the context attributes,
 *                         see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext for the options available
 * @return {WebGLRenderingContext} the WebGL context
 */
const createContext = function (canvas, options) {
  const gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options)

  if (!gl) {
    // fail, not able to get a context
    throw new Error('This browser does not support webGL. Try using the canvas renderer')
  }

  return gl
}

/**
 * @param gl {WebGLRenderingContext} The current WebGL context
 * @param attribs {*}
 * @param state {*}
 */
var setVertexAttribArrays = function (gl, attribs, state) {
  var i
  if (state) {
    var tempAttribState = state.tempAttribState,
      attribState = state.attribState

    for (i = 0; i < tempAttribState.length; i++) {
      tempAttribState[i] = false
    }

    // set the new attribs
    for (i = 0; i < attribs.length; i++) {
      tempAttribState[attribs[i].attribute.location] = true
    }

    for (i = 0; i < attribState.length; i++) {
      if (attribState[i] !== tempAttribState[i]) {
        attribState[i] = tempAttribState[i]

        if (state.attribState[i]) {
          gl.enableVertexAttribArray(i)
        } else {
          gl.disableVertexAttribArray(i)
        }
      }
    }

  } else {
    for (i = 0; i < attribs.length; i++) {
      var attrib = attribs[i]
      gl.enableVertexAttribArray(attrib.attribute.location)
    }
  }
}

const compileProgram = (() => {
  /**
   * @private
   * @param gl {WebGLRenderingContext} The current WebGL context {WebGLProgram}
   * @param type {Number} the type, can be either VERTEX_SHADER or FRAGMENT_SHADER
   * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
   * @return {WebGLShader} the shader
   */
  const compileShader = function (gl, type, src) {
    var shader = gl.createShader(type)

    gl.shaderSource(shader, src)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader))
      return null
    }

    return shader
  }

  /**
   * @class
   * @memberof PIXI.glCore.shader
   * @param gl {WebGLRenderingContext} The current WebGL context {WebGLProgram}
   * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
   * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
   * @param attributeLocations {Object} An attribute location map that lets you manually set the attribute locations
   * @return {WebGLProgram} the shader program
   */
  const compileProgram = function (gl, vertexSrc, fragmentSrc, attributeLocations) {
    var glVertShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc)
    var glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)

    var program = gl.createProgram()

    gl.attachShader(program, glVertShader)
    gl.attachShader(program, glFragShader)

    // optionally, set the attributes manually for the program rather than letting WebGL decide..
    if (attributeLocations) {
      for (var i in attributeLocations) {
        gl.bindAttribLocation(program, attributeLocations[i], i)
      }
    }


    gl.linkProgram(program)

    // if linking fails, then log and cleanup
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Pixi.js Error: Could not initialize shader.')
      console.error('gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS))
      console.error('gl.getError()', gl.getError())

      // if there is a program info log, log it
      if (gl.getProgramInfoLog(program) !== '') {
        console.warn('Pixi.js Warning: gl.getProgramInfoLog()', gl.getProgramInfoLog(program))
      }

      gl.deleteProgram(program)
      program = null
    }

    // clean up some shaders
    gl.deleteShader(glVertShader)
    gl.deleteShader(glFragShader)

    return program
  }

  return compileProgram
})()

const defaultValue = (() => {
  /**
   * @class
   * @memberof PIXI.glCore.shader
   * @param type {String} Type of value
   * @param size {Number}
   */
  var defaultValue = function (type, size) {
    switch (type) {
      case 'float':
        return 0
      case 'vec2':
        return new Float32Array(2 * size)
      case 'vec3':
        return new Float32Array(3 * size)
      case 'vec4':
        return new Float32Array(4 * size)
      case 'int':
      case 'sampler2D':
        return 0
      case 'ivec2':
        return new Int32Array(2 * size)
      case 'ivec3':
        return new Int32Array(3 * size)
      case 'ivec4':
        return new Int32Array(4 * size)
      case 'bool':
        return false
      case 'bvec2':
        return booleanArray(2 * size)
      case 'bvec3':
        return booleanArray(3 * size)
      case 'bvec4':
        return booleanArray(4 * size)
      case 'mat2':
        return new Float32Array([1, 0,
          0, 1
        ])
      case 'mat3':
        return new Float32Array([1, 0, 0,
          0, 1, 0,
          0, 0, 1
        ])
      case 'mat4':
        return new Float32Array([1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ])
    }
  }

  var booleanArray = function (size) {
    var array = new Array(size)

    for (var i = 0; i < array.length; i++) {
      array[i] = false
    }

    return array
  }

  return defaultValue
})()

const generateUniformAccessObject = (() => {

  /**
   * Extracts the attributes
   * @class
   * @memberof PIXI.glCore.shader
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   * @param uniforms {Array} @mat ?
   * @return attributes {Object}
   */
  var generateUniformAccessObject = function (gl, uniformData) {
    // this is the object we will be sending back.
    // an object hierachy will be created for structs
    var uniforms = {
      data: {}
    }

    uniforms.gl = gl

    var uniformKeys = Object.keys(uniformData)

    for (var i = 0; i < uniformKeys.length; i++) {
      var fullName = uniformKeys[i]

      var nameTokens = fullName.split('.')
      var name = nameTokens[nameTokens.length - 1]


      var uniformGroup = getUniformGroup(nameTokens, uniforms)

      var uniform = uniformData[fullName]
      uniformGroup.data[name] = uniform

      uniformGroup.gl = gl

      Object.defineProperty(uniformGroup, name, {
        get: generateGetter(name),
        set: generateSetter(name, uniform)
      })
    }

    return uniforms
  }

  var generateGetter = function (name) {
    return function () {
      return this.data[name].value
    }
  }

  var GLSL_SINGLE_SETTERS = {
    float: function setSingleFloat(gl, location, value) {
      gl.uniform1f(location, value)
    },
    vec2: function setSingleVec2(gl, location, value) {
      gl.uniform2f(location, value[0], value[1])
    },
    vec3: function setSingleVec3(gl, location, value) {
      gl.uniform3f(location, value[0], value[1], value[2])
    },
    vec4: function setSingleVec4(gl, location, value) {
      gl.uniform4f(location, value[0], value[1], value[2], value[3])
    },

    int: function setSingleInt(gl, location, value) {
      gl.uniform1i(location, value)
    },
    ivec2: function setSingleIvec2(gl, location, value) {
      gl.uniform2i(location, value[0], value[1])
    },
    ivec3: function setSingleIvec3(gl, location, value) {
      gl.uniform3i(location, value[0], value[1], value[2])
    },
    ivec4: function setSingleIvec4(gl, location, value) {
      gl.uniform4i(location, value[0], value[1], value[2], value[3])
    },

    bool: function setSingleBool(gl, location, value) {
      gl.uniform1i(location, value)
    },
    bvec2: function setSingleBvec2(gl, location, value) {
      gl.uniform2i(location, value[0], value[1])
    },
    bvec3: function setSingleBvec3(gl, location, value) {
      gl.uniform3i(location, value[0], value[1], value[2])
    },
    bvec4: function setSingleBvec4(gl, location, value) {
      gl.uniform4i(location, value[0], value[1], value[2], value[3])
    },

    mat2: function setSingleMat2(gl, location, value) {
      gl.uniformMatrix2fv(location, false, value)
    },
    mat3: function setSingleMat3(gl, location, value) {
      gl.uniformMatrix3fv(location, false, value)
    },
    mat4: function setSingleMat4(gl, location, value) {
      gl.uniformMatrix4fv(location, false, value)
    },

    sampler2D: function setSingleSampler2D(gl, location, value) {
      gl.uniform1i(location, value)
    },
  }

  var GLSL_ARRAY_SETTERS = {
    float: function setFloatArray(gl, location, value) {
      gl.uniform1fv(location, value)
    },
    vec2: function setVec2Array(gl, location, value) {
      gl.uniform2fv(location, value)
    },
    vec3: function setVec3Array(gl, location, value) {
      gl.uniform3fv(location, value)
    },
    vec4: function setVec4Array(gl, location, value) {
      gl.uniform4fv(location, value)
    },
    int: function setIntArray(gl, location, value) {
      gl.uniform1iv(location, value)
    },
    ivec2: function setIvec2Array(gl, location, value) {
      gl.uniform2iv(location, value)
    },
    ivec3: function setIvec3Array(gl, location, value) {
      gl.uniform3iv(location, value)
    },
    ivec4: function setIvec4Array(gl, location, value) {
      gl.uniform4iv(location, value)
    },
    bool: function setBoolArray(gl, location, value) {
      gl.uniform1iv(location, value)
    },
    bvec2: function setBvec2Array(gl, location, value) {
      gl.uniform2iv(location, value)
    },
    bvec3: function setBvec3Array(gl, location, value) {
      gl.uniform3iv(location, value)
    },
    bvec4: function setBvec4Array(gl, location, value) {
      gl.uniform4iv(location, value)
    },
    sampler2D: function setSampler2DArray(gl, location, value) {
      gl.uniform1iv(location, value)
    },
  }

  function generateSetter(name, uniform) {
    return function (value) {
      this.data[name].value = value
      var location = this.data[name].location
      if (uniform.size === 1) {
        GLSL_SINGLE_SETTERS[uniform.type](this.gl, location, value)
      } else {
        // glslSetArray(gl, location, type, value) {
        GLSL_ARRAY_SETTERS[uniform.type](this.gl, location, value)
      }
    }
  }

  function getUniformGroup(nameTokens, uniform) {
    var cur = uniform

    for (var i = 0; i < nameTokens.length - 1; i++) {
      var o = cur[nameTokens[i]] || {
        data: {}
      }
      cur[nameTokens[i]] = o
      cur = o
    }

    return cur
  }

  return generateUniformAccessObject
})()

const mapSize = (() => {

  /**
   * @class
   * @memberof PIXI.glCore.shader
   * @param type {String}
   * @return {Number}
   */
  var mapSize = function (type) {
    return GLSL_TO_SIZE[type]
  }

  var GLSL_TO_SIZE = {
    'float': 1,
    'vec2': 2,
    'vec3': 3,
    'vec4': 4,

    'int': 1,
    'ivec2': 2,
    'ivec3': 3,
    'ivec4': 4,

    'bool': 1,
    'bvec2': 2,
    'bvec3': 3,
    'bvec4': 4,

    'mat2': 4,
    'mat3': 9,
    'mat4': 16,

    'sampler2D': 1
  }

  return mapSize
})()

const mapType = (() => {

  var mapType = function (gl, type) {
    if (!GL_TABLE) {
      var typeNames = Object.keys(GL_TO_GLSL_TYPES)

      GL_TABLE = {}

      for (var i = 0; i < typeNames.length; ++i) {
        var tn = typeNames[i]
        GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn]
      }
    }

    return GL_TABLE[type]
  }

  var GL_TABLE = null

  var GL_TO_GLSL_TYPES = {
    'FLOAT': 'float',
    'FLOAT_VEC2': 'vec2',
    'FLOAT_VEC3': 'vec3',
    'FLOAT_VEC4': 'vec4',

    'INT': 'int',
    'INT_VEC2': 'ivec2',
    'INT_VEC3': 'ivec3',
    'INT_VEC4': 'ivec4',

    'BOOL': 'bool',
    'BOOL_VEC2': 'bvec2',
    'BOOL_VEC3': 'bvec3',
    'BOOL_VEC4': 'bvec4',

    'FLOAT_MAT2': 'mat2',
    'FLOAT_MAT3': 'mat3',
    'FLOAT_MAT4': 'mat4',

    'SAMPLER_2D': 'sampler2D'
  }
  return mapType
})()

/**
 * Sets the float precision on the shader. If the precision is already present this function will do nothing
 * @param {string} src       the shader source
 * @param {string} precision The float precision of the shader. Options are 'lowp', 'mediump' or 'highp'.
 *
 * @return {string} modified shader source
 */
const setPrecision = function (src, precision) {
  if (src.substring(0, 9) !== 'precision') {
    return 'precision ' + precision + ' float;\n' + src
  }

  return src
}

const _process = (() => {
  const process = {}
  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.

  var cachedSetTimeout
  var cachedClearTimeout

  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined')
  }

  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined')
  }
  void (function () {
    try {
      if (typeof setTimeout === 'function') {
        cachedSetTimeout = setTimeout
      } else {
        cachedSetTimeout = defaultSetTimout
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout
    }
    try {
      if (typeof clearTimeout === 'function') {
        cachedClearTimeout = clearTimeout
      } else {
        cachedClearTimeout = defaultClearTimeout
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout
    }
  }())

  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      //normal enviroments in sane situations
      return setTimeout(fun, 0)
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout
      return setTimeout(fun, 0)
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedSetTimeout(fun, 0)
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return cachedSetTimeout.call(null, fun, 0)
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return cachedSetTimeout.call(this, fun, 0)
      }
    }
  }

  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      //normal enviroments in sane situations
      return clearTimeout(marker)
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout
      return clearTimeout(marker)
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedClearTimeout(marker)
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return cachedClearTimeout.call(null, marker)
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
        return cachedClearTimeout.call(this, marker)
      }
    }
  }
  var queue = []
  var draining = false
  var currentQueue
  var queueIndex = -1

  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return
    }
    draining = false
    if (currentQueue.length) {
      queue = currentQueue.concat(queue)
    } else {
      queueIndex = -1
    }
    if (queue.length) {
      drainQueue()
    }
  }

  function drainQueue() {
    if (draining) {
      return
    }
    var timeout = runTimeout(cleanUpNextTick)
    draining = true

    var len = queue.length
    while (len) {
      currentQueue = queue
      queue = []
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run()
        }
      }
      queueIndex = -1
      len = queue.length
    }
    currentQueue = null
    draining = false
    runClearTimeout(timeout)
  }

  process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1)
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i]
      }
    }
    queue.push(new Item(fun, args))
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue)
    }
  }

  // v8 likes predictible objects
  function Item(fun, array) {
    this.fun = fun
    this.array = array
  }
  Item.prototype.run = function () {
    this.fun.apply(null, this.array)
  }
  process.title = 'browser'
  process.browser = true
  process.env = {}
  process.argv = []
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {}

  function noop() { }

  process.on = noop
  process.addListener = noop
  process.once = noop
  process.off = noop
  process.removeListener = noop
  process.removeAllListeners = noop
  process.emit = noop
  process.prependListener = noop
  process.prependOnceListener = noop

  process.listeners = function (name) {
    return []
  }

  process.binding = function (name) {
    throw new Error('process.binding is not supported')
  }

  process.cwd = function () {
    return '/'
  }
  process.chdir = function (dir) {
    throw new Error('process.chdir is not supported')
  }
  process.umask = function () {
    return 0
  }

  return process
})()

const punycode = (() => {
  var
    /** Highest positive signed 32-bit float value */
    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    base = 36,
    tMin = 1,
    tMax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128, // 0x80
    delimiter = '-', // '\x2D'

    /** Regular expressions */
    regexPunycode = /^xn--/,
    regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

    /** Error messages */
    errors = {
      'overflow': 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },

    /** Convenience shortcuts */
    baseMinusTMin = base - tMin,
    floor = Math.floor,
    stringFromCharCode = String.fromCharCode,

    /** Temporary variable */
    key

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error(type) {
    throw new RangeError(errors[type])
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map(array, fn) {
    var length = array.length
    var result = []
    while (length--) {
      result[length] = fn(array[length])
    }
    return result
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
    var parts = string.split('@')
    var result = ''
    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@'
      string = parts[1]
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    string = string.replace(regexSeparators, '\x2E')
    var labels = string.split('.')
    var encoded = map(labels, fn).join('.')
    return result + encoded
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra
    while (counter < length) {
      value = string.charCodeAt(counter++)
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++)
        if ((extra & 0xFC00) == 0xDC00) { // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000)
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value)
          counter--
        }
      } else {
        output.push(value)
      }
    }
    return output
  }

  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */
  function ucs2encode(array) {
    return map(array, function (value) {
      var output = ''
      if (value > 0xFFFF) {
        value -= 0x10000
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800)
        value = 0xDC00 | value & 0x3FF
      }
      output += stringFromCharCode(value)
      return output
    }).join('')
  }

  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */
  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22
    }
    if (codePoint - 65 < 26) {
      return codePoint - 65
    }
    if (codePoint - 97 < 26) {
      return codePoint - 97
    }
    return base
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5)
  }

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  function adapt(delta, numPoints, firstTime) {
    var k = 0
    delta = firstTime ? floor(delta / damp) : delta >> 1
    delta += floor(delta / numPoints)
    for ( /* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin)
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew))
  }

  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */
  function decode(input) {
    // Don't use UCS-2
    var output = [],
      inputLength = input.length,
      out,
      i = 0,
      n = initialN,
      bias = initialBias,
      basic,
      j,
      index,
      oldi,
      w,
      k,
      digit,
      t,
      /** Cached calculation results */
      baseMinusT

    // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter)
    if (basic < 0) {
      basic = 0
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic')
      }
      output.push(input.charCodeAt(j))
    }

    // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.

    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

        if (index >= inputLength) {
          error('invalid-input')
        }

        digit = basicToDigit(input.charCodeAt(index++))

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow')
        }

        i += digit * w
        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias)

        if (digit < t) {
          break
        }

        baseMinusT = base - t
        if (w > floor(maxInt / baseMinusT)) {
          error('overflow')
        }

        w *= baseMinusT

      }

      out = output.length + 1
      bias = adapt(i - oldi, out, oldi == 0)

      // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:
      if (floor(i / out) > maxInt - n) {
        error('overflow')
      }

      n += floor(i / out)
      i %= out

      // Insert `n` at position `i` of the output
      output.splice(i++, 0, n)

    }

    return ucs2encode(output)
  }

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  function encode(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,
      /** Cached calculation results */
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT

    // Convert the input in UCS-2 to Unicode
    input = ucs2decode(input)

    // Cache the length
    inputLength = input.length

    // Initialize the state
    n = initialN
    delta = 0
    bias = initialBias

    // Handle the basic code points
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j]
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue))
      }
    }

    handledCPCount = basicLength = output.length

    // `handledCPCount` is the number of code points that have been handled
    // `basicLength` is the number of basic code points.

    // Finish the basic string - if it is not empty - with a delimiter
    if (basicLength) {
      output.push(delimiter)
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {

      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j]
        if (currentValue >= n && currentValue < m) {
          m = currentValue
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow
      handledCPCountPlusOne = handledCPCount + 1
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow')
      }

      delta += (m - n) * handledCPCountPlusOne
      n = m

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j]

        if (currentValue < n && ++delta > maxInt) {
          error('overflow')
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base; /* no condition */; k += base) {
            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias)
            if (q < t) {
              break
            }
            qMinusT = q - t
            baseMinusT = base - t
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            )
            q = floor(qMinusT / baseMinusT)
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)))
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength)
          delta = 0
          ++handledCPCount
        }
      }

      ++delta
      ++n

    }
    return output.join('')
  }

  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */
  function toUnicode(input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ?
        decode(string.slice(4).toLowerCase()) :
        string
    })
  }

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ?
        'xn--' + encode(string) :
        string
    })
  }

  /*--------------------------------------------------------------------------*/

  /** Define the public API */
  return ({
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    'version': '1.4.1',
    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  })
})()

const decode = (() => {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  'use strict'

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]'
  }

  return (qs, sep, eq, options) => {
    sep = sep || '&'
    eq = eq || '='
    var obj = {}

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj
    }

    var regexp = /\+/g
    qs = qs.split(sep)

    var maxKeys = 1000
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys
    }

    var len = qs.length
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v

      if (idx >= 0) {
        kstr = x.substr(0, idx)
        vstr = x.substr(idx + 1)
      } else {
        kstr = x
        vstr = ''
      }

      k = decodeURIComponent(kstr)
      v = decodeURIComponent(vstr)

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v
      } else if (isArray(obj[k])) {
        obj[k].push(v)
      } else {
        obj[k] = [obj[k], v]
      }
    }

    return obj
  }
})()

const encode = (() => {

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  'use strict'

  var stringifyPrimitive = function (v) {
    switch (typeof v) {
      case 'string':
        return v

      case 'boolean':
        return v ? 'true' : 'false'

      case 'number':
        return isFinite(v) ? v : ''

      default:
        return ''
    }
  }

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]'
  }

  function map(xs, f) {
    if (xs.map) return xs.map(f)
    var res = []
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i))
    }
    return res
  }

  var objectKeys = Object.keys || function (obj) {
    var res = []
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key)
    }
    return res
  }


  return (obj, sep, eq, name) => {
    sep = sep || '&'
    eq = eq || '='
    if (obj === null) {
      obj = undefined
    }

    if (typeof obj === 'object') {
      return map(objectKeys(obj), function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq
        if (isArray(obj[k])) {
          return map(obj[k], function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v))
          }).join(sep)
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]))
        }
      }).join(sep)

    }

    if (!name) return ''
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
      encodeURIComponent(stringifyPrimitive(obj))
  }
})()

/**
 * Remove a range of items from an array
 *
 * @function removeItems
 * @param {Array<*>} arr The target array
 * @param {number} startIdx The index to begin removing from (inclusive)
 * @param {number} removeCount How many items to remove
 */
const removeItems = (arr, startIdx, removeCount) => {
  'use strict'
  var i, length = arr.length

  if (startIdx >= length || removeCount === 0) {
    return
  }

  removeCount = (startIdx + removeCount > length ? length - startIdx : removeCount)

  var len = length - removeCount

  for (i = startIdx; i < len; ++i) {
    arr[i] = arr[i + removeCount]
  }

  arr.length = len
}

const async_lib = (() => {
  'use strict'

  /**
   * Smaller version of the async library constructs.
   */
  function _noop() { } /* empty */

  /**
   * Iterates an array in series.
   *
   * @param {Array.<*>} array - Array to iterate.
   * @param {function} iterator - Function to call for each element.
   * @param {function} callback - Function to call when done, or on error.
   * @param {boolean} [deferNext=false] - Break synchronous each loop by calling next with a setTimeout of 1.
   */
  function eachSeries(array, iterator, callback, deferNext) {
    var i = 0
    var len = array.length

    void (function next(err) {
      if (err || i === len) {
        if (callback) {
          callback(err)
        }

        return
      }

      if (deferNext) {
        setTimeout(function () {
          iterator(array[i++], next)
        }, 1)
      } else {
        iterator(array[i++], next)
      }
    })()
  }

  /**
   * Ensures a function is only called once.
   *
   * @param {function} fn - The function to wrap.
   * @return {function} The wrapping function.
   */
  function onlyOnce(fn) {
    return function onceWrapper() {
      if (fn === null) {
        throw new Error('Callback was already called.')
      }

      var callFn = fn

      fn = null
      callFn.apply(this, arguments)
    }
  }

  /**
   * Async queue implementation,
   *
   * @param {function} worker - The worker function to call for each task.
   * @param {number} concurrency - How many workers to run in parrallel.
   * @return {*} The async queue object.
   */
  function queue(worker, concurrency) {
    if (concurrency == null) {
      // eslint-disable-line no-eq-null,eqeqeq
      concurrency = 1
    } else if (concurrency === 0) {
      throw new Error('Concurrency must not be zero')
    }

    var workers = 0
    var q = {
      _tasks: [],
      concurrency: concurrency,
      saturated: _noop,
      unsaturated: _noop,
      buffer: concurrency / 4,
      empty: _noop,
      drain: _noop,
      error: _noop,
      started: false,
      paused: false,
      push: function push(data, callback) {
        _insert(data, false, callback)
      },
      kill: function kill() {
        workers = 0
        q.drain = _noop
        q.started = false
        q._tasks = []
      },
      unshift: function unshift(data, callback) {
        _insert(data, true, callback)
      },
      process: function process() {
        while (!q.paused && workers < q.concurrency && q._tasks.length) {
          var task = q._tasks.shift()

          if (q._tasks.length === 0) {
            q.empty()
          }

          workers += 1

          if (workers === q.concurrency) {
            q.saturated()
          }

          worker(task.data, onlyOnce(_next(task)))
        }
      },
      length: function length() {
        return q._tasks.length
      },
      running: function running() {
        return workers
      },
      idle: function idle() {
        return q._tasks.length + workers === 0
      },
      pause: function pause() {
        if (q.paused === true) {
          return
        }

        q.paused = true
      },
      resume: function resume() {
        if (q.paused === false) {
          return
        }

        q.paused = false

        // Need to call q.process once per concurrent
        // worker to preserve full concurrency after pause
        for (var w = 1; w <= q.concurrency; w++) {
          q.process()
        }
      }
    }

    function _insert(data, insertAtFront, callback) {
      if (callback != null && typeof callback !== 'function') {
        // eslint-disable-line no-eq-null,eqeqeq
        throw new Error('task callback must be a function')
      }

      q.started = true

      if (data == null && q.idle()) {
        // eslint-disable-line no-eq-null,eqeqeq
        // call drain immediately if there are no tasks
        setTimeout(function () {
          return q.drain()
        }, 1)

        return
      }

      var item = {
        data: data,
        callback: typeof callback === 'function' ? callback : _noop
      }

      if (insertAtFront) {
        q._tasks.unshift(item)
      } else {
        q._tasks.push(item)
      }

      setTimeout(function () {
        return q.process()
      }, 1)
    }

    function _next(task) {
      return function next() {
        workers -= 1

        task.callback.apply(task, arguments)

        if (arguments[0] != null) {
          // eslint-disable-line no-eq-null,eqeqeq
          q.error(arguments[0], task.data)
        }

        if (workers <= q.concurrency - q.buffer) {
          q.unsaturated()
        }

        if (q.idle()) {
          q.drain()
        }

        q.process()
      }
    }

    return q
  }

  return { queue, eachSeries }
})()

const b64 = (() => {
  'use strict'
  var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  function encodeBinary(input) {
    var output = ''
    var inx = 0

    while (inx < input.length) {
      // Fill byte buffer array
      var bytebuffer = [0, 0, 0]
      var encodedCharIndexes = [0, 0, 0, 0]

      for (var jnx = 0; jnx < bytebuffer.length; ++jnx) {
        if (inx < input.length) {
          // throw away high-order byte, as documented at:
          // https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
          bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff
        } else {
          bytebuffer[jnx] = 0
        }
      }

      // Get each encoded character, 6 bits at a time
      // index 1: first 6 bits
      encodedCharIndexes[0] = bytebuffer[0] >> 2

      // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
      encodedCharIndexes[1] = (bytebuffer[0] & 0x3) << 4 | bytebuffer[1] >> 4

      // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
      encodedCharIndexes[2] = (bytebuffer[1] & 0x0f) << 2 | bytebuffer[2] >> 6

      // index 3: forth 6 bits (6 least significant bits from input byte 3)
      encodedCharIndexes[3] = bytebuffer[2] & 0x3f

      // Determine whether padding happened, and adjust accordingly
      var paddingBytes = inx - (input.length - 1)

      switch (paddingBytes) {
        case 2:
          // Set last 2 characters to padding char
          encodedCharIndexes[3] = 64
          encodedCharIndexes[2] = 64
          break

        case 1:
          // Set last character to padding char
          encodedCharIndexes[3] = 64
          break

        default:
          break; // No padding - proceed
      }

      // Now we will grab each appropriate character out of our keystring
      // based on our index array and append it to the output string
      for (var _jnx = 0; _jnx < encodedCharIndexes.length; ++_jnx) {
        output += _keyStr.charAt(encodedCharIndexes[_jnx])
      }
    }

    return output
  }

  return encodeBinary
})()

const util = {
  isString(arg) {
    return typeof (arg) === 'string'
  },
  isObject(arg) {
    return typeof (arg) === 'object' && arg !== null
  },
  isNull(arg) {
    return arg === null
  },
  isNullOrUndefined(arg) {
    return arg == null
  }
}

/**
 * Default property values of accessible objects
 * used by {@link PIXI.accessibility.AccessibilityManager}.
 *
 * @function accessibleTarget
 * @memberof PIXI.accessibility
 * @example
 *      function MyObject() {}
 *
 *      Object.assign(
 *          MyObject.prototype,
 *          PIXI.accessibility.accessibleTarget
 *      )
 */
const accessibleTarget = {
  /**
   *  Flag for if the object is accessible. If true AccessibilityManager will overlay a
   *   shadow div with attributes set
   *
   * @member {boolean}
   */
  accessible: false,

  /**
   * Sets the title attribute of the shadow div
   * If accessibleTitle AND accessibleHint has not been this will default to 'displayObject [tabIndex]'
   *
   * @member {string}
   */
  accessibleTitle: null,

  /**
   * Sets the aria-label attribute of the shadow div
   *
   * @member {string}
   */
  accessibleHint: null,

  /**
   * @todo Needs docs.
   */
  tabIndex: 0,

  /**
   * @todo Needs docs.
   */
  _accessibleActive: false,

  /**
   * @todo Needs docs.
   */
  _accessibleDiv: false
}

const constants = (() => {
  'use strict'

  const constants = {}
  /**
   * String of the current PIXI version.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @name VERSION
   * @type {string}
   */
  constants.VERSION = '4.8.1'

  /**
   * Two Pi.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @type {number}
   */
  constants.PI_2 = Math.PI * 2

  /**
   * Conversion factor for converting radians to degrees.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @type {number}
   */
  constants.RAD_TO_DEG = 180 / Math.PI

  /**
   * Conversion factor for converting degrees to radians.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @type {number}
   */
  constants.DEG_TO_RAD = Math.PI / 180

  /**
   * Constant to identify the Renderer Type.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @name RENDERER_TYPE
   * @type {object}
   * @property {number} UNKNOWN - Unknown render type.
   * @property {number} WEBGL - WebGL render type.
   * @property {number} CANVAS - Canvas render type.
   */
  constants.RENDERER_TYPE = {
    UNKNOWN: 0,
    WEBGL: 1,
    CANVAS: 2
  }

  /**
   * Various blend modes supported by PIXI.
   *
   * IMPORTANT - The WebGL renderer only supports the NORMAL, ADD, MULTIPLY and SCREEN blend modes.
   * Anything else will silently act like NORMAL.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @name BLEND_MODES
   * @type {object}
   * @property {number} NORMAL
   * @property {number} ADD
   * @property {number} MULTIPLY
   * @property {number} SCREEN
   * @property {number} OVERLAY
   * @property {number} DARKEN
   * @property {number} LIGHTEN
   * @property {number} COLOR_DODGE
   * @property {number} COLOR_BURN
   * @property {number} HARD_LIGHT
   * @property {number} SOFT_LIGHT
   * @property {number} DIFFERENCE
   * @property {number} EXCLUSION
   * @property {number} HUE
   * @property {number} SATURATION
   * @property {number} COLOR
   * @property {number} LUMINOSITY
   */
  constants.BLEND_MODES = {
    NORMAL: 0,
    ADD: 1,
    MULTIPLY: 2,
    SCREEN: 3,
    OVERLAY: 4,
    DARKEN: 5,
    LIGHTEN: 6,
    COLOR_DODGE: 7,
    COLOR_BURN: 8,
    HARD_LIGHT: 9,
    SOFT_LIGHT: 10,
    DIFFERENCE: 11,
    EXCLUSION: 12,
    HUE: 13,
    SATURATION: 14,
    COLOR: 15,
    LUMINOSITY: 16,
    NORMAL_NPM: 17,
    ADD_NPM: 18,
    SCREEN_NPM: 19
  }

  /**
   * Various webgl draw modes. These can be used to specify which GL drawMode to use
   * under certain situations and renderers.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @name DRAW_MODES
   * @type {object}
   * @property {number} POINTS
   * @property {number} LINES
   * @property {number} LINE_LOOP
   * @property {number} LINE_STRIP
   * @property {number} TRIANGLES
   * @property {number} TRIANGLE_STRIP
   * @property {number} TRIANGLE_FAN
   */
  constants.DRAW_MODES = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6
  }

  /**
   * The scale modes that are supported by pixi.
   *
   * The {@link PIXI.settings.SCALE_MODE} scale mode affects the default scaling mode of future operations.
   * It can be re-assigned to either LINEAR or NEAREST, depending upon suitability.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @name SCALE_MODES
   * @type {object}
   * @property {number} LINEAR Smooth scaling
   * @property {number} NEAREST Pixelating scaling
   */
  constants.SCALE_MODES = {
    LINEAR: 0,
    NEAREST: 1
  }

  /**
   * The wrap modes that are supported by pixi.
   *
   * The {@link PIXI.settings.WRAP_MODE} wrap mode affects the default wrapping mode of future operations.
   * It can be re-assigned to either CLAMP or REPEAT, depending upon suitability.
   * If the texture is non power of two then clamp will be used regardless as webGL can
   * only use REPEAT if the texture is po2.
   *
   * This property only affects WebGL.
   *
   * @static
   * @constant
   * @name WRAP_MODES
   * @memberof PIXI
   * @type {object}
   * @property {number} CLAMP - The textures uvs are clamped
   * @property {number} REPEAT - The texture uvs tile and repeat
   * @property {number} MIRRORED_REPEAT - The texture uvs tile and repeat with mirroring
   */
  constants.WRAP_MODES = {
    CLAMP: 0,
    REPEAT: 1,
    MIRRORED_REPEAT: 2
  }

  /**
   * The gc modes that are supported by pixi.
   *
   * The {@link PIXI.settings.GC_MODE} Garbage Collection mode for PixiJS textures is AUTO
   * If set to GC_MODE, the renderer will occasionally check textures usage. If they are not
   * used for a specified period of time they will be removed from the GPU. They will of course
   * be uploaded again when they are required. This is a silent behind the scenes process that
   * should ensure that the GPU does not  get filled up.
   *
   * Handy for mobile devices!
   * This property only affects WebGL.
   *
   * @static
   * @constant
   * @name GC_MODES
   * @memberof PIXI
   * @type {object}
   * @property {number} AUTO - Garbage collection will happen periodically automatically
   * @property {number} MANUAL - Garbage collection will need to be called manually
   */
  constants.GC_MODES = {
    AUTO: 0,
    MANUAL: 1
  }

  /**
   * Regexp for image type by extension.
   *
   * @static
   * @constant
   * @memberof PIXI
   * @type {RegExp|string}
   * @example `image.png`
   */
  constants.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i

  /**
   * Regexp for data URI.
   * Based on: {@link https://github.com/ragingwind/data-uri-regex}
   *
   * @static
   * @constant
   * @name DATA_URI
   * @memberof PIXI
   * @type {RegExp|string}
   * @example data:image/png;base64
   */
  constants.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i

  /**
   * Regexp for SVG size.
   *
   * @static
   * @constant
   * @name SVG_SIZE
   * @memberof PIXI
   * @type {RegExp|string}
   * @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt
   */
  constants.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i; // eslint-disable-line max-len

  /**
   * Constants that identify shapes, mainly to prevent `instanceof` calls.
   *
   * @static
   * @constant
   * @name SHAPES
   * @memberof PIXI
   * @type {object}
   * @property {number} POLY Polygon
   * @property {number} RECT Rectangle
   * @property {number} CIRC Circle
   * @property {number} ELIP Ellipse
   * @property {number} RREC Rounded Rectangle
   */
  constants.SHAPES = {
    POLY: 0,
    RECT: 1,
    CIRC: 2,
    ELIP: 3,
    RREC: 4
  }

  /**
   * Constants that specify float precision in shaders.
   *
   * @static
   * @constant
   * @name PRECISION
   * @memberof PIXI
   * @type {object}
   * @property {string} LOW='lowp'
   * @property {string} MEDIUM='mediump'
   * @property {string} HIGH='highp'
   */
  constants.PRECISION = {
    LOW: 'lowp',
    MEDIUM: 'mediump',
    HIGH: 'highp'
  }

  /**
   * Constants that specify the transform type.
   *
   * @static
   * @constant
   * @name TRANSFORM_MODE
   * @memberof PIXI
   * @type {object}
   * @property {number} STATIC
   * @property {number} DYNAMIC
   */
  constants.TRANSFORM_MODE = {
    STATIC: 0,
    DYNAMIC: 1
  }

  /**
   * Constants that define the type of gradient on text.
   *
   * @static
   * @constant
   * @name TEXT_GRADIENT
   * @memberof PIXI
   * @type {object}
   * @property {number} LINEAR_VERTICAL Vertical gradient
   * @property {number} LINEAR_HORIZONTAL Linear gradient
   */
  constants.TEXT_GRADIENT = {
    LINEAR_VERTICAL: 0,
    LINEAR_HORIZONTAL: 1
  }

  /**
   * Represents the update priorities used by internal PIXI classes when registered with
   * the {@link PIXI.ticker.Ticker} object. Higher priority items are updated first and lower
   * priority items, such as render, should go later.
   *
   * @static
   * @constant
   * @name UPDATE_PRIORITY
   * @memberof PIXI
   * @type {object}
   * @property {number} INTERACTION=50 Highest priority, used for {@link PIXI.interaction.InteractionManager}
   * @property {number} HIGH=25 High priority updating, {@link PIXI.VideoBaseTexture} and {@link PIXI.extras.AnimatedSprite}
   * @property {number} NORMAL=0 Default priority for ticker events, see {@link PIXI.ticker.Ticker#add}.
   * @property {number} LOW=-25 Low priority used for {@link PIXI.Application} rendering.
   * @property {number} UTILITY=-50 Lowest priority used for {@link PIXI.prepare.BasePrepare} utility.
   */
  constants.UPDATE_PRIORITY = {
    INTERACTION: 50,
    HIGH: 25,
    NORMAL: 0,
    LOW: -25,
    UTILITY: -50
  }

  return constants
})()

/**
 * A GraphicsData object.
 *
 * @class
 * @memberof PIXI
 */
const GraphicsData = (() => {
  /**
   *
   * @param {number} lineWidth - the width of the line to draw
   * @param {number} lineColor - the color of the line to draw
   * @param {number} lineAlpha - the alpha of the line to draw
   * @param {number} fillColor - the color of the fill
   * @param {number} fillAlpha - the alpha of the fill
   * @param {boolean} fill - whether or not the shape is filled with a colour
   * @param {boolean} nativeLines - the method for drawing lines
   * @param {PIXI.Circle|PIXI.Rectangle|PIXI.Ellipse|PIXI.Polygon} shape - The shape object to draw.
   * @param {number} lineAlignment - the alignment of the line.
   */
  function GraphicsData(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, nativeLines, shape, lineAlignment) {
    class_call_check_(this, GraphicsData)

    /**
     * the width of the line to draw
     * @member {number}
     */
    this.lineWidth = lineWidth

    /**
     * The alignment of any lines drawn (0.5 = middle, 1 = outter, 0 = inner).
     *
     * @member {number}
     * @default 0
     */
    this.lineAlignment = lineAlignment

    /**
     * if true the liens will be draw using LINES instead of TRIANGLE_STRIP
     * @member {boolean}
     */
    this.nativeLines = nativeLines

    /**
     * the color of the line to draw
     * @member {number}
     */
    this.lineColor = lineColor

    /**
     * the alpha of the line to draw
     * @member {number}
     */
    this.lineAlpha = lineAlpha

    /**
     * cached tint of the line to draw
     * @member {number}
     * @private
     */
    this._lineTint = lineColor

    /**
     * the color of the fill
     * @member {number}
     */
    this.fillColor = fillColor

    /**
     * the alpha of the fill
     * @member {number}
     */
    this.fillAlpha = fillAlpha

    /**
     * cached tint of the fill
     * @member {number}
     * @private
     */
    this._fillTint = fillColor

    /**
     * whether or not the shape is filled with a colour
     * @member {boolean}
     */
    this.fill = fill

    this.holes = []

    /**
     * The shape object to draw.
     * @member {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle}
     */
    this.shape = shape

    /**
     * The type of the shape, see the Const.Shapes file for all the existing types,
     * @member {number}
     */
    this.type = shape.type
  }

  /**
   * Creates a new GraphicsData object with the same values as this one.
   *
   * @return {PIXI.GraphicsData} Cloned GraphicsData object
   */


  GraphicsData.prototype.clone = function clone() {
    return new GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.nativeLines, this.shape)
  }

  /**
   * Adds a hole to the shape.
   *
   * @param {PIXI.Rectangle|PIXI.Circle} shape - The shape of the hole.
   */


  GraphicsData.prototype.addHole = function addHole(shape) {
    this.holes.push(shape)
  }

  /**
   * Destroys the Graphics data.
   */


  GraphicsData.prototype.destroy = function destroy() {
    this.shape = null
    this.holes = null
  }

  return GraphicsData
})()

/**
 * Calculate the points for a bezier curve and then draws it.
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @param {number} fromX - Starting point x
 * @param {number} fromY - Starting point y
 * @param {number} cpX - Control point x
 * @param {number} cpY - Control point y
 * @param {number} cpX2 - Second Control point x
 * @param {number} cpY2 - Second Control point y
 * @param {number} toX - Destination point x
 * @param {number} toY - Destination point y
 * @param {number} n - Number of segments approximating the bezier curve
 * @param {number[]} [path=[]] - Path array to push points into
 * @return {number[]} Array of points of the curve
 */
const bezierCurveTo = (fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, n) => {
  var path = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : []

  var dt = 0
  var dt2 = 0
  var dt3 = 0
  var t2 = 0
  var t3 = 0

  path.push(fromX, fromY)

  for (var i = 1, j = 0; i <= n; ++i) {
    j = i / n

    dt = 1 - j
    dt2 = dt * dt
    dt3 = dt2 * dt

    t2 = j * j
    t3 = t2 * j

    path.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY)
  }

  return path
}

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 * An observable point is a point that triggers a callback when the point's position is changed.
 *
 * @class
 * @memberof PIXI
 */
const ObservablePoint = (() => {
  /**
   * @param {Function} cb - callback when changed
   * @param {object} scope - owner of callback
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  function ObservablePoint(cb, scope) {
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0

    class_call_check_(this, ObservablePoint)

    this._x = x
    this._y = y

    this.cb = cb
    this.scope = scope
  }

  /**
   * Sets the point to a new x and y position.
   * If y is omitted, both x and y will be set to x.
   *
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */


  ObservablePoint.prototype.set = function set(x, y) {
    var _x = x || 0
    var _y = y || (y !== 0 ? _x : 0)

    if (this._x !== _x || this._y !== _y) {
      this._x = _x
      this._y = _y
      this.cb.call(this.scope)
    }
  }

  /**
   * Copies the data from another point
   *
   * @param {PIXI.Point|PIXI.ObservablePoint} point - point to copy from
   */


  ObservablePoint.prototype.copy = function copy(point) {
    if (this._x !== point.x || this._y !== point.y) {
      this._x = point.x
      this._y = point.y
      this.cb.call(this.scope)
    }
  }

  /**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   *
   * @member {number}
   */


  create_class_(ObservablePoint, [{
    key: "x",
    get: function get() {
      return this._x
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      if (this._x !== value) {
        this._x = value
        this.cb.call(this.scope)
      }
    }

    /**
     * The position of the displayObject on the x axis relative to the local coordinates of the parent.
     *
     * @member {number}
     */

  }, {
    key: "y",
    get: function get() {
      return this._y
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      if (this._y !== value) {
        this._y = value
        this.cb.call(this.scope)
      }
    }
  }])

  return ObservablePoint
})()


/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @memberof PIXI
 */
const Point = (() => {
  /**
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

    class_call_check_(this, Point)

    /**
     * @member {number}
     * @default 0
     */
    this.x = x

    /**
     * @member {number}
     * @default 0
     */
    this.y = y
  }

  /**
   * Creates a clone of this point
   *
   * @return {PIXI.Point} a copy of the point
   */


  Point.prototype.clone = function clone() {
    return new Point(this.x, this.y)
  }

  /**
   * Copies x and y from the given point
   *
   * @param {PIXI.Point} p - The point to copy.
   */


  Point.prototype.copy = function copy(p) {
    this.set(p.x, p.y)
  }

  /**
   * Returns true if the given point is equal to this point
   *
   * @param {PIXI.Point} p - The point to check
   * @returns {boolean} Whether the given point equal to this point
   */


  Point.prototype.equals = function equals(p) {
    return p.x === this.x && p.y === this.y
  }

  /**
   * Sets the point to a new x and y position.
   * If y is omitted, both x and y will be set to x.
   *
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */


  Point.prototype.set = function set(x, y) {
    this.x = x || 0
    this.y = y || (y !== 0 ? this.x : 0)
  }

  return Point
})()

const canUseNewCanvasBlendModes = (() => {

  /**
   * Creates a little colored canvas
   *
   * @ignore
   * @param {string} color - The color to make the canvas
   * @return {canvas} a small canvas element
   */
  function createColoredCanvas(color) {
    var canvas = document.createElement('canvas')

    canvas.width = 6
    canvas.height = 1

    var context = canvas.getContext('2d')

    context.fillStyle = color
    context.fillRect(0, 0, 6, 1)

    return canvas
  }

  /**
   * Checks whether the Canvas BlendModes are supported by the current browser
   *
   * @return {boolean} whether they are supported
   */
  function canUseNewCanvasBlendModes() {
    if (typeof document === 'undefined') {
      return false
    }

    var magenta = createColoredCanvas('#ff00ff')
    var yellow = createColoredCanvas('#ffff00')

    var canvas = document.createElement('canvas')

    canvas.width = 6
    canvas.height = 1

    var context = canvas.getContext('2d')

    context.globalCompositeOperation = 'multiply'
    context.drawImage(magenta, 0, 0)
    context.drawImage(yellow, 2, 0)

    var imageData = context.getImageData(2, 0, 1, 1)

    if (!imageData) {
      return false
    }

    var data = imageData.data

    return data[0] === 255 && data[1] === 0 && data[2] === 0
  }
  return canUseNewCanvasBlendModes
})()

/**
 * @class
 * @memberof PIXI
 */
const WebGLManager = (() => {
  /**
   * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
   */
  function WebGLManager(renderer) {
    class_call_check_(this, WebGLManager)

    /**
     * The renderer this manager works for.
     *
     * @member {PIXI.WebGLRenderer}
     */
    this.renderer = renderer

    this.renderer.on('context', this.onContextChange, this)
  }

  /**
   * Generic method called when there is a WebGL context change.
   *
   */


  WebGLManager.prototype.onContextChange = function onContextChange() { }
  // do some codes init!


  /**
   * Generic destroy methods to be overridden by the subclass
   *
   */


  WebGLManager.prototype.destroy = function destroy() {
    this.renderer.off('context', this.onContextChange, this)

    this.renderer = null
  }

  return WebGLManager
})()

const validateContext = gl => {
  var attributes = gl.getContextAttributes()

  // this is going to be fairly simple for now.. but at least we have room to grow!
  if (!attributes.stencil) {
    /* eslint-disable no-console */
    console.warn('Provided WebGL context does not have a stencil buffer, masks may not render correctly')
    /* eslint-enable no-console */
  }
}

/**
 * @class
 * @memberof PIXI
 */
const BatchBuffer = (() => {
  /**
   * @param {number} size - The size of the buffer in bytes.
   */
  function Buffer(size) {
    class_call_check_(this, Buffer)

    this.vertices = new ArrayBuffer(size)

    /**
     * View on the vertices as a Float32Array for positions
     *
     * @member {Float32Array}
     */
    this.float32View = new Float32Array(this.vertices)

    /**
     * View on the vertices as a Uint32Array for uvs
     *
     * @member {Float32Array}
     */
    this.uint32View = new Uint32Array(this.vertices)
  }

  /**
   * Destroys the buffer.
   *
   */


  Buffer.prototype.destroy = function destroy() {
    this.vertices = null
    this.positions = null
    this.uvs = null
    this.colors = null
  }

  return Buffer
})()

const TextMetrics = (() => {
  /**
   * The TextMetrics object represents the measurement of a block of text with a specified style.
   *
   * ```js
   * let style = new PIXI.TextStyle({fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
   * let textMetrics = PIXI.TextMetrics.measureText('Your text', style)
   * ```
   *
   * @class
   * @memberOf PIXI
   */
  var TextMetrics = function () {
    /**
     * @param {string} text - the text that was measured
     * @param {PIXI.TextStyle} style - the style that was measured
     * @param {number} width - the measured width of the text
     * @param {number} height - the measured height of the text
     * @param {array} lines - an array of the lines of text broken by new lines and wrapping if specified in style
     * @param {array} lineWidths - an array of the line widths for each line matched to `lines`
     * @param {number} lineHeight - the measured line height for this style
     * @param {number} maxLineWidth - the maximum line width for all measured lines
     * @param {Object} fontProperties - the font properties object from TextMetrics.measureFont
     */
    function TextMetrics(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
      class_call_check_(this, TextMetrics)

      this.text = text
      this.style = style
      this.width = width
      this.height = height
      this.lines = lines
      this.lineWidths = lineWidths
      this.lineHeight = lineHeight
      this.maxLineWidth = maxLineWidth
      this.fontProperties = fontProperties
    }

    /**
     * Measures the supplied string of text and returns a Rectangle.
     *
     * @param {string} text - the text to measure.
     * @param {PIXI.TextStyle} style - the text style to use for measuring
     * @param {boolean} [wordWrap] - optional override for if word-wrap should be applied to the text.
     * @param {HTMLCanvasElement} [canvas] - optional specification of the canvas to use for measuring.
     * @return {PIXI.TextMetrics} measured width and height of the text.
     */
    TextMetrics.measureText = function measureText(text, style, wordWrap) {
      var canvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TextMetrics._canvas

      wordWrap = wordWrap || style.wordWrap
      var font = style.toFontString()
      var fontProperties = TextMetrics.measureFont(font)
      var context = canvas.getContext('2d')

      context.font = font

      var outputText = wordWrap ? TextMetrics.wordWrap(text, style, canvas) : text
      var lines = outputText.split(/(?:\r\n|\r|\n)/)
      var lineWidths = new Array(lines.length)
      var maxLineWidth = 0

      for (var i = 0; i < lines.length; i++) {
        var lineWidth = context.measureText(lines[i]).width + (lines[i].length - 1) * style.letterSpacing

        lineWidths[i] = lineWidth
        maxLineWidth = Math.max(maxLineWidth, lineWidth)
      }
      var width = maxLineWidth + style.strokeThickness

      if (style.dropShadow) {
        width += style.dropShadowDistance
      }

      var lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness
      var height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) + (lines.length - 1) * (lineHeight + style.leading)

      if (style.dropShadow) {
        height += style.dropShadowDistance
      }

      return new TextMetrics(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties)
    }

    /**
     * Applies newlines to a string to have it optimally fit into the horizontal
     * bounds set by the Text object's wordWrapWidth property.
     *
     * @private
     * @param {string} text - String to apply word wrapping to
     * @param {PIXI.TextStyle} style - the style to use when wrapping
     * @param {HTMLCanvasElement} [canvas] - optional specification of the canvas to use for measuring.
     * @return {string} New string with new lines applied where required
     */
    TextMetrics.wordWrap = function wordWrap(text, style) {
      var canvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TextMetrics._canvas

      var context = canvas.getContext('2d')

      var width = 0
      var line = ''
      var lines = ''

      var cache = {}
      var letterSpacing = style.letterSpacing,
        whiteSpace = style.whiteSpace

      // How to handle whitespaces

      var collapseSpaces = TextMetrics.collapseSpaces(whiteSpace)
      var collapseNewlines = TextMetrics.collapseNewlines(whiteSpace)

      // whether or not spaces may be added to the beginning of lines
      var canPrependSpaces = !collapseSpaces

      // There is letterSpacing after every char except the last one
      // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!
      // so for convenience the above needs to be compared to width + 1 extra letterSpace
      // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!_
      // ________________________________________________
      // And then the final space is simply no appended to each line
      var wordWrapWidth = style.wordWrapWidth + letterSpacing

      // break text into words, spaces and newline chars
      var tokens = TextMetrics.tokenize(text)

      for (var i = 0; i < tokens.length; i++) {
        // get the word, space or newlineChar
        var token = tokens[i]

        // if word is a new line
        if (TextMetrics.isNewline(token)) {
          // keep the new line
          if (!collapseNewlines) {
            lines += TextMetrics.addLine(line)
            canPrependSpaces = !collapseSpaces
            line = ''
            width = 0
            continue
          }

          // if we should collapse new lines
          // we simply convert it into a space
          token = ' '
        }

        // if we should collapse repeated whitespaces
        if (collapseSpaces) {
          // check both this and the last tokens for spaces
          var currIsBreakingSpace = TextMetrics.isBreakingSpace(token)
          var lastIsBreakingSpace = TextMetrics.isBreakingSpace(line[line.length - 1])

          if (currIsBreakingSpace && lastIsBreakingSpace) {
            continue
          }
        }

        // get word width from cache if possible
        var tokenWidth = TextMetrics.getFromCache(token, letterSpacing, cache, context)

        // word is longer than desired bounds
        if (tokenWidth > wordWrapWidth) {
          // if we are not already at the beginning of a line
          if (line !== '') {
            // start newlines for overflow words
            lines += TextMetrics.addLine(line)
            line = ''
            width = 0
          }

          // break large word over multiple lines
          if (TextMetrics.canBreakWords(token, style.breakWords)) {
            // break word into characters
            var characters = token.split('')

            // loop the characters
            for (var j = 0; j < characters.length; j++) {
              var char = characters[j]

              var k = 1
              // we are not at the end of the token

              while (characters[j + k]) {
                var nextChar = characters[j + k]
                var lastChar = char[char.length - 1]

                // should not split chars
                if (!TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                  // combine chars & move forward one
                  char += nextChar
                } else {
                  break
                }

                k++
              }

              j += char.length - 1

              var characterWidth = TextMetrics.getFromCache(char, letterSpacing, cache, context)

              if (characterWidth + width > wordWrapWidth) {
                lines += TextMetrics.addLine(line)
                canPrependSpaces = false
                line = ''
                width = 0
              }

              line += char
              width += characterWidth
            }
          }

          // run word out of the bounds
          else {
            // if there are words in this line already
            // finish that line and start a new one
            if (line.length > 0) {
              lines += TextMetrics.addLine(line)
              line = ''
              width = 0
            }

            var isLastToken = i === tokens.length - 1

            // give it its own line if it's not the end
            lines += TextMetrics.addLine(token, !isLastToken)
            canPrependSpaces = false
            line = ''
            width = 0
          }
        }

        // word could fit
        else {
          // word won't fit because of existing words
          // start a new line
          if (tokenWidth + width > wordWrapWidth) {
            // if its a space we don't want it
            canPrependSpaces = false

            // add a new line
            lines += TextMetrics.addLine(line)

            // start a new line
            line = ''
            width = 0
          }

          // don't add spaces to the beginning of lines
          if (line.length > 0 || !TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
            // add the word to the current line
            line += token

            // update width counter
            width += tokenWidth
          }
        }
      }

      lines += TextMetrics.addLine(line, false)

      return lines
    }

    /**
     * Convienience function for logging each line added during the wordWrap
     * method
     *
     * @private
     * @param  {string}   line        - The line of text to add
     * @param  {boolean}  newLine     - Add new line character to end
     * @return {string}   A formatted line
     */
    TextMetrics.addLine = function addLine(line) {
      var newLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true

      line = TextMetrics.trimRight(line)

      line = newLine ? line + '\n' : line

      return line
    }

    /**
     * Gets & sets the widths of calculated characters in a cache object
     *
     * @private
     * @param  {string}                    key            The key
     * @param  {number}                    letterSpacing  The letter spacing
     * @param  {object}                    cache          The cache
     * @param  {CanvasRenderingContext2D}  context        The canvas context
     * @return {number}                    The from cache.
     */
    TextMetrics.getFromCache = function getFromCache(key, letterSpacing, cache, context) {
      var width = cache[key]

      if (width === undefined) {
        var spacing = key.length * letterSpacing

        width = context.measureText(key).width + spacing
        cache[key] = width
      }

      return width
    }

    /**
     * Determines whether we should collapse breaking spaces
     *
     * @private
     * @param  {string}   whiteSpace  The TextStyle property whiteSpace
     * @return {boolean}  should collapse
     */
    TextMetrics.collapseSpaces = function collapseSpaces(whiteSpace) {
      return whiteSpace === 'normal' || whiteSpace === 'pre-line'
    }

    /**
     * Determines whether we should collapse newLine chars
     *
     * @private
     * @param  {string}   whiteSpace  The white space
     * @return {boolean}  should collapse
     */
    TextMetrics.collapseNewlines = function collapseNewlines(whiteSpace) {
      return whiteSpace === 'normal'
    }

    /**
     * trims breaking whitespaces from string
     *
     * @private
     * @param  {string}  text  The text
     * @return {string}  trimmed string
     */
    TextMetrics.trimRight = function trimRight(text) {
      if (typeof text !== 'string') {
        return ''
      }

      for (var i = text.length - 1; i >= 0; i--) {
        var char = text[i]

        if (!TextMetrics.isBreakingSpace(char)) {
          break
        }

        text = text.slice(0, -1)
      }

      return text
    }

    /**
     * Determines if char is a newline.
     *
     * @private
     * @param  {string}  char  The character
     * @return {boolean}  True if newline, False otherwise.
     */
    TextMetrics.isNewline = function isNewline(char) {
      if (typeof char !== 'string') {
        return false
      }

      return TextMetrics._newlines.indexOf(char.charCodeAt(0)) >= 0
    }

    /**
     * Determines if char is a breaking whitespace.
     *
     * @private
     * @param  {string}  char  The character
     * @return {boolean}  True if whitespace, False otherwise.
     */
    TextMetrics.isBreakingSpace = function isBreakingSpace(char) {
      if (typeof char !== 'string') {
        return false
      }

      return TextMetrics._breakingSpaces.indexOf(char.charCodeAt(0)) >= 0
    }

    /**
     * Splits a string into words, breaking-spaces and newLine characters
     *
     * @private
     * @param  {string}  text       The text
     * @return {array}  A tokenized array
     */
    TextMetrics.tokenize = function tokenize(text) {
      var tokens = []
      var token = ''

      if (typeof text !== 'string') {
        return tokens
      }

      for (var i = 0; i < text.length; i++) {
        var char = text[i]

        if (TextMetrics.isBreakingSpace(char) || TextMetrics.isNewline(char)) {
          if (token !== '') {
            tokens.push(token)
            token = ''
          }

          tokens.push(char)

          continue
        }

        token += char
      }

      if (token !== '') {
        tokens.push(token)
      }

      return tokens
    }

    /**
     * This method exists to be easily overridden
     * It allows one to customise which words should break
     * Examples are if the token is CJK or numbers.
     * It must return a boolean.
     *
     * @private
     * @param  {string}  token       The token
     * @param  {boolean}  breakWords  The style attr break words
     * @return {boolean} whether to break word or not
     */
    TextMetrics.canBreakWords = function canBreakWords(token, breakWords) {
      return breakWords
    }

    /**
     * This method exists to be easily overridden
     * It allows one to determine whether a pair of characters
     * should be broken by newlines
     * For example certain characters in CJK langs or numbers.
     * It must return a boolean.
     *
     * @private
     * @param  {string}  char      The character
     * @param  {string}  nextChar  The next character
     * @param  {string}  token     The token/word the characters are from
     * @param  {number}  index     The index in the token of the char
     * @param  {boolean}  breakWords  The style attr break words
     * @return {boolean} whether to break word or not
     */
    TextMetrics.canBreakChars = function canBreakChars(char, nextChar, token, index, breakWords) // eslint-disable-line no-unused-vars
    {
      return true
    }

    /**
     * Calculates the ascent, descent and fontSize of a given font-style
     *
     * @static
     * @param {string} font - String representing the style of the font
     * @return {PIXI.TextMetrics~FontMetrics} Font properties object
     */
    TextMetrics.measureFont = function measureFont(font) {
      // as this method is used for preparing assets, don't recalculate things if we don't need to
      if (TextMetrics._fonts[font]) {
        return TextMetrics._fonts[font]
      }

      var properties = {}

      var canvas = TextMetrics._canvas
      var context = TextMetrics._context

      context.font = font

      var metricsString = TextMetrics.METRICS_STRING + TextMetrics.BASELINE_SYMBOL
      var width = Math.ceil(context.measureText(metricsString).width)
      var baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width)
      var height = 2 * baseline

      baseline = baseline * TextMetrics.BASELINE_MULTIPLIER | 0

      canvas.width = width
      canvas.height = height

      context.fillStyle = '#f00'
      context.fillRect(0, 0, width, height)

      context.font = font

      context.textBaseline = 'alphabetic'
      context.fillStyle = '#000'
      context.fillText(metricsString, 0, baseline)

      var imagedata = context.getImageData(0, 0, width, height).data
      var pixels = imagedata.length
      var line = width * 4

      var i = 0
      var idx = 0
      var stop = false

      // ascent. scan from top to bottom until we find a non red pixel
      for (i = 0; i < baseline; ++i) {
        for (var j = 0; j < line; j += 4) {
          if (imagedata[idx + j] !== 255) {
            stop = true
            break
          }
        }
        if (!stop) {
          idx += line
        } else {
          break
        }
      }

      properties.ascent = baseline - i

      idx = pixels - line
      stop = false

      // descent. scan from bottom to top until we find a non red pixel
      for (i = height; i > baseline; --i) {
        for (var _j = 0; _j < line; _j += 4) {
          if (imagedata[idx + _j] !== 255) {
            stop = true
            break
          }
        }

        if (!stop) {
          idx -= line
        } else {
          break
        }
      }

      properties.descent = i - baseline
      properties.fontSize = properties.ascent + properties.descent

      TextMetrics._fonts[font] = properties

      return properties
    }

    /**
     * Clear font metrics in metrics cache.
     *
     * @static
     * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
     */
    TextMetrics.clearMetrics = function clearMetrics() {
      var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''

      if (font) {
        delete TextMetrics._fonts[font]
      } else {
        TextMetrics._fonts = {}
      }
    }

    return TextMetrics
  }()

  /**
   * Internal return object for {@link PIXI.TextMetrics.measureFont `TextMetrics.measureFont`}.
   * @class FontMetrics
   * @memberof PIXI.TextMetrics~
   * @property {number} ascent - The ascent distance
   * @property {number} descent - The descent distance
   * @property {number} fontSize - Font size from ascent to descent
   */
  var canvas = document.createElement('canvas')

  canvas.width = canvas.height = 10

  /**
   * Cached canvas element for measuring text
   * @memberof PIXI.TextMetrics
   * @type {HTMLCanvasElement}
   * @private
   */
  TextMetrics._canvas = canvas

  /**
   * Cache for context to use.
   * @memberof PIXI.TextMetrics
   * @type {CanvasRenderingContext2D}
   * @private
   */
  TextMetrics._context = canvas.getContext('2d')

  /**
   * Cache of PIXI.TextMetrics~FontMetrics objects.
   * @memberof PIXI.TextMetrics
   * @type {Object}
   * @private
   */
  TextMetrics._fonts = {}

  /**
   * String used for calculate font metrics.
   * @static
   * @memberof PIXI.TextMetrics
   * @name METRICS_STRING
   * @type {string}
   * @default |Éq
   */
  TextMetrics.METRICS_STRING = '|Éq'

  /**
   * Baseline symbol for calculate font metrics.
   * @static
   * @memberof PIXI.TextMetrics
   * @name BASELINE_SYMBOL
   * @type {string}
   * @default M
   */
  TextMetrics.BASELINE_SYMBOL = 'M'

  /**
   * Baseline multiplier for calculate font metrics.
   * @static
   * @memberof PIXI.TextMetrics
   * @name BASELINE_MULTIPLIER
   * @type {number}
   * @default 1.4
   */
  TextMetrics.BASELINE_MULTIPLIER = 1.4

  /**
   * Cache of new line chars.
   * @memberof PIXI.TextMetrics
   * @type {number[]}
   * @private
   */
  TextMetrics._newlines = [0x000A, // line feed
    0x000D
  ]

  /**
   * Cache of breaking spaces.
   * @memberof PIXI.TextMetrics
   * @type {number[]}
   * @private
   */
  TextMetrics._breakingSpaces = [0x0009, // character tabulation
    0x0020, // space
    0x2000, // en quad
    0x2001, // em quad
    0x2002, // en space
    0x2003, // em space
    0x2004, // three-per-em space
    0x2005, // four-per-em space
    0x2006, // six-per-em space
    0x2008, // punctuation space
    0x2009, // thin space
    0x200A, // hair space
    0x205F, // medium mathematical space
    0x3000
  ]

  return TextMetrics
})()

/**
 * Internal class for handling the priority sorting of ticker handlers.
 *
 * @private
 * @class
 * @memberof PIXI.ticker
 */
const TickerListener = (() => {
  /**
   * Constructor
   *
   * @param {Function} fn - The listener function to be added for one update
   * @param {Function} [context=null] - The listener context
   * @param {number} [priority=0] - The priority for emitting
   * @param {boolean} [once=false] - If the handler should fire once
   */
  function TickerListener(fn) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null
    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

    class_call_check_(this, TickerListener)

    /**
     * The handler function to execute.
     * @member {Function}
     */
    this.fn = fn

    /**
     * The calling to execute.
     * @member {Function}
     */
    this.context = context

    /**
     * The current priority.
     * @member {number}
     */
    this.priority = priority

    /**
     * If this should only execute once.
     * @member {boolean}
     */
    this.once = once

    /**
     * The next item in chain.
     * @member {TickerListener}
     */
    this.next = null

    /**
     * The previous item in chain.
     * @member {TickerListener}
     */
    this.previous = null

    /**
     * `true` if this listener has been destroyed already.
     * @member {boolean}
     * @private
     */
    this._destroyed = false
  }

  /**
   * Simple compare function to figure out if a function and context match.
   *
   * @param {Function} fn - The listener function to be added for one update
   * @param {Function} context - The listener context
   * @return {boolean} `true` if the listener match the arguments
   */


  TickerListener.prototype.match = function match(fn, context) {
    context = context || null

    return this.fn === fn && this.context === context
  }

  /**
   * Emit by calling the current function.
   * @param {number} deltaTime - time since the last emit.
   * @return {TickerListener} Next ticker
   */


  TickerListener.prototype.emit = function emit(deltaTime) {
    if (this.fn) {
      if (this.context) {
        this.fn.call(this.context, deltaTime)
      } else {
        this.fn(deltaTime)
      }
    }

    var redirect = this.next

    if (this.once) {
      this.destroy(true)
    }

    // Soft-destroying should remove
    // the next reference
    if (this._destroyed) {
      this.next = null
    }

    return redirect
  }

  /**
   * Connect to the list.
   * @param {TickerListener} previous - Input node, previous listener
   */


  TickerListener.prototype.connect = function connect(previous) {
    this.previous = previous
    if (previous.next) {
      previous.next.previous = this
    }
    this.next = previous.next
    previous.next = this
  }

  /**
   * Destroy and don't use after this.
   * @param {boolean} [hard = false] `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @return {TickerListener} The listener to redirect while emitting or removing.
   */


  TickerListener.prototype.destroy = function destroy() {
    var hard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false

    this._destroyed = true
    this.fn = null
    this.context = null

    // Disconnect, hook up next and previous
    if (this.previous) {
      this.previous.next = this.next
    }

    if (this.next) {
      this.next.previous = this.previous
    }

    // Redirect to the next item
    var redirect = this.next

    // Remove references
    this.next = hard ? null : redirect
    this.previous = null

    return redirect
  }

  return TickerListener
})()

const canUploadSameBuffer = () => {
  // Uploading the same buffer multiple times in a single frame can cause perf issues.
  // Apparent on IOS so only check for that at the moment
  // this check may become more complex if this issue pops up elsewhere.
  var ios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

  return !ios
}

/**
 * Generic Mask Stack data structure
 *
 * @memberof PIXI
 * @function createIndicesForQuads
 * @private
 * @param {number} size - Number of quads
 * @return {Uint16Array} indices
 */
const createIndicesForQuads = size => {
  // the total number of indices in our array, there are 6 points per quad.

  var totalIndices = size * 6

  var indices = new Uint16Array(totalIndices)

  // fill the indices with the quads to draw
  for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
    indices[i + 0] = j + 0
    indices[i + 1] = j + 1
    indices[i + 2] = j + 2
    indices[i + 3] = j + 0
    indices[i + 4] = j + 2
    indices[i + 5] = j + 3
  }

  return indices
}

const mixins = (() => {
  /**
   * Mixes all enumerable properties and methods from a source object to a target object.
   *
   * @memberof PIXI.utils.mixins
   * @function mixin
   * @param {object} target The prototype or instance that properties and methods should be added to.
   * @param {object} source The source of properties and methods to mix in.
   */
  function mixin(target, source) {
    if (!target || !source) return
    // in ES8/ES2017, this would be really easy:
    // Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))

    // get all the enumerable property keys
    var keys = Object.keys(source)

    // loop through properties
    for (var i = 0; i < keys.length; ++i) {
      var propertyName = keys[i]

      // Set the property using the property descriptor - this works for accessors and normal value properties
      Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(source, propertyName))
    }
  }

  var mixins = []

  /**
   * Queues a mixin to be handled towards the end of the initialization of PIXI, so that deprecation
   * can take effect.
   *
   * @memberof PIXI.utils.mixins
   * @function delayMixin
   * @private
   * @param {object} target The prototype or instance that properties and methods should be added to.
   * @param {object} source The source of properties and methods to mix in.
   */
  function delayMixin(target, source) {
    mixins.push(target, source)
  }

  /**
   * Handles all mixins queued via delayMixin().
   *
   * @memberof PIXI.utils.mixins
   * @function performMixins
   * @private
   */
  function performMixins() {
    for (var i = 0; i < mixins.length; i += 2) {
      mixin(mixins[i], mixins[i + 1])
    }
    mixins.length = 0
  }

  return { mixin, delayMixin, performMixins }
})()

const PluginTarget = (() => {
  /**
   * Mixins functionality to make an object have "plugins".
   *
   * @example
   *      function MyObject() {}
   *
   *      pluginTarget.mixin(MyObject)
   *
   * @mixin
   * @memberof PIXI.utils
   * @param {object} obj - The object to mix into.
   */
  function pluginTarget(obj) {
    obj.__plugins = {}

    /**
     * Adds a plugin to an object
     *
     * @param {string} pluginName - The events that should be listed.
     * @param {Function} ctor - The constructor function for the plugin.
     */
    obj.registerPlugin = function registerPlugin(pluginName, ctor) {
      obj.__plugins[pluginName] = ctor
    }

    /**
     * Instantiates all the plugins of this object
     *
     */
    obj.prototype.initPlugins = function initPlugins() {
      this.plugins = this.plugins || {}

      for (var o in obj.__plugins) {
        this.plugins[o] = new obj.__plugins[o](this)
      }
    }

    /**
     * Removes all the plugins of this object
     *
     */
    obj.prototype.destroyPlugins = function destroyPlugins() {
      for (var o in this.plugins) {
        this.plugins[o].destroy()
        this.plugins[o] = null
      }

      this.plugins = null
    }
  }
  return ({
    /**
     * Mixes in the properties of the pluginTarget into another object
     *
     * @param {object} obj - The obj to mix into
     */
    mixin: function mixin(obj) {
      pluginTarget(obj)
    }
  })
})()

/**
 * Trim transparent borders from a canvas
 *
 * @memberof PIXI
 * @function trimCanvas
 * @private
 * @param {HTMLCanvasElement} canvas - the canvas to trim
 * @returns {object} Trim data
 */
const trimCanvas = canvas => {
  // https://gist.github.com/remy/784508

  var width = canvas.width
  var height = canvas.height

  var context = canvas.getContext('2d')
  var imageData = context.getImageData(0, 0, width, height)
  var pixels = imageData.data
  var len = pixels.length

  var bound = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }
  var i = void 0
  var x = void 0
  var y = void 0

  for (i = 0; i < len; i += 4) {
    if (pixels[i + 3] !== 0) {
      x = i / 4 % width
      y = ~~(i / 4 / width)

      if (bound.top === null) {
        bound.top = y
      }

      if (bound.left === null) {
        bound.left = x
      } else if (x < bound.left) {
        bound.left = x
      }

      if (bound.right === null) {
        bound.right = x + 1
      } else if (bound.right < x) {
        bound.right = x + 1
      }

      if (bound.bottom === null) {
        bound.bottom = y
      } else if (bound.bottom < y) {
        bound.bottom = y
      }
    }
  }

  width = bound.right - bound.left
  height = bound.bottom - bound.top + 1

  var data = context.getImageData(bound.left, bound.top, width, height)

  return {
    height: height,
    width: width,
    data: data
  }
}

const deprecation = (() => {
  // provide method to give a stack track for warnings
  // useful for tracking-down where deprecated methods/properties/classes
  // are being used within the code

  // A map of warning messages already fired
  var warnings = {}

  // provide method to give a stack track for warnings
  // useful for tracking-down where deprecated methods/properties/classes
  // are being used within the code
  function warn(msg) {
    // Ignore duplicat
    if (warnings[msg]) {
      return
    }

    /* eslint-disable no-console */
    var stack = new Error().stack

    // Handle IE < 10 and Safari < 6
    if (typeof stack === 'undefined') {
      console.warn('Deprecation Warning: ', msg)
    } else {
      // chop off the stack trace which includes pixi.js internal calls
      stack = stack.split('\n').splice(3).join('\n')

      if (console.groupCollapsed) {
        console.groupCollapsed('%cDeprecation Warning: %c%s', 'color:#614108;background:#fffbe6', 'font-weight:normal;color:#614108;background:#fffbe6', msg)
        console.warn(stack)
        console.groupEnd()
      } else {
        console.warn('Deprecation Warning: ', msg)
        console.warn(stack)
      }
    }
    /* eslint-enable no-console */

    warnings[msg] = true
  }

  function deprecation(core) {
    var mesh = core.mesh,
      particles = core.particles,
      extras = core.extras,
      filters = core.filters,
      prepare = core.prepare,
      loaders = core.loaders,
      interaction = core.interaction


    Object.defineProperties(core, {

      /**
       * @class
       * @private
       * @name SpriteBatch
       * @memberof PIXI
       * @see PIXI.ParticleContainer
       * @throws {ReferenceError} SpriteBatch does not exist any more, please use the new ParticleContainer instead.
       * @deprecated since version 3.0.0
       */
      SpriteBatch: {
        get: function get() {
          throw new ReferenceError('SpriteBatch does not exist any more, ' + 'please use the new ParticleContainer instead.')
        }
      },

      /**
       * @class
       * @private
       * @name AssetLoader
       * @memberof PIXI
       * @see PIXI.loaders.Loader
       * @throws {ReferenceError} The loader system was overhauled in PixiJS v3,
       * please see the new PIXI.loaders.Loader class.
       * @deprecated since version 3.0.0
       */
      AssetLoader: {
        get: function get() {
          throw new ReferenceError('The loader system was overhauled in PixiJS v3, ' + 'please see the new PIXI.loaders.Loader class.')
        }
      },

      /**
       * @class
       * @private
       * @name Stage
       * @memberof PIXI
       * @see PIXI.Container
       * @deprecated since version 3.0.0
       */
      Stage: {
        get: function get() {
          warn('You do not need to use a PIXI Stage any more, you can simply render any container.')

          return core.Container
        }
      },

      /**
       * @class
       * @private
       * @name DisplayObjectContainer
       * @memberof PIXI
       * @see PIXI.Container
       * @deprecated since version 3.0.0
       */
      DisplayObjectContainer: {
        get: function get() {
          warn('DisplayObjectContainer has been shortened to Container, please use Container from now on.')

          return core.Container
        }
      },

      /**
       * @class
       * @private
       * @name Strip
       * @memberof PIXI
       * @see PIXI.mesh.Mesh
       * @deprecated since version 3.0.0
       */
      Strip: {
        get: function get() {
          warn('The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on.')

          return mesh.Mesh
        }
      },

      /**
       * @class
       * @private
       * @name Rope
       * @memberof PIXI
       * @see PIXI.mesh.Rope
       * @deprecated since version 3.0.0
       */
      Rope: {
        get: function get() {
          warn('The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on.')

          return mesh.Rope
        }
      },

      /**
       * @class
       * @private
       * @name ParticleContainer
       * @memberof PIXI
       * @see PIXI.particles.ParticleContainer
       * @deprecated since version 4.0.0
       */
      ParticleContainer: {
        get: function get() {
          warn('The ParticleContainer class has been moved to particles.ParticleContainer, ' + 'please use particles.ParticleContainer from now on.')

          return particles.ParticleContainer
        }
      },

      /**
       * @class
       * @private
       * @name MovieClip
       * @memberof PIXI
       * @see PIXI.extras.MovieClip
       * @deprecated since version 3.0.0
       */
      MovieClip: {
        get: function get() {
          warn('The MovieClip class has been moved to extras.AnimatedSprite, please use extras.AnimatedSprite.')

          return extras.AnimatedSprite
        }
      },

      /**
       * @class
       * @private
       * @name TilingSprite
       * @memberof PIXI
       * @see PIXI.extras.TilingSprite
       * @deprecated since version 3.0.0
       */
      TilingSprite: {
        get: function get() {
          warn('The TilingSprite class has been moved to extras.TilingSprite, ' + 'please use extras.TilingSprite from now on.')

          return extras.TilingSprite
        }
      },

      /**
       * @class
       * @private
       * @name BitmapText
       * @memberof PIXI
       * @see PIXI.extras.BitmapText
       * @deprecated since version 3.0.0
       */
      BitmapText: {
        get: function get() {
          warn('The BitmapText class has been moved to extras.BitmapText, ' + 'please use extras.BitmapText from now on.')

          return extras.BitmapText
        }
      },

      /**
       * @class
       * @private
       * @name blendModes
       * @memberof PIXI
       * @see PIXI.BLEND_MODES
       * @deprecated since version 3.0.0
       */
      blendModes: {
        get: function get() {
          warn('The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on.')

          return core.BLEND_MODES
        }
      },

      /**
       * @class
       * @private
       * @name scaleModes
       * @memberof PIXI
       * @see PIXI.SCALE_MODES
       * @deprecated since version 3.0.0
       */
      scaleModes: {
        get: function get() {
          warn('The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on.')

          return core.SCALE_MODES
        }
      },

      /**
       * @class
       * @private
       * @name BaseTextureCache
       * @memberof PIXI
       * @see PIXI.utils.BaseTextureCache
       * @deprecated since version 3.0.0
       */
      BaseTextureCache: {
        get: function get() {
          warn('The BaseTextureCache class has been moved to utils.BaseTextureCache, ' + 'please use utils.BaseTextureCache from now on.')

          return core.utils.BaseTextureCache
        }
      },

      /**
       * @class
       * @private
       * @name TextureCache
       * @memberof PIXI
       * @see PIXI.utils.TextureCache
       * @deprecated since version 3.0.0
       */
      TextureCache: {
        get: function get() {
          warn('The TextureCache class has been moved to utils.TextureCache, ' + 'please use utils.TextureCache from now on.')

          return core.utils.TextureCache
        }
      },

      /**
       * @namespace
       * @private
       * @name math
       * @memberof PIXI
       * @see PIXI
       * @deprecated since version 3.0.6
       */
      math: {
        get: function get() {
          warn('The math namespace is deprecated, please access members already accessible on PIXI.')

          return core
        }
      },

      /**
       * @class
       * @private
       * @name PIXI.AbstractFilter
       * @see PIXI.Filter
       * @deprecated since version 3.0.6
       */
      AbstractFilter: {
        get: function get() {
          warn('AstractFilter has been renamed to Filter, please use PIXI.Filter')

          return core.Filter
        }
      },

      /**
       * @class
       * @private
       * @name PIXI.TransformManual
       * @see PIXI.TransformBase
       * @deprecated since version 4.0.0
       */
      TransformManual: {
        get: function get() {
          warn('TransformManual has been renamed to TransformBase, please update your pixi-spine')

          return core.TransformBase
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.TARGET_FPMS
       * @see PIXI.settings.TARGET_FPMS
       * @deprecated since version 4.2.0
       */
      TARGET_FPMS: {
        get: function get() {
          warn('PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS')

          return core.settings.TARGET_FPMS
        },
        set: function set(value) {
          warn('PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS')

          core.settings.TARGET_FPMS = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.FILTER_RESOLUTION
       * @see PIXI.settings.FILTER_RESOLUTION
       * @deprecated since version 4.2.0
       */
      FILTER_RESOLUTION: {
        get: function get() {
          warn('PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION')

          return core.settings.FILTER_RESOLUTION
        },
        set: function set(value) {
          warn('PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION')

          core.settings.FILTER_RESOLUTION = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.RESOLUTION
       * @see PIXI.settings.RESOLUTION
       * @deprecated since version 4.2.0
       */
      RESOLUTION: {
        get: function get() {
          warn('PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION')

          return core.settings.RESOLUTION
        },
        set: function set(value) {
          warn('PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION')

          core.settings.RESOLUTION = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.MIPMAP_TEXTURES
       * @see PIXI.settings.MIPMAP_TEXTURES
       * @deprecated since version 4.2.0
       */
      MIPMAP_TEXTURES: {
        get: function get() {
          warn('PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES')

          return core.settings.MIPMAP_TEXTURES
        },
        set: function set(value) {
          warn('PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES')

          core.settings.MIPMAP_TEXTURES = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.SPRITE_BATCH_SIZE
       * @see PIXI.settings.SPRITE_BATCH_SIZE
       * @deprecated since version 4.2.0
       */
      SPRITE_BATCH_SIZE: {
        get: function get() {
          warn('PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE')

          return core.settings.SPRITE_BATCH_SIZE
        },
        set: function set(value) {
          warn('PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE')

          core.settings.SPRITE_BATCH_SIZE = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.SPRITE_MAX_TEXTURES
       * @see PIXI.settings.SPRITE_MAX_TEXTURES
       * @deprecated since version 4.2.0
       */
      SPRITE_MAX_TEXTURES: {
        get: function get() {
          warn('PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES')

          return core.settings.SPRITE_MAX_TEXTURES
        },
        set: function set(value) {
          warn('PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES')

          core.settings.SPRITE_MAX_TEXTURES = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.RETINA_PREFIX
       * @see PIXI.settings.RETINA_PREFIX
       * @deprecated since version 4.2.0
       */
      RETINA_PREFIX: {
        get: function get() {
          warn('PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX')

          return core.settings.RETINA_PREFIX
        },
        set: function set(value) {
          warn('PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX')

          core.settings.RETINA_PREFIX = value
        }
      },

      /**
       * @static
       * @constant
       * @name PIXI.DEFAULT_RENDER_OPTIONS
       * @see PIXI.settings.RENDER_OPTIONS
       * @deprecated since version 4.2.0
       */
      DEFAULT_RENDER_OPTIONS: {
        get: function get() {
          warn('PIXI.DEFAULT_RENDER_OPTIONS has been deprecated, please use PIXI.settings.DEFAULT_RENDER_OPTIONS')

          return core.settings.RENDER_OPTIONS
        }
      }
    })

    // Move the default properties to settings
    var defaults = [{
      parent: 'TRANSFORM_MODE',
      target: 'TRANSFORM_MODE'
    }, {
      parent: 'GC_MODES',
      target: 'GC_MODE'
    }, {
      parent: 'WRAP_MODES',
      target: 'WRAP_MODE'
    }, {
      parent: 'SCALE_MODES',
      target: 'SCALE_MODE'
    }, {
      parent: 'PRECISION',
      target: 'PRECISION_FRAGMENT'
    }]

    var _loop = function _loop(i) {
      var deprecation = defaults[i]

      Object.defineProperty(core[deprecation.parent], 'DEFAULT', {
        get: function get() {
          warn('PIXI.' + deprecation.parent + '.DEFAULT has been deprecated, ' + ('please use PIXI.settings.' + deprecation.target))

          return core.settings[deprecation.target]
        },
        set: function set(value) {
          warn('PIXI.' + deprecation.parent + '.DEFAULT has been deprecated, ' + ('please use PIXI.settings.' + deprecation.target))

          core.settings[deprecation.target] = value
        }
      })
    }

    for (var i = 0; i < defaults.length; i++) {
      _loop(i)
    }

    Object.defineProperties(core.settings, {

      /**
       * @static
       * @name PRECISION
       * @memberof PIXI.settings
       * @see PIXI.PRECISION
       * @deprecated since version 4.4.0
       */
      PRECISION: {
        get: function get() {
          warn('PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT')

          return core.settings.PRECISION_FRAGMENT
        },
        set: function set(value) {
          warn('PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT')

          core.settings.PRECISION_FRAGMENT = value
        }
      }
    })

    if (extras.AnimatedSprite) {
      Object.defineProperties(extras, {

        /**
         * @class
         * @name MovieClip
         * @memberof PIXI.extras
         * @see PIXI.extras.AnimatedSprite
         * @deprecated since version 4.2.0
         */
        MovieClip: {
          get: function get() {
            warn('The MovieClip class has been renamed to AnimatedSprite, please use AnimatedSprite from now on.')

            return extras.AnimatedSprite
          }
        }
      })
    }

    if (extras) {
      Object.defineProperties(extras, {
        /**
         * @class
         * @name TextureTransform
         * @memberof PIXI.extras
         * @see PIXI.TextureMatrix
         * @deprecated since version 4.6.0
         */
        TextureTransform: {
          get: function get() {
            warn('The TextureTransform class has been renamed to TextureMatrix, ' + 'please use PIXI.TextureMatrix from now on.')

            return core.TextureMatrix
          }
        }
      })
    }

    core.DisplayObject.prototype.generateTexture = function generateTexture(renderer, scaleMode, resolution) {
      warn('generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)')

      return renderer.generateTexture(this, scaleMode, resolution)
    }

    core.Graphics.prototype.generateTexture = function generateTexture(scaleMode, resolution) {
      warn('graphics generate texture has moved to the renderer. ' + 'Or to render a graphics to a texture using canvas please use generateCanvasTexture')

      return this.generateCanvasTexture(scaleMode, resolution)
    }

    /**
     * @method
     * @name PIXI.GroupD8.isSwapWidthHeight
     * @see PIXI.GroupD8.isVertical
     * @param {number} rotation - The number to check.
     * @returns {boolean} Whether or not the direction is vertical
     * @deprecated since version 4.6.0
     */
    core.GroupD8.isSwapWidthHeight = function isSwapWidthHeight(rotation) {
      warn('GroupD8.isSwapWidthHeight was renamed to GroupD8.isVertical')

      return core.GroupD8.isVertical(rotation)
    }

    core.RenderTexture.prototype.render = function render(displayObject, matrix, clear, updateTransform) {
      this.legacyRenderer.render(displayObject, this, clear, matrix, !updateTransform)
      warn('RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)')
    }

    core.RenderTexture.prototype.getImage = function getImage(target) {
      warn('RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)')

      return this.legacyRenderer.extract.image(target)
    }

    core.RenderTexture.prototype.getBase64 = function getBase64(target) {
      warn('RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)')

      return this.legacyRenderer.extract.base64(target)
    }

    core.RenderTexture.prototype.getCanvas = function getCanvas(target) {
      warn('RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)')

      return this.legacyRenderer.extract.canvas(target)
    }

    core.RenderTexture.prototype.getPixels = function getPixels(target) {
      warn('RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)')

      return this.legacyRenderer.pixels(target)
    }

    /**
     * @method
     * @private
     * @name PIXI.Sprite#setTexture
     * @see PIXI.Sprite#texture
     * @deprecated since version 3.0.0
     * @param {PIXI.Texture} texture - The texture to set to.
     */
    core.Sprite.prototype.setTexture = function setTexture(texture) {
      this.texture = texture
      warn('setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;')
    }

    if (extras.BitmapText) {
      /**
       * @method
       * @name PIXI.extras.BitmapText#setText
       * @see PIXI.extras.BitmapText#text
       * @deprecated since version 3.0.0
       * @param {string} text - The text to set to.
       */
      extras.BitmapText.prototype.setText = function setText(text) {
        this.text = text
        warn('setText is now deprecated, please use the text property, e.g : myBitmapText.text = \'my text\';')
      }
    }

    /**
     * @method
     * @name PIXI.Text#setText
     * @see PIXI.Text#text
     * @deprecated since version 3.0.0
     * @param {string} text - The text to set to.
     */
    core.Text.prototype.setText = function setText(text) {
      this.text = text
      warn('setText is now deprecated, please use the text property, e.g : myText.text = \'my text\';')
    }

    /**
     * Calculates the ascent, descent and fontSize of a given fontStyle
     *
     * @name PIXI.Text.calculateFontProperties
     * @see PIXI.TextMetrics.measureFont
     * @deprecated since version 4.5.0
     * @param {string} font - String representing the style of the font
     * @return {Object} Font properties object
     */
    core.Text.calculateFontProperties = function calculateFontProperties(font) {
      warn('Text.calculateFontProperties is now deprecated, please use the TextMetrics.measureFont')

      return core.TextMetrics.measureFont(font)
    }

    Object.defineProperties(core.Text, {
      fontPropertiesCache: {
        get: function get() {
          warn('Text.fontPropertiesCache is deprecated')

          return core.TextMetrics._fonts
        }
      },
      fontPropertiesCanvas: {
        get: function get() {
          warn('Text.fontPropertiesCanvas is deprecated')

          return core.TextMetrics._canvas
        }
      },
      fontPropertiesContext: {
        get: function get() {
          warn('Text.fontPropertiesContext is deprecated')

          return core.TextMetrics._context
        }
      }
    })

    /**
     * @method
     * @name PIXI.Text#setStyle
     * @see PIXI.Text#style
     * @deprecated since version 3.0.0
     * @param {*} style - The style to set to.
     */
    core.Text.prototype.setStyle = function setStyle(style) {
      this.style = style
      warn('setStyle is now deprecated, please use the style property, e.g : myText.style = style;')
    }

    /**
     * @method
     * @name PIXI.Text#determineFontProperties
     * @see PIXI.Text#measureFontProperties
     * @deprecated since version 4.2.0
     * @private
     * @param {string} fontStyle - String representing the style of the font
     * @return {Object} Font properties object
     */
    core.Text.prototype.determineFontProperties = function determineFontProperties(fontStyle) {
      warn('determineFontProperties is now deprecated, please use TextMetrics.measureFont method')

      return core.TextMetrics.measureFont(fontStyle)
    }

    /**
     * @method
     * @name PIXI.Text.getFontStyle
     * @see PIXI.TextMetrics.getFontStyle
     * @deprecated since version 4.5.0
     * @param {PIXI.TextStyle} style - The style to use.
     * @return {string} Font string
     */
    core.Text.getFontStyle = function getFontStyle(style) {
      warn('getFontStyle is now deprecated, please use TextStyle.toFontString() instead')

      style = style || {}

      if (!(style instanceof core.TextStyle)) {
        style = new core.TextStyle(style)
      }

      return style.toFontString()
    }

    Object.defineProperties(core.TextStyle.prototype, {
      /**
       * Set all properties of a font as a single string
       *
       * @name PIXI.TextStyle#font
       * @deprecated since version 4.0.0
       */
      font: {
        get: function get() {
          warn(
            'text style property \'font\' is now deprecated, please use the ' +
            '\'fontFamily\', \'fontSize\', \'fontStyle\', \'fontVariant\' and \'fontWeight\' properties from now on'
          )

          var fontSizeString = typeof this._fontSize === 'number' ? this._fontSize + 'px' : this._fontSize

          return this._fontStyle + ' ' + this._fontVariant + ' ' + this._fontWeight + ' ' + fontSizeString + ' ' + this._fontFamily
        },
        set: function set(font) {
          warn('text style property \'font\' is now deprecated, please use the ' + '\'fontFamily\',\'fontSize\',fontStyle\',\'fontVariant\' and \'fontWeight\' properties from now on')

          // can work out fontStyle from search of whole string
          if (font.indexOf('italic') > 1) {
            this._fontStyle = 'italic'
          } else if (font.indexOf('oblique') > -1) {
            this._fontStyle = 'oblique'
          } else {
            this._fontStyle = 'normal'
          }

          // can work out fontVariant from search of whole string
          if (font.indexOf('small-caps') > -1) {
            this._fontVariant = 'small-caps'
          } else {
            this._fontVariant = 'normal'
          }

          // fontWeight and fontFamily are tricker to find, but it's easier to find the fontSize due to it's units
          var splits = font.split(' ')
          var fontSizeIndex = -1

          this._fontSize = 26
          for (var i = 0; i < splits.length; ++i) {
            if (splits[i].match(/(px|pt|em|%)/)) {
              fontSizeIndex = i
              this._fontSize = splits[i]
              break
            }
          }

          // we can now search for fontWeight as we know it must occur before the fontSize
          this._fontWeight = 'normal'
          for (var _i = 0; _i < fontSizeIndex; ++_i) {
            if (splits[_i].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
              this._fontWeight = splits[_i]
              break
            }
          }

          // and finally join everything together after the fontSize in case the font family has multiple words
          if (fontSizeIndex > -1 && fontSizeIndex < splits.length - 1) {
            this._fontFamily = ''
            for (var _i2 = fontSizeIndex + 1; _i2 < splits.length; ++_i2) {
              this._fontFamily += splits[_i2] + ' '
            }

            this._fontFamily = this._fontFamily.slice(0, -1)
          } else {
            this._fontFamily = 'Arial'
          }

          this.styleID++
        }
      }
    })

    /**
     * @method
     * @name PIXI.Texture#setFrame
     * @see PIXI.Texture#setFrame
     * @deprecated since version 3.0.0
     * @param {PIXI.Rectangle} frame - The frame to set.
     */
    core.Texture.prototype.setFrame = function setFrame(frame) {
      this.frame = frame
      warn('setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;')
    }

    /**
     * @static
     * @function
     * @name PIXI.Texture.addTextureToCache
     * @see PIXI.Texture.addToCache
     * @deprecated since 4.5.0
     * @param {PIXI.Texture} texture - The Texture to add to the cache.
     * @param {string} id - The id that the texture will be stored against.
     */
    core.Texture.addTextureToCache = function addTextureToCache(texture, id) {
      core.Texture.addToCache(texture, id)
      warn('Texture.addTextureToCache is deprecated, please use Texture.addToCache from now on.')
    }

    /**
     * @static
     * @function
     * @name PIXI.Texture.removeTextureFromCache
     * @see PIXI.Texture.removeFromCache
     * @deprecated since 4.5.0
     * @param {string} id - The id of the texture to be removed
     * @return {PIXI.Texture|null} The texture that was removed
     */
    core.Texture.removeTextureFromCache = function removeTextureFromCache(id) {
      warn('Texture.removeTextureFromCache is deprecated, please use Texture.removeFromCache from now on. ' + 'Be aware that Texture.removeFromCache does not automatically its BaseTexture from the BaseTextureCache. ' + 'For that, use BaseTexture.removeFromCache')

      core.BaseTexture.removeFromCache(id)

      return core.Texture.removeFromCache(id)
    }

    Object.defineProperties(filters, {

      /**
       * @class
       * @private
       * @name PIXI.filters.AbstractFilter
       * @see PIXI.AbstractFilter
       * @deprecated since version 3.0.6
       */
      AbstractFilter: {
        get: function get() {
          warn('AstractFilter has been renamed to Filter, please use PIXI.Filter')

          return core.AbstractFilter
        }
      },

      /**
       * @class
       * @private
       * @name PIXI.filters.SpriteMaskFilter
       * @see PIXI.SpriteMaskFilter
       * @deprecated since version 3.0.6
       */
      SpriteMaskFilter: {
        get: function get() {
          warn('filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on.')

          return core.SpriteMaskFilter
        }
      },

      /**
       * @class
       * @private
       * @name PIXI.filters.VoidFilter
       * @see PIXI.filters.AlphaFilter
       * @deprecated since version 4.5.7
       */
      VoidFilter: {
        get: function get() {
          warn('VoidFilter has been renamed to AlphaFilter, please use PIXI.filters.AlphaFilter')

          return filters.AlphaFilter
        }
      }
    })

    /**
     * @method
     * @name PIXI.utils.uuid
     * @see PIXI.utils.uid
     * @deprecated since version 3.0.6
     * @return {number} The uid
     */
    core.utils.uuid = function () {
      warn('utils.uuid() is deprecated, please use utils.uid() from now on.')

      return core.utils.uid()
    }

    /**
     * @method
     * @name PIXI.utils.canUseNewCanvasBlendModes
     * @see PIXI.CanvasTinter
     * @deprecated
     * @return {boolean} Can use blend modes.
     */
    core.utils.canUseNewCanvasBlendModes = function () {
      warn('utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on')

      return core.CanvasTinter.canUseMultiply
    }

    var saidHello = true

    /**
     * @name PIXI.utils._saidHello
     * @type {boolean}
     * @see PIXI.utils.skipHello
     * @deprecated since 4.1.0
     */
    Object.defineProperty(core.utils, '_saidHello', {
      set: function set(bool) {
        if (bool) {
          warn('PIXI.utils._saidHello is deprecated, please use PIXI.utils.skipHello()')
          this.skipHello()
        }
        saidHello = bool
      },
      get: function get() {
        return saidHello
      }
    })

    if (prepare.BasePrepare) {
      /**
       * @method
       * @name PIXI.prepare.BasePrepare#register
       * @see PIXI.prepare.BasePrepare#registerFindHook
       * @deprecated since version 4.4.2
       * @param {Function} [addHook] - Function call that takes two parameters: `item:*, queue:Array`
       *        function must return `true` if it was able to add item to the queue.
       * @param {Function} [uploadHook] - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
       *        function must return `true` if it was able to handle upload of item.
       * @return {PIXI.BasePrepare} Instance of plugin for chaining.
       */
      prepare.BasePrepare.prototype.register = function register(addHook, uploadHook) {
        warn('renderer.plugins.prepare.register is now deprecated, ' + 'please use renderer.plugins.prepare.registerFindHook & renderer.plugins.prepare.registerUploadHook')

        if (addHook) {
          this.registerFindHook(addHook)
        }

        if (uploadHook) {
          this.registerUploadHook(uploadHook)
        }

        return this
      }
    }

    if (prepare.canvas) {
      /**
       * The number of graphics or textures to upload to the GPU.
       *
       * @name PIXI.prepare.canvas.UPLOADS_PER_FRAME
       * @static
       * @type {number}
       * @see PIXI.prepare.BasePrepare.limiter
       * @deprecated since 4.2.0
       */
      Object.defineProperty(prepare.canvas, 'UPLOADS_PER_FRAME', {
        set: function set() {
          warn('PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please set ' + 'renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer')
          // because we don't have a reference to the renderer, we can't actually set
          // the uploads per frame, so we'll have to stick with the warning.
        },
        get: function get() {
          warn('PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please use ' + 'renderer.plugins.prepare.limiter')

          return NaN
        }
      })
    }

    if (prepare.webgl) {
      /**
       * The number of graphics or textures to upload to the GPU.
       *
       * @name PIXI.prepare.webgl.UPLOADS_PER_FRAME
       * @static
       * @type {number}
       * @see PIXI.prepare.BasePrepare.limiter
       * @deprecated since 4.2.0
       */
      Object.defineProperty(prepare.webgl, 'UPLOADS_PER_FRAME', {
        set: function set() {
          warn('PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please set ' + 'renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer')
          // because we don't have a reference to the renderer, we can't actually set
          // the uploads per frame, so we'll have to stick with the warning.
        },
        get: function get() {
          warn('PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please use ' + 'renderer.plugins.prepare.limiter')

          return NaN
        }
      })
    }

    if (loaders.Loader) {
      var Resource = loaders.Resource
      var Loader = loaders.Loader

      Object.defineProperties(Resource.prototype, {
        isJson: {
          get: function get() {
            warn('The isJson property is deprecated, please use `resource.type === Resource.TYPE.JSON`.')

            return this.type === Resource.TYPE.JSON
          }
        },
        isXml: {
          get: function get() {
            warn('The isXml property is deprecated, please use `resource.type === Resource.TYPE.XML`.')

            return this.type === Resource.TYPE.XML
          }
        },
        isImage: {
          get: function get() {
            warn('The isImage property is deprecated, please use `resource.type === Resource.TYPE.IMAGE`.')

            return this.type === Resource.TYPE.IMAGE
          }
        },
        isAudio: {
          get: function get() {
            warn('The isAudio property is deprecated, please use `resource.type === Resource.TYPE.AUDIO`.')

            return this.type === Resource.TYPE.AUDIO
          }
        },
        isVideo: {
          get: function get() {
            warn('The isVideo property is deprecated, please use `resource.type === Resource.TYPE.VIDEO`.')

            return this.type === Resource.TYPE.VIDEO
          }
        }
      })

      Object.defineProperties(Loader.prototype, {
        before: {
          get: function get() {
            warn('The before() method is deprecated, please use pre().')

            return this.pre
          }
        },
        after: {
          get: function get() {
            warn('The after() method is deprecated, please use use().')

            return this.use
          }
        }
      })
    }

    if (interaction.interactiveTarget) {
      /**
       * @name PIXI.interaction.interactiveTarget#defaultCursor
       * @static
       * @type {number}
       * @see PIXI.interaction.interactiveTarget#cursor
       * @deprecated since 4.3.0
       */
      Object.defineProperty(interaction.interactiveTarget, 'defaultCursor', {
        set: function set(value) {
          warn('Property defaultCursor has been replaced with \'cursor\'. ')
          this.cursor = value
        },
        get: function get() {
          warn('Property defaultCursor has been replaced with \'cursor\'. ')

          return this.cursor
        }
      })
    }

    if (interaction.InteractionManager) {
      /**
       * @name PIXI.interaction.InteractionManager#defaultCursorStyle
       * @static
       * @type {string}
       * @see PIXI.interaction.InteractionManager#cursorStyles
       * @deprecated since 4.3.0
       */
      Object.defineProperty(interaction.InteractionManager, 'defaultCursorStyle', {
        set: function set(value) {
          warn('Property defaultCursorStyle has been replaced with \'cursorStyles.default\'. ')
          this.cursorStyles.default = value
        },
        get: function get() {
          warn('Property defaultCursorStyle has been replaced with \'cursorStyles.default\'. ')

          return this.cursorStyles.default
        }
      })

      /**
       * @name PIXI.interaction.InteractionManager#currentCursorStyle
       * @static
       * @type {string}
       * @see PIXI.interaction.InteractionManager#cursorStyles
       * @deprecated since 4.3.0
       */
      Object.defineProperty(interaction.InteractionManager, 'currentCursorStyle', {
        set: function set(value) {
          warn('Property currentCursorStyle has been removed.' + 'See the currentCursorMode property, which works differently.')
          this.currentCursorMode = value
        },
        get: function get() {
          warn('Property currentCursorStyle has been removed.' + 'See the currentCursorMode property, which works differently.')

          return this.currentCursorMode
        }
      })
    }
  }

  return deprecation
})()

const generateFragBlurSource = (() => {
  var GAUSSIAN_VALUES = {
    5: [0.153388, 0.221461, 0.250301],
    7: [0.071303, 0.131514, 0.189879, 0.214607],
    9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
    11: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
    13: [0.002406, 0.009255, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
    15: [0.000489, 0.002403, 0.009246, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
  }

  var fragTemplate = [
    'varying vec2 vBlurTexCoords[%size%];', 'uniform sampler2D uSampler;',
    'void main(void)', '{', '    gl_FragColor = vec4(0.0);', '    %blur%', '}'
  ].join('\n')

  function generateFragBlurSource(kernelSize) {
    var kernel = GAUSSIAN_VALUES[kernelSize]
    var halfLength = kernel.length

    var fragSource = fragTemplate

    var blurLoop = ''
    var template = 'gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;'
    var value = void 0

    for (var i = 0; i < kernelSize; i++) {
      var blur = template.replace('%index%', i)

      value = i

      if (i >= halfLength) {
        value = kernelSize - i - 1
      }

      blur = blur.replace('%value%', kernel[value])

      blurLoop += blur
      blurLoop += '\n'
    }

    fragSource = fragSource.replace('%blur%', blurLoop)
    fragSource = fragSource.replace('%size%', kernelSize)

    return fragSource
  }

  return generateFragBlurSource
})()

const generateVertBlurSource = (() => {

  var vertTemplate = ['attribute vec2 aVertexPosition;', 'attribute vec2 aTextureCoord;', 'uniform float strength;', 'uniform mat3 projectionMatrix;', 'varying vec2 vBlurTexCoords[%size%];', 'void main(void)', '{', 'gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);', '%blur%', '}'].join('\n')

  function generateVertBlurSource(kernelSize, x) {
    var halfLength = Math.ceil(kernelSize / 2)

    var vertSource = vertTemplate

    var blurLoop = ''
    var template = void 0
    // let value

    if (x) {
      template = 'vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);'
    } else {
      template = 'vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);'
    }

    for (var i = 0; i < kernelSize; i++) {
      var blur = template.replace('%index%', i)

      // value = i

      // if(i >= halfLength)
      // {
      //     value = kernelSize - i - 1
      // }

      blur = blur.replace('%sampleIndex%', i - (halfLength - 1) + '.0')

      blurLoop += blur
      blurLoop += '\n'
    }

    vertSource = vertSource.replace('%blur%', blurLoop)
    vertSource = vertSource.replace('%size%', kernelSize)

    return vertSource
  }

  return generateVertBlurSource
})()

const getMaxKernelSize = gl => {
  var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS)
  var kernelSize = 15

  while (kernelSize > maxVaryings) {
    kernelSize -= 2
  }

  return kernelSize
}

/**
 * Event class that mimics native DOM events.
 *
 * @class
 * @memberof PIXI.interaction
 */
const InteractionEvent = (() => {
  function InteractionEvent() {
    class_call_check_(this, InteractionEvent)

    /**
     * Whether this event will continue propagating in the tree
     *
     * @member {boolean}
     */
    this.stopped = false

    /**
     * The object which caused this event to be dispatched.
     * For listener callback see {@link PIXI.interaction.InteractionEvent.currentTarget}.
     *
     * @member {PIXI.DisplayObject}
     */
    this.target = null

    /**
     * The object whose event listener’s callback is currently being invoked.
     *
     * @member {PIXI.DisplayObject}
     */
    this.currentTarget = null

    /**
     * Type of the event
     *
     * @member {string}
     */
    this.type = null

    /**
     * InteractionData related to this event
     *
     * @member {PIXI.interaction.InteractionData}
     */
    this.data = null
  }

  /**
   * Prevents event from reaching any objects other than the current object.
   *
   */
  InteractionEvent.prototype.stopPropagation = function stopPropagation() {
    this.stopped = true
  }

  /**
   * Resets the event.
   */
  InteractionEvent.prototype.reset = function reset() {
    this.stopped = false
    this.currentTarget = null
    this.target = null
  }

  return InteractionEvent
})()

const InteractionTrackingData = (() => {
  /**
   * DisplayObjects with the {@link PIXI.interaction.interactiveTarget} mixin use this class to track interactions
   *
   * @class
   * @private
   * @memberof PIXI.interaction
   */
  var InteractionTrackingData = function () {
    /**
     * @param {number} pointerId - Unique pointer id of the event
     */
    function InteractionTrackingData(pointerId) {
      class_call_check_(this, InteractionTrackingData)

      this._pointerId = pointerId
      this._flags = InteractionTrackingData.FLAGS.NONE
    }

    /**
     *
     * @private
     * @param {number} flag - The interaction flag to set
     * @param {boolean} yn - Should the flag be set or unset
     */
    InteractionTrackingData.prototype._doSet = function _doSet(flag, yn) {
      if (yn) {
        this._flags = this._flags | flag
      } else {
        this._flags = this._flags & ~flag
      }
    }

    /**
     * Unique pointer id of the event
     *
     * @readonly
     * @member {number}
     */
    create_class_(InteractionTrackingData, [{
      key: "pointerId",
      get: function get() {
        return this._pointerId
      }

      /**
       * State of the tracking data, expressed as bit flags
       *
       * @member {number}
       * @memberof PIXI.interaction.InteractionTrackingData#
       */

    }, {
      key: "flags",
      get: function get() {
        return this._flags
      }

      /**
       * Set the flags for the tracking data
       *
       * @param {number} flags - Flags to set
       */
      ,
      set: function set(flags) {
        this._flags = flags
      }

      /**
       * Is the tracked event inactive (not over or down)?
       *
       * @member {number}
       * @memberof PIXI.interaction.InteractionTrackingData#
       */

    }, {
      key: "none",
      get: function get() {
        return this._flags === this.constructor.FLAGS.NONE
      }

      /**
       * Is the tracked event over the DisplayObject?
       *
       * @member {boolean}
       * @memberof PIXI.interaction.InteractionTrackingData#
       */

    }, {
      key: "over",
      get: function get() {
        return (this._flags & this.constructor.FLAGS.OVER) !== 0
      }

      /**
       * Set the over flag
       *
       * @param {boolean} yn - Is the event over?
       */
      ,
      set: function set(yn) {
        this._doSet(this.constructor.FLAGS.OVER, yn)
      }

      /**
       * Did the right mouse button come down in the DisplayObject?
       *
       * @member {boolean}
       * @memberof PIXI.interaction.InteractionTrackingData#
       */

    }, {
      key: "rightDown",
      get: function get() {
        return (this._flags & this.constructor.FLAGS.RIGHT_DOWN) !== 0
      }

      /**
       * Set the right down flag
       *
       * @param {boolean} yn - Is the right mouse button down?
       */
      ,
      set: function set(yn) {
        this._doSet(this.constructor.FLAGS.RIGHT_DOWN, yn)
      }

      /**
       * Did the left mouse button come down in the DisplayObject?
       *
       * @member {boolean}
       * @memberof PIXI.interaction.InteractionTrackingData#
       */

    }, {
      key: "leftDown",
      get: function get() {
        return (this._flags & this.constructor.FLAGS.LEFT_DOWN) !== 0
      }

      /**
       * Set the left down flag
       *
       * @param {boolean} yn - Is the left mouse button down?
       */
      ,
      set: function set(yn) {
        this._doSet(this.constructor.FLAGS.LEFT_DOWN, yn)
      }
    }])

    return InteractionTrackingData
  }()

  InteractionTrackingData.FLAGS = Object.freeze({
    NONE: 0,
    OVER: 1 << 0,
    LEFT_DOWN: 1 << 1,
    RIGHT_DOWN: 1 << 2
  })

  return InteractionTrackingData
})()

/**
 * Default property values of interactive objects
 * Used by {@link PIXI.interaction.InteractionManager} to automatically give all DisplayObjects these properties
 *
 * @private
 * @name interactiveTarget
 * @memberof PIXI.interaction
 * @example
 *      function MyObject() {}
 *
 *      Object.assign(
 *          core.DisplayObject.prototype,
 *          PIXI.interaction.interactiveTarget
 *      )
 */
const interactiveTarget = {
  /**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse
   * events will not be emitted unless `interactive` is set to `true`.
   *
   * @example
   * const sprite = new PIXI.Sprite(texture)
   * sprite.interactive = true
   * sprite.on('tap', (event) => {
   *    //handle event
   * })
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */
  interactive: false,

  /**
   * Determines if the children to the displayObject can be clicked/touched
   * Setting this to false allows PixiJS to bypass a recursive `hitTest` function
   *
   * @member {boolean}
   * @memberof PIXI.Container#
   */
  interactiveChildren: true,

  /**
   * Interaction shape. Children will be hit first, then this shape will be checked.
   * Setting this will cause this shape to be checked in hit tests rather than the displayObject's bounds.
   *
   * @example
   * const sprite = new PIXI.Sprite(texture)
   * sprite.interactive = true
   * sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100)
   * @member {PIXI.Rectangle|PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.RoundedRectangle}
   * @memberof PIXI.DisplayObject#
   */
  hitArea: null,

  /**
   * If enabled, the mouse cursor use the pointer behavior when hovered over the displayObject if it is interactive
   * Setting this changes the 'cursor' property to `'pointer'`.
   *
   * @example
   * const sprite = new PIXI.Sprite(texture)
   * sprite.interactive = true
   * sprite.buttonMode = true
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */
  get buttonMode() {
    return this.cursor === 'pointer'
  },
  set buttonMode(value) {
    if (value) {
      this.cursor = 'pointer'
    } else if (this.cursor === 'pointer') {
      this.cursor = null
    }
  },

  /**
   * This defines what cursor mode is used when the mouse cursor
   * is hovered over the displayObject.
   *
   * @example
   * const sprite = new PIXI.Sprite(texture)
   * sprite.interactive = true
   * sprite.cursor = 'wait'
   * @see https://developer.mozilla.org/en/docs/Web/CSS/cursor
   *
   * @member {string}
   * @memberof PIXI.DisplayObject#
   */
  cursor: null,

  /**
   * Internal set of all active pointers, by identifier
   *
   * @member {Map<number, InteractionTrackingData>}
   * @memberof PIXI.DisplayObject#
   * @private
   */
  get trackedPointers() {
    if (this._trackedPointers === undefined) this._trackedPointers = {}

    return this._trackedPointers
  },

  /**
   * Map of all tracked pointers, by identifier. Use trackedPointers to access.
   *
   * @private
   * @type {Map<number, InteractionTrackingData>}
   */
  _trackedPointers: undefined
}

const make_sign = () => {
  // References:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

  if (!Math.sign) {
    Math.sign = function mathSign(x) {
      x = Number(x)

      if (x === 0 || isNaN(x)) {
        return x
      }

      return x > 0 ? 1 : -1
    }
  }
}

const make_is_integer = () => {
  // References:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger

  if (!Number.isInteger) {
    Number.isInteger = function numberIsInteger(value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
    }
  }
}

const make_animation_frame_stuff = () => {
  void (function (global) {
    'use strict'

    // References:
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // https://gist.github.com/1579671
    // http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
    // https://gist.github.com/timhall/4078614
    // https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/requestAnimationFrame

    // Expected to be used with Browserfiy
    // Browserify automatically detects the use of `global` and passes the
    // correct reference of `global`, `self`, and finally `window`

    var ONE_FRAME_TIME = 16

    // Date.now
    if (!(Date.now && Date.prototype.getTime)) {
      Date.now = function now() {
        return new Date().getTime()
      }
    }

    // performance.now
    if (!(global.performance && global.performance.now)) {
      var startTime = Date.now()

      if (!global.performance) {
        global.performance = {}
      }

      global.performance.now = function () {
        return Date.now() - startTime
      }
    }

    // requestAnimationFrame
    var lastTime = Date.now()
    var vendors = ['ms', 'moz', 'webkit', 'o']

    for (var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
      var p = vendors[x]

      global.requestAnimationFrame = global[p + 'RequestAnimationFrame']
      global.cancelAnimationFrame = global[p + 'CancelAnimationFrame'] || global[p + 'CancelRequestAnimationFrame']
    }

    if (!global.requestAnimationFrame) {
      global.requestAnimationFrame = function (callback) {
        if (typeof callback !== 'function') {
          throw new TypeError(callback + 'is not a function')
        }

        var currentTime = Date.now()
        var delay = ONE_FRAME_TIME + lastTime - currentTime

        if (delay < 0) {
          delay = 0
        }

        lastTime = currentTime

        return setTimeout(function () {
          lastTime = Date.now()
          callback(performance.now())
        }, delay)
      }
    }

    if (!global.cancelAnimationFrame) {
      global.cancelAnimationFrame = function (id) {
        return clearTimeout(id)
      }
    }

  }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
}

/**
 * CountLimiter limits the number of items handled by a {@link PIXI.prepare.BasePrepare} to a specified
 * number of items per frame.
 *
 * @class
 * @memberof PIXI
 */
const CountLimiter = (() => {
  /**
   * @param {number} maxItemsPerFrame - The maximum number of items that can be prepared each frame.
   */
  function CountLimiter(maxItemsPerFrame) {
    class_call_check_(this, CountLimiter)

    /**
     * The maximum number of items that can be prepared each frame.
     * @private
     */
    this.maxItemsPerFrame = maxItemsPerFrame
    /**
     * The number of items that can be prepared in the current frame.
     * @type {number}
     * @private
     */
    this.itemsLeft = 0
  }

  /**
   * Resets any counting properties to start fresh on a new frame.
   */


  CountLimiter.prototype.beginFrame = function beginFrame() {
    this.itemsLeft = this.maxItemsPerFrame
  }

  /**
   * Checks to see if another item can be uploaded. This should only be called once per item.
   * @return {boolean} If the item is allowed to be uploaded.
   */


  CountLimiter.prototype.allowedToUpload = function allowedToUpload() {
    return this.itemsLeft-- > 0
  }

  return CountLimiter
})()

/**
 * TimeLimiter limits the number of items handled by a {@link PIXI.BasePrepare} to a specified
 * number of milliseconds per frame.
 *
 * @class
 * @memberof PIXI
 */
const TimeLimiter = (() => {
  /**
   * @param {number} maxMilliseconds - The maximum milliseconds that can be spent preparing items each frame.
   */
  function TimeLimiter(maxMilliseconds) {
    class_call_check_(this, TimeLimiter)

    /**
     * The maximum milliseconds that can be spent preparing items each frame.
     * @private
     */
    this.maxMilliseconds = maxMilliseconds
    /**
     * The start time of the current frame.
     * @type {number}
     * @private
     */
    this.frameStart = 0
  }

  /**
   * Resets any counting properties to start fresh on a new frame.
   */


  TimeLimiter.prototype.beginFrame = function beginFrame() {
    this.frameStart = Date.now()
  }

  /**
   * Checks to see if another item can be uploaded. This should only be called once per item.
   * @return {boolean} If the item is allowed to be uploaded.
   */


  TimeLimiter.prototype.allowedToUpload = function allowedToUpload() {
    return Date.now() - this.frameStart < this.maxMilliseconds
  }

  return TimeLimiter
})()

export {
  typeof_,
  inherits_,
  export_to_,
  create_class_,
  put_in_module_,
  get_constructor_,
  class_call_check_,
  interop_require_default_,
  interop_require_wildcard_,
  bit_twiddle,
  earcut,
  EventEmitter,
  IsMobile,
  MiniSignal,
  assign,
  parseURI,
  GLBuffer,
  GLTexture,
  createContext,
  setVertexAttribArrays,
  compileProgram,
  defaultValue,
  generateUniformAccessObject,
  mapSize,
  mapType,
  setPrecision,
  _process,
  punycode,
  decode,
  encode,
  removeItems,
  async_lib,
  b64,
  util,
  accessibleTarget,
  constants,
  GraphicsData,
  bezierCurveTo,
  ObservablePoint,
  Point,
  canUseNewCanvasBlendModes,
  WebGLManager,
  validateContext,
  BatchBuffer,
  TextMetrics,
  TickerListener,
  canUploadSameBuffer,
  createIndicesForQuads,
  mixins,
  PluginTarget,
  trimCanvas,
  deprecation,
  generateFragBlurSource,
  generateVertBlurSource,
  getMaxKernelSize,
  InteractionEvent,
  InteractionTrackingData,
  interactiveTarget,
  make_sign,
  make_is_integer,
  make_animation_frame_stuff,
  CountLimiter,
  TimeLimiter
}
