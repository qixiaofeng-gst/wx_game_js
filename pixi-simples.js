import {
  typeof_,
  inherits_,
  create_class_,
  put_in_module_,
  class_call_check_,
  get_constructor_,
  Point,
  ObservablePoint,
  constants,
  mapType, mapSize, defaultValue,
  _process,
  compileProgram,
  GLBuffer,
  createContext,
  setPrecision,
  generateUniformAccessObject,
  GLTexture,
  setVertexAttribArrays,
  parseURI,
  MiniSignal,
  async_lib,
  b64,
  decode,
  encode,
  punycode,
  util,
  IsMobile,
  canUploadSameBuffer,
  removeItems,
  EventEmitter,
  PluginTarget,
  mixins,
  earcut,
  TickerListener,
  bit_twiddle,
  trimCanvas,
  TextMetrics,
  canUseNewCanvasBlendModes,
  WebGLManager,
  createIndicesForQuads,
  validateContext
} from './pixi-independents'

/**
 * The PixiJS Matrix class as an object, which makes it a lot faster,
 * here is a representation of it :
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 *
 * @class
 * @memberof PIXI
 */
const Matrix = (() => {
  /**
   * @param {number} [a=1] - x scale
   * @param {number} [b=0] - x skew
   * @param {number} [c=0] - y skew
   * @param {number} [d=1] - y scale
   * @param {number} [tx=0] - x translation
   * @param {number} [ty=0] - y translation
   */
  function Matrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1
    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0
    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0

    class_call_check_(this, Matrix)

    /**
     * @member {number}
     * @default 1
     */
    this.a = a

    /**
     * @member {number}
     * @default 0
     */
    this.b = b

    /**
     * @member {number}
     * @default 0
     */
    this.c = c

    /**
     * @member {number}
     * @default 1
     */
    this.d = d

    /**
     * @member {number}
     * @default 0
     */
    this.tx = tx

    /**
     * @member {number}
     * @default 0
     */
    this.ty = ty

    this.array = null
  }

  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   *
   * @param {number[]} array - The array that the matrix will be populated from.
   */
  Matrix.prototype.fromArray = function fromArray(array) {
    this.a = array[0]
    this.b = array[1]
    this.c = array[3]
    this.d = array[4]
    this.tx = array[2]
    this.ty = array[5]
  }

  /**
   * sets the matrix properties
   *
   * @param {number} a - Matrix component
   * @param {number} b - Matrix component
   * @param {number} c - Matrix component
   * @param {number} d - Matrix component
   * @param {number} tx - Matrix component
   * @param {number} ty - Matrix component
   *
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.set = function set(a, b, c, d, tx, ty) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
    this.tx = tx
    this.ty = ty

    return this
  }

  /**
   * Creates an array from the current Matrix object.
   *
   * @param {boolean} transpose - Whether we need to transpose the matrix or not
   * @param {Float32Array} [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @return {number[]} the newly created array which contains the matrix
   */
  Matrix.prototype.toArray = function toArray(transpose, out) {
    if (!this.array) {
      this.array = new Float32Array(9)
    }

    var array = out || this.array

    if (transpose) {
      array[0] = this.a
      array[1] = this.b
      array[2] = 0
      array[3] = this.c
      array[4] = this.d
      array[5] = 0
      array[6] = this.tx
      array[7] = this.ty
      array[8] = 1
    } else {
      array[0] = this.a
      array[1] = this.c
      array[2] = this.tx
      array[3] = this.b
      array[4] = this.d
      array[5] = this.ty
      array[6] = 0
      array[7] = 0
      array[8] = 1
    }

    return array
  }

  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   *
   * @param {PIXI.Point} pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @return {PIXI.Point} The new point, transformed through this matrix
   */
  Matrix.prototype.apply = function apply(pos, newPos) {
    newPos = newPos || new Point()

    var x = pos.x
    var y = pos.y

    newPos.x = this.a * x + this.c * y + this.tx
    newPos.y = this.b * x + this.d * y + this.ty

    return newPos
  }

  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   *
   * @param {PIXI.Point} pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @return {PIXI.Point} The new point, inverse-transformed through this matrix
   */
  Matrix.prototype.applyInverse = function applyInverse(pos, newPos) {
    newPos = newPos || new Point()

    var id = 1 / (this.a * this.d + this.c * -this.b)

    var x = pos.x
    var y = pos.y

    newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id
    newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id

    return newPos
  }

  /**
   * Translates the matrix on the x and y.
   *
   * @param {number} x How much to translate x by
   * @param {number} y How much to translate y by
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.translate = function translate(x, y) {
    this.tx += x
    this.ty += y

    return this
  }

  /**
   * Applies a scale transformation to the matrix.
   *
   * @param {number} x The amount to scale horizontally
   * @param {number} y The amount to scale vertically
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.scale = function scale(x, y) {
    this.a *= x
    this.d *= y
    this.c *= x
    this.b *= y
    this.tx *= x
    this.ty *= y

    return this
  }

  /**
   * Applies a rotation transformation to the matrix.
   *
   * @param {number} angle - The angle in radians.
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.rotate = function rotate(angle) {
    var cos = Math.cos(angle)
    var sin = Math.sin(angle)

    var a1 = this.a
    var c1 = this.c
    var tx1 = this.tx

    this.a = a1 * cos - this.b * sin
    this.b = a1 * sin + this.b * cos
    this.c = c1 * cos - this.d * sin
    this.d = c1 * sin + this.d * cos
    this.tx = tx1 * cos - this.ty * sin
    this.ty = tx1 * sin + this.ty * cos

    return this
  }

  /**
   * Appends the given Matrix to this Matrix.
   *
   * @param {PIXI.Matrix} matrix - The matrix to append.
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.append = function append(matrix) {
    var a1 = this.a
    var b1 = this.b
    var c1 = this.c
    var d1 = this.d

    this.a = matrix.a * a1 + matrix.b * c1
    this.b = matrix.a * b1 + matrix.b * d1
    this.c = matrix.c * a1 + matrix.d * c1
    this.d = matrix.c * b1 + matrix.d * d1

    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx
    this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty

    return this
  }

  /**
   * Sets the matrix based on all the available properties
   *
   * @param {number} x - Position on the x axis
   * @param {number} y - Position on the y axis
   * @param {number} pivotX - Pivot on the x axis
   * @param {number} pivotY - Pivot on the y axis
   * @param {number} scaleX - Scale on the x axis
   * @param {number} scaleY - Scale on the y axis
   * @param {number} rotation - Rotation in radians
   * @param {number} skewX - Skew on the x axis
   * @param {number} skewY - Skew on the y axis
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.setTransform = function setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
    this.a = Math.cos(rotation + skewY) * scaleX
    this.b = Math.sin(rotation + skewY) * scaleX
    this.c = -Math.sin(rotation - skewX) * scaleY
    this.d = Math.cos(rotation - skewX) * scaleY

    this.tx = x - (pivotX * this.a + pivotY * this.c)
    this.ty = y - (pivotX * this.b + pivotY * this.d)

    return this
  }

  /**
   * Prepends the given Matrix to this Matrix.
   *
   * @param {PIXI.Matrix} matrix - The matrix to prepend
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.prepend = function prepend(matrix) {
    var tx1 = this.tx

    if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
      var a1 = this.a
      var c1 = this.c

      this.a = a1 * matrix.a + this.b * matrix.c
      this.b = a1 * matrix.b + this.b * matrix.d
      this.c = c1 * matrix.a + this.d * matrix.c
      this.d = c1 * matrix.b + this.d * matrix.d
    }

    this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx
    this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty

    return this
  }

  /**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   *
   * @param {PIXI.Transform|PIXI.TransformStatic} transform - The transform to apply the properties to.
   * @return {PIXI.Transform|PIXI.TransformStatic} The transform with the newly applied properties
   */
  Matrix.prototype.decompose = function decompose(transform) {
    // sort out rotation / skew..
    var a = this.a
    var b = this.b
    var c = this.c
    var d = this.d

    var skewX = -Math.atan2(-c, d)
    var skewY = Math.atan2(b, a)

    var delta = Math.abs(skewX + skewY)

    if (delta < 0.00001 || Math.abs(constants.PI_2 - delta) < 0.00001) {
      transform.rotation = skewY

      if (a < 0 && d >= 0) {
        transform.rotation += transform.rotation <= 0 ? Math.PI : -Math.PI
      }

      transform.skew.x = transform.skew.y = 0
    } else {
      transform.rotation = 0
      transform.skew.x = skewX
      transform.skew.y = skewY
    }

    // next set scale
    transform.scale.x = Math.sqrt(a * a + b * b)
    transform.scale.y = Math.sqrt(c * c + d * d)

    // next set position
    transform.position.x = this.tx
    transform.position.y = this.ty

    return transform
  }

  /**
   * Inverts this matrix
   *
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.invert = function invert() {
    var a1 = this.a
    var b1 = this.b
    var c1 = this.c
    var d1 = this.d
    var tx1 = this.tx
    var n = a1 * d1 - b1 * c1

    this.a = d1 / n
    this.b = -b1 / n
    this.c = -c1 / n
    this.d = a1 / n
    this.tx = (c1 * this.ty - d1 * tx1) / n
    this.ty = -(a1 * this.ty - b1 * tx1) / n

    return this
  }

  /**
   * Resets this Matix to an identity (default) matrix.
   *
   * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
   */
  Matrix.prototype.identity = function identity() {
    this.a = 1
    this.b = 0
    this.c = 0
    this.d = 1
    this.tx = 0
    this.ty = 0

    return this
  }

  /**
   * Creates a new Matrix object with the same values as this one.
   *
   * @return {PIXI.Matrix} A copy of this matrix. Good for chaining method calls.
   */
  Matrix.prototype.clone = function clone() {
    var matrix = new Matrix()

    matrix.a = this.a
    matrix.b = this.b
    matrix.c = this.c
    matrix.d = this.d
    matrix.tx = this.tx
    matrix.ty = this.ty

    return matrix
  }

  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   *
   * @param {PIXI.Matrix} matrix - The matrix to copy from.
   * @return {PIXI.Matrix} The matrix given in parameter with its values updated.
   */
  Matrix.prototype.copy = function copy(matrix) {
    matrix.a = this.a
    matrix.b = this.b
    matrix.c = this.c
    matrix.d = this.d
    matrix.tx = this.tx
    matrix.ty = this.ty

    return matrix
  }

  /**
   * A default (identity) matrix
   *
   * @static
   * @const
   */
  create_class_(Matrix, null, [{
    key: 'IDENTITY',
    get: function get() {
      return new Matrix()
    }

    /**
     * A temp matrix
     *
     * @static
     * @const
     */

  }, {
    key: 'TEMP_MATRIX',
    get: function get() {
      return new Matrix()
    }
  }])

  return Matrix
})()

const GroupD8 = (() => {
  var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1]; // Your friendly neighbour https://en.wikipedia.org/wiki/Dihedral_group of order 16
  var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1]
  var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1]
  var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1]
  var tempMatrices = []

  var mul = []

  function signum(x) {
    if (x < 0) {
      return -1
    }
    if (x > 0) {
      return 1
    }

    return 0
  }

  function init() {
    for (var i = 0; i < 16; i++) {
      var row = []

      mul.push(row)

      for (var j = 0; j < 16; j++) {
        var _ux = signum(ux[i] * ux[j] + vx[i] * uy[j])
        var _uy = signum(uy[i] * ux[j] + vy[i] * uy[j])
        var _vx = signum(ux[i] * vx[j] + vx[i] * vy[j])
        var _vy = signum(uy[i] * vx[j] + vy[i] * vy[j])

        for (var k = 0; k < 16; k++) {
          if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
            row.push(k)
            break
          }
        }
      }
    }

    for (var _i = 0; _i < 16; _i++) {
      var mat = new Matrix()

      mat.set(ux[_i], uy[_i], vx[_i], vy[_i], 0, 0)
      tempMatrices.push(mat)
    }
  }

  init()

  /**
   * Implements Dihedral Group D_8, see [group D4]{@link http://mathworld.wolfram.com/DihedralGroupD4.html},
   * D8 is the same but with diagonals. Used for texture rotations.
   *
   * Vector xX(i), xY(i) is U-axis of sprite with rotation i
   * Vector yY(i), yY(i) is V-axis of sprite with rotation i
   * Rotations: 0 grad (0), 90 grad (2), 180 grad (4), 270 grad (6)
   * Mirrors: vertical (8), main diagonal (10), horizontal (12), reverse diagonal (14)
   * This is the small part of gameofbombs.com portal system. It works.
   *
   * @author Ivan @ivanpopelyshev
   * @class
   * @memberof PIXI
   */
  var GroupD8 = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
    MIRROR_VERTICAL: 8,
    MIRROR_HORIZONTAL: 12,
    uX: function uX(ind) {
      return ux[ind]
    },
    uY: function uY(ind) {
      return uy[ind]
    },
    vX: function vX(ind) {
      return vx[ind]
    },
    vY: function vY(ind) {
      return vy[ind]
    },
    inv: function inv(rotation) {
      if (rotation & 8) {
        return rotation & 15
      }

      return -rotation & 7
    },
    add: function add(rotationSecond, rotationFirst) {
      return mul[rotationSecond][rotationFirst]
    },
    sub: function sub(rotationSecond, rotationFirst) {
      return mul[rotationSecond][GroupD8.inv(rotationFirst)]
    },

    /**
     * Adds 180 degrees to rotation. Commutative operation.
     *
     * @memberof PIXI.GroupD8
     * @param {number} rotation - The number to rotate.
     * @returns {number} rotated number
     */
    rotate180: function rotate180(rotation) {
      return rotation ^ 4
    },

    /**
     * Direction of main vector can be horizontal, vertical or diagonal.
     * Some objects work with vertical directions different.
     *
     * @memberof PIXI.GroupD8
     * @param {number} rotation - The number to check.
     * @returns {boolean} Whether or not the direction is vertical
     */
    isVertical: function isVertical(rotation) {
      return (rotation & 3) === 2
    },

    /**
     * @memberof PIXI.GroupD8
     * @param {number} dx - TODO
     * @param {number} dy - TODO
     *
     * @return {number} TODO
     */
    byDirection: function byDirection(dx, dy) {
      if (Math.abs(dx) * 2 <= Math.abs(dy)) {
        if (dy >= 0) {
          return GroupD8.S
        }

        return GroupD8.N
      } else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
        if (dx > 0) {
          return GroupD8.E
        }

        return GroupD8.W
      } else if (dy > 0) {
        if (dx > 0) {
          return GroupD8.SE
        }

        return GroupD8.SW
      } else if (dx > 0) {
        return GroupD8.NE
      }

      return GroupD8.NW
    },

    /**
     * Helps sprite to compensate texture packer rotation.
     *
     * @memberof PIXI.GroupD8
     * @param {PIXI.Matrix} matrix - sprite world matrix
     * @param {number} rotation - The rotation factor to use.
     * @param {number} tx - sprite anchoring
     * @param {number} ty - sprite anchoring
     */
    matrixAppendRotationInv: function matrixAppendRotationInv(matrix, rotation) {
      var tx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
      var ty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0

      // Packer used "rotation", we use "inv(rotation)"
      var mat = tempMatrices[GroupD8.inv(rotation)]

      mat.tx = tx
      mat.ty = ty
      matrix.append(mat)
    }
  }

  return GroupD8
})()

/**
 * The Rounded Rectangle object is an area that has nice rounded corners, as indicated by its
 * top-left corner point (x, y) and by its width and its height and its radius.
 *
 * @class
 * @memberof PIXI
 */
const RoundedRectangle = (() => {
  /**
   * @param {number} [x=0] - The X coordinate of the upper-left corner of the rounded rectangle
   * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param {number} [width=0] - The overall width of this rounded rectangle
   * @param {number} [height=0] - The overall height of this rounded rectangle
   * @param {number} [radius=20] - Controls the radius of the rounded corners
   */
  function RoundedRectangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0
    var radius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20

    class_call_check_(this, RoundedRectangle)

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

    /**
     * @member {number}
     * @default 0
     */
    this.width = width

    /**
     * @member {number}
     * @default 0
     */
    this.height = height

    /**
     * @member {number}
     * @default 20
     */
    this.radius = radius

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readonly
     * @default PIXI.SHAPES.RREC
     * @see PIXI.SHAPES
     */
    this.type = constants.SHAPES.RREC
  }

  /**
   * Creates a clone of this Rounded Rectangle
   *
   * @return {PIXI.RoundedRectangle} a copy of the rounded rectangle
   */
  RoundedRectangle.prototype.clone = function clone() {
    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius)
  }

  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Rounded Rectangle
   */
  RoundedRectangle.prototype.contains = function contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false
    }
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        if (y >= this.y + this.radius && y <= this.y + this.height - this.radius || x >= this.x + this.radius && x <= this.x + this.width - this.radius) {
          return true
        }
        var dx = x - (this.x + this.radius)
        var dy = y - (this.y + this.radius)
        var radius2 = this.radius * this.radius

        if (dx * dx + dy * dy <= radius2) {
          return true
        }
        dx = x - (this.x + this.width - this.radius)
        if (dx * dx + dy * dy <= radius2) {
          return true
        }
        dy = y - (this.y + this.height - this.radius)
        if (dx * dx + dy * dy <= radius2) {
          return true
        }
        dx = x - (this.x + this.radius)
        if (dx * dx + dy * dy <= radius2) {
          return true
        }
      }
    }

    return false
  }

  return RoundedRectangle
})()

/**
 * Rectangle object is an area defined by its position, as indicated by its top-left corner
 * point (x, y) and by its width and its height.
 *
 * @class
 * @memberof PIXI
 */
const Rectangle = (() => {
  /**
   * @param {number} [x=0] - The X coordinate of the upper-left corner of the rectangle
   * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rectangle
   * @param {number} [width=0] - The overall width of this rectangle
   * @param {number} [height=0] - The overall height of this rectangle
   */
  function Rectangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0

    class_call_check_(this, Rectangle)

    /**
     * @member {number}
     * @default 0
     */
    this.x = Number(x)

    /**
     * @member {number}
     * @default 0
     */
    this.y = Number(y)

    /**
     * @member {number}
     * @default 0
     */
    this.width = Number(width)

    /**
     * @member {number}
     * @default 0
     */
    this.height = Number(height)

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.RECT
     * @see PIXI.SHAPES
     */
    this.type = constants.SHAPES.RECT
  }

  /**
   * Creates a clone of this Rectangle
   *
   * @return {PIXI.Rectangle} a copy of the rectangle
   */
  Rectangle.prototype.clone = function clone() {
    return new Rectangle(this.x, this.y, this.width, this.height)
  }

  /**
   * Copies another rectangle to this one.
   *
   * @param {PIXI.Rectangle} rectangle - The rectangle to copy.
   * @return {PIXI.Rectangle} Returns itself.
   */
  Rectangle.prototype.copy = function copy(rectangle) {
    this.x = rectangle.x
    this.y = rectangle.y
    this.width = rectangle.width
    this.height = rectangle.height

    return this
  }

  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Rectangle
   */
  Rectangle.prototype.contains = function contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false
    }

    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true
      }
    }

    return false
  }

  /**
   * Pads the rectangle making it grow in all directions.
   *
   * @param {number} paddingX - The horizontal padding amount.
   * @param {number} [paddingY] - The vertical padding amount.
   */
  Rectangle.prototype.pad = function pad(paddingX, paddingY) {
    paddingX = paddingX || 0
    paddingY = paddingY || (paddingY !== 0 ? paddingX : 0)

    this.x -= paddingX
    this.y -= paddingY

    this.width += paddingX * 2
    this.height += paddingY * 2
  }

  /**
   * Fits this rectangle around the passed one.
   *
   * @param {PIXI.Rectangle} rectangle - The rectangle to fit.
   */
  Rectangle.prototype.fit = function fit(rectangle) {
    if (this.x < rectangle.x) {
      this.width += this.x
      if (this.width < 0) {
        this.width = 0
      }

      this.x = rectangle.x
    }

    if (this.y < rectangle.y) {
      this.height += this.y
      if (this.height < 0) {
        this.height = 0
      }
      this.y = rectangle.y
    }

    if (this.x + this.width > rectangle.x + rectangle.width) {
      this.width = rectangle.width - this.x
      if (this.width < 0) {
        this.width = 0
      }
    }

    if (this.y + this.height > rectangle.y + rectangle.height) {
      this.height = rectangle.height - this.y
      if (this.height < 0) {
        this.height = 0
      }
    }
  }

  /**
   * Enlarges this rectangle to include the passed rectangle.
   *
   * @param {PIXI.Rectangle} rectangle - The rectangle to include.
   */
  Rectangle.prototype.enlarge = function enlarge(rectangle) {
    var x1 = Math.min(this.x, rectangle.x)
    var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width)
    var y1 = Math.min(this.y, rectangle.y)
    var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height)

    this.x = x1
    this.width = x2 - x1
    this.y = y1
    this.height = y2 - y1
  }

  create_class_(Rectangle, [{
    key: 'left',
    get: function get() {
      return this.x
    }

    /**
     * returns the right edge of the rectangle
     *
     * @member {number}
     */

  }, {
    key: 'right',
    get: function get() {
      return this.x + this.width
    }

    /**
     * returns the top edge of the rectangle
     *
     * @member {number}
     */

  }, {
    key: 'top',
    get: function get() {
      return this.y
    }

    /**
     * returns the bottom edge of the rectangle
     *
     * @member {number}
     */

  }, {
    key: 'bottom',
    get: function get() {
      return this.y + this.height
    }

    /**
     * A constant empty rectangle.
     *
     * @static
     * @constant
     */

  }], [{
    key: 'EMPTY',
    get: function get() {
      return new Rectangle(0, 0, 0, 0)
    }
  }])

  return Rectangle
})()

/**
 * @class
 * @memberof PIXI
 */
const Polygon = (() => {
  /**
   * @param {PIXI.Point[]|number[]} points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new PIXI.Polygon(new PIXI.Point(), new PIXI.Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  function Polygon() {
    for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
      points[_key] = arguments[_key]
    }

    class_call_check_(this, Polygon)

    if (Array.isArray(points[0])) {
      points = points[0]
    }

    // if this is an array of points, convert it to a flat array of numbers
    if (points[0] instanceof Point) {
      var p = []

      for (var i = 0, il = points.length; i < il; i++) {
        p.push(points[i].x, points[i].y)
      }

      points = p
    }

    this.closed = true

    /**
     * An array of the points of this polygon
     *
     * @member {number[]}
     */
    this.points = points

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.POLY
     * @see PIXI.SHAPES
     */
    this.type = constants.SHAPES.POLY
  }

  /**
   * Creates a clone of this polygon
   *
   * @return {PIXI.Polygon} a copy of the polygon
   */
  Polygon.prototype.clone = function clone() {
    return new Polygon(this.points.slice())
  }

  /**
   * Closes the polygon, adding points if necessary.
   *
   */
  Polygon.prototype.close = function close() {
    var points = this.points

    // close the poly if the value is true!
    if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
      points.push(points[0], points[1])
    }
  }

  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this polygon
   */
  Polygon.prototype.contains = function contains(x, y) {
    var inside = false

    // use some raycasting to test hits
    // https://github.com/substack/point-in-polygon/blob/master/index.js
    var length = this.points.length / 2

    for (var i = 0, j = length - 1; i < length; j = i++) {
      var xi = this.points[i * 2]
      var yi = this.points[i * 2 + 1]
      var xj = this.points[j * 2]
      var yj = this.points[j * 2 + 1]
      var intersect = yi > y !== yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi

      if (intersect) {
        inside = !inside
      }
    }

    return inside
  }

  return Polygon
})()

/**
 * The Ellipse object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof PIXI
 */
const Ellipse = (() => {
  /**
   * @param {number} [x=0] - The X coordinate of the center of this circle
   * @param {number} [y=0] - The Y coordinate of the center of this circle
   * @param {number} [width=0] - The half width of this ellipse
   * @param {number} [height=0] - The half height of this ellipse
   */
  function Ellipse() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0

    class_call_check_(this, Ellipse)

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

    /**
     * @member {number}
     * @default 0
     */
    this.width = width

    /**
     * @member {number}
     * @default 0
     */
    this.height = height

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.ELIP
     * @see PIXI.SHAPES
     */
    this.type = constants.SHAPES.ELIP
  }

  /**
   * Creates a clone of this Ellipse instance
   *
   * @return {PIXI.Ellipse} a copy of the ellipse
   */


  Ellipse.prototype.clone = function clone() {
    return new Ellipse(this.x, this.y, this.width, this.height)
  }

  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coords are within this ellipse
   */


  Ellipse.prototype.contains = function contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false
    }

    // normalize the coords to an ellipse with center 0,0
    var normx = (x - this.x) / this.width
    var normy = (y - this.y) / this.height

    normx *= normx
    normy *= normy

    return normx + normy <= 1
  }

  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   *
   * @return {PIXI.Rectangle} the framing rectangle
   */


  Ellipse.prototype.getBounds = function getBounds() {
    return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height)
  }

  return Ellipse
})()

/**
 * The Circle object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof PIXI
 */
const Circle = (() => {
  /**
   * @param {number} [x=0] - The X coordinate of the center of this circle
   * @param {number} [y=0] - The Y coordinate of the center of this circle
   * @param {number} [radius=0] - The radius of the circle
   */
  function Circle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0

    class_call_check_(this, Circle)

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

    /**
     * @member {number}
     * @default 0
     */
    this.radius = radius

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.CIRC
     * @see PIXI.SHAPES
     */
    this.type = constants.SHAPES.CIRC
  }

  /**
   * Creates a clone of this Circle instance
   *
   * @return {PIXI.Circle} a copy of the Circle
   */


  Circle.prototype.clone = function clone() {
    return new Circle(this.x, this.y, this.radius)
  }

  /**
   * Checks whether the x and y coordinates given are contained within this circle
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Circle
   */


  Circle.prototype.contains = function contains(x, y) {
    if (this.radius <= 0) {
      return false
    }

    var r2 = this.radius * this.radius
    var dx = this.x - x
    var dy = this.y - y

    dx *= dx
    dy *= dy

    return dx + dy <= r2
  }

  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   *
   * @return {PIXI.Rectangle} the framing rectangle
   */


  Circle.prototype.getBounds = function getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
  }

  return Circle
})()

const extractAttributes = (() => {
  /**
   * Extracts the attributes
   * @class
   * @memberof PIXI.glCore.shader
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   * @param program {WebGLProgram} The shader program to get the attributes from
   * @return attributes {Object}
   */
  var extractAttributes = function (gl, program) {
    var attributes = {}

    var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)

    for (var i = 0; i < totalAttributes; i++) {
      var attribData = gl.getActiveAttrib(program, i)
      var type = mapType(gl, attribData.type)

      attributes[attribData.name] = {
        type: type,
        size: mapSize(type),
        location: gl.getAttribLocation(program, attribData.name),
        //TODO - make an attribute object
        pointer: pointer
      }
    }

    return attributes
  }

  var pointer = function (type, normalized, stride, start) {
    // console.log(this.location)
    gl.vertexAttribPointer(this.location, this.size, type || gl.FLOAT, normalized || false, stride || 0, start || 0)
  }

  return extractAttributes
})()

/**
 * Extracts the uniforms
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param program {WebGLProgram} The shader program to get the uniforms from
 * @return uniforms {Object}
 */
const extractUniforms = (gl, program) => {
  var uniforms = {}

  var totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)

  for (var i = 0; i < totalUniforms; i++) {
    var uniformData = gl.getActiveUniform(program, i)
    var name = uniformData.name.replace(/\[.*?\]/, "")
    var type = mapType(gl, uniformData.type)

    uniforms[name] = {
      type: type,
      size: uniformData.size,
      location: gl.getUniformLocation(program, name),
      value: defaultValue(type, uniformData.size)
    }
  }

  return uniforms
}

const path = (() => {
  const exports = {}
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

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i]
      if (last === '.') {
        parts.splice(i, 1)
      } else if (last === '..') {
        parts.splice(i, 1)
        up++
      } else if (up) {
        parts.splice(i, 1)
        up--
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..')
      }
    }

    return parts
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
  var splitPath = function (filename) {
    return splitPathRe.exec(filename).slice(1)
  }

  // path.resolve([from ...], to)
  // posix version
  exports.resolve = function () {
    var resolvedPath = '',
      resolvedAbsolute = false

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : _process.cwd()

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings')
      } else if (!path) {
        continue
      }

      resolvedPath = path + '/' + resolvedPath
      resolvedAbsolute = path.charAt(0) === '/'
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when _process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
      return !!p
    }), !resolvedAbsolute).join('/')

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.'
  }

  // path.normalize(path)
  // posix version
  exports.normalize = function (path) {
    var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/'

    // Normalize the path
    path = normalizeArray(filter(path.split('/'), function (p) {
      return !!p
    }), !isAbsolute).join('/')

    if (!path && !isAbsolute) {
      path = '.'
    }
    if (path && trailingSlash) {
      path += '/'
    }

    return (isAbsolute ? '/' : '') + path
  }

  // posix version
  exports.isAbsolute = function (path) {
    return path.charAt(0) === '/'
  }

  // posix version
  exports.join = function () {
    var paths = Array.prototype.slice.call(arguments, 0)
    return exports.normalize(filter(paths, function (p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings')
      }
      return p
    }).join('/'))
  }

  // path.relative(from, to)
  // posix version
  exports.relative = function (from, to) {
    from = exports.resolve(from).substr(1)
    to = exports.resolve(to).substr(1)

    function trim(arr) {
      var start = 0
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break
      }

      var end = arr.length - 1
      for (; end >= 0; end--) {
        if (arr[end] !== '') break
      }

      if (start > end) return []
      return arr.slice(start, end - start + 1)
    }

    var fromParts = trim(from.split('/'))
    var toParts = trim(to.split('/'))

    var length = Math.min(fromParts.length, toParts.length)
    var samePartsLength = length
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i
        break
      }
    }

    var outputParts = []
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..')
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength))

    return outputParts.join('/')
  }

  exports.sep = '/'
  exports.delimiter = ':'

  exports.dirname = function (path) {
    var result = splitPath(path),
      root = result[0],
      dir = result[1]

    if (!root && !dir) {
      // No dirname whatsoever
      return '.'
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1)
    }

    return root + dir
  }

  exports.basename = function (path, ext) {
    var f = splitPath(path)[2]
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length)
    }
    return f
  }

  exports.extname = function (path) {
    return splitPath(path)[3]
  }

  function filter(xs, f) {
    if (xs.filter) return xs.filter(f)
    var res = []
    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i], i, xs)) res.push(xs[i])
    }
    return res
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b' ?
    function (str, start, len) {
      return str.substr(start, len)
    } :
    function (str, start, len) {
      if (start < 0) start = str.length + start
      return str.substr(start, len)
    }

  return exports
})()

const GLShader = (() => {
  /**
   * Helper class to create a webGL Shader
   *
   * @class
   * @memberof PIXI.glCore
   * @param gl {WebGLRenderingContext}
   * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
   * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
   * @param precision {string} The float precision of the shader. Options are 'lowp', 'mediump' or 'highp'.
   * @param attributeLocations {object} A key value pair showing which location eact attribute should sit eg {position:0, uvs:1}
   */
  var Shader = function (gl, vertexSrc, fragmentSrc, precision, attributeLocations) {
    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    if (precision) {
      vertexSrc = setPrecision(vertexSrc, precision)
      fragmentSrc = setPrecision(fragmentSrc, precision)
    }

    /**
     * The shader program
     *
     * @member {WebGLProgram}
     */
    // First compile the program..
    this.program = compileProgram(gl, vertexSrc, fragmentSrc, attributeLocations)

    /**
     * The attributes of the shader as an object containing the following properties
     * {
     * 	type,
     * 	size,
     * 	location,
     * 	pointer
     * }
     * @member {Object}
     */
    // next extract the attributes
    this.attributes = extractAttributes(gl, this.program)

    this.uniformData = extractUniforms(gl, this.program)

    /**
     * The uniforms of the shader as an object containing the following properties
     * {
     * 	gl,
     * 	data
     * }
     * @member {Object}
     */
    this.uniforms = generateUniformAccessObject(gl, this.uniformData)
  }
  /**
   * Uses this shader
   * 
   * @return {PIXI.glCore.GLShader} Returns itself.
   */
  Shader.prototype.bind = function () {
    this.gl.useProgram(this.program)
    return this
  }

  /**
   * Destroys this shader
   * TODO
   */
  Shader.prototype.destroy = function () {
    this.attributes = null
    this.uniformData = null
    this.uniforms = null

    var gl = this.gl
    gl.deleteProgram(this.program)
  }

  return Shader
})()

const GLFrameBuffer = (() => {
  /**
   * Helper class to create a webGL Framebuffer
   *
   * @class
   * @memberof PIXI.glCore
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   * @param width {Number} the width of the drawing area of the frame buffer
   * @param height {Number} the height of the drawing area of the frame buffer
   */
  var Framebuffer = function (gl, width, height) {
    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    /**
     * The frame buffer
     *
     * @member {WebGLFramebuffer}
     */
    this.framebuffer = gl.createFramebuffer()

    /**
     * The stencil buffer
     *
     * @member {WebGLRenderbuffer}
     */
    this.stencil = null

    /**
     * The stencil buffer
     *
     * @member {PIXI.glCore.GLTexture}
     */
    this.texture = null

    /**
     * The width of the drawing area of the buffer
     *
     * @member {Number}
     */
    this.width = width || 100
    /**
     * The height of the drawing area of the buffer
     *
     * @member {Number}
     */
    this.height = height || 100
  }

  /**
   * Adds a texture to the frame buffer
   * @param texture {PIXI.glCore.GLTexture}
   */
  Framebuffer.prototype.enableTexture = function (texture) {
    var gl = this.gl

    this.texture = texture || new GLTexture(gl)

    this.texture.bind()

    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    this.bind()

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0)
  }

  /**
   * Initialises the stencil buffer
   */
  Framebuffer.prototype.enableStencil = function () {
    if (this.stencil) return

    var gl = this.gl

    this.stencil = gl.createRenderbuffer()

    gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil)

    // TODO.. this is depth AND stencil?
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencil)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height)


  }

  /**
   * Erases the drawing area and fills it with a colour
   * @param  r {Number} the red value of the clearing colour
   * @param  g {Number} the green value of the clearing colour
   * @param  b {Number} the blue value of the clearing colour
   * @param  a {Number} the alpha value of the clearing colour
   */
  Framebuffer.prototype.clear = function (r, g, b, a) {
    this.bind()

    var gl = this.gl

    gl.clearColor(r, g, b, a)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  /**
   * Binds the frame buffer to the WebGL context
   */
  Framebuffer.prototype.bind = function () {
    var gl = this.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer)
  }

  /**
   * Unbinds the frame buffer to the WebGL context
   */
  Framebuffer.prototype.unbind = function () {
    var gl = this.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }
  /**
   * Resizes the drawing area of the buffer to the given width and height
   * @param  width  {Number} the new width
   * @param  height {Number} the new height
   */
  Framebuffer.prototype.resize = function (width, height) {
    var gl = this.gl

    this.width = width
    this.height = height

    if (this.texture) {
      this.texture.uploadData(null, width, height)
    }

    if (this.stencil) {
      // update the stencil buffer width and height
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil)
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height)
    }
  }

  /**
   * Destroys this buffer
   */
  Framebuffer.prototype.destroy = function () {
    var gl = this.gl

    //TODO
    if (this.texture) {
      this.texture.destroy()
    }

    gl.deleteFramebuffer(this.framebuffer)

    this.gl = null

    this.stencil = null
    this.texture = null
  }

  /**
   * Creates a frame buffer with a texture containing the given data
   * @static
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   * @param width {Number} the width of the drawing area of the frame buffer
   * @param height {Number} the height of the drawing area of the frame buffer
   * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
   */
  Framebuffer.createRGBA = function (gl, width, height, data) {
    var texture = GLTexture.fromData(gl, null, width, height)
    texture.enableNearestScaling()
    texture.enableWrapClamp()

    //now create the framebuffer object and attach the texture to it.
    var fbo = new Framebuffer(gl, width, height)
    fbo.enableTexture(texture)
    //fbo.enableStencil(); // get this back on soon!

    //fbo.enableStencil(); // get this back on soon!

    fbo.unbind()

    return fbo
  }

  /**
   * Creates a frame buffer with a texture containing the given data
   * @static
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   * @param width {Number} the width of the drawing area of the frame buffer
   * @param height {Number} the height of the drawing area of the frame buffer
   * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
   */
  Framebuffer.createFloat32 = function (gl, width, height, data) {
    // create a new texture..
    var texture = new GLTexture.fromData(gl, data, width, height)
    texture.enableNearestScaling()
    texture.enableWrapClamp()

    //now create the framebuffer object and attach the texture to it.
    var fbo = new Framebuffer(gl, width, height)
    fbo.enableTexture(texture)

    fbo.unbind()

    return fbo
  }

  return Framebuffer
})()

const VertexArrayObject = (() => {

  /**
   * Helper class to work with WebGL VertexArrayObjects (vaos)
   * Only works if WebGL extensions are enabled (they usually are)
   *
   * @class
   * @memberof PIXI.glCore
   * @param gl {WebGLRenderingContext} The current WebGL rendering context
   */
  function VertexArrayObject(gl, state) {
    this.nativeVaoExtension = null

    if (!VertexArrayObject.FORCE_NATIVE) {
      this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') ||
        gl.getExtension('MOZ_OES_vertex_array_object') ||
        gl.getExtension('WEBKIT_OES_vertex_array_object')
    }

    this.nativeState = state

    if (this.nativeVaoExtension) {
      this.nativeVao = this.nativeVaoExtension.createVertexArrayOES()

      var maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)

      // VAO - overwrite the state..
      this.nativeState = {
        tempAttribState: new Array(maxAttribs),
        attribState: new Array(maxAttribs)
      }
    }

    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    /**
     * An array of attributes
     *
     * @member {Array}
     */
    this.attributes = []

    /**
     * @member {PIXI.glCore.GLBuffer}
     */
    this.indexBuffer = null

    /**
     * A boolean flag
     *
     * @member {Boolean}
     */
    this.dirty = false
  }

  /**
   * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
   * If you find on older devices that things have gone a bit weird then set this to true.
   */
  /**
   * Lets the VAO know if you should use the WebGL extension or the native methods.
   * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
   * If you find on older devices that things have gone a bit weird then set this to true.
   * @static
   * @property {Boolean} FORCE_NATIVE
   */
  VertexArrayObject.FORCE_NATIVE = false

  /**
   * Binds the buffer
   */
  VertexArrayObject.prototype.bind = function () {
    if (this.nativeVao) {
      this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao)

      if (this.dirty) {
        this.dirty = false
        this.activate()
        return this
      }
      if (this.indexBuffer) {
        this.indexBuffer.bind()
      }
    } else {
      this.activate()
    }

    return this
  }

  /**
   * Unbinds the buffer
   */
  VertexArrayObject.prototype.unbind = function () {
    if (this.nativeVao) {
      this.nativeVaoExtension.bindVertexArrayOES(null)
    }

    return this
  }

  /**
   * Uses this vao
   */
  VertexArrayObject.prototype.activate = function () {

    var gl = this.gl
    var lastBuffer = null

    for (var i = 0; i < this.attributes.length; i++) {
      var attrib = this.attributes[i]

      if (lastBuffer !== attrib.buffer) {
        attrib.buffer.bind()
        lastBuffer = attrib.buffer
      }

      gl.vertexAttribPointer(attrib.attribute.location,
        attrib.attribute.size,
        attrib.type || gl.FLOAT,
        attrib.normalized || false,
        attrib.stride || 0,
        attrib.start || 0)
    }

    setVertexAttribArrays(gl, this.attributes, this.nativeState)

    if (this.indexBuffer) {
      this.indexBuffer.bind()
    }

    return this
  }

  /**
   *
   * @param buffer     {PIXI.gl.GLBuffer}
   * @param attribute  {*}
   * @param type       {String}
   * @param normalized {Boolean}
   * @param stride     {Number}
   * @param start      {Number}
   */
  VertexArrayObject.prototype.addAttribute = function (buffer, attribute, type, normalized, stride, start) {
    this.attributes.push({
      buffer: buffer,
      attribute: attribute,

      location: attribute.location,
      type: type || this.gl.FLOAT,
      normalized: normalized || false,
      stride: stride || 0,
      start: start || 0
    })

    this.dirty = true

    return this
  }

  /**
   *
   * @param buffer   {PIXI.gl.GLBuffer}
   */
  VertexArrayObject.prototype.addIndex = function (buffer /*, options*/) {
    this.indexBuffer = buffer

    this.dirty = true

    return this
  }

  /**
   * Unbinds this vao and disables it
   */
  VertexArrayObject.prototype.clear = function () {
    // var gl = this.gl

    // TODO - should this function unbind after clear?
    // for now, no but lets see what happens in the real world!
    if (this.nativeVao) {
      this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao)
    }

    this.attributes.length = 0
    this.indexBuffer = null

    return this
  }

  /**
   * @param type  {Number}
   * @param size  {Number}
   * @param start {Number}
   */
  VertexArrayObject.prototype.draw = function (type, size, start) {
    var gl = this.gl

    if (this.indexBuffer) {
      gl.drawElements(type, size || this.indexBuffer.data.length, gl.UNSIGNED_SHORT, (start || 0) * 2)
    } else {
      // TODO need a better way to calculate size..
      gl.drawArrays(type, start, size || this.getSize())
    }

    return this
  }

  /**
   * Destroy this vao
   */
  VertexArrayObject.prototype.destroy = function () {
    // lose references
    this.gl = null
    this.indexBuffer = null
    this.attributes = null
    this.nativeState = null

    if (this.nativeVao) {
      this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao)
    }

    this.nativeVaoExtension = null
    this.nativeVao = null
  }

  VertexArrayObject.prototype.getSize = function () {
    var attrib = this.attributes[0]
    return attrib.buffer.data.length / ((attrib.stride / 4) || attrib.attribute.size)
  }

  VertexArrayObject.prototype.constructor = VertexArrayObject

  return VertexArrayObject
})()

const shader = {
  compileProgram,
  defaultValue,
  extractAttributes,
  extractUniforms,
  generateUniformAccessObject,
  setPrecision,
  mapSize,
  mapType
}

const GLCore = {
  createContext,
  setVertexAttribArrays,
  GLBuffer,
  GLFramebuffer: GLFrameBuffer,
  GLShader,
  GLTexture,
  VertexArrayObject,
  shader
}

const Resource = (() => {
  // tests is CORS is supported in XHR, if not we need to use XDR
  var useXdr = !!(window.XDomainRequest && !('withCredentials' in new XMLHttpRequest()))
  var tempAnchor = null

  // some status constants
  var STATUS_NONE = 0
  var STATUS_OK = 200
  var STATUS_EMPTY = 204
  var STATUS_IE_BUG_EMPTY = 1223
  var STATUS_TYPE_OK = 2

  // noop
  function _noop() { } /* empty */

  /**
   * Manages the state and loading of a resource and all child resources.
   *
   * @class
   */

  var Resource = function () {
    /**
     * Sets the load type to be used for a specific extension.
     *
     * @static
     * @param {string} extname - The extension to set the type for, e.g. "png" or "fnt"
     * @param {Resource.LOAD_TYPE} loadType - The load type to set it to.
     */
    Resource.setExtensionLoadType = function setExtensionLoadType(extname, loadType) {
      setExtMap(Resource._loadTypeMap, extname, loadType)
    }

    /**
     * Sets the load type to be used for a specific extension.
     *
     * @static
     * @param {string} extname - The extension to set the type for, e.g. "png" or "fnt"
     * @param {Resource.XHR_RESPONSE_TYPE} xhrType - The xhr type to set it to.
     */


    Resource.setExtensionXhrType = function setExtensionXhrType(extname, xhrType) {
      setExtMap(Resource._xhrTypeMap, extname, xhrType)
    }

    /**
     * @param {string} name - The name of the resource to load.
     * @param {string|string[]} url - The url for this resource, for audio/video loads you can pass
     *      an array of sources.
     * @param {object} [options] - The options for the load.
     * @param {string|boolean} [options.crossOrigin] - Is this request cross-origin? Default is to
     *      determine automatically.
     * @param {Resource.LOAD_TYPE} [options.loadType=Resource.LOAD_TYPE.XHR] - How should this resource
     *      be loaded?
     * @param {Resource.XHR_RESPONSE_TYPE} [options.xhrType=Resource.XHR_RESPONSE_TYPE.DEFAULT] - How
     *      should the data being loaded be interpreted when using XHR?
     * @param {object} [options.metadata] - Extra configuration for middleware and the Resource object.
     * @param {HTMLImageElement|HTMLAudioElement|HTMLVideoElement} [options.metadata.loadElement=null] - The
     *      element to use for loading, instead of creating one.
     * @param {boolean} [options.metadata.skipSource=false] - Skips adding source(s) to the load element. This
     *      is useful if you want to pass in a `loadElement` that you already added load sources to.
     * @param {string|string[]} [options.metadata.mimeType] - The mime type to use for the source element of a video/audio
     *      elment. If the urls are an array, you can pass this as an array as well where each index is the mime type to
     *      use for the corresponding url index.
     */


    function Resource(name, url, options) {
      class_call_check_(this, Resource)

      if (typeof name !== 'string' || typeof url !== 'string') {
        throw new Error('Both name and url are required for constructing a resource.')
      }

      options = options || {}

      /**
       * The state flags of this resource.
       *
       * @member {number}
       */
      this._flags = 0

      // set data url flag, needs to be set early for some _determineX checks to work.
      this._setFlag(Resource.STATUS_FLAGS.DATA_URL, url.indexOf('data:') === 0)

      /**
       * The name of this resource.
       *
       * @member {string}
       * @readonly
       */
      this.name = name

      /**
       * The url used to load this resource.
       *
       * @member {string}
       * @readonly
       */
      this.url = url

      /**
       * The extension used to load this resource.
       *
       * @member {string}
       * @readonly
       */
      this.extension = this._getExtension()

      /**
       * The data that was loaded by the resource.
       *
       * @member {any}
       */
      this.data = null

      /**
       * Is this request cross-origin? If unset, determined automatically.
       *
       * @member {string}
       */
      this.crossOrigin = options.crossOrigin === true ? 'anonymous' : options.crossOrigin

      /**
       * The method of loading to use for this resource.
       *
       * @member {Resource.LOAD_TYPE}
       */
      this.loadType = options.loadType || this._determineLoadType()

      /**
       * The type used to load the resource via XHR. If unset, determined automatically.
       *
       * @member {string}
       */
      this.xhrType = options.xhrType

      /**
       * Extra info for middleware, and controlling specifics about how the resource loads.
       *
       * Note that if you pass in a `loadElement`, the Resource class takes ownership of it.
       * Meaning it will modify it as it sees fit.
       *
       * @member {object}
       * @property {HTMLImageElement|HTMLAudioElement|HTMLVideoElement} [loadElement=null] - The
       *  element to use for loading, instead of creating one.
       * @property {boolean} [skipSource=false] - Skips adding source(s) to the load element. This
       *  is useful if you want to pass in a `loadElement` that you already added load sources
       *  to.
       */
      this.metadata = options.metadata || {}

      /**
       * The error that occurred while loading (if any).
       *
       * @member {Error}
       * @readonly
       */
      this.error = null

      /**
       * The XHR object that was used to load this resource. This is only set
       * when `loadType` is `Resource.LOAD_TYPE.XHR`.
       *
       * @member {XMLHttpRequest}
       * @readonly
       */
      this.xhr = null

      /**
       * The child resources this resource owns.
       *
       * @member {Resource[]}
       * @readonly
       */
      this.children = []

      /**
       * The resource type.
       *
       * @member {Resource.TYPE}
       * @readonly
       */
      this.type = Resource.TYPE.UNKNOWN

      /**
       * The progress chunk owned by this resource.
       *
       * @member {number}
       * @readonly
       */
      this.progressChunk = 0

      /**
       * The `dequeue` method that will be used a storage place for the async queue dequeue method
       * used privately by the loader.
       *
       * @private
       * @member {function}
       */
      this._dequeue = _noop

      /**
       * Used a storage place for the on load binding used privately by the loader.
       *
       * @private
       * @member {function}
       */
      this._onLoadBinding = null

      /**
       * The `complete` function bound to this resource's context.
       *
       * @private
       * @member {function}
       */
      this._boundComplete = this.complete.bind(this)

      /**
       * The `_onError` function bound to this resource's context.
       *
       * @private
       * @member {function}
       */
      this._boundOnError = this._onError.bind(this)

      /**
       * The `_onProgress` function bound to this resource's context.
       *
       * @private
       * @member {function}
       */
      this._boundOnProgress = this._onProgress.bind(this)

      // xhr callbacks
      this._boundXhrOnError = this._xhrOnError.bind(this)
      this._boundXhrOnAbort = this._xhrOnAbort.bind(this)
      this._boundXhrOnLoad = this._xhrOnLoad.bind(this)
      this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this)

      /**
       * Dispatched when the resource beings to load.
       *
       * The callback looks like {@link Resource.OnStartSignal}.
       *
       * @member {Signal}
       */
      this.onStart = new MiniSignal()

      /**
       * Dispatched each time progress of this resource load updates.
       * Not all resources types and loader systems can support this event
       * so sometimes it may not be available. If the resource
       * is being loaded on a modern browser, using XHR, and the remote server
       * properly sets Content-Length headers, then this will be available.
       *
       * The callback looks like {@link Resource.OnProgressSignal}.
       *
       * @member {Signal}
       */
      this.onProgress = new MiniSignal()

      /**
       * Dispatched once this resource has loaded, if there was an error it will
       * be in the `error` property.
       *
       * The callback looks like {@link Resource.OnCompleteSignal}.
       *
       * @member {Signal}
       */
      this.onComplete = new MiniSignal()

      /**
       * Dispatched after this resource has had all the *after* middleware run on it.
       *
       * The callback looks like {@link Resource.OnCompleteSignal}.
       *
       * @member {Signal}
       */
      this.onAfterMiddleware = new MiniSignal()

      /**
       * When the resource starts to load.
       *
       * @memberof Resource
       * @callback OnStartSignal
       * @param {Resource} resource - The resource that the event happened on.
       */

      /**
       * When the resource reports loading progress.
       *
       * @memberof Resource
       * @callback OnProgressSignal
       * @param {Resource} resource - The resource that the event happened on.
       * @param {number} percentage - The progress of the load in the range [0, 1].
       */

      /**
       * When the resource finishes loading.
       *
       * @memberof Resource
       * @callback OnCompleteSignal
       * @param {Resource} resource - The resource that the event happened on.
       */
    }

    /**
     * Stores whether or not this url is a data url.
     *
     * @member {boolean}
     * @readonly
     */


    /**
     * Marks the resource as complete.
     *
     */
    Resource.prototype.complete = function complete() {
      // TODO: Clean this up in a wrapper or something...gross....
      if (this.data && this.data.removeEventListener) {
        this.data.removeEventListener('error', this._boundOnError, false)
        this.data.removeEventListener('load', this._boundComplete, false)
        this.data.removeEventListener('progress', this._boundOnProgress, false)
        this.data.removeEventListener('canplaythrough', this._boundComplete, false)
      }

      if (this.xhr) {
        if (this.xhr.removeEventListener) {
          this.xhr.removeEventListener('error', this._boundXhrOnError, false)
          this.xhr.removeEventListener('abort', this._boundXhrOnAbort, false)
          this.xhr.removeEventListener('progress', this._boundOnProgress, false)
          this.xhr.removeEventListener('load', this._boundXhrOnLoad, false)
        } else {
          this.xhr.onerror = null
          this.xhr.ontimeout = null
          this.xhr.onprogress = null
          this.xhr.onload = null
        }
      }

      if (this.isComplete) {
        throw new Error('Complete called again for an already completed resource.')
      }

      this._setFlag(Resource.STATUS_FLAGS.COMPLETE, true)
      this._setFlag(Resource.STATUS_FLAGS.LOADING, false)

      this.onComplete.dispatch(this)
    }

    /**
     * Aborts the loading of this resource, with an optional message.
     *
     * @param {string} message - The message to use for the error
     */


    Resource.prototype.abort = function abort(message) {
      // abort can be called multiple times, ignore subsequent calls.
      if (this.error) {
        return
      }

      // store error
      this.error = new Error(message)

      // abort the actual loading
      if (this.xhr) {
        this.xhr.abort()
      } else if (this.xdr) {
        this.xdr.abort()
      } else if (this.data) {
        // single source
        if (this.data.src) {
          this.data.src = Resource.EMPTY_GIF
        }
        // multi-source
        else {
          while (this.data.firstChild) {
            this.data.removeChild(this.data.firstChild)
          }
        }
      }

      // done now.
      this.complete()
    }

    /**
     * Kicks off loading of this resource. This method is asynchronous.
     *
     * @param {function} [cb] - Optional callback to call once the resource is loaded.
     */


    Resource.prototype.load = function load(cb) {
      var _this = this

      if (this.isLoading) {
        return
      }

      if (this.isComplete) {
        if (cb) {
          setTimeout(function () {
            return cb(_this)
          }, 1)
        }

        return
      } else if (cb) {
        this.onComplete.once(cb)
      }

      this._setFlag(Resource.STATUS_FLAGS.LOADING, true)

      this.onStart.dispatch(this)

      // if unset, determine the value
      if (this.crossOrigin === false || typeof this.crossOrigin !== 'string') {
        this.crossOrigin = this._determineCrossOrigin(this.url)
      }

      switch (this.loadType) {
        case Resource.LOAD_TYPE.IMAGE:
          this.type = Resource.TYPE.IMAGE
          this._loadElement('image')
          break

        case Resource.LOAD_TYPE.AUDIO:
          this.type = Resource.TYPE.AUDIO
          this._loadSourceElement('audio')
          break

        case Resource.LOAD_TYPE.VIDEO:
          this.type = Resource.TYPE.VIDEO
          this._loadSourceElement('video')
          break

        case Resource.LOAD_TYPE.XHR:
        /* falls through */
        default:
          if (useXdr && this.crossOrigin) {
            this._loadXdr()
          } else {
            this._loadXhr()
          }
          break
      }
    }

    /**
     * Checks if the flag is set.
     *
     * @private
     * @param {number} flag - The flag to check.
     * @return {boolean} True if the flag is set.
     */


    Resource.prototype._hasFlag = function _hasFlag(flag) {
      return !!(this._flags & flag)
    }

    /**
     * (Un)Sets the flag.
     *
     * @private
     * @param {number} flag - The flag to (un)set.
     * @param {boolean} value - Whether to set or (un)set the flag.
     */


    Resource.prototype._setFlag = function _setFlag(flag, value) {
      this._flags = value ? this._flags | flag : this._flags & ~flag
    }

    /**
     * Loads this resources using an element that has a single source,
     * like an HTMLImageElement.
     *
     * @private
     * @param {string} type - The type of element to use.
     */


    Resource.prototype._loadElement = function _loadElement(type) {
      if (this.metadata.loadElement) {
        this.data = this.metadata.loadElement
      } else if (type === 'image' && typeof window.Image !== 'undefined') {
        this.data = new Image()
      } else {
        this.data = document.createElement(type)
      }

      if (this.crossOrigin) {
        this.data.crossOrigin = this.crossOrigin
      }

      if (!this.metadata.skipSource) {
        this.data.src = this.url
      }

      this.data.addEventListener('error', this._boundOnError, false)
      this.data.addEventListener('load', this._boundComplete, false)
      this.data.addEventListener('progress', this._boundOnProgress, false)
    }

    /**
     * Loads this resources using an element that has multiple sources,
     * like an HTMLAudioElement or HTMLVideoElement.
     *
     * @private
     * @param {string} type - The type of element to use.
     */


    Resource.prototype._loadSourceElement = function _loadSourceElement(type) {
      if (this.metadata.loadElement) {
        this.data = this.metadata.loadElement
      } else if (type === 'audio' && typeof window.Audio !== 'undefined') {
        this.data = new Audio()
      } else {
        this.data = document.createElement(type)
      }

      if (this.data === null) {
        this.abort('Unsupported element: ' + type)

        return
      }

      if (!this.metadata.skipSource) {
        // support for CocoonJS Canvas+ runtime, lacks document.createElement('source')
        if (navigator.isCocoonJS) {
          this.data.src = Array.isArray(this.url) ? this.url[0] : this.url
        } else if (Array.isArray(this.url)) {
          var mimeTypes = this.metadata.mimeType

          for (var i = 0; i < this.url.length; ++i) {
            this.data.appendChild(this._createSource(type, this.url[i], Array.isArray(mimeTypes) ? mimeTypes[i] : mimeTypes))
          }
        } else {
          var _mimeTypes = this.metadata.mimeType

          this.data.appendChild(this._createSource(type, this.url, Array.isArray(_mimeTypes) ? _mimeTypes[0] : _mimeTypes))
        }
      }

      this.data.addEventListener('error', this._boundOnError, false)
      this.data.addEventListener('load', this._boundComplete, false)
      this.data.addEventListener('progress', this._boundOnProgress, false)
      this.data.addEventListener('canplaythrough', this._boundComplete, false)

      this.data.load()
    }

    /**
     * Loads this resources using an XMLHttpRequest.
     *
     * @private
     */


    Resource.prototype._loadXhr = function _loadXhr() {
      // if unset, determine the value
      if (typeof this.xhrType !== 'string') {
        this.xhrType = this._determineXhrType()
      }

      var xhr = this.xhr = new XMLHttpRequest()

      // set the request type and url
      xhr.open('GET', this.url, true)

      // load json as text and parse it ourselves. We do this because some browsers
      // *cough* safari *cough* can't deal with it.
      if (this.xhrType === Resource.XHR_RESPONSE_TYPE.JSON || this.xhrType === Resource.XHR_RESPONSE_TYPE.DOCUMENT) {
        xhr.responseType = Resource.XHR_RESPONSE_TYPE.TEXT
      } else {
        xhr.responseType = this.xhrType
      }

      xhr.onerror = this._boundXhrOnError
      xhr.onabort = this._boundXhrOnAbort
      xhr.onprogress = this._boundOnProgress
      xhr.onload = this._boundXhrOnLoad

      xhr.send()
    }

    /**
     * Loads this resources using an XDomainRequest. This is here because we need to support IE9 (gross).
     *
     * @private
     */
    Resource.prototype._loadXdr = function _loadXdr() {
      // if unset, determine the value
      if (typeof this.xhrType !== 'string') {
        this.xhrType = this._determineXhrType()
      }

      var xdr = this.xhr = new XDomainRequest()

      // XDomainRequest has a few quirks. Occasionally it will abort requests
      // A way to avoid this is to make sure ALL callbacks are set even if not used
      // More info here: http://stackoverflow.com/questions/15786966/xdomainrequest-aborts-post-on-ie-9
      xdr.timeout = 5000

      xdr.onerror = this._boundXhrOnError
      xdr.ontimeout = this._boundXdrOnTimeout
      xdr.onprogress = this._boundOnProgress
      xdr.onload = this._boundXhrOnLoad

      xdr.open('GET', this.url, true)

      // Note: The xdr.send() call is wrapped in a timeout to prevent an
      // issue with the interface where some requests are lost if multiple
      // XDomainRequests are being sent at the same time.
      // Some info here: https://github.com/photonstorm/phaser/issues/1248
      setTimeout(function () {
        return xdr.send()
      }, 1)
    }

    /**
     * Creates a source used in loading via an element.
     *
     * @private
     * @param {string} type - The element type (video or audio).
     * @param {string} url - The source URL to load from.
     * @param {string} [mime] - The mime type of the video
     * @return {HTMLSourceElement} The source element.
     */
    Resource.prototype._createSource = function _createSource(type, url, mime) {
      if (!mime) {
        mime = type + '/' + this._getExtension(url)
      }

      var source = document.createElement('source')

      source.src = url
      source.type = mime

      return source
    }

    /**
     * Called if a load errors out.
     *
     * @param {Event} event - The error event from the element that emits it.
     * @private
     */
    Resource.prototype._onError = function _onError(event) {
      this.abort('Failed to load element using: ' + event.target.nodeName)
    }

    /**
     * Called if a load progress event fires for xhr/xdr.
     *
     * @private
     * @param {XMLHttpRequestProgressEvent|Event} event - Progress event.
     */
    Resource.prototype._onProgress = function _onProgress(event) {
      if (event && event.lengthComputable) {
        this.onProgress.dispatch(this, event.loaded / event.total)
      }
    }

    /**
     * Called if an error event fires for xhr/xdr.
     *
     * @private
     * @param {XMLHttpRequestErrorEvent|Event} event - Error event.
     */
    Resource.prototype._xhrOnError = function _xhrOnError() {
      var xhr = this.xhr

      this.abort(reqType(xhr) + ' Request failed. Status: ' + xhr.status + ', text: "' + xhr.statusText + '"')
    }

    /**
     * Called if an abort event fires for xhr.
     *
     * @private
     * @param {XMLHttpRequestAbortEvent} event - Abort Event
     */
    Resource.prototype._xhrOnAbort = function _xhrOnAbort() {
      this.abort(reqType(this.xhr) + ' Request was aborted by the user.')
    }

    /**
     * Called if a timeout event fires for xdr.
     *
     * @private
     * @param {Event} event - Timeout event.
     */
    Resource.prototype._xdrOnTimeout = function _xdrOnTimeout() {
      this.abort(reqType(this.xhr) + ' Request timed out.')
    }

    /**
     * Called when data successfully loads from an xhr/xdr request.
     *
     * @private
     * @param {XMLHttpRequestLoadEvent|Event} event - Load event
     */
    Resource.prototype._xhrOnLoad = function _xhrOnLoad() {
      var xhr = this.xhr
      var text = ''
      var status = typeof xhr.status === 'undefined' ? STATUS_OK : xhr.status; // XDR has no `.status`, assume 200.

      // responseText is accessible only if responseType is '' or 'text' and on older browsers
      if (xhr.responseType === '' || xhr.responseType === 'text' || typeof xhr.responseType === 'undefined') {
        text = xhr.responseText
      }

      // status can be 0 when using the `file://` protocol so we also check if a response is set.
      // If it has a response, we assume 200; otherwise a 0 status code with no contents is an aborted request.
      if (status === STATUS_NONE && (text.length > 0 || xhr.responseType === Resource.XHR_RESPONSE_TYPE.BUFFER)) {
        status = STATUS_OK
      }
      // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
      else if (status === STATUS_IE_BUG_EMPTY) {
        status = STATUS_EMPTY
      }

      var statusType = status / 100 | 0

      if (statusType === STATUS_TYPE_OK) {
        // if text, just return it
        if (this.xhrType === Resource.XHR_RESPONSE_TYPE.TEXT) {
          this.data = text
          this.type = Resource.TYPE.TEXT
        }
        // if json, parse into json object
        else if (this.xhrType === Resource.XHR_RESPONSE_TYPE.JSON) {
          try {
            this.data = JSON.parse(text)
            this.type = Resource.TYPE.JSON
          } catch (e) {
            this.abort('Error trying to parse loaded json: ' + e)

            return
          }
        }
        // if xml, parse into an xml document or div element
        else if (this.xhrType === Resource.XHR_RESPONSE_TYPE.DOCUMENT) {
          try {
            if (window.DOMParser) {
              var domparser = new DOMParser()

              this.data = domparser.parseFromString(text, 'text/xml')
            } else {
              var div = document.createElement('div')

              div.innerHTML = text

              this.data = div
            }

            this.type = Resource.TYPE.XML
          } catch (e) {
            this.abort('Error trying to parse loaded xml: ' + e)

            return
          }
        }
        // other types just return the response
        else {
          this.data = xhr.response || text
        }
      } else {
        this.abort('[' + xhr.status + '] ' + xhr.statusText + ': ' + xhr.responseURL)

        return
      }

      this.complete()
    }

    /**
     * Sets the `crossOrigin` property for this resource based on if the url
     * for this resource is cross-origin. If crossOrigin was manually set, this
     * function does nothing.
     *
     * @private
     * @param {string} url - The url to test.
     * @param {object} [loc=window.location] - The location object to test against.
     * @return {string} The crossOrigin value to use (or empty string for none).
     */
    Resource.prototype._determineCrossOrigin = function _determineCrossOrigin(url, loc) {
      // data: and javascript: urls are considered same-origin
      if (url.indexOf('data:') === 0) {
        return ''
      }

      // default is window.location
      loc = loc || window.location

      if (!tempAnchor) {
        tempAnchor = document.createElement('a')
      }

      // let the browser determine the full href for the url of this resource and then
      // parse with the node url lib, we can't use the properties of the anchor element
      // because they don't work in IE9 :(
      tempAnchor.href = url
      url = (0, parseURI)(tempAnchor.href, {
        strictMode: true
      })

      var samePort = !url.port && loc.port === '' || url.port === loc.port
      var protocol = url.protocol ? url.protocol + ':' : ''

      // if cross origin
      if (url.host !== loc.hostname || !samePort || protocol !== loc.protocol) {
        return 'anonymous'
      }

      return ''
    }

    /**
     * Determines the responseType of an XHR request based on the extension of the
     * resource being loaded.
     *
     * @private
     * @return {Resource.XHR_RESPONSE_TYPE} The responseType to use.
     */


    Resource.prototype._determineXhrType = function _determineXhrType() {
      return Resource._xhrTypeMap[this.extension] || Resource.XHR_RESPONSE_TYPE.TEXT
    }

    /**
     * Determines the loadType of a resource based on the extension of the
     * resource being loaded.
     *
     * @private
     * @return {Resource.LOAD_TYPE} The loadType to use.
     */


    Resource.prototype._determineLoadType = function _determineLoadType() {
      return Resource._loadTypeMap[this.extension] || Resource.LOAD_TYPE.XHR
    }

    /**
     * Extracts the extension (sans '.') of the file being loaded by the resource.
     *
     * @private
     * @return {string} The extension.
     */


    Resource.prototype._getExtension = function _getExtension() {
      var url = this.url
      var ext = ''

      if (this.isDataUrl) {
        var slashIndex = url.indexOf('/')

        ext = url.substring(slashIndex + 1, url.indexOf(';', slashIndex))
      } else {
        var queryStart = url.indexOf('?')
        var hashStart = url.indexOf('#')
        var index = Math.min(queryStart > -1 ? queryStart : url.length, hashStart > -1 ? hashStart : url.length)

        url = url.substring(0, index)
        ext = url.substring(url.lastIndexOf('.') + 1)
      }

      return ext.toLowerCase()
    }

    /**
     * Determines the mime type of an XHR request based on the responseType of
     * resource being loaded.
     *
     * @private
     * @param {Resource.XHR_RESPONSE_TYPE} type - The type to get a mime type for.
     * @return {string} The mime type to use.
     */


    Resource.prototype._getMimeFromXhrType = function _getMimeFromXhrType(type) {
      switch (type) {
        case Resource.XHR_RESPONSE_TYPE.BUFFER:
          return 'application/octet-binary'

        case Resource.XHR_RESPONSE_TYPE.BLOB:
          return 'application/blob'

        case Resource.XHR_RESPONSE_TYPE.DOCUMENT:
          return 'application/xml'

        case Resource.XHR_RESPONSE_TYPE.JSON:
          return 'application/json'

        case Resource.XHR_RESPONSE_TYPE.DEFAULT:
        case Resource.XHR_RESPONSE_TYPE.TEXT:
        /* falls through */
        default:
          return 'text/plain'

      }
    }

    create_class_(Resource, [{
      key: 'isDataUrl',
      get: function get() {
        return this._hasFlag(Resource.STATUS_FLAGS.DATA_URL)
      }

      /**
       * Describes if this resource has finished loading. Is true when the resource has completely
       * loaded.
       *
       * @member {boolean}
       * @readonly
       */

    }, {
      key: 'isComplete',
      get: function get() {
        return this._hasFlag(Resource.STATUS_FLAGS.COMPLETE)
      }

      /**
       * Describes if this resource is currently loading. Is true when the resource starts loading,
       * and is false again when complete.
       *
       * @member {boolean}
       * @readonly
       */

    }, {
      key: 'isLoading',
      get: function get() {
        return this._hasFlag(Resource.STATUS_FLAGS.LOADING)
      }
    }])

    return Resource
  }()

  /**
   * The types of resources a resource could represent.
   *
   * @static
   * @readonly
   * @enum {number}
   */

  Resource.STATUS_FLAGS = {
    NONE: 0,
    DATA_URL: 1 << 0,
    COMPLETE: 1 << 1,
    LOADING: 1 << 2
  }

  /**
   * The types of resources a resource could represent.
   *
   * @static
   * @readonly
   * @enum {number}
   */
  Resource.TYPE = {
    UNKNOWN: 0,
    JSON: 1,
    XML: 2,
    IMAGE: 3,
    AUDIO: 4,
    VIDEO: 5,
    TEXT: 6
  }

  /**
   * The types of loading a resource can use.
   *
   * @static
   * @readonly
   * @enum {number}
   */
  Resource.LOAD_TYPE = {
    /** Uses XMLHttpRequest to load the resource. */
    XHR: 1,
    /** Uses an `Image` object to load the resource. */
    IMAGE: 2,
    /** Uses an `Audio` object to load the resource. */
    AUDIO: 3,
    /** Uses a `Video` object to load the resource. */
    VIDEO: 4
  }

  /**
   * The XHR ready states, used internally.
   *
   * @static
   * @readonly
   * @enum {string}
   */
  Resource.XHR_RESPONSE_TYPE = {
    /** string */
    DEFAULT: 'text',
    /** ArrayBuffer */
    BUFFER: 'arraybuffer',
    /** Blob */
    BLOB: 'blob',
    /** Document */
    DOCUMENT: 'document',
    /** Object */
    JSON: 'json',
    /** String */
    TEXT: 'text'
  }

  Resource._loadTypeMap = {
    // images
    gif: Resource.LOAD_TYPE.IMAGE,
    png: Resource.LOAD_TYPE.IMAGE,
    bmp: Resource.LOAD_TYPE.IMAGE,
    jpg: Resource.LOAD_TYPE.IMAGE,
    jpeg: Resource.LOAD_TYPE.IMAGE,
    tif: Resource.LOAD_TYPE.IMAGE,
    tiff: Resource.LOAD_TYPE.IMAGE,
    webp: Resource.LOAD_TYPE.IMAGE,
    tga: Resource.LOAD_TYPE.IMAGE,
    svg: Resource.LOAD_TYPE.IMAGE,
    'svg+xml': Resource.LOAD_TYPE.IMAGE, // for SVG data urls

    // audio
    mp3: Resource.LOAD_TYPE.AUDIO,
    ogg: Resource.LOAD_TYPE.AUDIO,
    wav: Resource.LOAD_TYPE.AUDIO,

    // videos
    mp4: Resource.LOAD_TYPE.VIDEO,
    webm: Resource.LOAD_TYPE.VIDEO
  }

  Resource._xhrTypeMap = {
    // xml
    xhtml: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
    html: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
    htm: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
    xml: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
    tmx: Resource.XHR_RESPONSE_TYPE.DOCUMENT,
    svg: Resource.XHR_RESPONSE_TYPE.DOCUMENT,

    // This was added to handle Tiled Tileset XML, but .tsx is also a TypeScript React Component.
    // Since it is way less likely for people to be loading TypeScript files instead of Tiled files,
    // this should probably be fine.
    tsx: Resource.XHR_RESPONSE_TYPE.DOCUMENT,

    // images
    gif: Resource.XHR_RESPONSE_TYPE.BLOB,
    png: Resource.XHR_RESPONSE_TYPE.BLOB,
    bmp: Resource.XHR_RESPONSE_TYPE.BLOB,
    jpg: Resource.XHR_RESPONSE_TYPE.BLOB,
    jpeg: Resource.XHR_RESPONSE_TYPE.BLOB,
    tif: Resource.XHR_RESPONSE_TYPE.BLOB,
    tiff: Resource.XHR_RESPONSE_TYPE.BLOB,
    webp: Resource.XHR_RESPONSE_TYPE.BLOB,
    tga: Resource.XHR_RESPONSE_TYPE.BLOB,

    // json
    json: Resource.XHR_RESPONSE_TYPE.JSON,

    // text
    text: Resource.XHR_RESPONSE_TYPE.TEXT,
    txt: Resource.XHR_RESPONSE_TYPE.TEXT,

    // fonts
    ttf: Resource.XHR_RESPONSE_TYPE.BUFFER,
    otf: Resource.XHR_RESPONSE_TYPE.BUFFER
  }

  // We can't set the `src` attribute to empty string, so on abort we set it to this 1px transparent gif
  Resource.EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

  /**
   * Quick helper to set a value on one of the extension maps. Ensures there is no
   * dot at the start of the extension.
   *
   * @ignore
   * @param {object} map - The map to set on.
   * @param {string} extname - The extension (or key) to set.
   * @param {number} val - The value to set.
   */
  function setExtMap(map, extname, val) {
    if (extname && extname.indexOf('.') === 0) {
      extname = extname.substring(1)
    }

    if (!extname) {
      return
    }

    map[extname] = val
  }

  /**
   * Quick helper to get string xhr type.
   *
   * @ignore
   * @param {XMLHttpRequest|XDomainRequest} xhr - The request to check.
   * @return {string} The type.
   */
  function reqType(xhr) {
    return xhr.toString().replace('object ', '')
  }

  return Resource
})()

/**
 * Manages the state and loading of multiple resources to load.
 *
 * @class
 */
var Loader = (() => {
  // some constants
  var MAX_PROGRESS = 100
  var rgxExtractUrlHash = /(#[\w-]+)?$/

  /**
   * @param {string} [baseUrl=''] - The base url for all resources loaded by this loader.
   * @param {number} [concurrency=10] - The number of resources to load concurrently.
   */
  function Loader() {
    var _this = this

    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''
    var concurrency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10

    class_call_check_(this, Loader)

    /**
     * The base url for all resources loaded by this loader.
     *
     * @member {string}
     */
    this.baseUrl = baseUrl

    /**
     * The progress percent of the loader going through the queue.
     *
     * @member {number}
     */
    this.progress = 0

    /**
     * Loading state of the loader, true if it is currently loading resources.
     *
     * @member {boolean}
     */
    this.loading = false

    /**
     * A querystring to append to every URL added to the loader.
     *
     * This should be a valid query string *without* the question-mark (`?`). The loader will
     * also *not* escape values for you. Make sure to escape your parameters with
     * [`encodeURIComponent`](https://mdn.io/encodeURIComponent) before assigning this property.
     *
     * @example
     * const loader = new Loader()
     *
     * loader.defaultQueryString = 'user=me&password=secret'
     *
     * // This will request 'image.png?user=me&password=secret'
     * loader.add('image.png').load()
     *
     * loader.reset()
     *
     * // This will request 'image.png?v=1&user=me&password=secret'
     * loader.add('iamge.png?v=1').load()
     */
    this.defaultQueryString = ''

    /**
     * The middleware to run before loading each resource.
     *
     * @member {function[]}
     */
    this._beforeMiddleware = []

    /**
     * The middleware to run after loading each resource.
     *
     * @member {function[]}
     */
    this._afterMiddleware = []

    /**
     * The tracks the resources we are currently completing parsing for.
     *
     * @member {Resource[]}
     */
    this._resourcesParsing = []

    /**
     * The `_loadResource` function bound with this object context.
     *
     * @private
     * @member {function}
     * @param {Resource} r - The resource to load
     * @param {Function} d - The dequeue function
     * @return {undefined}
     */
    this._boundLoadResource = function (r, d) {
      return _this._loadResource(r, d)
    }

    /**
     * The resources waiting to be loaded.
     *
     * @private
     * @member {Resource[]}
     */
    this._queue = async_lib.queue(this._boundLoadResource, concurrency)

    this._queue.pause()

    /**
     * All the resources for this loader keyed by name.
     *
     * @member {object<string, Resource>}
     */
    this.resources = {}

    /**
     * Dispatched once per loaded or errored resource.
     *
     * The callback looks like {@link Loader.OnProgressSignal}.
     *
     * @member {Signal}
     */
    this.onProgress = new MiniSignal()

    /**
     * Dispatched once per errored resource.
     *
     * The callback looks like {@link Loader.OnErrorSignal}.
     *
     * @member {Signal}
     */
    this.onError = new MiniSignal()

    /**
     * Dispatched once per loaded resource.
     *
     * The callback looks like {@link Loader.OnLoadSignal}.
     *
     * @member {Signal}
     */
    this.onLoad = new MiniSignal()

    /**
     * Dispatched when the loader begins to process the queue.
     *
     * The callback looks like {@link Loader.OnStartSignal}.
     *
     * @member {Signal}
     */
    this.onStart = new MiniSignal()

    /**
     * Dispatched when the queued resources all load.
     *
     * The callback looks like {@link Loader.OnCompleteSignal}.
     *
     * @member {Signal}
     */
    this.onComplete = new MiniSignal()

    /**
     * When the progress changes the loader and resource are disaptched.
     *
     * @memberof Loader
     * @callback OnProgressSignal
     * @param {Loader} loader - The loader the progress is advancing on.
     * @param {Resource} resource - The resource that has completed or failed to cause the progress to advance.
     */

    /**
     * When an error occurrs the loader and resource are disaptched.
     *
     * @memberof Loader
     * @callback OnErrorSignal
     * @param {Loader} loader - The loader the error happened in.
     * @param {Resource} resource - The resource that caused the error.
     */

    /**
     * When a load completes the loader and resource are disaptched.
     *
     * @memberof Loader
     * @callback OnLoadSignal
     * @param {Loader} loader - The loader that laoded the resource.
     * @param {Resource} resource - The resource that has completed loading.
     */

    /**
     * When the loader starts loading resources it dispatches this callback.
     *
     * @memberof Loader
     * @callback OnStartSignal
     * @param {Loader} loader - The loader that has started loading resources.
     */

    /**
     * When the loader completes loading resources it dispatches this callback.
     *
     * @memberof Loader
     * @callback OnCompleteSignal
     * @param {Loader} loader - The loader that has finished loading resources.
     */
  }

  /**
   * Adds a resource (or multiple resources) to the loader queue.
   *
   * This function can take a wide variety of different parameters. The only thing that is always
   * required the url to load. All the following will work:
   *
   * ```js
   * loader
   *     // normal param syntax
   *     .add('key', 'http://...', function () {})
   *     .add('http://...', function () {})
   *     .add('http://...')
   *
   *     // object syntax
   *     .add({
   *         name: 'key2',
   *         url: 'http://...'
   *     }, function () {})
   *     .add({
   *         url: 'http://...'
   *     }, function () {})
   *     .add({
   *         name: 'key3',
   *         url: 'http://...'
   *         onComplete: function () {}
   *     })
   *     .add({
   *         url: 'https://...',
   *         onComplete: function () {},
   *         crossOrigin: true
   *     })
   *
   *     // you can also pass an array of objects or urls or both
   *     .add([
   *         { name: 'key4', url: 'http://...', onComplete: function () {} },
   *         { url: 'http://...', onComplete: function () {} },
   *         'http://...'
   *     ])
   *
   *     // and you can use both params and options
   *     .add('key', 'http://...', { crossOrigin: true }, function () {})
   *     .add('http://...', { crossOrigin: true }, function () {})
   * ```
   *
   * @param {string} [name] - The name of the resource to load, if not passed the url is used.
   * @param {string} [url] - The url for this resource, relative to the baseUrl of this loader.
   * @param {object} [options] - The options for the load.
   * @param {boolean} [options.crossOrigin] - Is this request cross-origin? Default is to determine automatically.
   * @param {Resource.LOAD_TYPE} [options.loadType=Resource.LOAD_TYPE.XHR] - How should this resource be loaded?
   * @param {Resource.XHR_RESPONSE_TYPE} [options.xhrType=Resource.XHR_RESPONSE_TYPE.DEFAULT] - How should
   *      the data being loaded be interpreted when using XHR?
   * @param {object} [options.metadata] - Extra configuration for middleware and the Resource object.
   * @param {HTMLImageElement|HTMLAudioElement|HTMLVideoElement} [options.metadata.loadElement=null] - The
   *      element to use for loading, instead of creating one.
   * @param {boolean} [options.metadata.skipSource=false] - Skips adding source(s) to the load element. This
   *      is useful if you want to pass in a `loadElement` that you already added load sources to.
   * @param {function} [cb] - Function to call when this specific resource completes loading.
   * @return {Loader} Returns itself.
   */
  Loader.prototype.add = function add(name, url, options, cb) {
    // special case of an array of objects or urls
    if (Array.isArray(name)) {
      for (var i = 0; i < name.length; ++i) {
        this.add(name[i])
      }

      return this
    }

    // if an object is passed instead of params
    if ((typeof name === 'undefined' ? 'undefined' : typeof_(name)) === 'object') {
      cb = url || name.callback || name.onComplete
      options = name
      url = name.url
      name = name.name || name.key || name.url
    }

    // case where no name is passed shift all args over by one.
    if (typeof url !== 'string') {
      cb = options
      options = url
      url = name
    }

    // now that we shifted make sure we have a proper url.
    if (typeof url !== 'string') {
      throw new Error('No url passed to add resource to loader.')
    }

    // options are optional so people might pass a function and no options
    if (typeof options === 'function') {
      cb = options
      options = null
    }

    // if loading already you can only add resources that have a parent.
    if (this.loading && (!options || !options.parentResource)) {
      throw new Error('Cannot add resources while the loader is running.')
    }

    // check if resource already exists.
    if (this.resources[name]) {
      throw new Error('Resource named "' + name + '" already exists.')
    }

    // add base url if this isn't an absolute url
    url = this._prepareUrl(url)

    // create the store the resource
    this.resources[name] = new Resource(name, url, options)

    if (typeof cb === 'function') {
      this.resources[name].onAfterMiddleware.once(cb)
    }

    // if actively loading, make sure to adjust progress chunks for that parent and its children
    if (this.loading) {
      var parent = options.parentResource
      var incompleteChildren = []

      for (var _i = 0; _i < parent.children.length; ++_i) {
        if (!parent.children[_i].isComplete) {
          incompleteChildren.push(parent.children[_i])
        }
      }

      var fullChunk = parent.progressChunk * (incompleteChildren.length + 1); // +1 for parent
      var eachChunk = fullChunk / (incompleteChildren.length + 2); // +2 for parent & new child

      parent.children.push(this.resources[name])
      parent.progressChunk = eachChunk

      for (var _i2 = 0; _i2 < incompleteChildren.length; ++_i2) {
        incompleteChildren[_i2].progressChunk = eachChunk
      }

      this.resources[name].progressChunk = eachChunk
    }

    // add the resource to the queue
    this._queue.push(this.resources[name])

    return this
  }

  /**
   * Sets up a middleware function that will run *before* the
   * resource is loaded.
   *
   * @method before
   * @param {function} fn - The middleware function to register.
   * @return {Loader} Returns itself.
   */


  Loader.prototype.pre = function pre(fn) {
    this._beforeMiddleware.push(fn)

    return this
  }

  /**
   * Sets up a middleware function that will run *after* the
   * resource is loaded.
   *
   * @alias use
   * @method after
   * @param {function} fn - The middleware function to register.
   * @return {Loader} Returns itself.
   */


  Loader.prototype.use = function use(fn) {
    this._afterMiddleware.push(fn)

    return this
  }

  /**
   * Resets the queue of the loader to prepare for a new load.
   *
   * @return {Loader} Returns itself.
   */


  Loader.prototype.reset = function reset() {
    this.progress = 0
    this.loading = false

    this._queue.kill()
    this._queue.pause()

    // abort all resource loads
    for (var k in this.resources) {
      var res = this.resources[k]

      if (res._onLoadBinding) {
        res._onLoadBinding.detach()
      }

      if (res.isLoading) {
        res.abort()
      }
    }

    this.resources = {}

    return this
  }

  /**
   * Starts loading the queued resources.
   *
   * @param {function} [cb] - Optional callback that will be bound to the `complete` event.
   * @return {Loader} Returns itself.
   */


  Loader.prototype.load = function load(cb) {
    // register complete callback if they pass one
    if (typeof cb === 'function') {
      this.onComplete.once(cb)
    }

    // if the queue has already started we are done here
    if (this.loading) {
      return this
    }

    if (this._queue.idle()) {
      this._onStart()
      this._onComplete()
    } else {
      // distribute progress chunks
      var numTasks = this._queue._tasks.length
      var chunk = 100 / numTasks

      for (var i = 0; i < this._queue._tasks.length; ++i) {
        this._queue._tasks[i].data.progressChunk = chunk
      }

      // notify we are starting
      this._onStart()

      // start loading
      this._queue.resume()
    }

    return this
  }

  /**
   * The number of resources to load concurrently.
   *
   * @member {number}
   * @default 10
   */


  /**
   * Prepares a url for usage based on the configuration of this object
   *
   * @private
   * @param {string} url - The url to prepare.
   * @return {string} The prepared url.
   */
  Loader.prototype._prepareUrl = function _prepareUrl(url) {
    var parsedUrl = (0, parseURI)(url, {
      strictMode: true
    })
    var result = void 0

    // absolute url, just use it as is.
    if (parsedUrl.protocol || !parsedUrl.path || url.indexOf('//') === 0) {
      result = url
    }
    // if baseUrl doesn't end in slash and url doesn't start with slash, then add a slash inbetween
    else if (this.baseUrl.length && this.baseUrl.lastIndexOf('/') !== this.baseUrl.length - 1 && url.charAt(0) !== '/') {
      result = this.baseUrl + '/' + url
    } else {
      result = this.baseUrl + url
    }

    // if we need to add a default querystring, there is a bit more work
    if (this.defaultQueryString) {
      var hash = rgxExtractUrlHash.exec(result)[0]

      result = result.substr(0, result.length - hash.length)

      if (result.indexOf('?') !== -1) {
        result += '&' + this.defaultQueryString
      } else {
        result += '?' + this.defaultQueryString
      }

      result += hash
    }

    return result
  }

  /**
   * Loads a single resource.
   *
   * @private
   * @param {Resource} resource - The resource to load.
   * @param {function} dequeue - The function to call when we need to dequeue this item.
   */


  Loader.prototype._loadResource = function _loadResource(resource, dequeue) {
    var _this2 = this

    resource._dequeue = dequeue

    // run before middleware
    async_lib.eachSeries(this._beforeMiddleware, function (fn, next) {
      fn.call(_this2, resource, function () {
        // if the before middleware marks the resource as complete,
        // break and don't process any more before middleware
        next(resource.isComplete ? {} : null)
      })
    }, function () {
      if (resource.isComplete) {
        _this2._onLoad(resource)
      } else {
        resource._onLoadBinding = resource.onComplete.once(_this2._onLoad, _this2)
        resource.load()
      }
    }, true)
  }

  /**
   * Called once loading has started.
   *
   * @private
   */


  Loader.prototype._onStart = function _onStart() {
    this.progress = 0
    this.loading = true
    this.onStart.dispatch(this)
  }

  /**
   * Called once each resource has loaded.
   *
   * @private
   */


  Loader.prototype._onComplete = function _onComplete() {
    this.progress = MAX_PROGRESS
    this.loading = false
    this.onComplete.dispatch(this, this.resources)
  }

  /**
   * Called each time a resources is loaded.
   *
   * @private
   * @param {Resource} resource - The resource that was loaded
   */


  Loader.prototype._onLoad = function _onLoad(resource) {
    var _this3 = this

    resource._onLoadBinding = null

    // remove this resource from the async queue, and add it to our list of resources that are being parsed
    this._resourcesParsing.push(resource)
    resource._dequeue()

    // run all the after middleware for this resource
    async_lib.eachSeries(this._afterMiddleware, function (fn, next) {
      fn.call(_this3, resource, next)
    }, function () {
      resource.onAfterMiddleware.dispatch(resource)

      _this3.progress += resource.progressChunk
      _this3.onProgress.dispatch(_this3, resource)

      if (resource.error) {
        _this3.onError.dispatch(resource.error, _this3, resource)
      } else {
        _this3.onLoad.dispatch(_this3, resource)
      }

      _this3._resourcesParsing.splice(_this3._resourcesParsing.indexOf(resource), 1)

      // do completion check
      if (_this3._queue.idle() && _this3._resourcesParsing.length === 0) {
        _this3._onComplete()
      }
    }, true)
  }

  create_class_(Loader, [{
    key: 'concurrency',
    get: function get() {
      return this._queue.concurrency
    }
    // eslint-disable-next-line require-jsdoc
    ,
    set: function set(concurrency) {
      this._queue.concurrency = concurrency
    }
  }])

  return Loader
})()

const enhanceLoader = () => {
  Loader.Resource = Resource
  Loader.async = async_lib
  Loader.base64 = b64
}

// a middleware for transforming XHR loaded Blobs into more useful objects
const blobMiddlewareFactory = () => {
  var Url = window.URL

  return function blobMiddleware(resource, next) {
    if (!resource.data) {
      next()

      return
    }

    // if this was an XHR load of a blob
    if (resource.xhr && resource.xhrType === Resource.XHR_RESPONSE_TYPE.BLOB) {
      // if there is no blob support we probably got a binary string back
      if (!window.Blob || typeof resource.data === 'string') {
        var type = resource.xhr.getResponseHeader('content-type')

        // this is an image, convert the binary string into a data url
        if (type && type.indexOf('image') === 0) {
          resource.data = new Image()
          resource.data.src = 'data:' + type + ';base64,' + b64(resource.xhr.responseText)

          resource.type = Resource.TYPE.IMAGE

          // wait until the image loads and then callback
          resource.data.onload = function () {
            resource.data.onload = null

            next()
          }

          // next will be called on load
          return
        }
      }
      // if content type says this is an image, then we should transform the blob into an Image object
      else if (resource.data.type.indexOf('image') === 0) {
        var _ret = function () {
          var src = Url.createObjectURL(resource.data)

          resource.blob = resource.data
          resource.data = new Image()
          resource.data.src = src

          resource.type = Resource.TYPE.IMAGE

          // cleanup the no longer used blob after the image loads
          // TODO: Is this correct? Will the image be invalid after revoking?
          resource.data.onload = function () {
            Url.revokeObjectURL(src)
            resource.data.onload = null

            next()
          }

          // next will be called on load.
          return {
            v: void 0
          }
        }()

        if ((typeof _ret === 'undefined' ? 'undefined' : typeof_(_ret)) === "object") return _ret.v
      }
    }

    next()
  }
}

const queryString = {
  decode, parse: decode,
  encode, stringify: encode
}

const url = (() => {

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
  const exports = {}
  exports.parse = urlParse
  exports.resolve = urlResolve
  exports.resolveObject = urlResolveObject
  exports.format = urlFormat
  exports.Url = Url

  function Url() {
    this.protocol = null
    this.slashes = null
    this.auth = null
    this.host = null
    this.port = null
    this.hostname = null
    this.hash = null
    this.search = null
    this.query = null
    this.pathname = null
    this.path = null
    this.href = null
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first container load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    }
  
  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url

    var u = new Url
    u.parse(url, parseQueryString, slashesDenoteHost)
    return u
  }

  Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url)
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
      splitter =
        (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g
    uSplit[0] = uSplit[0].replace(slashRegex, '/')
    url = uSplit.join(splitter)

    var rest = url

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim()

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest)
      if (simplePath) {
        this.path = rest
        this.href = rest
        this.pathname = simplePath[1]
        if (simplePath[2]) {
          this.search = simplePath[2]
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1))
          } else {
            this.query = this.search.substr(1)
          }
        } else if (parseQueryString) {
          this.search = ''
          this.query = {}
        }
        return this
      }
    }

    var proto = protocolPattern.exec(rest)
    if (proto) {
      proto = proto[0]
      var lowerProto = proto.toLowerCase()
      this.protocol = lowerProto
      rest = rest.substr(proto.length)
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//'
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2)
        this.slashes = true
      }
    }

    if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i])
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@')
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd)
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign)
        rest = rest.slice(atSign + 1)
        this.auth = decodeURIComponent(auth)
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i])
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length

      this.host = rest.slice(0, hostEnd)
      rest = rest.slice(hostEnd)

      // pull out port.
      this.parseHost()

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || ''

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']'

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./)
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i]
          if (!part) continue
          if (!part.match(hostnamePartPattern)) {
            var newpart = ''
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x'
              } else {
                newpart += part[j]
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i)
              var notHost = hostparts.slice(i + 1)
              var bit = part.match(hostnamePartStart)
              if (bit) {
                validParts.push(bit[1])
                notHost.unshift(bit[2])
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest
              }
              this.hostname = validParts.join('.')
              break
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = ''
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase()
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname)
      }

      var p = this.port ? ':' + this.port : ''
      var h = this.hostname || ''
      this.host = h + p
      this.href += this.host

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2)
        if (rest[0] !== '/') {
          rest = '/' + rest
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i]
        if (rest.indexOf(ae) === -1)
          continue
        var esc = encodeURIComponent(ae)
        if (esc === ae) {
          esc = escape(ae)
        }
        rest = rest.split(ae).join(esc)
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#')
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash)
      rest = rest.slice(0, hash)
    }
    var qm = rest.indexOf('?')
    if (qm !== -1) {
      this.search = rest.substr(qm)
      this.query = rest.substr(qm + 1)
      if (parseQueryString) {
        this.query = querystring.parse(this.query)
      }
      rest = rest.slice(0, qm)
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = ''
      this.query = {}
    }
    if (rest) this.pathname = rest
    if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
      this.pathname = '/'
    }

    //to support http.request
    if (this.pathname || this.search) {
      var p = this.pathname || ''
      var s = this.search || ''
      this.path = p + s
    }

    // finally, reconstruct the href based on what has been validated.
    this.href = this.format()
    return this
  }

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) obj = urlParse(obj)
    if (!(obj instanceof Url)) return Url.prototype.format.call(obj)
    return obj.format()
  }

  Url.prototype.format = function () {
    var auth = this.auth || ''
    if (auth) {
      auth = encodeURIComponent(auth)
      auth = auth.replace(/%3A/i, ':')
      auth += '@'
    }

    var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = ''

    if (this.host) {
      host = auth + this.host
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']')
      if (this.port) {
        host += ':' + this.port
      }
    }

    if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
      query = querystring.stringify(this.query)
    }

    var search = this.search || (query && ('?' + query)) || ''

    if (protocol && protocol.substr(-1) !== ':') protocol += ':'

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '')
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname
    } else if (!host) {
      host = ''
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash
    if (search && search.charAt(0) !== '?') search = '?' + search

    pathname = pathname.replace(/[?#]/g, function (match) {
      return encodeURIComponent(match)
    })
    search = search.replace('#', '%23')

    return protocol + host + pathname + search + hash
  }

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative)
  }

  Url.prototype.resolve = function (relative) {
    return this.resolveObject(urlParse(relative, false, true)).format()
  }

  function urlResolveObject(source, relative) {
    if (!source) return relative
    return urlParse(source, false, true).resolveObject(relative)
  }

  Url.prototype.resolveObject = function (relative) {
    if (util.isString(relative)) {
      var rel = new Url()
      rel.parse(relative, false, true)
      relative = rel
    }

    var result = new Url()
    var tkeys = Object.keys(this)
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk]
      result[tkey] = this[tkey]
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format()
      return result
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative)
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk]
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey]
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
        result.path = result.pathname = '/'
      }

      result.href = result.format()
      return result
    }

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative)
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v]
          result[k] = relative[k]
        }
        result.href = result.format()
        return result
      }

      result.protocol = relative.protocol
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/')
        while (relPath.length && !(relative.host = relPath.shift()))
          if (!relative.host) relative.host = ''
        if (!relative.hostname) relative.hostname = ''
        if (relPath[0] !== '') relPath.unshift('')
        if (relPath.length < 2) relPath.unshift('')
        result.pathname = relPath.join('/')
      } else {
        result.pathname = relative.pathname
      }
      result.search = relative.search
      result.query = relative.query
      result.host = relative.host || ''
      result.auth = relative.auth
      result.hostname = relative.hostname || relative.host
      result.port = relative.port
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || ''
        var s = result.search || ''
        result.path = p + s
      }
      result.slashes = result.slashes || relative.slashes
      result.href = result.format()
      return result
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
        relative.host ||
        relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
        (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol]

    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = ''
      result.port = null
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host
        else srcPath.unshift(result.host)
      }
      result.host = ''
      if (relative.protocol) {
        relative.hostname = null
        relative.port = null
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host
          else relPath.unshift(relative.host)
        }
        relative.host = null
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '')
    }

    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
        relative.host : result.host
      result.hostname = (relative.hostname || relative.hostname === '') ?
        relative.hostname : result.hostname
      result.search = relative.search
      result.query = relative.query
      srcPath = relPath
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = []
      srcPath.pop()
      srcPath = srcPath.concat(relPath)
      result.search = relative.search
      result.query = relative.query
    } else if (!util.isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift()
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
          result.host.split('@') : false
        if (authInHost) {
          result.auth = authInHost.shift()
          result.host = result.hostname = authInHost.shift()
        }
      }
      result.search = relative.search
      result.query = relative.query
      //to support http.request
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
          (result.search ? result.search : '')
      }
      result.href = result.format()
      return result
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search
      } else {
        result.path = null
      }
      result.href = result.format()
      return result
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0]
    var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '')

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i]
      if (last === '.') {
        srcPath.splice(i, 1)
      } else if (last === '..') {
        srcPath.splice(i, 1)
        up++
      } else if (up) {
        srcPath.splice(i, 1)
        up--
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..')
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('')
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('')
    }

    var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/')

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
        srcPath.length ? srcPath.shift() : ''
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
        result.host.split('@') : false
      if (authInHost) {
        result.auth = authInHost.shift()
        result.host = result.hostname = authInHost.shift()
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length)

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('')
    }

    if (!srcPath.length) {
      result.pathname = null
      result.path = null
    } else {
      result.pathname = srcPath.join('/')
    }

    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
        (result.search ? result.search : '')
    }
    result.auth = relative.auth || result.auth
    result.slashes = result.slashes || relative.slashes
    result.href = result.format()
    return result
  }

  Url.prototype.parseHost = function () {
    var host = this.host
    var port = portPattern.exec(host)
    if (port) {
      port = port[0]
      if (port !== ':') {
        this.port = port.substr(1)
      }
      host = host.substr(0, host.length - port.length)
    }
    if (host) this.hostname = host
  }

  return exports
})()

/**
 * Corrects PixiJS blend, takes premultiplied alpha into account
 *
 * @memberof PIXI
 * @function mapPremultipliedBlendModes
 * @private
 * @param {Array<number[]>} [array] - The array to output into.
 * @return {Array<number[]>} Mapped modes.
 */
const mapPremultipliedBlendModes = () => {
  var pm = []
  var npm = []

  for (var i = 0; i < 32; i++) {
    pm[i] = i
    npm[i] = i
  }

  pm[constants.BLEND_MODES.NORMAL_NPM] = constants.BLEND_MODES.NORMAL
  pm[constants.BLEND_MODES.ADD_NPM] = constants.BLEND_MODES.ADD
  pm[constants.BLEND_MODES.SCREEN_NPM] = constants.BLEND_MODES.SCREEN

  npm[constants.BLEND_MODES.NORMAL] = constants.BLEND_MODES.NORMAL_NPM
  npm[constants.BLEND_MODES.ADD] = constants.BLEND_MODES.ADD_NPM
  npm[constants.BLEND_MODES.SCREEN] = constants.BLEND_MODES.SCREEN_NPM

  var array = []

  array.push(npm)
  array.push(pm)

  return array
}

const maxRecommendedTextures = max => {
  if (IsMobile.tablet || IsMobile.phone) {
    // check if the res is iphone 6 or higher..
    return 4
  }

  // desktop should be ok
  return max
}

const settings = {

  /**
   * Target frames per millisecond.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 0.06
   */
  TARGET_FPMS: 0.06,

  /**
   * If set to true WebGL will attempt make textures mimpaped by default.
   * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
   *
   * @static
   * @memberof PIXI.settings
   * @type {boolean}
   * @default true
   */
  MIPMAP_TEXTURES: true,

  /**
   * Default resolution / device pixel ratio of the renderer.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */
  RESOLUTION: 1,

  /**
   * Default filter resolution.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */
  FILTER_RESOLUTION: 1,

  /**
   * The maximum textures that this device supports.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 32
   */
  SPRITE_MAX_TEXTURES: (0, maxRecommendedTextures)(32),

  // TODO: maybe change to SPRITE.BATCH_SIZE: 2000
  // TODO: maybe add PARTICLE.BATCH_SIZE: 15000

  /**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 4096
   */
  SPRITE_BATCH_SIZE: 4096,

  /**
   * The prefix that denotes a URL is for a retina asset.
   *
   * @static
   * @memberof PIXI.settings
   * @type {RegExp}
   * @example `@2x`
   * @default /@([0-9\.]+)x/
   */
  RETINA_PREFIX: /@([0-9\.]+)x/,

  /**
   * The default render options if none are supplied to {@link PIXI.WebGLRenderer}
   * or {@link PIXI.CanvasRenderer}.
   *
   * @static
   * @constant
   * @memberof PIXI.settings
   * @type {object}
   * @property {HTMLCanvasElement} view=null
   * @property {number} resolution=1
   * @property {boolean} antialias=false
   * @property {boolean} forceFXAA=false
   * @property {boolean} autoResize=false
   * @property {boolean} transparent=false
   * @property {number} backgroundColor=0x000000
   * @property {boolean} clearBeforeRender=true
   * @property {boolean} preserveDrawingBuffer=false
   * @property {boolean} roundPixels=false
   * @property {number} width=800
   * @property {number} height=600
   * @property {boolean} legacy=false
   */
  RENDER_OPTIONS: {
    view: null,
    antialias: false,
    forceFXAA: false,
    autoResize: false,
    transparent: false,
    backgroundColor: 0x000000,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    roundPixels: false,
    width: 800,
    height: 600,
    legacy: false
  },

  /**
   * Default transform type.
   *
   * @static
   * @memberof PIXI.settings
   * @type {PIXI.TRANSFORM_MODE}
   * @default PIXI.TRANSFORM_MODE.STATIC
   */
  TRANSFORM_MODE: 0,

  /**
   * Default Garbage Collection mode.
   *
   * @static
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @default PIXI.GC_MODES.AUTO
   */
  GC_MODE: 0,

  /**
   * Default Garbage Collection max idle.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 3600
   */
  GC_MAX_IDLE: 60 * 60,

  /**
   * Default Garbage Collection maximum check count.
   *
   * @static
   * @memberof PIXI.settings
   * @type {number}
   * @default 600
   */
  GC_MAX_CHECK_COUNT: 60 * 10,

  /**
   * Default wrap modes that are supported by pixi.
   *
   * @static
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */
  WRAP_MODE: 0,

  /**
   * The scale modes that are supported by pixi.
   *
   * @static
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */
  SCALE_MODE: 0,

  /**
   * Default specify float precision in vertex shader.
   *
   * @static
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @default PIXI.PRECISION.HIGH
   */
  PRECISION_VERTEX: 'highp',

  /**
   * Default specify float precision in fragment shader.
   *
   * @static
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @default PIXI.PRECISION.MEDIUM
   */
  PRECISION_FRAGMENT: 'mediump',

  /**
   * Can we upload the same buffer in a single frame?
   *
   * @static
   * @constant
   * @memberof PIXI.settings
   * @type {boolean}
   */
  CAN_UPLOAD_SAME_BUFFER: (0, canUploadSameBuffer)(),

  /**
   * Default Mesh `canvasPadding`.
   *
   * @see PIXI.mesh.Mesh#canvasPadding
   * @static
   * @constant
   * @memberof PIXI.settings
   * @type {number}
   */
  MESH_CANVAS_PADDING: 0
}

const utils = (() => {
  const exports = {}
  exports.uid = uid
  exports.hex2rgb = hex2rgb
  exports.hex2string = hex2string
  exports.rgb2hex = rgb2hex
  exports.getResolutionOfUrl = getResolutionOfUrl
  exports.decomposeDataUri = decomposeDataUri
  exports.getUrlFileExtension = getUrlFileExtension
  exports.getSvgSize = getSvgSize
  exports.skipHello = skipHello
  exports.sayHello = sayHello
  exports.isWebGLSupported = isWebGLSupported
  exports.sign = sign
  exports.destroyTextureCache = destroyTextureCache
  exports.clearTextureCache = clearTextureCache
  exports.correctBlendMode = correctBlendMode
  exports.premultiplyTint = premultiplyTint
  exports.premultiplyRgba = premultiplyRgba
  exports.premultiplyTintToRgba = premultiplyTintToRgba

  var nextUid = 0
  var saidHello = false

  /**
   * Generalized convenience utilities for PIXI.
   * @example
   * // Extend PIXI's internal Event Emitter.
   * class MyEmitter extends PIXI.utils.EventEmitter {
   *   constructor() {
   *      super()
   *      console.log("Emitter created!")
   *   }
   * }
   *
   * // Get info on current device
   * console.log(PIXI.utils.isMobile)
   *
   * // Convert hex color to string
   * console.log(PIXI.utils.hex2string(0xff00ff)); // returns: "#ff00ff"
   * @namespace PIXI.utils
   */
  exports.isMobile = IsMobile
  exports.removeItems = removeItems
  exports.EventEmitter = EventEmitter
  exports.pluginTarget = PluginTarget
  exports.mixins = mixins
  exports.earcut = earcut

  /**
   * Gets the next unique identifier
   *
   * @memberof PIXI.utils
   * @function uid
   * @return {number} The next unique identifier to use.
   */

  function uid() {
    return ++nextUid
  }

  /**
   * Converts a hex color number to an [R, G, B] array
   *
   * @memberof PIXI.utils
   * @function hex2rgb
   * @param {number} hex - The number to convert
   * @param  {number[]} [out=[]] If supplied, this array will be used rather than returning a new one
   * @return {number[]} An array representing the [R, G, B] of the color.
   */
  function hex2rgb(hex, out) {
    out = out || []

    out[0] = (hex >> 16 & 0xFF) / 255
    out[1] = (hex >> 8 & 0xFF) / 255
    out[2] = (hex & 0xFF) / 255

    return out
  }

  /**
   * Converts a hex color number to a string.
   *
   * @memberof PIXI.utils
   * @function hex2string
   * @param {number} hex - Number in hex
   * @return {string} The string color.
   */
  function hex2string(hex) {
    hex = hex.toString(16)
    hex = '000000'.substr(0, 6 - hex.length) + hex

    return '#' + hex
  }

  /**
   * Converts a color as an [R, G, B] array to a hex number
   *
   * @memberof PIXI.utils
   * @function rgb2hex
   * @param {number[]} rgb - rgb array
   * @return {number} The color number
   */
  function rgb2hex(rgb) {
    return (rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + (rgb[2] * 255 | 0)
  }

  /**
   * get the resolution / device pixel ratio of an asset by looking for the prefix
   * used by spritesheets and image urls
   *
   * @memberof PIXI.utils
   * @function getResolutionOfUrl
   * @param {string} url - the image path
   * @param {number} [defaultValue=1] - the defaultValue if no filename prefix is set.
   * @return {number} resolution / device pixel ratio of an asset
   */
  function getResolutionOfUrl(url, defaultValue) {
    var resolution = settings.RETINA_PREFIX.exec(url)

    if (resolution) {
      return parseFloat(resolution[1])
    }

    return defaultValue !== undefined ? defaultValue : 1
  }

  /**
   * Typedef for decomposeDataUri return object.
   *
   * @typedef {object} PIXI.utils~DecomposedDataUri
   * @property {mediaType} Media type, eg. `image`
   * @property {subType} Sub type, eg. `png`
   * @property {encoding} Data encoding, eg. `base64`
   * @property {data} The actual data
   */

  /**
   * Split a data URI into components. Returns undefined if
   * parameter `dataUri` is not a valid data URI.
   *
   * @memberof PIXI.utils
   * @function decomposeDataUri
   * @param {string} dataUri - the data URI to check
   * @return {PIXI.utils~DecomposedDataUri|undefined} The decomposed data uri or undefined
   */
  function decomposeDataUri(dataUri) {
    var dataUriMatch = constants.DATA_URI.exec(dataUri)

    if (dataUriMatch) {
      return {
        mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : undefined,
        subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : undefined,
        charset: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : undefined,
        encoding: dataUriMatch[4] ? dataUriMatch[4].toLowerCase() : undefined,
        data: dataUriMatch[5]
      }
    }

    return undefined
  }

  /**
   * Get type of the image by regexp for extension. Returns undefined for unknown extensions.
   *
   * @memberof PIXI.utils
   * @function getUrlFileExtension
   * @param {string} url - the image path
   * @return {string|undefined} image extension
   */
  function getUrlFileExtension(url) {
    var extension = constants.URL_FILE_EXTENSION.exec(url)

    if (extension) {
      return extension[1].toLowerCase()
    }

    return undefined
  }

  /**
   * Typedef for Size object.
   *
   * @typedef {object} PIXI.utils~Size
   * @property {width} Width component
   * @property {height} Height component
   */

  /**
   * Get size from an svg string using regexp.
   *
   * @memberof PIXI.utils
   * @function getSvgSize
   * @param {string} svgString - a serialized svg element
   * @return {PIXI.utils~Size|undefined} image extension
   */
  function getSvgSize(svgString) {
    var sizeMatch = constants.SVG_SIZE.exec(svgString)
    var size = {}

    if (sizeMatch) {
      size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3]))
      size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]))
    }

    return size
  }

  /**
   * Skips the hello message of renderers that are created after this is run.
   *
   * @function skipHello
   * @memberof PIXI.utils
   */
  function skipHello() {
    saidHello = true
  }

  /**
   * Logs out the version and renderer information for this running instance of PIXI.
   * If you don't want to see this message you can run `PIXI.utils.skipHello()` before
   * creating your renderer. Keep in mind that doing that will forever makes you a jerk face.
   *
   * @static
   * @function sayHello
   * @memberof PIXI.utils
   * @param {string} type - The string renderer type to log.
   */
  function sayHello(type) {
    if (saidHello) {
      return
    }

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var args = [
        '\n %c %c %c PixiJS ' + constants.VERSION + ' - \u2730 ' + type +
        ' \u2730  %c  %c  http://www.pixijs.com/  %c %c \u2665%c\u2665%c\u2665 \n\n', 'background: #ff66a5; padding:5px 0;',
        'background: #ff66a5; padding:5px 0;', 'color: #ff66a5; background: #030307; padding:5px 0;',
        'background: #ff66a5; padding:5px 0;', 'background: #ffc3dc; padding:5px 0;', 'background: #ff66a5; padding:5px 0;',
        'color: #ff2424; background: #fff; padding:5px 0;',
        'color: #ff2424; background: #fff; padding:5px 0;',
        'color: #ff2424; background: #fff; padding:5px 0;'
      ]

      window.console.log.apply(console, args)
    } else if (window.console) {
      window.console.log('PixiJS ' + constants.VERSION + ' - ' + type + ' - http://www.pixijs.com/')
    }

    saidHello = true
  }

  /**
   * Helper for checking for webgl support
   *
   * @memberof PIXI.utils
   * @function isWebGLSupported
   * @return {boolean} is webgl supported
   */
  function isWebGLSupported() {
    var contextOptions = {
      stencil: true,
      failIfMajorPerformanceCaveat: true
    }

    try {
      if (!window.WebGLRenderingContext) {
        return false
      }

      var canvas = document.createElement('canvas')
      var gl = canvas.getContext('webgl', contextOptions) || canvas.getContext('experimental-webgl', contextOptions)

      var success = !!(gl && gl.getContextAttributes().stencil)

      if (gl) {
        var loseContext = gl.getExtension('WEBGL_lose_context')

        if (loseContext) {
          loseContext.loseContext()
        }
      }

      gl = null

      return success
    } catch (e) {
      return false
    }
  }

  /**
   * Returns sign of number
   *
   * @memberof PIXI.utils
   * @function sign
   * @param {number} n - the number to check the sign of
   * @returns {number} 0 if `n` is 0, -1 if `n` is negative, 1 if `n` is positive
   */
  function sign(n) {
    if (n === 0) return 0

    return n < 0 ? -1 : 1
  }

  /**
   * @todo Describe property usage
   *
   * @memberof PIXI.utils
   * @private
   */
  var TextureCache = exports.TextureCache = Object.create(null)

  /**
   * @todo Describe property usage
   *
   * @memberof PIXI.utils
   * @private
   */
  var BaseTextureCache = exports.BaseTextureCache = Object.create(null)

  /**
   * Destroys all texture in the cache
   *
   * @memberof PIXI.utils
   * @function destroyTextureCache
   */
  function destroyTextureCache() {
    var key = void 0

    for (key in TextureCache) {
      TextureCache[key].destroy()
    }
    for (key in BaseTextureCache) {
      BaseTextureCache[key].destroy()
    }
  }

  /**
   * Removes all textures from cache, but does not destroy them
   *
   * @memberof PIXI.utils
   * @function clearTextureCache
   */
  function clearTextureCache() {
    var key = void 0

    for (key in TextureCache) {
      delete TextureCache[key]
    }
    for (key in BaseTextureCache) {
      delete BaseTextureCache[key]
    }
  }

  /**
   * maps premultiply flag and blendMode to adjusted blendMode
   * @memberof PIXI.utils
   * @const premultiplyBlendMode
   * @type {Array<number[]>}
   */
  var premultiplyBlendMode = exports.premultiplyBlendMode = (0, mapPremultipliedBlendModes)()

  /**
   * changes blendMode according to texture format
   *
   * @memberof PIXI.utils
   * @function correctBlendMode
   * @param {number} blendMode supposed blend mode
   * @param {boolean} premultiplied  whether source is premultiplied
   * @returns {number} true blend mode for this texture
   */
  function correctBlendMode(blendMode, premultiplied) {
    return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode]
  }

  /**
   * premultiplies tint
   *
   * @memberof PIXI.utils
   * @param {number} tint integet RGB
   * @param {number} alpha floating point alpha (0.0-1.0)
   * @returns {number} tint multiplied by alpha
   */
  function premultiplyTint(tint, alpha) {
    if (alpha === 1.0) {
      return (alpha * 255 << 24) + tint
    }
    if (alpha === 0.0) {
      return 0
    }
    var R = tint >> 16 & 0xFF
    var G = tint >> 8 & 0xFF
    var B = tint & 0xFF

    R = R * alpha + 0.5 | 0
    G = G * alpha + 0.5 | 0
    B = B * alpha + 0.5 | 0

    return (alpha * 255 << 24) + (R << 16) + (G << 8) + B
  }

  /**
   * combines rgb and alpha to out array
   *
   * @memberof PIXI.utils
   * @param {Float32Array|number[]} rgb input rgb
   * @param {number} alpha alpha param
   * @param {Float32Array} [out] output
   * @param {boolean} [premultiply=true] do premultiply it
   * @returns {Float32Array} vec4 rgba
   */
  function premultiplyRgba(rgb, alpha, out, premultiply) {
    out = out || new Float32Array(4)
    if (premultiply || premultiply === undefined) {
      out[0] = rgb[0] * alpha
      out[1] = rgb[1] * alpha
      out[2] = rgb[2] * alpha
    } else {
      out[0] = rgb[0]
      out[1] = rgb[1]
      out[2] = rgb[2]
    }
    out[3] = alpha

    return out
  }

  /**
   * converts integer tint and float alpha to vec4 form, premultiplies by default
   *
   * @memberof PIXI.utils
   * @param {number} tint input tint
   * @param {number} alpha alpha param
   * @param {Float32Array} [out] output
   * @param {boolean} [premultiply=true] do premultiply it
   * @returns {Float32Array} vec4 rgba
   */
  function premultiplyTintToRgba(tint, alpha, out, premultiply) {
    out = out || new Float32Array(4)
    out[0] = (tint >> 16 & 0xFF) / 255.0
    out[1] = (tint >> 8 & 0xFF) / 255.0
    out[2] = (tint & 0xFF) / 255.0
    if (premultiply || premultiply === undefined) {
      out[0] *= alpha
      out[1] *= alpha
      out[2] *= alpha
    }
    out[3] = alpha

    return out
  }

  return exports
})()

const math = put_in_module_({
  Point,
  ObservablePoint,
  Matrix,
  GroupD8,
  Circle,
  Ellipse,
  Polygon,
  Rectangle,
  RoundedRectangle
}, {})

/**
 * 'Builder' pattern for bounds rectangles
 * Axis-Aligned Bounding Box
 * It is not a shape! Its mutable thing, no 'EMPTY' or that kind of problems
 *
 * @class
 * @memberof PIXI
 */
const Bounds = (() => {
  /**
   *
   */
  function Bounds() {
    class_call_check_(this, Bounds)

    /**
     * @member {number}
     * @default 0
     */
    this.minX = Infinity

    /**
     * @member {number}
     * @default 0
     */
    this.minY = Infinity

    /**
     * @member {number}
     * @default 0
     */
    this.maxX = -Infinity

    /**
     * @member {number}
     * @default 0
     */
    this.maxY = -Infinity

    this.rect = null
  }

  /**
   * Checks if bounds are empty.
   *
   * @return {boolean} True if empty.
   */
  Bounds.prototype.isEmpty = function isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY
  }

  /**
   * Clears the bounds and resets.
   *
   */
  Bounds.prototype.clear = function clear() {
    this.updateID++

    this.minX = Infinity
    this.minY = Infinity
    this.maxX = -Infinity
    this.maxY = -Infinity
  }

  /**
   * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
   * It is not guaranteed that it will return tempRect
   *
   * @param {PIXI.Rectangle} rect - temporary object will be used if AABB is not empty
   * @returns {PIXI.Rectangle} A rectangle of the bounds
   */
  Bounds.prototype.getRectangle = function getRectangle(rect) {
    if (this.minX > this.maxX || this.minY > this.maxY) {
      return math.Rectangle.EMPTY
    }

    rect = rect || new math.Rectangle(0, 0, 1, 1)

    rect.x = this.minX
    rect.y = this.minY
    rect.width = this.maxX - this.minX
    rect.height = this.maxY - this.minY

    return rect
  }

  /**
   * This function should be inlined when its possible.
   *
   * @param {PIXI.Point} point - The point to add.
   */
  Bounds.prototype.addPoint = function addPoint(point) {
    this.minX = Math.min(this.minX, point.x)
    this.maxX = Math.max(this.maxX, point.x)
    this.minY = Math.min(this.minY, point.y)
    this.maxY = Math.max(this.maxY, point.y)
  }

  /**
   * Adds a quad, not transformed
   *
   * @param {Float32Array} vertices - The verts to add.
   */
  Bounds.prototype.addQuad = function addQuad(vertices) {
    var minX = this.minX
    var minY = this.minY
    var maxX = this.maxX
    var maxY = this.maxY

    var x = vertices[0]
    var y = vertices[1]

    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    x = vertices[2]
    y = vertices[3]
    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    x = vertices[4]
    y = vertices[5]
    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    x = vertices[6]
    y = vertices[7]
    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  /**
   * Adds sprite frame, transformed.
   *
   * @param {PIXI.TransformBase} transform - TODO
   * @param {number} x0 - TODO
   * @param {number} y0 - TODO
   * @param {number} x1 - TODO
   * @param {number} y1 - TODO
   */
  Bounds.prototype.addFrame = function addFrame(transform, x0, y0, x1, y1) {
    var matrix = transform.worldTransform
    var a = matrix.a
    var b = matrix.b
    var c = matrix.c
    var d = matrix.d
    var tx = matrix.tx
    var ty = matrix.ty

    var minX = this.minX
    var minY = this.minY
    var maxX = this.maxX
    var maxY = this.maxY

    var x = a * x0 + c * y0 + tx
    var y = b * x0 + d * y0 + ty

    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    x = a * x1 + c * y0 + tx
    y = b * x1 + d * y0 + ty
    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    x = a * x0 + c * y1 + tx
    y = b * x0 + d * y1 + ty
    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    x = a * x1 + c * y1 + tx
    y = b * x1 + d * y1 + ty
    minX = x < minX ? x : minX
    minY = y < minY ? y : minY
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY

    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  /**
   * Add an array of vertices
   *
   * @param {PIXI.TransformBase} transform - TODO
   * @param {Float32Array} vertices - TODO
   * @param {number} beginOffset - TODO
   * @param {number} endOffset - TODO
   */
  Bounds.prototype.addVertices = function addVertices(transform, vertices, beginOffset, endOffset) {
    var matrix = transform.worldTransform
    var a = matrix.a
    var b = matrix.b
    var c = matrix.c
    var d = matrix.d
    var tx = matrix.tx
    var ty = matrix.ty

    var minX = this.minX
    var minY = this.minY
    var maxX = this.maxX
    var maxY = this.maxY

    for (var i = beginOffset; i < endOffset; i += 2) {
      var rawX = vertices[i]
      var rawY = vertices[i + 1]
      var x = a * rawX + c * rawY + tx
      var y = d * rawY + b * rawX + ty

      minX = x < minX ? x : minX
      minY = y < minY ? y : minY
      maxX = x > maxX ? x : maxX
      maxY = y > maxY ? y : maxY
    }

    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  /**
   * Adds other Bounds
   *
   * @param {PIXI.Bounds} bounds - TODO
   */
  Bounds.prototype.addBounds = function addBounds(bounds) {
    var minX = this.minX
    var minY = this.minY
    var maxX = this.maxX
    var maxY = this.maxY

    this.minX = bounds.minX < minX ? bounds.minX : minX
    this.minY = bounds.minY < minY ? bounds.minY : minY
    this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX
    this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY
  }

  /**
   * Adds other Bounds, masked with Bounds
   *
   * @param {PIXI.Bounds} bounds - TODO
   * @param {PIXI.Bounds} mask - TODO
   */
  Bounds.prototype.addBoundsMask = function addBoundsMask(bounds, mask) {
    var _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX
    var _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY
    var _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX
    var _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY

    if (_minX <= _maxX && _minY <= _maxY) {
      var minX = this.minX
      var minY = this.minY
      var maxX = this.maxX
      var maxY = this.maxY

      this.minX = _minX < minX ? _minX : minX
      this.minY = _minY < minY ? _minY : minY
      this.maxX = _maxX > maxX ? _maxX : maxX
      this.maxY = _maxY > maxY ? _maxY : maxY
    }
  }

  /**
   * Adds other Bounds, masked with Rectangle
   *
   * @param {PIXI.Bounds} bounds - TODO
   * @param {PIXI.Rectangle} area - TODO
   */
  Bounds.prototype.addBoundsArea = function addBoundsArea(bounds, area) {
    var _minX = bounds.minX > area.x ? bounds.minX : area.x
    var _minY = bounds.minY > area.y ? bounds.minY : area.y
    var _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : area.x + area.width
    var _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : area.y + area.height

    if (_minX <= _maxX && _minY <= _maxY) {
      var minX = this.minX
      var minY = this.minY
      var maxX = this.maxX
      var maxY = this.maxY

      this.minX = _minX < minX ? _minX : minX
      this.minY = _minY < minY ? _minY : minY
      this.maxX = _maxX > maxX ? _maxX : maxX
      this.maxY = _maxY > maxY ? _maxY : maxY
    }
  }

  return Bounds
})()

/**
 * Generic class to deal with traditional 2D matrix transforms
 *
 * @class
 * @memberof PIXI
 */
const TransformBase = (() => {

  function TransformBase() {
    class_call_check_(this, TransformBase)

    /**
     * The global matrix transform. It can be swapped temporarily by some functions like getLocalBounds()
     *
     * @member {PIXI.Matrix}
     */
    this.worldTransform = new math.Matrix()

    /**
     * The local matrix transform
     *
     * @member {PIXI.Matrix}
     */
    this.localTransform = new math.Matrix()

    this._worldID = 0
    this._parentID = 0
  }

  /**
   * TransformBase does not have decomposition, so this function wont do anything
   */
  TransformBase.prototype.updateLocalTransform = function updateLocalTransform() { }

  /**
   * Updates the values of the object and applies the parent's transform.
   *
   * @param {PIXI.TransformBase} parentTransform - The transform of the parent of this object
   */
  TransformBase.prototype.updateTransform = function updateTransform(parentTransform) {
    var pt = parentTransform.worldTransform
    var wt = this.worldTransform
    var lt = this.localTransform

    // concat the parent matrix with the objects transform.
    wt.a = lt.a * pt.a + lt.b * pt.c
    wt.b = lt.a * pt.b + lt.b * pt.d
    wt.c = lt.c * pt.a + lt.d * pt.c
    wt.d = lt.c * pt.b + lt.d * pt.d
    wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx
    wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty

    this._worldID++
  }

  /**
   * Updates the values of the object and applies the parent's transform.
   * @param  parentTransform {PIXI.Transform} The transform of the parent of this object
   *
   */
  TransformBase.prototype.updateWorldTransform = TransformBase.prototype.updateTransform
  TransformBase.IDENTITY = new TransformBase()

  return TransformBase
})()

/**
 * Transform that takes care about its versions
 *
 * @class
 * @extends PIXI.TransformBase
 * @memberof PIXI
 */
const TransformStatic = (_TransformBase => {
  inherits_(TransformStatic, _TransformBase)

  function TransformStatic() {
    class_call_check_(this, TransformStatic)

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @member {PIXI.ObservablePoint}
     */
    var _this = get_constructor_(this, _TransformBase.call(this))

    _this.position = new math.ObservablePoint(_this.onChange, _this, 0, 0)

    /**
     * The scale factor of the object.
     *
     * @member {PIXI.ObservablePoint}
     */
    _this.scale = new math.ObservablePoint(_this.onChange, _this, 1, 1)

    /**
     * The pivot point of the displayObject that it rotates around
     *
     * @member {PIXI.ObservablePoint}
     */
    _this.pivot = new math.ObservablePoint(_this.onChange, _this, 0, 0)

    /**
     * The skew amount, on the x and y axis.
     *
     * @member {PIXI.ObservablePoint}
     */
    _this.skew = new math.ObservablePoint(_this.updateSkew, _this, 0, 0)

    _this._rotation = 0

    _this._cx = 1; // cos rotation + skewY
    _this._sx = 0; // sin rotation + skewY
    _this._cy = 0; // cos rotation + Math.PI/2 - skewX
    _this._sy = 1; // sin rotation + Math.PI/2 - skewX

    _this._localID = 0
    _this._currentLocalID = 0
    return _this
  }

  /**
   * Called when a value changes.
   *
   * @private
   */
  TransformStatic.prototype.onChange = function onChange() {
    this._localID++
  }

  /**
   * Called when skew or rotation changes
   *
   * @private
   */
  TransformStatic.prototype.updateSkew = function updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew._y)
    this._sx = Math.sin(this._rotation + this.skew._y)
    this._cy = -Math.sin(this._rotation - this.skew._x); // cos, added PI/2
    this._sy = Math.cos(this._rotation - this.skew._x); // sin, added PI/2

    this._localID++
  }

  /**
   * Updates only local matrix
   */
  TransformStatic.prototype.updateLocalTransform = function updateLocalTransform() {
    var lt = this.localTransform

    if (this._localID !== this._currentLocalID) {
      // get the matrix values of the displayobject based on its transform properties..
      lt.a = this._cx * this.scale._x
      lt.b = this._sx * this.scale._x
      lt.c = this._cy * this.scale._y
      lt.d = this._sy * this.scale._y

      lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c)
      lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d)
      this._currentLocalID = this._localID

      // force an update..
      this._parentID = -1
    }
  }

  /**
   * Updates the values of the object and applies the parent's transform.
   *
   * @param {PIXI.Transform} parentTransform - The transform of the parent of this object
   */
  TransformStatic.prototype.updateTransform = function updateTransform(parentTransform) {
    var lt = this.localTransform

    if (this._localID !== this._currentLocalID) {
      // get the matrix values of the displayobject based on its transform properties..
      lt.a = this._cx * this.scale._x
      lt.b = this._sx * this.scale._x
      lt.c = this._cy * this.scale._y
      lt.d = this._sy * this.scale._y

      lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c)
      lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d)
      this._currentLocalID = this._localID

      // force an update..
      this._parentID = -1
    }

    if (this._parentID !== parentTransform._worldID) {
      // concat the parent matrix with the objects transform.
      var pt = parentTransform.worldTransform
      var wt = this.worldTransform

      wt.a = lt.a * pt.a + lt.b * pt.c
      wt.b = lt.a * pt.b + lt.b * pt.d
      wt.c = lt.c * pt.a + lt.d * pt.c
      wt.d = lt.c * pt.b + lt.d * pt.d
      wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx
      wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty

      this._parentID = parentTransform._worldID

      // update the id of the transform..
      this._worldID++
    }
  }

  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   *
   * @param {PIXI.Matrix} matrix - The matrix to decompose
   */
  TransformStatic.prototype.setFromMatrix = function setFromMatrix(matrix) {
    matrix.decompose(this)
    this._localID++
  }

  /**
   * The rotation of the object in radians.
   *
   * @member {number}
   */
  create_class_(TransformStatic, [{
    key: 'rotation',
    get: function get() {
      return this._rotation
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._rotation = value
      this.updateSkew()
    }
  }])

  return TransformStatic
})(TransformBase)

/**
 * Generic class to deal with traditional 2D matrix transforms
 * local transformation is calculated from position,scale,skew and rotation
 *
 * @class
 * @extends PIXI.TransformBase
 * @memberof PIXI
 */
const Transform = (_TransformBase => {
  inherits_(Transform, _TransformBase)

  function Transform() {
    class_call_check_(this, Transform)

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @member {PIXI.Point}
     */
    var _this = get_constructor_(this, _TransformBase.call(this))

    _this.position = new math.Point(0, 0)

    /**
     * The scale factor of the object.
     *
     * @member {PIXI.Point}
     */
    _this.scale = new math.Point(1, 1)

    /**
     * The skew amount, on the x and y axis.
     *
     * @member {PIXI.ObservablePoint}
     */
    _this.skew = new math.ObservablePoint(_this.updateSkew, _this, 0, 0)

    /**
     * The pivot point of the displayObject that it rotates around
     *
     * @member {PIXI.Point}
     */
    _this.pivot = new math.Point(0, 0)

    /**
     * The rotation value of the object, in radians
     *
     * @member {Number}
     * @private
     */
    _this._rotation = 0

    _this._cx = 1; // cos rotation + skewY
    _this._sx = 0; // sin rotation + skewY
    _this._cy = 0; // cos rotation + Math.PI/2 - skewX
    _this._sy = 1; // sin rotation + Math.PI/2 - skewX
    return _this
  }

  /**
   * Updates the skew values when the skew or rotation changes.
   *
   * @private
   */
  Transform.prototype.updateSkew = function updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew._y)
    this._sx = Math.sin(this._rotation + this.skew._y)
    this._cy = -Math.sin(this._rotation - this.skew._x); // cos, added PI/2
    this._sy = Math.cos(this._rotation - this.skew._x); // sin, added PI/2
  }

  /**
   * Updates only local matrix
   */
  Transform.prototype.updateLocalTransform = function updateLocalTransform() {
    var lt = this.localTransform

    lt.a = this._cx * this.scale.x
    lt.b = this._sx * this.scale.x
    lt.c = this._cy * this.scale.y
    lt.d = this._sy * this.scale.y

    lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c)
    lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d)
  }

  /**
   * Updates the values of the object and applies the parent's transform.
   *
   * @param {PIXI.Transform} parentTransform - The transform of the parent of this object
   */
  Transform.prototype.updateTransform = function updateTransform(parentTransform) {
    var lt = this.localTransform

    lt.a = this._cx * this.scale.x
    lt.b = this._sx * this.scale.x
    lt.c = this._cy * this.scale.y
    lt.d = this._sy * this.scale.y

    lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c)
    lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d)

    // concat the parent matrix with the objects transform.
    var pt = parentTransform.worldTransform
    var wt = this.worldTransform

    wt.a = lt.a * pt.a + lt.b * pt.c
    wt.b = lt.a * pt.b + lt.b * pt.d
    wt.c = lt.c * pt.a + lt.d * pt.c
    wt.d = lt.c * pt.b + lt.d * pt.d
    wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx
    wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty

    this._worldID++
  }

  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   *
   * @param {PIXI.Matrix} matrix - The matrix to decompose
   */
  Transform.prototype.setFromMatrix = function setFromMatrix(matrix) {
    matrix.decompose(this)
  }

  /**
   * The rotation of the object in radians.
   *
   * @member {number}
   */
  create_class_(Transform, [{
    key: 'rotation',
    get: function get() {
      return this._rotation
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._rotation = value
      this.updateSkew()
    }
  }])

  return Transform
})(TransformBase)


/**
 * The base class for all objects that are rendered on the screen.
 * This is an abstract class and should not be used on its own rather it should be extended.
 *
 * @class
 * @extends EventEmitter
 * @memberof PIXI
 */
const DisplayObject = (_EventEmitter => {
  inherits_(DisplayObject, _EventEmitter)
  
  function DisplayObject() {
    class_call_check_(this, DisplayObject)

    var _this = get_constructor_(this, _EventEmitter.call(this))

    var TransformClass = settings.TRANSFORM_MODE === constants.TRANSFORM_MODE.STATIC ? TransformStatic : Transform

    _this.tempDisplayObjectParent = null

    // TODO: need to create Transform from factory
    /**
     * World transform and local transform of this object.
     * This will become read-only later, please do not assign anything there unless you know what are you doing
     *
     * @member {PIXI.TransformBase}
     */
    _this.transform = new TransformClass()

    /**
     * The opacity of the object.
     *
     * @member {number}
     */
    _this.alpha = 1

    /**
     * The visibility of the object. If false the object will not be drawn, and
     * the updateTransform function will not be called.
     *
     * Only affects recursive calls from parent. You can ask for bounds or call updateTransform manually
     *
     * @member {boolean}
     */
    _this.visible = true

    /**
     * Can this object be rendered, if false the object will not be drawn but the updateTransform
     * methods will still be called.
     *
     * Only affects recursive calls from parent. You can ask for bounds manually
     *
     * @member {boolean}
     */
    _this.renderable = true

    /**
     * The display object container that contains this display object.
     *
     * @member {PIXI.Container}
     * @readonly
     */
    _this.parent = null

    /**
     * The multiplied alpha of the displayObject
     *
     * @member {number}
     * @readonly
     */
    _this.worldAlpha = 1

    /**
     * The area the filter is applied to. This is used as more of an optimisation
     * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle
     *
     * Also works as an interaction mask
     *
     * @member {PIXI.Rectangle}
     */
    _this.filterArea = null

    _this._filters = null
    _this._enabledFilters = null

    /**
     * The bounds object, this is used to calculate and store the bounds of the displayObject
     *
     * @member {PIXI.Rectangle}
     * @private
     */
    _this._bounds = new Bounds()
    _this._boundsID = 0
    _this._lastBoundsID = -1
    _this._boundsRect = null
    _this._localBoundsRect = null

    /**
     * The original, cached mask of the object
     *
     * @member {PIXI.Graphics|PIXI.Sprite}
     * @private
     */
    _this._mask = null

    /**
     * If the object has been destroyed via destroy(). If true, it should not be used.
     *
     * @member {boolean}
     * @private
     * @readonly
     */
    _this._destroyed = false

    /**
     * Fired when this DisplayObject is added to a Container.
     *
     * @event PIXI.DisplayObject#added
     * @param {PIXI.Container} container - The container added to.
     */

    /**
     * Fired when this DisplayObject is removed from a Container.
     *
     * @event PIXI.DisplayObject#removed
     * @param {PIXI.Container} container - The container removed from.
     */
    return _this
  }

  /**
   * Updates the object transform for rendering
   *
   * TODO - Optimization pass!
   */
  DisplayObject.prototype.updateTransform = function updateTransform() {
    this.transform.updateTransform(this.parent.transform)
    // multiply the alphas..
    this.worldAlpha = this.alpha * this.parent.worldAlpha

    this._bounds.updateID++
  }

  /**
   * recursively updates transform of all objects from the root to this one
   * internal function for toLocal()
   */
  DisplayObject.prototype._recursivePostUpdateTransform = function _recursivePostUpdateTransform() {
    if (this.parent) {
      this.parent._recursivePostUpdateTransform()
      this.transform.updateTransform(this.parent.transform)
    } else {
      this.transform.updateTransform(this._tempDisplayObjectParent.transform)
    }
  }

  /**
   * Retrieves the bounds of the displayObject as a rectangle object.
   *
   * @param {boolean} skipUpdate - setting to true will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost
   * @param {PIXI.Rectangle} rect - Optional rectangle to store the result of the bounds calculation
   * @return {PIXI.Rectangle} the rectangular bounding area
   */
  DisplayObject.prototype.getBounds = function getBounds(skipUpdate, rect) {
    if (!skipUpdate) {
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent
        this.updateTransform()
        this.parent = null
      } else {
        this._recursivePostUpdateTransform()
        this.updateTransform()
      }
    }

    if (this._boundsID !== this._lastBoundsID) {
      this.calculateBounds()
    }

    if (!rect) {
      if (!this._boundsRect) {
        this._boundsRect = new math.Rectangle()
      }

      rect = this._boundsRect
    }

    return this._bounds.getRectangle(rect)
  }

  /**
   * Retrieves the local bounds of the displayObject as a rectangle object
   *
   * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation
   * @return {PIXI.Rectangle} the rectangular bounding area
   */
  DisplayObject.prototype.getLocalBounds = function getLocalBounds(rect) {
    var transformRef = this.transform
    var parentRef = this.parent

    this.parent = null
    this.transform = this._tempDisplayObjectParent.transform

    if (!rect) {
      if (!this._localBoundsRect) {
        this._localBoundsRect = new math.Rectangle()
      }

      rect = this._localBoundsRect
    }

    var bounds = this.getBounds(false, rect)

    this.parent = parentRef
    this.transform = transformRef

    return bounds
  }

  /**
   * Calculates the global position of the display object
   *
   * @param {PIXI.Point} position - The world origin to calculate from
   * @param {PIXI.Point} [point] - A Point object in which to store the value, optional
   *  (otherwise will create a new Point)
   * @param {boolean} [skipUpdate=false] - Should we skip the update transform.
   * @return {PIXI.Point} A point object representing the position of this object
   */
  DisplayObject.prototype.toGlobal = function toGlobal(position, point) {
    var skipUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false

    if (!skipUpdate) {
      this._recursivePostUpdateTransform()

      // this parent check is for just in case the item is a root object.
      // If it is we need to give it a temporary parent so that displayObjectUpdateTransform works correctly
      // this is mainly to avoid a parent check in the main loop. Every little helps for performance :)
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent
        this.displayObjectUpdateTransform()
        this.parent = null
      } else {
        this.displayObjectUpdateTransform()
      }
    }

    // don't need to update the lot
    return this.worldTransform.apply(position, point)
  }

  /**
   * Calculates the local position of the display object relative to another point
   *
   * @param {PIXI.Point} position - The world origin to calculate from
   * @param {PIXI.DisplayObject} [from] - The DisplayObject to calculate the global position from
   * @param {PIXI.Point} [point] - A Point object in which to store the value, optional
   *  (otherwise will create a new Point)
   * @param {boolean} [skipUpdate=false] - Should we skip the update transform
   * @return {PIXI.Point} A point object representing the position of this object
   */
  DisplayObject.prototype.toLocal = function toLocal(position, from, point, skipUpdate) {
    if (from) {
      position = from.toGlobal(position, point, skipUpdate)
    }

    if (!skipUpdate) {
      this._recursivePostUpdateTransform()

      // this parent check is for just in case the item is a root object.
      // If it is we need to give it a temporary parent so that displayObjectUpdateTransform works correctly
      // this is mainly to avoid a parent check in the main loop. Every little helps for performance :)
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent
        this.displayObjectUpdateTransform()
        this.parent = null
      } else {
        this.displayObjectUpdateTransform()
      }
    }

    // simply apply the matrix..
    return this.worldTransform.applyInverse(position, point)
  }

  /**
   * Renders the object using the WebGL renderer
   *
   * @param {PIXI.WebGLRenderer} renderer - The renderer
   */
  DisplayObject.prototype.renderWebGL = function renderWebGL(renderer) // eslint-disable-line no-unused-vars
  { } // OVERWRITE

  /**
   * Renders the object using the Canvas renderer
   *
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  DisplayObject.prototype.renderCanvas = function renderCanvas(renderer) // eslint-disable-line no-unused-vars
  { } // OVERWRITE

  /**
   * Set the parent Container of this DisplayObject
   *
   * @param {PIXI.Container} container - The Container to add this DisplayObject to
   * @return {PIXI.Container} The Container that this DisplayObject was added to
   */
  DisplayObject.prototype.setParent = function setParent(container) {
    if (!container || !container.addChild) {
      throw new Error('setParent: Argument must be a Container')
    }

    container.addChild(this)

    return container
  }

  /**
   * Convenience function to set the position, scale, skew and pivot at once.
   *
   * @param {number} [x=0] - The X position
   * @param {number} [y=0] - The Y position
   * @param {number} [scaleX=1] - The X scale value
   * @param {number} [scaleY=1] - The Y scale value
   * @param {number} [rotation=0] - The rotation
   * @param {number} [skewX=0] - The X skew value
   * @param {number} [skewY=0] - The Y skew value
   * @param {number} [pivotX=0] - The X pivot value
   * @param {number} [pivotY=0] - The Y pivot value
   * @return {PIXI.DisplayObject} The DisplayObject instance
   */
  DisplayObject.prototype.setTransform = function setTransform() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var scaleX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
    var scaleY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1
    var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0
    var skewX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0
    var skewY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0
    var pivotX = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0
    var pivotY = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0

    this.position.x = x
    this.position.y = y
    this.scale.x = !scaleX ? 1 : scaleX
    this.scale.y = !scaleY ? 1 : scaleY
    this.rotation = rotation
    this.skew.x = skewX
    this.skew.y = skewY
    this.pivot.x = pivotX
    this.pivot.y = pivotY

    return this
  }

  /**
   * Base destroy method for generic display objects. This will automatically
   * remove the display object from its parent Container as well as remove
   * all current event listeners and internal references. Do not use a DisplayObject
   * after calling `destroy`.
   *
   */
  DisplayObject.prototype.destroy = function destroy() {
    this.removeAllListeners()
    if (this.parent) {
      this.parent.removeChild(this)
    }
    this.transform = null

    this.parent = null

    this._bounds = null
    this._currentBounds = null
    this._mask = null

    this.filterArea = null

    this.interactive = false
    this.interactiveChildren = false

    this._destroyed = true
  }

  /**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   *
   * @member {number}
   */
  create_class_(DisplayObject, [{
    key: '_tempDisplayObjectParent',
    get: function get() {
      if (this.tempDisplayObjectParent === null) {
        this.tempDisplayObjectParent = new DisplayObject()
      }

      return this.tempDisplayObjectParent
    }
  }, {
    key: 'x',
    get: function get() {
      return this.position.x
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.position.x = value
    }

    /**
     * The position of the displayObject on the y axis relative to the local coordinates of the parent.
     * An alias to position.y
     *
     * @member {number}
     */

  }, {
    key: 'y',
    get: function get() {
      return this.position.y
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.position.y = value
    }

    /**
     * Current transform of the object based on world (parent) factors
     *
     * @member {PIXI.Matrix}
     * @readonly
     */

  }, {
    key: 'worldTransform',
    get: function get() {
      return this.transform.worldTransform
    }

    /**
     * Current transform of the object based on local factors: position, scale, other stuff
     *
     * @member {PIXI.Matrix}
     * @readonly
     */

  }, {
    key: 'localTransform',
    get: function get() {
      return this.transform.localTransform
    }

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.Point|PIXI.ObservablePoint}
     */

  }, {
    key: 'position',
    get: function get() {
      return this.transform.position
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.position.copy(value)
    }

    /**
     * The scale factor of the object.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.Point|PIXI.ObservablePoint}
     */

  }, {
    key: 'scale',
    get: function get() {
      return this.transform.scale
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.scale.copy(value)
    }

    /**
     * The pivot point of the displayObject that it rotates around
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.Point|PIXI.ObservablePoint}
     */

  }, {
    key: 'pivot',
    get: function get() {
      return this.transform.pivot
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.pivot.copy(value)
    }

    /**
     * The skew factor for the object in radians.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.ObservablePoint}
     */

  }, {
    key: 'skew',
    get: function get() {
      return this.transform.skew
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.skew.copy(value)
    }

    /**
     * The rotation of the object in radians.
     *
     * @member {number}
     */

  }, {
    key: 'rotation',
    get: function get() {
      return this.transform.rotation
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.rotation = value
    }

    /**
     * Indicates if the object is globally visible.
     *
     * @member {boolean}
     * @readonly
     */

  }, {
    key: 'worldVisible',
    get: function get() {
      var item = this

      do {
        if (!item.visible) {
          return false
        }

        item = item.parent
      } while (item)

      return true
    }

    /**
     * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
     * object to the shape of the mask applied to it. In PIXI a regular mask must be a
     * PIXI.Graphics or a PIXI.Sprite object. This allows for much faster masking in canvas as it
     * utilises shape clipping. To remove a mask, set this property to null.
     *
     * @todo For the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as mask.
     *
     * @member {PIXI.Graphics|PIXI.Sprite}
     */

  }, {
    key: 'mask',
    get: function get() {
      return this._mask
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      if (this._mask) {
        this._mask.renderable = true
        this._mask.isMask = false
      }

      this._mask = value

      if (this._mask) {
        this._mask.renderable = false
        this._mask.isMask = true
      }
    }

    /**
     * Sets the filters for the displayObject.
     * * IMPORTANT: This is a webGL only feature and will be ignored by the canvas renderer.
     * To remove filters simply set this property to 'null'
     *
     * @member {PIXI.Filter[]}
     */

  }, {
    key: 'filters',
    get: function get() {
      return this._filters && this._filters.slice()
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._filters = value && value.slice()
    }
  }])

  // performance increase to avoid using call.. (10x faster)
  DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform

  return DisplayObject
})(EventEmitter)

/**
 * A Container represents a collection of display objects.
 * It is the base class of all display objects that act as a container for other objects.
 *
 *```js
 * let container = new PIXI.Container()
 * container.addChild(sprite)
 * ```
 *
 * @class
 * @extends PIXI.DisplayObject
 * @memberof PIXI
 */
const Container = (_DisplayObject => {
  inherits_(Container, _DisplayObject)

  function Container() {
    class_call_check_(this, Container)

    /**
     * The array of children of this container.
     *
     * @member {PIXI.DisplayObject[]}
     * @readonly
     */
    var _this = get_constructor_(this, _DisplayObject.call(this))

    _this.children = []
    return _this
  }

  /**
   * Overridable method that can be used by Container subclasses whenever the children array is modified
   *
   * @private
   */
  Container.prototype.onChildrenChange = function onChildrenChange() { } /* empty */

  /**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   *
   * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to add to the container
   * @return {PIXI.DisplayObject} The first child that was added.
   */
  Container.prototype.addChild = function addChild(child) {
    var argumentsLength = arguments.length

    // if there is only one argument we can bypass looping through the them
    if (argumentsLength > 1) {
      // loop through the arguments property and add all children
      // use it the right way (.length and [i]) so that this function can still be optimised by JS runtimes
      for (var i = 0; i < argumentsLength; i++) {
        this.addChild(arguments[i])
      }
    } else {
      // if the child has a parent then lets remove it as PixiJS objects can only exist in one place
      if (child.parent) {
        child.parent.removeChild(child)
      }

      child.parent = this
      // ensure child transform will be recalculated
      child.transform._parentID = -1

      this.children.push(child)

      // ensure bounds will be recalculated
      this._boundsID++

      // TODO - lets either do all callbacks or all events.. not both!
      this.onChildrenChange(this.children.length - 1)
      child.emit('added', this)
    }

    return child
  }

  /**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
   *
   * @param {PIXI.DisplayObject} child - The child to add
   * @param {number} index - The index to place the child in
   * @return {PIXI.DisplayObject} The child that was added.
   */
  Container.prototype.addChildAt = function addChildAt(child, index) {
    if (index < 0 || index > this.children.length) {
      throw new Error(child + 'addChildAt: The index ' + index + ' supplied is out of bounds ' + this.children.length)
    }

    if (child.parent) {
      child.parent.removeChild(child)
    }

    child.parent = this
    // ensure child transform will be recalculated
    child.transform._parentID = -1

    this.children.splice(index, 0, child)

    // ensure bounds will be recalculated
    this._boundsID++

    // TODO - lets either do all callbacks or all events.. not both!
    this.onChildrenChange(index)
    child.emit('added', this)

    return child
  }

  /**
   * Swaps the position of 2 Display Objects within this container.
   *
   * @param {PIXI.DisplayObject} child - First display object to swap
   * @param {PIXI.DisplayObject} child2 - Second display object to swap
   */
  Container.prototype.swapChildren = function swapChildren(child, child2) {
    if (child === child2) {
      return
    }

    var index1 = this.getChildIndex(child)
    var index2 = this.getChildIndex(child2)

    this.children[index1] = child2
    this.children[index2] = child
    this.onChildrenChange(index1 < index2 ? index1 : index2)
  }

  /**
   * Returns the index position of a child DisplayObject instance
   *
   * @param {PIXI.DisplayObject} child - The DisplayObject instance to identify
   * @return {number} The index position of the child display object to identify
   */
  Container.prototype.getChildIndex = function getChildIndex(child) {
    var index = this.children.indexOf(child)

    if (index === -1) {
      throw new Error('The supplied DisplayObject must be a child of the caller')
    }

    return index
  }

  /**
   * Changes the position of an existing child in the display object container
   *
   * @param {PIXI.DisplayObject} child - The child DisplayObject instance for which you want to change the index number
   * @param {number} index - The resulting index number for the child display object
   */
  Container.prototype.setChildIndex = function setChildIndex(child, index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error('The index ' + index + ' supplied is out of bounds ' + this.children.length)
    }

    var currentIndex = this.getChildIndex(child)

    void (0, utils.removeItems)(this.children, currentIndex, 1); // remove from old position
    this.children.splice(index, 0, child); // add at new position

    this.onChildrenChange(index)
  }

  /**
   * Returns the child at the specified index
   *
   * @param {number} index - The index to get the child at
   * @return {PIXI.DisplayObject} The child at the given index, if any.
   */
  Container.prototype.getChildAt = function getChildAt(index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error('getChildAt: Index (' + index + ') does not exist.')
    }

    return this.children[index]
  }

  /**
   * Removes one or more children from the container.
   *
   * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to remove
   * @return {PIXI.DisplayObject} The first child that was removed.
   */
  Container.prototype.removeChild = function removeChild(child) {
    var argumentsLength = arguments.length

    // if there is only one argument we can bypass looping through the them
    if (argumentsLength > 1) {
      // loop through the arguments property and add all children
      // use it the right way (.length and [i]) so that this function can still be optimised by JS runtimes
      for (var i = 0; i < argumentsLength; i++) {
        this.removeChild(arguments[i])
      }
    } else {
      var index = this.children.indexOf(child)

      if (index === -1) return null

      child.parent = null
      // ensure child transform will be recalculated
      child.transform._parentID = -1
      void (0, utils.removeItems)(this.children, index, 1)

      // ensure bounds will be recalculated
      this._boundsID++

      // TODO - lets either do all callbacks or all events.. not both!
      this.onChildrenChange(index)
      child.emit('removed', this)
    }

    return child
  }

  /**
   * Removes a child from the specified index position.
   *
   * @param {number} index - The index to get the child from
   * @return {PIXI.DisplayObject} The child that was removed.
   */
  Container.prototype.removeChildAt = function removeChildAt(index) {
    var child = this.getChildAt(index)

    // ensure child transform will be recalculated..
    child.parent = null
    child.transform._parentID = -1
    void (0, utils.removeItems)(this.children, index, 1)

    // ensure bounds will be recalculated
    this._boundsID++

    // TODO - lets either do all callbacks or all events.. not both!
    this.onChildrenChange(index)
    child.emit('removed', this)

    return child
  }

  /**
   * Removes all children from this container that are within the begin and end indexes.
   *
   * @param {number} [beginIndex=0] - The beginning position.
   * @param {number} [endIndex=this.children.length] - The ending position. Default value is size of the container.
   * @returns {DisplayObject[]} List of removed children
   */
  Container.prototype.removeChildren = function removeChildren() {
    var beginIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    var endIndex = arguments[1]

    var begin = beginIndex
    var end = typeof endIndex === 'number' ? endIndex : this.children.length
    var range = end - begin
    var removed = void 0

    if (range > 0 && range <= end) {
      removed = this.children.splice(begin, range)

      for (var i = 0; i < removed.length; ++i) {
        removed[i].parent = null
        if (removed[i].transform) {
          removed[i].transform._parentID = -1
        }
      }

      this._boundsID++

      this.onChildrenChange(beginIndex)

      for (var _i = 0; _i < removed.length; ++_i) {
        removed[_i].emit('removed', this)
      }

      return removed
    } else if (range === 0 && this.children.length === 0) {
      return []
    }

    throw new RangeError('removeChildren: numeric values are outside the acceptable range.')
  }

  /**
   * Updates the transform on all children of this container for rendering
   */
  Container.prototype.updateTransform = function updateTransform() {
    this._boundsID++

    this.transform.updateTransform(this.parent.transform)

    // TODO: check render flags, how to process stuff here
    this.worldAlpha = this.alpha * this.parent.worldAlpha

    for (var i = 0, j = this.children.length; i < j; ++i) {
      var child = this.children[i]

      if (child.visible) {
        child.updateTransform()
      }
    }
  }

  /**
   * Recalculates the bounds of the container.
   *
   */
  Container.prototype.calculateBounds = function calculateBounds() {
    this._bounds.clear()

    this._calculateBounds()

    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i]

      if (!child.visible || !child.renderable) {
        continue
      }

      child.calculateBounds()

      // TODO: filter+mask, need to mask both somehow
      if (child._mask) {
        child._mask.calculateBounds()
        this._bounds.addBoundsMask(child._bounds, child._mask._bounds)
      } else if (child.filterArea) {
        this._bounds.addBoundsArea(child._bounds, child.filterArea)
      } else {
        this._bounds.addBounds(child._bounds)
      }
    }

    this._lastBoundsID = this._boundsID
  }

  /**
   * Recalculates the bounds of the object. Override this to
   * calculate the bounds of the specific object (not including children).
   *
   */
  Container.prototype._calculateBounds = function _calculateBounds() { } // FILL IN//

  /**
   * Renders the object using the WebGL renderer
   *
   * @param {PIXI.WebGLRenderer} renderer - The renderer
   */
  Container.prototype.renderWebGL = function renderWebGL(renderer) {
    // if the object is not visible or the alpha is 0 then no need to render this element
    if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
      return
    }

    // do a quick check to see if this element has a mask or a filter.
    if (this._mask || this._filters) {
      this.renderAdvancedWebGL(renderer)
    } else {
      this._renderWebGL(renderer)

      // simple render children!
      for (var i = 0, j = this.children.length; i < j; ++i) {
        this.children[i].renderWebGL(renderer)
      }
    }
  }

  /**
   * Render the object using the WebGL renderer and advanced features.
   *
   * @private
   * @param {PIXI.WebGLRenderer} renderer - The renderer
   */
  Container.prototype.renderAdvancedWebGL = function renderAdvancedWebGL(renderer) {
    renderer.flush()

    var filters = this._filters
    var mask = this._mask

    // push filter first as we need to ensure the stencil buffer is correct for any masking
    if (filters) {
      if (!this._enabledFilters) {
        this._enabledFilters = []
      }

      this._enabledFilters.length = 0

      for (var i = 0; i < filters.length; i++) {
        if (filters[i].enabled) {
          this._enabledFilters.push(filters[i])
        }
      }

      if (this._enabledFilters.length) {
        renderer.filterManager.pushFilter(this, this._enabledFilters)
      }
    }

    if (mask) {
      renderer.maskManager.pushMask(this, this._mask)
    }

    // add this object to the batch, only rendered if it has a texture.
    this._renderWebGL(renderer)

    // now loop through the children and make sure they get rendered
    for (var _i2 = 0, j = this.children.length; _i2 < j; _i2++) {
      this.children[_i2].renderWebGL(renderer)
    }

    renderer.flush()

    if (mask) {
      renderer.maskManager.popMask(this, this._mask)
    }

    if (filters && this._enabledFilters && this._enabledFilters.length) {
      renderer.filterManager.popFilter()
    }
  }

  /**
   * To be overridden by the subclasses.
   *
   * @private
   * @param {PIXI.WebGLRenderer} renderer - The renderer
   */
  Container.prototype._renderWebGL = function _renderWebGL(renderer) // eslint-disable-line no-unused-vars
  { } // this is where content itself gets rendered...

  /**
   * To be overridden by the subclass
   *
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  Container.prototype._renderCanvas = function _renderCanvas(renderer) // eslint-disable-line no-unused-vars
  { } // this is where content itself gets rendered...

  /**
   * Renders the object using the Canvas renderer
   *
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  Container.prototype.renderCanvas = function renderCanvas(renderer) {
    // if not visible or the alpha is 0 then no need to render this
    if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
      return
    }

    if (this._mask) {
      renderer.maskManager.pushMask(this._mask)
    }

    this._renderCanvas(renderer)
    for (var i = 0, j = this.children.length; i < j; ++i) {
      this.children[i].renderCanvas(renderer)
    }

    if (this._mask) {
      renderer.maskManager.popMask(renderer)
    }
  }

  /**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   *
   * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */
  Container.prototype.destroy = function destroy(options) {
    _DisplayObject.prototype.destroy.call(this)

    var destroyChildren = typeof options === 'boolean' ? options : options && options.children

    var oldChildren = this.removeChildren(0, this.children.length)

    if (destroyChildren) {
      for (var i = 0; i < oldChildren.length; ++i) {
        oldChildren[i].destroy(options)
      }
    }
  }

  /**
   * The width of the Container, setting this will actually modify the scale to achieve the value set
   *
   * @member {number}
   */
  create_class_(Container, [{
    key: 'width',
    get: function get() {
      return this.scale.x * this.getLocalBounds().width
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      var width = this.getLocalBounds().width

      if (width !== 0) {
        this.scale.x = value / width
      } else {
        this.scale.x = 1
      }

      this._width = value
    }

    /**
     * The height of the Container, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this.scale.y * this.getLocalBounds().height
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      var height = this.getLocalBounds().height

      if (height !== 0) {
        this.scale.y = value / height
      } else {
        this.scale.y = 1
      }

      this._height = value
    }
  }])

  // performance increase to avoid using call.. (10x faster)
  Container.prototype.containerUpdateTransform = Container.prototype.updateTransform
  return Container
})(DisplayObject)

/**
 * Wrapper class, webGL Shader for Pixi.
 * Adds precision string if vertexSrc or fragmentSrc have no mention of it.
 *
 * @class
 * @extends GLShader
 * @memberof PIXI
 */
const Shader = (_GLShader => {
  inherits_(Shader, _GLShader)

  /**
   *
   * @param {WebGLRenderingContext} gl - The current WebGL rendering context
   * @param {string|string[]} vertexSrc - The vertex shader source as an array of strings.
   * @param {string|string[]} fragmentSrc - The fragment shader source as an array of strings.
   * @param {object} [attributeLocations] - A key value pair showing which location eact attribute should sit.
                     e.g. {position:0, uvs:1}.
   * @param {string} [precision] - The float precision of the shader. Options are 'lowp', 'mediump' or 'highp'.
   */
  function Shader(gl, vertexSrc, fragmentSrc, attributeLocations, precision) {
    class_call_check_(this, Shader)

    return get_constructor_(this, _GLShader.call(
      this, gl,
      checkPrecision(vertexSrc, precision || settings.PRECISION_VERTEX),
      checkPrecision(fragmentSrc, precision || settings.PRECISION_FRAGMENT),
      undefined, attributeLocations
    )
    )
  }

  function checkPrecision(src, def) {
    if (src instanceof Array) {
      if (src[0].substring(0, 9) !== 'precision') {
        var copy = src.slice(0)

        copy.unshift('precision ' + def + ' float;')

        return copy
      }
    } else if (src.trim().substring(0, 9) !== 'precision') {
      return 'precision ' + def + ' float;\n' + src
    }

    return src
  }

  return Shader
})(GLShader)

const determineCrossOrigin = (() => {

  let tempAnchor = void 0
  const _url = url

  /**
   * Sets the `crossOrigin` property for this resource based on if the url
   * for this resource is cross-origin. If crossOrigin was manually set, this
   * function does nothing.
   * Nipped from the resource loader!
   *
   * @ignore
   * @param {string} url - The url to test.
   * @param {object} [loc=window.location] - The location object to test against.
   * @return {string} The crossOrigin value to use (or empty string for none).
   */
  function determineCrossOrigin(url) {
    var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location

    // data: and javascript: urls are considered same-origin
    if (url.indexOf('data:') === 0) {
      return ''
    }

    // default is window.location
    loc = loc || window.location

    if (!tempAnchor) {
      tempAnchor = document.createElement('a')
    }

    // let the browser determine the full href for the url of this resource and then
    // parse with the node url lib, we can't use the properties of the anchor element
    // because they don't work in IE9 :(
    tempAnchor.href = url
    url = _url.parse(tempAnchor.href)

    var samePort = !url.port && loc.port === '' || url.port === loc.port

    // if cross origin
    if (url.hostname !== loc.hostname || !samePort || url.protocol !== loc.protocol) {
      return 'anonymous'
    }

    return ''
  }

  return determineCrossOrigin
})()

/**
 * A Ticker class that runs an update loop that other objects listen to.
 * This class is composed around listeners
 * meant for execution on the next requested animation frame.
 * Animation frames are requested only when necessary,
 * e.g. When the ticker is started and the emitter has listeners.
 *
 * @class
 * @memberof PIXI.ticker
 */
const Ticker = (() => {
  
  function Ticker() {
    var _this = this

    class_call_check_(this, Ticker)

    /**
     * The first listener. All new listeners added are chained on this.
     * @private
     * @type {TickerListener}
     */
    this._head = new TickerListener(null, null, Infinity)

    /**
     * Internal current frame request ID
     * @private
     */
    this._requestId = null

    /**
     * Internal value managed by minFPS property setter and getter.
     * This is the maximum allowed milliseconds between updates.
     * @private
     */
    this._maxElapsedMS = 100

    /**
     * Whether or not this ticker should invoke the method
     * {@link PIXI.ticker.Ticker#start} automatically
     * when a listener is added.
     *
     * @member {boolean}
     * @default false
     */
    this.autoStart = false

    /**
     * Scalar time value from last frame to this frame.
     * This value is capped by setting {@link PIXI.ticker.Ticker#minFPS}
     * and is scaled with {@link PIXI.ticker.Ticker#speed}.
     * **Note:** The cap may be exceeded by scaling.
     *
     * @member {number}
     * @default 1
     */
    this.deltaTime = 1

    /**
     * Time elapsed in milliseconds from last frame to this frame.
     * Opposed to what the scalar {@link PIXI.ticker.Ticker#deltaTime}
     * is based, this value is neither capped nor scaled.
     * If the platform supports DOMHighResTimeStamp,
     * this value will have a precision of 1 µs.
     * Defaults to target frame time
     *
     * @member {number}
     * @default 16.66
     */
    this.elapsedMS = 1 / settings.TARGET_FPMS

    /**
     * The last time {@link PIXI.ticker.Ticker#update} was invoked.
     * This value is also reset internally outside of invoking
     * update, but only when a new animation frame is requested.
     * If the platform supports DOMHighResTimeStamp,
     * this value will have a precision of 1 µs.
     *
     * @member {number}
     * @default -1
     */
    this.lastTime = -1

    /**
     * Factor of current {@link PIXI.ticker.Ticker#deltaTime}.
     * @example
     * // Scales ticker.deltaTime to what would be
     * // the equivalent of approximately 120 FPS
     * ticker.speed = 2
     *
     * @member {number}
     * @default 1
     */
    this.speed = 1

    /**
     * Whether or not this ticker has been started.
     * `true` if {@link PIXI.ticker.Ticker#start} has been called.
     * `false` if {@link PIXI.ticker.Ticker#stop} has been called.
     * While `false`, this value may change to `true` in the
     * event of {@link PIXI.ticker.Ticker#autoStart} being `true`
     * and a listener is added.
     *
     * @member {boolean}
     * @default false
     */
    this.started = false

    /**
     * Internal tick method bound to ticker instance.
     * This is because in early 2015, Function.bind
     * is still 60% slower in high performance scenarios.
     * Also separating frame requests from update method
     * so listeners may be called at any time and with
     * any animation API, just invoke ticker.update(time).
     *
     * @private
     * @param {number} time - Time since last tick.
     */
    this._tick = function (time) {
      _this._requestId = null

      if (_this.started) {
        // Invoke listeners now
        _this.update(time)
        // Listener side effects may have modified ticker state.
        if (_this.started && _this._requestId === null && _this._head.next) {
          _this._requestId = requestAnimationFrame(_this._tick)
        }
      }
    }
  }

  /**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   *
   * @private
   */
  Ticker.prototype._requestIfNeeded = function _requestIfNeeded() {
    if (this._requestId === null && this._head.next) {
      // ensure callbacks get correct delta
      this.lastTime = performance.now()
      this._requestId = requestAnimationFrame(this._tick)
    }
  }

  /**
   * Conditionally cancels a pending animation frame.
   *
   * @private
   */
  Ticker.prototype._cancelIfNeeded = function _cancelIfNeeded() {
    if (this._requestId !== null) {
      cancelAnimationFrame(this._requestId)
      this._requestId = null
    }
  }

  /**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   *
   * @private
   */
  Ticker.prototype._startIfPossible = function _startIfPossible() {
    if (this.started) {
      this._requestIfNeeded()
    } else if (this.autoStart) {
      this.start()
    }
  }

  /**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   *
   * @param {Function} fn - The listener function to be added for updates
   * @param {Function} [context] - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns {PIXI.ticker.Ticker} This instance of a ticker
   */
  Ticker.prototype.add = function add(fn, context) {
    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants.UPDATE_PRIORITY.NORMAL

    return this._addListener(new TickerListener(fn, context, priority))
  }

  /**
   * Add a handler for the tick event which is only execute once.
   *
   * @param {Function} fn - The listener function to be added for one update
   * @param {Function} [context] - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns {PIXI.ticker.Ticker} This instance of a ticker
   */
  Ticker.prototype.addOnce = function addOnce(fn, context) {
    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants.UPDATE_PRIORITY.NORMAL

    return this._addListener(new TickerListener(fn, context, priority, true))
  }

  /**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   *
   * @private
   * @param {TickerListener} listener - Current listener being added.
   * @returns {PIXI.ticker.Ticker} This instance of a ticker
   */
  Ticker.prototype._addListener = function _addListener(listener) {
    // For attaching to head
    var current = this._head.next
    var previous = this._head

    // Add the first item
    if (!current) {
      listener.connect(previous)
    } else {
      // Go from highest to lowest priority
      while (current) {
        if (listener.priority > current.priority) {
          listener.connect(previous)
          break
        }
        previous = current
        current = current.next
      }

      // Not yet connected
      if (!listener.previous) {
        listener.connect(previous)
      }
    }

    this._startIfPossible()

    return this
  }

  /**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   *
   * @param {Function} fn - The listener function to be removed
   * @param {Function} [context] - The listener context to be removed
   * @returns {PIXI.ticker.Ticker} This instance of a ticker
   */
  Ticker.prototype.remove = function remove(fn, context) {
    var listener = this._head.next

    while (listener) {
      // We found a match, lets remove it
      // no break to delete all possible matches
      // incase a listener was added 2+ times
      if (listener.match(fn, context)) {
        listener = listener.destroy()
      } else {
        listener = listener.next
      }
    }

    if (!this._head.next) {
      this._cancelIfNeeded()
    }

    return this
  }

  /**
   * Starts the ticker. If the ticker has listeners
   * a new animation frame is requested at this point.
   */
  Ticker.prototype.start = function start() {
    if (!this.started) {
      this.started = true
      this._requestIfNeeded()
    }
  }

  /**
   * Stops the ticker. If the ticker has requested
   * an animation frame it is canceled at this point.
   */
  Ticker.prototype.stop = function stop() {
    if (this.started) {
      this.started = false
      this._cancelIfNeeded()
    }
  }

  /**
   * Destroy the ticker and don't use after this. Calling
   * this method removes all references to internal events.
   */
  Ticker.prototype.destroy = function destroy() {
    this.stop()

    var listener = this._head.next

    while (listener) {
      listener = listener.destroy(true)
    }

    this._head.destroy()
    this._head = null
  }

  /**
   * Triggers an update. An update entails setting the
   * current {@link PIXI.ticker.Ticker#elapsedMS},
   * the current {@link PIXI.ticker.Ticker#deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link PIXI.ticker.Ticker#lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   *
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */
  Ticker.prototype.update = function update() {
    var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : performance.now()

    var elapsedMS = void 0

    // If the difference in time is zero or negative, we ignore most of the work done here.
    // If there is no valid difference, then should be no reason to let anyone know about it.
    // A zero delta, is exactly that, nothing should update.
    //
    // The difference in time can be negative, and no this does not mean time traveling.
    // This can be the result of a race condition between when an animation frame is requested
    // on the current JavaScript engine event loop, and when the ticker's start method is invoked
    // (which invokes the internal _requestIfNeeded method). If a frame is requested before
    // _requestIfNeeded is invoked, then the callback for the animation frame the ticker requests,
    // can receive a time argument that can be less than the lastTime value that was set within
    // _requestIfNeeded. This difference is in microseconds, but this is enough to cause problems.
    //
    // This check covers this browser engine timing issue, as well as if consumers pass an invalid
    // currentTime value. This may happen if consumers opt-out of the autoStart, and update themselves.

    if (currentTime > this.lastTime) {
      // Save uncapped elapsedMS for measurement
      elapsedMS = this.elapsedMS = currentTime - this.lastTime

      // cap the milliseconds elapsed used for deltaTime
      if (elapsedMS > this._maxElapsedMS) {
        elapsedMS = this._maxElapsedMS
      }

      this.deltaTime = elapsedMS * settings.TARGET_FPMS * this.speed

      // Cache a local reference, in-case ticker is destroyed
      // during the emit, we can still check for head.next
      var head = this._head

      // Invoke listeners added to internal emitter
      var listener = head.next

      while (listener) {
        listener = listener.emit(this.deltaTime)
      }

      if (!head.next) {
        this._cancelIfNeeded()
      }
    } else {
      this.deltaTime = this.elapsedMS = 0
    }

    this.lastTime = currentTime
  }

  /**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link PIXI.ticker.Ticker#speed}, which is specific
   * to scaling {@link PIXI.ticker.Ticker#deltaTime}.
   *
   * @member {number}
   * @readonly
   */
  create_class_(Ticker, [{
    key: 'FPS',
    get: function get() {
      return 1000 / this.elapsedMS
    }

    /**
     * Manages the maximum amount of milliseconds allowed to
     * elapse between invoking {@link PIXI.ticker.Ticker#update}.
     * This value is used to cap {@link PIXI.ticker.Ticker#deltaTime},
     * but does not effect the measured value of {@link PIXI.ticker.Ticker#FPS}.
     * When setting this property it is clamped to a value between
     * `0` and `PIXI.settings.TARGET_FPMS * 1000`.
     *
     * @member {number}
     * @default 10
     */

  }, {
    key: 'minFPS',
    get: function get() {
      return 1000 / this._maxElapsedMS
    },
    set: function set(fps) // eslint-disable-line require-jsdoc
    {
      // Clamp: 0 to TARGET_FPMS
      var minFPMS = Math.min(Math.max(0, fps) / 1000, settings.TARGET_FPMS)

      this._maxElapsedMS = 1 / minFPMS
    }
  }])

  return Ticker
})()

const ticker = (() => {
  /**
   * The shared ticker instance used by {@link PIXI.extras.AnimatedSprite}.
   * and by {@link PIXI.interaction.InteractionManager}.
   * The property {@link PIXI.ticker.Ticker#autoStart} is set to `true`
   * for this instance. Please follow the examples for usage, including
   * how to opt-out of auto-starting the shared ticker.
   *
   * @example
   * let ticker = PIXI.ticker.shared
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the PIXI.ticker.shared instance.
   * ticker.autoStart = false
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop()
   * // Call this when you are ready for a running shared ticker.
   * ticker.start()
   *
   * @example
   * // You may use the shared ticker to render...
   * let renderer = PIXI.autoDetectRenderer(800, 600)
   * let stage = new PIXI.Container()
   * let interactionManager = PIXI.interaction.InteractionManager(renderer)
   * document.body.appendChild(renderer.view)
   * ticker.add(function (time) {
   *     renderer.render(stage)
   * })
   *
   * @example
   * // Or you can just update it manually.
   * ticker.autoStart = false
   * ticker.stop()
   * function animate(time) {
   *     ticker.update(time)
   *     renderer.render(stage)
   *     requestAnimationFrame(animate)
   * }
   * animate(performance.now())
   *
   * @type {PIXI.ticker.Ticker}
   * @memberof PIXI.ticker
   */
  var shared = new Ticker()

  shared.autoStart = true
  shared.destroy = function () {
    // protect destroying shared ticker
    // this is used by other internal systems
    // like AnimatedSprite and InteractionManager
  }

  /**
   * This namespace contains an API for interacting with PIXI's internal global update loop.
   *
   * This ticker is used for rendering, {@link PIXI.extras.AnimatedSprite AnimatedSprite},
   * {@link PIXI.interaction.InteractionManager InteractionManager} and many other time-based PIXI systems.
   * @example
   * const ticker = new PIXI.ticker.Ticker()
   * ticker.stop()
   * ticker.add((deltaTime) => {
   *   // do something every frame
   * })
   * ticker.start()
   * @namespace PIXI.ticker
   */
  return { shared, Ticker }
})()

/**
 * A texture stores the information that represents an image. All textures have a base texture.
 *
 * @class
 * @extends EventEmitter
 * @memberof PIXI
 */
var BaseTexture = (_EventEmitter => {
  inherits_(BaseTexture, _EventEmitter)

  /**
   * @param {HTMLImageElement|HTMLCanvasElement} [source] - the source object of the texture.
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [resolution=1] - The resolution / device pixel ratio of the texture
   */
  function BaseTexture(source, scaleMode, resolution) {
    class_call_check_(this, BaseTexture)

    var _this = get_constructor_(this, _EventEmitter.call(this))

    _this.uid = (0, utils.uid)()

    _this.touched = 0

    /**
     * The resolution / device pixel ratio of the texture
     *
     * @member {number}
     * @default 1
     */
    _this.resolution = resolution || settings.RESOLUTION

    /**
     * The width of the base texture set when the image has loaded
     *
     * @readonly
     * @member {number}
     */
    _this.width = 100

    /**
     * The height of the base texture set when the image has loaded
     *
     * @readonly
     * @member {number}
     */
    _this.height = 100

    // TODO docs
    // used to store the actual dimensions of the source
    /**
     * Used to store the actual width of the source of this texture
     *
     * @readonly
     * @member {number}
     */
    _this.realWidth = 100
    /**
     * Used to store the actual height of the source of this texture
     *
     * @readonly
     * @member {number}
     */
    _this.realHeight = 100

    /**
     * The scale mode to apply when scaling this texture
     *
     * @member {number}
     * @default PIXI.settings.SCALE_MODE
     * @see PIXI.SCALE_MODES
     */
    _this.scaleMode = scaleMode !== undefined ? scaleMode : settings.SCALE_MODE

    /**
     * Set to true once the base texture has successfully loaded.
     *
     * This is never true if the underlying source fails to load or has no texture data.
     *
     * @readonly
     * @member {boolean}
     */
    _this.hasLoaded = false

    /**
     * Set to true if the source is currently loading.
     *
     * If an Image source is loading the 'loaded' or 'error' event will be
     * dispatched when the operation ends. An underyling source that is
     * immediately-available bypasses loading entirely.
     *
     * @readonly
     * @member {boolean}
     */
    _this.isLoading = false

    /**
     * The image source that is used to create the texture.
     *
     * TODO: Make this a setter that calls loadSource()
     *
     * @readonly
     * @member {HTMLImageElement|HTMLCanvasElement}
     */
    _this.source = null; // set in loadSource, if at all

    /**
     * The image source that is used to create the texture. This is used to
     * store the original Svg source when it is replaced with a canvas element.
     *
     * TODO: Currently not in use but could be used when re-scaling svg.
     *
     * @readonly
     * @member {Image}
     */
    _this.origSource = null; // set in loadSvg, if at all

    /**
     * Type of image defined in source, eg. `png` or `svg`
     *
     * @readonly
     * @member {string}
     */
    _this.imageType = null; // set in updateImageType

    /**
     * Scale for source image. Used with Svg images to scale them before rasterization.
     *
     * @readonly
     * @member {number}
     */
    _this.sourceScale = 1.0

    /**
     * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)
     * All blend modes, and shaders written for default value. Change it on your own risk.
     *
     * @member {boolean}
     * @default true
     */
    _this.premultipliedAlpha = true

    /**
     * The image url of the texture
     *
     * @member {string}
     */
    _this.imageUrl = null

    /**
     * Whether or not the texture is a power of two, try to use power of two textures as much
     * as you can
     *
     * @private
     * @member {boolean}
     */
    _this.isPowerOfTwo = false

    // used for webGL

    /**
     *
     * Set this to true if a mipmap of this texture needs to be generated. This value needs
     * to be set before the texture is used
     * Also the texture must be a power of two size to work
     *
     * @member {boolean}
     * @see PIXI.MIPMAP_TEXTURES
     */
    _this.mipmap = settings.MIPMAP_TEXTURES

    /**
     *
     * WebGL Texture wrap mode
     *
     * @member {number}
     * @see PIXI.WRAP_MODES
     */
    _this.wrapMode = settings.WRAP_MODE

    /**
     * A map of renderer IDs to webgl textures
     *
     * @private
     * @member {object<number, WebGLTexture>}
     */
    _this._glTextures = {}

    _this._enabled = 0
    _this._virtalBoundId = -1

    /**
     * If the object has been destroyed via destroy(). If true, it should not be used.
     *
     * @member {boolean}
     * @private
     * @readonly
     */
    _this._destroyed = false

    /**
     * The ids under which this BaseTexture has been added to the base texture cache. This is
     * automatically set as long as BaseTexture.addToCache is used, but may not be set if a
     * BaseTexture is added directly to the BaseTextureCache array.
     *
     * @member {string[]}
     */
    _this.textureCacheIds = []

    // if no source passed don't try to load
    if (source) {
      _this.loadSource(source)
    }

    /**
     * Fired when a not-immediately-available source finishes loading.
     *
     * @protected
     * @event PIXI.BaseTexture#loaded
     * @param {PIXI.BaseTexture} baseTexture - Resource loaded.
     */

    /**
     * Fired when a not-immediately-available source fails to load.
     *
     * @protected
     * @event PIXI.BaseTexture#error
     * @param {PIXI.BaseTexture} baseTexture - Resource errored.
     */

    /**
     * Fired when BaseTexture is updated.
     *
     * @protected
     * @event PIXI.BaseTexture#update
     * @param {PIXI.BaseTexture} baseTexture - Instance of texture being updated.
     */

    /**
     * Fired when BaseTexture is destroyed.
     *
     * @protected
     * @event PIXI.BaseTexture#dispose
     * @param {PIXI.BaseTexture} baseTexture - Instance of texture being destroyed.
     */
    return _this
  }

  /**
   * Updates the texture on all the webgl renderers, this also assumes the src has changed.
   *
   * @fires PIXI.BaseTexture#update
   */
  BaseTexture.prototype.update = function update() {
    // Svg size is handled during load
    if (this.imageType !== 'svg') {
      this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width
      this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height

      this._updateDimensions()
    }

    this.emit('update', this)
  }

  /**
   * Update dimensions from real values
   */
  BaseTexture.prototype._updateDimensions = function _updateDimensions() {
    this.width = this.realWidth / this.resolution
    this.height = this.realHeight / this.resolution

    this.isPowerOfTwo = bit_twiddle.isPow2(this.realWidth) && bit_twiddle.isPow2(this.realHeight)
  }

  /**
   * Load a source.
   *
   * If the source is not-immediately-available, such as an image that needs to be
   * downloaded, then the 'loaded' or 'error' event will be dispatched in the future
   * and `hasLoaded` will remain false after this call.
   *
   * The logic state after calling `loadSource` directly or indirectly (eg. `fromImage`, `new BaseTexture`) is:
   *
   *     if (texture.hasLoaded) {
   *        // texture ready for use
   *     } else if (texture.isLoading) {
   *        // listen to 'loaded' and/or 'error' events on texture
   *     } else {
   *        // not loading, not going to load UNLESS the source is reloaded
   *        // (it may still make sense to listen to the events)
   *     }
   *
   * @protected
   * @param {HTMLImageElement|HTMLCanvasElement} source - the source object of the texture.
   */
  BaseTexture.prototype.loadSource = function loadSource(source) {
    var wasLoading = this.isLoading

    this.hasLoaded = false
    this.isLoading = false

    if (wasLoading && this.source) {
      this.source.onload = null
      this.source.onerror = null
    }

    var firstSourceLoaded = !this.source

    this.source = source

    // Apply source if loaded. Otherwise setup appropriate loading monitors.
    if ((source.src && source.complete || source.getContext) && source.width && source.height) {
      this._updateImageType()

      if (this.imageType === 'svg') {
        this._loadSvgSource()
      } else {
        this._sourceLoaded()
      }

      if (firstSourceLoaded) {
        // send loaded event if previous source was null and we have been passed a pre-loaded IMG element
        this.emit('loaded', this)
      }
    } else if (!source.getContext) {
      // Image fail / not ready
      this.isLoading = true

      var scope = this

      source.onload = function () {
        scope._updateImageType()
        source.onload = null
        source.onerror = null

        if (!scope.isLoading) {
          return
        }

        scope.isLoading = false
        scope._sourceLoaded()

        if (scope.imageType === 'svg') {
          scope._loadSvgSource()

          return
        }

        scope.emit('loaded', scope)
      }

      source.onerror = function () {
        source.onload = null
        source.onerror = null

        if (!scope.isLoading) {
          return
        }

        scope.isLoading = false
        scope.emit('error', scope)
      }

      // Per http://www.w3.org/TR/html5/embedded-content-0.html#the-img-element
      //   "The value of `complete` can thus change while a script is executing."
      // So complete needs to be re-checked after the callbacks have been added..
      // NOTE: complete will be true if the image has no src so best to check if the src is set.
      if (source.complete && source.src) {
        // ..and if we're complete now, no need for callbacks
        source.onload = null
        source.onerror = null

        if (scope.imageType === 'svg') {
          scope._loadSvgSource()

          return
        }

        this.isLoading = false

        if (source.width && source.height) {
          this._sourceLoaded()

          // If any previous subscribers possible
          if (wasLoading) {
            this.emit('loaded', this)
          }
        }
        // If any previous subscribers possible
        else if (wasLoading) {
          this.emit('error', this)
        }
      }
    }
  }

  /**
   * Updates type of the source image.
   */
  BaseTexture.prototype._updateImageType = function _updateImageType() {
    if (!this.imageUrl) {
      return
    }

    var dataUri = (0, utils.decomposeDataUri)(this.imageUrl)
    var imageType = void 0

    if (dataUri && dataUri.mediaType === 'image') {
      // Check for subType validity
      var firstSubType = dataUri.subType.split('+')[0]

      imageType = (0, utils.getUrlFileExtension)('.' + firstSubType)

      if (!imageType) {
        throw new Error('Invalid image type in data URI.')
      }
    } else {
      imageType = (0, utils.getUrlFileExtension)(this.imageUrl)

      if (!imageType) {
        imageType = 'png'
      }
    }

    this.imageType = imageType
  }

  /**
   * Checks if `source` is an SVG image and whether it's loaded via a URL or a data URI. Then calls
   * `_loadSvgSourceUsingDataUri` or `_loadSvgSourceUsingXhr`.
   */
  BaseTexture.prototype._loadSvgSource = function _loadSvgSource() {
    if (this.imageType !== 'svg') {
      // Do nothing if source is not svg
      return
    }

    var dataUri = (0, utils.decomposeDataUri)(this.imageUrl)

    if (dataUri) {
      this._loadSvgSourceUsingDataUri(dataUri)
    } else {
      // We got an URL, so we need to do an XHR to check the svg size
      this._loadSvgSourceUsingXhr()
    }
  }

  /**
   * Reads an SVG string from data URI and then calls `_loadSvgSourceUsingString`.
   *
   * @param {string} dataUri - The data uri to load from.
   */
  BaseTexture.prototype._loadSvgSourceUsingDataUri = function _loadSvgSourceUsingDataUri(dataUri) {
    var svgString = void 0

    if (dataUri.encoding === 'base64') {
      if (!atob) {
        throw new Error('Your browser doesn\'t support base64 conversions.')
      }
      svgString = atob(dataUri.data)
    } else {
      svgString = dataUri.data
    }

    this._loadSvgSourceUsingString(svgString)
  }

  /**
   * Loads an SVG string from `imageUrl` using XHR and then calls `_loadSvgSourceUsingString`.
   */
  BaseTexture.prototype._loadSvgSourceUsingXhr = function _loadSvgSourceUsingXhr() {
    var _this2 = this

    var svgXhr = new XMLHttpRequest()

    // This throws error on IE, so SVG Document can't be used
    // svgXhr.responseType = 'document'

    // This is not needed since we load the svg as string (breaks IE too)
    // but overrideMimeType() can be used to force the response to be parsed as XML
    // svgXhr.overrideMimeType('image/svg+xml')

    svgXhr.onload = function () {
      if (svgXhr.readyState !== svgXhr.DONE || svgXhr.status !== 200) {
        throw new Error('Failed to load SVG using XHR.')
      }

      _this2._loadSvgSourceUsingString(svgXhr.response)
    }

    svgXhr.onerror = function () {
      return _this2.emit('error', _this2)
    }

    svgXhr.open('GET', this.imageUrl, true)
    svgXhr.send()
  }

  /**
   * Loads texture using an SVG string. The original SVG Image is stored as `origSource` and the
   * created canvas is the new `source`. The SVG is scaled using `sourceScale`. Called by
   * `_loadSvgSourceUsingXhr` or `_loadSvgSourceUsingDataUri`.
   *
   * @param  {string} svgString SVG source as string
   *
   * @fires PIXI.BaseTexture#loaded
   */
  BaseTexture.prototype._loadSvgSourceUsingString = function _loadSvgSourceUsingString(svgString) {
    var svgSize = (0, utils.getSvgSize)(svgString)

    var svgWidth = svgSize.width
    var svgHeight = svgSize.height

    if (!svgWidth || !svgHeight) {
      throw new Error('The SVG image must have width and height defined (in pixels), canvas API needs them.')
    }

    // Scale realWidth and realHeight
    this.realWidth = Math.round(svgWidth * this.sourceScale)
    this.realHeight = Math.round(svgHeight * this.sourceScale)

    this._updateDimensions()

    // Create a canvas element
    var canvas = document.createElement('canvas')

    canvas.width = this.realWidth
    canvas.height = this.realHeight
    canvas._pixiId = 'canvas_' + (0, utils.uid)()

    // Draw the Svg to the canvas
    canvas.getContext('2d').drawImage(this.source, 0, 0, svgWidth, svgHeight, 0, 0, this.realWidth, this.realHeight)

    // Replace the original source image with the canvas
    this.origSource = this.source
    this.source = canvas

    // Add also the canvas in cache (destroy clears by `imageUrl` and `source._pixiId`)
    BaseTexture.addToCache(this, canvas._pixiId)

    this.isLoading = false
    this._sourceLoaded()
    this.emit('loaded', this)
  }

  /**
   * Used internally to update the width, height, and some other tracking vars once
   * a source has successfully loaded.
   *
   * @private
   */
  BaseTexture.prototype._sourceLoaded = function _sourceLoaded() {
    this.hasLoaded = true
    this.update()
  }

  /**
   * Destroys this base texture
   *
   */
  BaseTexture.prototype.destroy = function destroy() {
    if (this.imageUrl) {
      delete utils.TextureCache[this.imageUrl]

      this.imageUrl = null

      if (!navigator.isCocoonJS) {
        this.source.src = ''
      }
    }

    this.source = null

    this.dispose()

    BaseTexture.removeFromCache(this)
    this.textureCacheIds = null

    this._destroyed = true
  }

  /**
   * Frees the texture from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   *
   * @fires PIXI.BaseTexture#dispose
   */
  BaseTexture.prototype.dispose = function dispose() {
    this.emit('dispose', this)
  }

  /**
   * Changes the source image of the texture.
   * The original source must be an Image element.
   *
   * @param {string} newSrc - the path of the image
   */
  BaseTexture.prototype.updateSourceImage = function updateSourceImage(newSrc) {
    this.source.src = newSrc

    this.loadSource(this.source)
  }

  /**
   * Helper function that creates a base texture from the given image url.
   * If the image is not in the base texture cache it will be created and loaded.
   *
   * @static
   * @param {string} imageUrl - The image url of the texture
   * @param {boolean} [crossorigin=(auto)] - Should use anonymous CORS? Defaults to true if the URL is not a data-URI.
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [sourceScale=(auto)] - Scale for the original image, used with Svg images.
   * @return {PIXI.BaseTexture} The new base texture.
   */
  BaseTexture.fromImage = function fromImage(imageUrl, crossorigin, scaleMode, sourceScale) {
    var baseTexture = utils.BaseTextureCache[imageUrl]

    if (!baseTexture) {
      // new Image() breaks tex loading in some versions of Chrome.
      // See https://code.google.com/p/chromium/issues/detail?id=238071
      var image = new Image(); // document.createElement('img')

      if (crossorigin === undefined && imageUrl.indexOf('data:') !== 0) {
        image.crossOrigin = (0, determineCrossOrigin)(imageUrl)
      } else if (crossorigin) {
        image.crossOrigin = typeof crossorigin === 'string' ? crossorigin : 'anonymous'
      }

      baseTexture = new BaseTexture(image, scaleMode)
      baseTexture.imageUrl = imageUrl

      if (sourceScale) {
        baseTexture.sourceScale = sourceScale
      }

      // if there is an @2x at the end of the url we are going to assume its a highres image
      baseTexture.resolution = (0, utils.getResolutionOfUrl)(imageUrl)

      image.src = imageUrl; // Setting this triggers load

      BaseTexture.addToCache(baseTexture, imageUrl)
    }

    return baseTexture
  }

  /**
   * Helper function that creates a base texture from the given canvas element.
   *
   * @static
   * @param {HTMLCanvasElement} canvas - The canvas element source of the texture
   * @param {number} scaleMode - See {@link PIXI.SCALE_MODES} for possible values
   * @param {string} [origin='canvas'] - A string origin of who created the base texture
   * @return {PIXI.BaseTexture} The new base texture.
   */
  BaseTexture.fromCanvas = function fromCanvas(canvas, scaleMode) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'canvas'

    if (!canvas._pixiId) {
      canvas._pixiId = origin + '_' + (0, utils.uid)()
    }

    var baseTexture = utils.BaseTextureCache[canvas._pixiId]

    if (!baseTexture) {
      baseTexture = new BaseTexture(canvas, scaleMode)
      BaseTexture.addToCache(baseTexture, canvas._pixiId)
    }

    return baseTexture
  }

  /**
   * Helper function that creates a base texture based on the source you provide.
   * The source can be - image url, image element, canvas element. If the
   * source is an image url or an image element and not in the base texture
   * cache, it will be created and loaded.
   *
   * @static
   * @param {string|HTMLImageElement|HTMLCanvasElement} source - The source to create base texture from.
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [sourceScale=(auto)] - Scale for the original image, used with Svg images.
   * @return {PIXI.BaseTexture} The new base texture.
   */
  BaseTexture.from = function from(source, scaleMode, sourceScale) {
    if (typeof source === 'string') {
      return BaseTexture.fromImage(source, undefined, scaleMode, sourceScale)
    } else if (source instanceof HTMLImageElement) {
      var imageUrl = source.src
      var baseTexture = utils.BaseTextureCache[imageUrl]

      if (!baseTexture) {
        baseTexture = new BaseTexture(source, scaleMode)
        baseTexture.imageUrl = imageUrl

        if (sourceScale) {
          baseTexture.sourceScale = sourceScale
        }

        // if there is an @2x at the end of the url we are going to assume its a highres image
        baseTexture.resolution = (0, utils.getResolutionOfUrl)(imageUrl)

        BaseTexture.addToCache(baseTexture, imageUrl)
      }

      return baseTexture
    } else if (source instanceof HTMLCanvasElement) {
      return BaseTexture.fromCanvas(source, scaleMode)
    }

    // lets assume its a base texture!
    return source
  }

  /**
   * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
   *
   * @static
   * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
   * @param {string} id - The id that the BaseTexture will be stored against.
   */
  BaseTexture.addToCache = function addToCache(baseTexture, id) {
    if (id) {
      if (baseTexture.textureCacheIds.indexOf(id) === -1) {
        baseTexture.textureCacheIds.push(id)
      }

      /* eslint-disable no-console */
      if (utils.BaseTextureCache[id]) {
        console.warn('BaseTexture added to the cache with an id [' + id + '] that already had an entry')
      }
      /* eslint-enable no-console */

      utils.BaseTextureCache[id] = baseTexture
    }
  }

  /**
   * Remove a BaseTexture from the global BaseTextureCache.
   *
   * @static
   * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
   * @return {PIXI.BaseTexture|null} The BaseTexture that was removed.
   */
  BaseTexture.removeFromCache = function removeFromCache(baseTexture) {
    if (typeof baseTexture === 'string') {
      var baseTextureFromCache = utils.BaseTextureCache[baseTexture]

      if (baseTextureFromCache) {
        var index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture)

        if (index > -1) {
          baseTextureFromCache.textureCacheIds.splice(index, 1)
        }

        delete utils.BaseTextureCache[baseTexture]

        return baseTextureFromCache
      }
    } else if (baseTexture && baseTexture.textureCacheIds) {
      for (var i = 0; i < baseTexture.textureCacheIds.length; ++i) {
        delete utils.BaseTextureCache[baseTexture.textureCacheIds[i]]
      }

      baseTexture.textureCacheIds.length = 0

      return baseTexture
    }

    return null
  }

  return BaseTexture
})(EventEmitter)

/**
 * A texture of a [playing] Video.
 *
 * Video base textures mimic PixiJS BaseTexture.from.... method in their creation process.
 *
 * This can be used in several ways, such as:
 *
 * ```js
 * let texture = PIXI.VideoBaseTexture.fromUrl('http://mydomain.com/video.mp4')
 *
 * let texture = PIXI.VideoBaseTexture.fromUrl({ src: 'http://mydomain.com/video.mp4', mime: 'video/mp4' })
 *
 * let texture = PIXI.VideoBaseTexture.fromUrls(['/video.webm', '/video.mp4'])
 *
 * let texture = PIXI.VideoBaseTexture.fromUrls([
 *     { src: '/video.webm', mime: 'video/webm' },
 *     { src: '/video.mp4', mime: 'video/mp4' }
 * ])
 * ```
 *
 * See the ["deus" demo](http://www.goodboydigital.com/pixijs/examples/deus/).
 *
 * @class
 * @extends PIXI.BaseTexture
 * @memberof PIXI
 */
const VideoBaseTexture = (_BaseTexture => {
  inherits_(VideoBaseTexture, _BaseTexture)

  /**
   * @param {HTMLVideoElement} source - Video source
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   */
  function VideoBaseTexture(source, scaleMode) {
    class_call_check_(this, VideoBaseTexture)

    if (!source) {
      throw new Error('No video source element specified.')
    }

    // hook in here to check if video is already available.
    // BaseTexture looks for a source.complete boolean, plus width & height.

    if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
      source.complete = true
    }

    var _this = get_constructor_(this, _BaseTexture.call(this, source, scaleMode))

    _this.width = source.videoWidth
    _this.height = source.videoHeight

    _this._autoUpdate = true
    _this._isAutoUpdating = false

    /**
     * When set to true will automatically play videos used by this texture once
     * they are loaded. If false, it will not modify the playing state.
     *
     * @member {boolean}
     * @default true
     */
    _this.autoPlay = true

    _this.update = _this.update.bind(_this)
    _this._onCanPlay = _this._onCanPlay.bind(_this)

    source.addEventListener('play', _this._onPlayStart.bind(_this))
    source.addEventListener('pause', _this._onPlayStop.bind(_this))
    _this.hasLoaded = false
    _this.__loaded = false

    if (!_this._isSourceReady()) {
      source.addEventListener('canplay', _this._onCanPlay)
      source.addEventListener('canplaythrough', _this._onCanPlay)
    } else {
      _this._onCanPlay()
    }
    return _this
  }

  /**
   * Returns true if the underlying source is playing.
   *
   * @private
   * @return {boolean} True if playing.
   */
  VideoBaseTexture.prototype._isSourcePlaying = function _isSourcePlaying() {
    var source = this.source

    return source.currentTime > 0 && source.paused === false && source.ended === false && source.readyState > 2
  }

  /**
   * Returns true if the underlying source is ready for playing.
   *
   * @private
   * @return {boolean} True if ready.
   */
  VideoBaseTexture.prototype._isSourceReady = function _isSourceReady() {
    return this.source.readyState === 3 || this.source.readyState === 4
  }

  /**
   * Runs the update loop when the video is ready to play
   *
   * @private
   */
  VideoBaseTexture.prototype._onPlayStart = function _onPlayStart() {
    // Just in case the video has not received its can play even yet..
    if (!this.hasLoaded) {
      this._onCanPlay()
    }

    if (!this._isAutoUpdating && this.autoUpdate) {
      ticker.shared.add(this.update, this, constants.UPDATE_PRIORITY.HIGH)
      this._isAutoUpdating = true
    }
  }

  /**
   * Fired when a pause event is triggered, stops the update loop
   *
   * @private
   */
  VideoBaseTexture.prototype._onPlayStop = function _onPlayStop() {
    if (this._isAutoUpdating) {
      ticker.shared.remove(this.update, this)
      this._isAutoUpdating = false
    }
  }

  /**
   * Fired when the video is loaded and ready to play
   *
   * @private
   */
  VideoBaseTexture.prototype._onCanPlay = function _onCanPlay() {
    this.hasLoaded = true

    if (this.source) {
      this.source.removeEventListener('canplay', this._onCanPlay)
      this.source.removeEventListener('canplaythrough', this._onCanPlay)

      this.width = this.source.videoWidth
      this.height = this.source.videoHeight

      // prevent multiple loaded dispatches..
      if (!this.__loaded) {
        this.__loaded = true
        this.emit('loaded', this)
      }

      if (this._isSourcePlaying()) {
        this._onPlayStart()
      } else if (this.autoPlay) {
        this.source.play()
      }
    }
  }

  /**
   * Destroys this texture
   *
   */
  VideoBaseTexture.prototype.destroy = function destroy() {
    if (this._isAutoUpdating) {
      ticker.shared.remove(this.update, this)
    }

    if (this.source && this.source._pixiId) {
      BaseTexture.removeFromCache(this.source._pixiId)
      delete this.source._pixiId

      this.source.pause()
      this.source.src = ''
      this.source.load()
    }

    _BaseTexture.prototype.destroy.call(this)
  }

  /**
   * Mimic PixiJS BaseTexture.from.... method.
   *
   * @static
   * @param {HTMLVideoElement} video - Video to create texture from
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @return {PIXI.VideoBaseTexture} Newly created VideoBaseTexture
   */
  VideoBaseTexture.fromVideo = function fromVideo(video, scaleMode) {
    if (!video._pixiId) {
      video._pixiId = 'video_' + (0, utils.uid)()
    }

    var baseTexture = utils.BaseTextureCache[video._pixiId]

    if (!baseTexture) {
      baseTexture = new VideoBaseTexture(video, scaleMode)
      BaseTexture.addToCache(baseTexture, video._pixiId)
    }

    return baseTexture
  }

  /**
   * Helper function that creates a new BaseTexture based on the given video element.
   * This BaseTexture can then be used to create a texture
   *
   * @static
   * @param {string|object|string[]|object[]} videoSrc - The URL(s) for the video.
   * @param {string} [videoSrc.src] - One of the source urls for the video
   * @param {string} [videoSrc.mime] - The mimetype of the video (e.g. 'video/mp4'). If not specified
   *  the url's extension will be used as the second part of the mime type.
   * @param {number} scaleMode - See {@link PIXI.SCALE_MODES} for possible values
   * @param {boolean} [crossorigin=(auto)] - Should use anonymous CORS? Defaults to true if the URL is not a data-URI.
   * @return {PIXI.VideoBaseTexture} Newly created VideoBaseTexture
   */
  VideoBaseTexture.fromUrl = function fromUrl(videoSrc, scaleMode, crossorigin) {
    var video = document.createElement('video')

    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('playsinline', '')

    var url = Array.isArray(videoSrc) ? videoSrc[0].src || videoSrc[0] : videoSrc.src || videoSrc

    if (crossorigin === undefined && url.indexOf('data:') !== 0) {
      video.crossOrigin = (0, determineCrossOrigin)(url)
    } else if (crossorigin) {
      video.crossOrigin = typeof crossorigin === 'string' ? crossorigin : 'anonymous'
    }

    // array of objects or strings
    if (Array.isArray(videoSrc)) {
      for (var i = 0; i < videoSrc.length; ++i) {
        video.appendChild(createSource(videoSrc[i].src || videoSrc[i], videoSrc[i].mime))
      }
    }
    // single object or string
    else {
      video.appendChild(createSource(url, videoSrc.mime))
    }

    video.load()

    return VideoBaseTexture.fromVideo(video, scaleMode)
  }

  /**
   * Should the base texture automatically update itself, set to true by default
   *
   * @member {boolean}
   */
  create_class_(VideoBaseTexture, [{
    key: 'autoUpdate',
    get: function get() {
      return this._autoUpdate
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      if (value !== this._autoUpdate) {
        this._autoUpdate = value

        if (!this._autoUpdate && this._isAutoUpdating) {
          ticker.shared.remove(this.update, this)
          this._isAutoUpdating = false
        } else if (this._autoUpdate && !this._isAutoUpdating) {
          ticker.shared.add(this.update, this, constants.UPDATE_PRIORITY.HIGH)
          this._isAutoUpdating = true
        }
      }
    }
  }])

  VideoBaseTexture.fromUrls = VideoBaseTexture.fromUrl

  function createSource(path, type) {
    if (!type) {
      type = 'video/' + path.substr(path.lastIndexOf('.') + 1)
    }

    var source = document.createElement('source')

    source.src = path
    source.type = type

    return source
  }

  return VideoBaseTexture
})(BaseTexture)

/**
 * A standard object to store the Uvs of a texture
 *
 * @class
 * @private
 * @memberof PIXI
 */
const TextureUvs = (() => {
  
  function TextureUvs() {
    class_call_check_(this, TextureUvs)

    this.x0 = 0
    this.y0 = 0

    this.x1 = 1
    this.y1 = 0

    this.x2 = 1
    this.y2 = 1

    this.x3 = 0
    this.y3 = 1

    this.uvsUint32 = new Uint32Array(4)
  }

  /**
   * Sets the texture Uvs based on the given frame information.
   *
   * @private
   * @param {PIXI.Rectangle} frame - The frame of the texture
   * @param {PIXI.Rectangle} baseFrame - The base frame of the texture
   * @param {number} rotate - Rotation of frame, see {@link PIXI.GroupD8}
   */
  TextureUvs.prototype.set = function set(frame, baseFrame, rotate) {
    var tw = baseFrame.width
    var th = baseFrame.height

    if (rotate) {
      // width and height div 2 div baseFrame size
      var w2 = frame.width / 2 / tw
      var h2 = frame.height / 2 / th

      // coordinates of center
      var cX = frame.x / tw + w2
      var cY = frame.y / th + h2

      rotate = GroupD8.add(rotate, GroupD8.NW); // NW is top-left corner
      this.x0 = cX + w2 * GroupD8.uX(rotate)
      this.y0 = cY + h2 * GroupD8.uY(rotate)

      rotate = GroupD8.add(rotate, 2); // rotate 90 degrees clockwise
      this.x1 = cX + w2 * GroupD8.uX(rotate)
      this.y1 = cY + h2 * GroupD8.uY(rotate)

      rotate = GroupD8.add(rotate, 2)
      this.x2 = cX + w2 * GroupD8.uX(rotate)
      this.y2 = cY + h2 * GroupD8.uY(rotate)

      rotate = GroupD8.add(rotate, 2)
      this.x3 = cX + w2 * GroupD8.uX(rotate)
      this.y3 = cY + h2 * GroupD8.uY(rotate)
    } else {
      this.x0 = frame.x / tw
      this.y0 = frame.y / th

      this.x1 = (frame.x + frame.width) / tw
      this.y1 = frame.y / th

      this.x2 = (frame.x + frame.width) / tw
      this.y2 = (frame.y + frame.height) / th

      this.x3 = frame.x / tw
      this.y3 = (frame.y + frame.height) / th
    }

    this.uvsUint32[0] = (this.y0 * 65535 & 0xFFFF) << 16 | this.x0 * 65535 & 0xFFFF
    this.uvsUint32[1] = (this.y1 * 65535 & 0xFFFF) << 16 | this.x1 * 65535 & 0xFFFF
    this.uvsUint32[2] = (this.y2 * 65535 & 0xFFFF) << 16 | this.x2 * 65535 & 0xFFFF
    this.uvsUint32[3] = (this.y3 * 65535 & 0xFFFF) << 16 | this.x3 * 65535 & 0xFFFF
  }

  return TextureUvs
})()

/**
 * Class controls uv transform and frame clamp for texture
 * Can be used in Texture "transform" field, or separately, you can use different clamp settings on the same texture.
 * If you want to add support for texture region of certain feature or filter, that's what you're looking for.
 *
 * @see PIXI.Texture
 * @see PIXI.mesh.Mesh
 * @see PIXI.extras.TilingSprite
 * @class
 * @memberof PIXI
 */
const TextureMatrix = (() => {
  /**
   *
   * @param {PIXI.Texture} texture observed texture
   * @param {number} [clampMargin] Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   * @constructor
   */
  function TextureMatrix(texture, clampMargin) {
    class_call_check_(this, TextureMatrix)

    this._texture = texture

    this.mapCoord = new Matrix()

    this.uClampFrame = new Float32Array(4)

    this.uClampOffset = new Float32Array(2)

    this._lastTextureID = -1

    /**
     * Changes frame clamping
     * Works with TilingSprite and Mesh
     * Change to 1.5 if you texture has repeated right and bottom lines, that leads to smoother borders
     *
     * @default 0
     * @member {number}
     */
    this.clampOffset = 0

    /**
     * Changes frame clamping
     * Works with TilingSprite and Mesh
     * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
     *
     * @default 0.5
     * @member {number}
     */
    this.clampMargin = typeof clampMargin === 'undefined' ? 0.5 : clampMargin
  }

  var tempMat = new Matrix()

  /**
   * Multiplies uvs array to transform
   * @param {Float32Array} uvs mesh uvs
   * @param {Float32Array} [out=uvs] output
   * @returns {Float32Array} output
   */
  TextureMatrix.prototype.multiplyUvs = function multiplyUvs(uvs, out) {
    if (out === undefined) {
      out = uvs
    }

    var mat = this.mapCoord

    for (var i = 0; i < uvs.length; i += 2) {
      var x = uvs[i]
      var y = uvs[i + 1]

      out[i] = x * mat.a + y * mat.c + mat.tx
      out[i + 1] = x * mat.b + y * mat.d + mat.ty
    }

    return out
  }

  /**
   * updates matrices if texture was changed
   * @param {boolean} forceUpdate if true, matrices will be updated any case
   * @returns {boolean} whether or not it was updated
   */
  TextureMatrix.prototype.update = function update(forceUpdate) {
    var tex = this._texture

    if (!tex || !tex.valid) {
      return false
    }

    if (!forceUpdate && this._lastTextureID === tex._updateID) {
      return false
    }

    this._lastTextureID = tex._updateID

    var uvs = tex._uvs

    this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0)

    var orig = tex.orig
    var trim = tex.trim

    if (trim) {
      tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height)
      this.mapCoord.append(tempMat)
    }

    var texBase = tex.baseTexture
    var frame = this.uClampFrame
    var margin = this.clampMargin / texBase.resolution
    var offset = this.clampOffset

    frame[0] = (tex._frame.x + margin + offset) / texBase.width
    frame[1] = (tex._frame.y + margin + offset) / texBase.height
    frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width
    frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height
    this.uClampOffset[0] = offset / texBase.realWidth
    this.uClampOffset[1] = offset / texBase.realHeight

    return true
  }

  create_class_(TextureMatrix, [{
    key: 'texture',
    get: function get() {
      return this._texture
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._texture = value
      this._lastTextureID = -1
    }
  }])

  return TextureMatrix
})()

/**
 * A texture stores the information that represents an image or part of an image. It cannot be added
 * to the display list directly. Instead use it as the texture for a Sprite. If no frame is provided
 * then the whole image is used.
 *
 * You can directly create a texture from an image and then reuse it multiple times like this :
 *
 * ```js
 * let texture = PIXI.Texture.fromImage('assets/image.png')
 * let sprite1 = new PIXI.Sprite(texture)
 * let sprite2 = new PIXI.Sprite(texture)
 * ```
 *
 * Textures made from SVGs, loaded or not, cannot be used before the file finishes processing.
 * You can check for this by checking the sprite's _textureID property.
 * ```js
 * var texture = PIXI.Texture.fromImage('assets/image.svg')
 * var sprite1 = new PIXI.Sprite(texture)
 * //sprite1._textureID should not be undefined if the texture has finished processing the SVG file
 * ```
 * You can use a ticker or rAF to ensure your sprites load the finished textures after processing. See issue #3068.
 *
 * @class
 * @extends EventEmitter
 * @memberof PIXI
 */
var Texture = function (_EventEmitter) {
  inherits_(Texture, _EventEmitter)

  /**
   * @param {PIXI.BaseTexture} baseTexture - The base texture source to create the texture from
   * @param {PIXI.Rectangle} [frame] - The rectangle frame of the texture to show
   * @param {PIXI.Rectangle} [orig] - The area of original texture
   * @param {PIXI.Rectangle} [trim] - Trimmed rectangle of original texture
   * @param {number} [rotate] - indicates how the texture was rotated by texture packer. See {@link PIXI.GroupD8}
   */
  function Texture(baseTexture, frame, orig, trim, rotate) {
    class_call_check_(this, Texture)

    /**
     * Does this Texture have any frame data assigned to it?
     *
     * @member {boolean}
     */
    var _this = get_constructor_(this, _EventEmitter.call(this))

    _this.noFrame = false

    if (!frame) {
      _this.noFrame = true
      frame = new math.Rectangle(0, 0, 1, 1)
    }

    if (baseTexture instanceof Texture) {
      baseTexture = baseTexture.baseTexture
    }

    /**
     * The base texture that this texture uses.
     *
     * @member {PIXI.BaseTexture}
     */
    _this.baseTexture = baseTexture

    /**
     * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
     * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
     *
     * @member {PIXI.Rectangle}
     */
    _this._frame = frame

    /**
     * This is the trimmed area of original texture, before it was put in atlas
     * Please call `_updateUvs()` after you change coordinates of `trim` manually.
     *
     * @member {PIXI.Rectangle}
     */
    _this.trim = trim

    /**
     * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
     *
     * @member {boolean}
     */
    _this.valid = false

    /**
     * This will let a renderer know that a texture has been updated (used mainly for webGL uv updates)
     *
     * @member {boolean}
     */
    _this.requiresUpdate = false

    /**
     * The WebGL UV data cache.
     *
     * @member {PIXI.TextureUvs}
     * @private
     */
    _this._uvs = null

    /**
     * This is the area of original texture, before it was put in atlas
     *
     * @member {PIXI.Rectangle}
     */
    _this.orig = orig || frame; // new Rectangle(0, 0, 1, 1)

    _this._rotate = Number(rotate || 0)

    if (rotate === true) {
      // this is old texturepacker legacy, some games/libraries are passing "true" for rotated textures
      _this._rotate = 2
    } else if (_this._rotate % 2 !== 0) {
      throw new Error('attempt to use diamond-shaped UVs. If you are sure, set rotation manually')
    }

    if (baseTexture.hasLoaded) {
      if (_this.noFrame) {
        frame = new math.Rectangle(0, 0, baseTexture.width, baseTexture.height)

        // if there is no frame we should monitor for any base texture changes..
        baseTexture.on('update', _this.onBaseTextureUpdated, _this)
      }
      _this.frame = frame
    } else {
      baseTexture.once('loaded', _this.onBaseTextureLoaded, _this)
    }

    /**
     * Fired when the texture is updated. This happens if the frame or the baseTexture is updated.
     *
     * @event PIXI.Texture#update
     * @protected
     * @param {PIXI.Texture} texture - Instance of texture being updated.
     */

    _this._updateID = 0

    /**
     * Contains data for uvs. May contain clamp settings and some matrices.
     * Its a bit heavy, so by default that object is not created.
     * @type {PIXI.TextureMatrix}
     * @default null
     */
    _this.transform = null

    /**
     * The ids under which this Texture has been added to the texture cache. This is
     * automatically set as long as Texture.addToCache is used, but may not be set if a
     * Texture is added directly to the TextureCache array.
     *
     * @member {string[]}
     */
    _this.textureCacheIds = []
    return _this
  }

  /**
   * Updates this texture on the gpu.
   *
   */
  Texture.prototype.update = function update() {
    this.baseTexture.update()
  }

  /**
   * Called when the base texture is loaded
   *
   * @private
   * @param {PIXI.BaseTexture} baseTexture - The base texture.
   */
  Texture.prototype.onBaseTextureLoaded = function onBaseTextureLoaded(baseTexture) {
    this._updateID++

    // TODO this code looks confusing.. boo to abusing getters and setters!
    if (this.noFrame) {
      this.frame = new math.Rectangle(0, 0, baseTexture.width, baseTexture.height)
    } else {
      this.frame = this._frame
    }

    this.baseTexture.on('update', this.onBaseTextureUpdated, this)
    this.emit('update', this)
  }

  /**
   * Called when the base texture is updated
   *
   * @private
   * @param {PIXI.BaseTexture} baseTexture - The base texture.
   */
  Texture.prototype.onBaseTextureUpdated = function onBaseTextureUpdated(baseTexture) {
    this._updateID++

    this._frame.width = baseTexture.width
    this._frame.height = baseTexture.height

    this.emit('update', this)
  }

  /**
   * Destroys this texture
   *
   * @param {boolean} [destroyBase=false] Whether to destroy the base texture as well
   */
  Texture.prototype.destroy = function destroy(destroyBase) {
    if (this.baseTexture) {
      if (destroyBase) {
        // delete the texture if it exists in the texture cache..
        // this only needs to be removed if the base texture is actually destroyed too..
        if (utils.TextureCache[this.baseTexture.imageUrl]) {
          Texture.removeFromCache(this.baseTexture.imageUrl)
        }

        this.baseTexture.destroy()
      }

      this.baseTexture.off('update', this.onBaseTextureUpdated, this)
      this.baseTexture.off('loaded', this.onBaseTextureLoaded, this)

      this.baseTexture = null
    }

    this._frame = null
    this._uvs = null
    this.trim = null
    this.orig = null

    this.valid = false

    Texture.removeFromCache(this)
    this.textureCacheIds = null
  }

  /**
   * Creates a new texture object that acts the same as this one.
   *
   * @return {PIXI.Texture} The new texture
   */
  Texture.prototype.clone = function clone() {
    return new Texture(this.baseTexture, this.frame, this.orig, this.trim, this.rotate)
  }

  /**
   * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
   */
  Texture.prototype._updateUvs = function _updateUvs() {
    if (!this._uvs) {
      this._uvs = new TextureUvs()
    }

    this._uvs.set(this._frame, this.baseTexture, this.rotate)

    this._updateID++
  }

  /**
   * Helper function that creates a Texture object from the given image url.
   * If the image is not in the texture cache it will be  created and loaded.
   *
   * @static
   * @param {string} imageUrl - The image url of the texture
   * @param {boolean} [crossorigin] - Whether requests should be treated as crossorigin
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [sourceScale=(auto)] - Scale for the original image, used with SVG images.
   * @return {PIXI.Texture} The newly created texture
   */
  Texture.fromImage = function fromImage(imageUrl, crossorigin, scaleMode, sourceScale) {
    var texture = utils.TextureCache[imageUrl]

    if (!texture) {
      texture = new Texture(BaseTexture.fromImage(imageUrl, crossorigin, scaleMode, sourceScale))
      Texture.addToCache(texture, imageUrl)
    }

    return texture
  }

  /**
   * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
   * The frame ids are created when a Texture packer file has been loaded
   *
   * @static
   * @param {string} frameId - The frame Id of the texture in the cache
   * @return {PIXI.Texture} The newly created texture
   */
  Texture.fromFrame = function fromFrame(frameId) {
    var texture = utils.TextureCache[frameId]

    if (!texture) {
      throw new Error('The frameId "' + frameId + '" does not exist in the texture cache')
    }

    return texture
  }

  /**
   * Helper function that creates a new Texture based on the given canvas element.
   *
   * @static
   * @param {HTMLCanvasElement} canvas - The canvas element source of the texture
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {string} [origin='canvas'] - A string origin of who created the base texture
   * @return {PIXI.Texture} The newly created texture
   */
  Texture.fromCanvas = function fromCanvas(canvas, scaleMode) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'canvas'

    return new Texture(BaseTexture.fromCanvas(canvas, scaleMode, origin))
  }

  /**
   * Helper function that creates a new Texture based on the given video element.
   *
   * @static
   * @param {HTMLVideoElement|string} video - The URL or actual element of the video
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @return {PIXI.Texture} The newly created texture
   */
  Texture.fromVideo = function fromVideo(video, scaleMode) {
    if (typeof video === 'string') {
      return Texture.fromVideoUrl(video, scaleMode)
    }

    return new Texture(VideoBaseTexture.fromVideo(video, scaleMode))
  }

  /**
   * Helper function that creates a new Texture based on the video url.
   *
   * @static
   * @param {string} videoUrl - URL of the video
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @return {PIXI.Texture} The newly created texture
   */
  Texture.fromVideoUrl = function fromVideoUrl(videoUrl, scaleMode) {
    return new Texture(VideoBaseTexture.fromUrl(videoUrl, scaleMode))
  }

  /**
   * Helper function that creates a new Texture based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   *
   * @static
   * @param {number|string|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|PIXI.BaseTexture}
   *        source - Source to create texture from
   * @return {PIXI.Texture} The newly created texture
   */
  Texture.from = function from(source) {
    // TODO auto detect cross origin..
    // TODO pass in scale mode?
    if (typeof source === 'string') {
      var texture = utils.TextureCache[source]

      if (!texture) {
        // check if its a video..
        var isVideo = source.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) !== null

        if (isVideo) {
          return Texture.fromVideoUrl(source)
        }

        return Texture.fromImage(source)
      }

      return texture
    } else if (source instanceof HTMLImageElement) {
      return new Texture(BaseTexture.from(source))
    } else if (source instanceof HTMLCanvasElement) {
      return Texture.fromCanvas(source, settings.SCALE_MODE, 'HTMLCanvasElement')
    } else if (source instanceof HTMLVideoElement) {
      return Texture.fromVideo(source)
    } else if (source instanceof BaseTexture) {
      return new Texture(source)
    }

    // lets assume its a texture!
    return source
  }

  /**
   * Create a texture from a source and add to the cache.
   *
   * @static
   * @param {HTMLImageElement|HTMLCanvasElement} source - The input source.
   * @param {String} imageUrl - File name of texture, for cache and resolving resolution.
   * @param {String} [name] - Human readible name for the texture cache. If no name is
   *        specified, only `imageUrl` will be used as the cache ID.
   * @return {PIXI.Texture} Output texture
   */
  Texture.fromLoader = function fromLoader(source, imageUrl, name) {
    var baseTexture = new BaseTexture(source, undefined, (0, utils.getResolutionOfUrl)(imageUrl))
    var texture = new Texture(baseTexture)

    baseTexture.imageUrl = imageUrl

    // No name, use imageUrl instead
    if (!name) {
      name = imageUrl
    }

    // lets also add the frame to pixi's global cache for fromFrame and fromImage fucntions
    BaseTexture.addToCache(texture.baseTexture, name)
    Texture.addToCache(texture, name)

    // also add references by url if they are different.
    if (name !== imageUrl) {
      BaseTexture.addToCache(texture.baseTexture, imageUrl)
      Texture.addToCache(texture, imageUrl)
    }

    return texture
  }

  /**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   *
   * @static
   * @param {PIXI.Texture} texture - The Texture to add to the cache.
   * @param {string} id - The id that the Texture will be stored against.
   */


  Texture.addToCache = function addToCache(texture, id) {
    if (id) {
      if (texture.textureCacheIds.indexOf(id) === -1) {
        texture.textureCacheIds.push(id)
      }

      /* eslint-disable no-console */
      if (utils.TextureCache[id]) {
        console.warn('Texture added to the cache with an id [' + id + '] that already had an entry')
      }
      /* eslint-enable no-console */

      utils.TextureCache[id] = texture
    }
  }

  /**
   * Remove a Texture from the global TextureCache.
   *
   * @static
   * @param {string|PIXI.Texture} texture - id of a Texture to be removed, or a Texture instance itself
   * @return {PIXI.Texture|null} The Texture that was removed
   */


  Texture.removeFromCache = function removeFromCache(texture) {
    if (typeof texture === 'string') {
      var textureFromCache = utils.TextureCache[texture]

      if (textureFromCache) {
        var index = textureFromCache.textureCacheIds.indexOf(texture)

        if (index > -1) {
          textureFromCache.textureCacheIds.splice(index, 1)
        }

        delete utils.TextureCache[texture]

        return textureFromCache
      }
    } else if (texture && texture.textureCacheIds) {
      for (var i = 0; i < texture.textureCacheIds.length; ++i) {
        // Check that texture matches the one being passed in before deleting it from the cache.
        if (utils.TextureCache[texture.textureCacheIds[i]] === texture) {
          delete utils.TextureCache[texture.textureCacheIds[i]]
        }
      }

      texture.textureCacheIds.length = 0

      return texture
    }

    return null
  }

  /**
   * The frame specifies the region of the base texture that this texture uses.
   * Please call `_updateUvs()` after you change coordinates of `frame` manually.
   *
   * @member {PIXI.Rectangle}
   */


  create_class_(Texture, [{
    key: 'frame',
    get: function get() {
      return this._frame
    },
    set: function set(frame) // eslint-disable-line require-jsdoc
    {
      this._frame = frame

      this.noFrame = false

      var x = frame.x,
        y = frame.y,
        width = frame.width,
        height = frame.height

      var xNotFit = x + width > this.baseTexture.width
      var yNotFit = y + height > this.baseTexture.height

      if (xNotFit || yNotFit) {
        var relationship = xNotFit && yNotFit ? 'and' : 'or'
        var errorX = 'X: ' + x + ' + ' + width + ' = ' + (x + width) + ' > ' + this.baseTexture.width
        var errorY = 'Y: ' + y + ' + ' + height + ' = ' + (y + height) + ' > ' + this.baseTexture.height

        throw new Error('Texture Error: frame does not fit inside the base Texture dimensions: ' + (errorX + ' ' + relationship + ' ' + errorY))
      }

      // this.valid = width && height && this.baseTexture.source && this.baseTexture.hasLoaded
      this.valid = width && height && this.baseTexture.hasLoaded

      if (!this.trim && !this.rotate) {
        this.orig = frame
      }

      if (this.valid) {
        this._updateUvs()
      }
    }

    /**
     * Indicates whether the texture is rotated inside the atlas
     * set to 2 to compensate for texture packer rotation
     * set to 6 to compensate for spine packer rotation
     * can be used to rotate or mirror sprites
     * See {@link PIXI.GroupD8} for explanation
     *
     * @member {number}
     */

  }, {
    key: 'rotate',
    get: function get() {
      return this._rotate
    },
    set: function set(rotate) // eslint-disable-line require-jsdoc
    {
      this._rotate = rotate
      if (this.valid) {
        this._updateUvs()
      }
    }

    /**
     * The width of the Texture in pixels.
     *
     * @member {number}
     */

  }, {
    key: 'width',
    get: function get() {
      return this.orig.width
    }

    /**
     * The height of the Texture in pixels.
     *
     * @member {number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this.orig.height
    }
  }])

  function createWhiteTexture() {
    var canvas = document.createElement('canvas')

    canvas.width = 10
    canvas.height = 10

    var context = canvas.getContext('2d')

    context.fillStyle = 'white'
    context.fillRect(0, 0, 10, 10)

    return new Texture(new BaseTexture(canvas))
  }

  function removeAllHandlers(tex) {
    tex.destroy = function _emptyDestroy() { /* empty */ }
    tex.on = function _emptyOn() { /* empty */ }
    tex.once = function _emptyOnce() { /* empty */ }
    tex.emit = function _emptyEmit() { /* empty */ }
  }

  /**
   * An empty texture, used often to not have to create multiple empty textures.
   * Can not be destroyed.
   *
   * @static
   * @constant
   */
  Texture.EMPTY = new Texture(new BaseTexture())
  removeAllHandlers(Texture.EMPTY)
  removeAllHandlers(Texture.EMPTY.baseTexture)

  /**
   * A white texture of 10x10 size, used for graphics and other things
   * Can not be destroyed.
   *
   * @static
   * @constant
   */
  Texture.WHITE = createWhiteTexture()
  removeAllHandlers(Texture.WHITE)
  removeAllHandlers(Texture.WHITE.baseTexture)

  return Texture
}(EventEmitter)

/**
 * Utility class for maintaining reference to a collection
 * of Textures on a single Spritesheet.
 *
 * @class
 * @memberof PIXI
 */
const Spritesheet = (() => {
  create_class_(Spritesheet, null, [{
    key: 'BATCH_SIZE',

    /**
     * The maximum number of Textures to build per process.
     *
     * @type {number}
     * @default 1000
     */
    get: function get() {
      return 1000
    }

    /**
     * @param {PIXI.BaseTexture} baseTexture Reference to the source BaseTexture object.
     * @param {Object} data - Spritesheet image data.
     * @param {string} [resolutionFilename] - The filename to consider when determining
     *        the resolution of the spritesheet. If not provided, the imageUrl will
     *        be used on the BaseTexture.
     */

  }])

  function Spritesheet(baseTexture, data) {
    var resolutionFilename = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null

    class_call_check_(this, Spritesheet)

    /**
     * Reference to ths source texture
     * @type {PIXI.BaseTexture}
     */
    this.baseTexture = baseTexture

    /**
     * Map of spritesheet textures.
     * @type {Object}
     */
    this.textures = {}

    /**
     * Reference to the original JSON data.
     * @type {Object}
     */
    this.data = data

    /**
     * The resolution of the spritesheet.
     * @type {number}
     */
    this.resolution = this._updateResolution(resolutionFilename || this.baseTexture.imageUrl)

    /**
     * Map of spritesheet frames.
     * @type {Object}
     * @private
     */
    this._frames = this.data.frames

    /**
     * Collection of frame names.
     * @type {string[]}
     * @private
     */
    this._frameKeys = Object.keys(this._frames)

    /**
     * Current batch index being processed.
     * @type {number}
     * @private
     */
    this._batchIndex = 0

    /**
     * Callback when parse is completed.
     * @type {Function}
     * @private
     */
    this._callback = null
  }

  /**
   * Generate the resolution from the filename or fallback
   * to the meta.scale field of the JSON data.
   *
   * @private
   * @param {string} resolutionFilename - The filename to use for resolving
   *        the default resolution.
   * @return {number} Resolution to use for spritesheet.
   */
  Spritesheet.prototype._updateResolution = function _updateResolution(resolutionFilename) {
    var scale = this.data.meta.scale

    // Use a defaultValue of `null` to check if a url-based resolution is set
    var resolution = (0, utils.getResolutionOfUrl)(resolutionFilename, null)

    // No resolution found via URL
    if (resolution === null) {
      // Use the scale value or default to 1
      resolution = scale !== undefined ? parseFloat(scale) : 1
    }

    // For non-1 resolutions, update baseTexture
    if (resolution !== 1) {
      this.baseTexture.resolution = resolution
      this.baseTexture.update()
    }

    return resolution
  }

  /**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   *
   * @param {Function} callback - Callback when complete returns
   *        a map of the Textures for this spritesheet.
   */
  Spritesheet.prototype.parse = function parse(callback) {
    this._batchIndex = 0
    this._callback = callback

    if (this._frameKeys.length <= Spritesheet.BATCH_SIZE) {
      this._processFrames(0)
      this._parseComplete()
    } else {
      this._nextBatch()
    }
  }

  /**
   * Process a batch of frames
   *
   * @private
   * @param {number} initialFrameIndex - The index of frame to start.
   */
  Spritesheet.prototype._processFrames = function _processFrames(initialFrameIndex) {
    var frameIndex = initialFrameIndex
    var maxFrames = Spritesheet.BATCH_SIZE
    var sourceScale = this.baseTexture.sourceScale

    while (frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length) {
      var i = this._frameKeys[frameIndex]
      var data = this._frames[i]
      var rect = data.frame

      if (rect) {
        var frame = null
        var trim = null
        var sourceSize = data.trimmed !== false && data.sourceSize ? data.sourceSize : data.frame

        var orig = new Rectangle(
          0, 0,
          Math.floor(sourceSize.w * sourceScale) / this.resolution,
          Math.floor(sourceSize.h * sourceScale) / this.resolution
        )

        if (data.rotated) {
          frame = new Rectangle(
            Math.floor(rect.x * sourceScale) / this.resolution,
            Math.floor(rect.y * sourceScale) / this.resolution,
            Math.floor(rect.h * sourceScale) / this.resolution,
            Math.floor(rect.w * sourceScale) / this.resolution
          )
        } else {
          frame = new Rectangle(
            Math.floor(rect.x * sourceScale) / this.resolution,
            Math.floor(rect.y * sourceScale) / this.resolution,
            Math.floor(rect.w * sourceScale) / this.resolution,
            Math.floor(rect.h * sourceScale) / this.resolution
          )
        }

        //  Check to see if the sprite is trimmed
        if (data.trimmed !== false && data.spriteSourceSize) {
          trim = new Rectangle(
            Math.floor(data.spriteSourceSize.x * sourceScale) / this.resolution,
            Math.floor(data.spriteSourceSize.y * sourceScale) / this.resolution,
            Math.floor(rect.w * sourceScale) / this.resolution,
            Math.floor(rect.h * sourceScale) / this.resolution
          )
        }

        this.textures[i] = new Texture(this.baseTexture, frame, orig, trim, data.rotated ? 2 : 0)

        // lets also add the frame to pixi's global cache for fromFrame and fromImage functions
        Texture.addToCache(this.textures[i], i)
      }

      frameIndex++
    }
  }

  /**
   * The parse has completed.
   *
   * @private
   */
  Spritesheet.prototype._parseComplete = function _parseComplete() {
    var callback = this._callback

    this._callback = null
    this._batchIndex = 0
    callback.call(this, this.textures)
  }

  /**
   * Begin the next batch of textures.
   *
   * @private
   */
  Spritesheet.prototype._nextBatch = function _nextBatch() {
    var _this = this

    this._processFrames(this._batchIndex * Spritesheet.BATCH_SIZE)
    this._batchIndex++
    setTimeout(function () {
      if (_this._batchIndex * Spritesheet.BATCH_SIZE < _this._frameKeys.length) {
        _this._nextBatch()
      } else {
        _this._parseComplete()
      }
    }, 0)
  }

  /**
   * Destroy Spritesheet and don't use after this.
   *
   * @param {boolean} [destroyBase=false] Whether to destroy the base texture as well
   */
  Spritesheet.prototype.destroy = function destroy() {
    var destroyBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false

    for (var i in this.textures) {
      this.textures[i].destroy()
    }
    this._frames = null
    this._frameKeys = null
    this.data = null
    this.textures = null
    if (destroyBase) {
      this.baseTexture.destroy()
    }
    this.baseTexture = null
  }

  return Spritesheet
})()

/**
 * A BaseRenderTexture is a special texture that allows any PixiJS display object to be rendered to it.
 *
 * __Hint__: All DisplayObjects (i.e. Sprites) that render to a BaseRenderTexture should be preloaded
 * otherwise black rectangles will be drawn instead.
 *
 * A BaseRenderTexture takes a snapshot of any Display Object given to its render method. The position
 * and rotation of the given Display Objects is ignored. For example:
 *
 * ```js
 * let renderer = PIXI.autoDetectRenderer(1024, 1024, { view: canvas, ratio: 1 })
 * let baseRenderTexture = new PIXI.BaseRenderTexture(renderer, 800, 600)
 * let sprite = PIXI.Sprite.fromImage("spinObj_01.png")
 *
 * sprite.position.x = 800/2
 * sprite.position.y = 600/2
 * sprite.anchor.x = 0.5
 * sprite.anchor.y = 0.5
 *
 * baseRenderTexture.render(sprite)
 * ```
 *
 * The Sprite in this case will be rendered using its local transform. To render this sprite at 0,0
 * you can clear the transform
 *
 * ```js
 *
 * sprite.setTransform()
 *
 * let baseRenderTexture = new PIXI.BaseRenderTexture(100, 100)
 * let renderTexture = new PIXI.RenderTexture(baseRenderTexture)
 *
 * renderer.render(sprite, renderTexture);  // Renders to center of RenderTexture
 * ```
 *
 * @class
 * @extends PIXI.BaseTexture
 * @memberof PIXI
 */
const BaseRenderTexture = (_BaseTexture => {
  inherits_(BaseRenderTexture, _BaseTexture)

  /**
   * @param {number} [width=100] - The width of the base render texture
   * @param {number} [height=100] - The height of the base render texture
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [resolution=1] - The resolution / device pixel ratio of the texture being generated
   */
  function BaseRenderTexture() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100
    var scaleMode = arguments[2]
    var resolution = arguments[3]

    class_call_check_(this, BaseRenderTexture)

    var _this = get_constructor_(this, _BaseTexture.call(this, null, scaleMode))

    _this.resolution = resolution || settings.RESOLUTION

    _this.width = Math.ceil(width)
    _this.height = Math.ceil(height)

    _this.realWidth = _this.width * _this.resolution
    _this.realHeight = _this.height * _this.resolution

    _this.scaleMode = scaleMode !== undefined ? scaleMode : settings.SCALE_MODE
    _this.hasLoaded = true

    /**
     * A map of renderer IDs to webgl renderTargets
     *
     * @private
     * @member {object<number, WebGLTexture>}
     */
    _this._glRenderTargets = {}

    /**
     * A reference to the canvas render target (we only need one as this can be shared across renderers)
     *
     * @private
     * @member {object<number, WebGLTexture>}
     */
    _this._canvasRenderTarget = null

    /**
     * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
     *
     * @member {boolean}
     */
    _this.valid = false
    return _this
  }

  /**
   * Resizes the BaseRenderTexture.
   *
   * @param {number} width - The width to resize to.
   * @param {number} height - The height to resize to.
   */
  BaseRenderTexture.prototype.resize = function resize(width, height) {
    width = Math.ceil(width)
    height = Math.ceil(height)

    if (width === this.width && height === this.height) {
      return
    }

    this.valid = width > 0 && height > 0

    this.width = width
    this.height = height

    this.realWidth = this.width * this.resolution
    this.realHeight = this.height * this.resolution

    if (!this.valid) {
      return
    }

    this.emit('update', this)
  }

  /**
   * Destroys this texture
   *
   */
  BaseRenderTexture.prototype.destroy = function destroy() {
    _BaseTexture.prototype.destroy.call(this, true)
    this.renderer = null
  }

  return BaseRenderTexture
})(BaseTexture)

/**
 * A RenderTexture is a special texture that allows any PixiJS display object to be rendered to it.
 *
 * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded
 * otherwise black rectangles will be drawn instead.
 *
 * A RenderTexture takes a snapshot of any Display Object given to its render method. For example:
 *
 * ```js
 * let renderer = PIXI.autoDetectRenderer(1024, 1024, { view: canvas, ratio: 1 })
 * let renderTexture = PIXI.RenderTexture.create(800, 600)
 * let sprite = PIXI.Sprite.fromImage("spinObj_01.png")
 *
 * sprite.position.x = 800/2
 * sprite.position.y = 600/2
 * sprite.anchor.x = 0.5
 * sprite.anchor.y = 0.5
 *
 * renderer.render(sprite, renderTexture)
 * ```
 *
 * The Sprite in this case will be rendered using its local transform. To render this sprite at 0,0
 * you can clear the transform
 *
 * ```js
 *
 * sprite.setTransform()
 *
 * let renderTexture = new PIXI.RenderTexture.create(100, 100)
 *
 * renderer.render(sprite, renderTexture);  // Renders to center of RenderTexture
 * ```
 *
 * @class
 * @extends PIXI.Texture
 * @memberof PIXI
 */
const RenderTexture = (_Texture => {
  inherits_(RenderTexture, _Texture)

  /**
   * @param {PIXI.BaseRenderTexture} baseRenderTexture - The renderer used for this RenderTexture
   * @param {PIXI.Rectangle} [frame] - The rectangle frame of the texture to show
   */
  function RenderTexture(baseRenderTexture, frame) {
    class_call_check_(this, RenderTexture)

    // support for legacy..
    var _legacyRenderer = null

    if (!(baseRenderTexture instanceof BaseRenderTexture)) {
      /* eslint-disable prefer-rest-params, no-console */
      var width = arguments[1]
      var height = arguments[2]
      var scaleMode = arguments[3]
      var resolution = arguments[4]

      // we have an old render texture..
      console.warn('Please use RenderTexture.create(' + width + ', ' + height + ') instead of the ctor directly.')
      _legacyRenderer = arguments[0]
      /* eslint-enable prefer-rest-params, no-console */

      frame = null
      baseRenderTexture = new BaseRenderTexture(width, height, scaleMode, resolution)
    }

    /**
     * The base texture object that this texture uses
     *
     * @member {BaseTexture}
     */

    var _this = get_constructor_(this, _Texture.call(this, baseRenderTexture, frame))

    _this.legacyRenderer = _legacyRenderer

    /**
     * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
     *
     * @member {boolean}
     */
    _this.valid = true

    _this._updateUvs()
    return _this
  }

  /**
   * Resizes the RenderTexture.
   *
   * @param {number} width - The width to resize to.
   * @param {number} height - The height to resize to.
   * @param {boolean} doNotResizeBaseTexture - Should the baseTexture.width and height values be resized as well?
   */
  RenderTexture.prototype.resize = function resize(width, height, doNotResizeBaseTexture) {
    width = Math.ceil(width)
    height = Math.ceil(height)

    // TODO - could be not required..
    this.valid = width > 0 && height > 0

    this._frame.width = this.orig.width = width
    this._frame.height = this.orig.height = height

    if (!doNotResizeBaseTexture) {
      this.baseTexture.resize(width, height)
    }

    this._updateUvs()
  }

  /**
   * A short hand way of creating a render texture.
   *
   * @param {number} [width=100] - The width of the render texture
   * @param {number} [height=100] - The height of the render texture
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [resolution=1] - The resolution / device pixel ratio of the texture being generated
   * @return {PIXI.RenderTexture} The new render texture
   */
  RenderTexture.create = function create(width, height, scaleMode, resolution) {
    return new RenderTexture(new BaseRenderTexture(width, height, scaleMode, resolution))
  }

  return RenderTexture
})(Texture)

/**
 * A TextStyle Object decorates a Text Object. It can be shared between
 * multiple Text objects. Changing the style will update all text objects using it.
 *
 * @class
 * @memberof PIXI
 */
const TextStyle = (() => {
  /**
   * @param {object} [style] - The style parameters
   * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center' or 'right'),
   *  does not affect single line text
   * @param {boolean} [style.breakWords=false] - Indicates if lines can be wrapped within words, it
   *  needs wordWrap to be set to true
   * @param {boolean} [style.dropShadow=false] - Set a drop shadow for the text
   * @param {number} [style.dropShadowAlpha=1] - Set alpha for the drop shadow
   * @param {number} [style.dropShadowAngle=Math.PI/6] - Set a angle of the drop shadow
   * @param {number} [style.dropShadowBlur=0] - Set a shadow blur radius
   * @param {string|number} [style.dropShadowColor='black'] - A fill style to be used on the dropshadow e.g 'red', '#00FF00'
   * @param {number} [style.dropShadowDistance=5] - Set a distance of the drop shadow
   * @param {string|string[]|number|number[]|CanvasGradient|CanvasPattern} [style.fill='black'] - A canvas
   *  fillstyle that will be used on the text e.g 'red', '#00FF00'. Can be an array to create a gradient
   *  eg ['#000000','#FFFFFF']
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   * @param {number} [style.fillGradientType=PIXI.TEXT_GRADIENT.LINEAR_VERTICAL] - If fill is an array of colours
   *  to create a gradient, this can change the type/direction of the gradient. See {@link PIXI.TEXT_GRADIENT}
   * @param {number[]} [style.fillGradientStops] - If fill is an array of colours to create a gradient, this array can set
   * the stop points (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
   * @param {string|string[]} [style.fontFamily='Arial'] - The font family
   * @param {number|string} [style.fontSize=26] - The font size (as a number it converts to px, but as a string,
   *  equivalents are '26px','20pt','160%' or '1.6em')
   * @param {string} [style.fontStyle='normal'] - The font style ('normal', 'italic' or 'oblique')
   * @param {string} [style.fontVariant='normal'] - The font variant ('normal' or 'small-caps')
   * @param {string} [style.fontWeight='normal'] - The font weight ('normal', 'bold', 'bolder', 'lighter' and '100',
   *  '200', '300', '400', '500', '600', '700', 800' or '900')
   * @param {number} [style.leading=0] - The space between lines
   * @param {number} [style.letterSpacing=0] - The amount of spacing between letters, default is 0
   * @param {number} [style.lineHeight] - The line height, a number that represents the vertical space that a letter uses
   * @param {string} [style.lineJoin='miter'] - The lineJoin property sets the type of corner created, it can resolve
   *      spiked text issues. Possible values "miter" (creates a sharp corner), "round" (creates a round corner) or "bevel"
   *      (creates a squared corner).
   * @param {number} [style.miterLimit=10] - The miter limit to use when using the 'miter' lineJoin mode. This can reduce
   *      or increase the spikiness of rendered text.
   * @param {number} [style.padding=0] - Occasionally some fonts are cropped. Adding some padding will prevent this from
   *     happening by adding padding to all sides of the text.
   * @param {string|number} [style.stroke='black'] - A canvas fillstyle that will be used on the text stroke
   *  e.g 'blue', '#FCFF00'
   * @param {number} [style.strokeThickness=0] - A number that represents the thickness of the stroke.
   *  Default is 0 (no stroke)
   * @param {boolean} [style.trim=false] - Trim transparent borders
   * @param {string} [style.textBaseline='alphabetic'] - The baseline of the text that is rendered.
   * @param {boolean} [style.whiteSpace='pre'] - Determines whether newlines & spaces are collapsed or preserved "normal"
   *      (collapse, collapse), "pre" (preserve, preserve) | "pre-line" (preserve, collapse). It needs wordWrap to be set to true
   * @param {boolean} [style.wordWrap=false] - Indicates if word wrap should be used
   * @param {number} [style.wordWrapWidth=100] - The width at which text will wrap, it needs wordWrap to be set to true
   */
  function TextStyle(style) {
    class_call_check_(this, TextStyle)

    this.styleID = 0

    this.reset()

    deepCopyProperties(this, style, style)
  }

  var defaultStyle = {
    align: 'left',
    breakWords: false,
    dropShadow: false,
    dropShadowAlpha: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowBlur: 0,
    dropShadowColor: 'black',
    dropShadowDistance: 5,
    fill: 'black',
    fillGradientType: constants.TEXT_GRADIENT.LINEAR_VERTICAL,
    fillGradientStops: [],
    fontFamily: 'Arial',
    fontSize: 26,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 0,
    lineJoin: 'miter',
    miterLimit: 10,
    padding: 0,
    stroke: 'black',
    strokeThickness: 0,
    textBaseline: 'alphabetic',
    trim: false,
    whiteSpace: 'pre',
    wordWrap: false,
    wordWrapWidth: 100,
    leading: 0
  }

  /**
   * Creates a new TextStyle object with the same values as this one.
   * Note that the only the properties of the object are cloned.
   *
   * @return {PIXI.TextStyle} New cloned TextStyle object
   */
  TextStyle.prototype.clone = function clone() {
    var clonedProperties = {}

    deepCopyProperties(clonedProperties, this, defaultStyle)

    return new TextStyle(clonedProperties)
  }

  /**
   * Resets all properties to the defaults specified in TextStyle.prototype._default
   */
  TextStyle.prototype.reset = function reset() {
    deepCopyProperties(this, defaultStyle, defaultStyle)
  }

  /**
   * Generates a font style string to use for `TextMetrics.measureFont()`.
   *
   * @return {string} Font style string, for passing to `TextMetrics.measureFont()`
   */
  TextStyle.prototype.toFontString = function toFontString() {
    // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
    var fontSizeString = typeof this.fontSize === 'number' ? this.fontSize + 'px' : this.fontSize

    // Clean-up fontFamily property by quoting each font name
    // this will support font names with spaces
    var fontFamilies = this.fontFamily

    if (!Array.isArray(this.fontFamily)) {
      fontFamilies = this.fontFamily.split(',')
    }

    for (var i = fontFamilies.length - 1; i >= 0; i--) {
      // Trim any extra white-space
      var fontFamily = fontFamilies[i].trim()

      // Check if font already contains strings
      if (!/([\"\'])[^\'\"]+\1/.test(fontFamily)) {
        fontFamily = '"' + fontFamily + '"'
      }
      fontFamilies[i] = fontFamily
    }

    return this.fontStyle + ' ' + this.fontVariant + ' ' + this.fontWeight + ' ' + fontSizeString + ' ' + fontFamilies.join(',')
  }

  create_class_(TextStyle, [{
    key: 'align',
    get: function get() {
      return this._align
    },
    set: function set(align) // eslint-disable-line require-jsdoc
    {
      if (this._align !== align) {
        this._align = align
        this.styleID++
      }
    }
  }, {
    /**
     * Indicates if lines can be wrapped within words, it needs wordWrap to be set to true
     *
     * @member {boolean}
     */
    key: 'breakWords',
    get: function get() {
      return this._breakWords
    },
    set: function set(breakWords) // eslint-disable-line require-jsdoc
    {
      if (this._breakWords !== breakWords) {
        this._breakWords = breakWords
        this.styleID++
      }
    }
  }, {
    /**
     * Set a drop shadow for the text
     *
     * @member {boolean}
     */
    key: 'dropShadow',
    get: function get() {
      return this._dropShadow
    },
    set: function set(dropShadow) // eslint-disable-line require-jsdoc
    {
      if (this._dropShadow !== dropShadow) {
        this._dropShadow = dropShadow
        this.styleID++
      }
    }
  }, {
    /**
     * Set alpha for the drop shadow
     *
     * @member {number}
     */
    key: 'dropShadowAlpha',
    get: function get() {
      return this._dropShadowAlpha
    },
    set: function set(dropShadowAlpha) // eslint-disable-line require-jsdoc
    {
      if (this._dropShadowAlpha !== dropShadowAlpha) {
        this._dropShadowAlpha = dropShadowAlpha
        this.styleID++
      }
    }
  }, {
    /**
     * Set a angle of the drop shadow
     *
     * @member {number}
     */
    key: 'dropShadowAngle',
    get: function get() {
      return this._dropShadowAngle
    },
    set: function set(dropShadowAngle) // eslint-disable-line require-jsdoc
    {
      if (this._dropShadowAngle !== dropShadowAngle) {
        this._dropShadowAngle = dropShadowAngle
        this.styleID++
      }
    }
  }, {
    /**
     * Set a shadow blur radius
     *
     * @member {number}
     */
    key: 'dropShadowBlur',
    get: function get() {
      return this._dropShadowBlur
    },
    set: function set(dropShadowBlur) // eslint-disable-line require-jsdoc
    {
      if (this._dropShadowBlur !== dropShadowBlur) {
        this._dropShadowBlur = dropShadowBlur
        this.styleID++
      }
    }
  }, {
    /**
     * A fill style to be used on the dropshadow e.g 'red', '#00FF00'
     *
     * @member {string|number}
     */
    key: 'dropShadowColor',
    get: function get() {
      return this._dropShadowColor
    },
    set: function set(dropShadowColor) // eslint-disable-line require-jsdoc
    {
      var outputColor = getColor(dropShadowColor)
      if (this._dropShadowColor !== outputColor) {
        this._dropShadowColor = outputColor
        this.styleID++
      }
    }
  }, {
    /**
     * Set a distance of the drop shadow
     *
     * @member {number}
     */
    key: 'dropShadowDistance',
    get: function get() {
      return this._dropShadowDistance
    },
    set: function set(dropShadowDistance) // eslint-disable-line require-jsdoc
    {
      if (this._dropShadowDistance !== dropShadowDistance) {
        this._dropShadowDistance = dropShadowDistance
        this.styleID++
      }
    }
  }, {
    /**
     * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
     * Can be an array to create a gradient eg ['#000000','#FFFFFF']
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
     *
     * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
     */
    key: 'fill',
    get: function get() {
      return this._fill
    },
    set: function set(fill) // eslint-disable-line require-jsdoc
    {
      var outputColor = getColor(fill)
      if (this._fill !== outputColor) {
        this._fill = outputColor
        this.styleID++
      }
    }
  }, {
    /**
     * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
     * See {@link PIXI.TEXT_GRADIENT}
     *
     * @member {number}
     */
    key: 'fillGradientType',
    get: function get() {
      return this._fillGradientType
    },
    set: function set(fillGradientType) // eslint-disable-line require-jsdoc
    {
      if (this._fillGradientType !== fillGradientType) {
        this._fillGradientType = fillGradientType
        this.styleID++
      }
    }
  }, {
    /**
     * If fill is an array of colours to create a gradient, this array can set the stop points
     * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
     *
     * @member {number[]}
     */
    key: 'fillGradientStops',
    get: function get() {
      return this._fillGradientStops
    },
    set: function set(fillGradientStops) // eslint-disable-line require-jsdoc
    {
      if (!areArraysEqual(this._fillGradientStops, fillGradientStops)) {
        this._fillGradientStops = fillGradientStops
        this.styleID++
      }
    }
  }, {
    /**
     * The font family
     *
     * @member {string|string[]}
     */
    key: 'fontFamily',
    get: function get() {
      return this._fontFamily
    },
    set: function set(fontFamily) // eslint-disable-line require-jsdoc
    {
      if (this.fontFamily !== fontFamily) {
        this._fontFamily = fontFamily
        this.styleID++
      }
    }
  }, {
    /**
     * The font size
     * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
     *
     * @member {number|string}
     */
    key: 'fontSize',
    get: function get() {
      return this._fontSize
    },
    set: function set(fontSize) // eslint-disable-line require-jsdoc
    {
      if (this._fontSize !== fontSize) {
        this._fontSize = fontSize
        this.styleID++
      }
    }
  }, {
    /**
     * The font style
     * ('normal', 'italic' or 'oblique')
     *
     * @member {string}
     */
    key: 'fontStyle',
    get: function get() {
      return this._fontStyle
    },
    set: function set(fontStyle) // eslint-disable-line require-jsdoc
    {
      if (this._fontStyle !== fontStyle) {
        this._fontStyle = fontStyle
        this.styleID++
      }
    }
  }, {
    /**
     * The font variant
     * ('normal' or 'small-caps')
     *
     * @member {string}
     */
    key: 'fontVariant',
    get: function get() {
      return this._fontVariant
    },
    set: function set(fontVariant) // eslint-disable-line require-jsdoc
    {
      if (this._fontVariant !== fontVariant) {
        this._fontVariant = fontVariant
        this.styleID++
      }
    }
  }, {
    /**
     * The font weight
     * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
     *
     * @member {string}
     */
    key: 'fontWeight',
    get: function get() {
      return this._fontWeight
    },
    set: function set(fontWeight) // eslint-disable-line require-jsdoc
    {
      if (this._fontWeight !== fontWeight) {
        this._fontWeight = fontWeight
        this.styleID++
      }
    }
  }, {
    /**
     * The amount of spacing between letters, default is 0
     *
     * @member {number}
     */
    key: 'letterSpacing',
    get: function get() {
      return this._letterSpacing
    },
    set: function set(letterSpacing) // eslint-disable-line require-jsdoc
    {
      if (this._letterSpacing !== letterSpacing) {
        this._letterSpacing = letterSpacing
        this.styleID++
      }
    }
  }, {
    /**
     * The line height, a number that represents the vertical space that a letter uses
     *
     * @member {number}
     */
    key: 'lineHeight',
    get: function get() {
      return this._lineHeight
    },
    set: function set(lineHeight) // eslint-disable-line require-jsdoc
    {
      if (this._lineHeight !== lineHeight) {
        this._lineHeight = lineHeight
        this.styleID++
      }
    }
  }, {
    /**
     * The space between lines
     *
     * @member {number}
     */
    key: 'leading',
    get: function get() {
      return this._leading
    },
    set: function set(leading) // eslint-disable-line require-jsdoc
    {
      if (this._leading !== leading) {
        this._leading = leading
        this.styleID++
      }
    }
  }, {
    /**
     * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
     * Default is 'miter' (creates a sharp corner).
     *
     * @member {string}
     */
    key: 'lineJoin',
    get: function get() {
      return this._lineJoin
    },
    set: function set(lineJoin) // eslint-disable-line require-jsdoc
    {
      if (this._lineJoin !== lineJoin) {
        this._lineJoin = lineJoin
        this.styleID++
      }
    }
  }, {
    /**
     * The miter limit to use when using the 'miter' lineJoin mode
     * This can reduce or increase the spikiness of rendered text.
     *
     * @member {number}
     */
    key: 'miterLimit',
    get: function get() {
      return this._miterLimit
    },
    set: function set(miterLimit) // eslint-disable-line require-jsdoc
    {
      if (this._miterLimit !== miterLimit) {
        this._miterLimit = miterLimit
        this.styleID++
      }
    }
  }, {
    /**
     * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
     * by adding padding to all sides of the text.
     *
     * @member {number}
     */
    key: 'padding',
    get: function get() {
      return this._padding
    },
    set: function set(padding) // eslint-disable-line require-jsdoc
    {
      if (this._padding !== padding) {
        this._padding = padding
        this.styleID++
      }
    }
  }, {
    /**
     * A canvas fillstyle that will be used on the text stroke
     * e.g 'blue', '#FCFF00'
     *
     * @member {string|number}
     */
    key: 'stroke',
    get: function get() {
      return this._stroke
    },
    set: function set(stroke) // eslint-disable-line require-jsdoc
    {
      var outputColor = getColor(stroke)
      if (this._stroke !== outputColor) {
        this._stroke = outputColor
        this.styleID++
      }
    }
  }, {
    /**
     * A number that represents the thickness of the stroke.
     * Default is 0 (no stroke)
     *
     * @member {number}
     */
    key: 'strokeThickness',
    get: function get() {
      return this._strokeThickness
    },
    set: function set(strokeThickness) // eslint-disable-line require-jsdoc
    {
      if (this._strokeThickness !== strokeThickness) {
        this._strokeThickness = strokeThickness
        this.styleID++
      }
    }
  }, {
    /**
     * The baseline of the text that is rendered.
     *
     * @member {string}
     */
    key: 'textBaseline',
    get: function get() {
      return this._textBaseline
    },
    set: function set(textBaseline) // eslint-disable-line require-jsdoc
    {
      if (this._textBaseline !== textBaseline) {
        this._textBaseline = textBaseline
        this.styleID++
      }
    }
  }, {
    /**
     * Trim transparent borders
     *
     * @member {boolean}
     */
    key: 'trim',
    get: function get() {
      return this._trim
    },
    set: function set(trim) // eslint-disable-line require-jsdoc
    {
      if (this._trim !== trim) {
        this._trim = trim
        this.styleID++
      }
    }
  }, {
    /**
     * How newlines and spaces should be handled.
     * Default is 'pre' (preserve, preserve).
     *
     *  value       | New lines     |   Spaces
     *  ---         | ---           |   ---
     * 'normal'     | Collapse      |   Collapse
     * 'pre'        | Preserve      |   Preserve
     * 'pre-line'   | Preserve      |   Collapse
     *
     * @member {string}
     */
    key: 'whiteSpace',
    get: function get() {
      return this._whiteSpace
    },
    set: function set(whiteSpace) // eslint-disable-line require-jsdoc
    {
      if (this._whiteSpace !== whiteSpace) {
        this._whiteSpace = whiteSpace
        this.styleID++
      }
    }
  }, {
    /**
     * Indicates if word wrap should be used
     *
     * @member {boolean}
     */
    key: 'wordWrap',
    get: function get() {
      return this._wordWrap
    },
    set: function set(wordWrap) // eslint-disable-line require-jsdoc
    {
      if (this._wordWrap !== wordWrap) {
        this._wordWrap = wordWrap
        this.styleID++
      }
    }
  }, {
    /**
     * The width at which text will wrap, it needs wordWrap to be set to true
     *
     * @member {number}
     */
    key: 'wordWrapWidth',
    get: function get() {
      return this._wordWrapWidth
    },
    set: function set(wordWrapWidth) // eslint-disable-line require-jsdoc
    {
      if (this._wordWrapWidth !== wordWrapWidth) {
        this._wordWrapWidth = wordWrapWidth
        this.styleID++
      }
    }
  }])

  /**
   * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
   * @private
   * @param {number|number[]} color
   * @return {string} The color as a string.
   */
  function getSingleColor(color) {
    if (typeof color === 'number') {
      return (0, utils.hex2string)(color)
    } else if (typeof color === 'string') {
      if (color.indexOf('0x') === 0) {
        color = color.replace('0x', '#')
      }
    }

    return color
  }

  /**
   * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
   * This version can also convert array of colors
   * @private
   * @param {number|number[]} color
   * @return {string} The color as a string.
   */
  function getColor(color) {
    if (!Array.isArray(color)) {
      return getSingleColor(color)
    } else {
      for (var i = 0; i < color.length; ++i) {
        color[i] = getSingleColor(color[i])
      }

      return color
    }
  }

  /**
   * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
   * This version can also convert array of colors
   * @private
   * @param {Array} array1 First array to compare
   * @param {Array} array2 Second array to compare
   * @return {boolean} Do the arrays contain the same values in the same order
   */
  function areArraysEqual(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
      return false
    }

    if (array1.length !== array2.length) {
      return false
    }

    for (var i = 0; i < array1.length; ++i) {
      if (array1[i] !== array2[i]) {
        return false
      }
    }

    return true
  }

  /**
   * Utility function to ensure that object properties are copied by value, and not by reference
   * @private
   * @param {Object} target Target object to copy properties into
   * @param {Object} source Source object for the proporties to copy
   * @param {string} propertyObj Object containing properties names we want to loop over
   */
  function deepCopyProperties(target, source, propertyObj) {
    for (var prop in propertyObj) {
      if (Array.isArray(source[prop])) {
        target[prop] = source[prop].slice()
      } else {
        target[prop] = source[prop]
      }
    }
  }

  return TextStyle
})()

/**
 * The Sprite object is the base for all textured objects that are rendered to the screen
 *
 * A sprite can be created directly from an image like this:
 *
 * ```js
 * let sprite = new PIXI.Sprite.fromImage('assets/image.png')
 * ```
 *
 * @class
 * @extends PIXI.Container
 * @memberof PIXI
 */
const Sprite = (_Container => {
  inherits_(Sprite, _Container)

  /**
   * @param {PIXI.Texture} texture - The texture for this sprite
   */
  function Sprite(texture) {
    class_call_check_(this, Sprite)

    /**
     * The anchor sets the origin point of the texture.
     * The default is 0,0 this means the texture's origin is the top left
     * Setting the anchor to 0.5,0.5 means the texture's origin is centered
     * Setting the anchor to 1,1 would mean the texture's origin point will be the bottom right corner
     *
     * @member {PIXI.ObservablePoint}
     * @private
     */
    var _this = get_constructor_(this, _Container.call(this))

    _this._anchor = new math.ObservablePoint(_this._onAnchorUpdate, _this)

    /**
     * The texture that the sprite is using
     *
     * @private
     * @member {PIXI.Texture}
     */
    _this._texture = null

    /**
     * The width of the sprite (this is initially set by the texture)
     *
     * @private
     * @member {number}
     */
    _this._width = 0

    /**
     * The height of the sprite (this is initially set by the texture)
     *
     * @private
     * @member {number}
     */
    _this._height = 0

    /**
     * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
     *
     * @private
     * @member {number}
     * @default 0xFFFFFF
     */
    _this._tint = null
    _this._tintRGB = null
    _this.tint = 0xFFFFFF

    /**
     * The blend mode to be applied to the sprite. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
     *
     * @member {number}
     * @default PIXI.BLEND_MODES.NORMAL
     * @see PIXI.BLEND_MODES
     */
    _this.blendMode = constants.BLEND_MODES.NORMAL

    /**
     * The shader that will be used to render the sprite. Set to null to remove a current shader.
     *
     * @member {PIXI.Filter|PIXI.Shader}
     */
    _this.shader = null

    /**
     * An internal cached value of the tint.
     *
     * @private
     * @member {number}
     * @default 0xFFFFFF
     */
    _this.cachedTint = 0xFFFFFF

    // call texture setter
    _this.texture = texture || Texture.EMPTY

    /**
     * this is used to store the vertex data of the sprite (basically a quad)
     *
     * @private
     * @member {Float32Array}
     */
    _this.vertexData = new Float32Array(8)

    /**
     * This is used to calculate the bounds of the object IF it is a trimmed sprite
     *
     * @private
     * @member {Float32Array}
     */
    _this.vertexTrimmedData = null

    _this._transformID = -1
    _this._textureID = -1

    _this._transformTrimmedID = -1
    _this._textureTrimmedID = -1

    /**
     * Plugin that is responsible for rendering this element.
     * Allows to customize the rendering process without overriding '_renderWebGL' & '_renderCanvas' methods.
     *
     * @member {string}
     * @default 'sprite'
     */
    _this.pluginName = 'sprite'
    return _this
  }

  var tempPoint = new math.Point()

  /**
   * When the texture is updated, this event will fire to update the scale and frame
   *
   * @private
   */
  Sprite.prototype._onTextureUpdate = function _onTextureUpdate() {
    this._textureID = -1
    this._textureTrimmedID = -1
    this.cachedTint = 0xFFFFFF

    // so if _width is 0 then width was not set..
    if (this._width) {
      this.scale.x = (0, utils.sign)(this.scale.x) * this._width / this._texture.orig.width
    }

    if (this._height) {
      this.scale.y = (0, utils.sign)(this.scale.y) * this._height / this._texture.orig.height
    }
  }

  /**
   * Called when the anchor position updates.
   *
   * @private
   */
  Sprite.prototype._onAnchorUpdate = function _onAnchorUpdate() {
    this._transformID = -1
    this._transformTrimmedID = -1
  }

  /**
   * calculates worldTransform * vertices, store it in vertexData
   */
  Sprite.prototype.calculateVertices = function calculateVertices() {
    if (this._transformID === this.transform._worldID && this._textureID === this._texture._updateID) {
      return
    }

    this._transformID = this.transform._worldID
    this._textureID = this._texture._updateID

    // set the vertex data

    var texture = this._texture
    var wt = this.transform.worldTransform
    var a = wt.a
    var b = wt.b
    var c = wt.c
    var d = wt.d
    var tx = wt.tx
    var ty = wt.ty
    var vertexData = this.vertexData
    var trim = texture.trim
    var orig = texture.orig
    var anchor = this._anchor

    var w0 = 0
    var w1 = 0
    var h0 = 0
    var h1 = 0

    if (trim) {
      // if the sprite is trimmed and is not a tilingsprite then we need to add the extra
      // space before transforming the sprite coords.
      w1 = trim.x - anchor._x * orig.width
      w0 = w1 + trim.width

      h1 = trim.y - anchor._y * orig.height
      h0 = h1 + trim.height
    } else {
      w1 = -anchor._x * orig.width
      w0 = w1 + orig.width

      h1 = -anchor._y * orig.height
      h0 = h1 + orig.height
    }

    // xy
    vertexData[0] = a * w1 + c * h1 + tx
    vertexData[1] = d * h1 + b * w1 + ty

    // xy
    vertexData[2] = a * w0 + c * h1 + tx
    vertexData[3] = d * h1 + b * w0 + ty

    // xy
    vertexData[4] = a * w0 + c * h0 + tx
    vertexData[5] = d * h0 + b * w0 + ty

    // xy
    vertexData[6] = a * w1 + c * h0 + tx
    vertexData[7] = d * h0 + b * w1 + ty
  }

  /**
   * calculates worldTransform * vertices for a non texture with a trim. store it in vertexTrimmedData
   * This is used to ensure that the true width and height of a trimmed texture is respected
   */
  Sprite.prototype.calculateTrimmedVertices = function calculateTrimmedVertices() {
    if (!this.vertexTrimmedData) {
      this.vertexTrimmedData = new Float32Array(8)
    } else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) {
      return
    }

    this._transformTrimmedID = this.transform._worldID
    this._textureTrimmedID = this._texture._updateID

    // lets do some special trim code!
    var texture = this._texture
    var vertexData = this.vertexTrimmedData
    var orig = texture.orig
    var anchor = this._anchor

    // lets calculate the new untrimmed bounds..
    var wt = this.transform.worldTransform
    var a = wt.a
    var b = wt.b
    var c = wt.c
    var d = wt.d
    var tx = wt.tx
    var ty = wt.ty

    var w1 = -anchor._x * orig.width
    var w0 = w1 + orig.width

    var h1 = -anchor._y * orig.height
    var h0 = h1 + orig.height

    // xy
    vertexData[0] = a * w1 + c * h1 + tx
    vertexData[1] = d * h1 + b * w1 + ty

    // xy
    vertexData[2] = a * w0 + c * h1 + tx
    vertexData[3] = d * h1 + b * w0 + ty

    // xy
    vertexData[4] = a * w0 + c * h0 + tx
    vertexData[5] = d * h0 + b * w0 + ty

    // xy
    vertexData[6] = a * w1 + c * h0 + tx
    vertexData[7] = d * h0 + b * w1 + ty
  }

  /**
   *
   * Renders the object using the WebGL renderer
   *
   * @private
   * @param {PIXI.WebGLRenderer} renderer - The webgl renderer to use.
   */
  Sprite.prototype._renderWebGL = function _renderWebGL(renderer) {
    this.calculateVertices()

    renderer.setObjectRenderer(renderer.plugins[this.pluginName])
    renderer.plugins[this.pluginName].render(this)
  }

  /**
   * Renders the object using the Canvas renderer
   *
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  Sprite.prototype._renderCanvas = function _renderCanvas(renderer) {
    renderer.plugins[this.pluginName].render(this)
  }

  /**
   * Updates the bounds of the sprite.
   *
   * @private
   */
  Sprite.prototype._calculateBounds = function _calculateBounds() {
    var trim = this._texture.trim
    var orig = this._texture.orig

    // First lets check to see if the current texture has a trim..
    if (!trim || trim.width === orig.width && trim.height === orig.height) {
      // no trim! lets use the usual calculations..
      this.calculateVertices()
      this._bounds.addQuad(this.vertexData)
    } else {
      // lets calculate a special trimmed bounds...
      this.calculateTrimmedVertices()
      this._bounds.addQuad(this.vertexTrimmedData)
    }
  }

  /**
   * Gets the local bounds of the sprite object.
   *
   * @param {PIXI.Rectangle} rect - The output rectangle.
   * @return {PIXI.Rectangle} The bounds.
   */
  Sprite.prototype.getLocalBounds = function getLocalBounds(rect) {
    // we can do a fast local bounds if the sprite has no children!
    if (this.children.length === 0) {
      this._bounds.minX = this._texture.orig.width * -this._anchor._x
      this._bounds.minY = this._texture.orig.height * -this._anchor._y
      this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x)
      this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y)

      if (!rect) {
        if (!this._localBoundsRect) {
          this._localBoundsRect = new math.Rectangle()
        }

        rect = this._localBoundsRect
      }

      return this._bounds.getRectangle(rect)
    }

    return _Container.prototype.getLocalBounds.call(this, rect)
  }

  /**
   * Tests if a point is inside this sprite
   *
   * @param {PIXI.Point} point - the point to test
   * @return {boolean} the result of the test
   */
  Sprite.prototype.containsPoint = function containsPoint(point) {
    this.worldTransform.applyInverse(point, tempPoint)

    var width = this._texture.orig.width
    var height = this._texture.orig.height
    var x1 = -width * this.anchor.x
    var y1 = 0

    if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
      y1 = -height * this.anchor.y

      if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
        return true
      }
    }

    return false
  }

  /**
   * Destroys this sprite and optionally its texture and children
   *
   * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *      method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well
   * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
   */
  Sprite.prototype.destroy = function destroy(options) {
    _Container.prototype.destroy.call(this, options)

    this._texture.off('update', this._onTextureUpdate, this)

    this._anchor = null

    var destroyTexture = typeof options === 'boolean' ? options : options && options.texture

    if (destroyTexture) {
      var destroyBaseTexture = typeof options === 'boolean' ? options : options && options.baseTexture

      this._texture.destroy(!!destroyBaseTexture)
    }

    this._texture = null
    this.shader = null
  }

  // some helper functions..

  /**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   *
   * @static
   * @param {number|string|PIXI.BaseTexture|HTMLCanvasElement|HTMLVideoElement} source Source to create texture from
   * @return {PIXI.Sprite} The newly created sprite
   */
  Sprite.from = function from(source) {
    return new Sprite(Texture.from(source))
  }

  /**
   * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
   * The frame ids are created when a Texture packer file has been loaded
   *
   * @static
   * @param {string} frameId - The frame Id of the texture in the cache
   * @return {PIXI.Sprite} A new Sprite using a texture from the texture cache matching the frameId
   */
  Sprite.fromFrame = function fromFrame(frameId) {
    var texture = utils.TextureCache[frameId]

    if (!texture) {
      throw new Error('The frameId "' + frameId + '" does not exist in the texture cache')
    }

    return new Sprite(texture)
  }

  /**
   * Helper function that creates a sprite that will contain a texture based on an image url
   * If the image is not in the texture cache it will be loaded
   *
   * @static
   * @param {string} imageId - The image url of the texture
   * @param {boolean} [crossorigin=(auto)] - if you want to specify the cross-origin parameter
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - if you want to specify the scale mode,
   *  see {@link PIXI.SCALE_MODES} for possible values
   * @return {PIXI.Sprite} A new Sprite using a texture from the texture cache matching the image id
   */
  Sprite.fromImage = function fromImage(imageId, crossorigin, scaleMode) {
    return new Sprite(Texture.fromImage(imageId, crossorigin, scaleMode))
  }

  /**
   * The width of the sprite, setting this will actually modify the scale to achieve the value set
   *
   * @member {number}
   */
  create_class_(Sprite, [{
    key: 'width',
    get: function get() {
      return Math.abs(this.scale.x) * this._texture.orig.width
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      var s = (0, utils.sign)(this.scale.x) || 1

      this.scale.x = s * value / this._texture.orig.width
      this._width = value
    }

    /**
     * The height of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */

  }, {
    key: 'height',
    get: function get() {
      return Math.abs(this.scale.y) * this._texture.orig.height
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      var s = (0, utils.sign)(this.scale.y) || 1

      this.scale.y = s * value / this._texture.orig.height
      this._height = value
    }

    /**
     * The anchor sets the origin point of the texture.
     * The default is 0,0 this means the texture's origin is the top left
     * Setting the anchor to 0.5,0.5 means the texture's origin is centered
     * Setting the anchor to 1,1 would mean the texture's origin point will be the bottom right corner
     *
     * @member {PIXI.ObservablePoint}
     */

  }, {
    key: 'anchor',
    get: function get() {
      return this._anchor
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._anchor.copy(value)
    }

    /**
     * The tint applied to the sprite. This is a hex value.
     * A value of 0xFFFFFF will remove any tint effect.
     *
     * @member {number}
     * @default 0xFFFFFF
     */

  }, {
    key: 'tint',
    get: function get() {
      return this._tint
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._tint = value
      this._tintRGB = (value >> 16) + (value & 0xff00) + ((value & 0xff) << 16)
    }

    /**
     * The texture that the sprite is using
     *
     * @member {PIXI.Texture}
     */

  }, {
    key: 'texture',
    get: function get() {
      return this._texture
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      if (this._texture === value) {
        return
      }

      this._texture = value
      this.cachedTint = 0xFFFFFF

      this._textureID = -1
      this._textureTrimmedID = -1

      if (value) {
        // wait for the texture to load
        if (value.baseTexture.hasLoaded) {
          this._onTextureUpdate()
        } else {
          value.once('update', this._onTextureUpdate, this)
        }
      }
    }
  }])

  return Sprite
})(Container)

const generateMultiTextureShader = (() => {

  var fragTemplate = [
    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',
    'varying float vTextureId;',
    'uniform sampler2D uSamplers[%count%];',
    'void main(void){',
    '  vec4 color;',
    '  float textureId = floor(vTextureId+0.5);',
    '  %forloop%',
    '  gl_FragColor = color * vColor;',
    '}'
  ].join('\n')

  function generateMultiTextureShader(gl, maxTextures) {
    var vertexSrc = [
      'precision highp float;',
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',
      'attribute vec4 aColor;',
      'attribute float aTextureId;',
      'uniform mat3 projectionMatrix;',
      'varying vec2 vTextureCoord;',
      'varying vec4 vColor;',
      'varying float vTextureId;',
      'void main(void){',
      '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
      '    vTextureCoord = aTextureCoord;',
      '    vTextureId = aTextureId;',
      '    vColor = aColor;',
      '}'
    ].join('\n')
    var fragmentSrc = fragTemplate

    fragmentSrc = fragmentSrc.replace(/%count%/gi, maxTextures)
    fragmentSrc = fragmentSrc.replace(/%forloop%/gi, generateSampleSrc(maxTextures))

    var shader = new Shader(gl, vertexSrc, fragmentSrc)

    var sampleValues = []

    for (var i = 0; i < maxTextures; i++) {
      sampleValues[i] = i
    }

    shader.bind()
    shader.uniforms.uSamplers = sampleValues

    return shader
  }

  function generateSampleSrc(maxTextures) {
    var src = ''

    src += '\n'
    src += '\n'

    for (var i = 0; i < maxTextures; i++) {
      if (i > 0) {
        src += '\nelse '
      }

      if (i < maxTextures - 1) {
        src += 'if(textureId == ' + i + '.0)'
      }

      src += '\n{'
      src += '\n\tcolor = texture2D(uSamplers[' + i + '], vTextureCoord);'
      src += '\n}'
    }

    src += '\n'
    src += '\n'

    return src
  }

  return generateMultiTextureShader
})()

/**
 * A Text Object will create a line or multiple lines of text. To split a line you can use '\n' in your text string,
 * or add a wordWrap property set to true and and wordWrapWidth property with a value in the style object.
 *
 * A Text can be created directly from a string and a style object
 *
 * ```js
 * let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
 * ```
 *
 * @class
 * @extends PIXI.Sprite
 * @memberof PIXI
 */
const Text = (_Sprite => {
  inherits_(Text, _Sprite)

  /**
   * @param {string} text - The string that you would like the text to display
   * @param {object|PIXI.TextStyle} [style] - The style parameters
   * @param {HTMLCanvasElement} [canvas] - The canvas element for drawing text
   */
  function Text(text, style, canvas) {
    class_call_check_(this, Text)

    canvas = canvas || document.createElement('canvas')

    canvas.width = 3
    canvas.height = 3

    var texture = Texture.fromCanvas(canvas, settings.SCALE_MODE, 'text')

    texture.orig = new math.Rectangle()
    texture.trim = new math.Rectangle()

    // base texture is already automatically added to the cache, now adding the actual texture
    var _this = get_constructor_(this, _Sprite.call(this, texture))

    Texture.addToCache(_this._texture, _this._texture.baseTexture.textureCacheIds[0])

    /**
     * The canvas element that everything is drawn to
     *
     * @member {HTMLCanvasElement}
     */
    _this.canvas = canvas

    /**
     * The canvas 2d context that everything is drawn with
     * @member {CanvasRenderingContext2D}
     */
    _this.context = _this.canvas.getContext('2d')

    /**
     * The resolution / device pixel ratio of the canvas. This is set automatically by the renderer.
     * @member {number}
     * @default 1
     */
    _this.resolution = settings.RESOLUTION

    /**
     * Private tracker for the current text.
     *
     * @member {string}
     * @private
     */
    _this._text = null

    /**
     * Private tracker for the current style.
     *
     * @member {object}
     * @private
     */
    _this._style = null
    /**
     * Private listener to track style changes.
     *
     * @member {Function}
     * @private
     */
    _this._styleListener = null

    /**
     * Private tracker for the current font.
     *
     * @member {string}
     * @private
     */
    _this._font = ''

    _this.text = text
    _this.style = style

    _this.localStyleID = -1
    return _this
  }

  var defaultDestroyOptions = {
    texture: true,
    children: false,
    baseTexture: true
  }

  /**
   * Renders text and updates it when needed.
   *
   * @private
   * @param {boolean} respectDirty - Whether to abort updating the text if the Text isn't dirty and the function is called.
   */
  Text.prototype.updateText = function updateText(respectDirty) {
    var style = this._style

    // check if style has changed..
    if (this.localStyleID !== style.styleID) {
      this.dirty = true
      this.localStyleID = style.styleID
    }

    if (!this.dirty && respectDirty) {
      return
    }

    this._font = this._style.toFontString()

    var context = this.context
    var measured = TextMetrics.measureText(this._text, this._style, this._style.wordWrap, this.canvas)
    var width = measured.width
    var height = measured.height
    var lines = measured.lines
    var lineHeight = measured.lineHeight
    var lineWidths = measured.lineWidths
    var maxLineWidth = measured.maxLineWidth
    var fontProperties = measured.fontProperties

    this.canvas.width = Math.ceil((Math.max(1, width) + style.padding * 2) * this.resolution)
    this.canvas.height = Math.ceil((Math.max(1, height) + style.padding * 2) * this.resolution)

    context.scale(this.resolution, this.resolution)

    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    context.font = this._font
    context.strokeStyle = style.stroke
    context.lineWidth = style.strokeThickness
    context.textBaseline = style.textBaseline
    context.lineJoin = style.lineJoin
    context.miterLimit = style.miterLimit

    var linePositionX = void 0
    var linePositionY = void 0

    if (style.dropShadow) {
      context.fillStyle = style.dropShadowColor
      context.globalAlpha = style.dropShadowAlpha
      context.shadowBlur = style.dropShadowBlur

      if (style.dropShadowBlur > 0) {
        context.shadowColor = style.dropShadowColor
      }

      var xShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance
      var yShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance

      for (var i = 0; i < lines.length; i++) {
        linePositionX = style.strokeThickness / 2
        linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent

        if (style.align === 'right') {
          linePositionX += maxLineWidth - lineWidths[i]
        } else if (style.align === 'center') {
          linePositionX += (maxLineWidth - lineWidths[i]) / 2
        }

        if (style.fill) {
          this.drawLetterSpacing(
            lines[i], linePositionX + xShadowOffset + style.padding,
            linePositionY + yShadowOffset + style.padding
          )

          if (style.stroke && style.strokeThickness) {
            context.strokeStyle = style.dropShadowColor
            this.drawLetterSpacing(
              lines[i], linePositionX + xShadowOffset + style.padding,
              linePositionY + yShadowOffset + style.padding, true
            )
            context.strokeStyle = style.stroke
          }
        }
      }
    }

    // reset the shadow blur and alpha that was set by the drop shadow, for the regular text
    context.shadowBlur = 0
    context.globalAlpha = 1

    // set canvas text styles
    context.fillStyle = this._generateFillStyle(style, lines)

    // draw lines line by line
    for (var _i = 0; _i < lines.length; _i++) {
      linePositionX = style.strokeThickness / 2
      linePositionY = style.strokeThickness / 2 + _i * lineHeight + fontProperties.ascent

      if (style.align === 'right') {
        linePositionX += maxLineWidth - lineWidths[_i]
      } else if (style.align === 'center') {
        linePositionX += (maxLineWidth - lineWidths[_i]) / 2
      }

      if (style.stroke && style.strokeThickness) {
        this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding, true)
      }

      if (style.fill) {
        this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding)
      }
    }

    this.updateTexture()
  }

  /**
   * Render the text with letter-spacing.
   * @param {string} text - The text to draw
   * @param {number} x - Horizontal position to draw the text
   * @param {number} y - Vertical position to draw the text
   * @param {boolean} [isStroke=false] - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   * @private
   */
  Text.prototype.drawLetterSpacing = function drawLetterSpacing(text, x, y) {
    var isStroke = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

    var style = this._style

    // letterSpacing of 0 means normal
    var letterSpacing = style.letterSpacing

    if (letterSpacing === 0) {
      if (isStroke) {
        this.context.strokeText(text, x, y)
      } else {
        this.context.fillText(text, x, y)
      }

      return
    }

    var characters = String.prototype.split.call(text, '')
    var currentPosition = x
    var index = 0
    var current = ''

    while (index < text.length) {
      current = characters[index++]
      if (isStroke) {
        this.context.strokeText(current, currentPosition, y)
      } else {
        this.context.fillText(current, currentPosition, y)
      }
      currentPosition += this.context.measureText(current).width + letterSpacing
    }
  }

  /**
   * Updates texture size based on canvas size
   *
   * @private
   */
  Text.prototype.updateTexture = function updateTexture() {
    var canvas = this.canvas

    if (this._style.trim) {
      var trimmed = (0, trimCanvas)(canvas)

      canvas.width = trimmed.width
      canvas.height = trimmed.height
      this.context.putImageData(trimmed.data, 0, 0)
    }

    var texture = this._texture
    var style = this._style
    var padding = style.trim ? 0 : style.padding
    var baseTexture = texture.baseTexture

    baseTexture.hasLoaded = true
    baseTexture.resolution = this.resolution

    baseTexture.realWidth = canvas.width
    baseTexture.realHeight = canvas.height
    baseTexture.width = canvas.width / this.resolution
    baseTexture.height = canvas.height / this.resolution

    texture.trim.width = texture._frame.width = canvas.width / this.resolution
    texture.trim.height = texture._frame.height = canvas.height / this.resolution
    texture.trim.x = -padding
    texture.trim.y = -padding

    texture.orig.width = texture._frame.width - padding * 2
    texture.orig.height = texture._frame.height - padding * 2

    // call sprite onTextureUpdate to update scale if _width or _height were set
    this._onTextureUpdate()

    baseTexture.emit('update', baseTexture)

    this.dirty = false
  }

  /**
   * Renders the object using the WebGL renderer
   *
   * @param {PIXI.WebGLRenderer} renderer - The renderer
   */
  Text.prototype.renderWebGL = function renderWebGL(renderer) {
    if (this.resolution !== renderer.resolution) {
      this.resolution = renderer.resolution
      this.dirty = true
    }

    this.updateText(true)

    _Sprite.prototype.renderWebGL.call(this, renderer)
  }

  /**
   * Renders the object using the Canvas renderer
   *
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  Text.prototype._renderCanvas = function _renderCanvas(renderer) {
    if (this.resolution !== renderer.resolution) {
      this.resolution = renderer.resolution
      this.dirty = true
    }

    this.updateText(true)

    _Sprite.prototype._renderCanvas.call(this, renderer)
  }

  /**
   * Gets the local bounds of the text object.
   *
   * @param {Rectangle} rect - The output rectangle.
   * @return {Rectangle} The bounds.
   */
  Text.prototype.getLocalBounds = function getLocalBounds(rect) {
    this.updateText(true)

    return _Sprite.prototype.getLocalBounds.call(this, rect)
  }

  /**
   * calculates the bounds of the Text as a rectangle. The bounds calculation takes the worldTransform into account.
   */
  Text.prototype._calculateBounds = function _calculateBounds() {
    this.updateText(true)
    this.calculateVertices()
    // if we have already done this on THIS frame.
    this._bounds.addQuad(this.vertexData)
  }

  /**
   * Method to be called upon a TextStyle change.
   * @private
   */
  Text.prototype._onStyleChange = function _onStyleChange() {
    this.dirty = true
  }

  /**
   * Generates the fill style. Can automatically generate a gradient based on the fill style being an array
   *
   * @private
   * @param {object} style - The style.
   * @param {string[]} lines - The lines of text.
   * @return {string|number|CanvasGradient} The fill style
   */
  Text.prototype._generateFillStyle = function _generateFillStyle(style, lines) {
    if (!Array.isArray(style.fill)) {
      return style.fill
    }

    // cocoon on canvas+ cannot generate textures, so use the first colour instead
    if (navigator.isCocoonJS) {
      return style.fill[0]
    }

    // the gradient will be evenly spaced out according to how large the array is.
    // ['#FF0000', '#00FF00', '#0000FF'] would created stops at 0.25, 0.5 and 0.75
    var gradient = void 0
    var totalIterations = void 0
    var currentIteration = void 0
    var stop = void 0

    var width = this.canvas.width / this.resolution
    var height = this.canvas.height / this.resolution

    // make a copy of the style settings, so we can manipulate them later
    var fill = style.fill.slice()
    var fillGradientStops = style.fillGradientStops.slice()

    // wanting to evenly distribute the fills. So an array of 4 colours should give fills of 0.25, 0.5 and 0.75
    if (!fillGradientStops.length) {
      var lengthPlus1 = fill.length + 1

      for (var i = 1; i < lengthPlus1; ++i) {
        fillGradientStops.push(i / lengthPlus1)
      }
    }

    // stop the bleeding of the last gradient on the line above to the top gradient of the this line
    // by hard defining the first gradient colour at point 0, and last gradient colour at point 1
    fill.unshift(style.fill[0])
    fillGradientStops.unshift(0)

    fill.push(style.fill[style.fill.length - 1])
    fillGradientStops.push(1)

    if (style.fillGradientType === constants.TEXT_GRADIENT.LINEAR_VERTICAL) {
      // start the gradient at the top center of the canvas, and end at the bottom middle of the canvas
      gradient = this.context.createLinearGradient(width / 2, 0, width / 2, height)

      // we need to repeat the gradient so that each individual line of text has the same vertical gradient effect
      // ['#FF0000', '#00FF00', '#0000FF'] over 2 lines would create stops at 0.125, 0.25, 0.375, 0.625, 0.75, 0.875
      totalIterations = (fill.length + 1) * lines.length
      currentIteration = 0
      for (var _i2 = 0; _i2 < lines.length; _i2++) {
        currentIteration += 1
        for (var j = 0; j < fill.length; j++) {
          if (typeof fillGradientStops[j] === 'number') {
            stop = fillGradientStops[j] / lines.length + _i2 / lines.length
          } else {
            stop = currentIteration / totalIterations
          }
          gradient.addColorStop(stop, fill[j])
          currentIteration++
        }
      }
    } else {
      // start the gradient at the center left of the canvas, and end at the center right of the canvas
      gradient = this.context.createLinearGradient(0, height / 2, width, height / 2)

      // can just evenly space out the gradients in this case, as multiple lines makes no difference
      // to an even left to right gradient
      totalIterations = fill.length + 1
      currentIteration = 1

      for (var _i3 = 0; _i3 < fill.length; _i3++) {
        if (typeof fillGradientStops[_i3] === 'number') {
          stop = fillGradientStops[_i3]
        } else {
          stop = currentIteration / totalIterations
        }
        gradient.addColorStop(stop, fill[_i3])
        currentIteration++
      }
    }

    return gradient
  }

  /**
   * Destroys this text object.
   * Note* Unlike a Sprite, a Text object will automatically destroy its baseTexture and texture as
   * the majority of the time the texture will not be shared with any other Sprites.
   *
   * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their
   *  destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=true] - Should it destroy the current texture of the sprite as well
   * @param {boolean} [options.baseTexture=true] - Should it destroy the base texture of the sprite as well
   */
  Text.prototype.destroy = function destroy(options) {
    if (typeof options === 'boolean') {
      options = {
        children: options
      }
    }

    options = Object.assign({}, defaultDestroyOptions, options)

    _Sprite.prototype.destroy.call(this, options)

    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this.context = null
    this.canvas = null

    this._style = null
  }

  /**
   * The width of the Text, setting this will actually modify the scale to achieve the value set
   *
   * @member {number}
   */
  create_class_(Text, [{
    key: 'width',
    get: function get() {
      this.updateText(true)

      return Math.abs(this.scale.x) * this._texture.orig.width
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.updateText(true)

      var s = (0, utils.sign)(this.scale.x) || 1

      this.scale.x = s * value / this._texture.orig.width
      this._width = value
    }

    /**
     * The height of the Text, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */

  }, {
    key: 'height',
    get: function get() {
      this.updateText(true)

      return Math.abs(this.scale.y) * this._texture.orig.height
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.updateText(true)

      var s = (0, utils.sign)(this.scale.y) || 1

      this.scale.y = s * value / this._texture.orig.height
      this._height = value
    }

    /**
     * Set the style of the text. Set up an event listener to listen for changes on the style
     * object and mark the text as dirty.
     *
     * @member {object|PIXI.TextStyle}
     */

  }, {
    key: 'style',
    get: function get() {
      return this._style
    },
    set: function set(style) // eslint-disable-line require-jsdoc
    {
      style = style || {}

      if (style instanceof TextStyle) {
        this._style = style
      } else {
        this._style = new TextStyle(style)
      }

      this.localStyleID = -1
      this.dirty = true
    }

    /**
     * Set the copy for the text object. To split a line you can use '\n'.
     *
     * @member {string}
     */

  }, {
    key: 'text',
    get: function get() {
      return this._text
    },
    set: function set(text) // eslint-disable-line require-jsdoc
    {
      text = String(text === '' || text === null || text === undefined ? ' ' : text)

      if (this._text === text) {
        return
      }
      this._text = text
      this.dirty = true
    }
  }])

  return Text
})(Sprite)

/**
 * Utility methods for Sprite/Texture tinting.
 *
 * @class
 * @memberof PIXI
 */
const CanvasTinter = (() => {
  const canUseMultiply = canUseNewCanvasBlendModes
  const tintWithMultiply = (texture, color, canvas) => {
    var context = canvas.getContext('2d')
    var crop = texture._frame.clone()
    var resolution = texture.baseTexture.resolution

    crop.x *= resolution
    crop.y *= resolution
    crop.width *= resolution
    crop.height *= resolution

    canvas.width = Math.ceil(crop.width)
    canvas.height = Math.ceil(crop.height)

    context.save()
    context.fillStyle = '#' + ('00000' + (color | 0).toString(16)).substr(-6)

    context.fillRect(0, 0, crop.width, crop.height)

    context.globalCompositeOperation = 'multiply'

    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)

    context.globalCompositeOperation = 'destination-atop'

    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)
    context.restore()
  }
  const tintWithPerPixel = (texture, color, canvas) => {
    var context = canvas.getContext('2d')
    var crop = texture._frame.clone()
    var resolution = texture.baseTexture.resolution

    crop.x *= resolution
    crop.y *= resolution
    crop.width *= resolution
    crop.height *= resolution

    canvas.width = Math.ceil(crop.width)
    canvas.height = Math.ceil(crop.height)

    context.save()
    context.globalCompositeOperation = 'copy'
    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)
    context.restore()

    var rgbValues = (0, utils.hex2rgb)(color)
    var r = rgbValues[0]
    var g = rgbValues[1]
    var b = rgbValues[2]

    var pixelData = context.getImageData(0, 0, crop.width, crop.height)

    var pixels = pixelData.data

    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i + 0] *= r
      pixels[i + 1] *= g
      pixels[i + 2] *= b
    }

    context.putImageData(pixelData, 0, 0)
  }

  return ({
    /**
     * Basically this method just needs a sprite and a color and tints the sprite with the given color.
     *
     * @memberof PIXI.CanvasTinter
     * @param {PIXI.Sprite} sprite - the sprite to tint
     * @param {number} color - the color to use to tint the sprite with
     * @return {HTMLCanvasElement} The tinted canvas
     */
    getTintedTexture: function getTintedTexture(sprite, color) {
      var texture = sprite._texture

      color = CanvasTinter.roundColor(color)

      var stringColor = '#' + ('00000' + (color | 0).toString(16)).substr(-6)

      texture.tintCache = texture.tintCache || {}

      var cachedTexture = texture.tintCache[stringColor]

      var canvas = void 0

      if (cachedTexture) {
        if (cachedTexture.tintId === texture._updateID) {
          return texture.tintCache[stringColor]
        }

        canvas = texture.tintCache[stringColor]
      } else {
        canvas = CanvasTinter.canvas || document.createElement('canvas')
      }

      CanvasTinter.tintMethod(texture, color, canvas)

      canvas.tintId = texture._updateID

      if (CanvasTinter.convertTintToImage) {
        // is this better?
        var tintImage = new Image()

        tintImage.src = canvas.toDataURL()

        texture.tintCache[stringColor] = tintImage
      } else {
        texture.tintCache[stringColor] = canvas
        // if we are not converting the texture to an image then we need to lose the reference to the canvas
        CanvasTinter.canvas = null
      }

      return canvas
    },

    /**
     * Tint a texture using the 'multiply' operation.
     *
     * @memberof PIXI.CanvasTinter
     * @param {PIXI.Texture} texture - the texture to tint
     * @param {number} color - the color to use to tint the sprite with
     * @param {HTMLCanvasElement} canvas - the current canvas
     */
    tintWithMultiply,

    /**
     * Tint a texture using the 'overlay' operation.
     *
     * @memberof PIXI.CanvasTinter
     * @param {PIXI.Texture} texture - the texture to tint
     * @param {number} color - the color to use to tint the sprite with
     * @param {HTMLCanvasElement} canvas - the current canvas
     */
    tintWithOverlay: function tintWithOverlay(texture, color, canvas) {
      var context = canvas.getContext('2d')
      var crop = texture._frame.clone()
      var resolution = texture.baseTexture.resolution

      crop.x *= resolution
      crop.y *= resolution
      crop.width *= resolution
      crop.height *= resolution

      canvas.width = Math.ceil(crop.width)
      canvas.height = Math.ceil(crop.height)

      context.save()
      context.globalCompositeOperation = 'copy'
      context.fillStyle = '#' + ('00000' + (color | 0).toString(16)).substr(-6)
      context.fillRect(0, 0, crop.width, crop.height)

      context.globalCompositeOperation = 'destination-atop'
      context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)

      // context.globalCompositeOperation = 'copy'
      context.restore()
    },

    /**
     * Tint a texture pixel per pixel.
     *
     * @memberof PIXI.CanvasTinter
     * @param {PIXI.Texture} texture - the texture to tint
     * @param {number} color - the color to use to tint the sprite with
     * @param {HTMLCanvasElement} canvas - the current canvas
     */
    tintWithPerPixel,

    /**
     * Rounds the specified color according to the CanvasTinter.cacheStepsPerColorChannel.
     *
     * @memberof PIXI.CanvasTinter
     * @param {number} color - the color to round, should be a hex color
     * @return {number} The rounded color.
     */
    roundColor: function roundColor(color) {
      var step = CanvasTinter.cacheStepsPerColorChannel

      var rgbValues = (0, utils.hex2rgb)(color)

      rgbValues[0] = Math.min(255, rgbValues[0] / step * step)
      rgbValues[1] = Math.min(255, rgbValues[1] / step * step)
      rgbValues[2] = Math.min(255, rgbValues[2] / step * step)

      return (0, utils.rgb2hex)(rgbValues)
    },

    /**
     * Number of steps which will be used as a cap when rounding colors.
     *
     * @memberof PIXI.CanvasTinter
     * @type {number}
     */
    cacheStepsPerColorChannel: 8,

    /**
     * Tint cache boolean flag.
     *
     * @memberof PIXI.CanvasTinter
     * @type {boolean}
     */
    convertTintToImage: false,

    /**
     * Whether or not the Canvas BlendModes are supported, consequently the ability to tint using the multiply method.
     *
     * @memberof PIXI.CanvasTinter
     * @type {boolean}
     */
    canUseMultiply,

    /**
     * The tinting method that will be used.
     *
     * @memberof PIXI.CanvasTinter
     * @type {tintMethodFunctionType}
     */
    /**
     * The tintMethod type.
     *
     * @memberof PIXI.CanvasTinter
     * @callback tintMethodFunctionType
     * @param texture {PIXI.Texture} the texture to tint
     * @param color {number} the color to use to tint the sprite with
     * @param canvas {HTMLCanvasElement} the current canvas
     */
    tintMethod: canUseMultiply() ? tintWithMultiply : tintWithPerPixel
  })
})()

/**
 * Base for a common object renderer that can be used as a system renderer plugin.
 *
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */
const ObjectRenderer = (_WebGLManager => {
  inherits_(ObjectRenderer, _WebGLManager)

  function ObjectRenderer() {
    class_call_check_(this, ObjectRenderer)

    return get_constructor_(this, _WebGLManager.apply(this, arguments))
  }

  /**
   * Starts the renderer and sets the shader
   */
  ObjectRenderer.prototype.start = function start() { }
  // set the shader..

  /**
   * Stops the renderer
   *
   */
  ObjectRenderer.prototype.stop = function stop() {
    this.flush()
  }

  /**
   * Stub method for rendering content and emptying the current batch.
   *
   */
  ObjectRenderer.prototype.flush = function flush() { }
  // flush!

  /**
   * Renders an object
   *
   * @param {PIXI.DisplayObject} object - The object to render.
   */
  ObjectRenderer.prototype.render = function render(object) // eslint-disable-line no-unused-vars
  {
    // render the object
  }

  return ObjectRenderer
})(WebGLManager)

/**
 * @author Mat Groves
 *
 * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
 * for creating the original PixiJS version!
 * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that
 * they now share 4 bytes on the vertex buffer
 *
 * Heavily inspired by LibGDX's ParticleBuffer:
 * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/ParticleBuffer.java
 */
/**
 * The particle buffer manages the static and dynamic buffers for a particle container.
 *
 * @class
 * @private
 * @memberof PIXI
 */
const ParticleBuffer = (() => {
  /**
   * @param {WebGLRenderingContext} gl - The rendering context.
   * @param {object} properties - The properties to upload.
   * @param {boolean[]} dynamicPropertyFlags - Flags for which properties are dynamic.
   * @param {number} size - The size of the batch.
   */
  function ParticleBuffer(gl, properties, dynamicPropertyFlags, size) {
    class_call_check_(this, ParticleBuffer)

    /**
     * The current WebGL drawing context.
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    /**
     * The number of particles the buffer can hold
     *
     * @member {number}
     */
    this.size = size

    /**
     * A list of the properties that are dynamic.
     *
     * @member {object[]}
     */
    this.dynamicProperties = []

    /**
     * A list of the properties that are static.
     *
     * @member {object[]}
     */
    this.staticProperties = []

    for (var i = 0; i < properties.length; ++i) {
      var property = properties[i]

      // Make copy of properties object so that when we edit the offset it doesn't
      // change all other instances of the object literal
      property = {
        attribute: property.attribute,
        size: property.size,
        uploadFunction: property.uploadFunction,
        unsignedByte: property.unsignedByte,
        offset: property.offset
      }

      if (dynamicPropertyFlags[i]) {
        this.dynamicProperties.push(property)
      } else {
        this.staticProperties.push(property)
      }
    }

    this.staticStride = 0
    this.staticBuffer = null
    this.staticData = null
    this.staticDataUint32 = null

    this.dynamicStride = 0
    this.dynamicBuffer = null
    this.dynamicData = null
    this.dynamicDataUint32 = null

    this._updateID = 0

    this.initBuffers()
  }

  /**
   * Sets up the renderer context and necessary buffers.
   *
   * @private
   */
  ParticleBuffer.prototype.initBuffers = function initBuffers() {
    var gl = this.gl
    var dynamicOffset = 0

    /**
     * Holds the indices of the geometry (quads) to draw
     *
     * @member {Uint16Array}
     */
    this.indices = (0, createIndicesForQuads)(this.size)
    this.indexBuffer = GLCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW)

    this.dynamicStride = 0

    for (var i = 0; i < this.dynamicProperties.length; ++i) {
      var property = this.dynamicProperties[i]

      property.offset = dynamicOffset
      dynamicOffset += property.size
      this.dynamicStride += property.size
    }

    var dynBuffer = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4)

    this.dynamicData = new Float32Array(dynBuffer)
    this.dynamicDataUint32 = new Uint32Array(dynBuffer)
    this.dynamicBuffer = GLCore.GLBuffer.createVertexBuffer(gl, dynBuffer, gl.STREAM_DRAW)

    // static //
    var staticOffset = 0

    this.staticStride = 0

    for (var _i = 0; _i < this.staticProperties.length; ++_i) {
      var _property = this.staticProperties[_i]

      _property.offset = staticOffset
      staticOffset += _property.size
      this.staticStride += _property.size
    }

    var statBuffer = new ArrayBuffer(this.size * this.staticStride * 4 * 4)

    this.staticData = new Float32Array(statBuffer)
    this.staticDataUint32 = new Uint32Array(statBuffer)
    this.staticBuffer = GLCore.GLBuffer.createVertexBuffer(gl, statBuffer, gl.STATIC_DRAW)

    this.vao = new GLCore.VertexArrayObject(gl).addIndex(this.indexBuffer)

    for (var _i2 = 0; _i2 < this.dynamicProperties.length; ++_i2) {
      var _property2 = this.dynamicProperties[_i2]

      if (_property2.unsignedByte) {
        this.vao.addAttribute(
          this.dynamicBuffer, _property2.attribute,
          gl.UNSIGNED_BYTE, true, this.dynamicStride * 4, _property2.offset * 4
        )
      } else {
        this.vao.addAttribute(
          this.dynamicBuffer, _property2.attribute,
          gl.FLOAT, false, this.dynamicStride * 4, _property2.offset * 4
        )
      }
    }

    for (var _i3 = 0; _i3 < this.staticProperties.length; ++_i3) {
      var _property3 = this.staticProperties[_i3]

      if (_property3.unsignedByte) {
        this.vao.addAttribute(
          this.staticBuffer, _property3.attribute,
          gl.UNSIGNED_BYTE, true,
          this.staticStride * 4, _property3.offset * 4
        )
      } else {
        this.vao.addAttribute(
          this.staticBuffer, _property3.attribute,
          gl.FLOAT, false, this.staticStride * 4, _property3.offset * 4
        )
      }
    }
  }

  /**
   * Uploads the dynamic properties.
   *
   * @param {PIXI.DisplayObject[]} children - The children to upload.
   * @param {number} startIndex - The index to start at.
   * @param {number} amount - The number to upload.
   */
  ParticleBuffer.prototype.uploadDynamic = function uploadDynamic(children, startIndex, amount) {
    for (var i = 0; i < this.dynamicProperties.length; i++) {
      var property = this.dynamicProperties[i]

      property.uploadFunction(
        children, startIndex, amount,
        property.unsignedByte ? this.dynamicDataUint32 : this.dynamicData,
        this.dynamicStride, property.offset
      )
    }

    this.dynamicBuffer.upload()
  }

  /**
   * Uploads the static properties.
   *
   * @param {PIXI.DisplayObject[]} children - The children to upload.
   * @param {number} startIndex - The index to start at.
   * @param {number} amount - The number to upload.
   */
  ParticleBuffer.prototype.uploadStatic = function uploadStatic(children, startIndex, amount) {
    for (var i = 0; i < this.staticProperties.length; i++) {
      var property = this.staticProperties[i]

      property.uploadFunction(
        children, startIndex, amount,
        property.unsignedByte ? this.staticDataUint32 : this.staticData,
        this.staticStride, property.offset
      )
    }

    this.staticBuffer.upload()
  }

  /**
   * Destroys the ParticleBuffer.
   *
   */
  ParticleBuffer.prototype.destroy = function destroy() {
    this.dynamicProperties = null
    this.dynamicBuffer.destroy()
    this.dynamicBuffer = null
    this.dynamicData = null
    this.dynamicDataUint32 = null

    this.staticProperties = null
    this.staticBuffer.destroy()
    this.staticBuffer = null
    this.staticData = null
    this.staticDataUint32 = null
  }

  return ParticleBuffer
})()

/**
 * @class
 * @memberof PIXI
 */
const RenderTarget = (() => {
  /**
   * @param {WebGLRenderingContext} gl - The current WebGL drawing context
   * @param {number} [width=0] - the horizontal range of the filter
   * @param {number} [height=0] - the vertical range of the filter
   * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - See {@link PIXI.SCALE_MODES} for possible values
   * @param {number} [resolution=1] - The current resolution / device pixel ratio
   * @param {boolean} [root=false] - Whether this object is the root element or not
   */
  function RenderTarget(gl, width, height, scaleMode, resolution, root) {
    class_call_check_(this, RenderTarget)

    // TODO Resolution could go here ( eg low res blurs )

    /**
     * The current WebGL drawing context.
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    // next time to create a frame buffer and texture

    /**
     * A frame buffer
     *
     * @member {PIXI.glCore.GLFramebuffer}
     */
    this.frameBuffer = null

    /**
     * The texture
     *
     * @member {PIXI.glCore.GLTexture}
     */
    this.texture = null

    /**
     * The background colour of this render target, as an array of [r,g,b,a] values
     *
     * @member {number[]}
     */
    this.clearColor = [0, 0, 0, 0]

    /**
     * The size of the object as a rectangle
     *
     * @member {PIXI.Rectangle}
     */
    this.size = new math.Rectangle(0, 0, 1, 1)

    /**
     * The current resolution / device pixel ratio
     *
     * @member {number}
     * @default 1
     */
    this.resolution = resolution || settings.RESOLUTION

    /**
     * The projection matrix
     *
     * @member {PIXI.Matrix}
     */
    this.projectionMatrix = new math.Matrix()

    /**
     * The object's transform
     *
     * @member {PIXI.Matrix}
     */
    this.transform = null

    /**
     * The frame.
     *
     * @member {PIXI.Rectangle}
     */
    this.frame = null

    /**
     * The stencil buffer stores masking data for the render target
     *
     * @member {glCore.GLBuffer}
     */
    this.defaultFrame = new math.Rectangle()
    this.destinationFrame = null
    this.sourceFrame = null

    /**
     * The stencil buffer stores masking data for the render target
     *
     * @member {glCore.GLBuffer}
     */
    this.stencilBuffer = null

    /**
     * The data structure for the stencil masks
     *
     * @member {PIXI.Graphics[]}
     */
    this.stencilMaskStack = []

    /**
     * Stores filter data for the render target
     *
     * @member {object[]}
     */
    this.filterData = null

    /**
     * The key for pooled texture of FilterSystem
     * @private
     * @member {string}
     */
    this.filterPoolKey = ''

    /**
     * The scale mode.
     *
     * @member {number}
     * @default PIXI.settings.SCALE_MODE
     * @see PIXI.SCALE_MODES
     */
    this.scaleMode = scaleMode !== undefined ? scaleMode : settings.SCALE_MODE

    /**
     * Whether this object is the root element or not
     *
     * @member {boolean}
     */
    this.root = root

    if (!this.root) {
      this.frameBuffer = GLCore.GLFramebuffer.createRGBA(gl, 100, 100)

      if (this.scaleMode === constants.SCALE_MODES.NEAREST) {
        this.frameBuffer.texture.enableNearestScaling()
      } else {
        this.frameBuffer.texture.enableLinearScaling()
      }
      /*
          A frame buffer needs a target to render to..
          create a texture and bind it attach it to the framebuffer..
       */

      // this is used by the base texture
      this.texture = this.frameBuffer.texture
    } else {
      // make it a null framebuffer..
      this.frameBuffer = new GLCore.GLFramebuffer(gl, 100, 100)
      this.frameBuffer.framebuffer = null
    }

    this.setFrame()

    this.resize(width, height)
  }

  /**
   * Clears the filter texture.
   *
   * @param {number[]} [clearColor=this.clearColor] - Array of [r,g,b,a] to clear the framebuffer
   */
  RenderTarget.prototype.clear = function clear(clearColor) {
    var cc = clearColor || this.clearColor

    this.frameBuffer.clear(cc[0], cc[1], cc[2], cc[3]); // r,g,b,a)
  }

  /**
   * Binds the stencil buffer.
   *
   */
  RenderTarget.prototype.attachStencilBuffer = function attachStencilBuffer() {
    // TODO check if stencil is done?
    /**
     * The stencil buffer is used for masking in pixi
     * lets create one and then add attach it to the framebuffer..
     */
    if (!this.root) {
      this.frameBuffer.enableStencil()
    }
  }

  /**
   * Sets the frame of the render target.
   *
   * @param {Rectangle} destinationFrame - The destination frame.
   * @param {Rectangle} sourceFrame - The source frame.
   */
  RenderTarget.prototype.setFrame = function setFrame(destinationFrame, sourceFrame) {
    this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame
    this.sourceFrame = sourceFrame || this.sourceFrame || this.destinationFrame
  }

  /**
   * Binds the buffers and initialises the viewport.
   *
   */
  RenderTarget.prototype.activate = function activate() {
    // TOOD refactor usage of frame..
    var gl = this.gl

    // make sure the texture is unbound!
    this.frameBuffer.bind()

    this.calculateProjection(this.destinationFrame, this.sourceFrame)

    if (this.transform) {
      this.projectionMatrix.append(this.transform)
    }

    // TODO add a check as them may be the same!
    if (this.destinationFrame !== this.sourceFrame) {
      gl.enable(gl.SCISSOR_TEST)
      gl.scissor(this.destinationFrame.x | 0, this.destinationFrame.y | 0, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
    } else {
      gl.disable(gl.SCISSOR_TEST)
    }

    // TODO - does not need to be updated all the time??
    gl.viewport(this.destinationFrame.x | 0, this.destinationFrame.y | 0, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
  }

  /**
   * Updates the projection matrix based on a projection frame (which is a rectangle)
   *
   * @param {Rectangle} destinationFrame - The destination frame.
   * @param {Rectangle} sourceFrame - The source frame.
   */
  RenderTarget.prototype.calculateProjection = function calculateProjection(destinationFrame, sourceFrame) {
    var pm = this.projectionMatrix

    sourceFrame = sourceFrame || destinationFrame

    pm.identity()

    // TODO: make dest scale source
    if (!this.root) {
      pm.a = 1 / destinationFrame.width * 2
      pm.d = 1 / destinationFrame.height * 2

      pm.tx = -1 - sourceFrame.x * pm.a
      pm.ty = -1 - sourceFrame.y * pm.d
    } else {
      pm.a = 1 / destinationFrame.width * 2
      pm.d = -1 / destinationFrame.height * 2

      pm.tx = -1 - sourceFrame.x * pm.a
      pm.ty = 1 - sourceFrame.y * pm.d
    }
  }

  /**
   * Resizes the texture to the specified width and height
   *
   * @param {number} width - the new width of the texture
   * @param {number} height - the new height of the texture
   */
  RenderTarget.prototype.resize = function resize(width, height) {
    width = width | 0
    height = height | 0

    if (this.size.width === width && this.size.height === height) {
      return
    }

    this.size.width = width
    this.size.height = height

    this.defaultFrame.width = width
    this.defaultFrame.height = height

    this.frameBuffer.resize(width * this.resolution, height * this.resolution)

    var projectionFrame = this.frame || this.size

    this.calculateProjection(projectionFrame)
  }

  /**
   * Destroys the render target.
   *
   */
  RenderTarget.prototype.destroy = function destroy() {
    this.frameBuffer.destroy()

    this.frameBuffer = null
    this.texture = null
  }

  return RenderTarget
})()

/**
 * Helper class to create a quad
 *
 * @class
 * @memberof PIXI
 */
const Quad = (() => {
  /**
   * @param {WebGLRenderingContext} gl - The gl context for this quad to use.
   * @param {object} state - TODO: Description
   */
  function Quad(gl, state) {
    class_call_check_(this, Quad)

    /**
     * the current WebGL drawing context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    /**
     * An array of vertices
     *
     * @member {Float32Array}
     */
    this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])

    /**
     * The Uvs of the quad
     *
     * @member {Float32Array}
     */
    this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])

    this.interleaved = new Float32Array(8 * 2)

    for (var i = 0; i < 4; i++) {
      this.interleaved[i * 4] = this.vertices[i * 2]
      this.interleaved[i * 4 + 1] = this.vertices[i * 2 + 1]
      this.interleaved[i * 4 + 2] = this.uvs[i * 2]
      this.interleaved[i * 4 + 3] = this.uvs[i * 2 + 1]
    }

    /**
     * An array containing the indices of the vertices
     *
     * @member {Uint16Array}
     */
    this.indices = (0, createIndicesForQuads)(1)

    /**
     * The vertex buffer
     *
     * @member {glCore.GLBuffer}
     */
    this.vertexBuffer = GLCore.GLBuffer.createVertexBuffer(gl, this.interleaved, gl.STATIC_DRAW)

    /**
     * The index buffer
     *
     * @member {glCore.GLBuffer}
     */
    this.indexBuffer = GLCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW)

    /**
     * The vertex array object
     *
     * @member {glCore.VertexArrayObject}
     */
    this.vao = new GLCore.VertexArrayObject(gl, state)
  }

  /**
   * Initialises the vaos and uses the shader.
   *
   * @param {PIXI.Shader} shader - the shader to use
   */
  Quad.prototype.initVao = function initVao(shader) {
    this.vao.clear().addIndex(this.indexBuffer).addAttribute(
      this.vertexBuffer, shader.attributes.aVertexPosition, this.gl.FLOAT, false, 4 * 4, 0
    ).addAttribute(
      this.vertexBuffer, shader.attributes.aTextureCoord, this.gl.FLOAT, false, 4 * 4, 2 * 4
    )
  }

  /**
   * Maps two Rectangle to the quad.
   *
   * @param {PIXI.Rectangle} targetTextureFrame - the first rectangle
   * @param {PIXI.Rectangle} destinationFrame - the second rectangle
   * @return {PIXI.Quad} Returns itself.
   */
  Quad.prototype.map = function map(targetTextureFrame, destinationFrame) {
    var x = 0; // destinationFrame.x / targetTextureFrame.width
    var y = 0; // destinationFrame.y / targetTextureFrame.height

    this.uvs[0] = x
    this.uvs[1] = y

    this.uvs[2] = x + destinationFrame.width / targetTextureFrame.width
    this.uvs[3] = y

    this.uvs[4] = x + destinationFrame.width / targetTextureFrame.width
    this.uvs[5] = y + destinationFrame.height / targetTextureFrame.height

    this.uvs[6] = x
    this.uvs[7] = y + destinationFrame.height / targetTextureFrame.height

    x = destinationFrame.x
    y = destinationFrame.y

    this.vertices[0] = x
    this.vertices[1] = y

    this.vertices[2] = x + destinationFrame.width
    this.vertices[3] = y

    this.vertices[4] = x + destinationFrame.width
    this.vertices[5] = y + destinationFrame.height

    this.vertices[6] = x
    this.vertices[7] = y + destinationFrame.height

    return this
  }

  /**
   * Binds the buffer and uploads the data
   *
   * @return {PIXI.Quad} Returns itself.
   */
  Quad.prototype.upload = function upload() {
    for (var i = 0; i < 4; i++) {
      this.interleaved[i * 4] = this.vertices[i * 2]
      this.interleaved[i * 4 + 1] = this.vertices[i * 2 + 1]
      this.interleaved[i * 4 + 2] = this.uvs[i * 2]
      this.interleaved[i * 4 + 3] = this.uvs[i * 2 + 1]
    }

    this.vertexBuffer.upload(this.interleaved)

    return this
  }

  /**
   * Removes this quad from WebGL
   */
  Quad.prototype.destroy = function destroy() {
    var gl = this.gl

    gl.deleteBuffer(this.vertexBuffer)
    gl.deleteBuffer(this.indexBuffer)
  }

  return Quad
})()

const checkMaxIfStatmentsInShader = (() => {

  var fragTemplate = [
    'precision mediump float;',
    'void main(void){',
    '  float test = 0.1;',
    '  %forloop%',
    '    gl_FragColor = vec4(0.0);',
    '}'
  ].join('\n')

  function checkMaxIfStatmentsInShader(maxIfs, gl) {
    var createTempContext = !gl

    if (maxIfs === 0) {
      throw new Error('Invalid value of `0` passed to `checkMaxIfStatementsInShader`')
    }

    if (createTempContext) {
      var tinyCanvas = document.createElement('canvas')

      tinyCanvas.width = 1
      tinyCanvas.height = 1

      gl = GLCore.createContext(tinyCanvas)
    }

    var shader = gl.createShader(gl.FRAGMENT_SHADER)

    while (true) // eslint-disable-line no-constant-condition
    {
      var fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs))

      gl.shaderSource(shader, fragmentSrc)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        maxIfs = maxIfs / 2 | 0
      } else {
        // valid!
        break
      }
    }

    if (createTempContext) {
      // get rid of context
      if (gl.getExtension('WEBGL_lose_context')) {
        gl.getExtension('WEBGL_lose_context').loseContext()
      }
    }

    return maxIfs
  }

  function generateIfTestSrc(maxIfs) {
    var src = ''

    for (var i = 0; i < maxIfs; ++i) {
      if (i > 0) {
        src += '\nelse '
      }

      if (i < maxIfs - 1) {
        src += 'if(test == ' + i + '.0){}'
      }
    }

    return src
  }

  return checkMaxIfStatmentsInShader
})()

/**
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */
const StencilManager = (_WebGLManager => {
  inherits_(StencilManager, _WebGLManager)

  /**
   * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
   */
  function StencilManager(renderer) {
    class_call_check_(this, StencilManager)

    var _this = get_constructor_(this, _WebGLManager.call(this, renderer))

    _this.stencilMaskStack = null
    return _this
  }

  /**
   * Changes the mask stack that is used by this manager.
   *
   * @param {PIXI.Graphics[]} stencilMaskStack - The mask stack
   */
  StencilManager.prototype.setMaskStack = function setMaskStack(stencilMaskStack) {
    this.stencilMaskStack = stencilMaskStack

    var gl = this.renderer.gl

    if (stencilMaskStack.length === 0) {
      gl.disable(gl.STENCIL_TEST)
    } else {
      gl.enable(gl.STENCIL_TEST)
    }
  }

  /**
   * Applies the Mask and adds it to the current stencil stack. @alvin
   *
   * @param {PIXI.Graphics} graphics - The mask
   */
  StencilManager.prototype.pushStencil = function pushStencil(graphics) {
    this.renderer.setObjectRenderer(this.renderer.plugins.graphics)

    this.renderer._activeRenderTarget.attachStencilBuffer()

    var gl = this.renderer.gl
    var prevMaskCount = this.stencilMaskStack.length

    if (prevMaskCount === 0) {
      gl.enable(gl.STENCIL_TEST)
    }

    this.stencilMaskStack.push(graphics)

    // Increment the refference stencil value where the new mask overlaps with the old ones.
    gl.colorMask(false, false, false, false)
    gl.stencilFunc(gl.EQUAL, prevMaskCount, this._getBitwiseMask())
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR)
    this.renderer.plugins.graphics.render(graphics)

    this._useCurrent()
  }

  /**
   * Removes the last mask from the stencil stack. @alvin
   */
  StencilManager.prototype.popStencil = function popStencil() {
    this.renderer.setObjectRenderer(this.renderer.plugins.graphics)

    var gl = this.renderer.gl
    var graphics = this.stencilMaskStack.pop()

    if (this.stencilMaskStack.length === 0) {
      // the stack is empty!
      gl.disable(gl.STENCIL_TEST)
      gl.clear(gl.STENCIL_BUFFER_BIT)
      gl.clearStencil(0)
    } else {
      // Decrement the refference stencil value where the popped mask overlaps with the other ones
      gl.colorMask(false, false, false, false)
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR)
      this.renderer.plugins.graphics.render(graphics)

      this._useCurrent()
    }
  }

  /**
   * Setup renderer to use the current stencil data.
   */
  StencilManager.prototype._useCurrent = function _useCurrent() {
    var gl = this.renderer.gl

    gl.colorMask(true, true, true, true)
    gl.stencilFunc(gl.EQUAL, this.stencilMaskStack.length, this._getBitwiseMask())
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)
  }

  /**
   * Fill 1s equal to the number of acitve stencil masks.
   *
   * @return {number} The bitwise mask.
   */
  StencilManager.prototype._getBitwiseMask = function _getBitwiseMask() {
    return (1 << this.stencilMaskStack.length) - 1
  }

  /**
   * Destroys the mask stack.
   *
   */
  StencilManager.prototype.destroy = function destroy() {
    _WebGLManager3.default.prototype.destroy.call(this)

    this.stencilMaskStack.stencilStack = null
  }

  return StencilManager
})(WebGLManager)

const extractUniformsFromSrc = (() => {

  var defaultValue = GLCore.shader.defaultValue

  function extractUniformsFromSrc(vertexSrc, fragmentSrc, mask) {
    var vertUniforms = extractUniformsFromString(vertexSrc, mask)
    var fragUniforms = extractUniformsFromString(fragmentSrc, mask)

    return Object.assign(vertUniforms, fragUniforms)
  }

  function extractUniformsFromString(string) {
    var maskRegex = new RegExp('^(projectionMatrix|uSampler|filterArea|filterClamp)$')

    var uniforms = {}
    var nameSplit = void 0

    // clean the lines a little - remove extra spaces / tabs etc
    // then split along ';'
    var lines = string.replace(/\s+/g, ' ').split(/\s*;\s*/)

    // loop through..
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim()

      if (line.indexOf('uniform') > -1) {
        var splitLine = line.split(' ')
        var type = splitLine[1]

        var name = splitLine[2]
        var size = 1

        if (name.indexOf('[') > -1) {
          // array!
          nameSplit = name.split(/\[|]/)
          name = nameSplit[0]
          size *= Number(nameSplit[1])
        }

        if (!name.match(maskRegex)) {
          uniforms[name] = {
            value: defaultValue(type, size),
            name: name,
            type: type
          }
        }
      }
    }

    return uniforms
  }

  return extractUniformsFromSrc
})()

// let math = $require('../../../math')
/**
 * @class
 * @memberof PIXI
 * @extends PIXI.Shader
 */
const Filter = (() => {
  /**
   * @param {string} [vertexSrc] - The source of the vertex shader.
   * @param {string} [fragmentSrc] - The source of the fragment shader.
   * @param {object} [uniforms] - Custom uniforms to use to augment the built-in ones.
   */
  function Filter(vertexSrc, fragmentSrc, uniforms) {
    class_call_check_(this, Filter)

    /**
     * The vertex shader.
     *
     * @member {string}
     */
    this.vertexSrc = vertexSrc || Filter.defaultVertexSrc

    /**
     * The fragment shader.
     *
     * @member {string}
     */
    this.fragmentSrc = fragmentSrc || Filter.defaultFragmentSrc

    this._blendMode = constants.BLEND_MODES.NORMAL

    this.uniformData = uniforms || (0, extractUniformsFromSrc)(this.vertexSrc, this.fragmentSrc, 'projectionMatrix|uSampler')

    /**
     * An object containing the current values of custom uniforms.
     * @example <caption>Updating the value of a custom uniform</caption>
     * filter.uniforms.time = performance.now()
     *
     * @member {object}
     */
    this.uniforms = {}

    for (var i in this.uniformData) {
      this.uniforms[i] = this.uniformData[i].value
      if (this.uniformData[i].type) {
        this.uniformData[i].type = this.uniformData[i].type.toLowerCase()
      }
    }

    var SOURCE_KEY_MAP = {}

    // this is where we store shader references..
    // TODO we could cache this!
    this.glShaders = {}

    // used for cacheing.. sure there is a better way!
    if (!SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc]) {
      SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc] = (0, utils.uid)()
    }

    this.glShaderKey = SOURCE_KEY_MAP[this.vertexSrc + this.fragmentSrc]

    /**
     * The padding of the filter. Some filters require extra space to breath such as a blur.
     * Increasing this will add extra width and height to the bounds of the object that the
     * filter is applied to.
     *
     * @member {number}
     */
    this.padding = 4

    /**
     * The resolution of the filter. Setting this to be lower will lower the quality but
     * increase the performance of the filter.
     *
     * @member {number}
     */
    this.resolution = settings.FILTER_RESOLUTION

    /**
     * If enabled is true the filter is applied, if false it will not.
     *
     * @member {boolean}
     */
    this.enabled = true

    /**
     * If enabled, PixiJS will fit the filter area into boundaries for better performance.
     * Switch it off if it does not work for specific shader.
     *
     * @member {boolean}
     */
    this.autoFit = true
  }

  /**
   * Applies the filter
   *
   * @param {PIXI.FilterManager} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTarget} input - The input render target.
   * @param {PIXI.RenderTarget} output - The target to output to.
   * @param {boolean} clear - Should the output be cleared before rendering to it
   * @param {object} [currentState] - It's current state of filter.
   *        There are some useful properties in the currentState :
   *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
   */
  Filter.prototype.apply = function apply(filterManager, input, output, clear, currentState) // eslint-disable-line no-unused-vars
  {
    // --- //
    //  this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(tempMatrix, window.panda )

    // do as you please!

    filterManager.applyFilter(this, input, output, clear)

    // or just do a regular render..
  }

  /**
   * Sets the blendmode of the filter
   *
   * @member {number}
   * @default PIXI.BLEND_MODES.NORMAL
   */
  create_class_(Filter, [{
    key: 'blendMode',
    get: function get() {
      return this._blendMode
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._blendMode = value
    }

    /**
     * The default vertex shader source
     *
     * @static
     * @constant
     */

  }], [{
    key: 'defaultVertexSrc',
    get: function get() {
      return [
        'attribute vec2 aVertexPosition;',
        'attribute vec2 aTextureCoord;',
        'uniform mat3 projectionMatrix;',
        'uniform mat3 filterMatrix;',
        'varying vec2 vTextureCoord;',
        'varying vec2 vFilterCoord;',
        'void main(void){',
        '   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
        '   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;',
        '   vTextureCoord = aTextureCoord ;',
        '}'
      ].join('\n')
    }

    /**
     * The default fragment shader source
     *
     * @static
     * @constant
     */

  }, {
    key: 'defaultFragmentSrc',
    get: function get() {
      return [
        'varying vec2 vTextureCoord;',
        'varying vec2 vFilterCoord;',
        'uniform sampler2D uSampler;',
        'uniform sampler2D filterSampler;',
        'void main(void){',
        '   vec4 masky = texture2D(filterSampler, vFilterCoord);',
        '   vec4 sample = texture2D(uSampler, vTextureCoord);',
        '   vec4 color;',
        '   if(mod(vFilterCoord.x, 1.0) > 0.5)',
        '   {',
        '     color = vec4(1.0, 0.0, 0.0, 1.0);',
        '   }',
        '   else',
        '   {',
        '     color = vec4(0.0, 1.0, 0.0, 1.0);',
        '   }',
        //'   gl_FragColor = vec4(mod(vFilterCoord.x, 1.5), vFilterCoord.y,0.0,1.0);',
        '   gl_FragColor = mix(sample, masky, 0.5);',
        '   gl_FragColor *= sample.a;',
        '}'
      ].join('\n')
    }
  }])

  return Filter
})()

const filterTransforms = (() => {
  /**
   * Calculates the mapped matrix
   * @param filterArea {Rectangle} The filter area
   * @param sprite {Sprite} the target sprite
   * @param outputMatrix {Matrix} @alvin
   * @private
   */
  // TODO playing around here.. this is temporary - (will end up in the shader)
  // this returns a matrix that will normalise map filter cords in the filter to screen space
  function calculateScreenSpaceMatrix(outputMatrix, filterArea, textureSize) {
    // let worldTransform = sprite.worldTransform.copy(Matrix.TEMP_MATRIX),
    // let texture = {width:1136, height:700};//sprite._texture.baseTexture

    // TODO unwrap?
    var mappedMatrix = outputMatrix.identity()

    mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height)

    mappedMatrix.scale(textureSize.width, textureSize.height)

    return mappedMatrix
  }

  function calculateNormalizedScreenSpaceMatrix(outputMatrix, filterArea, textureSize) {
    var mappedMatrix = outputMatrix.identity()

    mappedMatrix.translate(filterArea.x / textureSize.width, filterArea.y / textureSize.height)

    var translateScaleX = textureSize.width / filterArea.width
    var translateScaleY = textureSize.height / filterArea.height

    mappedMatrix.scale(translateScaleX, translateScaleY)

    return mappedMatrix
  }

  // this will map the filter coord so that a texture can be used based on the transform of a sprite
  function calculateSpriteMatrix(outputMatrix, filterArea, textureSize, sprite) {
    var orig = sprite._texture.orig
    var mappedMatrix = outputMatrix.set(textureSize.width, 0, 0, textureSize.height, filterArea.x, filterArea.y)
    var worldTransform = sprite.worldTransform.copy(math.Matrix.TEMP_MATRIX)

    worldTransform.invert()
    mappedMatrix.prepend(worldTransform)
    mappedMatrix.scale(1.0 / orig.width, 1.0 / orig.height)
    mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y)

    return mappedMatrix
  }

  return { calculateScreenSpaceMatrix, calculateNormalizedScreenSpaceMatrix, calculateSpriteMatrix }
})()

/**
 * The SpriteMaskFilter class
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI
 */
var SpriteMaskFilter = (_Filter => {
  inherits_(SpriteMaskFilter, _Filter)

  /**
   * @param {PIXI.Sprite} sprite - the target sprite
   */
  function SpriteMaskFilter(sprite) {
    class_call_check_(this, SpriteMaskFilter)

    var maskMatrix = new math.Matrix()

    var _this = get_constructor_(this, _Filter.call(this, 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n', 'varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n'))

    sprite.renderable = false

    _this.maskSprite = sprite
    _this.maskMatrix = maskMatrix
    return _this
  }

  /**
   * Applies the filter
   *
   * @param {PIXI.FilterManager} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTarget} input - The input render target.
   * @param {PIXI.RenderTarget} output - The target to output to.
   */


  SpriteMaskFilter.prototype.apply = function apply(filterManager, input, output) {
    var maskSprite = this.maskSprite
    var tex = this.maskSprite.texture

    if (!tex.valid) {
      return
    }
    if (!tex.transform) {
      // margin = 0.0, let it bleed a bit, shader code becomes easier
      // assuming that atlas textures were made with 1-pixel padding
      tex.transform = new TextureMatrix(tex, 0.0)
    }
    tex.transform.update()

    this.uniforms.mask = tex
    this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite).prepend(tex.transform.mapCoord)
    this.uniforms.alpha = maskSprite.worldAlpha
    this.uniforms.maskClamp = tex.transform.uClampFrame

    filterManager.applyFilter(this, input, output)
  }

  return SpriteMaskFilter
})(Filter)

/**
 * @ignore
 * @class
 */
var FilterState = (() => {
  function FilterState() {
    class_call_check_(this, FilterState)

    this.renderTarget = null
    this.target = null
    this.resolution = 1

    // those three objects are used only for root
    // re-assigned for everything else
    this.sourceFrame = new math.Rectangle()
    this.destinationFrame = new math.Rectangle()
    this.filters = []
  }

  /**
   * clears the state
   */
  FilterState.prototype.clear = function clear() {
    this.filters = null
    this.target = null
    this.renderTarget = null
  }

  return FilterState
})()

/**
 * @class
 * @memberof PIXI
 * @extends PIXI.WebGLManager
 */
const FilterManager = (_WebGLManager => {
  inherits_(FilterManager, _WebGLManager)

  /**
   * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
   */
  function FilterManager(renderer) {
    class_call_check_(this, FilterManager)

    var _this = get_constructor_(this, _WebGLManager.call(this, renderer))

    _this.gl = _this.renderer.gl
    // know about sprites!
    _this.quad = new Quad(_this.gl, renderer.state.attribState)

    _this.shaderCache = {}
    // todo add default!
    _this.pool = {}

    _this.filterData = null

    _this.managedFilters = []

    _this.renderer.on('prerender', _this.onPrerender, _this)

    _this._screenWidth = renderer.view.width
    _this._screenHeight = renderer.view.height
    return _this
  }

  var screenKey = 'screen'

  /**
   * Adds a new filter to the manager.
   *
   * @param {PIXI.DisplayObject} target - The target of the filter to render.
   * @param {PIXI.Filter[]} filters - The filters to apply.
   */
  FilterManager.prototype.pushFilter = function pushFilter(target, filters) {
    var renderer = this.renderer

    var filterData = this.filterData

    if (!filterData) {
      filterData = this.renderer._activeRenderTarget.filterStack

      // add new stack
      var filterState = new FilterState()

      filterState.sourceFrame = filterState.destinationFrame = this.renderer._activeRenderTarget.size
      filterState.renderTarget = renderer._activeRenderTarget

      this.renderer._activeRenderTarget.filterData = filterData = {
        index: 0,
        stack: [filterState]
      }

      this.filterData = filterData
    }

    // get the current filter state..
    var currentState = filterData.stack[++filterData.index]
    var renderTargetFrame = filterData.stack[0].destinationFrame

    if (!currentState) {
      currentState = filterData.stack[filterData.index] = new FilterState()
    }

    var fullScreen = target.filterArea && target.filterArea.x === 0 && target.filterArea.y === 0 && target.filterArea.width === renderer.screen.width && target.filterArea.height === renderer.screen.height

    // for now we go off the filter of the first resolution..
    var resolution = filters[0].resolution
    var padding = filters[0].padding | 0
    var targetBounds = fullScreen ? renderer.screen : target.filterArea || target.getBounds(true)
    var sourceFrame = currentState.sourceFrame
    var destinationFrame = currentState.destinationFrame

    sourceFrame.x = (targetBounds.x * resolution | 0) / resolution
    sourceFrame.y = (targetBounds.y * resolution | 0) / resolution
    sourceFrame.width = (targetBounds.width * resolution | 0) / resolution
    sourceFrame.height = (targetBounds.height * resolution | 0) / resolution

    if (!fullScreen) {
      if (filterData.stack[0].renderTarget.transform) { //

        // TODO we should fit the rect around the transform..
      } else if (filters[0].autoFit) {
        sourceFrame.fit(renderTargetFrame)
      }

      // lets apply the padding After we fit the element to the screen.
      // this should stop the strange side effects that can occur when cropping to the edges
      sourceFrame.pad(padding)
    }

    destinationFrame.width = sourceFrame.width
    destinationFrame.height = sourceFrame.height

    // lets play the padding after we fit the element to the screen.
    // this should stop the strange side effects that can occur when cropping to the edges

    var renderTarget = this.getPotRenderTarget(renderer.gl, sourceFrame.width, sourceFrame.height, resolution)

    currentState.target = target
    currentState.filters = filters
    currentState.resolution = resolution
    currentState.renderTarget = renderTarget

    // bind the render target to draw the shape in the top corner..

    renderTarget.setFrame(destinationFrame, sourceFrame)

    // bind the render target
    renderer.bindRenderTarget(renderTarget)
    renderTarget.clear()
  }

  /**
   * Pops off the filter and applies it.
   */
  FilterManager.prototype.popFilter = function popFilter() {
    var filterData = this.filterData

    var lastState = filterData.stack[filterData.index - 1]
    var currentState = filterData.stack[filterData.index]

    this.quad.map(currentState.renderTarget.size, currentState.sourceFrame).upload()

    var filters = currentState.filters

    if (filters.length === 1) {
      filters[0].apply(this, currentState.renderTarget, lastState.renderTarget, false, currentState)
      this.freePotRenderTarget(currentState.renderTarget)
    } else {
      var flip = currentState.renderTarget
      var flop = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, currentState.resolution)

      flop.setFrame(currentState.destinationFrame, currentState.sourceFrame)

      // finally lets clear the render target before drawing to it..
      flop.clear()

      var i = 0

      for (i = 0; i < filters.length - 1; ++i) {
        filters[i].apply(this, flip, flop, true, currentState)

        var t = flip

        flip = flop
        flop = t
      }

      filters[i].apply(this, flip, lastState.renderTarget, false, currentState)

      this.freePotRenderTarget(flip)
      this.freePotRenderTarget(flop)
    }

    currentState.clear()
    filterData.index--

    if (filterData.index === 0) {
      this.filterData = null
    }
  }

  /**
   * Draws a filter.
   *
   * @param {PIXI.Filter} filter - The filter to draw.
   * @param {PIXI.RenderTarget} input - The input render target.
   * @param {PIXI.RenderTarget} output - The target to output to.
   * @param {boolean} clear - Should the output be cleared before rendering to it
   */
  FilterManager.prototype.applyFilter = function applyFilter(filter, input, output, clear) {
    var renderer = this.renderer
    var gl = renderer.gl

    var shader = filter.glShaders[renderer.CONTEXT_UID]

    // cacheing..
    if (!shader) {
      if (filter.glShaderKey) {
        shader = this.shaderCache[filter.glShaderKey]

        if (!shader) {
          shader = new Shader(this.gl, filter.vertexSrc, filter.fragmentSrc)

          filter.glShaders[renderer.CONTEXT_UID] = this.shaderCache[filter.glShaderKey] = shader
          this.managedFilters.push(filter)
        }
      } else {
        shader = filter.glShaders[renderer.CONTEXT_UID] = new Shader(this.gl, filter.vertexSrc, filter.fragmentSrc)
        this.managedFilters.push(filter)
      }

      // TODO - this only needs to be done once?
      renderer.bindVao(null)

      this.quad.initVao(shader)
    }

    renderer.bindVao(this.quad.vao)

    renderer.bindRenderTarget(output)

    if (clear) {
      gl.disable(gl.SCISSOR_TEST)
      renderer.clear(); // [1, 1, 1, 1])
      gl.enable(gl.SCISSOR_TEST)
    }

    // in case the render target is being masked using a scissor rect
    if (output === renderer.maskManager.scissorRenderTarget) {
      renderer.maskManager.pushScissorMask(null, renderer.maskManager.scissorData)
    }

    renderer.bindShader(shader)

    // free unit 0 for us, doesn't matter what was there
    // don't try to restore it, because syncUniforms can upload it to another slot
    // and it'll be a problem
    var tex = this.renderer.emptyTextures[0]

    this.renderer.boundTextures[0] = tex
    // this syncs the PixiJS filters  uniforms with glsl uniforms
    this.syncUniforms(shader, filter)

    renderer.state.setBlendMode(filter.blendMode)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, input.texture.texture)

    this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0)

    gl.bindTexture(gl.TEXTURE_2D, tex._glTextures[this.renderer.CONTEXT_UID].texture)
  }

  /**
   * Uploads the uniforms of the filter.
   *
   * @param {GLShader} shader - The underlying gl shader.
   * @param {PIXI.Filter} filter - The filter we are synchronizing.
   */
  FilterManager.prototype.syncUniforms = function syncUniforms(shader, filter) {
    var uniformData = filter.uniformData
    var uniforms = filter.uniforms

    // 0 is reserved for the PixiJS texture so we start at 1!
    var textureCount = 1
    var currentState = void 0

    // filterArea and filterClamp that are handled by FilterManager directly
    // they must not appear in uniformData

    if (shader.uniforms.filterArea) {
      currentState = this.filterData.stack[this.filterData.index]

      var filterArea = shader.uniforms.filterArea

      filterArea[0] = currentState.renderTarget.size.width
      filterArea[1] = currentState.renderTarget.size.height
      filterArea[2] = currentState.sourceFrame.x
      filterArea[3] = currentState.sourceFrame.y

      shader.uniforms.filterArea = filterArea
    }

    // use this to clamp displaced texture coords so they belong to filterArea
    // see displacementFilter fragment shader for an example
    if (shader.uniforms.filterClamp) {
      currentState = currentState || this.filterData.stack[this.filterData.index]

      var filterClamp = shader.uniforms.filterClamp

      filterClamp[0] = 0
      filterClamp[1] = 0
      filterClamp[2] = (currentState.sourceFrame.width - 1) / currentState.renderTarget.size.width
      filterClamp[3] = (currentState.sourceFrame.height - 1) / currentState.renderTarget.size.height

      shader.uniforms.filterClamp = filterClamp
    }

    // TODO Cacheing layer..
    for (var i in uniformData) {
      var type = uniformData[i].type

      if (type === 'sampler2d' && uniforms[i] !== 0) {
        if (uniforms[i].baseTexture) {
          shader.uniforms[i] = this.renderer.bindTexture(uniforms[i].baseTexture, textureCount)
        } else {
          shader.uniforms[i] = textureCount

          // TODO
          // this is helpful as renderTargets can also be set.
          // Although thinking about it, we could probably
          // make the filter texture cache return a RenderTexture
          // rather than a renderTarget
          var gl = this.renderer.gl

          this.renderer.boundTextures[textureCount] = this.renderer.emptyTextures[textureCount]
          gl.activeTexture(gl.TEXTURE0 + textureCount)

          uniforms[i].texture.bind()
        }

        textureCount++
      } else if (type === 'mat3') {
        // check if its PixiJS matrix..
        if (uniforms[i].a !== undefined) {
          shader.uniforms[i] = uniforms[i].toArray(true)
        } else {
          shader.uniforms[i] = uniforms[i]
        }
      } else if (type === 'vec2') {
        // check if its a point..
        if (uniforms[i].x !== undefined) {
          var val = shader.uniforms[i] || new Float32Array(2)

          val[0] = uniforms[i].x
          val[1] = uniforms[i].y
          shader.uniforms[i] = val
        } else {
          shader.uniforms[i] = uniforms[i]
        }
      } else if (type === 'float') {
        if (shader.uniforms.data[i].value !== uniformData[i]) {
          shader.uniforms[i] = uniforms[i]
        }
      } else {
        shader.uniforms[i] = uniforms[i]
      }
    }
  }

  /**
   * Gets a render target from the pool, or creates a new one.
   *
   * @param {boolean} clear - Should we clear the render texture when we get it?
   * @param {number} resolution - The resolution of the target.
   * @return {PIXI.RenderTarget} The new render target
   */
  FilterManager.prototype.getRenderTarget = function getRenderTarget(clear, resolution) {
    var currentState = this.filterData.stack[this.filterData.index]
    var renderTarget = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, resolution || currentState.resolution)

    renderTarget.setFrame(currentState.destinationFrame, currentState.sourceFrame)

    return renderTarget
  }

  /**
   * Returns a render target to the pool.
   *
   * @param {PIXI.RenderTarget} renderTarget - The render target to return.
   */
  FilterManager.prototype.returnRenderTarget = function returnRenderTarget(renderTarget) {
    this.freePotRenderTarget(renderTarget)
  }

  /**
   * Calculates the mapped matrix.
   *
   * TODO playing around here.. this is temporary - (will end up in the shader)
   * this returns a matrix that will normalise map filter cords in the filter to screen space
   *
   * @param {PIXI.Matrix} outputMatrix - the matrix to output to.
   * @return {PIXI.Matrix} The mapped matrix.
   */
  FilterManager.prototype.calculateScreenSpaceMatrix = function calculateScreenSpaceMatrix(outputMatrix) {
    var currentState = this.filterData.stack[this.filterData.index]

    return filterTransforms.calculateScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size)
  }

  /**
   * Multiply vTextureCoord to this matrix to achieve (0,0,1,1) for filterArea
   *
   * @param {PIXI.Matrix} outputMatrix - The matrix to output to.
   * @return {PIXI.Matrix} The mapped matrix.
   */
  FilterManager.prototype.calculateNormalizedScreenSpaceMatrix = function calculateNormalizedScreenSpaceMatrix(outputMatrix) {
    var currentState = this.filterData.stack[this.filterData.index]

    return filterTransforms.calculateNormalizedScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, currentState.destinationFrame)
  }

  /**
   * This will map the filter coord so that a texture can be used based on the transform of a sprite
   *
   * @param {PIXI.Matrix} outputMatrix - The matrix to output to.
   * @param {PIXI.Sprite} sprite - The sprite to map to.
   * @return {PIXI.Matrix} The mapped matrix.
   */
  FilterManager.prototype.calculateSpriteMatrix = function calculateSpriteMatrix(outputMatrix, sprite) {
    var currentState = this.filterData.stack[this.filterData.index]

    return filterTransforms.calculateSpriteMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, sprite)
  }

  /**
   * Destroys this Filter Manager.
   *
   * @param {boolean} [contextLost=false] context was lost, do not free shaders
   *
   */
  FilterManager.prototype.destroy = function destroy() {
    var contextLost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false

    var renderer = this.renderer
    var filters = this.managedFilters

    renderer.off('prerender', this.onPrerender, this)

    for (var i = 0; i < filters.length; i++) {
      if (!contextLost) {
        filters[i].glShaders[renderer.CONTEXT_UID].destroy()
      }
      delete filters[i].glShaders[renderer.CONTEXT_UID]
    }

    this.shaderCache = {}
    if (!contextLost) {
      this.emptyPool()
    } else {
      this.pool = {}
    }
  }

  /**
   * Gets a Power-of-Two render texture.
   *
   * TODO move to a seperate class could be on renderer?
   * also - could cause issue with multiple contexts?
   *
   * @private
   * @param {WebGLRenderingContext} gl - The webgl rendering context
   * @param {number} minWidth - The minimum width of the render target.
   * @param {number} minHeight - The minimum height of the render target.
   * @param {number} resolution - The resolution of the render target.
   * @return {PIXI.RenderTarget} The new render target.
   */
  FilterManager.prototype.getPotRenderTarget = function getPotRenderTarget(gl, minWidth, minHeight, resolution) {
    var key = screenKey

    minWidth *= resolution
    minHeight *= resolution

    if (minWidth !== this._screenWidth || minHeight !== this._screenHeight) {
      // TODO you could return a bigger texture if there is not one in the pool?
      minWidth = bit_twiddle.nextPow2(minWidth)
      minHeight = bit_twiddle.nextPow2(minHeight)
      key = (minWidth & 0xFFFF) << 16 | minHeight & 0xFFFF
    }

    if (!this.pool[key]) {
      this.pool[key] = []
    }

    var renderTarget = this.pool[key].pop()

    // creating render target will cause texture to be bound!
    if (!renderTarget) {
      // temporary bypass cache..
      var tex = this.renderer.boundTextures[0]

      gl.activeTexture(gl.TEXTURE0)

      // internally - this will cause a texture to be bound..
      renderTarget = new RenderTarget(gl, minWidth, minHeight, null, 1)

      // set the current one back
      gl.bindTexture(gl.TEXTURE_2D, tex._glTextures[this.renderer.CONTEXT_UID].texture)
    }

    // manually tweak the resolution...
    // this will not modify the size of the frame buffer, just its resolution.
    renderTarget.resolution = resolution
    renderTarget.defaultFrame.width = renderTarget.size.width = minWidth / resolution
    renderTarget.defaultFrame.height = renderTarget.size.height = minHeight / resolution
    renderTarget.filterPoolKey = key

    return renderTarget
  }

  /**
   * Empties the texture pool.
   *
   */
  FilterManager.prototype.emptyPool = function emptyPool() {
    for (var i in this.pool) {
      var textures = this.pool[i]

      if (textures) {
        for (var j = 0; j < textures.length; j++) {
          textures[j].destroy(true)
        }
      }
    }

    this.pool = {}
  }

  /**
   * Frees a render target back into the pool.
   *
   * @param {PIXI.RenderTarget} renderTarget - The renderTarget to free
   */
  FilterManager.prototype.freePotRenderTarget = function freePotRenderTarget(renderTarget) {
    this.pool[renderTarget.filterPoolKey].push(renderTarget)
  }

  /**
   * Called before the renderer starts rendering.
   *
   */
  FilterManager.prototype.onPrerender = function onPrerender() {
    if (this._screenWidth !== this.renderer.view.width || this._screenHeight !== this.renderer.view.height) {
      this._screenWidth = this.renderer.view.width
      this._screenHeight = this.renderer.view.height

      var textures = this.pool[screenKey]

      if (textures) {
        for (var j = 0; j < textures.length; j++) {
          textures[j].destroy(true)
        }
      }
      this.pool[screenKey] = []
    }
  }

  return FilterManager
})(WebGLManager)

/**
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */
const MaskManager = (_WebGLManager => {
  inherits_(MaskManager, _WebGLManager)

  /**
   * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
   */
  function MaskManager(renderer) {
    class_call_check_(this, MaskManager)

    // TODO - we don't need both!
    var _this = get_constructor_(this, _WebGLManager.call(this, renderer))

    _this.scissor = false
    _this.scissorData = null
    _this.scissorRenderTarget = null

    _this.enableScissor = true

    _this.alphaMaskPool = []
    _this.alphaMaskIndex = 0
    return _this
  }

  /**
   * Applies the Mask and adds it to the current filter stack.
   *
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.Sprite|PIXI.Graphics} maskData - The masking data.
   */
  MaskManager.prototype.pushMask = function pushMask(target, maskData) {
    // TODO the root check means scissor rect will not
    // be used on render textures more info here:
    // https://github.com/pixijs/pixi.js/pull/3545

    if (maskData.texture) {
      this.pushSpriteMask(target, maskData)
    } else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && maskData.isFastRect()) {
      var matrix = maskData.worldTransform

      var rot = Math.atan2(matrix.b, matrix.a)

      // use the nearest degree!
      rot = Math.round(rot * (180 / Math.PI))

      if (rot % 90) {
        this.pushStencilMask(maskData)
      } else {
        this.pushScissorMask(target, maskData)
      }
    } else {
      this.pushStencilMask(maskData)
    }
  }

  /**
   * Removes the last mask from the mask stack and doesn't return it.
   *
   * @param {PIXI.DisplayObject} target - Display Object to pop the mask from
   * @param {PIXI.Sprite|PIXI.Graphics} maskData - The masking data.
   */
  MaskManager.prototype.popMask = function popMask(target, maskData) {
    if (maskData.texture) {
      this.popSpriteMask(target, maskData)
    } else if (this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length) {
      this.popScissorMask(target, maskData)
    } else {
      this.popStencilMask(target, maskData)
    }
  }

  /**
   * Applies the Mask and adds it to the current filter stack.
   *
   * @param {PIXI.RenderTarget} target - Display Object to push the sprite mask to
   * @param {PIXI.Sprite} maskData - Sprite to be used as the mask
   */
  MaskManager.prototype.pushSpriteMask = function pushSpriteMask(target, maskData) {
    var alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex]

    if (!alphaMaskFilter) {
      alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter(maskData)]
    }

    alphaMaskFilter[0].resolution = this.renderer.resolution
    alphaMaskFilter[0].maskSprite = maskData

    // TODO - may cause issues!
    target.filterArea = maskData.getBounds(true)

    this.renderer.filterManager.pushFilter(target, alphaMaskFilter)

    this.alphaMaskIndex++
  }

  /**
   * Removes the last filter from the filter stack and doesn't return it.
   *
   */
  MaskManager.prototype.popSpriteMask = function popSpriteMask() {
    this.renderer.filterManager.popFilter()
    this.alphaMaskIndex--
  }

  /**
   * Applies the Mask and adds it to the current filter stack.
   *
   * @param {PIXI.Sprite|PIXI.Graphics} maskData - The masking data.
   */
  MaskManager.prototype.pushStencilMask = function pushStencilMask(maskData) {
    this.renderer.currentRenderer.stop()
    this.renderer.stencilManager.pushStencil(maskData)
  }

  /**
   * Removes the last filter from the filter stack and doesn't return it.
   *
   */
  MaskManager.prototype.popStencilMask = function popStencilMask() {
    this.renderer.currentRenderer.stop()
    this.renderer.stencilManager.popStencil()
  }

  /**
   *
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.Graphics} maskData - The masking data.
   */
  MaskManager.prototype.pushScissorMask = function pushScissorMask(target, maskData) {
    maskData.renderable = true

    var renderTarget = this.renderer._activeRenderTarget

    var bounds = maskData.getBounds()

    bounds.fit(renderTarget.size)
    maskData.renderable = false

    this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST)

    var resolution = this.renderer.resolution

    this.renderer.gl.scissor(
      bounds.x * resolution,
      (
        renderTarget.root ? renderTarget.size.height - bounds.y - bounds.height : bounds.y
      ) * resolution,
      bounds.width * resolution, bounds.height * resolution
    )

    this.scissorRenderTarget = renderTarget
    this.scissorData = maskData
    this.scissor = true
  }

  MaskManager.prototype.popScissorMask = function popScissorMask() {
    this.scissorRenderTarget = null
    this.scissorData = null
    this.scissor = false

    // must be scissor!
    var gl = this.renderer.gl

    gl.disable(gl.SCISSOR_TEST)
  }

  return MaskManager
})(WebGLManager)

/**
 * Maps gl blend combinations to WebGL.
 *
 * @memberof PIXI
 * @function mapWebGLBlendModesToPixi
 * @private
 * @param {WebGLRenderingContext} gl - The rendering context.
 * @param {string[]} [array=[]] - The array to output into.
 * @return {string[]} Mapped modes.
 */
const mapWebGLBlendModesToPixi = gl => {
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []

  // TODO - premultiply alpha would be different.
  // add a boolean for that!
  array[constants.BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.ADD] = [gl.ONE, gl.DST_ALPHA]
  array[constants.BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR]
  array[constants.BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
  array[constants.BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]

  // not-premultiplied blend modes
  array[constants.BLEND_MODES.NORMAL_NPM] = [
    gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA
  ]
  array[constants.BLEND_MODES.ADD_NPM] = [
    gl.SRC_ALPHA, gl.DST_ALPHA, gl.ONE, gl.DST_ALPHA
  ]
  array[constants.BLEND_MODES.SCREEN_NPM] = [
    gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_COLOR
  ]

  return array
}

/**
 * A WebGL state machines
 *
 * @memberof PIXI
 * @class
 */
const WebGLState = (() => {
  /**
   * @param {WebGLRenderingContext} gl - The current WebGL rendering context
   */
  function WebGLState(gl) {
    class_call_check_(this, WebGLState)

    /**
     * The current active state
     *
     * @member {Uint8Array}
     */
    this.activeState = new Uint8Array(16)

    /**
     * The default state
     *
     * @member {Uint8Array}
     */
    this.defaultState = new Uint8Array(16)

    // default blend mode..
    this.defaultState[0] = 1

    /**
     * The current state index in the stack
     *
     * @member {number}
     * @private
     */
    this.stackIndex = 0

    /**
     * The stack holding all the different states
     *
     * @member {Array<*>}
     * @private
     */
    this.stack = []

    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl

    this.maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)

    this.attribState = {
      tempAttribState: new Array(this.maxAttribs),
      attribState: new Array(this.maxAttribs)
    }

    this.blendModes = (0, mapWebGLBlendModesToPixi)(gl)

    // check we have vao..
    this.nativeVaoExtension = (
      gl.getExtension('OES_vertex_array_object') ||
      gl.getExtension('MOZ_OES_vertex_array_object') ||
      gl.getExtension('WEBKIT_OES_vertex_array_object')
    )
  }

  var BLEND = 0
  var DEPTH_TEST = 1
  var FRONT_FACE = 2
  var CULL_FACE = 3
  var BLEND_FUNC = 4

  /**
   * Pushes a new active state
   */
  WebGLState.prototype.push = function push() {
    // next state..
    var state = this.stack[this.stackIndex]

    if (!state) {
      state = this.stack[this.stackIndex] = new Uint8Array(16)
    }

    ++this.stackIndex

    // copy state..
    // set active state so we can force overrides of gl state
    for (var i = 0; i < this.activeState.length; i++) {
      state[i] = this.activeState[i]
    }
  }

  /**
   * Pops a state out
   */
  WebGLState.prototype.pop = function pop() {
    var state = this.stack[--this.stackIndex]

    this.setState(state)
  }

  /**
   * Sets the current state
   *
   * @param {*} state - The state to set.
   */
  WebGLState.prototype.setState = function setState(state) {
    this.setBlend(state[BLEND])
    this.setDepthTest(state[DEPTH_TEST])
    this.setFrontFace(state[FRONT_FACE])
    this.setCullFace(state[CULL_FACE])
    this.setBlendMode(state[BLEND_FUNC])
  }

  /**
   * Enables or disabled blending.
   *
   * @param {boolean} value - Turn on or off webgl blending.
   */
  WebGLState.prototype.setBlend = function setBlend(value) {
    value = value ? 1 : 0

    if (this.activeState[BLEND] === value) {
      return
    }

    this.activeState[BLEND] = value
    this.gl[value ? 'enable' : 'disable'](this.gl.BLEND)
  }

  /**
   * Sets the blend mode.
   *
   * @param {number} value - The blend mode to set to.
   */
  WebGLState.prototype.setBlendMode = function setBlendMode(value) {
    if (value === this.activeState[BLEND_FUNC]) {
      return
    }

    this.activeState[BLEND_FUNC] = value

    var mode = this.blendModes[value]

    if (mode.length === 2) {
      this.gl.blendFunc(mode[0], mode[1])
    } else {
      this.gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3])
    }
  }

  /**
   * Sets whether to enable or disable depth test.
   *
   * @param {boolean} value - Turn on or off webgl depth testing.
   */
  WebGLState.prototype.setDepthTest = function setDepthTest(value) {
    value = value ? 1 : 0

    if (this.activeState[DEPTH_TEST] === value) {
      return
    }

    this.activeState[DEPTH_TEST] = value
    this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST)
  }

  /**
   * Sets whether to enable or disable cull face.
   *
   * @param {boolean} value - Turn on or off webgl cull face.
   */
  WebGLState.prototype.setCullFace = function setCullFace(value) {
    value = value ? 1 : 0

    if (this.activeState[CULL_FACE] === value) {
      return
    }

    this.activeState[CULL_FACE] = value
    this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE)
  }

  /**
   * Sets the gl front face.
   *
   * @param {boolean} value - true is clockwise and false is counter-clockwise
   */
  WebGLState.prototype.setFrontFace = function setFrontFace(value) {
    value = value ? 1 : 0

    if (this.activeState[FRONT_FACE] === value) {
      return
    }

    this.activeState[FRONT_FACE] = value
    this.gl.frontFace(this.gl[value ? 'CW' : 'CCW'])
  }

  /**
   * Disables all the vaos in use
   *
   */
  WebGLState.prototype.resetAttributes = function resetAttributes() {
    for (var i = 0; i < this.attribState.tempAttribState.length; i++) {
      this.attribState.tempAttribState[i] = 0
    }

    for (var _i = 0; _i < this.attribState.attribState.length; _i++) {
      this.attribState.attribState[_i] = 0
    }

    // im going to assume one is always active for performance reasons.
    for (var _i2 = 1; _i2 < this.maxAttribs; _i2++) {
      this.gl.disableVertexAttribArray(_i2)
    }
  }

  // used
  /**
   * Resets all the logic and disables the vaos
   */
  WebGLState.prototype.resetToDefault = function resetToDefault() {
    // unbind any VAO if they exist..
    if (this.nativeVaoExtension) {
      this.nativeVaoExtension.bindVertexArrayOES(null)
    }

    // reset all attributes..
    this.resetAttributes()

    // set active state so we can force overrides of gl state
    for (var i = 0; i < this.activeState.length; ++i) {
      this.activeState[i] = 32
    }

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false)

    this.setState(this.defaultState)
  }

  return WebGLState
})()

/**
 * Generic Mask Stack data structure.
 *
 * @memberof PIXI
 * @function mapWebGLDrawModesToPixi
 * @private
 * @param {WebGLRenderingContext} gl - The current WebGL drawing context
 * @param {object} [object={}] - The object to map into
 * @return {object} The mapped draw modes.
 */
const mapWebGLDrawModesToPixi = gl => {
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

  object[constants.DRAW_MODES.POINTS] = gl.POINTS
  object[constants.DRAW_MODES.LINES] = gl.LINES
  object[constants.DRAW_MODES.LINE_LOOP] = gl.LINE_LOOP
  object[constants.DRAW_MODES.LINE_STRIP] = gl.LINE_STRIP
  object[constants.DRAW_MODES.TRIANGLES] = gl.TRIANGLES
  object[constants.DRAW_MODES.TRIANGLE_STRIP] = gl.TRIANGLE_STRIP
  object[constants.DRAW_MODES.TRIANGLE_FAN] = gl.TRIANGLE_FAN

  return object
}

/**
 * @class
 * @extends PIXI.Shader
 * @memberof PIXI
 */
const ParticleShader = (_Shader => {
  inherits_(ParticleShader, _Shader)

  /**
   * @param {PIXI.Shader} gl - The webgl shader manager this shader works for.
   */
  function ParticleShader(gl) {
    class_call_check_(this, ParticleShader)

    return get_constructor_(this, _Shader.call(this, gl,
      // vertex shader
      [
        'attribute vec2 aVertexPosition;',
        'attribute vec2 aTextureCoord;',
        'attribute vec4 aColor;',
        'attribute vec2 aPositionCoord;',
        'attribute float aRotation;',
        'uniform mat3 projectionMatrix;',
        'uniform vec4 uColor;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'void main(void){',
        '   float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);',
        '   float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);',
        '   vec2 v = vec2(x, y);', '   v = v + aPositionCoord;',
        '   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);',
        '   vTextureCoord = aTextureCoord;',
        '   vColor = aColor * uColor;',
        '}'
      ].join('\n'),
      // hello
      [
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'void main(void){',
        '  vec4 color = texture2D(uSampler, vTextureCoord) * vColor;',
        '  gl_FragColor = color;',
        '}'
      ].join('\n')))
  }

  return ParticleShader
})(Shader)

/**
 * The SystemRenderer is the base for a PixiJS Renderer. It is extended by the {@link PIXI.CanvasRenderer}
 * and {@link PIXI.WebGLRenderer} which can be used for rendering a PixiJS scene.
 *
 * @abstract
 * @class
 * @extends EventEmitter
 * @memberof PIXI
 */
const SystemRenderer = (_EventEmitter => {
  inherits_(SystemRenderer, _EventEmitter)

  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {string} system - The name of the system this renderer is for.
   * @param {object} [options] - The optional renderer parameters
   * @param {number} [options.width=800] - the width of the screen
   * @param {number} [options.height=600] - the height of the screen
   * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
   * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
   * @param {boolean} [options.autoResize=false] - If the render view is automatically resized, default false
   * @param {boolean} [options.antialias=false] - sets antialias (only applicable in chrome at the moment)
   * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer. The
   *  resolution of the renderer retina would be 2.
   * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation,
   *  enable this if you need to call toDataUrl on the webgl context.
   * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
   *      not before the new render pass.
   * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
   *  (shown if not transparent).
   * @param {boolean} [options.roundPixels=false] - If true PixiJS will Math.floor() x/y values when rendering,
   *  stopping pixel interpolation.
   */
  function SystemRenderer(system, options, arg2, arg3) {
    class_call_check_(this, SystemRenderer)

    var _this = get_constructor_(this, _EventEmitter.call(this))

    void (0, utils.sayHello)(system)

    // Support for constructor(system, screenWidth, screenHeight, options)
    if (typeof options === 'number') {
      options = Object.assign({
        width: options,
        height: arg2 || settings.RENDER_OPTIONS.height
      }, arg3)
    }

    var tempMatrix = new math.Matrix()

    // Add the default render options
    options = Object.assign({}, settings.RENDER_OPTIONS, options)

    /**
     * The supplied constructor options.
     *
     * @member {Object}
     * @readOnly
     */
    _this.options = options

    /**
     * The type of the renderer.
     *
     * @member {number}
     * @default PIXI.RENDERER_TYPE.UNKNOWN
     * @see PIXI.RENDERER_TYPE
     */
    _this.type = constants.RENDERER_TYPE.UNKNOWN

    /**
     * Measurements of the screen. (0, 0, screenWidth, screenHeight)
     *
     * Its safe to use as filterArea or hitArea for whole stage
     *
     * @member {PIXI.Rectangle}
     */
    _this.screen = new math.Rectangle(0, 0, options.width, options.height)

    /**
     * The canvas element that everything is drawn to
     *
     * @member {HTMLCanvasElement}
     */
    _this.view = options.view || document.createElement('canvas')

    /**
     * The resolution / device pixel ratio of the renderer
     *
     * @member {number}
     * @default 1
     */
    _this.resolution = options.resolution || settings.RESOLUTION

    /**
     * Whether the render view is transparent
     *
     * @member {boolean}
     */
    _this.transparent = options.transparent

    /**
     * Whether css dimensions of canvas view should be resized to screen dimensions automatically
     *
     * @member {boolean}
     */
    _this.autoResize = options.autoResize || false

    /**
     * Tracks the blend modes useful for this renderer.
     *
     * @member {object<string, mixed>}
     */
    _this.blendModes = null

    /**
     * The value of the preserveDrawingBuffer flag affects whether or not the contents of
     * the stencil buffer is retained after rendering.
     *
     * @member {boolean}
     */
    _this.preserveDrawingBuffer = options.preserveDrawingBuffer

    /**
     * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
     * If the scene is NOT transparent PixiJS will use a canvas sized fillRect operation every
     * frame to set the canvas background color. If the scene is transparent PixiJS will use clearRect
     * to clear the canvas every frame. Disable this by setting this to false. For example if
     * your game has a canvas filling background image you often don't need this set.
     *
     * @member {boolean}
     * @default
     */
    _this.clearBeforeRender = options.clearBeforeRender

    /**
     * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
     * Handy for crisp pixel art and speed on legacy devices.
     *
     * @member {boolean}
     */
    _this.roundPixels = options.roundPixels

    /**
     * The background color as a number.
     *
     * @member {number}
     * @private
     */
    _this._backgroundColor = 0x000000

    /**
     * The background color as an [R, G, B] array.
     *
     * @member {number[]}
     * @private
     */
    _this._backgroundColorRgba = [0, 0, 0, 0]

    /**
     * The background color as a string.
     *
     * @member {string}
     * @private
     */
    _this._backgroundColorString = '#000000'

    _this.backgroundColor = options.backgroundColor || _this._backgroundColor; // run bg color setter

    /**
     * This temporary display object used as the parent of the currently being rendered item
     *
     * @member {PIXI.DisplayObject}
     * @private
     */
    _this._tempDisplayObjectParent = new Container()

    /**
     * The last root object that the renderer tried to render.
     *
     * @member {PIXI.DisplayObject}
     * @private
     */
    _this._lastObjectRendered = _this._tempDisplayObjectParent
    return _this
  }

  /**
   * Resizes the screen and canvas to the specified width and height
   * Canvas dimensions are multiplied by resolution
   *
   * @param {number} screenWidth - the new width of the screen
   * @param {number} screenHeight - the new height of the screen
   */
  SystemRenderer.prototype.resize = function resize(screenWidth, screenHeight) {
    this.screen.width = screenWidth
    this.screen.height = screenHeight

    this.view.width = screenWidth * this.resolution
    this.view.height = screenHeight * this.resolution

    if (this.autoResize) {
      this.view.style.width = screenWidth + 'px'
      this.view.style.height = screenHeight + 'px'
    }
  }

  /**
   * Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   *
   * @param {PIXI.DisplayObject} displayObject - The displayObject the object will be generated from
   * @param {number} scaleMode - Should be one of the scaleMode consts
   * @param {number} resolution - The resolution / device pixel ratio of the texture being generated
   * @param {PIXI.Rectangle} [region] - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @return {PIXI.Texture} a texture of the graphics object
   */
  SystemRenderer.prototype.generateTexture = function generateTexture(
    displayObject, scaleMode, resolution, region
  ) {
    region = region || displayObject.getLocalBounds()

    var renderTexture = RenderTexture.create(
      region.width | 0, region.height | 0, scaleMode, resolution
    )

    tempMatrix.tx = -region.x
    tempMatrix.ty = -region.y

    this.render(displayObject, renderTexture, false, tempMatrix, true)

    return renderTexture
  }

  /**
   * Removes everything from the renderer and optionally removes the Canvas DOM element.
   *
   * @param {boolean} [removeView=false] - Removes the Canvas element from the DOM.
   */
  SystemRenderer.prototype.destroy = function destroy(removeView) {
    if (removeView && this.view.parentNode) {
      this.view.parentNode.removeChild(this.view)
    }

    this.type = constants.RENDERER_TYPE.UNKNOWN

    this.view = null

    this.screen = null

    this.resolution = 0

    this.transparent = false

    this.autoResize = false

    this.blendModes = null

    this.options = null

    this.preserveDrawingBuffer = false
    this.clearBeforeRender = false

    this.roundPixels = false

    this._backgroundColor = 0
    this._backgroundColorRgba = null
    this._backgroundColorString = null

    this._tempDisplayObjectParent = null
    this._lastObjectRendered = null
  }

  /**
   * The background color to fill if not transparent
   *
   * @member {number}
   */
  create_class_(SystemRenderer, [{
    key: 'width',
    get: function get() {
      return this.view.width
    }

    /**
     * Same as view.height, actual number of pixels in the canvas by vertical
     *
     * @member {number}
     * @readonly
     * @default 600
     */

  }, {
    key: 'height',
    get: function get() {
      return this.view.height
    }
  }, {
    key: 'backgroundColor',
    get: function get() {
      return this._backgroundColor
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._backgroundColor = value
      this._backgroundColorString = (0, utils.hex2string)(value)
      void (0, utils.hex2rgb)(value, this._backgroundColorRgba)
    }
  }])

  return SystemRenderer
})(EventEmitter)

/**
 * A set of functions used to handle masking.
 *
 * @class
 * @memberof PIXI
 */
const CanvasMaskManager = (() => {
  /**
   * @param {PIXI.CanvasRenderer} renderer - The canvas renderer.
   */
  function CanvasMaskManager(renderer) {
    class_call_check_(this, CanvasMaskManager)

    this.renderer = renderer
  }

  /**
   * This method adds it to the current stack of masks.
   *
   * @param {object} maskData - the maskData that will be pushed
   */
  CanvasMaskManager.prototype.pushMask = function pushMask(maskData) {
    var renderer = this.renderer

    renderer.context.save()

    var cacheAlpha = maskData.alpha
    var transform = maskData.transform.worldTransform
    var resolution = renderer.resolution

    renderer.context.setTransform(
      transform.a * resolution,
      transform.b * resolution,
      transform.c * resolution,
      transform.d * resolution,
      transform.tx * resolution,
      transform.ty * resolution
    )

    // TODO suport sprite alpha masks??
    // lots of effort required. If demand is great enough..
    if (!maskData._texture) {
      this.renderGraphicsShape(maskData)
      renderer.context.clip()
    }

    maskData.worldAlpha = cacheAlpha
  }

  /**
   * Renders a PIXI.Graphics shape.
   *
   * @param {PIXI.Graphics} graphics - The object to render.
   */
  CanvasMaskManager.prototype.renderGraphicsShape = function renderGraphicsShape(graphics) {
    var context = this.renderer.context
    var len = graphics.graphicsData.length

    if (len === 0) {
      return
    }

    context.beginPath()

    for (var i = 0; i < len; i++) {
      var data = graphics.graphicsData[i]
      var shape = data.shape

      if (data.type === constants.SHAPES.POLY) {
        var points = shape.points

        context.moveTo(points[0], points[1])

        for (var j = 1; j < points.length / 2; j++) {
          context.lineTo(points[j * 2], points[j * 2 + 1])
        }

        // if the first and last point are the same close the path - much neater :)
        if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
          context.closePath()
        }
      } else if (data.type === constants.SHAPES.RECT) {
        context.rect(shape.x, shape.y, shape.width, shape.height)
        context.closePath()
      } else if (data.type === constants.SHAPES.CIRC) {
        // TODO - need to be Undefined!
        context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
        context.closePath()
      } else if (data.type === constants.SHAPES.ELIP) {
        // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

        var w = shape.width * 2
        var h = shape.height * 2

        var x = shape.x - w / 2
        var y = shape.y - h / 2

        var kappa = 0.5522848
        var ox = w / 2 * kappa; // control point offset horizontal
        var oy = h / 2 * kappa; // control point offset vertical
        var xe = x + w; // x-end
        var ye = y + h; // y-end
        var xm = x + w / 2; // x-middle
        var ym = y + h / 2; // y-middle

        context.moveTo(x, ym)
        context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
        context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
        context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
        context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
        context.closePath()
      } else if (data.type === constants.SHAPES.RREC) {
        var rx = shape.x
        var ry = shape.y
        var width = shape.width
        var height = shape.height
        var radius = shape.radius

        var maxRadius = Math.min(width, height) / 2 | 0

        radius = radius > maxRadius ? maxRadius : radius

        context.moveTo(rx, ry + radius)
        context.lineTo(rx, ry + height - radius)
        context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height)
        context.lineTo(rx + width - radius, ry + height)
        context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius)
        context.lineTo(rx + width, ry + radius)
        context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry)
        context.lineTo(rx + radius, ry)
        context.quadraticCurveTo(rx, ry, rx, ry + radius)
        context.closePath()
      }
    }
  }

  /**
   * Restores the current drawing context to the state it was before the mask was applied.
   *
   * @param {PIXI.CanvasRenderer} renderer - The renderer context to use.
   */
  CanvasMaskManager.prototype.popMask = function popMask(renderer) {
    renderer.context.restore()
    renderer.invalidateBlendMode()
  }

  /**
   * Destroys this canvas mask manager.
   *
   */
  CanvasMaskManager.prototype.destroy = function destroy() {
    /* empty */
  }

  return CanvasMaskManager
})()

/**
 * Creates a Canvas element of the given size.
 *
 * @class
 * @memberof PIXI
 */
const CanvasRenderTarget = (() => {
  /**
   * @param {number} width - the width for the newly created canvas
   * @param {number} height - the height for the newly created canvas
   * @param {number} [resolution=1] - The resolution / device pixel ratio of the canvas
   */
  function CanvasRenderTarget(width, height, resolution) {
    class_call_check_(this, CanvasRenderTarget)

    /**
     * The Canvas object that belongs to this CanvasRenderTarget.
     *
     * @member {HTMLCanvasElement}
     */
    this.canvas = document.createElement('canvas')

    /**
     * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
     *
     * @member {CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d')

    this.resolution = resolution || settings.RESOLUTION

    this.resize(width, height)
  }

  /**
   * Clears the canvas that was created by the CanvasRenderTarget class.
   *
   * @private
   */
  CanvasRenderTarget.prototype.clear = function clear() {
    this.context.setTransform(1, 0, 0, 1, 0, 0)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Resizes the canvas to the specified width and height.
   *
   * @param {number} width - the new width of the canvas
   * @param {number} height - the new height of the canvas
   */
  CanvasRenderTarget.prototype.resize = function resize(width, height) {
    this.canvas.width = width * this.resolution
    this.canvas.height = height * this.resolution
  }

  /**
   * Destroys this canvas.
   *
   */
  CanvasRenderTarget.prototype.destroy = function destroy() {
    this.context = null
    this.canvas = null
  }

  /**
   * The width of the canvas buffer in pixels.
   *
   * @member {number}
   */
  create_class_(CanvasRenderTarget, [{
    key: 'width',
    get: function get() {
      return this.canvas.width
    },
    set: function set(val) // eslint-disable-line require-jsdoc
    {
      this.canvas.width = val
    }

    /**
     * The height of the canvas buffer in pixels.
     *
     * @member {number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this.canvas.height
    },
    set: function set(val) // eslint-disable-line require-jsdoc
    {
      this.canvas.height = val
    }
  }])

  return CanvasRenderTarget
})()

/**
 * Maps blend combinations to Canvas.
 *
 * @memberof PIXI
 * @function mapCanvasBlendModesToPixi
 * @private
 * @param {string[]} [array=[]] - The array to output into.
 * @return {string[]} Mapped modes.
 */
const mapCanvasBlendModesToPixi = () => {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []

  if ((0, canUseNewCanvasBlendModes)()) {
    array[constants.BLEND_MODES.NORMAL] = 'source-over'
    array[constants.BLEND_MODES.ADD] = 'lighter'; // IS THIS OK???
    array[constants.BLEND_MODES.MULTIPLY] = 'multiply'
    array[constants.BLEND_MODES.SCREEN] = 'screen'
    array[constants.BLEND_MODES.OVERLAY] = 'overlay'
    array[constants.BLEND_MODES.DARKEN] = 'darken'
    array[constants.BLEND_MODES.LIGHTEN] = 'lighten'
    array[constants.BLEND_MODES.COLOR_DODGE] = 'color-dodge'
    array[constants.BLEND_MODES.COLOR_BURN] = 'color-burn'
    array[constants.BLEND_MODES.HARD_LIGHT] = 'hard-light'
    array[constants.BLEND_MODES.SOFT_LIGHT] = 'soft-light'
    array[constants.BLEND_MODES.DIFFERENCE] = 'difference'
    array[constants.BLEND_MODES.EXCLUSION] = 'exclusion'
    array[constants.BLEND_MODES.HUE] = 'hue'
    array[constants.BLEND_MODES.SATURATION] = 'saturate'
    array[constants.BLEND_MODES.COLOR] = 'color'
    array[constants.BLEND_MODES.LUMINOSITY] = 'luminosity'
  } else {
    // this means that the browser does not support the cool new blend modes in canvas 'cough' ie 'cough'
    array[constants.BLEND_MODES.NORMAL] = 'source-over'
    array[constants.BLEND_MODES.ADD] = 'lighter'; // IS THIS OK???
    array[constants.BLEND_MODES.MULTIPLY] = 'source-over'
    array[constants.BLEND_MODES.SCREEN] = 'source-over'
    array[constants.BLEND_MODES.OVERLAY] = 'source-over'
    array[constants.BLEND_MODES.DARKEN] = 'source-over'
    array[constants.BLEND_MODES.LIGHTEN] = 'source-over'
    array[constants.BLEND_MODES.COLOR_DODGE] = 'source-over'
    array[constants.BLEND_MODES.COLOR_BURN] = 'source-over'
    array[constants.BLEND_MODES.HARD_LIGHT] = 'source-over'
    array[constants.BLEND_MODES.SOFT_LIGHT] = 'source-over'
    array[constants.BLEND_MODES.DIFFERENCE] = 'source-over'
    array[constants.BLEND_MODES.EXCLUSION] = 'source-over'
    array[constants.BLEND_MODES.HUE] = 'source-over'
    array[constants.BLEND_MODES.SATURATION] = 'source-over'
    array[constants.BLEND_MODES.COLOR] = 'source-over'
    array[constants.BLEND_MODES.LUMINOSITY] = 'source-over'
  }
  // not-premultiplied, only for webgl
  array[constants.BLEND_MODES.NORMAL_NPM] = array[constants.BLEND_MODES.NORMAL]
  array[constants.BLEND_MODES.ADD_NPM] = array[constants.BLEND_MODES.ADD]
  array[constants.BLEND_MODES.SCREEN_NPM] = array[constants.BLEND_MODES.SCREEN]

  return array
}

/**
 * The CanvasRenderer draws the scene and all its content onto a 2d canvas. This renderer should
 * be used for browsers that do not support WebGL. Don't forget to add the CanvasRenderer.view to
 * your DOM or you will not see anything :)
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.SystemRenderer
 */
const CanvasRenderer = (SystemRenderer => {
  inherits_(CanvasRenderer, SystemRenderer)

  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {object} [options] - The optional renderer parameters
   * @param {number} [options.width=800] - the width of the screen
   * @param {number} [options.height=600] - the height of the screen
   * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
   * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
   * @param {boolean} [options.autoResize=false] - If the render view is automatically resized, default false
   * @param {boolean} [options.antialias=false] - sets antialias (only applicable in chrome at the moment)
   * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer. The
   *  resolution of the renderer retina would be 2.
   * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation,
   *  enable this if you need to call toDataUrl on the webgl context.
   * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
   *      not before the new render pass.
   * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
   *  (shown if not transparent).
   * @param {boolean} [options.roundPixels=false] - If true PixiJS will Math.floor() x/y values when rendering,
   *  stopping pixel interpolation.
   */
  function CanvasRenderer(options, arg2, arg3) {
    class_call_check_(this, CanvasRenderer)

    var _this = get_constructor_(this, SystemRenderer.call(this, 'Canvas', options, arg2, arg3))

    _this.type = constants.RENDERER_TYPE.CANVAS

    /**
     * The root canvas 2d context that everything is drawn with.
     *
     * @member {CanvasRenderingContext2D}
     */
    _this.rootContext = _this.view.getContext('2d', {
      alpha: _this.transparent
    })

    /**
     * The currently active canvas 2d context (could change with renderTextures)
     *
     * @member {CanvasRenderingContext2D}
     */
    _this.context = _this.rootContext

    /**
     * Boolean flag controlling canvas refresh.
     *
     * @member {boolean}
     */
    _this.refresh = true

    /**
     * Instance of a CanvasMaskManager, handles masking when using the canvas renderer.
     *
     * @member {PIXI.CanvasMaskManager}
     */
    _this.maskManager = new CanvasMaskManager(_this)

    /**
     * The canvas property used to set the canvas smoothing property.
     *
     * @member {string}
     */
    _this.smoothProperty = 'imageSmoothingEnabled'

    if (!_this.rootContext.imageSmoothingEnabled) {
      if (_this.rootContext.webkitImageSmoothingEnabled) {
        _this.smoothProperty = 'webkitImageSmoothingEnabled'
      } else if (_this.rootContext.mozImageSmoothingEnabled) {
        _this.smoothProperty = 'mozImageSmoothingEnabled'
      } else if (_this.rootContext.oImageSmoothingEnabled) {
        _this.smoothProperty = 'oImageSmoothingEnabled'
      } else if (_this.rootContext.msImageSmoothingEnabled) {
        _this.smoothProperty = 'msImageSmoothingEnabled'
      }
    }

    _this.initPlugins()

    _this.blendModes = (0, mapCanvasBlendModesToPixi)()
    _this._activeBlendMode = null

    _this.renderingToScreen = false

    _this.resize(_this.options.width, _this.options.height)

    /**
     * Fired after rendering finishes.
     *
     * @event PIXI.CanvasRenderer#postrender
     */

    /**
     * Fired before rendering starts.
     *
     * @event PIXI.CanvasRenderer#prerender
     */
    return _this
  }

  /**
   * Renders the object to this canvas view
   *
   * @param {PIXI.DisplayObject} displayObject - The object to be rendered
   * @param {PIXI.RenderTexture} [renderTexture] - A render texture to be rendered to.
   *  If unset, it will render to the root context.
   * @param {boolean} [clear=false] - Whether to clear the canvas before drawing
   * @param {PIXI.Transform} [transform] - A transformation to be applied
   * @param {boolean} [skipUpdateTransform=false] - Whether to skip the update transform
   */
  CanvasRenderer.prototype.render = function render(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
    if (!this.view) {
      return
    }

    // can be handy to know!
    this.renderingToScreen = !renderTexture

    this.emit('prerender')

    var rootResolution = this.resolution

    if (renderTexture) {
      renderTexture = renderTexture.baseTexture || renderTexture

      if (!renderTexture._canvasRenderTarget) {
        renderTexture._canvasRenderTarget = new CanvasRenderTarget(renderTexture.width, renderTexture.height, renderTexture.resolution)
        renderTexture.source = renderTexture._canvasRenderTarget.canvas
        renderTexture.valid = true
      }

      this.context = renderTexture._canvasRenderTarget.context
      this.resolution = renderTexture._canvasRenderTarget.resolution
    } else {
      this.context = this.rootContext
    }

    var context = this.context

    if (!renderTexture) {
      this._lastObjectRendered = displayObject
    }

    if (!skipUpdateTransform) {
      // update the scene graph
      var cacheParent = displayObject.parent
      var tempWt = this._tempDisplayObjectParent.transform.worldTransform

      if (transform) {
        transform.copy(tempWt)

        // lets not forget to flag the parent transform as dirty...
        this._tempDisplayObjectParent.transform._worldID = -1
      } else {
        tempWt.identity()
      }

      displayObject.parent = this._tempDisplayObjectParent

      displayObject.updateTransform()
      displayObject.parent = cacheParent
      // displayObject.hitArea = //TODO add a temp hit area
    }

    context.save()
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.globalAlpha = 1
    this._activeBlendMode = constants.BLEND_MODES.NORMAL
    context.globalCompositeOperation = this.blendModes[constants.BLEND_MODES.NORMAL]

    if (navigator.isCocoonJS && this.view.screencanvas) {
      context.fillStyle = 'black'
      context.clear()
    }

    if (clear !== undefined ? clear : this.clearBeforeRender) {
      if (this.renderingToScreen) {
        if (this.transparent) {
          context.clearRect(0, 0, this.width, this.height)
        } else {
          context.fillStyle = this._backgroundColorString
          context.fillRect(0, 0, this.width, this.height)
        }
      } // else {
      // TODO: implement background for CanvasRenderTarget or RenderTexture?
      // }
    }

    // TODO RENDER TARGET STUFF HERE..
    var tempContext = this.context

    this.context = context
    displayObject.renderCanvas(this)
    this.context = tempContext

    context.restore()

    this.resolution = rootResolution

    this.emit('postrender')
  }

  /**
   * Clear the canvas of renderer.
   *
   * @param {string} [clearColor] - Clear the canvas with this color, except the canvas is transparent.
   */
  CanvasRenderer.prototype.clear = function clear(clearColor) {
    var context = this.context

    clearColor = clearColor || this._backgroundColorString

    if (!this.transparent && clearColor) {
      context.fillStyle = clearColor
      context.fillRect(0, 0, this.width, this.height)
    } else {
      context.clearRect(0, 0, this.width, this.height)
    }
  }

  /**
   * Sets the blend mode of the renderer.
   *
   * @param {number} blendMode - See {@link PIXI.BLEND_MODES} for valid values.
   */
  CanvasRenderer.prototype.setBlendMode = function setBlendMode(blendMode) {
    if (this._activeBlendMode === blendMode) {
      return
    }

    this._activeBlendMode = blendMode
    this.context.globalCompositeOperation = this.blendModes[blendMode]
  }

  /**
   * Removes everything from the renderer and optionally removes the Canvas DOM element.
   *
   * @param {boolean} [removeView=false] - Removes the Canvas element from the DOM.
   */
  CanvasRenderer.prototype.destroy = function destroy(removeView) {
    this.destroyPlugins()

    // call the base destroy
    SystemRenderer.prototype.destroy.call(this, removeView)

    this.context = null

    this.refresh = true

    this.maskManager.destroy()
    this.maskManager = null

    this.smoothProperty = null
  }

  /**
   * Resizes the canvas view to the specified width and height.
   *
   * @extends PIXI.SystemRenderer#resize
   *
   * @param {number} screenWidth - the new width of the screen
   * @param {number} screenHeight - the new height of the screen
   */
  CanvasRenderer.prototype.resize = function resize(screenWidth, screenHeight) {
    SystemRenderer.prototype.resize.call(this, screenWidth, screenHeight)

    // reset the scale mode.. oddly this seems to be reset when the canvas is resized.
    // surely a browser bug?? Let PixiJS fix that for you..
    if (this.smoothProperty) {
      this.rootContext[this.smoothProperty] = settings.SCALE_MODE === constants.SCALE_MODES.LINEAR
    }
  }

  /**
   * Checks if blend mode has changed.
   */
  CanvasRenderer.prototype.invalidateBlendMode = function invalidateBlendMode() {
    this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation)
  }

  /**
   * Collection of installed plugins. These are included by default in PIXI, but can be excluded
   * by creating a custom build. Consult the README for more information about creating custom
   * builds and excluding plugins.
   * @name PIXI.CanvasRenderer#plugins
   * @type {object}
   * @readonly
   * @property {PIXI.accessibility.AccessibilityManager} accessibility Support tabbing interactive elements.
   * @property {PIXI.extract.CanvasExtract} extract Extract image data from renderer.
   * @property {PIXI.interaction.InteractionManager} interaction Handles mouse, touch and pointer events.
   * @property {PIXI.prepare.CanvasPrepare} prepare Pre-render display objects.
   */
  /**
   * Adds a plugin to the renderer.
   *
   * @method PIXI.CanvasRenderer#registerPlugin
   * @param {string} pluginName - The name of the plugin.
   * @param {Function} ctor - The constructor function or class for the plugin.
   */
  utils.pluginTarget.mixin(CanvasRenderer)

  return CanvasRenderer
})(SystemRenderer)


/**
 * TextureGarbageCollector. This class manages the GPU and ensures that it does not get clogged
 * up with textures that are no longer being used.
 *
 * @class
 * @memberof PIXI
 */
const TextureGarbageCollector = (() => {
  /**
   * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
   */
  function TextureGarbageCollector(renderer) {
    class_call_check_(this, TextureGarbageCollector)

    this.renderer = renderer

    this.count = 0
    this.checkCount = 0
    this.maxIdle = settings.GC_MAX_IDLE
    this.checkCountMax = settings.GC_MAX_CHECK_COUNT
    this.mode = settings.GC_MODE
  }

  /**
   * Checks to see when the last time a texture was used
   * if the texture has not been used for a specified amount of time it will be removed from the GPU
   */
  TextureGarbageCollector.prototype.update = function update() {
    this.count++

    if (this.mode === constants.GC_MODES.MANUAL) {
      return
    }

    this.checkCount++

    if (this.checkCount > this.checkCountMax) {
      this.checkCount = 0

      this.run()
    }
  }

  /**
   * Checks to see when the last time a texture was used
   * if the texture has not been used for a specified amount of time it will be removed from the GPU
   */
  TextureGarbageCollector.prototype.run = function run() {
    var tm = this.renderer.textureManager
    var managedTextures = tm._managedTextures
    var wasRemoved = false

    for (var i = 0; i < managedTextures.length; i++) {
      var texture = managedTextures[i]

      // only supports non generated textures at the moment!
      if (!texture._glRenderTargets && this.count - texture.touched > this.maxIdle) {
        tm.destroyTexture(texture, true)
        managedTextures[i] = null
        wasRemoved = true
      }
    }

    if (wasRemoved) {
      var j = 0

      for (var _i = 0; _i < managedTextures.length; _i++) {
        if (managedTextures[_i] !== null) {
          managedTextures[j++] = managedTextures[_i]
        }
      }

      managedTextures.length = j
    }
  }

  /**
   * Removes all the textures within the specified displayObject and its children from the GPU
   *
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */
  TextureGarbageCollector.prototype.unload = function unload(displayObject) {
    var tm = this.renderer.textureManager

    // only destroy non generated textures
    if (displayObject._texture && displayObject._texture._glRenderTargets) {
      tm.destroyTexture(displayObject._texture, true)
    }

    for (var i = displayObject.children.length - 1; i >= 0; i--) {
      this.unload(displayObject.children[i])
    }
  }

  return TextureGarbageCollector
})()

/**
 * Helper class to create a webGL Texture
 *
 * @class
 * @memberof PIXI
 */
const TextureManager = (() => {
  /**
   * @param {PIXI.WebGLRenderer} renderer - A reference to the current renderer
   */
  function TextureManager(renderer) {
    class_call_check_(this, TextureManager)

    /**
     * A reference to the current renderer
     *
     * @member {PIXI.WebGLRenderer}
     */
    this.renderer = renderer

    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = renderer.gl

    /**
     * Track textures in the renderer so we can no longer listen to them on destruction.
     *
     * @member {Array<*>}
     * @private
     */
    this._managedTextures = []
  }

  /**
   * Binds a texture.
   *
   */
  TextureManager.prototype.bindTexture = function bindTexture() { } // empty

  /**
   * Gets a texture.
   *
   */
  TextureManager.prototype.getTexture = function getTexture() { } // empty

  /**
   * Updates and/or Creates a WebGL texture for the renderer's context.
   *
   * @param {PIXI.BaseTexture|PIXI.Texture} texture - the texture to update
   * @param {number} location - the location the texture will be bound to.
   * @return {GLTexture} The gl texture.
   */
  TextureManager.prototype.updateTexture = function updateTexture(texture, location) {
    // assume it good!
    // texture = texture.baseTexture || texture

    var gl = this.gl

    var isRenderTexture = !!texture._glRenderTargets

    if (!texture.hasLoaded) {
      return null
    }

    var boundTextures = this.renderer.boundTextures

    // if the location is undefined then this may have been called by n event.
    // this being the case the texture may already be bound to a slot. As a texture can only be bound once
    // we need to find its current location if it exists.
    if (location === undefined) {
      location = 0

      // TODO maybe we can use texture bound ids later on...
      // check if texture is already bound..
      for (var i = 0; i < boundTextures.length; ++i) {
        if (boundTextures[i] === texture) {
          location = i
          break
        }
      }
    }

    boundTextures[location] = texture

    gl.activeTexture(gl.TEXTURE0 + location)

    var glTexture = texture._glTextures[this.renderer.CONTEXT_UID]

    if (!glTexture) {
      if (isRenderTexture) {
        var renderTarget = new RenderTarget(this.gl, texture.width, texture.height, texture.scaleMode, texture.resolution)

        renderTarget.resize(texture.width, texture.height)
        texture._glRenderTargets[this.renderer.CONTEXT_UID] = renderTarget
        glTexture = renderTarget.texture
      } else {
        glTexture = new GLCore.GLTexture(this.gl, null, null, null, null)
        glTexture.bind(location)
        glTexture.premultiplyAlpha = true
        glTexture.upload(texture.source)
      }

      texture._glTextures[this.renderer.CONTEXT_UID] = glTexture

      texture.on('update', this.updateTexture, this)
      texture.on('dispose', this.destroyTexture, this)

      this._managedTextures.push(texture)

      if (texture.isPowerOfTwo) {
        if (texture.mipmap) {
          glTexture.enableMipmap()
        }

        if (texture.wrapMode === constants.WRAP_MODES.CLAMP) {
          glTexture.enableWrapClamp()
        } else if (texture.wrapMode === constants.WRAP_MODES.REPEAT) {
          glTexture.enableWrapRepeat()
        } else {
          glTexture.enableWrapMirrorRepeat()
        }
      } else {
        glTexture.enableWrapClamp()
      }

      if (texture.scaleMode === constants.SCALE_MODES.NEAREST) {
        glTexture.enableNearestScaling()
      } else {
        glTexture.enableLinearScaling()
      }
    }
    // the texture already exists so we only need to update it..
    else if (isRenderTexture) {
      texture._glRenderTargets[this.renderer.CONTEXT_UID].resize(texture.width, texture.height)
    } else {
      glTexture.upload(texture.source)
    }

    return glTexture
  }

  /**
   * Deletes the texture from WebGL
   *
   * @param {PIXI.BaseTexture|PIXI.Texture} texture - the texture to destroy
   * @param {boolean} [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
   */
  TextureManager.prototype.destroyTexture = function destroyTexture(texture, skipRemove) {
    texture = texture.baseTexture || texture

    if (!texture.hasLoaded) {
      return
    }

    var uid = this.renderer.CONTEXT_UID
    var glTextures = texture._glTextures
    var glRenderTargets = texture._glRenderTargets

    if (glTextures[uid]) {
      this.renderer.unbindTexture(texture)

      glTextures[uid].destroy()
      texture.off('update', this.updateTexture, this)
      texture.off('dispose', this.destroyTexture, this)

      delete glTextures[uid]

      if (!skipRemove) {
        var i = this._managedTextures.indexOf(texture)

        if (i !== -1) {
          void (0, utils.removeItems)(this._managedTextures, i, 1)
        }
      }
    }

    if (glRenderTargets && glRenderTargets[uid]) {
      glRenderTargets[uid].destroy()
      delete glRenderTargets[uid]
    }
  }

  /**
   * Deletes all the textures from WebGL
   */
  TextureManager.prototype.removeAll = function removeAll() {
    // empty all the old gl textures as they are useless now
    for (var i = 0; i < this._managedTextures.length; ++i) {
      var texture = this._managedTextures[i]

      if (texture._glTextures[this.renderer.CONTEXT_UID]) {
        delete texture._glTextures[this.renderer.CONTEXT_UID]
      }
    }
  }

  /**
   * Destroys this manager and removes all its textures
   */
  TextureManager.prototype.destroy = function destroy() {
    // destroy managed textures
    for (var i = 0; i < this._managedTextures.length; ++i) {
      var texture = this._managedTextures[i]

      this.destroyTexture(texture, true)

      texture.off('update', this.updateTexture, this)
      texture.off('dispose', this.destroyTexture, this)
    }

    this._managedTextures = null
  }

  return TextureManager
})()

/**
 * The WebGLRenderer draws the scene and all its content onto a webGL enabled canvas. This renderer
 * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
 * So no need for Sprite Batches or Sprite Clouds.
 * Don't forget to add the view to your DOM or you will not see anything :)
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.SystemRenderer
 */
var WebGLRenderer = function (SystemRenderer) {
  inherits_(WebGLRenderer, SystemRenderer)

  var CONTEXT_UID = 0

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} [options] - The optional renderer parameters
   * @param {number} [options.width=800] - the width of the screen
   * @param {number} [options.height=600] - the height of the screen
   * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
   * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
   * @param {boolean} [options.autoResize=false] - If the render view is automatically resized, default false
   * @param {boolean} [options.antialias=false] - sets antialias. If not available natively then FXAA
   *  antialiasing is used
   * @param {boolean} [options.forceFXAA=false] - forces FXAA antialiasing to be used over native.
   *  FXAA is faster, but may not always look as great
   * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer.
   *  The resolution of the renderer retina would be 2.
   * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear
   *  the canvas or not before the new render pass. If you wish to set this to false, you *must* set
   *  preserveDrawingBuffer to `true`.
   * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation,
   *  enable this if you need to call toDataUrl on the webgl context.
   * @param {boolean} [options.roundPixels=false] - If true PixiJS will Math.floor() x/y values when
   *  rendering, stopping pixel interpolation.
   * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
   *  (shown if not transparent).
   * @param {boolean} [options.legacy=false] - If true PixiJS will aim to ensure compatibility
   *  with older / less advanced devices. If you experiance unexplained flickering try setting this to true.
   * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
   *  for devices with dual graphics card
   */
  function WebGLRenderer(options, arg2, arg3) {
    class_call_check_(this, WebGLRenderer)

    var _this = get_constructor_(this, SystemRenderer.call(this, 'WebGL', options, arg2, arg3))

    _this.legacy = _this.options.legacy

    if (_this.legacy) {
      GLCore.VertexArrayObject.FORCE_NATIVE = true
    }

    /**
     * The type of this renderer as a standardised const
     *
     * @member {number}
     * @see PIXI.RENDERER_TYPE
     */
    _this.type = constants.RENDERER_TYPE.WEBGL

    _this.handleContextLost = _this.handleContextLost.bind(_this)
    _this.handleContextRestored = _this.handleContextRestored.bind(_this)

    _this.view.addEventListener('webglcontextlost', _this.handleContextLost, false)
    _this.view.addEventListener('webglcontextrestored', _this.handleContextRestored, false)

    /**
     * The options passed in to create a new webgl context.
     *
     * @member {object}
     * @private
     */
    _this._contextOptions = {
      alpha: _this.transparent,
      antialias: _this.options.antialias,
      premultipliedAlpha: _this.transparent && _this.transparent !== 'notMultiplied',
      stencil: true,
      preserveDrawingBuffer: _this.options.preserveDrawingBuffer,
      powerPreference: _this.options.powerPreference
    }

    _this._backgroundColorRgba[3] = _this.transparent ? 0 : 1

    /**
     * Manages the masks using the stencil buffer.
     *
     * @member {PIXI.MaskManager}
     */
    _this.maskManager = new MaskManager(_this)

    /**
     * Manages the stencil buffer.
     *
     * @member {PIXI.StencilManager}
     */
    _this.stencilManager = new StencilManager(_this)

    /**
     * An empty renderer.
     *
     * @member {PIXI.ObjectRenderer}
     */
    _this.emptyRenderer = new ObjectRenderer(_this)

    /**
     * The currently active ObjectRenderer.
     *
     * @member {PIXI.ObjectRenderer}
     */
    _this.currentRenderer = _this.emptyRenderer

    /**
     * Manages textures
     * @member {PIXI.TextureManager}
     */
    _this.textureManager = null

    /**
     * Manages the filters.
     *
     * @member {PIXI.FilterManager}
     */
    _this.filterManager = null

    _this.initPlugins()

    /**
     * The current WebGL rendering context, it is created here
     *
     * @member {WebGLRenderingContext}
     */
    // initialize the context so it is ready for the managers.
    if (_this.options.context) {
      // checks to see if a context is valid..
      (0, validateContext)(_this.options.context)
    }

    _this.gl = _this.options.context || GLCore.createContext(_this.view, _this._contextOptions)

    _this.CONTEXT_UID = CONTEXT_UID++

    /**
     * The currently active ObjectRenderer.
     *
     * @member {PIXI.WebGLState}
     */
    _this.state = new WebGLState(_this.gl)

    _this.renderingToScreen = true

    /**
     * Holds the current state of textures bound to the GPU.
     * @type {Array}
     */
    _this.boundTextures = null

    /**
     * Holds the current shader
     *
     * @member {PIXI.Shader}
     */
    _this._activeShader = null

    _this._activeVao = null

    /**
     * Holds the current render target
     *
     * @member {PIXI.RenderTarget}
     */
    _this._activeRenderTarget = null

    _this._initContext()

    // map some webGL blend and drawmodes..
    _this.drawModes = (0, mapWebGLDrawModesToPixi)(_this.gl)

    _this._nextTextureLocation = 0

    _this.setBlendMode(0)

    /**
     * Fired after rendering finishes.
     *
     * @event PIXI.WebGLRenderer#postrender
     */

    /**
     * Fired before rendering starts.
     *
     * @event PIXI.WebGLRenderer#prerender
     */

    /**
     * Fired when the WebGL context is set.
     *
     * @event PIXI.WebGLRenderer#context
     * @param {WebGLRenderingContext} gl - WebGL context.
     */
    return _this
  }

  /**
   * Creates the WebGL context
   *
   * @private
   */
  WebGLRenderer.prototype._initContext = function _initContext() {
    var gl = this.gl

    // restore a context if it was previously lost
    if (gl.isContextLost() && gl.getExtension('WEBGL_lose_context')) {
      gl.getExtension('WEBGL_lose_context').restoreContext()
    }

    var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)

    this._activeShader = null
    this._activeVao = null

    this.boundTextures = new Array(maxTextures)
    this.emptyTextures = new Array(maxTextures)

    // create a texture manager...
    this.textureManager = new TextureManager(this)
    this.filterManager = new FilterManager(this)
    this.textureGC = new TextureGarbageCollector(this)

    this.state.resetToDefault()

    this.rootRenderTarget = new RenderTarget(gl, this.width, this.height, null, this.resolution, true)
    this.rootRenderTarget.clearColor = this._backgroundColorRgba

    this.bindRenderTarget(this.rootRenderTarget)

    // now lets fill up the textures with empty ones!
    var emptyGLTexture = new GLCore.GLTexture.fromData(gl, null, 1, 1)

    var tempObj = {
      _glTextures: {}
    }

    tempObj._glTextures[this.CONTEXT_UID] = {}

    for (var i = 0; i < maxTextures; i++) {
      var empty = new BaseTexture()

      empty._glTextures[this.CONTEXT_UID] = emptyGLTexture

      this.boundTextures[i] = tempObj
      this.emptyTextures[i] = empty
      this.bindTexture(null, i)
    }

    this.emit('context', gl)

    // setup the width/height properties and gl viewport
    this.resize(this.screen.width, this.screen.height)
  }

  /**
   * Renders the object to its webGL view
   *
   * @param {PIXI.DisplayObject} displayObject - the object to be rendered
   * @param {PIXI.RenderTexture} renderTexture - The render texture to render to.
   * @param {boolean} [clear] - Should the canvas be cleared before the new render
   * @param {PIXI.Transform} [transform] - A transform to apply to the render texture before rendering.
   * @param {boolean} [skipUpdateTransform] - Should we skip the update transform pass?
   */
  WebGLRenderer.prototype.render = function render(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
    // can be handy to know!
    this.renderingToScreen = !renderTexture

    this.emit('prerender')

    // no point rendering if our context has been blown up!
    if (!this.gl || this.gl.isContextLost()) {
      return
    }

    this._nextTextureLocation = 0

    if (!renderTexture) {
      this._lastObjectRendered = displayObject
    }

    if (!skipUpdateTransform) {
      // update the scene graph
      var cacheParent = displayObject.parent

      displayObject.parent = this._tempDisplayObjectParent
      displayObject.updateTransform()
      displayObject.parent = cacheParent
      // displayObject.hitArea = //TODO add a temp hit area
    }

    this.bindRenderTexture(renderTexture, transform)

    this.currentRenderer.start()

    if (clear !== undefined ? clear : this.clearBeforeRender) {
      this._activeRenderTarget.clear()
    }

    displayObject.renderWebGL(this)

    // apply transform..
    this.currentRenderer.flush()

    // this.setObjectRenderer(this.emptyRenderer)

    this.textureGC.update()

    this.emit('postrender')
  }

  /**
   * Changes the current renderer to the one given in parameter
   *
   * @param {PIXI.ObjectRenderer} objectRenderer - The object renderer to use.
   */
  WebGLRenderer.prototype.setObjectRenderer = function setObjectRenderer(objectRenderer) {
    if (this.currentRenderer === objectRenderer) {
      return
    }

    this.currentRenderer.stop()
    this.currentRenderer = objectRenderer
    this.currentRenderer.start()
  }

  /**
   * This should be called if you wish to do some custom rendering
   * It will basically render anything that may be batched up such as sprites
   *
   */
  WebGLRenderer.prototype.flush = function flush() {
    this.setObjectRenderer(this.emptyRenderer)
  }

  /**
   * Resizes the webGL view to the specified width and height.
   *
   * @param {number} screenWidth - the new width of the screen
   * @param {number} screenHeight - the new height of the screen
   */
  WebGLRenderer.prototype.resize = function resize(screenWidth, screenHeight) {
    //  if(width * this.resolution === this.width && height * this.resolution === this.height)return

    SystemRenderer.prototype.resize.call(this, screenWidth, screenHeight)

    this.rootRenderTarget.resize(screenWidth, screenHeight)

    if (this._activeRenderTarget === this.rootRenderTarget) {
      this.rootRenderTarget.activate()

      if (this._activeShader) {
        this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(true)
      }
    }
  }

  /**
   * Resizes the webGL view to the specified width and height.
   *
   * @param {number} blendMode - the desired blend mode
   */
  WebGLRenderer.prototype.setBlendMode = function setBlendMode(blendMode) {
    this.state.setBlendMode(blendMode)
  }

  /**
   * Erases the active render target and fills the drawing area with a colour
   *
   * @param {number} [clearColor] - The colour
   */
  WebGLRenderer.prototype.clear = function clear(clearColor) {
    this._activeRenderTarget.clear(clearColor)
  }

  /**
   * Sets the transform of the active render target to the given matrix
   *
   * @param {PIXI.Matrix} matrix - The transformation matrix
   */
  WebGLRenderer.prototype.setTransform = function setTransform(matrix) {
    this._activeRenderTarget.transform = matrix
  }

  /**
   * Erases the render texture and fills the drawing area with a colour
   *
   * @param {PIXI.RenderTexture} renderTexture - The render texture to clear
   * @param {number} [clearColor] - The colour
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.clearRenderTexture = function clearRenderTexture(renderTexture, clearColor) {
    var baseTexture = renderTexture.baseTexture
    var renderTarget = baseTexture._glRenderTargets[this.CONTEXT_UID]

    if (renderTarget) {
      renderTarget.clear(clearColor)
    }

    return this
  }

  /**
   * Binds a render texture for rendering
   *
   * @param {PIXI.RenderTexture} renderTexture - The render texture to render
   * @param {PIXI.Transform} transform - The transform to be applied to the render texture
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.bindRenderTexture = function bindRenderTexture(renderTexture, transform) {
    var renderTarget = void 0

    if (renderTexture) {
      var baseTexture = renderTexture.baseTexture

      if (!baseTexture._glRenderTargets[this.CONTEXT_UID]) {
        // bind the current texture
        this.textureManager.updateTexture(baseTexture, 0)
      }

      this.unbindTexture(baseTexture)

      renderTarget = baseTexture._glRenderTargets[this.CONTEXT_UID]
      renderTarget.setFrame(renderTexture.frame)
    } else {
      renderTarget = this.rootRenderTarget
    }

    renderTarget.transform = transform
    this.bindRenderTarget(renderTarget)

    return this
  }

  /**
   * Changes the current render target to the one given in parameter
   *
   * @param {PIXI.RenderTarget} renderTarget - the new render target
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.bindRenderTarget = function bindRenderTarget(renderTarget) {
    if (renderTarget !== this._activeRenderTarget) {
      this._activeRenderTarget = renderTarget
      renderTarget.activate()

      if (this._activeShader) {
        this._activeShader.uniforms.projectionMatrix = renderTarget.projectionMatrix.toArray(true)
      }

      this.stencilManager.setMaskStack(renderTarget.stencilMaskStack)
    }

    return this
  }

  /**
   * Changes the current shader to the one given in parameter
   *
   * @param {PIXI.Shader} shader - the new shader
   * @param {boolean} [autoProject=true] - Whether automatically set the projection matrix
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.bindShader = function bindShader(shader, autoProject) {
    // TODO cache
    if (this._activeShader !== shader) {
      this._activeShader = shader
      shader.bind()

      // `autoProject` normally would be a default parameter set to true
      // but because of how Babel transpiles default parameters
      // it hinders the performance of this method.
      if (autoProject !== false) {
        // automatically set the projection matrix
        shader.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(true)
      }
    }

    return this
  }

  /**
   * Binds the texture. This will return the location of the bound texture.
   * It may not be the same as the one you pass in. This is due to optimisation that prevents
   * needless binding of textures. For example if the texture is already bound it will return the
   * current location of the texture instead of the one provided. To bypass this use force location
   *
   * @param {PIXI.Texture} texture - the new texture
   * @param {number} location - the suggested texture location
   * @param {boolean} forceLocation - force the location
   * @return {number} bound texture location
   */
  WebGLRenderer.prototype.bindTexture = function bindTexture(texture, location, forceLocation) {
    texture = texture || this.emptyTextures[location]
    texture = texture.baseTexture || texture
    texture.touched = this.textureGC.count

    if (!forceLocation) {
      // TODO - maybe look into adding boundIds.. save us the loop?
      for (var i = 0; i < this.boundTextures.length; i++) {
        if (this.boundTextures[i] === texture) {
          return i
        }
      }

      if (location === undefined) {
        this._nextTextureLocation++
        this._nextTextureLocation %= this.boundTextures.length
        location = this.boundTextures.length - this._nextTextureLocation - 1
      }
    } else {
      location = location || 0
    }

    var gl = this.gl
    var glTexture = texture._glTextures[this.CONTEXT_UID]

    if (!glTexture) {
      // this will also bind the texture..
      this.textureManager.updateTexture(texture, location)
    } else {
      // bind the current texture
      this.boundTextures[location] = texture
      gl.activeTexture(gl.TEXTURE0 + location)
      gl.bindTexture(gl.TEXTURE_2D, glTexture.texture)
    }

    return location
  }

  /**
   * unbinds the texture ...
   *
   * @param {PIXI.Texture} texture - the texture to unbind
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.unbindTexture = function unbindTexture(texture) {
    var gl = this.gl

    texture = texture.baseTexture || texture

    for (var i = 0; i < this.boundTextures.length; i++) {
      if (this.boundTextures[i] === texture) {
        this.boundTextures[i] = this.emptyTextures[i]

        gl.activeTexture(gl.TEXTURE0 + i)
        gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[i]._glTextures[this.CONTEXT_UID].texture)
      }
    }

    return this
  }

  /**
   * Creates a new VAO from this renderer's context and state.
   *
   * @return {VertexArrayObject} The new VAO.
   */
  WebGLRenderer.prototype.createVao = function createVao() {
    return new GLCore.VertexArrayObject(this.gl, this.state.attribState)
  }

  /**
   * Changes the current Vao to the one given in parameter
   *
   * @param {PIXI.VertexArrayObject} vao - the new Vao
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.bindVao = function bindVao(vao) {
    if (this._activeVao === vao) {
      return this
    }

    if (vao) {
      vao.bind()
    } else if (this._activeVao) {
      // TODO this should always be true i think?
      this._activeVao.unbind()
    }

    this._activeVao = vao

    return this
  }

  /**
   * Resets the WebGL state so you can render things however you fancy!
   *
   * @return {PIXI.WebGLRenderer} Returns itself.
   */
  WebGLRenderer.prototype.reset = function reset() {
    this.setObjectRenderer(this.emptyRenderer)

    this.bindVao(null)
    this._activeShader = null
    this._activeRenderTarget = this.rootRenderTarget

    for (var i = 0; i < this.boundTextures.length; i++) {
      this.boundTextures[i] = this.emptyTextures[i]
    }

    // bind the main frame buffer (the screen)
    this.rootRenderTarget.activate()

    this.state.resetToDefault()

    return this
  }

  /**
   * Handles a lost webgl context
   *
   * @private
   * @param {WebGLContextEvent} event - The context lost event.
   */
  WebGLRenderer.prototype.handleContextLost = function handleContextLost(event) {
    event.preventDefault()
  }

  /**
   * Handles a restored webgl context
   *
   * @private
   */
  WebGLRenderer.prototype.handleContextRestored = function handleContextRestored() {
    this.textureManager.removeAll()
    this.filterManager.destroy(true)
    this._initContext()
  }

  /**
   * Removes everything from the renderer (event listeners, spritebatch, etc...)
   *
   * @param {boolean} [removeView=false] - Removes the Canvas element from the DOM.
   *  See: https://github.com/pixijs/pixi.js/issues/2233
   */
  WebGLRenderer.prototype.destroy = function destroy(removeView) {
    this.destroyPlugins()

    // remove listeners
    this.view.removeEventListener('webglcontextlost', this.handleContextLost)
    this.view.removeEventListener('webglcontextrestored', this.handleContextRestored)

    this.textureManager.destroy()

    // call base destroy
    SystemRenderer.prototype.destroy.call(this, removeView)

    this.uid = 0

    // destroy the managers
    this.maskManager.destroy()
    this.stencilManager.destroy()
    this.filterManager.destroy()

    this.maskManager = null
    this.filterManager = null
    this.textureManager = null
    this.currentRenderer = null

    this.handleContextLost = null
    this.handleContextRestored = null

    this._contextOptions = null
    this.gl.useProgram(null)

    if (this.gl.getExtension('WEBGL_lose_context')) {
      this.gl.getExtension('WEBGL_lose_context').loseContext()
    }

    this.gl = null

    // this = null
  }

  /**
   * Collection of installed plugins. These are included by default in PIXI, but can be excluded
   * by creating a custom build. Consult the README for more information about creating custom
   * builds and excluding plugins.
   * @name PIXI.WebGLRenderer#plugins
   * @type {object}
   * @readonly
   * @property {PIXI.accessibility.AccessibilityManager} accessibility Support tabbing interactive elements.
   * @property {PIXI.extract.WebGLExtract} extract Extract image data from renderer.
   * @property {PIXI.interaction.InteractionManager} interaction Handles mouse, touch and pointer events.
   * @property {PIXI.prepare.WebGLPrepare} prepare Pre-render display objects.
   */
  /**
   * Adds a plugin to the renderer.
   *
   * @method PIXI.WebGLRenderer#registerPlugin
   * @param {string} pluginName - The name of the plugin.
   * @param {Function} ctor - The constructor function or class for the plugin.
   */
  utils.pluginTarget.mixin(WebGLRenderer)

  return WebGLRenderer
}(SystemRenderer)

export {
  Matrix,
  GroupD8,
  RoundedRectangle,
  Rectangle,
  Polygon,
  Ellipse,
  Circle,
  extractAttributes,
  extractUniforms,
  path,
  GLShader,
  GLFrameBuffer,
  VertexArrayObject,
  GLCore,
  shader,
  Resource,
  Loader,
  enhanceLoader,
  blobMiddlewareFactory,
  queryString,
  url,
  mapPremultipliedBlendModes,
  maxRecommendedTextures,
  settings,
  utils,
  math,
  Bounds,
  TransformBase,
  TransformStatic,
  Transform,
  DisplayObject,
  Container,
  Shader,
  determineCrossOrigin,
  Ticker,
  ticker,
  BaseTexture,
  VideoBaseTexture,
  TextureUvs,
  TextureMatrix,
  Texture,
  Spritesheet,
  BaseRenderTexture,
  RenderTexture,
  TextStyle,
  Sprite,
  generateMultiTextureShader,
  Text,
  CanvasTinter,
  ObjectRenderer,
  ParticleBuffer,
  RenderTarget,
  Quad,
  checkMaxIfStatmentsInShader,
  StencilManager,
  extractUniformsFromSrc,
  Filter,
  filterTransforms,
  SpriteMaskFilter,
  FilterManager,
  MaskManager,
  mapWebGLBlendModesToPixi,
  WebGLState,
  mapWebGLDrawModesToPixi,
  ParticleShader,
  SystemRenderer,
  CanvasMaskManager,
  CanvasRenderTarget,
  mapCanvasBlendModesToPixi,
  CanvasRenderer,
  TextureGarbageCollector,
  TextureManager,
  WebGLRenderer
}
