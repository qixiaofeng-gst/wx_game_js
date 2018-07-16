import { custom_require } from './utils'

const {
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
} = require('./pixi-independents')

const {
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
} = require('./pixi-simples')

const modules_desc = {
  1: [function ($require, container, exports) {
    export_to_(bit_twiddle, exports)
  }, {}],
  2: [function ($require, container, exports) {
    container.exports = earcut
    container.exports.default = earcut
  }, {}],
  3: [function ($require, container, exports) {
    container.exports = EventEmitter
  }, {}],
  4: [function ($require, container, exports) {
    container.exports = IsMobile
  }, {}],
  5: [function ($require, container, exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports['default'] = MiniSignal
    container.exports = exports['default']
  }, {}],
  6: [function ($require, container, exports) {
    container.exports = assign
  }, {}],
  7: [function ($require, container, exports) {
    container.exports = parseURI
  }, {}],
  8: [function ($require, container, exports) {
    export_to_(path, exports)
  }, {
    "_process": 26
  }],
  9: [function ($require, container, exports) {
    container.exports = GLBuffer
  }, {}],
  10: [function ($require, container, exports) {
    container.exports = GLFrameBuffer
  }, {
    "./GLTexture": 12
  }],
  11: [function ($require, container, exports) {
    container.exports = GLShader
  }, {
    "./shader/compileProgram": 17,
    "./shader/extractAttributes": 19,
    "./shader/extractUniforms": 20,
    "./shader/generateUniformAccessObject": 21,
    "./shader/setPrecision": 25
  }],
  12: [function ($require, container, exports) {
    container.exports = GLTexture
  }, {}],
  13: [function ($require, container, exports) {
    container.exports = VertexArrayObject
  }, {
    "./setVertexAttribArrays": 16
  }],
  14: [function ($require, container, exports) {
    container.exports = createContext
  }, {}],
  15: [function ($require, container, exports) {
    container.exports = GLCore
  }, {
    "./GLBuffer": 9,
    "./GLFramebuffer": 10,
    "./GLShader": 11,
    "./GLTexture": 12,
    "./VertexArrayObject": 13,
    "./createContext": 14,
    "./setVertexAttribArrays": 16,
    "./shader": 22
  }],
  16: [function ($require, container, exports) {
    container.exports = setVertexAttribArrays
  }, {}],
  17: [function ($require, container, exports) {
    container.exports = compileProgram
  }, {}],
  18: [function ($require, container, exports) {
    container.exports = defaultValue
  }, {}],
  19: [function ($require, container, exports) {
    container.exports = extractAttributes
  }, {
    "./mapSize": 23,
    "./mapType": 24
  }],
  20: [function ($require, container, exports) {
    container.exports = extractUniforms
  }, {
    "./defaultValue": 18,
    "./mapType": 24
  }],
  21: [function ($require, container, exports) {
    container.exports = generateUniformAccessObject
  }, {}],
  22: [function ($require, container, exports) {
    container.exports = shader
  }, {
    "./compileProgram": 17,
    "./defaultValue": 18,
    "./extractAttributes": 19,
    "./extractUniforms": 20,
    "./generateUniformAccessObject": 21,
    "./mapSize": 23,
    "./mapType": 24,
    "./setPrecision": 25
  }],
  23: [function ($require, container, exports) {
    container.exports = mapSize
  }, {}],
  24: [function ($require, container, exports) {
    container.exports = mapType
  }, {}],
  25: [function ($require, container, exports) {
    container.exports = setPrecision
  }, {}],
  26: [function ($require, container, exports) {
    container.exports = process
  }, {}],
  27: [function ($require, container, exports) {
    container.exports = punycode
  }, {}],
  28: [function ($require, container, exports) {
    container.exports = decode
  }, {}],
  29: [function ($require, container, exports) {
    container.exports = encode
  }, {}],
  30: [function ($require, container, exports) {
    export_to_(queryString, exports)
  }, {
    "./decode": 28,
    "./encode": 29
  }],
  31: [function ($require, container, exports) {
    container.exports = removeItems
  }, {}],
  32: [function ($require, container, exports) {
    container.exports = Loader
  }, {
    "./Resource": 33,
    "./async": 34,
    "mini-signals": 5,
    "parse-uri": 7
  }],
  33: [function ($require, container, exports) {
    container.exports = Resource
  }, {
    "mini-signals": 5,
    "parse-uri": 7
  }],
  34: [function ($require, container, exports) {
    export_to_(async_lib, exports)
  }, {}],
  35: [function ($require, container, exports) {
    container.exports = b64
  }, {}],
  36: [function ($require, container, exports) {
    enhanceLoader()
    container.exports = Loader
    container.exports.default = Loader
  }, {
    "./Loader": 32,
    "./Resource": 33,
    "./async": 34,
    "./b64": 35
  }],
  37: [function ($require, container, exports) {
    exports.blobMiddlewareFactory = blobMiddlewareFactory
  }, {
    "../../Resource": 33,
    "../../b64": 35
  }],
  38: [function ($require, container, exports) {
    export_to_(url, exports)
  }, {
    "./util": 39,
    "punycode": 27,
    "querystring": 30
  }],
  39: [function ($require, container, exports) {
    container.exports = util
  }, {}],
  40: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _ismobilejs = $require('ismobilejs')

    var _ismobilejs2 = interop_require_default_(_ismobilejs)

    var _accessibleTarget = $require('./accessibleTarget')

    var _accessibleTarget2 = interop_require_default_(_accessibleTarget)

    // add some extra variables to the container..
    core.utils.mixins.delayMixin(core.DisplayObject.prototype, _accessibleTarget2.default)

    var KEY_CODE_TAB = 9

    var DIV_TOUCH_SIZE = 100
    var DIV_TOUCH_POS_X = 0
    var DIV_TOUCH_POS_Y = 0
    var DIV_TOUCH_ZINDEX = 2

    var DIV_HOOK_SIZE = 1
    var DIV_HOOK_POS_X = -1000
    var DIV_HOOK_POS_Y = -1000
    var DIV_HOOK_ZINDEX = 2

    /**
     * The Accessibility manager recreates the ability to tab and have content read by screen
     * readers. This is very important as it can possibly help people with disabilities access pixi
     * content.
     *
     * Much like interaction any DisplayObject can be made accessible. This manager will map the
     * events as if the mouse was being used, minimizing the effort required to implement.
     *
     * An instance of this class is automatically created by default, and can be found at renderer.plugins.accessibility
     *
     * @class
     * @memberof PIXI.accessibility
     */
    var AccessibilityManager = function () {
      /**
       * @param {PIXI.CanvasRenderer|PIXI.WebGLRenderer} renderer - A reference to the current renderer
       */
      function AccessibilityManager(renderer) {
        class_call_check_(this, AccessibilityManager)

        if ((_ismobilejs2.default.tablet || _ismobilejs2.default.phone) && !navigator.isCocoonJS) {
          this.createTouchHook()
        }

        // first we create a div that will sit over the PixiJS element. This is where the div overlays will go.
        var div = document.createElement('div')

        div.style.width = DIV_TOUCH_SIZE + 'px'
        div.style.height = DIV_TOUCH_SIZE + 'px'
        div.style.position = 'absolute'
        div.style.top = DIV_TOUCH_POS_X + 'px'
        div.style.left = DIV_TOUCH_POS_Y + 'px'
        div.style.zIndex = DIV_TOUCH_ZINDEX

        /**
         * This is the dom element that will sit over the PixiJS element. This is where the div overlays will go.
         *
         * @type {HTMLElement}
         * @private
         */
        this.div = div

        /**
         * A simple pool for storing divs.
         *
         * @type {*}
         * @private
         */
        this.pool = []

        /**
         * This is a tick used to check if an object is no longer being rendered.
         *
         * @type {Number}
         * @private
         */
        this.renderId = 0

        /**
         * Setting this to true will visually show the divs.
         *
         * @type {boolean}
         */
        this.debug = false

        /**
         * The renderer this accessibility manager works for.
         *
         * @member {PIXI.SystemRenderer}
         */
        this.renderer = renderer

        /**
         * The array of currently active accessible items.
         *
         * @member {Array<*>}
         * @private
         */
        this.children = []

        /**
         * pre-bind the functions
         *
         * @private
         */
        this._onKeyDown = this._onKeyDown.bind(this)
        this._onMouseMove = this._onMouseMove.bind(this)

        /**
         * stores the state of the manager. If there are no accessible objects or the mouse is moving, this will be false.
         *
         * @member {Array<*>}
         * @private
         */
        this.isActive = false
        this.isMobileAccessabillity = false

        // let listen for tab.. once pressed we can fire up and show the accessibility layer
        window.addEventListener('keydown', this._onKeyDown, false)
      }

      /**
       * Creates the touch hooks.
       *
       */
      AccessibilityManager.prototype.createTouchHook = function createTouchHook() {
        var _this = this

        var hookDiv = document.createElement('button')

        hookDiv.style.width = DIV_HOOK_SIZE + 'px'
        hookDiv.style.height = DIV_HOOK_SIZE + 'px'
        hookDiv.style.position = 'absolute'
        hookDiv.style.top = DIV_HOOK_POS_X + 'px'
        hookDiv.style.left = DIV_HOOK_POS_Y + 'px'
        hookDiv.style.zIndex = DIV_HOOK_ZINDEX
        hookDiv.style.backgroundColor = '#FF0000'
        hookDiv.title = 'HOOK DIV'

        hookDiv.addEventListener('focus', function () {
          _this.isMobileAccessabillity = true
          _this.activate()
          document.body.removeChild(hookDiv)
        })

        document.body.appendChild(hookDiv)
      }

      /**
       * Activating will cause the Accessibility layer to be shown. This is called when a user
       * preses the tab key.
       *
       * @private
       */
      AccessibilityManager.prototype.activate = function activate() {
        if (this.isActive) {
          return
        }

        this.isActive = true

        window.document.addEventListener('mousemove', this._onMouseMove, true)
        window.removeEventListener('keydown', this._onKeyDown, false)

        this.renderer.on('postrender', this.update, this)

        if (this.renderer.view.parentNode) {
          this.renderer.view.parentNode.appendChild(this.div)
        }
      }

      /**
       * Deactivating will cause the Accessibility layer to be hidden. This is called when a user moves
       * the mouse.
       *
       * @private
       */
      AccessibilityManager.prototype.deactivate = function deactivate() {
        if (!this.isActive || this.isMobileAccessabillity) {
          return
        }

        this.isActive = false

        window.document.removeEventListener('mousemove', this._onMouseMove)
        window.addEventListener('keydown', this._onKeyDown, false)

        this.renderer.off('postrender', this.update)

        if (this.div.parentNode) {
          this.div.parentNode.removeChild(this.div)
        }
      }

      /**
       * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
       *
       * @private
       * @param {PIXI.Container} displayObject - The DisplayObject to check.
       */
      AccessibilityManager.prototype.updateAccessibleObjects = function updateAccessibleObjects(displayObject) {
        if (!displayObject.visible) {
          return
        }

        if (displayObject.accessible && displayObject.interactive) {
          if (!displayObject._accessibleActive) {
            this.addChild(displayObject)
          }

          displayObject.renderId = this.renderId
        }

        var children = displayObject.children

        for (var i = 0; i < children.length; i++) {
          this.updateAccessibleObjects(children[i])
        }
      }

      /**
       * Before each render this function will ensure that all divs are mapped correctly to their DisplayObjects.
       *
       * @private
       */
      AccessibilityManager.prototype.update = function update() {
        if (!this.renderer.renderingToScreen) {
          return
        }

        // update children...
        this.updateAccessibleObjects(this.renderer._lastObjectRendered)

        var rect = this.renderer.view.getBoundingClientRect()
        var sx = rect.width / this.renderer.width
        var sy = rect.height / this.renderer.height

        var div = this.div

        div.style.left = rect.left + 'px'
        div.style.top = rect.top + 'px'
        div.style.width = this.renderer.width + 'px'
        div.style.height = this.renderer.height + 'px'

        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i]

          if (child.renderId !== this.renderId) {
            child._accessibleActive = false

            core.utils.removeItems(this.children, i, 1)
            this.div.removeChild(child._accessibleDiv)
            this.pool.push(child._accessibleDiv)
            child._accessibleDiv = null

            i--

            if (this.children.length === 0) {
              this.deactivate()
            }
          } else {
            // map div to display..
            div = child._accessibleDiv
            var hitArea = child.hitArea
            var wt = child.worldTransform

            if (child.hitArea) {
              div.style.left = (wt.tx + hitArea.x * wt.a) * sx + 'px'
              div.style.top = (wt.ty + hitArea.y * wt.d) * sy + 'px'

              div.style.width = hitArea.width * wt.a * sx + 'px'
              div.style.height = hitArea.height * wt.d * sy + 'px'
            } else {
              hitArea = child.getBounds()

              this.capHitArea(hitArea)

              div.style.left = hitArea.x * sx + 'px'
              div.style.top = hitArea.y * sy + 'px'

              div.style.width = hitArea.width * sx + 'px'
              div.style.height = hitArea.height * sy + 'px'

              // update button titles and hints if they exist and they've changed
              if (div.title !== child.accessibleTitle && child.accessibleTitle !== null) {
                div.title = child.accessibleTitle
              }
              if (div.getAttribute('aria-label') !== child.accessibleHint && child.accessibleHint !== null) {
                div.setAttribute('aria-label', child.accessibleHint)
              }
            }
          }
        }

        // increment the render id..
        this.renderId++
      }

      /**
       * TODO: docs.
       *
       * @param {Rectangle} hitArea - TODO docs
       */
      AccessibilityManager.prototype.capHitArea = function capHitArea(hitArea) {
        if (hitArea.x < 0) {
          hitArea.width += hitArea.x
          hitArea.x = 0
        }

        if (hitArea.y < 0) {
          hitArea.height += hitArea.y
          hitArea.y = 0
        }

        if (hitArea.x + hitArea.width > this.renderer.width) {
          hitArea.width = this.renderer.width - hitArea.x
        }

        if (hitArea.y + hitArea.height > this.renderer.height) {
          hitArea.height = this.renderer.height - hitArea.y
        }
      }

      /**
       * Adds a DisplayObject to the accessibility manager
       *
       * @private
       * @param {DisplayObject} displayObject - The child to make accessible.
       */
      AccessibilityManager.prototype.addChild = function addChild(displayObject) {
        //    this.activate()

        var div = this.pool.pop()

        if (!div) {
          div = document.createElement('button')

          div.style.width = DIV_TOUCH_SIZE + 'px'
          div.style.height = DIV_TOUCH_SIZE + 'px'
          div.style.backgroundColor = this.debug ? 'rgba(255,0,0,0.5)' : 'transparent'
          div.style.position = 'absolute'
          div.style.zIndex = DIV_TOUCH_ZINDEX
          div.style.borderStyle = 'none'

          // ARIA attributes ensure that button title and hint updates are announced properly
          if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            // Chrome doesn't need aria-live to work as intended; in fact it just gets more confused.
            div.setAttribute('aria-live', 'off')
          } else {
            div.setAttribute('aria-live', 'polite')
          }

          if (navigator.userAgent.match(/rv:.*Gecko\//)) {
            // FireFox needs this to announce only the new button name
            div.setAttribute('aria-relevant', 'additions')
          } else {
            // required by IE, other browsers don't much care
            div.setAttribute('aria-relevant', 'text')
          }

          div.addEventListener('click', this._onClick.bind(this))
          div.addEventListener('focus', this._onFocus.bind(this))
          div.addEventListener('focusout', this._onFocusOut.bind(this))
        }

        if (displayObject.accessibleTitle && displayObject.accessibleTitle !== null) {
          div.title = displayObject.accessibleTitle
        } else if (!displayObject.accessibleHint || displayObject.accessibleHint === null) {
          div.title = 'displayObject ' + displayObject.tabIndex
        }

        if (displayObject.accessibleHint && displayObject.accessibleHint !== null) {
          div.setAttribute('aria-label', displayObject.accessibleHint)
        }

        //

        displayObject._accessibleActive = true
        displayObject._accessibleDiv = div
        div.displayObject = displayObject

        this.children.push(displayObject)
        this.div.appendChild(displayObject._accessibleDiv)
        displayObject._accessibleDiv.tabIndex = displayObject.tabIndex
      }

      /**
       * Maps the div button press to pixi's InteractionManager (click)
       *
       * @private
       * @param {MouseEvent} e - The click event.
       */
      AccessibilityManager.prototype._onClick = function _onClick(e) {
        var interactionManager = this.renderer.plugins.interaction

        interactionManager.dispatchEvent(e.target.displayObject, 'click', interactionManager.eventData)
      }

      /**
       * Maps the div focus events to pixi's InteractionManager (mouseover)
       *
       * @private
       * @param {FocusEvent} e - The focus event.
       */
      AccessibilityManager.prototype._onFocus = function _onFocus(e) {
        if (!e.target.getAttribute('aria-live', 'off')) {
          e.target.setAttribute('aria-live', 'assertive')
        }
        var interactionManager = this.renderer.plugins.interaction

        interactionManager.dispatchEvent(e.target.displayObject, 'mouseover', interactionManager.eventData)
      }

      /**
       * Maps the div focus events to pixi's InteractionManager (mouseout)
       *
       * @private
       * @param {FocusEvent} e - The focusout event.
       */
      AccessibilityManager.prototype._onFocusOut = function _onFocusOut(e) {
        if (!e.target.getAttribute('aria-live', 'off')) {
          e.target.setAttribute('aria-live', 'polite')
        }
        var interactionManager = this.renderer.plugins.interaction

        interactionManager.dispatchEvent(e.target.displayObject, 'mouseout', interactionManager.eventData)
      }

      /**
       * Is called when a key is pressed
       *
       * @private
       * @param {KeyboardEvent} e - The keydown event.
       */
      AccessibilityManager.prototype._onKeyDown = function _onKeyDown(e) {
        if (e.keyCode !== KEY_CODE_TAB) {
          return
        }

        this.activate()
      }

      /**
       * Is called when the mouse moves across the renderer element
       *
       * @private
       * @param {MouseEvent} e - The mouse event.
       */
      AccessibilityManager.prototype._onMouseMove = function _onMouseMove(e) {
        if (e.movementX === 0 && e.movementY === 0) {
          return
        }

        this.deactivate()
      }

      /**
       * Destroys the accessibility manager
       *
       */
      AccessibilityManager.prototype.destroy = function destroy() {
        this.div = null

        for (var i = 0; i < this.children.length; i++) {
          this.children[i].div = null
        }

        window.document.removeEventListener('mousemove', this._onMouseMove)
        window.removeEventListener('keydown', this._onKeyDown)

        this.pool = null
        this.children = null
        this.renderer = null
      }

      return AccessibilityManager
    }()

    core.WebGLRenderer.registerPlugin('accessibility', AccessibilityManager)
    core.CanvasRenderer.registerPlugin('accessibility', AccessibilityManager)

    exports.default = AccessibilityManager
  }, {
    "../core": 65,
    "./accessibleTarget": 41,
    "ismobilejs": 4
  }],
  41: [function ($require, container, exports) {
    container.exports = accessibleTarget
  }, {}],
  42: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _accessibleTarget = $require('./accessibleTarget')

    Object.defineProperty(exports, 'accessibleTarget', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_accessibleTarget).default
      }
    })

    var _AccessibilityManager = $require('./AccessibilityManager')

    Object.defineProperty(exports, 'AccessibilityManager', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_AccessibilityManager).default
      }
    })

    
  }, {
    "./AccessibilityManager": 40,
    "./accessibleTarget": 41
  }],
  43: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _autoDetectRenderer = $require('./autoDetectRenderer')

    var _Container = $require('./display/Container')

    var _Container2 = interop_require_default_(_Container)

    var _ticker = $require('./ticker')

    var _settings = $require('./settings')

    var _settings2 = interop_require_default_(_settings)

    var _const = $require('./const')

    
    
    /**
     * Convenience class to create a new PIXI application.
     * This class automatically creates the renderer, ticker
     * and root container.
     *
     * @example
     * // Create the application
     * const app = new PIXI.Application()
     *
     * // Add the view to the DOM
     * document.body.appendChild(app.view)
     *
     * // ex, add display objects
     * app.stage.addChild(PIXI.Sprite.fromImage('something.png'))
     *
     * @class
     * @memberof PIXI
     */
    var Application = function () {
      // eslint-disable-next-line valid-jsdoc
      /**
       * @param {object} [options] - The optional renderer parameters
       * @param {boolean} [options.autoStart=true] - automatically starts the rendering after the construction.
       *     Note that setting this parameter to false does NOT stop the shared ticker even if you set
       *     options.sharedTicker to true in case that it is already started. Stop it by your own.
       * @param {number} [options.width=800] - the width of the renderers view
       * @param {number} [options.height=600] - the height of the renderers view
       * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
       * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
       * @param {boolean} [options.antialias=false] - sets antialias (only applicable in chrome at the moment)
       * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
       *  need to call toDataUrl on the webgl context
       * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2
       * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present
       * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
       *  (shown if not transparent).
       * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
       *   not before the new render pass.
       * @param {boolean} [options.roundPixels=false] - If true PixiJS will Math.floor() x/y values when rendering,
       *  stopping pixel interpolation.
       * @param {boolean} [options.forceFXAA=false] - forces FXAA antialiasing to be used over native.
       *  FXAA is faster, but may not always look as great **webgl only**
       * @param {boolean} [options.legacy=false] - `true` to ensure compatibility with older / less advanced devices.
       *  If you experience unexplained flickering try setting this to true. **webgl only**
       * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
       *  for devices with dual graphics card **webgl only**
       * @param {boolean} [options.sharedTicker=false] - `true` to use PIXI.ticker.shared, `false` to create new ticker.
       * @param {boolean} [options.sharedLoader=false] - `true` to use PIXI.loaders.shared, `false` to create new Loader.
       */
      function Application(options, arg2, arg3, arg4, arg5) {
        class_call_check_(this, Application)

        // Support for constructor(width, height, options, noWebGL, useSharedTicker)
        if (typeof options === 'number') {
          options = Object.assign({
            width: options,
            height: arg2 || _settings2.default.RENDER_OPTIONS.height,
            forceCanvas: !!arg4,
            sharedTicker: !!arg5
          }, arg3)
        }

        /**
         * The default options, so we mixin functionality later.
         * @member {object}
         * @protected
         */
        this._options = options = Object.assign({
          autoStart: true,
          sharedTicker: false,
          forceCanvas: false,
          sharedLoader: false
        }, options)

        /**
         * WebGL renderer if available, otherwise CanvasRenderer
         * @member {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
         */
        this.renderer = (0, _autoDetectRenderer.autoDetectRenderer)(options)

        /**
         * The root display container that's rendered.
         * @member {PIXI.Container}
         */
        this.stage = new _Container2.default()

        /**
         * Internal reference to the ticker
         * @member {PIXI.ticker.Ticker}
         * @private
         */
        this._ticker = null

        /**
         * Ticker for doing render updates.
         * @member {PIXI.ticker.Ticker}
         * @default PIXI.ticker.shared
         */
        this.ticker = options.sharedTicker ? _ticker.shared : new _ticker.Ticker()

        // Start the rendering
        if (options.autoStart) {
          this.start()
        }
      }

      /**
       * Render the current stage.
       */
      Application.prototype.render = function render() {
        this.renderer.render(this.stage)
      }

      /**
       * Convenience method for stopping the render.
       */


      Application.prototype.stop = function stop() {
        this._ticker.stop()
      }

      /**
       * Convenience method for starting the render.
       */


      Application.prototype.start = function start() {
        this._ticker.start()
      }

      /**
       * Reference to the renderer's canvas element.
       * @member {HTMLCanvasElement}
       * @readonly
       */


      /**
       * Destroy and don't use after this.
       * @param {Boolean} [removeView=false] Automatically remove canvas from DOM.
       * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
       *  have been set to that value
       * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
       *  method called as well. 'stageOptions' will be passed on to those calls.
       * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
       *  to true. Should it destroy the texture of the child sprite
       * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
       *  to true. Should it destroy the base texture of the child sprite
       */
      Application.prototype.destroy = function destroy(removeView, stageOptions) {
        if (this._ticker) {
          var oldTicker = this._ticker

          this.ticker = null
          oldTicker.destroy()
        }

        this.stage.destroy(stageOptions)
        this.stage = null

        this.renderer.destroy(removeView)
        this.renderer = null

        this._options = null
      }

      create_class_(Application, [{
        key: 'ticker',
        set: function set(ticker) // eslint-disable-line require-jsdoc
        {
          if (this._ticker) {
            this._ticker.remove(this.render, this)
          }
          this._ticker = ticker
          if (ticker) {
            ticker.add(this.render, this, _const.UPDATE_PRIORITY.LOW)
          }
        },
        get: function get() // eslint-disable-line require-jsdoc
        {
          return this._ticker
        }
      }, {
        key: 'view',
        get: function get() {
          return this.renderer.view
        }

        /**
         * Reference to the renderer's screen rectangle. Its safe to use as filterArea or hitArea for whole screen
         * @member {PIXI.Rectangle}
         * @readonly
         */

      }, {
        key: 'screen',
        get: function get() {
          return this.renderer.screen
        }
      }])

      return Application
    }()

    exports.default = Application

  }, {
    "./autoDetectRenderer": 45,
    "./const": 46,
    "./display/Container": 48,
    "./settings": 101,
    "./ticker": 121
  }],
  44: [function ($require, container, exports) {
    container.exports = Shader
  }, {
    "./settings": 101,
    "pixi-gl-core": 15
  }],
  45: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.autoDetectRenderer = autoDetectRenderer

    var _utils = $require('./utils')

    var utils = interop_require_wildcard_(_utils)

    var _CanvasRenderer = $require('./renderers/canvas/CanvasRenderer')

    var _CanvasRenderer2 = interop_require_default_(_CanvasRenderer)

    var _WebGLRenderer = $require('./renderers/webgl/WebGLRenderer')

    var _WebGLRenderer2 = interop_require_default_(_WebGLRenderer)

    
        // eslint-disable-next-line valid-jsdoc
    /**
     * This helper function will automatically detect which renderer you should be using.
     * WebGL is the preferred renderer as it is a lot faster. If webGL is not supported by
     * the browser then this function will return a canvas renderer
     *
     * @memberof PIXI
     * @function autoDetectRenderer
     * @param {object} [options] - The optional renderer parameters
     * @param {number} [options.width=800] - the width of the renderers view
     * @param {number} [options.height=600] - the height of the renderers view
     * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
     * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
     * @param {boolean} [options.antialias=false] - sets antialias (only applicable in chrome at the moment)
     * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
     *  need to call toDataUrl on the webgl context
     * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
     *  (shown if not transparent).
     * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
     *   not before the new render pass.
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2
     * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present
     * @param {boolean} [options.roundPixels=false] - If true PixiJS will Math.floor() x/y values when rendering,
     *  stopping pixel interpolation.
     * @param {boolean} [options.forceFXAA=false] - forces FXAA antialiasing to be used over native.
     *  FXAA is faster, but may not always look as great **webgl only**
     * @param {boolean} [options.legacy=false] - `true` to ensure compatibility with older / less advanced devices.
     *  If you experience unexplained flickering try setting this to true. **webgl only**
     * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
     *  for devices with dual graphics card **webgl only**
     * @return {PIXI.WebGLRenderer|PIXI.CanvasRenderer} Returns WebGL renderer if available, otherwise CanvasRenderer
     */
    function autoDetectRenderer(options, arg1, arg2, arg3) {
      // Backward-compatible support for noWebGL option
      var forceCanvas = options && options.forceCanvas

      if (arg3 !== undefined) {
        forceCanvas = arg3
      }

      if (!forceCanvas && utils.isWebGLSupported()) {
        return new _WebGLRenderer2.default(options, arg1, arg2)
      }

      return new _CanvasRenderer2.default(options, arg1, arg2)
    }

  }, {
    "./renderers/canvas/CanvasRenderer": 77,
    "./renderers/webgl/WebGLRenderer": 84,
    "./utils": 125
  }],
  46: [function ($require, container, exports) {
    export_to_(constants, exports)
  }, {}],
  47: [function ($require, container, exports) {
    exports.default = Bounds
  }, {
    "../math": 70
  }],
  48: [function ($require, container, exports) {
    container.exports = Container
  }, {
    "../utils": 125,
    "./DisplayObject": 49
  }],
  49: [function ($require, container, exports) {
    container.exports = DisplayObject
  }, {
    "../const": 46,
    "../math": 70,
    "../settings": 101,
    "./Bounds": 47,
    "./Transform": 50,
    "./TransformStatic": 52,
    "eventemitter3": 3
  }],
  50: [function ($require, container, exports) {
    container.exports = Transform
  }, {
    "../math": 70,
    "./TransformBase": 51
  }],
  51: [function ($require, container, exports) {
    container.exports = TransformBase
  }, {
    "../math": 70
  }],
  52: [function ($require, container, exports) {
    container.exports = TransformStatic
  }, {
    "../math": 70,
    "./TransformBase": 51
  }],
  53: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    
    var _RenderTexture = $require('../textures/RenderTexture')

    var _RenderTexture2 = interop_require_default_(_RenderTexture)

    var _Texture = $require('../textures/Texture')

    var _Texture2 = interop_require_default_(_Texture)

    var _GraphicsData = $require('./GraphicsData')

    var _GraphicsData2 = interop_require_default_(_GraphicsData)

    var _Sprite = $require('../sprites/Sprite')

    var _Sprite2 = interop_require_default_(_Sprite)

    var _math = $require('../math')

    var _utils = $require('../utils')

    var _const = $require('../const')

    var _bezierCurveTo2 = $require('./utils/bezierCurveTo')

    var _bezierCurveTo3 = interop_require_default_(_bezierCurveTo2)

    var _CanvasRenderer = $require('../renderers/canvas/CanvasRenderer')

    var _CanvasRenderer2 = interop_require_default_(_CanvasRenderer)

    var canvasRenderer = void 0
    var tempMatrix = new _math.Matrix()
    var tempPoint = new _math.Point()
    var tempColor1 = new Float32Array(4)
    var tempColor2 = new Float32Array(4)

    /**
     * The Graphics class contains methods used to draw primitive shapes such as lines, circles and
     * rectangles to the display, and to color and fill them.
     *
     * @class
     * @extends PIXI.Container
     * @memberof PIXI
     */

    var Graphics = function (_Container) {
      inherits_(Graphics, _Container)

      /**
       *
       * @param {boolean} [nativeLines=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
       */
      function Graphics() {
        var nativeLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false

        class_call_check_(this, Graphics)

        /**
         * The alpha value used when filling the Graphics object.
         *
         * @member {number}
         * @default 1
         */
        var _this = get_constructor_(this, _Container.call(this))

        _this.fillAlpha = 1

        /**
         * The width (thickness) of any lines drawn.
         *
         * @member {number}
         * @default 0
         */
        _this.lineWidth = 0

        /**
         * If true the lines will be draw using LINES instead of TRIANGLE_STRIP
         *
         * @member {boolean}
         */
        _this.nativeLines = nativeLines

        /**
         * The color of any lines drawn.
         *
         * @member {string}
         * @default 0
         */
        _this.lineColor = 0

        /**
         * The alignment of any lines drawn (0.5 = middle, 1 = outter, 0 = inner).
         *
         * @member {number}
         * @default 0
         */
        _this.lineAlignment = 0.5

        /**
         * Graphics data
         *
         * @member {PIXI.GraphicsData[]}
         * @private
         */
        _this.graphicsData = []

        /**
         * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to
         * reset the tint.
         *
         * @member {number}
         * @default 0xFFFFFF
         */
        _this.tint = 0xFFFFFF

        /**
         * The previous tint applied to the graphic shape. Used to compare to the current tint and
         * check if theres change.
         *
         * @member {number}
         * @private
         * @default 0xFFFFFF
         */
        _this._prevTint = 0xFFFFFF

        /**
         * The blend mode to be applied to the graphic shape. Apply a value of
         * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL
         * @see PIXI.BLEND_MODES
         */
        _this.blendMode = _const.BLEND_MODES.NORMAL

        /**
         * Current path
         *
         * @member {PIXI.GraphicsData}
         * @private
         */
        _this.currentPath = null

        /**
         * Array containing some WebGL-related properties used by the WebGL renderer.
         *
         * @member {object<number, object>}
         * @private
         */
        // TODO - _webgl should use a prototype object, not a random undocumented object...
        _this._webGL = {}

        /**
         * Whether this shape is being used as a mask.
         *
         * @member {boolean}
         */
        _this.isMask = false

        /**
         * The bounds' padding used for bounds calculation.
         *
         * @member {number}
         */
        _this.boundsPadding = 0

        /**
         * A cache of the local bounds to prevent recalculation.
         *
         * @member {PIXI.Rectangle}
         * @private
         */
        _this._localBounds = new Bounds()

        /**
         * Used to detect if the graphics object has changed. If this is set to true then the graphics
         * object will be recalculated.
         *
         * @member {boolean}
         * @private
         */
        _this.dirty = 0

        /**
         * Used to detect if we need to do a fast rect check using the id compare method
         * @type {Number}
         */
        _this.fastRectDirty = -1

        /**
         * Used to detect if we clear the graphics webGL data
         * @type {Number}
         */
        _this.clearDirty = 0

        /**
         * Used to detect if we we need to recalculate local bounds
         * @type {Number}
         */
        _this.boundsDirty = -1

        /**
         * Used to detect if the cached sprite object needs to be updated.
         *
         * @member {boolean}
         * @private
         */
        _this.cachedSpriteDirty = false

        _this._spriteRect = null
        _this._fastRect = false

        /**
         * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
         * This is useful if your graphics element does not change often, as it will speed up the rendering
         * of the object in exchange for taking up texture memory. It is also useful if you need the graphics
         * object to be anti-aliased, because it will be rendered using canvas. This is not recommended if
         * you are constantly redrawing the graphics element.
         *
         * @name cacheAsBitmap
         * @member {boolean}
         * @memberof PIXI.Graphics#
         * @default false
         */
        return _this
      }

      /**
       * Creates a new Graphics object with the same values as this one.
       * Note that the only the properties of the object are cloned, not its transform (position,scale,etc)
       *
       * @return {PIXI.Graphics} A clone of the graphics object
       */


      Graphics.prototype.clone = function clone() {
        var clone = new Graphics()

        clone.renderable = this.renderable
        clone.fillAlpha = this.fillAlpha
        clone.lineWidth = this.lineWidth
        clone.lineColor = this.lineColor
        clone.lineAlignment = this.lineAlignment
        clone.tint = this.tint
        clone.blendMode = this.blendMode
        clone.isMask = this.isMask
        clone.boundsPadding = this.boundsPadding
        clone.dirty = 0
        clone.cachedSpriteDirty = this.cachedSpriteDirty

        // copy graphics data
        for (var i = 0; i < this.graphicsData.length; ++i) {
          clone.graphicsData.push(this.graphicsData[i].clone())
        }

        clone.currentPath = clone.graphicsData[clone.graphicsData.length - 1]

        clone.updateLocalBounds()

        return clone
      }

      /**
       * Calculate length of quadratic curve
       * @see {@link http://www.malczak.linuxpl.com/blog/quadratic-bezier-curve-length/}
       * for the detailed explanation of math behind this.
       *
       * @private
       * @param {number} fromX - x-coordinate of curve start point
       * @param {number} fromY - y-coordinate of curve start point
       * @param {number} cpX - x-coordinate of curve control point
       * @param {number} cpY - y-coordinate of curve control point
       * @param {number} toX - x-coordinate of curve end point
       * @param {number} toY - y-coordinate of curve end point
       * @return {number} Length of quadratic curve
       */


      Graphics.prototype._quadraticCurveLength = function _quadraticCurveLength(fromX, fromY, cpX, cpY, toX, toY) {
        var ax = fromX - (2.0 * cpX + toX)
        var ay = fromY - (2.0 * cpY + toY)
        var bx = 2.0 * ((cpX - 2.0) * fromX)
        var by = 2.0 * ((cpY - 2.0) * fromY)
        var a = 4.0 * (ax * ax + ay * ay)
        var b = 4.0 * (ax * bx + ay * by)
        var c = bx * bx + by * by

        var s = 2.0 * Math.sqrt(a + b + c)
        var a2 = Math.sqrt(a)
        var a32 = 2.0 * a * a2
        var c2 = 2.0 * Math.sqrt(c)
        var ba = b / a2

        return (a32 * s + a2 * b * (s - c2) + (4.0 * c * a - b * b) * Math.log((2.0 * a2 + ba + s) / (ba + c2))) / (4.0 * a32)
      }

      /**
       * Calculate length of bezier curve.
       * Analytical solution is impossible, since it involves an integral that does not integrate in general.
       * Therefore numerical solution is used.
       *
       * @private
       * @param {number} fromX - Starting point x
       * @param {number} fromY - Starting point y
       * @param {number} cpX - Control point x
       * @param {number} cpY - Control point y
       * @param {number} cpX2 - Second Control point x
       * @param {number} cpY2 - Second Control point y
       * @param {number} toX - Destination point x
       * @param {number} toY - Destination point y
       * @return {number} Length of bezier curve
       */


      Graphics.prototype._bezierCurveLength = function _bezierCurveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
        var n = 10
        var result = 0.0
        var t = 0.0
        var t2 = 0.0
        var t3 = 0.0
        var nt = 0.0
        var nt2 = 0.0
        var nt3 = 0.0
        var x = 0.0
        var y = 0.0
        var dx = 0.0
        var dy = 0.0
        var prevX = fromX
        var prevY = fromY

        for (var i = 1; i <= n; ++i) {
          t = i / n
          t2 = t * t
          t3 = t2 * t
          nt = 1.0 - t
          nt2 = nt * nt
          nt3 = nt2 * nt

          x = nt3 * fromX + 3.0 * nt2 * t * cpX + 3.0 * nt * t2 * cpX2 + t3 * toX
          y = nt3 * fromY + 3.0 * nt2 * t * cpY + 3 * nt * t2 * cpY2 + t3 * toY
          dx = prevX - x
          dy = prevY - y
          prevX = x
          prevY = y

          result += Math.sqrt(dx * dx + dy * dy)
        }

        return result
      }

      /**
       * Calculate number of segments for the curve based on its length to ensure its smoothness.
       *
       * @private
       * @param {number} length - length of curve
       * @return {number} Number of segments
       */


      Graphics.prototype._segmentsCount = function _segmentsCount(length) {
        var result = Math.ceil(length / Graphics.CURVES.maxLength)

        if (result < Graphics.CURVES.minSegments) {
          result = Graphics.CURVES.minSegments
        } else if (result > Graphics.CURVES.maxSegments) {
          result = Graphics.CURVES.maxSegments
        }

        return result
      }

      /**
       * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo()
       * method or the drawCircle() method.
       *
       * @param {number} [lineWidth=0] - width of the line to draw, will update the objects stored style
       * @param {number} [color=0] - color of the line to draw, will update the objects stored style
       * @param {number} [alpha=1] - alpha of the line to draw, will update the objects stored style
       * @param {number} [alignment=1] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outter)
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.lineStyle = function lineStyle() {
        var lineWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
        var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
        var alignment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5

        this.lineWidth = lineWidth
        this.lineColor = color
        this.lineAlpha = alpha
        this.lineAlignment = alignment

        if (this.currentPath) {
          if (this.currentPath.shape.points.length) {
            // halfway through a line? start a new one!
            var shape = new _math.Polygon(this.currentPath.shape.points.slice(-2))

            shape.closed = false

            this.drawShape(shape)
          } else {
            // otherwise its empty so lets just set the line properties
            this.currentPath.lineWidth = this.lineWidth
            this.currentPath.lineColor = this.lineColor
            this.currentPath.lineAlpha = this.lineAlpha
            this.currentPath.lineAlignment = this.lineAlignment
          }
        }

        return this
      }

      /**
       * Moves the current drawing position to x, y.
       *
       * @param {number} x - the X coordinate to move to
       * @param {number} y - the Y coordinate to move to
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.moveTo = function moveTo(x, y) {
        var shape = new _math.Polygon([x, y])

        shape.closed = false
        this.drawShape(shape)

        return this
      }

      /**
       * Draws a line using the current line style from the current drawing position to (x, y)
       * The current drawing position is then set to (x, y).
       *
       * @param {number} x - the X coordinate to draw to
       * @param {number} y - the Y coordinate to draw to
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.lineTo = function lineTo(x, y) {
        this.currentPath.shape.points.push(x, y)
        this.dirty++

        return this
      }

      /**
       * Calculate the points for a quadratic bezier curve and then draws it.
       * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
       *
       * @param {number} cpX - Control point x
       * @param {number} cpY - Control point y
       * @param {number} toX - Destination point x
       * @param {number} toY - Destination point y
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.quadraticCurveTo = function quadraticCurveTo(cpX, cpY, toX, toY) {
        if (this.currentPath) {
          if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points = [0, 0]
          }
        } else {
          this.moveTo(0, 0)
        }

        var points = this.currentPath.shape.points
        var xa = 0
        var ya = 0

        if (points.length === 0) {
          this.moveTo(0, 0)
        }

        var fromX = points[points.length - 2]
        var fromY = points[points.length - 1]
        var n = Graphics.CURVES.adaptive ? this._segmentsCount(this._quadraticCurveLength(fromX, fromY, cpX, cpY, toX, toY)) : 20

        for (var i = 1; i <= n; ++i) {
          var j = i / n

          xa = fromX + (cpX - fromX) * j
          ya = fromY + (cpY - fromY) * j

          points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j)
        }

        this.dirty++

        return this
      }

      /**
       * Calculate the points for a bezier curve and then draws it.
       *
       * @param {number} cpX - Control point x
       * @param {number} cpY - Control point y
       * @param {number} cpX2 - Second Control point x
       * @param {number} cpY2 - Second Control point y
       * @param {number} toX - Destination point x
       * @param {number} toY - Destination point y
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.bezierCurveTo = function bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY) {
        if (this.currentPath) {
          if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points = [0, 0]
          }
        } else {
          this.moveTo(0, 0)
        }

        var points = this.currentPath.shape.points

        var fromX = points[points.length - 2]
        var fromY = points[points.length - 1]

        points.length -= 2

        var n = Graphics.CURVES.adaptive ? this._segmentsCount(this._bezierCurveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY)) : 20

        (0, _bezierCurveTo3.default)(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, n, points)

        this.dirty++

        return this
      }

      /**
       * The arcTo() method creates an arc/curve between two tangents on the canvas.
       *
       * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
       *
       * @param {number} x1 - The x-coordinate of the beginning of the arc
       * @param {number} y1 - The y-coordinate of the beginning of the arc
       * @param {number} x2 - The x-coordinate of the end of the arc
       * @param {number} y2 - The y-coordinate of the end of the arc
       * @param {number} radius - The radius of the arc
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.arcTo = function arcTo(x1, y1, x2, y2, radius) {
        if (this.currentPath) {
          if (this.currentPath.shape.points.length === 0) {
            this.currentPath.shape.points.push(x1, y1)
          }
        } else {
          this.moveTo(x1, y1)
        }

        var points = this.currentPath.shape.points
        var fromX = points[points.length - 2]
        var fromY = points[points.length - 1]
        var a1 = fromY - y1
        var b1 = fromX - x1
        var a2 = y2 - y1
        var b2 = x2 - x1
        var mm = Math.abs(a1 * b2 - b1 * a2)

        if (mm < 1.0e-8 || radius === 0) {
          if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
            points.push(x1, y1)
          }
        } else {
          var dd = a1 * a1 + b1 * b1
          var cc = a2 * a2 + b2 * b2
          var tt = a1 * a2 + b1 * b2
          var k1 = radius * Math.sqrt(dd) / mm
          var k2 = radius * Math.sqrt(cc) / mm
          var j1 = k1 * tt / dd
          var j2 = k2 * tt / cc
          var cx = k1 * b2 + k2 * b1
          var cy = k1 * a2 + k2 * a1
          var px = b1 * (k2 + j1)
          var py = a1 * (k2 + j1)
          var qx = b2 * (k1 + j2)
          var qy = a2 * (k1 + j2)
          var startAngle = Math.atan2(py - cy, px - cx)
          var endAngle = Math.atan2(qy - cy, qx - cx)

          this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1)
        }

        this.dirty++

        return this
      }

      /**
       * The arc method creates an arc/curve (used to create circles, or parts of circles).
       *
       * @param {number} cx - The x-coordinate of the center of the circle
       * @param {number} cy - The y-coordinate of the center of the circle
       * @param {number} radius - The radius of the circle
       * @param {number} startAngle - The starting angle, in radians (0 is at the 3 o'clock position
       *  of the arc's circle)
       * @param {number} endAngle - The ending angle, in radians
       * @param {boolean} [anticlockwise=false] - Specifies whether the drawing should be
       *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
       *  indicates counter-clockwise.
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.arc = function arc(cx, cy, radius, startAngle, endAngle) {
        var anticlockwise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false

        if (startAngle === endAngle) {
          return this
        }

        if (!anticlockwise && endAngle <= startAngle) {
          endAngle += _const.PI_2
        } else if (anticlockwise && startAngle <= endAngle) {
          startAngle += _const.PI_2
        }

        var sweep = endAngle - startAngle
        var segs = Graphics.CURVES.adaptive ? this._segmentsCount(Math.abs(sweep) * radius) : Math.ceil(Math.abs(sweep) / _const.PI_2) * 40

        if (sweep === 0) {
          return this
        }

        var startX = cx + Math.cos(startAngle) * radius
        var startY = cy + Math.sin(startAngle) * radius

        // If the currentPath exists, take its points. Otherwise call `moveTo` to start a path.
        var points = this.currentPath ? this.currentPath.shape.points : null

        if (points) {
          if (points[points.length - 2] !== startX || points[points.length - 1] !== startY) {
            points.push(startX, startY)
          }
        } else {
          this.moveTo(startX, startY)
          points = this.currentPath.shape.points
        }

        var theta = sweep / (segs * 2)
        var theta2 = theta * 2

        var cTheta = Math.cos(theta)
        var sTheta = Math.sin(theta)

        var segMinus = segs - 1

        var remainder = segMinus % 1 / segMinus

        for (var i = 0; i <= segMinus; ++i) {
          var real = i + remainder * i

          var angle = theta + startAngle + theta2 * real

          var c = Math.cos(angle)
          var s = -Math.sin(angle)

          points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy)
        }

        this.dirty++

        return this
      }

      /**
       * Specifies a simple one-color fill that subsequent calls to other Graphics methods
       * (such as lineTo() or drawCircle()) use when drawing.
       *
       * @param {number} [color=0] - the color of the fill
       * @param {number} [alpha=1] - the alpha of the fill
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.beginFill = function beginFill() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1

        this.filling = true
        this.fillColor = color
        this.fillAlpha = alpha

        if (this.currentPath) {
          if (this.currentPath.shape.points.length <= 2) {
            this.currentPath.fill = this.filling
            this.currentPath.fillColor = this.fillColor
            this.currentPath.fillAlpha = this.fillAlpha
          }
        }

        return this
      }

      /**
       * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
       *
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.endFill = function endFill() {
        this.filling = false
        this.fillColor = null
        this.fillAlpha = 1

        return this
      }

      /**
       *
       * @param {number} x - The X coord of the top-left of the rectangle
       * @param {number} y - The Y coord of the top-left of the rectangle
       * @param {number} width - The width of the rectangle
       * @param {number} height - The height of the rectangle
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.drawRect = function drawRect(x, y, width, height) {
        this.drawShape(new _math.Rectangle(x, y, width, height))

        return this
      }

      /**
       *
       * @param {number} x - The X coord of the top-left of the rectangle
       * @param {number} y - The Y coord of the top-left of the rectangle
       * @param {number} width - The width of the rectangle
       * @param {number} height - The height of the rectangle
       * @param {number} radius - Radius of the rectangle corners
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.drawRoundedRect = function drawRoundedRect(x, y, width, height, radius) {
        this.drawShape(new _math.RoundedRectangle(x, y, width, height, radius))

        return this
      }

      /**
       * Draws a circle.
       *
       * @param {number} x - The X coordinate of the center of the circle
       * @param {number} y - The Y coordinate of the center of the circle
       * @param {number} radius - The radius of the circle
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.drawCircle = function drawCircle(x, y, radius) {
        this.drawShape(new _math.Circle(x, y, radius))

        return this
      }

      /**
       * Draws an ellipse.
       *
       * @param {number} x - The X coordinate of the center of the ellipse
       * @param {number} y - The Y coordinate of the center of the ellipse
       * @param {number} width - The half width of the ellipse
       * @param {number} height - The half height of the ellipse
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.drawEllipse = function drawEllipse(x, y, width, height) {
        this.drawShape(new _math.Ellipse(x, y, width, height))

        return this
      }

      /**
       * Draws a polygon using the given path.
       *
       * @param {number[]|PIXI.Point[]|PIXI.Polygon} path - The path data used to construct the polygon.
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */


      Graphics.prototype.drawPolygon = function drawPolygon(path) {
        // prevents an argument assignment deopt
        // see section 3.1: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
        var points = path

        var closed = true

        if (points instanceof _math.Polygon) {
          closed = points.closed
          points = points.points
        }

        if (!Array.isArray(points)) {
          // prevents an argument leak deopt
          // see section 3.2: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
          points = new Array(arguments.length)

          for (var i = 0; i < points.length; ++i) {
            points[i] = arguments[i]; // eslint-disable-line prefer-rest-params
          }
        }

        var shape = new _math.Polygon(points)

        shape.closed = closed

        this.drawShape(shape)

        return this
      }

      /**
       * Draw a star shape with an abitrary number of points.
       *
       * @param {number} x - Center X position of the star
       * @param {number} y - Center Y position of the star
       * @param {number} points - The number of points of the star, must be > 1
       * @param {number} radius - The outer radius of the star
       * @param {number} [innerRadius] - The inner radius between points, default half `radius`
       * @param {number} [rotation=0] - The rotation of the star in radians, where 0 is vertical
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */
      Graphics.prototype.drawStar = function drawStar(x, y, points, radius, innerRadius) {
        var rotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0

        innerRadius = innerRadius || radius / 2

        var startAngle = -1 * Math.PI / 2 + rotation
        var len = points * 2
        var delta = _const.PI_2 / len
        var polygon = []

        for (var i = 0; i < len; i++) {
          var r = i % 2 ? innerRadius : radius
          var angle = i * delta + startAngle

          polygon.push(x + r * Math.cos(angle), y + r * Math.sin(angle))
        }

        return this.drawPolygon(polygon)
      }

      /**
       * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
       *
       * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
       */
      Graphics.prototype.clear = function clear() {
        if (this.lineWidth || this.filling || this.graphicsData.length > 0) {
          this.lineWidth = 0
          this.lineAlignment = 0.5

          this.filling = false

          this.boundsDirty = -1
          this.dirty++
          this.clearDirty++
          this.graphicsData.length = 0
        }

        this.currentPath = null
        this._spriteRect = null

        return this
      }

      /**
       * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
       * masked with gl.scissor.
       *
       * @returns {boolean} True if only 1 rect.
       */
      Graphics.prototype.isFastRect = function isFastRect() {
        return this.graphicsData.length === 1 && this.graphicsData[0].shape.type === _const.SHAPES.RECT && !this.graphicsData[0].lineWidth
      }

      /**
       * Renders the object using the WebGL renderer
       *
       * @private
       * @param {PIXI.WebGLRenderer} renderer - The renderer
       */
      Graphics.prototype._renderWebGL = function _renderWebGL(renderer) {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if (this.dirty !== this.fastRectDirty) {
          this.fastRectDirty = this.dirty
          this._fastRect = this.isFastRect()
        }

        // TODO this check can be moved to dirty?
        if (this._fastRect) {
          this._renderSpriteRect(renderer)
        } else {
          renderer.setObjectRenderer(renderer.plugins.graphics)
          renderer.plugins.graphics.render(this)
        }
      }

      /**
       * Renders a sprite rectangle.
       *
       * @private
       * @param {PIXI.WebGLRenderer} renderer - The renderer
       */
      Graphics.prototype._renderSpriteRect = function _renderSpriteRect(renderer) {
        var rect = this.graphicsData[0].shape

        if (!this._spriteRect) {
          this._spriteRect = new _Sprite2.default(new _Texture2.default(_Texture2.default.WHITE))
        }

        var sprite = this._spriteRect

        if (this.tint === 0xffffff) {
          sprite.tint = this.graphicsData[0].fillColor
        } else {
          var t1 = tempColor1
          var t2 = tempColor2

          void (0, _utils.hex2rgb)(this.graphicsData[0].fillColor, t1)
          void (0, _utils.hex2rgb)(this.tint, t2)

          t1[0] *= t2[0]
          t1[1] *= t2[1]
          t1[2] *= t2[2]

          sprite.tint = (0, _utils.rgb2hex)(t1)
        }
        sprite.alpha = this.graphicsData[0].fillAlpha
        sprite.worldAlpha = this.worldAlpha * sprite.alpha
        sprite.blendMode = this.blendMode

        sprite._texture._frame.width = rect.width
        sprite._texture._frame.height = rect.height

        sprite.transform.worldTransform = this.transform.worldTransform

        sprite.anchor.set(-rect.x / rect.width, -rect.y / rect.height)
        sprite._onAnchorUpdate()

        sprite._renderWebGL(renderer)
      }

      /**
       * Renders the object using the Canvas renderer
       *
       * @private
       * @param {PIXI.CanvasRenderer} renderer - The renderer
       */
      Graphics.prototype._renderCanvas = function _renderCanvas(renderer) {
        if (this.isMask === true) {
          return
        }

        renderer.plugins.graphics.render(this)
      }

      /**
       * Retrieves the bounds of the graphic shape as a rectangle object
       *
       * @private
       */
      Graphics.prototype._calculateBounds = function _calculateBounds() {
        if (this.boundsDirty !== this.dirty) {
          this.boundsDirty = this.dirty
          this.updateLocalBounds()

          this.cachedSpriteDirty = true
        }

        var lb = this._localBounds

        this._bounds.addFrame(this.transform, lb.minX, lb.minY, lb.maxX, lb.maxY)
      }

      /**
       * Tests if a point is inside this graphics object
       *
       * @param {PIXI.Point} point - the point to test
       * @return {boolean} the result of the test
       */
      Graphics.prototype.containsPoint = function containsPoint(point) {
        this.worldTransform.applyInverse(point, tempPoint)

        var graphicsData = this.graphicsData

        for (var i = 0; i < graphicsData.length; ++i) {
          var data = graphicsData[i]

          if (!data.fill) {
            continue
          }

          // only deal with fills..
          if (data.shape) {
            if (data.shape.contains(tempPoint.x, tempPoint.y)) {
              if (data.holes) {
                for (var _i = 0; _i < data.holes.length; _i++) {
                  var hole = data.holes[_i]

                  if (hole.contains(tempPoint.x, tempPoint.y)) {
                    return false
                  }
                }
              }

              return true
            }
          }
        }

        return false
      }

      /**
       * Update the bounds of the object
       *
       */
      Graphics.prototype.updateLocalBounds = function updateLocalBounds() {
        var minX = Infinity
        var maxX = -Infinity

        var minY = Infinity
        var maxY = -Infinity

        if (this.graphicsData.length) {
          var shape = 0
          var x = 0
          var y = 0
          var w = 0
          var h = 0

          for (var i = 0; i < this.graphicsData.length; i++) {
            var data = this.graphicsData[i]
            var type = data.type
            var lineWidth = data.lineWidth

            shape = data.shape

            if (type === _const.SHAPES.RECT || type === _const.SHAPES.RREC) {
              x = shape.x - lineWidth / 2
              y = shape.y - lineWidth / 2
              w = shape.width + lineWidth
              h = shape.height + lineWidth

              minX = x < minX ? x : minX
              maxX = x + w > maxX ? x + w : maxX

              minY = y < minY ? y : minY
              maxY = y + h > maxY ? y + h : maxY
            } else if (type === _const.SHAPES.CIRC) {
              x = shape.x
              y = shape.y
              w = shape.radius + lineWidth / 2
              h = shape.radius + lineWidth / 2

              minX = x - w < minX ? x - w : minX
              maxX = x + w > maxX ? x + w : maxX

              minY = y - h < minY ? y - h : minY
              maxY = y + h > maxY ? y + h : maxY
            } else if (type === _const.SHAPES.ELIP) {
              x = shape.x
              y = shape.y
              w = shape.width + lineWidth / 2
              h = shape.height + lineWidth / 2

              minX = x - w < minX ? x - w : minX
              maxX = x + w > maxX ? x + w : maxX

              minY = y - h < minY ? y - h : minY
              maxY = y + h > maxY ? y + h : maxY
            } else {
              // POLY
              var points = shape.points
              var x2 = 0
              var y2 = 0
              var dx = 0
              var dy = 0
              var rw = 0
              var rh = 0
              var cx = 0
              var cy = 0

              for (var j = 0; j + 2 < points.length; j += 2) {
                x = points[j]
                y = points[j + 1]
                x2 = points[j + 2]
                y2 = points[j + 3]
                dx = Math.abs(x2 - x)
                dy = Math.abs(y2 - y)
                h = lineWidth
                w = Math.sqrt(dx * dx + dy * dy)

                if (w < 1e-9) {
                  continue
                }

                rw = (h / w * dy + dx) / 2
                rh = (h / w * dx + dy) / 2
                cx = (x2 + x) / 2
                cy = (y2 + y) / 2

                minX = cx - rw < minX ? cx - rw : minX
                maxX = cx + rw > maxX ? cx + rw : maxX

                minY = cy - rh < minY ? cy - rh : minY
                maxY = cy + rh > maxY ? cy + rh : maxY
              }
            }
          }
        } else {
          minX = 0
          maxX = 0
          minY = 0
          maxY = 0
        }

        var padding = this.boundsPadding

        this._localBounds.minX = minX - padding
        this._localBounds.maxX = maxX + padding

        this._localBounds.minY = minY - padding
        this._localBounds.maxY = maxY + padding
      }

      /**
       * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
       *
       * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
       * @return {PIXI.GraphicsData} The generated GraphicsData object.
       */
      Graphics.prototype.drawShape = function drawShape(shape) {
        if (this.currentPath) {
          // check current path!
          if (this.currentPath.shape.points.length <= 2) {
            this.graphicsData.pop()
          }
        }

        this.currentPath = null

        var data = new _GraphicsData2.default(
          this.lineWidth, this.lineColor, this.lineAlpha,
          this.fillColor, this.fillAlpha, this.filling,
          this.nativeLines, shape, this.lineAlignment
        )

        this.graphicsData.push(data)

        if (data.type === _const.SHAPES.POLY) {
          data.shape.closed = data.shape.closed || this.filling
          this.currentPath = data
        }

        this.dirty++

        return data
      }

      /**
       * Generates a canvas texture.
       *
       * @param {number} scaleMode - The scale mode of the texture.
       * @param {number} resolution - The resolution of the texture.
       * @return {PIXI.Texture} The new texture.
       */
      Graphics.prototype.generateCanvasTexture = function generateCanvasTexture(scaleMode) {
        var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1

        var bounds = this.getLocalBounds()

        var canvasBuffer = _RenderTexture2.default.create(bounds.width, bounds.height, scaleMode, resolution)

        if (!canvasRenderer) {
          canvasRenderer = new _CanvasRenderer2.default()
        }

        this.transform.updateLocalTransform()
        this.transform.localTransform.copy(tempMatrix)

        tempMatrix.invert()

        tempMatrix.tx -= bounds.x
        tempMatrix.ty -= bounds.y

        canvasRenderer.render(this, canvasBuffer, true, tempMatrix)

        var texture = _Texture2.default.fromCanvas(canvasBuffer.baseTexture._canvasRenderTarget.canvas, scaleMode, 'graphics')

        texture.baseTexture.resolution = resolution
        texture.baseTexture.update()

        return texture
      }

      /**
       * Closes the current path.
       *
       * @return {PIXI.Graphics} Returns itself.
       */
      Graphics.prototype.closePath = function closePath() {
        // ok so close path assumes next one is a hole!
        var currentPath = this.currentPath

        if (currentPath && currentPath.shape) {
          currentPath.shape.close()
        }

        return this
      }

      /**
       * Adds a hole in the current path.
       *
       * @return {PIXI.Graphics} Returns itself.
       */
      Graphics.prototype.addHole = function addHole() {
        // this is a hole!
        var hole = this.graphicsData.pop()

        this.currentPath = this.graphicsData[this.graphicsData.length - 1]

        this.currentPath.addHole(hole.shape)
        this.currentPath = null

        return this
      }

      /**
       * Destroys the Graphics object.
       *
       * @param {object|boolean} [options] - Options parameter. A boolean will act as if all
       *  options have been set to that value
       * @param {boolean} [options.children=false] - if set to true, all the children will have
       *  their destroy method called as well. 'options' will be passed on to those calls.
       * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
       *  Should it destroy the texture of the child sprite
       * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
       *  Should it destroy the base texture of the child sprite
       */
      Graphics.prototype.destroy = function destroy(options) {
        _Container.prototype.destroy.call(this, options)

        // destroy each of the GraphicsData objects
        for (var i = 0; i < this.graphicsData.length; ++i) {
          this.graphicsData[i].destroy()
        }

        // for each webgl data entry, destroy the WebGLGraphicsData
        for (var id in this._webGL) {
          for (var j = 0; j < this._webGL[id].data.length; ++j) {
            this._webGL[id].data[j].destroy()
          }
        }

        if (this._spriteRect) {
          this._spriteRect.destroy()
        }

        this.graphicsData = null

        this.currentPath = null
        this._webGL = null
        this._localBounds = null
      }

      return Graphics
    }(Container)

    exports.default = Graphics


    Graphics._SPRITE_TEXTURE = null

    /**
     * Graphics curves resolution settings. If `adaptive` flag is set to `true`,
     * the resolution is calculated based on the curve's length to ensure better visual quality.
     * Adaptive draw works with `bezierCurveTo` and `quadraticCurveTo`.
     *
     * @static
     * @constant
     * @memberof PIXI.Graphics
     * @name CURVES
     * @type {object}
     * @property {boolean} adaptive=false - flag indicating if the resolution should be adaptive
     * @property {number} maxLength=10 - maximal length of a single segment of the curve (if adaptive = false, ignored)
     * @property {number} minSegments=8 - minimal number of segments in the curve (if adaptive = false, ignored)
     * @property {number} maxSegments=2048 - maximal number of segments in the curve (if adaptive = false, ignored)
     */
    Graphics.CURVES = {
      adaptive: false,
      maxLength: 10,
      minSegments: 8,
      maxSegments: 2048
    }

  }, {
    "../const": 46,
    "../display/Bounds": 47,
    "../display/Container": 48,
    "../math": 70,
    "../renderers/canvas/CanvasRenderer": 77,
    "../sprites/Sprite": 102,
    "../textures/RenderTexture": 113,
    "../textures/Texture": 115,
    "../utils": 125,
    "./GraphicsData": 54,
    "./utils/bezierCurveTo": 56
  }],
  54: [function ($require, container, exports) {
    container.exports = GraphicsData
  }, {}],
  55: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _CanvasRenderer = $require('../../renderers/canvas/CanvasRenderer')

    var _CanvasRenderer2 = interop_require_default_(_CanvasRenderer)

    var _const = $require('../../const')

    
    
    /**
     * @author Mat Groves
     *
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original PixiJS version!
     * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that they
     * now share 4 bytes on the vertex buffer
     *
     * Heavily inspired by LibGDX's CanvasGraphicsRenderer:
     * https://github.com/libgdx/libgdx/blob/1.0.0/gdx/src/com/badlogic/gdx/graphics/glutils/ShapeRenderer.java
     */

    /**
     * Renderer dedicated to drawing and batching graphics objects.
     *
     * @class
     * @private
     * @memberof PIXI
     */
    var CanvasGraphicsRenderer = function () {
      /**
       * @param {PIXI.CanvasRenderer} renderer - The current PIXI renderer.
       */
      function CanvasGraphicsRenderer(renderer) {
        class_call_check_(this, CanvasGraphicsRenderer)

        this.renderer = renderer
      }

      /**
       * Renders a Graphics object to a canvas.
       *
       * @param {PIXI.Graphics} graphics - the actual graphics object to render
       */


      CanvasGraphicsRenderer.prototype.render = function render(graphics) {
        var renderer = this.renderer
        var context = renderer.context
        var worldAlpha = graphics.worldAlpha
        var transform = graphics.transform.worldTransform
        var resolution = renderer.resolution

        // if the tint has changed, set the graphics object to dirty.
        if (this._prevTint !== this.tint) {
          this.dirty = true
        }

        context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution)

        if (graphics.dirty) {
          this.updateGraphicsTint(graphics)
          graphics.dirty = false
        }

        renderer.setBlendMode(graphics.blendMode)

        for (var i = 0; i < graphics.graphicsData.length; i++) {
          var data = graphics.graphicsData[i]
          var shape = data.shape

          var fillColor = data._fillTint
          var lineColor = data._lineTint

          context.lineWidth = data.lineWidth

          if (data.type === _const.SHAPES.POLY) {
            context.beginPath()

            this.renderPolygon(shape.points, shape.closed, context)

            for (var j = 0; j < data.holes.length; j++) {
              this.renderPolygon(data.holes[j].points, true, context)
            }

            if (data.fill) {
              context.globalAlpha = data.fillAlpha * worldAlpha
              context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6)
              context.fill()
            }
            if (data.lineWidth) {
              context.globalAlpha = data.lineAlpha * worldAlpha
              context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6)
              context.stroke()
            }
          } else if (data.type === _const.SHAPES.RECT) {
            if (data.fillColor || data.fillColor === 0) {
              context.globalAlpha = data.fillAlpha * worldAlpha
              context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6)
              context.fillRect(shape.x, shape.y, shape.width, shape.height)
            }
            if (data.lineWidth) {
              context.globalAlpha = data.lineAlpha * worldAlpha
              context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6)
              context.strokeRect(shape.x, shape.y, shape.width, shape.height)
            }
          } else if (data.type === _const.SHAPES.CIRC) {
            // TODO - need to be Undefined!
            context.beginPath()
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
            context.closePath()

            if (data.fill) {
              context.globalAlpha = data.fillAlpha * worldAlpha
              context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6)
              context.fill()
            }
            if (data.lineWidth) {
              context.globalAlpha = data.lineAlpha * worldAlpha
              context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6)
              context.stroke()
            }
          } else if (data.type === _const.SHAPES.ELIP) {
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2
            var h = shape.height * 2

            var x = shape.x - w / 2
            var y = shape.y - h / 2

            context.beginPath()

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

            if (data.fill) {
              context.globalAlpha = data.fillAlpha * worldAlpha
              context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6)
              context.fill()
            }
            if (data.lineWidth) {
              context.globalAlpha = data.lineAlpha * worldAlpha
              context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6)
              context.stroke()
            }
          } else if (data.type === _const.SHAPES.RREC) {
            var rx = shape.x
            var ry = shape.y
            var width = shape.width
            var height = shape.height
            var radius = shape.radius

            var maxRadius = Math.min(width, height) / 2 | 0

            radius = radius > maxRadius ? maxRadius : radius

            context.beginPath()
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

            if (data.fillColor || data.fillColor === 0) {
              context.globalAlpha = data.fillAlpha * worldAlpha
              context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6)
              context.fill()
            }

            if (data.lineWidth) {
              context.globalAlpha = data.lineAlpha * worldAlpha
              context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6)
              context.stroke()
            }
          }
        }
      }

      /**
       * Updates the tint of a graphics object
       *
       * @private
       * @param {PIXI.Graphics} graphics - the graphics that will have its tint updated
       */


      CanvasGraphicsRenderer.prototype.updateGraphicsTint = function updateGraphicsTint(graphics) {
        graphics._prevTint = graphics.tint

        var tintR = (graphics.tint >> 16 & 0xFF) / 255
        var tintG = (graphics.tint >> 8 & 0xFF) / 255
        var tintB = (graphics.tint & 0xFF) / 255

        for (var i = 0; i < graphics.graphicsData.length; ++i) {
          var data = graphics.graphicsData[i]

          var fillColor = data.fillColor | 0
          var lineColor = data.lineColor | 0

          // super inline, cos optimization :)
          data._fillTint = ((fillColor >> 16 & 0xFF) / 255 * tintR * 255 << 16) + ((fillColor >> 8 & 0xFF) / 255 * tintG * 255 << 8) + (fillColor & 0xFF) / 255 * tintB * 255

          data._lineTint = ((lineColor >> 16 & 0xFF) / 255 * tintR * 255 << 16) + ((lineColor >> 8 & 0xFF) / 255 * tintG * 255 << 8) + (lineColor & 0xFF) / 255 * tintB * 255
        }
      }

      /**
       * Renders a polygon.
       *
       * @param {PIXI.Point[]} points - The points to render
       * @param {boolean} close - Should the polygon be closed
       * @param {CanvasRenderingContext2D} context - The rendering context to use
       */


      CanvasGraphicsRenderer.prototype.renderPolygon = function renderPolygon(points, close, context) {
        context.moveTo(points[0], points[1])

        for (var j = 1; j < points.length / 2; ++j) {
          context.lineTo(points[j * 2], points[j * 2 + 1])
        }

        if (close) {
          context.closePath()
        }
      }

      /**
       * destroy graphics object
       *
       */


      CanvasGraphicsRenderer.prototype.destroy = function destroy() {
        this.renderer = null
      }

      return CanvasGraphicsRenderer
    }()

    exports.default = CanvasGraphicsRenderer


    _CanvasRenderer2.default.registerPlugin('graphics', CanvasGraphicsRenderer)

  }, {
    "../../const": 46,
    "../../renderers/canvas/CanvasRenderer": 77
  }],
  56: [function ($require, container, exports) {
    container.exports = bezierCurveTo
  }, {}],
  57: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _utils = $require('../../utils')

    var _const = $require('../../const')

    var _ObjectRenderer2 = $require('../../renderers/webgl/utils/ObjectRenderer')

    var _ObjectRenderer3 = interop_require_default_(_ObjectRenderer2)

    var _WebGLRenderer = $require('../../renderers/webgl/WebGLRenderer')

    var _WebGLRenderer2 = interop_require_default_(_WebGLRenderer)

    var _WebGLGraphicsData = $require('./WebGLGraphicsData')

    var _WebGLGraphicsData2 = interop_require_default_(_WebGLGraphicsData)

    var _PrimitiveShader = $require('./shaders/PrimitiveShader')

    var _PrimitiveShader2 = interop_require_default_(_PrimitiveShader)

    var _buildPoly = $require('./utils/buildPoly')

    var _buildPoly2 = interop_require_default_(_buildPoly)

    var _buildRectangle = $require('./utils/buildRectangle')

    var _buildRectangle2 = interop_require_default_(_buildRectangle)

    var _buildRoundedRectangle = $require('./utils/buildRoundedRectangle')

    var _buildRoundedRectangle2 = interop_require_default_(_buildRoundedRectangle)

    var _buildCircle = $require('./utils/buildCircle')

    var _buildCircle2 = interop_require_default_(_buildCircle)

    
    
        
    /**
     * Renders the graphics object.
     *
     * @class
     * @memberof PIXI
     * @extends PIXI.ObjectRenderer
     */
    var GraphicsRenderer = function (_ObjectRenderer) {
      inherits_(GraphicsRenderer, _ObjectRenderer)

      /**
       * @param {PIXI.WebGLRenderer} renderer - The renderer this object renderer works for.
       */
      function GraphicsRenderer(renderer) {
        class_call_check_(this, GraphicsRenderer)

        var _this = get_constructor_(this, _ObjectRenderer.call(this, renderer))

        _this.graphicsDataPool = []

        _this.primitiveShader = null

        _this.gl = renderer.gl

        // easy access!
        _this.CONTEXT_UID = 0
        return _this
      }

      /**
       * Called when there is a WebGL context change
       *
       * @private
       *
       */


      GraphicsRenderer.prototype.onContextChange = function onContextChange() {
        this.gl = this.renderer.gl
        this.CONTEXT_UID = this.renderer.CONTEXT_UID
        this.primitiveShader = new _PrimitiveShader2.default(this.gl)
      }

      /**
       * Destroys this renderer.
       *
       */


      GraphicsRenderer.prototype.destroy = function destroy() {
        _ObjectRenderer3.default.prototype.destroy.call(this)

        for (var i = 0; i < this.graphicsDataPool.length; ++i) {
          this.graphicsDataPool[i].destroy()
        }

        this.graphicsDataPool = null
      }

      /**
       * Renders a graphics object.
       *
       * @param {PIXI.Graphics} graphics - The graphics object to render.
       */


      GraphicsRenderer.prototype.render = function render(graphics) {
        var renderer = this.renderer
        var gl = renderer.gl

        var webGLData = void 0
        var webGL = graphics._webGL[this.CONTEXT_UID]

        if (!webGL || graphics.dirty !== webGL.dirty) {
          this.updateGraphics(graphics)

          webGL = graphics._webGL[this.CONTEXT_UID]
        }

        // This  could be speeded up for sure!
        var shader = this.primitiveShader

        renderer.bindShader(shader)
        renderer.state.setBlendMode(graphics.blendMode)

        for (var i = 0, n = webGL.data.length; i < n; i++) {
          webGLData = webGL.data[i]
          var shaderTemp = webGLData.shader

          renderer.bindShader(shaderTemp)
          shaderTemp.uniforms.translationMatrix = graphics.transform.worldTransform.toArray(true)
          shaderTemp.uniforms.tint = (0, _utils.hex2rgb)(graphics.tint)
          shaderTemp.uniforms.alpha = graphics.worldAlpha

          renderer.bindVao(webGLData.vao)

          if (webGLData.nativeLines) {
            gl.drawArrays(gl.LINES, 0, webGLData.points.length / 6)
          } else {
            webGLData.vao.draw(gl.TRIANGLE_STRIP, webGLData.indices.length)
          }
        }
      }

      /**
       * Updates the graphics object
       *
       * @private
       * @param {PIXI.Graphics} graphics - The graphics object to update
       */


      GraphicsRenderer.prototype.updateGraphics = function updateGraphics(graphics) {
        var gl = this.renderer.gl

        // get the contexts graphics object
        var webGL = graphics._webGL[this.CONTEXT_UID]

        // if the graphics object does not exist in the webGL context time to create it!
        if (!webGL) {
          webGL = graphics._webGL[this.CONTEXT_UID] = {
            lastIndex: 0,
            data: [],
            gl: gl,
            clearDirty: -1,
            dirty: -1
          }
        }

        // flag the graphics as not dirty as we are about to update it...
        webGL.dirty = graphics.dirty

        // if the user cleared the graphics object we will need to clear every object
        if (graphics.clearDirty !== webGL.clearDirty) {
          webGL.clearDirty = graphics.clearDirty

          // loop through and return all the webGLDatas to the object pool so than can be reused later on
          for (var i = 0; i < webGL.data.length; i++) {
            this.graphicsDataPool.push(webGL.data[i])
          }

          // clear the array and reset the index..
          webGL.data.length = 0
          webGL.lastIndex = 0
        }

        var webGLData = void 0
        var webGLDataNativeLines = void 0

        // loop through the graphics datas and construct each one..
        // if the object is a complex fill then the new stencil buffer technique will be used
        // other wise graphics objects will be pushed into a batch..
        for (var _i = webGL.lastIndex; _i < graphics.graphicsData.length; _i++) {
          var data = graphics.graphicsData[_i]

          // TODO - this can be simplified
          webGLData = this.getWebGLData(webGL, 0)

          if (data.nativeLines && data.lineWidth) {
            webGLDataNativeLines = this.getWebGLData(webGL, 0, true)
            webGL.lastIndex++
          }

          if (data.type === _const.SHAPES.POLY) {
            (0, _buildPoly2.default)(data, webGLData, webGLDataNativeLines)
          }
          if (data.type === _const.SHAPES.RECT) {
            (0, _buildRectangle2.default)(data, webGLData, webGLDataNativeLines)
          } else if (data.type === _const.SHAPES.CIRC || data.type === _const.SHAPES.ELIP) {
            (0, _buildCircle2.default)(data, webGLData, webGLDataNativeLines)
          } else if (data.type === _const.SHAPES.RREC) {
            (0, _buildRoundedRectangle2.default)(data, webGLData, webGLDataNativeLines)
          }

          webGL.lastIndex++
        }

        this.renderer.bindVao(null)

        // upload all the dirty data...
        for (var _i2 = 0; _i2 < webGL.data.length; _i2++) {
          webGLData = webGL.data[_i2]

          if (webGLData.dirty) {
            webGLData.upload()
          }
        }
      }

      /**
       *
       * @private
       * @param {WebGLRenderingContext} gl - the current WebGL drawing context
       * @param {number} type - TODO @Alvin
       * @param {number} nativeLines - indicate whether the webGLData use for nativeLines.
       * @return {*} TODO
       */


      GraphicsRenderer.prototype.getWebGLData = function getWebGLData(gl, type, nativeLines) {
        var webGLData = gl.data[gl.data.length - 1]

        if (!webGLData || webGLData.nativeLines !== nativeLines || webGLData.points.length > 320000) {
          webGLData = this.graphicsDataPool.pop() || new _WebGLGraphicsData2.default(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState)
          webGLData.nativeLines = nativeLines
          webGLData.reset(type)
          gl.data.push(webGLData)
        }

        webGLData.dirty = true

        return webGLData
      }

      return GraphicsRenderer
    }(_ObjectRenderer3.default)

    exports.default = GraphicsRenderer


    _WebGLRenderer2.default.registerPlugin('graphics', GraphicsRenderer)

  }, {
    "../../const": 46,
    "../../renderers/webgl/WebGLRenderer": 84,
    "../../renderers/webgl/utils/ObjectRenderer": 94,
    "../../utils": 125,
    "./WebGLGraphicsData": 58,
    "./shaders/PrimitiveShader": 59,
    "./utils/buildCircle": 60,
    "./utils/buildPoly": 62,
    "./utils/buildRectangle": 63,
    "./utils/buildRoundedRectangle": 64
  }],
  58: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _pixiGlCore = $require('pixi-gl-core')

    var _pixiGlCore2 = interop_require_default_(_pixiGlCore)

    
    
    /**
     * An object containing WebGL specific properties to be used by the WebGL renderer
     *
     * @class
     * @private
     * @memberof PIXI
     */
    var WebGLGraphicsData = function () {
      /**
       * @param {WebGLRenderingContext} gl - The current WebGL drawing context
       * @param {PIXI.Shader} shader - The shader
       * @param {object} attribsState - The state for the VAO
       */
      function WebGLGraphicsData(gl, shader, attribsState) {
        class_call_check_(this, WebGLGraphicsData)

        /**
         * The current WebGL drawing context
         *
         * @member {WebGLRenderingContext}
         */
        this.gl = gl

        // TODO does this need to be split before uploading??
        /**
         * An array of color components (r,g,b)
         * @member {number[]}
         */
        this.color = [0, 0, 0]; // color split!

        /**
         * An array of points to draw
         * @member {PIXI.Point[]}
         */
        this.points = []

        /**
         * The indices of the vertices
         * @member {number[]}
         */
        this.indices = []
        /**
         * The main buffer
         * @member {WebGLBuffer}
         */
        this.buffer = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl)

        /**
         * The index buffer
         * @member {WebGLBuffer}
         */
        this.indexBuffer = _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl)

        /**
         * Whether this graphics is dirty or not
         * @member {boolean}
         */
        this.dirty = true

        /**
         * Whether this graphics is nativeLines or not
         * @member {boolean}
         */
        this.nativeLines = false

        this.glPoints = null
        this.glIndices = null

        /**
         *
         * @member {PIXI.Shader}
         */
        this.shader = shader

        this.vao = new _pixiGlCore2.default.VertexArrayObject(gl, attribsState).addIndex(this.indexBuffer).addAttribute(this.buffer, shader.attributes.aVertexPosition, gl.FLOAT, false, 4 * 6, 0).addAttribute(this.buffer, shader.attributes.aColor, gl.FLOAT, false, 4 * 6, 2 * 4)
      }

      /**
       * Resets the vertices and the indices
       */


      WebGLGraphicsData.prototype.reset = function reset() {
        this.points.length = 0
        this.indices.length = 0
      }

      /**
       * Binds the buffers and uploads the data
       */


      WebGLGraphicsData.prototype.upload = function upload() {
        this.glPoints = new Float32Array(this.points)
        this.buffer.upload(this.glPoints)

        this.glIndices = new Uint16Array(this.indices)
        this.indexBuffer.upload(this.glIndices)

        this.dirty = false
      }

      /**
       * Empties all the data
       */


      WebGLGraphicsData.prototype.destroy = function destroy() {
        this.color = null
        this.points = null
        this.indices = null

        this.vao.destroy()
        this.buffer.destroy()
        this.indexBuffer.destroy()

        this.gl = null

        this.buffer = null
        this.indexBuffer = null

        this.glPoints = null
        this.glIndices = null
      }

      return WebGLGraphicsData
    }()

    exports.default = WebGLGraphicsData

  }, {
    "pixi-gl-core": 15
  }],
  59: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _Shader2 = $require('../../../Shader')

    var _Shader3 = interop_require_default_(_Shader2)

    
    
        
    /**
     * This shader is used to draw simple primitive shapes for {@link PIXI.Graphics}.
     *
     * @class
     * @memberof PIXI
     * @extends PIXI.Shader
     */
    var PrimitiveShader = function (_Shader) {
      inherits_(PrimitiveShader, _Shader)

      /**
       * @param {WebGLRenderingContext} gl - The webgl shader manager this shader works for.
       */
      function PrimitiveShader(gl) {
        class_call_check_(this, PrimitiveShader)

        return get_constructor_(this, _Shader.call(this, gl,
          // vertex shader
          ['attribute vec2 aVertexPosition;', 'attribute vec4 aColor;', 'uniform mat3 translationMatrix;', 'uniform mat3 projectionMatrix;', 'uniform float alpha;', 'uniform vec3 tint;', 'varying vec4 vColor;', 'void main(void){', '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);', '   vColor = aColor * vec4(tint * alpha, alpha);', '}'].join('\n'),
          // fragment shader
          ['varying vec4 vColor;', 'void main(void){', '   gl_FragColor = vColor;', '}'].join('\n')))
      }

      return PrimitiveShader
    }(_Shader3.default)

    exports.default = PrimitiveShader

  }, {
    "../../../Shader": 44
  }],
  60: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.default = buildCircle

    var _buildLine = $require('./buildLine')

    var _buildLine2 = interop_require_default_(_buildLine)

    var _const = $require('../../../const')

    var _utils = $require('../../../utils')

    
    /**
     * Builds a circle to draw
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object to draw
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     * @param {object} webGLDataNativeLines - an object containing all the webGL-specific information to create nativeLines
     */
    function buildCircle(graphicsData, webGLData, webGLDataNativeLines) {
      // need to convert points to a nice regular data
      var circleData = graphicsData.shape
      var x = circleData.x
      var y = circleData.y
      var width = void 0
      var height = void 0

      // TODO - bit hacky??
      if (graphicsData.type === _const.SHAPES.CIRC) {
        width = circleData.radius
        height = circleData.radius
      } else {
        width = circleData.width
        height = circleData.height
      }

      if (width === 0 || height === 0) {
        return
      }

      var totalSegs = Math.floor(30 * Math.sqrt(circleData.radius)) || Math.floor(15 * Math.sqrt(circleData.width + circleData.height))

      var seg = Math.PI * 2 / totalSegs

      if (graphicsData.fill) {
        var color = (0, _utils.hex2rgb)(graphicsData.fillColor)
        var alpha = graphicsData.fillAlpha

        var r = color[0] * alpha
        var g = color[1] * alpha
        var b = color[2] * alpha

        var verts = webGLData.points
        var indices = webGLData.indices

        var vecPos = verts.length / 6

        indices.push(vecPos)

        for (var i = 0; i < totalSegs + 1; i++) {
          verts.push(x, y, r, g, b, alpha)

          verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha)

          indices.push(vecPos++, vecPos++)
        }

        indices.push(vecPos - 1)
      }

      if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points

        graphicsData.points = []

        for (var _i = 0; _i < totalSegs + 1; _i++) {
          graphicsData.points.push(x + Math.sin(seg * -_i) * width, y + Math.cos(seg * -_i) * height)
        }

        (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines)

        graphicsData.points = tempPoints
      }
    }

  }, {
    "../../../const": 46,
    "../../../utils": 125,
    "./buildLine": 61
  }],
  61: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    exports.default = function (graphicsData, webGLData, webGLDataNativeLines) {
      if (graphicsData.nativeLines) {
        buildNativeLine(graphicsData, webGLDataNativeLines)
      } else {
        buildLine(graphicsData, webGLData)
      }
    }

    var _math = $require('../../../math')

    var _utils = $require('../../../utils')

    /**
     * Builds a line to draw using the poligon method.
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     */
    function buildLine(graphicsData, webGLData) {
      // TODO OPTIMISE!
      var points = graphicsData.points

      if (points.length === 0) {
        return
      }
      // if the line width is an odd number add 0.5 to align to a whole pixel
      // commenting this out fixes #711 and #1620
      // if (graphicsData.lineWidth%2)
      // {
      //     for (i = 0; i < points.length; i++)
      //     {
      //         points[i] += 0.5
      //     }
      // }

      // get first and last point.. figure out the middle!
      var firstPoint = new _math.Point(points[0], points[1])
      var lastPoint = new _math.Point(points[points.length - 2], points[points.length - 1])

      // if the first point is the last point - gonna have issues :)
      if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
        // need to clone as we are going to slightly modify the shape..
        points = points.slice()

        points.pop()
        points.pop()

        lastPoint = new _math.Point(points[points.length - 2], points[points.length - 1])

        var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5
        var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5

        points.unshift(midPointX, midPointY)
        points.push(midPointX, midPointY)
      }

      var verts = webGLData.points
      var indices = webGLData.indices
      var length = points.length / 2
      var indexCount = points.length
      var indexStart = verts.length / 6

      // DRAW the Line
      var width = graphicsData.lineWidth / 2

      // sort color
      var color = (0, _utils.hex2rgb)(graphicsData.lineColor)
      var alpha = graphicsData.lineAlpha
      var r = color[0] * alpha
      var g = color[1] * alpha
      var b = color[2] * alpha

      var p1x = points[0]
      var p1y = points[1]
      var p2x = points[2]
      var p2y = points[3]
      var p3x = 0
      var p3y = 0

      var perpx = -(p1y - p2y)
      var perpy = p1x - p2x
      var perp2x = 0
      var perp2y = 0
      var perp3x = 0
      var perp3y = 0

      var dist = Math.sqrt(perpx * perpx + perpy * perpy)

      perpx /= dist
      perpy /= dist
      perpx *= width
      perpy *= width

      var ratio = graphicsData.lineAlignment; // 0.5
      var r1 = (1 - ratio) * 2
      var r2 = ratio * 2

      // start
      verts.push(p1x - perpx * r1, p1y - perpy * r1, r, g, b, alpha)

      verts.push(p1x + perpx * r2, p1y + perpy * r2, r, g, b, alpha)

      for (var i = 1; i < length - 1; ++i) {
        p1x = points[(i - 1) * 2]
        p1y = points[(i - 1) * 2 + 1]

        p2x = points[i * 2]
        p2y = points[i * 2 + 1]

        p3x = points[(i + 1) * 2]
        p3y = points[(i + 1) * 2 + 1]

        perpx = -(p1y - p2y)
        perpy = p1x - p2x

        dist = Math.sqrt(perpx * perpx + perpy * perpy)
        perpx /= dist
        perpy /= dist
        perpx *= width
        perpy *= width

        perp2x = -(p2y - p3y)
        perp2y = p2x - p3x

        dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y)
        perp2x /= dist
        perp2y /= dist
        perp2x *= width
        perp2y *= width

        var a1 = -perpy + p1y - (-perpy + p2y)
        var b1 = -perpx + p2x - (-perpx + p1x)
        var c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y)
        var a2 = -perp2y + p3y - (-perp2y + p2y)
        var b2 = -perp2x + p2x - (-perp2x + p3x)
        var c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y)

        var denom = a1 * b2 - a2 * b1

        if (Math.abs(denom) < 0.1) {
          denom += 10.1
          verts.push(p2x - perpx * r1, p2y - perpy * r1, r, g, b, alpha)

          verts.push(p2x + perpx * r2, p2y + perpy * r2, r, g, b, alpha)

          continue
        }

        var px = (b1 * c2 - b2 * c1) / denom
        var py = (a2 * c1 - a1 * c2) / denom
        var pdist = (px - p2x) * (px - p2x) + (py - p2y) * (py - p2y)

        if (pdist > 196 * width * width) {
          perp3x = perpx - perp2x
          perp3y = perpy - perp2y

          dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y)
          perp3x /= dist
          perp3y /= dist
          perp3x *= width
          perp3y *= width

          verts.push(p2x - perp3x * r1, p2y - perp3y * r1)
          verts.push(r, g, b, alpha)

          verts.push(p2x + perp3x * r2, p2y + perp3y * r2)
          verts.push(r, g, b, alpha)

          verts.push(p2x - perp3x * r2 * r1, p2y - perp3y * r1)
          verts.push(r, g, b, alpha)

          indexCount++
        } else {
          verts.push(p2x + (px - p2x) * r1, p2y + (py - p2y) * r1)
          verts.push(r, g, b, alpha)

          verts.push(p2x - (px - p2x) * r2, p2y - (py - p2y) * r2)
          verts.push(r, g, b, alpha)
        }
      }

      p1x = points[(length - 2) * 2]
      p1y = points[(length - 2) * 2 + 1]

      p2x = points[(length - 1) * 2]
      p2y = points[(length - 1) * 2 + 1]

      perpx = -(p1y - p2y)
      perpy = p1x - p2x

      dist = Math.sqrt(perpx * perpx + perpy * perpy)
      perpx /= dist
      perpy /= dist
      perpx *= width
      perpy *= width

      verts.push(p2x - perpx * r1, p2y - perpy * r1)
      verts.push(r, g, b, alpha)

      verts.push(p2x + perpx * r2, p2y + perpy * r2)
      verts.push(r, g, b, alpha)

      indices.push(indexStart)

      for (var _i = 0; _i < indexCount; ++_i) {
        indices.push(indexStart++)
      }

      indices.push(indexStart - 1)
    }

    /**
     * Builds a line to draw using the gl.drawArrays(gl.LINES) method
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     */


    /**
     * Builds a line to draw
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     * @param {object} webGLDataNativeLines - an object containing all the webGL-specific information to create nativeLines
     */
    function buildNativeLine(graphicsData, webGLData) {
      var i = 0
      var points = graphicsData.points

      if (points.length === 0) return

      var verts = webGLData.points
      var length = points.length / 2

      // sort color
      var color = (0, _utils.hex2rgb)(graphicsData.lineColor)
      var alpha = graphicsData.lineAlpha
      var r = color[0] * alpha
      var g = color[1] * alpha
      var b = color[2] * alpha

      for (i = 1; i < length; i++) {
        var p1x = points[(i - 1) * 2]
        var p1y = points[(i - 1) * 2 + 1]

        var p2x = points[i * 2]
        var p2y = points[i * 2 + 1]

        verts.push(p1x, p1y)
        verts.push(r, g, b, alpha)

        verts.push(p2x, p2y)
        verts.push(r, g, b, alpha)
      }
    }

  }, {
    "../../../math": 70,
    "../../../utils": 125
  }],
  62: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.default = buildPoly

    var _buildLine = $require('./buildLine')

    var _buildLine2 = interop_require_default_(_buildLine)

    var _utils = $require('../../../utils')

    var _earcut = $require('earcut')

    var _earcut2 = interop_require_default_(_earcut)

    
    /**
     * Builds a polygon to draw
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     * @param {object} webGLDataNativeLines - an object containing all the webGL-specific information to create nativeLines
     */
    function buildPoly(graphicsData, webGLData, webGLDataNativeLines) {
      graphicsData.points = graphicsData.shape.points.slice()

      var points = graphicsData.points

      if (graphicsData.fill && points.length >= 6) {
        var holeArray = []
        // Process holes..
        var holes = graphicsData.holes

        for (var i = 0; i < holes.length; i++) {
          var hole = holes[i]

          holeArray.push(points.length / 2)

          points = points.concat(hole.points)
        }

        // get first and last point.. figure out the middle!
        var verts = webGLData.points
        var indices = webGLData.indices

        var length = points.length / 2

        // sort color
        var color = (0, _utils.hex2rgb)(graphicsData.fillColor)
        var alpha = graphicsData.fillAlpha
        var r = color[0] * alpha
        var g = color[1] * alpha
        var b = color[2] * alpha

        var triangles = (0, _earcut2.default)(points, holeArray, 2)

        if (!triangles) {
          return
        }

        var vertPos = verts.length / 6

        for (var _i = 0; _i < triangles.length; _i += 3) {
          indices.push(triangles[_i] + vertPos)
          indices.push(triangles[_i] + vertPos)
          indices.push(triangles[_i + 1] + vertPos)
          indices.push(triangles[_i + 2] + vertPos)
          indices.push(triangles[_i + 2] + vertPos)
        }

        for (var _i2 = 0; _i2 < length; _i2++) {
          verts.push(points[_i2 * 2], points[_i2 * 2 + 1], r, g, b, alpha)
        }
      }

      if (graphicsData.lineWidth > 0) {
        (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines)
      }
    }

  }, {
    "../../../utils": 125,
    "./buildLine": 61,
    "earcut": 2
  }],
  63: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.default = buildRectangle

    var _buildLine = $require('./buildLine')

    var _buildLine2 = interop_require_default_(_buildLine)

    var _utils = $require('../../../utils')

    
    /**
     * Builds a rectangle to draw
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     * @param {object} webGLDataNativeLines - an object containing all the webGL-specific information to create nativeLines
     */
    function buildRectangle(graphicsData, webGLData, webGLDataNativeLines) {
      // --- //
      // need to convert points to a nice regular data
      //
      var rectData = graphicsData.shape
      var x = rectData.x
      var y = rectData.y
      var width = rectData.width
      var height = rectData.height

      if (graphicsData.fill) {
        var color = (0, _utils.hex2rgb)(graphicsData.fillColor)
        var alpha = graphicsData.fillAlpha

        var r = color[0] * alpha
        var g = color[1] * alpha
        var b = color[2] * alpha

        var verts = webGLData.points
        var indices = webGLData.indices

        var vertPos = verts.length / 6

        // start
        verts.push(x, y)
        verts.push(r, g, b, alpha)

        verts.push(x + width, y)
        verts.push(r, g, b, alpha)

        verts.push(x, y + height)
        verts.push(r, g, b, alpha)

        verts.push(x + width, y + height)
        verts.push(r, g, b, alpha)

        // insert 2 dead triangles..
        indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3)
      }

      if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points

        graphicsData.points = [x, y, x + width, y, x + width, y + height, x, y + height, x, y]

        (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines)

        graphicsData.points = tempPoints
      }
    }

  }, {
    "../../../utils": 125,
    "./buildLine": 61
  }],
  64: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.default = buildRoundedRectangle

    var _earcut = $require('earcut')

    var _earcut2 = interop_require_default_(_earcut)

    var _buildLine = $require('./buildLine')

    var _buildLine2 = interop_require_default_(_buildLine)

    var _utils = $require('../../../utils')

    
    /**
     * Builds a rounded rectangle to draw
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
     * @param {object} webGLData - an object containing all the webGL-specific information to create this shape
     * @param {object} webGLDataNativeLines - an object containing all the webGL-specific information to create nativeLines
     */
    function buildRoundedRectangle(graphicsData, webGLData, webGLDataNativeLines) {
      var rrectData = graphicsData.shape
      var x = rrectData.x
      var y = rrectData.y
      var width = rrectData.width
      var height = rrectData.height

      var radius = rrectData.radius

      var recPoints = []

      recPoints.push(x, y + radius)
      quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height, recPoints)
      quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius, recPoints)
      quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y, recPoints)
      quadraticBezierCurve(x + radius, y, x, y, x, y + radius + 0.0000000001, recPoints)

      // this tiny number deals with the issue that occurs when points overlap and earcut fails to triangulate the item.
      // TODO - fix this properly, this is not very elegant.. but it works for now.

      if (graphicsData.fill) {
        var color = (0, _utils.hex2rgb)(graphicsData.fillColor)
        var alpha = graphicsData.fillAlpha

        var r = color[0] * alpha
        var g = color[1] * alpha
        var b = color[2] * alpha

        var verts = webGLData.points
        var indices = webGLData.indices

        var vecPos = verts.length / 6

        var triangles = (0, _earcut2.default)(recPoints, null, 2)

        for (var i = 0, j = triangles.length; i < j; i += 3) {
          indices.push(triangles[i] + vecPos)
          indices.push(triangles[i] + vecPos)
          indices.push(triangles[i + 1] + vecPos)
          indices.push(triangles[i + 2] + vecPos)
          indices.push(triangles[i + 2] + vecPos)
        }

        for (var _i = 0, _j = recPoints.length; _i < _j; _i++) {
          verts.push(recPoints[_i], recPoints[++_i], r, g, b, alpha)
        }
      }

      if (graphicsData.lineWidth) {
        var tempPoints = graphicsData.points

        graphicsData.points = recPoints

        (0, _buildLine2.default)(graphicsData, webGLData, webGLDataNativeLines)

        graphicsData.points = tempPoints
      }
    }

    /**
     * Calculate a single point for a quadratic bezier curve.
     * Utility function used by quadraticBezierCurve.
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {number} n1 - first number
     * @param {number} n2 - second number
     * @param {number} perc - percentage
     * @return {number} the result
     *
     */
    function getPt(n1, n2, perc) {
      var diff = n2 - n1

      return n1 + diff * perc
    }

    /**
     * Calculate the points for a quadratic bezier curve. (helper function..)
     * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @private
     * @param {number} fromX - Origin point x
     * @param {number} fromY - Origin point x
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @param {number[]} [out=[]] - The output array to add points into. If not passed, a new array is created.
     * @return {number[]} an array of points
     */
    function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY) {
      var out = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : []

      var n = 20
      var points = out

      var xa = 0
      var ya = 0
      var xb = 0
      var yb = 0
      var x = 0
      var y = 0

      for (var i = 0, j = 0; i <= n; ++i) {
        j = i / n

        // The Green Line
        xa = getPt(fromX, cpX, j)
        ya = getPt(fromY, cpY, j)
        xb = getPt(cpX, toX, j)
        yb = getPt(cpY, toY, j)

        // The Black Dot
        x = getPt(xa, xb, j)
        y = getPt(ya, yb, j)

        points.push(x, y)
      }

      return points
    }

  }, {
    "../../../utils": 125,
    "./buildLine": 61,
    "earcut": 2
  }],
  65: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.autoDetectRenderer = exports.Application = exports.Filter = exports.SpriteMaskFilter = exports.Quad = exports.RenderTarget = exports.ObjectRenderer = exports.WebGLManager = exports.Shader = exports.CanvasRenderTarget = exports.TextureUvs = exports.VideoBaseTexture = exports.BaseRenderTexture = exports.RenderTexture = exports.BaseTexture = exports.TextureMatrix = exports.Texture = exports.Spritesheet = exports.CanvasGraphicsRenderer = exports.GraphicsRenderer = exports.GraphicsData = exports.Graphics = exports.TextMetrics = exports.TextStyle = exports.Text = exports.SpriteRenderer = exports.CanvasTinter = exports.CanvasSpriteRenderer = exports.Sprite = exports.TransformBase = exports.TransformStatic = exports.Transform = exports.Container = exports.DisplayObject = exports.Bounds = exports.glCore = exports.WebGLRenderer = exports.CanvasRenderer = exports.ticker = exports.utils = exports.settings = undefined

    var _const = $require('./const')

    Object.keys(_const).forEach(function (key) {
      if (key === "default" || key === "__esModule") return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _const[key]
        }
      })
    })

    var _math = $require('./math')

    Object.keys(_math).forEach(function (key) {
      if (key === "default" || key === "__esModule") return
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _math[key]
        }
      })
    })

    var _pixiGlCore = $require('pixi-gl-core')

    Object.defineProperty(exports, 'glCore', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_pixiGlCore).default
      }
    })

    var _Bounds = $require('./display/Bounds')

    Object.defineProperty(exports, 'Bounds', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Bounds).default
      }
    })

    var _DisplayObject = $require('./display/DisplayObject')

    Object.defineProperty(exports, 'DisplayObject', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_DisplayObject).default
      }
    })

    var _Container = $require('./display/Container')

    Object.defineProperty(exports, 'Container', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Container).default
      }
    })

    var _Transform = $require('./display/Transform')

    Object.defineProperty(exports, 'Transform', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Transform).default
      }
    })

    var _TransformStatic = $require('./display/TransformStatic')

    Object.defineProperty(exports, 'TransformStatic', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TransformStatic).default
      }
    })

    var _TransformBase = $require('./display/TransformBase')

    Object.defineProperty(exports, 'TransformBase', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TransformBase).default
      }
    })

    var _Sprite = $require('./sprites/Sprite')

    Object.defineProperty(exports, 'Sprite', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Sprite).default
      }
    })

    var _CanvasSpriteRenderer = $require('./sprites/canvas/CanvasSpriteRenderer')

    Object.defineProperty(exports, 'CanvasSpriteRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasSpriteRenderer).default
      }
    })

    var _CanvasTinter = $require('./sprites/canvas/CanvasTinter')

    Object.defineProperty(exports, 'CanvasTinter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasTinter).default
      }
    })

    var _SpriteRenderer = $require('./sprites/webgl/SpriteRenderer')

    Object.defineProperty(exports, 'SpriteRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_SpriteRenderer).default
      }
    })

    var _Text = $require('./text/Text')

    Object.defineProperty(exports, 'Text', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Text).default
      }
    })

    var _TextStyle = $require('./text/TextStyle')

    Object.defineProperty(exports, 'TextStyle', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TextStyle).default
      }
    })

    var _TextMetrics = $require('./text/TextMetrics')

    Object.defineProperty(exports, 'TextMetrics', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TextMetrics).default
      }
    })

    var _Graphics = $require('./graphics/Graphics')

    Object.defineProperty(exports, 'Graphics', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Graphics).default
      }
    })

    var _GraphicsData = $require('./graphics/GraphicsData')

    Object.defineProperty(exports, 'GraphicsData', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_GraphicsData).default
      }
    })

    var _GraphicsRenderer = $require('./graphics/webgl/GraphicsRenderer')

    Object.defineProperty(exports, 'GraphicsRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_GraphicsRenderer).default
      }
    })

    var _CanvasGraphicsRenderer = $require('./graphics/canvas/CanvasGraphicsRenderer')

    Object.defineProperty(exports, 'CanvasGraphicsRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasGraphicsRenderer).default
      }
    })

    var _Spritesheet = $require('./textures/Spritesheet')

    Object.defineProperty(exports, 'Spritesheet', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Spritesheet).default
      }
    })

    var _Texture = $require('./textures/Texture')

    Object.defineProperty(exports, 'Texture', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Texture).default
      }
    })

    var _TextureMatrix = $require('./textures/TextureMatrix')

    Object.defineProperty(exports, 'TextureMatrix', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TextureMatrix).default
      }
    })

    var _BaseTexture = $require('./textures/BaseTexture')

    Object.defineProperty(exports, 'BaseTexture', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BaseTexture).default
      }
    })

    var _RenderTexture = $require('./textures/RenderTexture')

    Object.defineProperty(exports, 'RenderTexture', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_RenderTexture).default
      }
    })

    var _BaseRenderTexture = $require('./textures/BaseRenderTexture')

    Object.defineProperty(exports, 'BaseRenderTexture', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BaseRenderTexture).default
      }
    })

    var _VideoBaseTexture = $require('./textures/VideoBaseTexture')

    Object.defineProperty(exports, 'VideoBaseTexture', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_VideoBaseTexture).default
      }
    })

    var _TextureUvs = $require('./textures/TextureUvs')

    Object.defineProperty(exports, 'TextureUvs', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TextureUvs).default
      }
    })

    var _CanvasRenderTarget = $require('./renderers/canvas/utils/CanvasRenderTarget')

    Object.defineProperty(exports, 'CanvasRenderTarget', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasRenderTarget).default
      }
    })

    var _Shader = $require('./Shader')

    Object.defineProperty(exports, 'Shader', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Shader).default
      }
    })

    var _WebGLManager = $require('./renderers/webgl/managers/WebGLManager')

    Object.defineProperty(exports, 'WebGLManager', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_WebGLManager).default
      }
    })

    var _ObjectRenderer = $require('./renderers/webgl/utils/ObjectRenderer')

    Object.defineProperty(exports, 'ObjectRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_ObjectRenderer).default
      }
    })

    var _RenderTarget = $require('./renderers/webgl/utils/RenderTarget')

    Object.defineProperty(exports, 'RenderTarget', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_RenderTarget).default
      }
    })

    var _Quad = $require('./renderers/webgl/utils/Quad')

    Object.defineProperty(exports, 'Quad', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Quad).default
      }
    })

    var _SpriteMaskFilter = $require('./renderers/webgl/filters/spriteMask/SpriteMaskFilter')

    Object.defineProperty(exports, 'SpriteMaskFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_SpriteMaskFilter).default
      }
    })

    var _Filter = $require('./renderers/webgl/filters/Filter')

    Object.defineProperty(exports, 'Filter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Filter).default
      }
    })

    var _Application = $require('./Application')

    Object.defineProperty(exports, 'Application', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Application).default
      }
    })

    var _autoDetectRenderer = $require('./autoDetectRenderer')

    Object.defineProperty(exports, 'autoDetectRenderer', {
      enumerable: true,
      get: function get() {
        return _autoDetectRenderer.autoDetectRenderer
      }
    })

    var _utils = $require('./utils')

    var utils = interop_require_wildcard_(_utils)

    var _ticker = $require('./ticker')

    var ticker = interop_require_wildcard_(_ticker)

    var _settings = $require('./settings')

    var _settings2 = interop_require_default_(_settings)

    var _CanvasRenderer = $require('./renderers/canvas/CanvasRenderer')

    var _CanvasRenderer2 = interop_require_default_(_CanvasRenderer)

    var _WebGLRenderer = $require('./renderers/webgl/WebGLRenderer')

    var _WebGLRenderer2 = interop_require_default_(_WebGLRenderer)

        
    exports.settings = _settings2.default
    exports.utils = utils
    exports.ticker = ticker
    exports.CanvasRenderer = _CanvasRenderer2.default
    exports.WebGLRenderer = _WebGLRenderer2.default
    /**
     * @namespace PIXI
     */
  }, {
    "./Application": 43,
    "./Shader": 44,
    "./autoDetectRenderer": 45,
    "./const": 46,
    "./display/Bounds": 47,
    "./display/Container": 48,
    "./display/DisplayObject": 49,
    "./display/Transform": 50,
    "./display/TransformBase": 51,
    "./display/TransformStatic": 52,
    "./graphics/Graphics": 53,
    "./graphics/GraphicsData": 54,
    "./graphics/canvas/CanvasGraphicsRenderer": 55,
    "./graphics/webgl/GraphicsRenderer": 57,
    "./math": 70,
    "./renderers/canvas/CanvasRenderer": 77,
    "./renderers/canvas/utils/CanvasRenderTarget": 79,
    "./renderers/webgl/WebGLRenderer": 84,
    "./renderers/webgl/filters/Filter": 86,
    "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 89,
    "./renderers/webgl/managers/WebGLManager": 93,
    "./renderers/webgl/utils/ObjectRenderer": 94,
    "./renderers/webgl/utils/Quad": 95,
    "./renderers/webgl/utils/RenderTarget": 96,
    "./settings": 101,
    "./sprites/Sprite": 102,
    "./sprites/canvas/CanvasSpriteRenderer": 103,
    "./sprites/canvas/CanvasTinter": 104,
    "./sprites/webgl/SpriteRenderer": 106,
    "./text/Text": 108,
    "./text/TextMetrics": 109,
    "./text/TextStyle": 110,
    "./textures/BaseRenderTexture": 111,
    "./textures/BaseTexture": 112,
    "./textures/RenderTexture": 113,
    "./textures/Spritesheet": 114,
    "./textures/Texture": 115,
    "./textures/TextureMatrix": 116,
    "./textures/TextureUvs": 117,
    "./textures/VideoBaseTexture": 118,
    "./ticker": 121,
    "./utils": 125,
    "pixi-gl-core": 15
  }],
  66: [function ($require, container, exports) {
    container.exports = GroupD8
  }, {
    "./Matrix": 67
  }],
  67: [function ($require, container, exports) {
    container.exports = Matrix
  }, {
    "../const": 46,
    "./Point": 69
  }],
  68: [function ($require, container, exports) {
    container.exports = ObservablePoint
  }, {}],
  69: [function ($require, container, exports) {
    container.exports = Point
  }, {}],
  70: [function ($require, container, exports) {
    container.exports = math
  }, {
    "./GroupD8": 66,
    "./Matrix": 67,
    "./ObservablePoint": 68,
    "./Point": 69,
    "./shapes/Circle": 71,
    "./shapes/Ellipse": 72,
    "./shapes/Polygon": 73,
    "./shapes/Rectangle": 74,
    "./shapes/RoundedRectangle": 75
  }],
  71: [function ($require, container, exports) {
    container.exports = Circle
  }, {
    "../../const": 46,
    "./Rectangle": 74
  }],
  72: [function ($require, container, exports) {
    container.exports = Ellipse
  }, {
    "../../const": 46,
    "./Rectangle": 74
  }],
  73: [function ($require, container, exports) {
    container.exports = Polygon
  }, {
    "../../const": 46,
    "../Point": 69
  }],
  74: [function ($require, container, exports) {
    container.exports = Rectangle
  }, {
    "../../const": 46
  }],
  75: [function ($require, container, exports) {
    container.exports = RoundedRectangle
  }, {
    "../../const": 46
  }],
  76: [function ($require, container, exports) {
    container.exports = SystemRenderer
  }, {
    "../const": 46,
    "../display/Container": 48,
    "../math": 70,
    "../settings": 101,
    "../textures/RenderTexture": 113,
    "../utils": 125,
    "eventemitter3": 3
  }],
  77: [function ($require, container, exports) {
    container.exports = CanvasRenderer
  }, {
    "../../const": 46,
    "../../settings": 101,
    "../../utils": 125,
    "../SystemRenderer": 76,
    "./utils/CanvasMaskManager": 78,
    "./utils/CanvasRenderTarget": 79,
    "./utils/mapCanvasBlendModesToPixi": 81
  }],
  78: [function ($require, container, exports) {
    container.exports = CanvasMaskManager
  }, {
    "../../../const": 46
  }],
  79: [function ($require, container, exports) {
    container.exports = CanvasRenderTarget
  }, {
    "../../../settings": 101
  }],
  80: [function ($require, container, exports) {
    container.exports = canUseNewCanvasBlendModes
  }, {}],
  81: [function ($require, container, exports) {
    container.exports = mapCanvasBlendModesToPixi
  }, {
    "../../../const": 46,
    "./canUseNewCanvasBlendModes": 80
  }],
  82: [function ($require, container, exports) {
    container.exports = TextureGarbageCollector
  }, {
    "../../const": 46,
    "../../settings": 101
  }],
  83: [function ($require, container, exports) {
    container.exports = TextureManager
  }, {
    "../../const": 46,
    "../../utils": 125,
    "./utils/RenderTarget": 96,
    "pixi-gl-core": 15
  }],
  84: [function ($require, container, exports) {
    container.exports = WebGLRenderer
  }, {
    "../../const": 46,
    "../../textures/BaseTexture": 112,
    "../../utils": 125,
    "../SystemRenderer": 76,
    "./TextureGarbageCollector": 82,
    "./TextureManager": 83,
    "./WebGLState": 85,
    "./managers/FilterManager": 90,
    "./managers/MaskManager": 91,
    "./managers/StencilManager": 92,
    "./utils/ObjectRenderer": 94,
    "./utils/RenderTarget": 96,
    "./utils/mapWebGLDrawModesToPixi": 99,
    "./utils/validateContext": 100,
    "pixi-gl-core": 15
  }],
  85: [function ($require, container, exports) {
    container.exports = WebGLState
  }, {
    "./utils/mapWebGLBlendModesToPixi": 98
  }],
  86: [function ($require, container, exports) {
    container.exports = Filter
  }, {
    "../../../const": 46,
    "../../../settings": 101,
    "../../../utils": 125,
    "./extractUniformsFromSrc": 87
  }],
  87: [function ($require, container, exports) {
    container.exports = extractUniformsFromSrc
  }, {
    "pixi-gl-core": 15
  }],
  88: [function ($require, container, exports) {
    export_to_(filterTransforms, exports)
  }, {
    "../../../math": 70
  }],
  89: [function ($require, container, exports) {
    container.exports = SpriteMaskFilter
  }, {
    "../../../../math": 70,
    "../../../../textures/TextureMatrix": 116,
    "../Filter": 86,
    "path": 8
  }],
  90: [function ($require, container, exports) {
    container.exports = FilterManager
  }, {
    "../../../Shader": 44,
    "../../../math": 70,
    "../filters/filterTransforms": 88,
    "../utils/Quad": 95,
    "../utils/RenderTarget": 96,
    "./WebGLManager": 93,
    "bit-twiddle": 1
  }],
  91: [function ($require, container, exports) {
    container.exports = MaskManager
  }, {
    "../filters/spriteMask/SpriteMaskFilter": 89,
    "./WebGLManager": 93
  }],
  92: [function ($require, container, exports) {
    container.exports = StencilManager
  }, {
    "./WebGLManager": 93
  }],
  93: [function ($require, container, exports) {
    container.exports = WebGLManager
  }, {}],
  94: [function ($require, container, exports) {
    container.exports = ObjectRenderer
  }, {
    "../managers/WebGLManager": 93
  }],
  95: [function ($require, container, exports) {
    container.exports = Quad
  }, {
    "../../../utils/createIndicesForQuads": 123,
    "pixi-gl-core": 15
  }],
  96: [function ($require, container, exports) {
    container.exports = RenderTarget
  }, {
    "../../../const": 46,
    "../../../math": 70,
    "../../../settings": 101,
    "pixi-gl-core": 15
  }],
  97: [function ($require, container, exports) {
    container.exports = checkMaxIfStatmentsInShader
  }, {
    "pixi-gl-core": 15
  }],
  98: [function ($require, container, exports) {
    container.exports = mapWebGLBlendModesToPixi
  }, {
    "../../../const": 46
  }],
  99: [function ($require, container, exports) {
    container.exports = mapWebGLDrawModesToPixi
  }, {
    "../../../const": 46
  }],
  100: [function ($require, container, exports) {
    container.exports = validateContext
  }, {}],
  101: [function ($require, container, exports) {
    container.exports = settings
  }, {
    "./utils/canUploadSameBuffer": 122,
    "./utils/maxRecommendedTextures": 127
  }],
  102: [function ($require, container, exports) {
    container.exports = Sprite
  }, {
    "../const": 46,
    "../display/Container": 48,
    "../math": 70,
    "../textures/Texture": 115,
    "../utils": 125
  }],
  103: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _CanvasRenderer = $require('../../renderers/canvas/CanvasRenderer')

    var _CanvasRenderer2 = interop_require_default_(_CanvasRenderer)

    var _const = $require('../../const')

    var _math = $require('../../math')

    var _CanvasTinter = $require('./CanvasTinter')

    var _CanvasTinter2 = interop_require_default_(_CanvasTinter)

    
    
    var canvasRenderWorldTransform = new _math.Matrix()

    /**
     * @author Mat Groves
     *
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original PixiJS version!
     * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that they now
     * share 4 bytes on the vertex buffer
     *
     * Heavily inspired by LibGDX's CanvasSpriteRenderer:
     * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/CanvasSpriteRenderer.java
     */

    /**
     * Renderer dedicated to drawing and batching sprites.
     *
     * @class
     * @private
     * @memberof PIXI
     */
    var CanvasSpriteRenderer = function () {
      /**
       * @param {PIXI.WebGLRenderer} renderer -The renderer sprite this batch works for.
       */
      function CanvasSpriteRenderer(renderer) {
        class_call_check_(this, CanvasSpriteRenderer)

        this.renderer = renderer
      }

      /**
       * Renders the sprite object.
       *
       * @param {PIXI.Sprite} sprite - the sprite to render when using this spritebatch
       */
      CanvasSpriteRenderer.prototype.render = function render(sprite) {
        var texture = sprite._texture
        var renderer = this.renderer

        var width = texture._frame.width
        var height = texture._frame.height

        var wt = sprite.transform.worldTransform
        var dx = 0
        var dy = 0

        if (texture.orig.width <= 0 || texture.orig.height <= 0 || !texture.baseTexture.source) {
          return
        }

        renderer.setBlendMode(sprite.blendMode)

        //  Ignore null sources
        if (texture.valid) {
          renderer.context.globalAlpha = sprite.worldAlpha

          // If smoothingEnabled is supported and we need to change the smoothing property for sprite texture
          var smoothingEnabled = texture.baseTexture.scaleMode === _const.SCALE_MODES.LINEAR

          if (renderer.smoothProperty && renderer.context[renderer.smoothProperty] !== smoothingEnabled) {
            renderer.context[renderer.smoothProperty] = smoothingEnabled
          }

          if (texture.trim) {
            dx = texture.trim.width / 2 + texture.trim.x - sprite.anchor.x * texture.orig.width
            dy = texture.trim.height / 2 + texture.trim.y - sprite.anchor.y * texture.orig.height
          } else {
            dx = (0.5 - sprite.anchor.x) * texture.orig.width
            dy = (0.5 - sprite.anchor.y) * texture.orig.height
          }

          if (texture.rotate) {
            wt.copy(canvasRenderWorldTransform)
            wt = canvasRenderWorldTransform
            _math.GroupD8.matrixAppendRotationInv(wt, texture.rotate, dx, dy)
            // the anchor has already been applied above, so lets set it to zero
            dx = 0
            dy = 0
          }

          dx -= width / 2
          dy -= height / 2

          // Allow for pixel rounding
          if (renderer.roundPixels) {
            renderer.context.setTransform(wt.a, wt.b, wt.c, wt.d, wt.tx * renderer.resolution | 0, wt.ty * renderer.resolution | 0)

            dx = dx | 0
            dy = dy | 0
          } else {
            renderer.context.setTransform(wt.a, wt.b, wt.c, wt.d, wt.tx * renderer.resolution, wt.ty * renderer.resolution)
          }

          var resolution = texture.baseTexture.resolution

          if (sprite.tint !== 0xFFFFFF) {
            if (sprite.cachedTint !== sprite.tint || sprite.tintedTexture.tintId !== sprite._texture._updateID) {
              sprite.cachedTint = sprite.tint

              // TODO clean up caching - how to clean up the caches?
              sprite.tintedTexture = _CanvasTinter2.default.getTintedTexture(sprite, sprite.tint)
            }

            renderer.context.drawImage(sprite.tintedTexture, 0, 0, width * resolution, height * resolution, dx * renderer.resolution, dy * renderer.resolution, width * renderer.resolution, height * renderer.resolution)
          } else {
            renderer.context.drawImage(texture.baseTexture.source, texture._frame.x * resolution, texture._frame.y * resolution, width * resolution, height * resolution, dx * renderer.resolution, dy * renderer.resolution, width * renderer.resolution, height * renderer.resolution)
          }
        }
      }

      /**
       * destroy the sprite object.
       *
       */
      CanvasSpriteRenderer.prototype.destroy = function destroy() {
        this.renderer = null
      }

      _CanvasRenderer2.default.registerPlugin('sprite', CanvasSpriteRenderer)

      return CanvasSpriteRenderer
    }()

    exports.default = CanvasSpriteRenderer

  }, {
    "../../const": 46,
    "../../math": 70,
    "../../renderers/canvas/CanvasRenderer": 77,
    "./CanvasTinter": 104
  }],
  104: [function ($require, container, exports) {
    exports.default = CanvasTinter
  }, {
    "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 80,
    "../../utils": 125
  }],
  105: [function ($require, container, exports) {
    container.exports = BatchBuffer
  }, {}],
  106: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _ObjectRenderer2 = $require('../../renderers/webgl/utils/ObjectRenderer')

    var _ObjectRenderer3 = interop_require_default_(_ObjectRenderer2)

    var _WebGLRenderer = $require('../../renderers/webgl/WebGLRenderer')

    var _WebGLRenderer2 = interop_require_default_(_WebGLRenderer)

    var _createIndicesForQuads = $require('../../utils/createIndicesForQuads')

    var _createIndicesForQuads2 = interop_require_default_(_createIndicesForQuads)

    var _generateMultiTextureShader = $require('./generateMultiTextureShader')

    var _generateMultiTextureShader2 = interop_require_default_(_generateMultiTextureShader)

    var _checkMaxIfStatmentsInShader = $require('../../renderers/webgl/utils/checkMaxIfStatmentsInShader')

    var _checkMaxIfStatmentsInShader2 = interop_require_default_(_checkMaxIfStatmentsInShader)

    var _BatchBuffer = $require('./BatchBuffer')

    var _BatchBuffer2 = interop_require_default_(_BatchBuffer)

    var _settings = $require('../../settings')

    var _settings2 = interop_require_default_(_settings)

    var _utils = $require('../../utils')

    var _pixiGlCore = $require('pixi-gl-core')

    var _pixiGlCore2 = interop_require_default_(_pixiGlCore)

    var _bitTwiddle = $require('bit-twiddle')

    var _bitTwiddle2 = interop_require_default_(_bitTwiddle)

    var TICK = 0
    var TEXTURE_TICK = 0

    /**
     * Renderer dedicated to drawing and batching sprites.
     *
     * @class
     * @private
     * @memberof PIXI
     * @extends PIXI.ObjectRenderer
     */
    var SpriteRenderer = function (_ObjectRenderer) {
      inherits_(SpriteRenderer, _ObjectRenderer)

      /**
       * @param {PIXI.WebGLRenderer} renderer - The renderer this sprite batch works for.
       */
      function SpriteRenderer(renderer) {
        class_call_check_(this, SpriteRenderer)

        /**
         * Number of values sent in the vertex buffer.
         * aVertexPosition(2), aTextureCoord(1), aColor(1), aTextureId(1) = 5
         *
         * @member {number}
         */
        var _this = get_constructor_(this, _ObjectRenderer.call(this, renderer))

        _this.vertSize = 5

        /**
         * The size of the vertex information in bytes.
         *
         * @member {number}
         */
        _this.vertByteSize = _this.vertSize * 4

        /**
         * The number of images in the SpriteRenderer before it flushes.
         *
         * @member {number}
         */
        _this.size = _settings2.default.SPRITE_BATCH_SIZE; // 2000 is a nice balance between mobile / desktop

        // the total number of bytes in our batch
        // let numVerts = this.size * 4 * this.vertByteSize

        _this.buffers = []
        for (var i = 1; i <= _bitTwiddle2.default.nextPow2(_this.size); i *= 2) {
          _this.buffers.push(new _BatchBuffer2.default(i * 4 * _this.vertByteSize))
        }

        /**
         * Holds the indices of the geometry (quads) to draw
         *
         * @member {Uint16Array}
         */
        _this.indices = (0, _createIndicesForQuads2.default)(_this.size)

        /**
         * The default shaders that is used if a sprite doesn't have a more specific one.
         * there is a shader for each number of textures that can be rendererd.
         * These shaders will also be generated on the fly as required.
         * @member {PIXI.Shader[]}
         */
        _this.shader = null

        _this.currentIndex = 0
        _this.groups = []

        for (var k = 0; k < _this.size; k++) {
          _this.groups[k] = {
            textures: [],
            textureCount: 0,
            ids: [],
            size: 0,
            start: 0,
            blend: 0
          }
        }

        _this.sprites = []

        _this.vertexBuffers = []
        _this.vaos = []

        _this.vaoMax = 2
        _this.vertexCount = 0

        _this.renderer.on('prerender', _this.onPrerender, _this)
        return _this
      }

      /**
       * Sets up the renderer context and necessary buffers.
       *
       * @private
       */
      SpriteRenderer.prototype.onContextChange = function onContextChange() {
        var gl = this.renderer.gl

        if (this.renderer.legacy) {
          this.MAX_TEXTURES = 1
        } else {
          // step 1: first check max textures the GPU can handle.
          this.MAX_TEXTURES = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), _settings2.default.SPRITE_MAX_TEXTURES)

          // step 2: check the maximum number of if statements the shader can have too..
          this.MAX_TEXTURES = (0, _checkMaxIfStatmentsInShader2.default)(this.MAX_TEXTURES, gl)
        }

        this.shader = (0, _generateMultiTextureShader2.default)(gl, this.MAX_TEXTURES)

        // create a couple of buffers
        this.indexBuffer = _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW)

        // we use the second shader as the first one depending on your browser may omit aTextureId
        // as it is not used by the shader so is optimized out.

        this.renderer.bindVao(null)

        var attrs = this.shader.attributes

        for (var i = 0; i < this.vaoMax; i++) {
          /* eslint-disable max-len */
          var vertexBuffer = this.vertexBuffers[i] = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW)
          /* eslint-enable max-len */

          // build the vao object that will render..
          var vao = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4)

          if (attrs.aTextureId) {
            vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4)
          }

          this.vaos[i] = vao
        }

        this.vao = this.vaos[0]
        this.currentBlendMode = 99999

        this.boundTextures = new Array(this.MAX_TEXTURES)
      }

      /**
       * Called before the renderer starts rendering.
       *
       */


      SpriteRenderer.prototype.onPrerender = function onPrerender() {
        this.vertexCount = 0
      }

      /**
       * Renders the sprite object.
       *
       * @param {PIXI.Sprite} sprite - the sprite to render when using this spritebatch
       */


      SpriteRenderer.prototype.render = function render(sprite) {
        // TODO set blend modes..
        // check texture..
        if (this.currentIndex >= this.size) {
          this.flush()
        }

        // get the uvs for the texture

        // if the uvs have not updated then no point rendering just yet!
        if (!sprite._texture._uvs) {
          return
        }

        // push a texture.
        // increment the batchsize
        this.sprites[this.currentIndex++] = sprite
      }

      /**
       * Renders the content and empties the current batch.
       *
       */


      SpriteRenderer.prototype.flush = function flush() {
        if (this.currentIndex === 0) {
          return
        }

        var gl = this.renderer.gl
        var MAX_TEXTURES = this.MAX_TEXTURES

        var np2 = _bitTwiddle2.default.nextPow2(this.currentIndex)
        var log2 = _bitTwiddle2.default.log2(np2)
        var buffer = this.buffers[log2]

        var sprites = this.sprites
        var groups = this.groups

        var float32View = buffer.float32View
        var uint32View = buffer.uint32View

        var boundTextures = this.boundTextures
        var rendererBoundTextures = this.renderer.boundTextures
        var touch = this.renderer.textureGC.count

        var index = 0
        var nextTexture = void 0
        var currentTexture = void 0
        var groupCount = 1
        var textureCount = 0
        var currentGroup = groups[0]
        var vertexData = void 0
        var uvs = void 0
        var blendMode = _utils.premultiplyBlendMode[sprites[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][sprites[0].blendMode]

        currentGroup.textureCount = 0
        currentGroup.start = 0
        currentGroup.blend = blendMode

        TICK++

        var i = void 0

        // copy textures..
        for (i = 0; i < MAX_TEXTURES; ++i) {
          var bt = rendererBoundTextures[i]

          if (bt._enabled === TICK) {
            boundTextures[i] = this.renderer.emptyTextures[i]
            continue
          }

          boundTextures[i] = bt
          bt._virtalBoundId = i
          bt._enabled = TICK
        }
        TICK++

        for (i = 0; i < this.currentIndex; ++i) {
          // upload the sprite elemetns...
          // they have all ready been calculated so we just need to push them into the buffer.
          var sprite = sprites[i]

          sprites[i] = null

          nextTexture = sprite._texture.baseTexture

          var spriteBlendMode = _utils.premultiplyBlendMode[Number(nextTexture.premultipliedAlpha)][sprite.blendMode]

          if (blendMode !== spriteBlendMode) {
            // finish a group..
            blendMode = spriteBlendMode

            // force the batch to break!
            currentTexture = null
            textureCount = MAX_TEXTURES
            TICK++
          }

          if (currentTexture !== nextTexture) {
            currentTexture = nextTexture

            if (nextTexture._enabled !== TICK) {
              if (textureCount === MAX_TEXTURES) {
                TICK++

                currentGroup.size = i - currentGroup.start

                textureCount = 0

                currentGroup = groups[groupCount++]
                currentGroup.blend = blendMode
                currentGroup.textureCount = 0
                currentGroup.start = i
              }

              nextTexture.touched = touch

              if (nextTexture._virtalBoundId === -1) {
                for (var j = 0; j < MAX_TEXTURES; ++j) {
                  var tIndex = (j + TEXTURE_TICK) % MAX_TEXTURES

                  var t = boundTextures[tIndex]

                  if (t._enabled !== TICK) {
                    TEXTURE_TICK++

                    t._virtalBoundId = -1

                    nextTexture._virtalBoundId = tIndex

                    boundTextures[tIndex] = nextTexture
                    break
                  }
                }
              }

              nextTexture._enabled = TICK

              currentGroup.textureCount++
              currentGroup.ids[textureCount] = nextTexture._virtalBoundId
              currentGroup.textures[textureCount++] = nextTexture
            }
          }

          vertexData = sprite.vertexData

          // TODO this sum does not need to be set each frame..
          uvs = sprite._texture._uvs.uvsUint32

          if (this.renderer.roundPixels) {
            var resolution = this.renderer.resolution

            // xy
            float32View[index] = (vertexData[0] * resolution | 0) / resolution
            float32View[index + 1] = (vertexData[1] * resolution | 0) / resolution

            // xy
            float32View[index + 5] = (vertexData[2] * resolution | 0) / resolution
            float32View[index + 6] = (vertexData[3] * resolution | 0) / resolution

            // xy
            float32View[index + 10] = (vertexData[4] * resolution | 0) / resolution
            float32View[index + 11] = (vertexData[5] * resolution | 0) / resolution

            // xy
            float32View[index + 15] = (vertexData[6] * resolution | 0) / resolution
            float32View[index + 16] = (vertexData[7] * resolution | 0) / resolution
          } else {
            // xy
            float32View[index] = vertexData[0]
            float32View[index + 1] = vertexData[1]

            // xy
            float32View[index + 5] = vertexData[2]
            float32View[index + 6] = vertexData[3]

            // xy
            float32View[index + 10] = vertexData[4]
            float32View[index + 11] = vertexData[5]

            // xy
            float32View[index + 15] = vertexData[6]
            float32View[index + 16] = vertexData[7]
          }

          uint32View[index + 2] = uvs[0]
          uint32View[index + 7] = uvs[1]
          uint32View[index + 12] = uvs[2]
          uint32View[index + 17] = uvs[3]
          /* eslint-disable max-len */
          var alpha = Math.min(sprite.worldAlpha, 1.0)
          // we dont call extra function if alpha is 1.0, that's faster
          var argb = alpha < 1.0 && nextTexture.premultipliedAlpha ? (0, _utils.premultiplyTint)(sprite._tintRGB, alpha) : sprite._tintRGB + (alpha * 255 << 24)

          uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = argb
          float32View[index + 4] = float32View[index + 9] = float32View[index + 14] = float32View[index + 19] = nextTexture._virtalBoundId
          /* eslint-enable max-len */

          index += 20
        }

        currentGroup.size = i - currentGroup.start

        if (!_settings2.default.CAN_UPLOAD_SAME_BUFFER) {
          // this is still needed for IOS performance..
          // it really does not like uploading to the same buffer in a single frame!
          if (this.vaoMax <= this.vertexCount) {
            this.vaoMax++

            var attrs = this.shader.attributes

            /* eslint-disable max-len */
            var vertexBuffer = this.vertexBuffers[this.vertexCount] = _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW)
            /* eslint-enable max-len */

            // build the vao object that will render..
            var vao = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0).addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4).addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4)

            if (attrs.aTextureId) {
              vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4)
            }

            this.vaos[this.vertexCount] = vao
          }

          this.renderer.bindVao(this.vaos[this.vertexCount])

          this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, false)

          this.vertexCount++
        } else {
          // lets use the faster option, always use buffer number 0
          this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, true)
        }

        for (i = 0; i < MAX_TEXTURES; ++i) {
          rendererBoundTextures[i]._virtalBoundId = -1
        }

        // render the groups..
        for (i = 0; i < groupCount; ++i) {
          var group = groups[i]
          var groupTextureCount = group.textureCount

          for (var _j = 0; _j < groupTextureCount; _j++) {
            currentTexture = group.textures[_j]

            // reset virtual ids..
            // lets do a quick check..
            if (rendererBoundTextures[group.ids[_j]] !== currentTexture) {
              this.renderer.bindTexture(currentTexture, group.ids[_j], true)
            }

            // reset the virtualId..
            currentTexture._virtalBoundId = -1
          }

          // set the blend mode..
          this.renderer.state.setBlendMode(group.blend)

          gl.drawElements(gl.TRIANGLES, group.size * 6, gl.UNSIGNED_SHORT, group.start * 6 * 2)
        }

        // reset elements for the next flush
        this.currentIndex = 0
      }

      /**
       * Starts a new sprite batch.
       */
      SpriteRenderer.prototype.start = function start() {
        this.renderer.bindShader(this.shader)

        if (_settings2.default.CAN_UPLOAD_SAME_BUFFER) {
          // bind buffer #0, we don't need others
          this.renderer.bindVao(this.vaos[this.vertexCount])

          this.vertexBuffers[this.vertexCount].bind()
        }
      }

      /**
       * Stops and flushes the current batch.
       *
       */
      SpriteRenderer.prototype.stop = function stop() {
        this.flush()
      }

      /**
       * Destroys the SpriteRenderer.
       *
       */
      SpriteRenderer.prototype.destroy = function destroy() {
        for (var i = 0; i < this.vaoMax; i++) {
          if (this.vertexBuffers[i]) {
            this.vertexBuffers[i].destroy()
          }
          if (this.vaos[i]) {
            this.vaos[i].destroy()
          }
        }

        if (this.indexBuffer) {
          this.indexBuffer.destroy()
        }

        this.renderer.off('prerender', this.onPrerender, this)

        _ObjectRenderer.prototype.destroy.call(this)

        if (this.shader) {
          this.shader.destroy()
          this.shader = null
        }

        this.vertexBuffers = null
        this.vaos = null
        this.indexBuffer = null
        this.indices = null

        this.sprites = null

        for (var _i = 0; _i < this.buffers.length; ++_i) {
          this.buffers[_i].destroy()
        }
      }

      _WebGLRenderer2.default.registerPlugin('sprite', SpriteRenderer)

      return SpriteRenderer
    }(_ObjectRenderer3.default)

    exports.default = SpriteRenderer
  }, {
    "../../renderers/webgl/WebGLRenderer": 84,
    "../../renderers/webgl/utils/ObjectRenderer": 94,
    "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 97,
    "../../settings": 101,
    "../../utils": 125,
    "../../utils/createIndicesForQuads": 123,
    "./BatchBuffer": 105,
    "./generateMultiTextureShader": 107,
    "bit-twiddle": 1,
    "pixi-gl-core": 15
  }],
  107: [function ($require, container, exports) {
    container.exports = generateMultiTextureShader
  }, {
    "../../Shader": 44,
    "path": 8
  }],
  108: [function ($require, container, exports) {
    container.exports = Text
  }, {
    "../const": 46,
    "../math": 70,
    "../settings": 101,
    "../sprites/Sprite": 102,
    "../textures/Texture": 115,
    "../utils": 125,
    "../utils/trimCanvas": 130,
    "./TextMetrics": 109,
    "./TextStyle": 110
  }],
  109: [function ($require, container, exports) {
    container.exports = TextMetrics
  }, {}],
  110: [function ($require, container, exports) {
    container.exports = TextStyle
  }, {
    "../const": 46,
    "../utils": 125
  }],
  111: [function ($require, container, exports) {
    container.exports = BaseRenderTexture
  }, {
    "../settings": 101,
    "./BaseTexture": 112
  }],
  112: [function ($require, container, exports) {
    container.exports = BaseTexture
  }, {
    "../settings": 101,
    "../utils": 125,
    "../utils/determineCrossOrigin": 124,
    "bit-twiddle": 1,
    "eventemitter3": 3
  }],
  113: [function ($require, container, exports) {
    container.exports = RenderTexture
  }, {
    "./BaseRenderTexture": 111,
    "./Texture": 115
  }],
  114: [function ($require, container, exports) {
    container.exports = Spritesheet
  }, {
    "../": 65,
    "../utils": 125
  }],
  115: [function ($require, container, exports) {
    container.exports = Texture
  }, {
    "../math": 70,
    "../settings": 101,
    "../utils": 125,
    "./BaseTexture": 112,
    "./TextureUvs": 117,
    "./VideoBaseTexture": 118,
    "eventemitter3": 3
  }],
  116: [function ($require, container, exports) {
    container.exports = TextureMatrix
  }, {
    "../math/Matrix": 67
  }],
  117: [function ($require, container, exports) {
    container.exports = TextureUvs
  }, {
    "../math/GroupD8": 66
  }],
  118: [function ($require, container, exports) {
    container.exports = VideoBaseTexture
  }, {
    "../const": 46,
    "../ticker": 121,
    "../utils": 125,
    "../utils/determineCrossOrigin": 124,
    "./BaseTexture": 112
  }],
  119: [function ($require, container, exports) {
    container.exports = Ticker
  }, {
    "../const": 46,
    "../settings": 101,
    "./TickerListener": 120
  }],
  120: [function ($require, container, exports) {
    container.exports = TickerListener
  }, {}],
  121: [function ($require, container, exports) {
    export_to_(ticker, exports)
  }, {
    "./Ticker": 119
  }],
  122: [function ($require, container, exports) {
    container.exports = canUploadSameBuffer
  }, {}],
  123: [function ($require, container, exports) {
    container.exports = createIndicesForQuads
  }, {}],
  124: [function ($require, container, exports) {
    container.exports = determineCrossOrigin
  }, {
    "url": 38
  }],
  125: [function ($require, container, exports) {
    export_to_(utils, exports)
  }, {
    "../const": 46,
    "../settings": 101,
    "./mapPremultipliedBlendModes": 126,
    "./mixin": 128,
    "./pluginTarget": 129,
    "earcut": 2,
    "eventemitter3": 3,
    "ismobilejs": 4,
    "remove-array-items": 31
  }],
  126: [function ($require, container, exports) {
    container.exports = mapPremultipliedBlendModes
  }, {
    "../const": 46
  }],
  127: [function ($require, container, exports) {
    container.exports = maxRecommendedTextures
  }, {
    "ismobilejs": 4
  }],
  128: [function ($require, container, exports) {
    export_to_(mixins, exports)
  }, {}],
  129: [function ($require, container, exports) {
    container.exports = PluginTarget
  }, {}],
  130: [function ($require, container, exports) {
    container.exports = trimCanvas
  }, {}],
  131: [function ($require, container, exports) {
    container.exports = deprecation
  }, {}],
  132: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    /**
     * The extract manager provides functionality to export content from the renderers.
     *
     * An instance of this class is automatically created by default, and can be found at renderer.plugins.extract
     *
     * @class
     * @memberof PIXI.extract
     */
    var CanvasExtract = function () {
      /**
       * @param {PIXI.CanvasRenderer} renderer - A reference to the current renderer
       */
      function CanvasExtract(renderer) {
        class_call_check_(this, CanvasExtract)

        this.renderer = renderer
        /**
         * Collection of methods for extracting data (image, pixels, etc.) from a display object or render texture
         *
         * @member {PIXI.extract.CanvasExtract} extract
         * @memberof PIXI.CanvasRenderer#
         * @see PIXI.extract.CanvasExtract
         */
        renderer.extract = this
      }

      var TEMP_RECT = new core.Rectangle()

      /**
       * Will return a HTML Image of the target
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {HTMLImageElement} HTML Image of the target
       */
      CanvasExtract.prototype.image = function image(target) {
        var image = new Image()

        image.src = this.base64(target)

        return image
      }

      /**
       * Will return a a base64 encoded string of this target. It works by calling
       *  `CanvasExtract.getCanvas` and then running toDataURL on that.
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {string} A base64 encoded string of the texture.
       */
      CanvasExtract.prototype.base64 = function base64(target) {
        return this.canvas(target).toDataURL()
      }

      /**
       * Creates a Canvas element, renders this target to it and then returns it.
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.
       */
      CanvasExtract.prototype.canvas = function canvas(target) {
        var renderer = this.renderer
        var context = void 0
        var resolution = void 0
        var frame = void 0
        var renderTexture = void 0

        if (target) {
          if (target instanceof core.RenderTexture) {
            renderTexture = target
          } else {
            renderTexture = renderer.generateTexture(target)
          }
        }

        if (renderTexture) {
          context = renderTexture.baseTexture._canvasRenderTarget.context
          resolution = renderTexture.baseTexture._canvasRenderTarget.resolution
          frame = renderTexture.frame
        } else {
          context = renderer.rootContext

          frame = TEMP_RECT
          frame.width = this.renderer.width
          frame.height = this.renderer.height
        }

        var width = frame.width * resolution
        var height = frame.height * resolution

        var canvasBuffer = new core.CanvasRenderTarget(width, height)
        var canvasData = context.getImageData(frame.x * resolution, frame.y * resolution, width, height)

        canvasBuffer.context.putImageData(canvasData, 0, 0)

        // send the canvas back..
        return canvasBuffer.canvas
      }

      /**
       * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
       * order, with integer values between 0 and 255 (included).
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {Uint8ClampedArray} One-dimensional array containing the pixel data of the entire texture
       */
      CanvasExtract.prototype.pixels = function pixels(target) {
        var renderer = this.renderer
        var context = void 0
        var resolution = void 0
        var frame = void 0
        var renderTexture = void 0

        if (target) {
          if (target instanceof core.RenderTexture) {
            renderTexture = target
          } else {
            renderTexture = renderer.generateTexture(target)
          }
        }

        if (renderTexture) {
          context = renderTexture.baseTexture._canvasRenderTarget.context
          resolution = renderTexture.baseTexture._canvasRenderTarget.resolution
          frame = renderTexture.frame
        } else {
          context = renderer.rootContext

          frame = TEMP_RECT
          frame.width = renderer.width
          frame.height = renderer.height
        }

        return context.getImageData(0, 0, frame.width * resolution, frame.height * resolution).data
      }

      /**
       * Destroys the extract
       *
       */
      CanvasExtract.prototype.destroy = function destroy() {
        this.renderer.extract = null
        this.renderer = null
      }

      core.CanvasRenderer.registerPlugin('extract', CanvasExtract)

      return CanvasExtract
    }()

    exports.default = CanvasExtract
  }, {
    "../../core": 65
  }],
  133: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _WebGLExtract = $require('./webgl/WebGLExtract')

    Object.defineProperty(exports, 'webgl', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_WebGLExtract).default
      }
    })

    var _CanvasExtract = $require('./canvas/CanvasExtract')

    Object.defineProperty(exports, 'canvas', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasExtract).default
      }
    })

    
  }, {
    "./canvas/CanvasExtract": 132,
    "./webgl/WebGLExtract": 134
  }],
  134: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)
    
    var TEMP_RECT = new core.Rectangle()
    var BYTES_PER_PIXEL = 4

    /**
     * The extract manager provides functionality to export content from the renderers.
     *
     * An instance of this class is automatically created by default, and can be found at renderer.plugins.extract
     *
     * @class
     * @memberof PIXI.extract
     */

    var WebGLExtract = function () {
      /**
       * @param {PIXI.WebGLRenderer} renderer - A reference to the current renderer
       */
      function WebGLExtract(renderer) {
        class_call_check_(this, WebGLExtract)

        this.renderer = renderer
        /**
         * Collection of methods for extracting data (image, pixels, etc.) from a display object or render texture
         *
         * @member {PIXI.extract.WebGLExtract} extract
         * @memberof PIXI.WebGLRenderer#
         * @see PIXI.extract.WebGLExtract
         */
        renderer.extract = this
      }

      /**
       * Will return a HTML Image of the target
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {HTMLImageElement} HTML Image of the target
       */


      WebGLExtract.prototype.image = function image(target) {
        var image = new Image()

        image.src = this.base64(target)

        return image
      }

      /**
       * Will return a a base64 encoded string of this target. It works by calling
       *  `WebGLExtract.getCanvas` and then running toDataURL on that.
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {string} A base64 encoded string of the texture.
       */


      WebGLExtract.prototype.base64 = function base64(target) {
        return this.canvas(target).toDataURL()
      }

      /**
       * Creates a Canvas element, renders this target to it and then returns it.
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.
       */


      WebGLExtract.prototype.canvas = function canvas(target) {
        var renderer = this.renderer
        var textureBuffer = void 0
        var resolution = void 0
        var frame = void 0
        var flipY = false
        var renderTexture = void 0
        var generated = false

        if (target) {
          if (target instanceof core.RenderTexture) {
            renderTexture = target
          } else {
            renderTexture = this.renderer.generateTexture(target)
            generated = true
          }
        }

        if (renderTexture) {
          textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]
          resolution = textureBuffer.resolution
          frame = renderTexture.frame
          flipY = false
        } else {
          textureBuffer = this.renderer.rootRenderTarget
          resolution = textureBuffer.resolution
          flipY = true

          frame = TEMP_RECT
          frame.width = textureBuffer.size.width
          frame.height = textureBuffer.size.height
        }

        var width = frame.width * resolution
        var height = frame.height * resolution

        var canvasBuffer = new core.CanvasRenderTarget(width, height)

        if (textureBuffer) {
          // bind the buffer
          renderer.bindRenderTarget(textureBuffer)

          // set up an array of pixels
          var webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height)

          // read pixels to the array
          var gl = renderer.gl

          gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels)

          // add the pixels to the canvas
          var canvasData = canvasBuffer.context.getImageData(0, 0, width, height)

          canvasData.data.set(webglPixels)

          canvasBuffer.context.putImageData(canvasData, 0, 0)

          // pulling pixels
          if (flipY) {
            canvasBuffer.context.scale(1, -1)
            canvasBuffer.context.drawImage(canvasBuffer.canvas, 0, -height)
          }
        }

        if (generated) {
          renderTexture.destroy(true)
        }
        // send the canvas back..

        return canvasBuffer.canvas
      }

      /**
       * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
       * order, with integer values between 0 and 255 (included).
       *
       * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
       *  to convert. If left empty will use use the main renderer
       * @return {Uint8ClampedArray} One-dimensional array containing the pixel data of the entire texture
       */
      WebGLExtract.prototype.pixels = function pixels(target) {
        var renderer = this.renderer
        var textureBuffer = void 0
        var resolution = void 0
        var frame = void 0
        var renderTexture = void 0
        var generated = false

        if (target) {
          if (target instanceof core.RenderTexture) {
            renderTexture = target
          } else {
            renderTexture = this.renderer.generateTexture(target)
            generated = true
          }
        }

        if (renderTexture) {
          textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]
          resolution = textureBuffer.resolution
          frame = renderTexture.frame
        } else {
          textureBuffer = this.renderer.rootRenderTarget
          resolution = textureBuffer.resolution

          frame = TEMP_RECT
          frame.width = textureBuffer.size.width
          frame.height = textureBuffer.size.height
        }

        var width = frame.width * resolution
        var height = frame.height * resolution

        var webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height)

        if (textureBuffer) {
          // bind the buffer
          renderer.bindRenderTarget(textureBuffer)
          // read pixels to the array
          var gl = renderer.gl

          gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels)
        }

        if (generated) {
          renderTexture.destroy(true)
        }

        return webglPixels
      }

      /**
       * Destroys the extract
       *
       */
      WebGLExtract.prototype.destroy = function destroy() {
        this.renderer.extract = null
        this.renderer = null
      }

      core.WebGLRenderer.registerPlugin('extract', WebGLExtract)

      return WebGLExtract
    }()

    exports.default = WebGLExtract
  }, {
    "../../core": 65
  }],
  135: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    /**
     * @typedef PIXI.extras.AnimatedSprite~FrameObject
     * @type {object}
     * @property {PIXI.Texture} texture - The {@link PIXI.Texture} of the frame
     * @property {number} time - the duration of the frame in ms
     */

    /**
     * An AnimatedSprite is a simple way to display an animation depicted by a list of textures.
     *
     * ```js
     * let alienImages = ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"]
     * let textureArray = []
     *
     * for (let i=0; i < 4; i++)
     * {
     *      let texture = PIXI.Texture.fromImage(alienImages[i])
     *      textureArray.push(texture)
     * }
     *
     * let mc = new PIXI.AnimatedSprite(textureArray)
     * ```
     *
     * @class
     * @extends PIXI.Sprite
     * @memberof PIXI.extras
     */
    var AnimatedSprite = function (_core$Sprite) {
      inherits_(AnimatedSprite, _core$Sprite)

      /**
       * @param {PIXI.Texture[]|PIXI.extras.AnimatedSprite~FrameObject[]} textures - an array of {@link PIXI.Texture} or frame
       *  objects that make up the animation
       * @param {boolean} [autoUpdate=true] - Whether to use PIXI.ticker.shared to auto update animation time.
       */
      function AnimatedSprite(textures, autoUpdate) {
        class_call_check_(this, AnimatedSprite)

        /**
         * @private
         */
        var _this = get_constructor_(this, _core$Sprite.call(this, textures[0] instanceof core.Texture ? textures[0] : textures[0].texture))

        _this._textures = null

        /**
         * @private
         */
        _this._durations = null

        _this.textures = textures

        /**
         * `true` uses PIXI.ticker.shared to auto update animation time.
         * @type {boolean}
         * @default true
         * @private
         */
        _this._autoUpdate = autoUpdate !== false

        /**
         * The speed that the AnimatedSprite will play at. Higher is faster, lower is slower
         *
         * @member {number}
         * @default 1
         */
        _this.animationSpeed = 1

        /**
         * Whether or not the animate sprite repeats after playing.
         *
         * @member {boolean}
         * @default true
         */
        _this.loop = true

        /**
         * Function to call when a AnimatedSprite finishes playing
         *
         * @member {Function}
         */
        _this.onComplete = null

        /**
         * Function to call when a AnimatedSprite changes which texture is being rendered
         *
         * @member {Function}
         */
        _this.onFrameChange = null

        /**
         * Function to call when 'loop' is true, and an AnimatedSprite is played and loops around to start again
         *
         * @member {Function}
         */
        _this.onLoop = null

        /**
         * Elapsed time since animation has been started, used internally to display current texture
         *
         * @member {number}
         * @private
         */
        _this._currentTime = 0

        /**
         * Indicates if the AnimatedSprite is currently playing
         *
         * @member {boolean}
         * @readonly
         */
        _this.playing = false
        return _this
      }

      /**
       * Stops the AnimatedSprite
       *
       */
      AnimatedSprite.prototype.stop = function stop() {
        if (!this.playing) {
          return
        }

        this.playing = false
        if (this._autoUpdate) {
          core.ticker.shared.remove(this.update, this)
        }
      }

      /**
       * Plays the AnimatedSprite
       *
       */
      AnimatedSprite.prototype.play = function play() {
        if (this.playing) {
          return
        }

        this.playing = true
        if (this._autoUpdate) {
          core.ticker.shared.add(this.update, this, core.UPDATE_PRIORITY.HIGH)
        }
      }

      /**
       * Stops the AnimatedSprite and goes to a specific frame
       *
       * @param {number} frameNumber - frame index to stop at
       */
      AnimatedSprite.prototype.gotoAndStop = function gotoAndStop(frameNumber) {
        this.stop()

        var previousFrame = this.currentFrame

        this._currentTime = frameNumber

        if (previousFrame !== this.currentFrame) {
          this.updateTexture()
        }
      }

      /**
       * Goes to a specific frame and begins playing the AnimatedSprite
       *
       * @param {number} frameNumber - frame index to start at
       */
      AnimatedSprite.prototype.gotoAndPlay = function gotoAndPlay(frameNumber) {
        var previousFrame = this.currentFrame

        this._currentTime = frameNumber

        if (previousFrame !== this.currentFrame) {
          this.updateTexture()
        }

        this.play()
      }

      /**
       * Updates the object transform for rendering.
       *
       * @private
       * @param {number} deltaTime - Time since last tick.
       */
      AnimatedSprite.prototype.update = function update(deltaTime) {
        var elapsed = this.animationSpeed * deltaTime
        var previousFrame = this.currentFrame

        if (this._durations !== null) {
          var lag = this._currentTime % 1 * this._durations[this.currentFrame]

          lag += elapsed / 60 * 1000

          while (lag < 0) {
            this._currentTime--
            lag += this._durations[this.currentFrame]
          }

          var sign = Math.sign(this.animationSpeed * deltaTime)

          this._currentTime = Math.floor(this._currentTime)

          while (lag >= this._durations[this.currentFrame]) {
            lag -= this._durations[this.currentFrame] * sign
            this._currentTime += sign
          }

          this._currentTime += lag / this._durations[this.currentFrame]
        } else {
          this._currentTime += elapsed
        }

        if (this._currentTime < 0 && !this.loop) {
          this.gotoAndStop(0)

          if (this.onComplete) {
            this.onComplete()
          }
        } else if (this._currentTime >= this._textures.length && !this.loop) {
          this.gotoAndStop(this._textures.length - 1)

          if (this.onComplete) {
            this.onComplete()
          }
        } else if (previousFrame !== this.currentFrame) {
          if (this.loop && this.onLoop) {
            if (this.animationSpeed > 0 && this.currentFrame < previousFrame) {
              this.onLoop()
            } else if (this.animationSpeed < 0 && this.currentFrame > previousFrame) {
              this.onLoop()
            }
          }

          this.updateTexture()
        }
      }

      /**
       * Updates the displayed texture to match the current frame index
       *
       * @private
       */
      AnimatedSprite.prototype.updateTexture = function updateTexture() {
        this._texture = this._textures[this.currentFrame]
        this._textureID = -1
        this.cachedTint = 0xFFFFFF

        if (this.onFrameChange) {
          this.onFrameChange(this.currentFrame)
        }
      }

      /**
       * Stops the AnimatedSprite and destroys it
       *
       * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
       *  have been set to that value
       * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
       *      method called as well. 'options' will be passed on to those calls.
       * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well
       * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
       */
      AnimatedSprite.prototype.destroy = function destroy(options) {
        this.stop()
        _core$Sprite.prototype.destroy.call(this, options)
      }

      /**
       * A short hand way of creating a movieclip from an array of frame ids
       *
       * @static
       * @param {string[]} frames - The array of frames ids the movieclip will use as its texture frames
       * @return {AnimatedSprite} The new animated sprite with the specified frames.
       */
      AnimatedSprite.fromFrames = function fromFrames(frames) {
        var textures = []

        for (var i = 0; i < frames.length; ++i) {
          textures.push(core.Texture.fromFrame(frames[i]))
        }

        return new AnimatedSprite(textures)
      }

      /**
       * A short hand way of creating a movieclip from an array of image ids
       *
       * @static
       * @param {string[]} images - the array of image urls the movieclip will use as its texture frames
       * @return {AnimatedSprite} The new animate sprite with the specified images as frames.
       */
      AnimatedSprite.fromImages = function fromImages(images) {
        var textures = []

        for (var i = 0; i < images.length; ++i) {
          textures.push(core.Texture.fromImage(images[i]))
        }

        return new AnimatedSprite(textures)
      }

      /**
       * totalFrames is the total number of frames in the AnimatedSprite. This is the same as number of textures
       * assigned to the AnimatedSprite.
       *
       * @readonly
       * @member {number}
       * @default 0
       */
      create_class_(AnimatedSprite, [{
        key: 'totalFrames',
        get: function get() {
          return this._textures.length
        }

        /**
         * The array of textures used for this AnimatedSprite
         *
         * @member {PIXI.Texture[]}
         */

      }, {
        key: 'textures',
        get: function get() {
          return this._textures
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          if (value[0] instanceof core.Texture) {
            this._textures = value
            this._durations = null
          } else {
            this._textures = []
            this._durations = []

            for (var i = 0; i < value.length; i++) {
              this._textures.push(value[i].texture)
              this._durations.push(value[i].time)
            }
          }
          this.gotoAndStop(0)
          this.updateTexture()
        }

        /**
         * The AnimatedSprites current frame index
         *
         * @member {number}
         * @readonly
         */

      }, {
        key: 'currentFrame',
        get: function get() {
          var currentFrame = Math.floor(this._currentTime) % this._textures.length

          if (currentFrame < 0) {
            currentFrame += this._textures.length
          }

          return currentFrame
        }
      }])

      return AnimatedSprite
    }(core.Sprite)

    exports.default = AnimatedSprite
  }, {
    "../core": 65
  }],
  136: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _ObservablePoint = $require('../core/math/ObservablePoint')

    var _ObservablePoint2 = interop_require_default_(_ObservablePoint)

    var _utils = $require('../core/utils')

    var _settings = $require('../core/settings')

    var _settings2 = interop_require_default_(_settings)

    /**
     * A BitmapText object will create a line or multiple lines of text using bitmap font. To
     * split a line you can use '\n', '\r' or '\r\n' in your string. You can generate the fnt files using:
     *
     * A BitmapText can only be created when the font is loaded
     *
     * ```js
     * // in this case the font is in a file called 'desyrel.fnt'
     * let bitmapText = new PIXI.extras.BitmapText("text using a fancy font!", {font: "35px Desyrel", align: "right"})
     * ```
     *
     * http://www.angelcode.com/products/bmfont/ for windows or
     * http://www.bmglyph.com/ for mac.
     *
     * @class
     * @extends PIXI.Container
     * @memberof PIXI.extras
     */
    var BitmapText = function (_core$Container) {
      inherits_(BitmapText, _core$Container)

      /**
       * @param {string} text - The copy that you would like the text to display
       * @param {object} style - The style parameters
       * @param {string|object} style.font - The font descriptor for the object, can be passed as a string of form
       *      "24px FontName" or "FontName" or as an object with explicit name/size properties.
       * @param {string} [style.font.name] - The bitmap font id
       * @param {number} [style.font.size] - The size of the font in pixels, e.g. 24
       * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center' or 'right'), does not affect
       *      single line text
       * @param {number} [style.tint=0xFFFFFF] - The tint color
       */
      function BitmapText(text) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

        class_call_check_(this, BitmapText)

        /**
         * Private tracker for the width of the overall text
         *
         * @member {number}
         * @private
         */
        var _this = get_constructor_(this, _core$Container.call(this))

        _this._textWidth = 0

        /**
         * Private tracker for the height of the overall text
         *
         * @member {number}
         * @private
         */
        _this._textHeight = 0

        /**
         * Private tracker for the letter sprite pool.
         *
         * @member {PIXI.Sprite[]}
         * @private
         */
        _this._glyphs = []

        /**
         * Private tracker for the current style.
         *
         * @member {object}
         * @private
         */
        _this._font = {
          tint: style.tint !== undefined ? style.tint : 0xFFFFFF,
          align: style.align || 'left',
          name: null,
          size: 0
        }

        /**
         * Private tracker for the current font.
         *
         * @member {object}
         * @private
         */
        _this.font = style.font; // run font setter

        /**
         * Private tracker for the current text.
         *
         * @member {string}
         * @private
         */
        _this._text = text

        /**
         * The max width of this bitmap text in pixels. If the text provided is longer than the
         * value provided, line breaks will be automatically inserted in the last whitespace.
         * Disable by setting value to 0
         *
         * @member {number}
         * @private
         */
        _this._maxWidth = 0

        /**
         * The max line height. This is useful when trying to use the total height of the Text,
         * ie: when trying to vertically align.
         *
         * @member {number}
         * @private
         */
        _this._maxLineHeight = 0

        /**
         * Letter spacing. This is useful for setting the space between characters.
         * @member {number}
         * @private
         */
        _this._letterSpacing = 0

        /**
         * Text anchor. read-only
         *
         * @member {PIXI.ObservablePoint}
         * @private
         */
        _this._anchor = new _ObservablePoint2.default(function () {
          _this.dirty = true
        }, _this, 0, 0)

        /**
         * The dirty state of this object.
         *
         * @member {boolean}
         */
        _this.dirty = false

        _this.updateText()
        return _this
      }

      /**
       * Renders text and updates it when needed
       *
       * @private
       */
      BitmapText.prototype.updateText = function updateText() {
        var data = BitmapText.fonts[this._font.name]
        var scale = this._font.size / data.size
        var pos = new core.Point()
        var chars = []
        var lineWidths = []
        var text = this.text.replace(/(?:\r\n|\r)/g, '\n')
        var textLength = text.length
        var maxWidth = this._maxWidth * data.size / this._font.size

        var prevCharCode = null
        var lastLineWidth = 0
        var maxLineWidth = 0
        var line = 0
        var lastBreakPos = -1
        var lastBreakWidth = 0
        var spacesRemoved = 0
        var maxLineHeight = 0

        for (var i = 0; i < textLength; i++) {
          var charCode = text.charCodeAt(i)
          var char = text.charAt(i)

          if (/(?:\s)/.test(char)) {
            lastBreakPos = i
            lastBreakWidth = lastLineWidth
          }

          if (char === '\r' || char === '\n') {
            lineWidths.push(lastLineWidth)
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth)
            ++line
            ++spacesRemoved

            pos.x = 0
            pos.y += data.lineHeight
            prevCharCode = null
            continue
          }

          var charData = data.chars[charCode]

          if (!charData) {
            continue
          }

          if (prevCharCode && charData.kerning[prevCharCode]) {
            pos.x += charData.kerning[prevCharCode]
          }

          chars.push({
            texture: charData.texture,
            line: line,
            charCode: charCode,
            position: new core.Point(pos.x + charData.xOffset + this._letterSpacing / 2, pos.y + charData.yOffset)
          })
          pos.x += charData.xAdvance + this._letterSpacing
          lastLineWidth = pos.x
          maxLineHeight = Math.max(maxLineHeight, charData.yOffset + charData.texture.height)
          prevCharCode = charCode

          if (lastBreakPos !== -1 && maxWidth > 0 && pos.x > maxWidth) {
            ++spacesRemoved
            core.utils.removeItems(chars, 1 + lastBreakPos - spacesRemoved, 1 + i - lastBreakPos)
            i = lastBreakPos
            lastBreakPos = -1

            lineWidths.push(lastBreakWidth)
            maxLineWidth = Math.max(maxLineWidth, lastBreakWidth)
            line++

            pos.x = 0
            pos.y += data.lineHeight
            prevCharCode = null
          }
        }

        var lastChar = text.charAt(text.length - 1)

        if (lastChar !== '\r' && lastChar !== '\n') {
          if (/(?:\s)/.test(lastChar)) {
            lastLineWidth = lastBreakWidth
          }

          lineWidths.push(lastLineWidth)
          maxLineWidth = Math.max(maxLineWidth, lastLineWidth)
        }

        var lineAlignOffsets = []

        for (var _i = 0; _i <= line; _i++) {
          var alignOffset = 0

          if (this._font.align === 'right') {
            alignOffset = maxLineWidth - lineWidths[_i]
          } else if (this._font.align === 'center') {
            alignOffset = (maxLineWidth - lineWidths[_i]) / 2
          }

          lineAlignOffsets.push(alignOffset)
        }

        var lenChars = chars.length
        var tint = this.tint

        for (var _i2 = 0; _i2 < lenChars; _i2++) {
          var c = this._glyphs[_i2]; // get the next glyph sprite

          if (c) {
            c.texture = chars[_i2].texture
          } else {
            c = new core.Sprite(chars[_i2].texture)
            this._glyphs.push(c)
          }

          c.position.x = (chars[_i2].position.x + lineAlignOffsets[chars[_i2].line]) * scale
          c.position.y = chars[_i2].position.y * scale
          c.scale.x = c.scale.y = scale
          c.tint = tint

          if (!c.parent) {
            this.addChild(c)
          }
        }

        // remove unnecessary children.
        for (var _i3 = lenChars; _i3 < this._glyphs.length; ++_i3) {
          this.removeChild(this._glyphs[_i3])
        }

        this._textWidth = maxLineWidth * scale
        this._textHeight = (pos.y + data.lineHeight) * scale

        // apply anchor
        if (this.anchor.x !== 0 || this.anchor.y !== 0) {
          for (var _i4 = 0; _i4 < lenChars; _i4++) {
            this._glyphs[_i4].x -= this._textWidth * this.anchor.x
            this._glyphs[_i4].y -= this._textHeight * this.anchor.y
          }
        }
        this._maxLineHeight = maxLineHeight * scale
      }

      /**
       * Updates the transform of this object
       *
       * @private
       */
      BitmapText.prototype.updateTransform = function updateTransform() {
        this.validate()
        this.containerUpdateTransform()
      }

      /**
       * Validates text before calling parent's getLocalBounds
       *
       * @return {PIXI.Rectangle} The rectangular bounding area
       */
      BitmapText.prototype.getLocalBounds = function getLocalBounds() {
        this.validate()

        return _core$Container.prototype.getLocalBounds.call(this)
      }

      /**
       * Updates text when needed
       *
       * @private
       */
      BitmapText.prototype.validate = function validate() {
        if (this.dirty) {
          this.updateText()
          this.dirty = false
        }
      }

      /**
       * Register a bitmap font with data and a texture.
       *
       * @static
       * @param {XMLDocument} xml - The XML document data.
       * @param {Object.<string, PIXI.Texture>|PIXI.Texture|PIXI.Texture[]} textures - List of textures for each page.
       *  If providing an object, the key is the `<page>` element's `file` attribute in the FNT file.
       * @return {Object} Result font object with font, size, lineHeight and char fields.
       */
      BitmapText.registerFont = function registerFont(xml, textures) {
        var data = {}
        var info = xml.getElementsByTagName('info')[0]
        var common = xml.getElementsByTagName('common')[0]
        var pages = xml.getElementsByTagName('page')
        var res = (0, _utils.getResolutionOfUrl)(pages[0].getAttribute('file'), _settings2.default.RESOLUTION)
        var pagesTextures = {}

        data.font = info.getAttribute('face')
        data.size = parseInt(info.getAttribute('size'), 10)
        data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10) / res
        data.chars = {}

        // Single texture, convert to list
        if (textures instanceof core.Texture) {
          textures = [textures]
        }

        // Convert the input Texture, Textures or object
        // into a page Texture lookup by "id"
        for (var i = 0; i < pages.length; i++) {
          var id = pages[i].getAttribute('id')
          var file = pages[i].getAttribute('file')

          pagesTextures[id] = textures instanceof Array ? textures[i] : textures[file]
        }

        // parse letters
        var letters = xml.getElementsByTagName('char')

        for (var _i5 = 0; _i5 < letters.length; _i5++) {
          var letter = letters[_i5]
          var charCode = parseInt(letter.getAttribute('id'), 10)
          var page = letter.getAttribute('page') || 0
          var textureRect = new core.Rectangle(parseInt(letter.getAttribute('x'), 10) / res + pagesTextures[page].frame.x / res, parseInt(letter.getAttribute('y'), 10) / res + pagesTextures[page].frame.y / res, parseInt(letter.getAttribute('width'), 10) / res, parseInt(letter.getAttribute('height'), 10) / res)

          data.chars[charCode] = {
            xOffset: parseInt(letter.getAttribute('xoffset'), 10) / res,
            yOffset: parseInt(letter.getAttribute('yoffset'), 10) / res,
            xAdvance: parseInt(letter.getAttribute('xadvance'), 10) / res,
            kerning: {},
            texture: new core.Texture(pagesTextures[page].baseTexture, textureRect),
            page: page
          }
        }

        // parse kernings
        var kernings = xml.getElementsByTagName('kerning')

        for (var _i6 = 0; _i6 < kernings.length; _i6++) {
          var kerning = kernings[_i6]
          var first = parseInt(kerning.getAttribute('first'), 10) / res
          var second = parseInt(kerning.getAttribute('second'), 10) / res
          var amount = parseInt(kerning.getAttribute('amount'), 10) / res

          if (data.chars[second]) {
            data.chars[second].kerning[first] = amount
          }
        }

        // I'm leaving this as a temporary fix so we can test the bitmap fonts in v3
        // but it's very likely to change
        BitmapText.fonts[data.font] = data

        return data
      }

      create_class_(BitmapText, [{
        key: 'tint',
        get: function get() {
          return this._font.tint
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._font.tint = typeof value === 'number' && value >= 0 ? value : 0xFFFFFF

          this.dirty = true
        }

        /**
         * The alignment of the BitmapText object
         *
         * @member {string}
         * @default 'left'
         */

      }, {
        key: 'align',
        get: function get() {
          return this._font.align
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._font.align = value || 'left'

          this.dirty = true
        }

        /**
         * The anchor sets the origin point of the text.
         * The default is 0,0 this means the text's origin is the top left
         * Setting the anchor to 0.5,0.5 means the text's origin is centered
         * Setting the anchor to 1,1 would mean the text's origin point will be the bottom right corner
         *
         * @member {PIXI.Point | number}
         */

      }, {
        key: 'anchor',
        get: function get() {
          return this._anchor
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          if (typeof value === 'number') {
            this._anchor.set(value)
          } else {
            this._anchor.copy(value)
          }
        }

        /**
         * The font descriptor of the BitmapText object
         *
         * @member {string|object}
         */

      }, {
        key: 'font',
        get: function get() {
          return this._font
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          if (!value) {
            return
          }

          if (typeof value === 'string') {
            value = value.split(' ')

            this._font.name = value.length === 1 ? value[0] : value.slice(1).join(' ')
            this._font.size = value.length >= 2 ? parseInt(value[0], 10) : BitmapText.fonts[this._font.name].size
          } else {
            this._font.name = value.name
            this._font.size = typeof value.size === 'number' ? value.size : parseInt(value.size, 10)
          }

          this.dirty = true
        }

        /**
         * The text of the BitmapText object
         *
         * @member {string}
         */

      }, {
        key: 'text',
        get: function get() {
          return this._text
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          value = value.toString() || ' '
          if (this._text === value) {
            return
          }
          this._text = value
          this.dirty = true
        }

        /**
         * The max width of this bitmap text in pixels. If the text provided is longer than the
         * value provided, line breaks will be automatically inserted in the last whitespace.
         * Disable by setting value to 0
         *
         * @member {number}
         */

      }, {
        key: 'maxWidth',
        get: function get() {
          return this._maxWidth
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          if (this._maxWidth === value) {
            return
          }
          this._maxWidth = value
          this.dirty = true
        }

        /**
         * The max line height. This is useful when trying to use the total height of the Text,
         * ie: when trying to vertically align.
         *
         * @member {number}
         * @readonly
         */

      }, {
        key: 'maxLineHeight',
        get: function get() {
          this.validate()

          return this._maxLineHeight
        }

        /**
         * The width of the overall text, different from fontSize,
         * which is defined in the style object
         *
         * @member {number}
         * @readonly
         */

      }, {
        key: 'textWidth',
        get: function get() {
          this.validate()

          return this._textWidth
        }

        /**
         * Additional space between characters.
         *
         * @member {number}
         */

      }, {
        key: 'letterSpacing',
        get: function get() {
          return this._letterSpacing
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          if (this._letterSpacing !== value) {
            this._letterSpacing = value
            this.dirty = true
          }
        }

        /**
         * The height of the overall text, different from fontSize,
         * which is defined in the style object
         *
         * @member {number}
         * @readonly
         */

      }, {
        key: 'textHeight',
        get: function get() {
          this.validate()

          return this._textHeight
        }
      }])

      BitmapText.fonts = {}

      return BitmapText
    }(core.Container)

    exports.default = BitmapText
  }, {
    "../core": 65,
    "../core/math/ObservablePoint": 68,
    "../core/settings": 101,
    "../core/utils": 125
  }],
  137: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _CanvasTinter = $require('../core/sprites/canvas/CanvasTinter')

    var _CanvasTinter2 = interop_require_default_(_CanvasTinter)

    var tempPoint = new core.Point()

    /**
     * A tiling sprite is a fast way of rendering a tiling image
     *
     * @class
     * @extends PIXI.Sprite
     * @memberof PIXI.extras
     */

    var TilingSprite = function (_core$Sprite) {
      inherits_(TilingSprite, _core$Sprite)

      /**
       * @param {PIXI.Texture} texture - the texture of the tiling sprite
       * @param {number} [width=100] - the width of the tiling sprite
       * @param {number} [height=100] - the height of the tiling sprite
       */
      function TilingSprite(texture) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100
        var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100

        class_call_check_(this, TilingSprite)

        /**
         * Tile transform
         *
         * @member {PIXI.TransformStatic}
         */
        var _this = get_constructor_(this, _core$Sprite.call(this, texture))

        _this.tileTransform = new core.TransformStatic()

        // /// private

        /**
         * The with of the tiling sprite
         *
         * @member {number}
         * @private
         */
        _this._width = width

        /**
         * The height of the tiling sprite
         *
         * @member {number}
         * @private
         */
        _this._height = height

        /**
         * Canvas pattern
         *
         * @type {CanvasPattern}
         * @private
         */
        _this._canvasPattern = null

        /**
         * transform that is applied to UV to get the texture coords
         *
         * @member {PIXI.TextureMatrix}
         */
        _this.uvTransform = texture.transform || new core.TextureMatrix(texture)

        /**
         * Plugin that is responsible for rendering this element.
         * Allows to customize the rendering process without overriding '_renderWebGL' method.
         *
         * @member {string}
         * @default 'tilingSprite'
         */
        _this.pluginName = 'tilingSprite'

        /**
         * Whether or not anchor affects uvs
         *
         * @member {boolean}
         * @default false
         */
        _this.uvRespectAnchor = false
        return _this
      }
      /**
       * Changes frame clamping in corresponding textureTransform, shortcut
       * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
       *
       * @default 0.5
       * @member {number}
       */


      /**
       * @private
       */
      TilingSprite.prototype._onTextureUpdate = function _onTextureUpdate() {
        if (this.uvTransform) {
          this.uvTransform.texture = this._texture
        }
        this.cachedTint = 0xFFFFFF
      }

      /**
       * Renders the object using the WebGL renderer
       *
       * @private
       * @param {PIXI.WebGLRenderer} renderer - The renderer
       */


      TilingSprite.prototype._renderWebGL = function _renderWebGL(renderer) {
        // tweak our texture temporarily..
        var texture = this._texture

        if (!texture || !texture.valid) {
          return
        }

        this.tileTransform.updateLocalTransform()
        this.uvTransform.update()

        renderer.setObjectRenderer(renderer.plugins[this.pluginName])
        renderer.plugins[this.pluginName].render(this)
      }

      /**
       * Renders the object using the Canvas renderer
       *
       * @private
       * @param {PIXI.CanvasRenderer} renderer - a reference to the canvas renderer
       */


      TilingSprite.prototype._renderCanvas = function _renderCanvas(renderer) {
        var texture = this._texture

        if (!texture.baseTexture.hasLoaded) {
          return
        }

        var context = renderer.context
        var transform = this.worldTransform
        var resolution = renderer.resolution
        var baseTexture = texture.baseTexture
        var baseTextureResolution = baseTexture.resolution
        var modX = this.tilePosition.x / this.tileScale.x % texture._frame.width * baseTextureResolution
        var modY = this.tilePosition.y / this.tileScale.y % texture._frame.height * baseTextureResolution

        // create a nice shiny pattern!
        if (this._textureID !== this._texture._updateID || this.cachedTint !== this.tint) {
          this._textureID = this._texture._updateID
          // cut an object from a spritesheet..
          var tempCanvas = new core.CanvasRenderTarget(texture._frame.width, texture._frame.height, baseTextureResolution)

          // Tint the tiling sprite
          if (this.tint !== 0xFFFFFF) {
            this.tintedTexture = _CanvasTinter2.default.getTintedTexture(this, this.tint)
            tempCanvas.context.drawImage(this.tintedTexture, 0, 0)
          } else {
            tempCanvas.context.drawImage(baseTexture.source, -texture._frame.x * baseTextureResolution, -texture._frame.y * baseTextureResolution)
          }
          this.cachedTint = this.tint
          this._canvasPattern = tempCanvas.context.createPattern(tempCanvas.canvas, 'repeat')
        }

        // set context state..
        context.globalAlpha = this.worldAlpha
        context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution)

        renderer.setBlendMode(this.blendMode)

        // fill the pattern!
        context.fillStyle = this._canvasPattern

        // TODO - this should be rolled into the setTransform above..
        context.scale(this.tileScale.x / baseTextureResolution, this.tileScale.y / baseTextureResolution)

        var anchorX = this.anchor.x * -this._width
        var anchorY = this.anchor.y * -this._height

        if (this.uvRespectAnchor) {
          context.translate(modX, modY)

          context.fillRect(-modX + anchorX, -modY + anchorY, this._width / this.tileScale.x * baseTextureResolution, this._height / this.tileScale.y * baseTextureResolution)
        } else {
          context.translate(modX + anchorX, modY + anchorY)

          context.fillRect(-modX, -modY, this._width / this.tileScale.x * baseTextureResolution, this._height / this.tileScale.y * baseTextureResolution)
        }
      }

      /**
       * Updates the bounds of the tiling sprite.
       *
       * @private
       */


      TilingSprite.prototype._calculateBounds = function _calculateBounds() {
        var minX = this._width * -this._anchor._x
        var minY = this._height * -this._anchor._y
        var maxX = this._width * (1 - this._anchor._x)
        var maxY = this._height * (1 - this._anchor._y)

        this._bounds.addFrame(this.transform, minX, minY, maxX, maxY)
      }

      /**
       * Gets the local bounds of the sprite object.
       *
       * @param {PIXI.Rectangle} rect - The output rectangle.
       * @return {PIXI.Rectangle} The bounds.
       */


      TilingSprite.prototype.getLocalBounds = function getLocalBounds(rect) {
        // we can do a fast local bounds if the sprite has no children!
        if (this.children.length === 0) {
          this._bounds.minX = this._width * -this._anchor._x
          this._bounds.minY = this._height * -this._anchor._y
          this._bounds.maxX = this._width * (1 - this._anchor._x)
          this._bounds.maxY = this._height * (1 - this._anchor._y)

          if (!rect) {
            if (!this._localBoundsRect) {
              this._localBoundsRect = new core.Rectangle()
            }

            rect = this._localBoundsRect
          }

          return this._bounds.getRectangle(rect)
        }

        return _core$Sprite.prototype.getLocalBounds.call(this, rect)
      }

      /**
       * Checks if a point is inside this tiling sprite.
       *
       * @param {PIXI.Point} point - the point to check
       * @return {boolean} Whether or not the sprite contains the point.
       */


      TilingSprite.prototype.containsPoint = function containsPoint(point) {
        this.worldTransform.applyInverse(point, tempPoint)

        var width = this._width
        var height = this._height
        var x1 = -width * this.anchor._x

        if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
          var y1 = -height * this.anchor._y

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


      TilingSprite.prototype.destroy = function destroy(options) {
        _core$Sprite.prototype.destroy.call(this, options)

        this.tileTransform = null
        this.uvTransform = null
      }

      /**
       * Helper function that creates a new tiling sprite based on the source you provide.
       * The source can be - frame id, image url, video url, canvas element, video element, base texture
       *
       * @static
       * @param {number|string|PIXI.BaseTexture|HTMLCanvasElement|HTMLVideoElement} source - Source to create texture from
       * @param {number} width - the width of the tiling sprite
       * @param {number} height - the height of the tiling sprite
       * @return {PIXI.Texture} The newly created texture
       */


      TilingSprite.from = function from(source, width, height) {
        return new TilingSprite(core.Texture.from(source), width, height)
      }

      /**
       * Helper function that creates a tiling sprite that will use a texture from the TextureCache based on the frameId
       * The frame ids are created when a Texture packer file has been loaded
       *
       * @static
       * @param {string} frameId - The frame Id of the texture in the cache
       * @param {number} width - the width of the tiling sprite
       * @param {number} height - the height of the tiling sprite
       * @return {PIXI.extras.TilingSprite} A new TilingSprite using a texture from the texture cache matching the frameId
       */


      TilingSprite.fromFrame = function fromFrame(frameId, width, height) {
        var texture = core.utils.TextureCache[frameId]

        if (!texture) {
          throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ' + this)
        }

        return new TilingSprite(texture, width, height)
      }

      /**
       * Helper function that creates a sprite that will contain a texture based on an image url
       * If the image is not in the texture cache it will be loaded
       *
       * @static
       * @param {string} imageId - The image url of the texture
       * @param {number} width - the width of the tiling sprite
       * @param {number} height - the height of the tiling sprite
       * @param {boolean} [crossorigin] - if you want to specify the cross-origin parameter
       * @param {number} [scaleMode=PIXI.settings.SCALE_MODE] - if you want to specify the scale mode,
       *  see {@link PIXI.SCALE_MODES} for possible values
       * @return {PIXI.extras.TilingSprite} A new TilingSprite using a texture from the texture cache matching the image id
       */


      TilingSprite.fromImage = function fromImage(imageId, width, height, crossorigin, scaleMode) {
        return new TilingSprite(core.Texture.fromImage(imageId, crossorigin, scaleMode), width, height)
      }

      /**
       * The width of the sprite, setting this will actually modify the scale to achieve the value set
       *
       * @member {number}
       */


      create_class_(TilingSprite, [{
        key: 'clampMargin',
        get: function get() {
          return this.uvTransform.clampMargin
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uvTransform.clampMargin = value
          this.uvTransform.update(true)
        }

        /**
         * The scaling of the image that is being tiled
         *
         * @member {PIXI.ObservablePoint}
         */

      }, {
        key: 'tileScale',
        get: function get() {
          return this.tileTransform.scale
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.tileTransform.scale.copy(value)
        }

        /**
         * The offset of the image that is being tiled
         *
         * @member {PIXI.ObservablePoint}
         */

      }, {
        key: 'tilePosition',
        get: function get() {
          return this.tileTransform.position
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.tileTransform.position.copy(value)
        }
      }, {
        key: 'width',
        get: function get() {
          return this._width
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._width = value
        }

        /**
         * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */

      }, {
        key: 'height',
        get: function get() {
          return this._height
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._height = value
        }
      }])

      return TilingSprite
    }(core.Sprite)

    exports.default = TilingSprite

  }, {
    "../core": 65,
    "../core/sprites/canvas/CanvasTinter": 104
  }],
  138: [function ($require, container, exports) {
    'use strict'

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _Texture = $require('../core/textures/Texture')

    var _Texture2 = interop_require_default_(_Texture)

    var _BaseTexture = $require('../core/textures/BaseTexture')

    var _BaseTexture2 = interop_require_default_(_BaseTexture)

    var _utils = $require('../core/utils')

    
        
    var DisplayObject = core.DisplayObject
    var _tempMatrix = new core.Matrix()

    DisplayObject.prototype._cacheAsBitmap = false
    DisplayObject.prototype._cacheData = false

    // figured theres no point adding ALL the extra variables to prototype.
    // this model can hold the information needed. This can also be generated on demand as
    // most objects are not cached as bitmaps.
    /**
     * @class
     * @ignore
     */

    var CacheData =
      /**
       *
       */
      function CacheData() {
        class_call_check_(this, CacheData)

        this.textureCacheId = null

        this.originalRenderWebGL = null
        this.originalRenderCanvas = null
        this.originalCalculateBounds = null
        this.originalGetLocalBounds = null

        this.originalUpdateTransform = null
        this.originalHitTest = null
        this.originalDestroy = null
        this.originalMask = null
        this.originalFilterArea = null
        this.sprite = null
      }

    Object.defineProperties(DisplayObject.prototype, {
      /**
       * Set this to true if you want this display object to be cached as a bitmap.
       * This basically takes a snap shot of the display object as it is at that moment. It can
       * provide a performance benefit for complex static displayObjects.
       * To remove simply set this property to 'false'
       *
       * IMPORTANT GOTCHA - make sure that all your textures are preloaded BEFORE setting this property to true
       * as it will take a snapshot of what is currently there. If the textures have not loaded then they will not appear.
       *
       * @member {boolean}
       * @memberof PIXI.DisplayObject#
       */
      cacheAsBitmap: {
        get: function get() {
          return this._cacheAsBitmap
        },
        set: function set(value) {
          if (this._cacheAsBitmap === value) {
            return
          }

          this._cacheAsBitmap = value

          var data = void 0

          if (value) {
            if (!this._cacheData) {
              this._cacheData = new CacheData()
            }

            data = this._cacheData

            data.originalRenderWebGL = this.renderWebGL
            data.originalRenderCanvas = this.renderCanvas

            data.originalUpdateTransform = this.updateTransform
            data.originalCalculateBounds = this._calculateBounds
            data.originalGetLocalBounds = this.getLocalBounds

            data.originalDestroy = this.destroy

            data.originalContainsPoint = this.containsPoint

            data.originalMask = this._mask
            data.originalFilterArea = this.filterArea

            this.renderWebGL = this._renderCachedWebGL
            this.renderCanvas = this._renderCachedCanvas

            this.destroy = this._cacheAsBitmapDestroy
          } else {
            data = this._cacheData

            if (data.sprite) {
              this._destroyCachedDisplayObject()
            }

            this.renderWebGL = data.originalRenderWebGL
            this.renderCanvas = data.originalRenderCanvas
            this._calculateBounds = data.originalCalculateBounds
            this.getLocalBounds = data.originalGetLocalBounds

            this.destroy = data.originalDestroy

            this.updateTransform = data.originalUpdateTransform
            this.containsPoint = data.originalContainsPoint

            this._mask = data.originalMask
            this.filterArea = data.originalFilterArea
          }
        }
      }
    })

    /**
     * Renders a cached version of the sprite with WebGL
     *
     * @private
     * @memberof PIXI.DisplayObject#
     * @param {PIXI.WebGLRenderer} renderer - the WebGL renderer
     */
    DisplayObject.prototype._renderCachedWebGL = function _renderCachedWebGL(renderer) {
      if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
        return
      }

      this._initCachedDisplayObject(renderer)

      this._cacheData.sprite._transformID = -1
      this._cacheData.sprite.worldAlpha = this.worldAlpha
      this._cacheData.sprite._renderWebGL(renderer)
    }

    /**
     * Prepares the WebGL renderer to cache the sprite
     *
     * @private
     * @memberof PIXI.DisplayObject#
     * @param {PIXI.WebGLRenderer} renderer - the WebGL renderer
     */
    DisplayObject.prototype._initCachedDisplayObject = function _initCachedDisplayObject(renderer) {
      if (this._cacheData && this._cacheData.sprite) {
        return
      }

      // make sure alpha is set to 1 otherwise it will get rendered as invisible!
      var cacheAlpha = this.alpha

      this.alpha = 1

      // first we flush anything left in the renderer (otherwise it would get rendered to the cached texture)
      renderer.currentRenderer.flush()
      // this.filters= []

      // next we find the dimensions of the untransformed object
      // this function also calls updatetransform on all its children as part of the measuring.
      // This means we don't need to update the transform again in this function
      // TODO pass an object to clone too? saves having to create a new one each time!
      var bounds = this.getLocalBounds().clone()

      // add some padding!
      if (this._filters) {
        var padding = this._filters[0].padding

        bounds.pad(padding)
      }

      // for now we cache the current renderTarget that the webGL renderer is currently using.
      // this could be more elegent..
      var cachedRenderTarget = renderer._activeRenderTarget
      // We also store the filter stack - I will definitely look to change how this works a little later down the line.
      var stack = renderer.filterManager.filterStack

      // this renderTexture will be used to store the cached DisplayObject

      var renderTexture = core.RenderTexture.create(bounds.width | 0, bounds.height | 0)

      var textureCacheId = 'cacheAsBitmap_' + (0, _utils.uid)()

      this._cacheData.textureCacheId = textureCacheId

      _BaseTexture2.default.addToCache(renderTexture.baseTexture, textureCacheId)
      _Texture2.default.addToCache(renderTexture, textureCacheId)

      // need to set //
      var m = _tempMatrix

      m.tx = -bounds.x
      m.ty = -bounds.y

      // reset
      this.transform.worldTransform.identity()

      // set all properties to there original so we can render to a texture
      this.renderWebGL = this._cacheData.originalRenderWebGL

      renderer.render(this, renderTexture, true, m, true)
      // now restore the state be setting the new properties

      renderer.bindRenderTarget(cachedRenderTarget)

      renderer.filterManager.filterStack = stack

      this.renderWebGL = this._renderCachedWebGL
      this.updateTransform = this.displayObjectUpdateTransform

      this._mask = null
      this.filterArea = null

      // create our cached sprite
      var cachedSprite = new core.Sprite(renderTexture)

      cachedSprite.transform.worldTransform = this.transform.worldTransform
      cachedSprite.anchor.x = -(bounds.x / bounds.width)
      cachedSprite.anchor.y = -(bounds.y / bounds.height)
      cachedSprite.alpha = cacheAlpha
      cachedSprite._bounds = this._bounds

      // easy bounds..
      this._calculateBounds = this._calculateCachedBounds
      this.getLocalBounds = this._getCachedLocalBounds

      this._cacheData.sprite = cachedSprite

      this.transform._parentID = -1
      // restore the transform of the cached sprite to avoid the nasty flicker..
      if (!this.parent) {
        this.parent = renderer._tempDisplayObjectParent
        this.updateTransform()
        this.parent = null
      } else {
        this.updateTransform()
      }

      // map the hit test..
      this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite)
    }

    /**
     * Renders a cached version of the sprite with canvas
     *
     * @private
     * @memberof PIXI.DisplayObject#
     * @param {PIXI.WebGLRenderer} renderer - the WebGL renderer
     */
    DisplayObject.prototype._renderCachedCanvas = function _renderCachedCanvas(renderer) {
      if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
        return
      }

      this._initCachedDisplayObjectCanvas(renderer)

      this._cacheData.sprite.worldAlpha = this.worldAlpha

      this._cacheData.sprite.renderCanvas(renderer)
    }

    // TODO this can be the same as the webGL verison.. will need to do a little tweaking first though..
    /**
     * Prepares the Canvas renderer to cache the sprite
     *
     * @private
     * @memberof PIXI.DisplayObject#
     * @param {PIXI.WebGLRenderer} renderer - the WebGL renderer
     */
    DisplayObject.prototype._initCachedDisplayObjectCanvas = function _initCachedDisplayObjectCanvas(renderer) {
      if (this._cacheData && this._cacheData.sprite) {
        return
      }

      // get bounds actually transforms the object for us already!
      var bounds = this.getLocalBounds()

      var cacheAlpha = this.alpha

      this.alpha = 1

      var cachedRenderTarget = renderer.context

      var renderTexture = core.RenderTexture.create(bounds.width | 0, bounds.height | 0)

      var textureCacheId = 'cacheAsBitmap_' + (0, _utils.uid)()

      this._cacheData.textureCacheId = textureCacheId

      _BaseTexture2.default.addToCache(renderTexture.baseTexture, textureCacheId)
      _Texture2.default.addToCache(renderTexture, textureCacheId)

      // need to set //
      var m = _tempMatrix

      this.transform.localTransform.copy(m)
      m.invert()

      m.tx -= bounds.x
      m.ty -= bounds.y

      // m.append(this.transform.worldTransform.)
      // set all properties to there original so we can render to a texture
      this.renderCanvas = this._cacheData.originalRenderCanvas

      // renderTexture.render(this, m, true)
      renderer.render(this, renderTexture, true, m, false)

      // now restore the state be setting the new properties
      renderer.context = cachedRenderTarget

      this.renderCanvas = this._renderCachedCanvas
      this._calculateBounds = this._calculateCachedBounds

      this._mask = null
      this.filterArea = null

      // create our cached sprite
      var cachedSprite = new core.Sprite(renderTexture)

      cachedSprite.transform.worldTransform = this.transform.worldTransform
      cachedSprite.anchor.x = -(bounds.x / bounds.width)
      cachedSprite.anchor.y = -(bounds.y / bounds.height)
      cachedSprite._bounds = this._bounds
      cachedSprite.alpha = cacheAlpha

      if (!this.parent) {
        this.parent = renderer._tempDisplayObjectParent
        this.updateTransform()
        this.parent = null
      } else {
        this.updateTransform()
      }

      this.updateTransform = this.displayObjectUpdateTransform

      this._cacheData.sprite = cachedSprite

      this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite)
    }

    /**
     * Calculates the bounds of the cached sprite
     *
     * @private
     */
    DisplayObject.prototype._calculateCachedBounds = function _calculateCachedBounds() {
      this._cacheData.sprite._calculateBounds()
    }

    /**
     * Gets the bounds of the cached sprite.
     *
     * @private
     * @return {Rectangle} The local bounds.
     */
    DisplayObject.prototype._getCachedLocalBounds = function _getCachedLocalBounds() {
      return this._cacheData.sprite.getLocalBounds()
    }

    /**
     * Destroys the cached sprite.
     *
     * @private
     */
    DisplayObject.prototype._destroyCachedDisplayObject = function _destroyCachedDisplayObject() {
      this._cacheData.sprite._texture.destroy(true)
      this._cacheData.sprite = null

      _BaseTexture2.default.removeFromCache(this._cacheData.textureCacheId)
      _Texture2.default.removeFromCache(this._cacheData.textureCacheId)

      this._cacheData.textureCacheId = null
    }

    /**
     * Destroys the cached object.
     *
     * @private
     * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
     *  have been set to that value.
     *  Used when destroying containers, see the Container.destroy method.
     */
    DisplayObject.prototype._cacheAsBitmapDestroy = function _cacheAsBitmapDestroy(options) {
      this.cacheAsBitmap = false
      this.destroy(options)
    }

  }, {
    "../core": 65,
    "../core/textures/BaseTexture": 112,
    "../core/textures/Texture": 115,
    "../core/utils": 125
  }],
  139: [function ($require, container, exports) {
    'use strict'

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

        /**
     * The instance name of the object.
     *
     * @memberof PIXI.DisplayObject#
     * @member {string} name
     */
    core.DisplayObject.prototype.name = null

    /**
     * Returns the display object in the container
     *
     * @method getChildByName
     * @memberof PIXI.Container#
     * @param {string} name - instance name
     * @return {PIXI.DisplayObject} The child with the specified name.
     */
    core.Container.prototype.getChildByName = function getChildByName(name) {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i].name === name) {
          return this.children[i]
        }
      }

      return null
    }

  }, {
    "../core": 65
  }],
  140: [function ($require, container, exports) {
    'use strict'

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

        /**
     * Returns the global position of the displayObject. Does not depend on object scale, rotation and pivot.
     *
     * @method getGlobalPosition
     * @memberof PIXI.DisplayObject#
     * @param {Point} point - the point to write the global value to. If null a new point will be returned
     * @param {boolean} skipUpdate - setting to true will stop the transforms of the scene graph from
     *  being updated. This means the calculation returned MAY be out of date BUT will give you a
     *  nice performance boost
     * @return {Point} The updated point
     */
    core.DisplayObject.prototype.getGlobalPosition = function getGlobalPosition() {
      var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new core.Point()
      var skipUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

      if (this.parent) {
        this.parent.toGlobal(this.position, point, skipUpdate)
      } else {
        point.x = this.position.x
        point.y = this.position.y
      }

      return point
    }

  }, {
    "../core": 65
  }],
  141: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.BitmapText = exports.TilingSpriteRenderer = exports.TilingSprite = exports.AnimatedSprite = undefined

    var _AnimatedSprite = $require('./AnimatedSprite')

    Object.defineProperty(exports, 'AnimatedSprite', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_AnimatedSprite).default
      }
    })

    var _TilingSprite = $require('./TilingSprite')

    Object.defineProperty(exports, 'TilingSprite', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TilingSprite).default
      }
    })

    var _TilingSpriteRenderer = $require('./webgl/TilingSpriteRenderer')

    Object.defineProperty(exports, 'TilingSpriteRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TilingSpriteRenderer).default
      }
    })

    var _BitmapText = $require('./BitmapText')

    Object.defineProperty(exports, 'BitmapText', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BitmapText).default
      }
    })

    $require('./cacheAsBitmap')

    $require('./getChildByName')

    $require('./getGlobalPosition')

    
    // imported for side effect of extending the prototype only, contains no exports

  }, {
    "./AnimatedSprite": 135,
    "./BitmapText": 136,
    "./TilingSprite": 137,
    "./cacheAsBitmap": 138,
    "./getChildByName": 139,
    "./getGlobalPosition": 140,
    "./webgl/TilingSpriteRenderer": 142
  }],
  142: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _const = $require('../../core/const')

    var _path = $require('path')

        
        
    var tempMat = new core.Matrix()

    /**
     * WebGL renderer plugin for tiling sprites
     *
     * @class
     * @memberof PIXI.extras
     * @extends PIXI.ObjectRenderer
     */

    var TilingSpriteRenderer = function (_core$ObjectRenderer) {
      inherits_(TilingSpriteRenderer, _core$ObjectRenderer)

      /**
       * constructor for renderer
       *
       * @param {WebGLRenderer} renderer The renderer this tiling awesomeness works for.
       */
      function TilingSpriteRenderer(renderer) {
        class_call_check_(this, TilingSpriteRenderer)

        var _this = get_constructor_(this, _core$ObjectRenderer.call(this, renderer))

        _this.shader = null
        _this.simpleShader = null
        _this.quad = null
        return _this
      }

      /**
       * Sets up the renderer context and necessary buffers.
       *
       * @private
       */


      TilingSpriteRenderer.prototype.onContextChange = function onContextChange() {
        var gl = this.renderer.gl

        this.shader = new core.Shader(gl, 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n', 'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    gl_FragColor = sample * uColor;\n}\n')
        this.simpleShader = new core.Shader(gl, 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n', 'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n')

        this.renderer.bindVao(null)
        this.quad = new core.Quad(gl, this.renderer.state.attribState)
        this.quad.initVao(this.shader)
      }

      /**
       *
       * @param {PIXI.extras.TilingSprite} ts tilingSprite to be rendered
       */


      TilingSpriteRenderer.prototype.render = function render(ts) {
        var renderer = this.renderer
        var quad = this.quad

        renderer.bindVao(quad.vao)

        var vertices = quad.vertices

        vertices[0] = vertices[6] = ts._width * -ts.anchor.x
        vertices[1] = vertices[3] = ts._height * -ts.anchor.y

        vertices[2] = vertices[4] = ts._width * (1.0 - ts.anchor.x)
        vertices[5] = vertices[7] = ts._height * (1.0 - ts.anchor.y)

        if (ts.uvRespectAnchor) {
          vertices = quad.uvs

          vertices[0] = vertices[6] = -ts.anchor.x
          vertices[1] = vertices[3] = -ts.anchor.y

          vertices[2] = vertices[4] = 1.0 - ts.anchor.x
          vertices[5] = vertices[7] = 1.0 - ts.anchor.y
        }

        quad.upload()

        var tex = ts._texture
        var baseTex = tex.baseTexture
        var lt = ts.tileTransform.localTransform
        var uv = ts.uvTransform
        var isSimple = baseTex.isPowerOfTwo && tex.frame.width === baseTex.width && tex.frame.height === baseTex.height

        // auto, force repeat wrapMode for big tiling textures
        if (isSimple) {
          if (!baseTex._glTextures[renderer.CONTEXT_UID]) {
            if (baseTex.wrapMode === _const.WRAP_MODES.CLAMP) {
              baseTex.wrapMode = _const.WRAP_MODES.REPEAT
            }
          } else {
            isSimple = baseTex.wrapMode !== _const.WRAP_MODES.CLAMP
          }
        }

        var shader = isSimple ? this.simpleShader : this.shader

        renderer.bindShader(shader)

        var w = tex.width
        var h = tex.height
        var W = ts._width
        var H = ts._height

        tempMat.set(lt.a * w / W, lt.b * w / H, lt.c * h / W, lt.d * h / H, lt.tx / W, lt.ty / H)

        // that part is the same as above:
        // tempMat.identity()
        // tempMat.scale(tex.width, tex.height)
        // tempMat.prepend(lt)
        // tempMat.scale(1.0 / ts._width, 1.0 / ts._height)

        tempMat.invert()
        if (isSimple) {
          tempMat.prepend(uv.mapCoord)
        } else {
          shader.uniforms.uMapCoord = uv.mapCoord.toArray(true)
          shader.uniforms.uClampFrame = uv.uClampFrame
          shader.uniforms.uClampOffset = uv.uClampOffset
        }

        shader.uniforms.uTransform = tempMat.toArray(true)
        shader.uniforms.uColor = core.utils.premultiplyTintToRgba(ts.tint, ts.worldAlpha, shader.uniforms.uColor, baseTex.premultipliedAlpha)
        shader.uniforms.translationMatrix = ts.transform.worldTransform.toArray(true)

        shader.uniforms.uSampler = renderer.bindTexture(tex)

        renderer.setBlendMode(core.utils.correctBlendMode(ts.blendMode, baseTex.premultipliedAlpha))

        quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0)
      }

      return TilingSpriteRenderer
    }(core.ObjectRenderer)

    exports.default = TilingSpriteRenderer


    core.WebGLRenderer.registerPlugin('tilingSprite', TilingSpriteRenderer)

  }, {
    "../../core": 65,
    "../../core/const": 46,
    "path": 8
  }],
  143: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _path = $require('path')

        
        
    /**
     * Simplest filter - applies alpha
     *
     * Use this instead of Container's alpha property to avoid visual layering of individual elements.
     * AlphaFilter applies alpha evenly across the entire display object and any opaque elements it contains.
     * If elements are not opaque, they will blend with each other anyway.
     *
     * Very handy if you want to use common features of all filters:
     *
     * 1. Assign a blendMode to this filter, blend all elements inside display object with background.
     *
     * 2. To use clipping in display coordinates, assign a filterArea to the same container that has this filter.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var AlphaFilter = function (_core$Filter) {
      inherits_(AlphaFilter, _core$Filter)

      /**
       * @param {number} [alpha=1] Amount of alpha from 0 to 1, where 0 is transparent
       */
      function AlphaFilter() {
        var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0

        class_call_check_(this, AlphaFilter)

        var _this = get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}',
          // fragment shader
          'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n'))

        _this.alpha = alpha
        _this.glShaderKey = 'alpha'
        return _this
      }

      /**
       * Coefficient for alpha multiplication
       *
       * @member {number}
       * @default 1
       */


      create_class_(AlphaFilter, [{
        key: 'alpha',
        get: function get() {
          return this.uniforms.uAlpha
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uniforms.uAlpha = value
        }
      }])

      return AlphaFilter
    }(core.Filter)

    exports.default = AlphaFilter

  }, {
    "../../core": 65,
    "path": 8
  }],
  144: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _BlurXFilter = $require('./BlurXFilter')

    var _BlurXFilter2 = interop_require_default_(_BlurXFilter)

    var _BlurYFilter = $require('./BlurYFilter')

    var _BlurYFilter2 = interop_require_default_(_BlurYFilter)

    
        
        
    /**
     * The BlurFilter applies a Gaussian blur to an object.
     * The strength of the blur can be set for x- and y-axis separately.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var BlurFilter = function (_core$Filter) {
      inherits_(BlurFilter, _core$Filter)

      /**
       * @param {number} strength - The strength of the blur filter.
       * @param {number} quality - The quality of the blur filter.
       * @param {number} resolution - The resolution of the blur filter.
       * @param {number} [kernelSize=5] - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
       */
      function BlurFilter(strength, quality, resolution, kernelSize) {
        class_call_check_(this, BlurFilter)

        var _this = get_constructor_(this, _core$Filter.call(this))

        _this.blurXFilter = new _BlurXFilter2.default(strength, quality, resolution, kernelSize)
        _this.blurYFilter = new _BlurYFilter2.default(strength, quality, resolution, kernelSize)

        _this.padding = 0
        _this.resolution = resolution || core.settings.RESOLUTION
        _this.quality = quality || 4
        _this.blur = strength || 8
        return _this
      }

      /**
       * Applies the filter.
       *
       * @param {PIXI.FilterManager} filterManager - The manager.
       * @param {PIXI.RenderTarget} input - The input target.
       * @param {PIXI.RenderTarget} output - The output target.
       */


      BlurFilter.prototype.apply = function apply(filterManager, input, output) {
        var renderTarget = filterManager.getRenderTarget(true)

        this.blurXFilter.apply(filterManager, input, renderTarget, true)
        this.blurYFilter.apply(filterManager, renderTarget, output, false)

        filterManager.returnRenderTarget(renderTarget)
      }

      /**
       * Sets the strength of both the blurX and blurY properties simultaneously
       *
       * @member {number}
       * @default 2
       */


      create_class_(BlurFilter, [{
        key: 'blur',
        get: function get() {
          return this.blurXFilter.blur
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.blurXFilter.blur = this.blurYFilter.blur = value
          this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2
        }

        /**
         * Sets the number of passes for blur. More passes means higher quaility bluring.
         *
         * @member {number}
         * @default 1
         */

      }, {
        key: 'quality',
        get: function get() {
          return this.blurXFilter.quality
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.blurXFilter.quality = this.blurYFilter.quality = value
        }

        /**
         * Sets the strength of the blurX property
         *
         * @member {number}
         * @default 2
         */

      }, {
        key: 'blurX',
        get: function get() {
          return this.blurXFilter.blur
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.blurXFilter.blur = value
          this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2
        }

        /**
         * Sets the strength of the blurY property
         *
         * @member {number}
         * @default 2
         */

      }, {
        key: 'blurY',
        get: function get() {
          return this.blurYFilter.blur
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.blurYFilter.blur = value
          this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2
        }

        /**
         * Sets the blendmode of the filter
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL
         */

      }, {
        key: 'blendMode',
        get: function get() {
          return this.blurYFilter._blendMode
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.blurYFilter._blendMode = value
        }
      }])

      return BlurFilter
    }(core.Filter)

    exports.default = BlurFilter

  }, {
    "../../core": 65,
    "./BlurXFilter": 145,
    "./BlurYFilter": 146
  }],
  145: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _generateBlurVertSource = $require('./generateBlurVertSource')

    var _generateBlurVertSource2 = interop_require_default_(_generateBlurVertSource)

    var _generateBlurFragSource = $require('./generateBlurFragSource')

    var _generateBlurFragSource2 = interop_require_default_(_generateBlurFragSource)

    var _getMaxBlurKernelSize = $require('./getMaxBlurKernelSize')

    var _getMaxBlurKernelSize2 = interop_require_default_(_getMaxBlurKernelSize)

    
        
        
    /**
     * The BlurXFilter applies a horizontal Gaussian blur to an object.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var BlurXFilter = function (_core$Filter) {
      inherits_(BlurXFilter, _core$Filter)

      /**
       * @param {number} strength - The strength of the blur filter.
       * @param {number} quality - The quality of the blur filter.
       * @param {number} resolution - The resolution of the blur filter.
       * @param {number} [kernelSize=5] - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
       */
      function BlurXFilter(strength, quality, resolution, kernelSize) {
        class_call_check_(this, BlurXFilter)

        kernelSize = kernelSize || 5
        var vertSrc = (0, _generateBlurVertSource2.default)(kernelSize, true)
        var fragSrc = (0, _generateBlurFragSource2.default)(kernelSize)

        var _this = get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          vertSrc,
          // fragment shader
          fragSrc))

        _this.resolution = resolution || core.settings.RESOLUTION

        _this._quality = 0

        _this.quality = quality || 4
        _this.strength = strength || 8

        _this.firstRun = true
        return _this
      }

      /**
       * Applies the filter.
       *
       * @param {PIXI.FilterManager} filterManager - The manager.
       * @param {PIXI.RenderTarget} input - The input target.
       * @param {PIXI.RenderTarget} output - The output target.
       * @param {boolean} clear - Should the output be cleared before rendering?
       */


      BlurXFilter.prototype.apply = function apply(filterManager, input, output, clear) {
        if (this.firstRun) {
          var gl = filterManager.renderer.gl
          var kernelSize = (0, _getMaxBlurKernelSize2.default)(gl)

          this.vertexSrc = (0, _generateBlurVertSource2.default)(kernelSize, true)
          this.fragmentSrc = (0, _generateBlurFragSource2.default)(kernelSize)

          this.firstRun = false
        }

        this.uniforms.strength = 1 / output.size.width * (output.size.width / input.size.width)

        // screen space!
        this.uniforms.strength *= this.strength
        this.uniforms.strength /= this.passes; // / this.passes//Math.pow(1, this.passes)

        if (this.passes === 1) {
          filterManager.applyFilter(this, input, output, clear)
        } else {
          var renderTarget = filterManager.getRenderTarget(true)
          var flip = input
          var flop = renderTarget

          for (var i = 0; i < this.passes - 1; i++) {
            filterManager.applyFilter(this, flip, flop, true)

            var temp = flop

            flop = flip
            flip = temp
          }

          filterManager.applyFilter(this, flip, output, clear)

          filterManager.returnRenderTarget(renderTarget)
        }
      }

      /**
       * Sets the strength of both the blur.
       *
       * @member {number}
       * @default 16
       */


      create_class_(BlurXFilter, [{
        key: 'blur',
        get: function get() {
          return this.strength
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.padding = Math.abs(value) * 2
          this.strength = value
        }

        /**
         * Sets the quality of the blur by modifying the number of passes. More passes means higher
         * quaility bluring but the lower the performance.
         *
         * @member {number}
         * @default 4
         */

      }, {
        key: 'quality',
        get: function get() {
          return this._quality
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._quality = value
          this.passes = value
        }
      }])

      return BlurXFilter
    }(core.Filter)

    exports.default = BlurXFilter

  }, {
    "../../core": 65,
    "./generateBlurFragSource": 147,
    "./generateBlurVertSource": 148,
    "./getMaxBlurKernelSize": 149
  }],
  146: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _generateBlurVertSource = $require('./generateBlurVertSource')

    var _generateBlurVertSource2 = interop_require_default_(_generateBlurVertSource)

    var _generateBlurFragSource = $require('./generateBlurFragSource')

    var _generateBlurFragSource2 = interop_require_default_(_generateBlurFragSource)

    var _getMaxBlurKernelSize = $require('./getMaxBlurKernelSize')

    var _getMaxBlurKernelSize2 = interop_require_default_(_getMaxBlurKernelSize)

    
        
        
    /**
     * The BlurYFilter applies a horizontal Gaussian blur to an object.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var BlurYFilter = function (_core$Filter) {
      inherits_(BlurYFilter, _core$Filter)

      /**
       * @param {number} strength - The strength of the blur filter.
       * @param {number} quality - The quality of the blur filter.
       * @param {number} resolution - The resolution of the blur filter.
       * @param {number} [kernelSize=5] - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
       */
      function BlurYFilter(strength, quality, resolution, kernelSize) {
        class_call_check_(this, BlurYFilter)

        kernelSize = kernelSize || 5
        var vertSrc = (0, _generateBlurVertSource2.default)(kernelSize, false)
        var fragSrc = (0, _generateBlurFragSource2.default)(kernelSize)

        var _this = get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          vertSrc,
          // fragment shader
          fragSrc))

        _this.resolution = resolution || core.settings.RESOLUTION

        _this._quality = 0

        _this.quality = quality || 4
        _this.strength = strength || 8

        _this.firstRun = true
        return _this
      }

      /**
       * Applies the filter.
       *
       * @param {PIXI.FilterManager} filterManager - The manager.
       * @param {PIXI.RenderTarget} input - The input target.
       * @param {PIXI.RenderTarget} output - The output target.
       * @param {boolean} clear - Should the output be cleared before rendering?
       */


      BlurYFilter.prototype.apply = function apply(filterManager, input, output, clear) {
        if (this.firstRun) {
          var gl = filterManager.renderer.gl
          var kernelSize = (0, _getMaxBlurKernelSize2.default)(gl)

          this.vertexSrc = (0, _generateBlurVertSource2.default)(kernelSize, false)
          this.fragmentSrc = (0, _generateBlurFragSource2.default)(kernelSize)

          this.firstRun = false
        }

        this.uniforms.strength = 1 / output.size.height * (output.size.height / input.size.height)

        this.uniforms.strength *= this.strength
        this.uniforms.strength /= this.passes

        if (this.passes === 1) {
          filterManager.applyFilter(this, input, output, clear)
        } else {
          var renderTarget = filterManager.getRenderTarget(true)
          var flip = input
          var flop = renderTarget

          for (var i = 0; i < this.passes - 1; i++) {
            filterManager.applyFilter(this, flip, flop, true)

            var temp = flop

            flop = flip
            flip = temp
          }

          filterManager.applyFilter(this, flip, output, clear)

          filterManager.returnRenderTarget(renderTarget)
        }
      }

      /**
       * Sets the strength of both the blur.
       *
       * @member {number}
       * @default 2
       */


      create_class_(BlurYFilter, [{
        key: 'blur',
        get: function get() {
          return this.strength
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.padding = Math.abs(value) * 2
          this.strength = value
        }

        /**
         * Sets the quality of the blur by modifying the number of passes. More passes means higher
         * quaility bluring but the lower the performance.
         *
         * @member {number}
         * @default 4
         */

      }, {
        key: 'quality',
        get: function get() {
          return this._quality
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._quality = value
          this.passes = value
        }
      }])

      return BlurYFilter
    }(core.Filter)

    exports.default = BlurYFilter

  }, {
    "../../core": 65,
    "./generateBlurFragSource": 147,
    "./generateBlurVertSource": 148,
    "./getMaxBlurKernelSize": 149
  }],
  147: [function ($require, container, exports) {
    container.exports = generateFragBlurSource
  }, {}],
  148: [function ($require, container, exports) {
    container.exports = generateVertBlurSource
  }, {}],
  149: [function ($require, container, exports) {
    container.exports = getMaxKernelSize
  }, {}],
  150: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _path = $require('path')

        
        
    /**
     * The ColorMatrixFilter class lets you apply a 5x4 matrix transformation on the RGBA
     * color and alpha values of every pixel on your displayObject to produce a result
     * with a new set of RGBA color and alpha values. It's pretty powerful!
     *
     * ```js
     *  let colorMatrix = new PIXI.filters.ColorMatrixFilter()
     *  container.filters = [colorMatrix]
     *  colorMatrix.contrast(2)
     * ```
     * @author Clément Chenebault <clement@goodboydigital.com>
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var ColorMatrixFilter = function (_core$Filter) {
      inherits_(ColorMatrixFilter, _core$Filter)

      /**
       *
       */
      function ColorMatrixFilter() {
        class_call_check_(this, ColorMatrixFilter)

        var _this = get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}',
          // fragment shader
          'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n'))

        _this.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]

        _this.alpha = 1
        return _this
      }

      /**
       * Transforms current matrix and set the new one
       *
       * @param {number[]} matrix - 5x4 matrix
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype._loadMatrix = function _loadMatrix(matrix) {
        var multiply = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

        var newMatrix = matrix

        if (multiply) {
          this._multiply(newMatrix, this.uniforms.m, matrix)
          newMatrix = this._colorMatrix(newMatrix)
        }

        // set the new matrix
        this.uniforms.m = newMatrix
      }

      /**
       * Multiplies two mat5's
       *
       * @private
       * @param {number[]} out - 5x4 matrix the receiving matrix
       * @param {number[]} a - 5x4 matrix the first operand
       * @param {number[]} b - 5x4 matrix the second operand
       * @returns {number[]} 5x4 matrix
       */


      ColorMatrixFilter.prototype._multiply = function _multiply(out, a, b) {
        // Red Channel
        out[0] = a[0] * b[0] + a[1] * b[5] + a[2] * b[10] + a[3] * b[15]
        out[1] = a[0] * b[1] + a[1] * b[6] + a[2] * b[11] + a[3] * b[16]
        out[2] = a[0] * b[2] + a[1] * b[7] + a[2] * b[12] + a[3] * b[17]
        out[3] = a[0] * b[3] + a[1] * b[8] + a[2] * b[13] + a[3] * b[18]
        out[4] = a[0] * b[4] + a[1] * b[9] + a[2] * b[14] + a[3] * b[19] + a[4]

        // Green Channel
        out[5] = a[5] * b[0] + a[6] * b[5] + a[7] * b[10] + a[8] * b[15]
        out[6] = a[5] * b[1] + a[6] * b[6] + a[7] * b[11] + a[8] * b[16]
        out[7] = a[5] * b[2] + a[6] * b[7] + a[7] * b[12] + a[8] * b[17]
        out[8] = a[5] * b[3] + a[6] * b[8] + a[7] * b[13] + a[8] * b[18]
        out[9] = a[5] * b[4] + a[6] * b[9] + a[7] * b[14] + a[8] * b[19] + a[9]

        // Blue Channel
        out[10] = a[10] * b[0] + a[11] * b[5] + a[12] * b[10] + a[13] * b[15]
        out[11] = a[10] * b[1] + a[11] * b[6] + a[12] * b[11] + a[13] * b[16]
        out[12] = a[10] * b[2] + a[11] * b[7] + a[12] * b[12] + a[13] * b[17]
        out[13] = a[10] * b[3] + a[11] * b[8] + a[12] * b[13] + a[13] * b[18]
        out[14] = a[10] * b[4] + a[11] * b[9] + a[12] * b[14] + a[13] * b[19] + a[14]

        // Alpha Channel
        out[15] = a[15] * b[0] + a[16] * b[5] + a[17] * b[10] + a[18] * b[15]
        out[16] = a[15] * b[1] + a[16] * b[6] + a[17] * b[11] + a[18] * b[16]
        out[17] = a[15] * b[2] + a[16] * b[7] + a[17] * b[12] + a[18] * b[17]
        out[18] = a[15] * b[3] + a[16] * b[8] + a[17] * b[13] + a[18] * b[18]
        out[19] = a[15] * b[4] + a[16] * b[9] + a[17] * b[14] + a[18] * b[19] + a[19]

        return out
      }

      /**
       * Create a Float32 Array and normalize the offset component to 0-1
       *
       * @private
       * @param {number[]} matrix - 5x4 matrix
       * @return {number[]} 5x4 matrix with all values between 0-1
       */


      ColorMatrixFilter.prototype._colorMatrix = function _colorMatrix(matrix) {
        // Create a Float32 Array and normalize the offset component to 0-1
        var m = new Float32Array(matrix)

        m[4] /= 255
        m[9] /= 255
        m[14] /= 255
        m[19] /= 255

        return m
      }

      /**
       * Adjusts brightness
       *
       * @param {number} b - value of the brigthness (0-1, where 0 is black)
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.brightness = function brightness(b, multiply) {
        var matrix = [b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Set the matrices in grey scales
       *
       * @param {number} scale - value of the grey (0-1, where 0 is black)
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.greyscale = function greyscale(scale, multiply) {
        var matrix = [scale, scale, scale, 0, 0, scale, scale, scale, 0, 0, scale, scale, scale, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Set the black and white matrice.
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.blackAndWhite = function blackAndWhite(multiply) {
        var matrix = [0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Set the hue property of the color
       *
       * @param {number} rotation - in degrees
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.hue = function hue(rotation, multiply) {
        rotation = (rotation || 0) / 180 * Math.PI

        var cosR = Math.cos(rotation)
        var sinR = Math.sin(rotation)
        var sqrt = Math.sqrt

        /* a good approximation for hue rotation
         This matrix is far better than the versions with magic luminance constants
         formerly used here, but also used in the starling framework (flash) and known from this
         old part of the internet: quasimondo.com/archives/000565.php
          This new matrix is based on rgb cube rotation in space. Look here for a more descriptive
         implementation as a shader not a general matrix:
         https://github.com/evanw/glfx.js/blob/58841c23919bd59787effc0333a4897b43835412/src/filters/adjust/huesaturation.js
          This is the source for the code:
         see http://stackoverflow.com/questions/8507885/shift-hue-of-an-rgb-color/8510751#8510751
         */

        var w = 1 / 3
        var sqrW = sqrt(w); // weight is

        var a00 = cosR + (1.0 - cosR) * w
        var a01 = w * (1.0 - cosR) - sqrW * sinR
        var a02 = w * (1.0 - cosR) + sqrW * sinR

        var a10 = w * (1.0 - cosR) + sqrW * sinR
        var a11 = cosR + w * (1.0 - cosR)
        var a12 = w * (1.0 - cosR) - sqrW * sinR

        var a20 = w * (1.0 - cosR) - sqrW * sinR
        var a21 = w * (1.0 - cosR) + sqrW * sinR
        var a22 = cosR + w * (1.0 - cosR)

        var matrix = [a00, a01, a02, 0, 0, a10, a11, a12, 0, 0, a20, a21, a22, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Set the contrast matrix, increase the separation between dark and bright
       * Increase contrast : shadows darker and highlights brighter
       * Decrease contrast : bring the shadows up and the highlights down
       *
       * @param {number} amount - value of the contrast (0-1)
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.contrast = function contrast(amount, multiply) {
        var v = (amount || 0) + 1
        var o = -0.5 * (v - 1)

        var matrix = [v, 0, 0, 0, o, 0, v, 0, 0, o, 0, 0, v, 0, o, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Set the saturation matrix, increase the separation between colors
       * Increase saturation : increase contrast, brightness, and sharpness
       *
       * @param {number} amount - The saturation amount (0-1)
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.saturate = function saturate() {
        var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
        var multiply = arguments[1]

        var x = amount * 2 / 3 + 1
        var y = (x - 1) * -0.5

        var matrix = [x, y, y, 0, 0, y, x, y, 0, 0, y, y, x, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Desaturate image (remove color)
       *
       * Call the saturate function
       *
       */


      ColorMatrixFilter.prototype.desaturate = function desaturate() // eslint-disable-line no-unused-vars
      {
        this.saturate(-1)
      }

      /**
       * Negative image (inverse of classic rgb matrix)
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.negative = function negative(multiply) {
        var matrix = [-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Sepia image
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.sepia = function sepia(multiply) {
        var matrix = [0.393, 0.7689999, 0.18899999, 0, 0, 0.349, 0.6859999, 0.16799999, 0, 0, 0.272, 0.5339999, 0.13099999, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Color motion picture process invented in 1916 (thanks Dominic Szablewski)
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.technicolor = function technicolor(multiply) {
        var matrix = [1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, 11.793603434377337, -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -70.35205161461398, -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Polaroid filter
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.polaroid = function polaroid(multiply) {
        var matrix = [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Filter who transforms : Red -> Blue and Blue -> Red
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.toBGR = function toBGR(multiply) {
        var matrix = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Color reversal film introduced by Eastman Kodak in 1935. (thanks Dominic Szablewski)
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.kodachrome = function kodachrome(multiply) {
        var matrix = [1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502, -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203, -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Brown delicious browni filter (thanks Dominic Szablewski)
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.browni = function browni(multiply) {
        var matrix = [0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, 47.43192855600873, -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, -36.96841498319127, 0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Vintage filter (thanks Dominic Szablewski)
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.vintage = function vintage(multiply) {
        var matrix = [0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 9.651285835294123, 0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 7.462829176470591, 0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * We don't know exactly what it does, kind of gradient map, but funny to play with!
       *
       * @param {number} desaturation - Tone values.
       * @param {number} toned - Tone values.
       * @param {string} lightColor - Tone values, example: `0xFFE580`
       * @param {string} darkColor - Tone values, example: `0xFFE580`
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.colorTone = function colorTone(desaturation, toned, lightColor, darkColor, multiply) {
        desaturation = desaturation || 0.2
        toned = toned || 0.15
        lightColor = lightColor || 0xFFE580
        darkColor = darkColor || 0x338000

        var lR = (lightColor >> 16 & 0xFF) / 255
        var lG = (lightColor >> 8 & 0xFF) / 255
        var lB = (lightColor & 0xFF) / 255

        var dR = (darkColor >> 16 & 0xFF) / 255
        var dG = (darkColor >> 8 & 0xFF) / 255
        var dB = (darkColor & 0xFF) / 255

        var matrix = [0.3, 0.59, 0.11, 0, 0, lR, lG, lB, desaturation, 0, dR, dG, dB, toned, 0, lR - dR, lG - dG, lB - dB, 0, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Night effect
       *
       * @param {number} intensity - The intensity of the night effect.
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.night = function night(intensity, multiply) {
        intensity = intensity || 0.1
        var matrix = [intensity * -2.0, -intensity, 0, 0, 0, -intensity, 0, intensity, 0, 0, 0, intensity, intensity * 2.0, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Predator effect
       *
       * Erase the current matrix by setting a new indepent one
       *
       * @param {number} amount - how much the predator feels his future victim
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.predator = function predator(amount, multiply) {
        var matrix = [
          // row 1
          11.224130630493164 * amount, -4.794486999511719 * amount, -2.8746118545532227 * amount, 0 * amount, 0.40342438220977783 * amount,
          // row 2
          -3.6330697536468506 * amount, 9.193157196044922 * amount, -2.951810836791992 * amount, 0 * amount, -1.316135048866272 * amount,
          // row 3
          -3.2184197902679443 * amount, -4.2375030517578125 * amount, 7.476448059082031 * amount, 0 * amount, 0.8044459223747253 * amount,
          // row 4
          0, 0, 0, 1, 0
        ]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * LSD effect
       *
       * Multiply the current matrix
       *
       * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
       *  just set the current matrix with @param matrix
       */


      ColorMatrixFilter.prototype.lsd = function lsd(multiply) {
        var matrix = [2, -0.4, 0.5, 0, 0, -0.5, 2, -0.4, 0, 0, -0.4, -0.5, 3, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, multiply)
      }

      /**
       * Erase the current matrix by setting the default one
       *
       */


      ColorMatrixFilter.prototype.reset = function reset() {
        var matrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]

        this._loadMatrix(matrix, false)
      }

      /**
       * The matrix of the color matrix filter
       *
       * @member {number[]}
       * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
       */


      create_class_(ColorMatrixFilter, [{
        key: 'matrix',
        get: function get() {
          return this.uniforms.m
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uniforms.m = value
        }

        /**
         * The opacity value to use when mixing the original and resultant colors.
         *
         * When the value is 0, the original color is used without modification.
         * When the value is 1, the result color is used.
         * When in the range (0, 1) the color is interpolated between the original and result by this amount.
         *
         * @member {number}
         * @default 1
         */

      }, {
        key: 'alpha',
        get: function get() {
          return this.uniforms.uAlpha
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uniforms.uAlpha = value
        }
      }])

      return ColorMatrixFilter
    }(core.Filter)

    // Americanized alias


    exports.default = ColorMatrixFilter
    ColorMatrixFilter.prototype.grayscale = ColorMatrixFilter.prototype.greyscale

  }, {
    "../../core": 65,
    "path": 8
  }],
  151: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _path = $require('path')

        
        
    /**
     * The DisplacementFilter class uses the pixel values from the specified texture
     * (called the displacement map) to perform a displacement of an object. You can
     * use this filter to apply all manor of crazy warping effects. Currently the r
     * property of the texture is used to offset the x and the g property of the texture
     * is used to offset the y.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var DisplacementFilter = function (_core$Filter) {
      inherits_(DisplacementFilter, _core$Filter)

      /**
       * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
       * @param {number} scale - The scale of the displacement
       */
      function DisplacementFilter(sprite, scale) {
        class_call_check_(this, DisplacementFilter)

        var maskMatrix = new core.Matrix()

        sprite.renderable = false

        var _this = get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}',
          // fragment shader
          'varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy *= scale / filterArea.xy;\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n'))

        _this.maskSprite = sprite
        _this.maskMatrix = maskMatrix

        _this.uniforms.mapSampler = sprite._texture
        _this.uniforms.filterMatrix = maskMatrix
        _this.uniforms.scale = {
          x: 1,
          y: 1
        }

        if (scale === null || scale === undefined) {
          scale = 20
        }

        _this.scale = new core.Point(scale, scale)
        return _this
      }

      /**
       * Applies the filter.
       *
       * @param {PIXI.FilterManager} filterManager - The manager.
       * @param {PIXI.RenderTarget} input - The input target.
       * @param {PIXI.RenderTarget} output - The output target.
       */


      DisplacementFilter.prototype.apply = function apply(filterManager, input, output) {
        this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite)
        this.uniforms.scale.x = this.scale.x
        this.uniforms.scale.y = this.scale.y

        // draw the filter...
        filterManager.applyFilter(this, input, output)
      }

      /**
       * The texture used for the displacement map. Must be power of 2 sized texture.
       *
       * @member {PIXI.Texture}
       */


      create_class_(DisplacementFilter, [{
        key: 'map',
        get: function get() {
          return this.uniforms.mapSampler
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uniforms.mapSampler = value
        }
      }])

      return DisplacementFilter
    }(core.Filter)

    exports.default = DisplacementFilter

  }, {
    "../../core": 65,
    "path": 8
  }],
  152: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _path = $require('path')

        
        
    /**
     *
     * Basic FXAA implementation based on the code on geeks3d.com with the
     * modification that the texture2DLod stuff was removed since it's
     * unsupported by WebGL.
     *
     * @see https://github.com/mitsuhiko/webgl-meincraft
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     *
     */
    var FXAAFilter = function (_core$Filter) {
      inherits_(FXAAFilter, _core$Filter)

      /**
       *
       */
      function FXAAFilter() {
        class_call_check_(this, FXAAFilter)

        // TODO - needs work
        return get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          '\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}',
          // fragment shader
          'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'))
      }

      return FXAAFilter
    }(core.Filter)

    exports.default = FXAAFilter

  }, {
    "../../core": 65,
    "path": 8
  }],
  153: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _FXAAFilter = $require('./fxaa/FXAAFilter')

    Object.defineProperty(exports, 'FXAAFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_FXAAFilter).default
      }
    })

    var _NoiseFilter = $require('./noise/NoiseFilter')

    Object.defineProperty(exports, 'NoiseFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_NoiseFilter).default
      }
    })

    var _DisplacementFilter = $require('./displacement/DisplacementFilter')

    Object.defineProperty(exports, 'DisplacementFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_DisplacementFilter).default
      }
    })

    var _BlurFilter = $require('./blur/BlurFilter')

    Object.defineProperty(exports, 'BlurFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BlurFilter).default
      }
    })

    var _BlurXFilter = $require('./blur/BlurXFilter')

    Object.defineProperty(exports, 'BlurXFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BlurXFilter).default
      }
    })

    var _BlurYFilter = $require('./blur/BlurYFilter')

    Object.defineProperty(exports, 'BlurYFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BlurYFilter).default
      }
    })

    var _ColorMatrixFilter = $require('./colormatrix/ColorMatrixFilter')

    Object.defineProperty(exports, 'ColorMatrixFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_ColorMatrixFilter).default
      }
    })

    var _AlphaFilter = $require('./alpha/AlphaFilter')

    Object.defineProperty(exports, 'AlphaFilter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_AlphaFilter).default
      }
    })

    
  }, {
    "./alpha/AlphaFilter": 143,
    "./blur/BlurFilter": 144,
    "./blur/BlurXFilter": 145,
    "./blur/BlurYFilter": 146,
    "./colormatrix/ColorMatrixFilter": 150,
    "./displacement/DisplacementFilter": 151,
    "./fxaa/FXAAFilter": 152,
    "./noise/NoiseFilter": 154
  }],
  154: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _path = $require('path')

        
        
    /**
     * @author Vico @vicocotea
     * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/noise.js
     */

    /**
     * A Noise effect filter.
     *
     * @class
     * @extends PIXI.Filter
     * @memberof PIXI.filters
     */
    var NoiseFilter = function (_core$Filter) {
      inherits_(NoiseFilter, _core$Filter)

      /**
       * @param {number} noise - The noise intensity, should be a normalized value in the range [0, 1].
       * @param {number} seed - A random seed for the noise generation. Default is `Math.random()`.
       */
      function NoiseFilter() {
        var noise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5
        var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.random()

        class_call_check_(this, NoiseFilter)

        var _this = get_constructor_(this, _core$Filter.call(this,
          // vertex shader
          'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}',
          // fragment shader
          'precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n'))

        _this.noise = noise
        _this.seed = seed
        return _this
      }

      /**
       * The amount of noise to apply, this value should be in the range (0, 1].
       *
       * @member {number}
       * @default 0.5
       */


      create_class_(NoiseFilter, [{
        key: 'noise',
        get: function get() {
          return this.uniforms.uNoise
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uniforms.uNoise = value
        }

        /**
         * A seed value to apply to the random noise generation. `Math.random()` is a good value to use.
         *
         * @member {number}
         */

      }, {
        key: 'seed',
        get: function get() {
          return this.uniforms.uSeed
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.uniforms.uSeed = value
        }
      }])

      return NoiseFilter
    }(core.Filter)

    exports.default = NoiseFilter

  }, {
    "../../core": 65,
    "path": 8
  }],
  155: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

        
    /**
     * Holds all information related to an Interaction event
     *
     * @class
     * @memberof PIXI.interaction
     */
    var InteractionData = function () {
      /**
       *
       */
      function InteractionData() {
        class_call_check_(this, InteractionData)

        /**
         * This point stores the global coords of where the touch/mouse event happened
         *
         * @member {PIXI.Point}
         */
        this.global = new core.Point()

        /**
         * The target DisplayObject that was interacted with
         *
         * @member {PIXI.DisplayObject}
         */
        this.target = null

        /**
         * When passed to an event handler, this will be the original DOM Event that was captured
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
         * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
         * @member {MouseEvent|TouchEvent|PointerEvent}
         */
        this.originalEvent = null

        /**
         * Unique identifier for this interaction
         *
         * @member {number}
         */
        this.identifier = null

        /**
         * Indicates whether or not the pointer device that created the event is the primary pointer.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary
         * @type {Boolean}
         */
        this.isPrimary = false

        /**
         * Indicates which button was pressed on the mouse or pointer device to trigger the event.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
         * @type {number}
         */
        this.button = 0

        /**
         * Indicates which buttons are pressed on the mouse or pointer device when the event is triggered.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
         * @type {number}
         */
        this.buttons = 0

        /**
         * The width of the pointer's contact along the x-axis, measured in CSS pixels.
         * radiusX of TouchEvents will be represented by this value.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width
         * @type {number}
         */
        this.width = 0

        /**
         * The height of the pointer's contact along the y-axis, measured in CSS pixels.
         * radiusY of TouchEvents will be represented by this value.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height
         * @type {number}
         */
        this.height = 0

        /**
         * The angle, in degrees, between the pointer device and the screen.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltX
         * @type {number}
         */
        this.tiltX = 0

        /**
         * The angle, in degrees, between the pointer device and the screen.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltY
         * @type {number}
         */
        this.tiltY = 0

        /**
         * The type of pointer that triggered the event.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType
         * @type {string}
         */
        this.pointerType = null

        /**
         * Pressure applied by the pointing device during the event. A Touch's force property
         * will be represented by this value.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure
         * @type {number}
         */
        this.pressure = 0

        /**
         * From TouchEvents (not PointerEvents triggered by touches), the rotationAngle of the Touch.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Touch/rotationAngle
         * @type {number}
         */
        this.rotationAngle = 0

        /**
         * Twist of a stylus pointer.
         * @see https://w3c.github.io/pointerevents/#pointerevent-interface
         * @type {number}
         */
        this.twist = 0

        /**
         * Barrel pressure on a stylus pointer.
         * @see https://w3c.github.io/pointerevents/#pointerevent-interface
         * @type {number}
         */
        this.tangentialPressure = 0
      }

      /**
       * The unique identifier of the pointer. It will be the same as `identifier`.
       * @readonly
       * @member {number}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId
       */


      /**
       * This will return the local coordinates of the specified displayObject for this InteractionData
       *
       * @param {PIXI.DisplayObject} displayObject - The DisplayObject that you would like the local
       *  coords off
       * @param {PIXI.Point} [point] - A Point object in which to store the value, optional (otherwise
       *  will create a new point)
       * @param {PIXI.Point} [globalPos] - A Point object containing your custom global coords, optional
       *  (otherwise will use the current global coords)
       * @return {PIXI.Point} A point containing the coordinates of the InteractionData position relative
       *  to the DisplayObject
       */
      InteractionData.prototype.getLocalPosition = function getLocalPosition(displayObject, point, globalPos) {
        return displayObject.worldTransform.applyInverse(globalPos || this.global, point)
      }

      /**
       * Copies properties from normalized event data.
       *
       * @param {Touch|MouseEvent|PointerEvent} event The normalized event data
       */
      InteractionData.prototype.copyEvent = function copyEvent(event) {
        // isPrimary should only change on touchstart/pointerdown, so we don't want to overwrite
        // it with "false" on later events when our shim for it on touch events might not be
        // accurate
        if (event.isPrimary) {
          this.isPrimary = true
        }
        this.button = event.button
        // event.buttons is not available in all browsers (ie. Safari), but it does have a non-standard
        // event.which property instead, which conveys the same information.
        this.buttons = Number.isInteger(event.buttons) ? event.buttons : event.which
        this.width = event.width
        this.height = event.height
        this.tiltX = event.tiltX
        this.tiltY = event.tiltY
        this.pointerType = event.pointerType
        this.pressure = event.pressure
        this.rotationAngle = event.rotationAngle
        this.twist = event.twist || 0
        this.tangentialPressure = event.tangentialPressure || 0
      }

      /**
       * Resets the data for pooling.
       */


      InteractionData.prototype.reset = function reset() {
        // isPrimary is the only property that we really need to reset - everything else is
        // guaranteed to be overwritten
        this.isPrimary = false
      }

      create_class_(InteractionData, [{
        key: 'pointerId',
        get: function get() {
          return this.identifier
        }
      }])

      return InteractionData
    }()

    exports.default = InteractionData

  }, {
    "../core": 65
  }],
  156: [function ($require, container, exports) {
    container.exports = InteractionEvent
  }, {}],
  157: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _InteractionData = $require('./InteractionData')

    var _InteractionData2 = interop_require_default_(_InteractionData)

    var _InteractionEvent = $require('./InteractionEvent')

    var _InteractionEvent2 = interop_require_default_(_InteractionEvent)

    var _InteractionTrackingData = $require('./InteractionTrackingData')

    var _InteractionTrackingData2 = interop_require_default_(_InteractionTrackingData)

    var _eventemitter = $require('eventemitter3')

    var _eventemitter2 = interop_require_default_(_eventemitter)

    var _interactiveTarget = $require('./interactiveTarget')

    var _interactiveTarget2 = interop_require_default_(_interactiveTarget)

    
        
        
    // Mix interactiveTarget into core.DisplayObject.prototype, after deprecation has been handled
    core.utils.mixins.delayMixin(core.DisplayObject.prototype, _interactiveTarget2.default)

    var MOUSE_POINTER_ID = 1

    // helpers for hitTest() - only used inside hitTest()
    var hitTestEvent = {
      target: null,
      data: {
        global: null
      }
    }

    /**
     * The interaction manager deals with mouse, touch and pointer events. Any DisplayObject can be interactive
     * if its interactive parameter is set to true
     * This manager also supports multitouch.
     *
     * An instance of this class is automatically created by default, and can be found at renderer.plugins.interaction
     *
     * @class
     * @extends EventEmitter
     * @memberof PIXI.interaction
     */

    var InteractionManager = function (_EventEmitter) {
      inherits_(InteractionManager, _EventEmitter)

      /**
       * @param {PIXI.CanvasRenderer|PIXI.WebGLRenderer} renderer - A reference to the current renderer
       * @param {object} [options] - The options for the manager.
       * @param {boolean} [options.autoPreventDefault=true] - Should the manager automatically prevent default browser actions.
       * @param {number} [options.interactionFrequency=10] - Frequency increases the interaction events will be checked.
       */
      function InteractionManager(renderer, options) {
        class_call_check_(this, InteractionManager)

        var _this = get_constructor_(this, _EventEmitter.call(this))

        options = options || {}

        /**
         * The renderer this interaction manager works for.
         *
         * @member {PIXI.SystemRenderer}
         */
        _this.renderer = renderer

        /**
         * Should default browser actions automatically be prevented.
         * Does not apply to pointer events for backwards compatibility
         * preventDefault on pointer events stops mouse events from firing
         * Thus, for every pointer event, there will always be either a mouse of touch event alongside it.
         *
         * @member {boolean}
         * @default true
         */
        _this.autoPreventDefault = options.autoPreventDefault !== undefined ? options.autoPreventDefault : true

        /**
         * Frequency in milliseconds that the mousemove, moveover & mouseout interaction events will be checked.
         *
         * @member {number}
         * @default 10
         */
        _this.interactionFrequency = options.interactionFrequency || 10

        /**
         * The mouse data
         *
         * @member {PIXI.interaction.InteractionData}
         */
        _this.mouse = new _InteractionData2.default()
        _this.mouse.identifier = MOUSE_POINTER_ID

        // setting the mouse to start off far off screen will mean that mouse over does
        //  not get called before we even move the mouse.
        _this.mouse.global.set(-999999)

        /**
         * Actively tracked InteractionData
         *
         * @private
         * @member {Object.<number,PIXI.interation.InteractionData>}
         */
        _this.activeInteractionData = {}
        _this.activeInteractionData[MOUSE_POINTER_ID] = _this.mouse

        /**
         * Pool of unused InteractionData
         *
         * @private
         * @member {PIXI.interation.InteractionData[]}
         */
        _this.interactionDataPool = []

        /**
         * An event data object to handle all the event tracking/dispatching
         *
         * @member {object}
         */
        _this.eventData = new _InteractionEvent2.default()

        /**
         * The DOM element to bind to.
         *
         * @private
         * @member {HTMLElement}
         */
        _this.interactionDOMElement = null

        /**
         * This property determines if mousemove and touchmove events are fired only when the cursor
         * is over the object.
         * Setting to true will make things work more in line with how the DOM verison works.
         * Setting to false can make things easier for things like dragging
         * It is currently set to false as this is how PixiJS used to work. This will be set to true in
         * future versions of pixi.
         *
         * @member {boolean}
         * @default false
         */
        _this.moveWhenInside = false

        /**
         * Have events been attached to the dom element?
         *
         * @private
         * @member {boolean}
         */
        _this.eventsAdded = false

        /**
         * Is the mouse hovering over the renderer?
         *
         * @private
         * @member {boolean}
         */
        _this.mouseOverRenderer = false

        /**
         * Does the device support touch events
         * https://www.w3.org/TR/touch-events/
         *
         * @readonly
         * @member {boolean}
         */
        _this.supportsTouchEvents = 'ontouchstart' in window

        /**
         * Does the device support pointer events
         * https://www.w3.org/Submission/pointer-events/
         *
         * @readonly
         * @member {boolean}
         */
        _this.supportsPointerEvents = !!window.PointerEvent

        // this will make it so that you don't have to call bind all the time

        /**
         * @private
         * @member {Function}
         */
        _this.onPointerUp = _this.onPointerUp.bind(_this)
        _this.processPointerUp = _this.processPointerUp.bind(_this)

        /**
         * @private
         * @member {Function}
         */
        _this.onPointerCancel = _this.onPointerCancel.bind(_this)
        _this.processPointerCancel = _this.processPointerCancel.bind(_this)

        /**
         * @private
         * @member {Function}
         */
        _this.onPointerDown = _this.onPointerDown.bind(_this)
        _this.processPointerDown = _this.processPointerDown.bind(_this)

        /**
         * @private
         * @member {Function}
         */
        _this.onPointerMove = _this.onPointerMove.bind(_this)
        _this.processPointerMove = _this.processPointerMove.bind(_this)

        /**
         * @private
         * @member {Function}
         */
        _this.onPointerOut = _this.onPointerOut.bind(_this)
        _this.processPointerOverOut = _this.processPointerOverOut.bind(_this)

        /**
         * @private
         * @member {Function}
         */
        _this.onPointerOver = _this.onPointerOver.bind(_this)

        /**
         * Dictionary of how different cursor modes are handled. Strings are handled as CSS cursor
         * values, objects are handled as dictionaries of CSS values for interactionDOMElement,
         * and functions are called instead of changing the CSS.
         * Default CSS cursor values are provided for 'default' and 'pointer' modes.
         * @member {Object.<string, (string|Function|Object.<string, string>)>}
         */
        _this.cursorStyles = {
          default: 'inherit',
          pointer: 'pointer'
        }

        /**
         * The mode of the cursor that is being used.
         * The value of this is a key from the cursorStyles dictionary.
         *
         * @member {string}
         */
        _this.currentCursorMode = null

        /**
         * Internal cached let.
         *
         * @private
         * @member {string}
         */
        _this.cursor = null

        /**
         * Internal cached let.
         *
         * @private
         * @member {PIXI.Point}
         */
        _this._tempPoint = new core.Point()

        /**
         * The current resolution / device pixel ratio.
         *
         * @member {number}
         * @default 1
         */
        _this.resolution = 1

        _this.setTargetElement(_this.renderer.view, _this.renderer.resolution)

        /**
         * Fired when a pointer device button (usually a mouse left-button) is pressed on the display
         * object.
         *
         * @event PIXI.interaction.InteractionManager#mousedown
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is pressed
         * on the display object.
         *
         * @event PIXI.interaction.InteractionManager#rightdown
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is released over the display
         * object.
         *
         * @event PIXI.interaction.InteractionManager#mouseup
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is released
         * over the display object.
         *
         * @event PIXI.interaction.InteractionManager#rightup
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is pressed and released on
         * the display object.
         *
         * @event PIXI.interaction.InteractionManager#click
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is pressed
         * and released on the display object.
         *
         * @event PIXI.interaction.InteractionManager#rightclick
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is released outside the
         * display object that initially registered a
         * [mousedown]{@link PIXI.interaction.InteractionManager#event:mousedown}.
         *
         * @event PIXI.interaction.InteractionManager#mouseupoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is released
         * outside the display object that initially registered a
         * [rightdown]{@link PIXI.interaction.InteractionManager#event:rightdown}.
         *
         * @event PIXI.interaction.InteractionManager#rightupoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device (usually a mouse) is moved while over the display object
         *
         * @event PIXI.interaction.InteractionManager#mousemove
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device (usually a mouse) is moved onto the display object
         *
         * @event PIXI.interaction.InteractionManager#mouseover
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device (usually a mouse) is moved off the display object
         *
         * @event PIXI.interaction.InteractionManager#mouseout
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is pressed on the display object.
         *
         * @event PIXI.interaction.InteractionManager#pointerdown
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is released over the display object.
         *
         * @event PIXI.interaction.InteractionManager#pointerup
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when the operating system cancels a pointer event
         *
         * @event PIXI.interaction.InteractionManager#pointercancel
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is pressed and released on the display object.
         *
         * @event PIXI.interaction.InteractionManager#pointertap
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is released outside the display object that initially
         * registered a [pointerdown]{@link PIXI.interaction.InteractionManager#event:pointerdown}.
         *
         * @event PIXI.interaction.InteractionManager#pointerupoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device is moved while over the display object
         *
         * @event PIXI.interaction.InteractionManager#pointermove
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device is moved onto the display object
         *
         * @event PIXI.interaction.InteractionManager#pointerover
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device is moved off the display object
         *
         * @event PIXI.interaction.InteractionManager#pointerout
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is placed on the display object.
         *
         * @event PIXI.interaction.InteractionManager#touchstart
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is removed from the display object.
         *
         * @event PIXI.interaction.InteractionManager#touchend
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when the operating system cancels a touch
         *
         * @event PIXI.interaction.InteractionManager#touchcancel
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is placed and removed from the display object.
         *
         * @event PIXI.interaction.InteractionManager#tap
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is removed outside of the display object that initially
         * registered a [touchstart]{@link PIXI.interaction.InteractionManager#event:touchstart}.
         *
         * @event PIXI.interaction.InteractionManager#touchendoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is moved along the display object.
         *
         * @event PIXI.interaction.InteractionManager#touchmove
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is pressed on the display.
         * object. DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#mousedown
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is pressed
         * on the display object. DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#rightdown
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is released over the display
         * object. DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#mouseup
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is released
         * over the display object. DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#rightup
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is pressed and released on
         * the display object. DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#click
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is pressed
         * and released on the display object. DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#rightclick
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button (usually a mouse left-button) is released outside the
         * display object that initially registered a
         * [mousedown]{@link PIXI.DisplayObject#event:mousedown}.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#mouseupoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device secondary button (usually a mouse right-button) is released
         * outside the display object that initially registered a
         * [rightdown]{@link PIXI.DisplayObject#event:rightdown}.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#rightupoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device (usually a mouse) is moved while over the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#mousemove
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device (usually a mouse) is moved onto the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#mouseover
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device (usually a mouse) is moved off the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#mouseout
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is pressed on the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointerdown
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is released over the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointerup
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when the operating system cancels a pointer event.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointercancel
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is pressed and released on the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointertap
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device button is released outside the display object that initially
         * registered a [pointerdown]{@link PIXI.DisplayObject#event:pointerdown}.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointerupoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device is moved while over the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointermove
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device is moved onto the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointerover
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a pointer device is moved off the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#pointerout
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is placed on the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#touchstart
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is removed from the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#touchend
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when the operating system cancels a touch.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#touchcancel
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is placed and removed from the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#tap
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is removed outside of the display object that initially
         * registered a [touchstart]{@link PIXI.DisplayObject#event:touchstart}.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#touchendoutside
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */

        /**
         * Fired when a touch point is moved along the display object.
         * DisplayObject's `interactive` property must be set to `true` to fire event.
         *
         * @event PIXI.DisplayObject#touchmove
         * @param {PIXI.interaction.InteractionEvent} event - Interaction event
         */
        return _this
      }

      /**
       * Hit tests a point against the display tree, returning the first interactive object that is hit.
       *
       * @param {PIXI.Point} globalPoint - A point to hit test with, in global space.
       * @param {PIXI.Container} [root] - The root display object to start from. If omitted, defaults
       * to the last rendered root of the associated renderer.
       * @return {PIXI.DisplayObject} The hit display object, if any.
       */


      InteractionManager.prototype.hitTest = function hitTest(globalPoint, root) {
        // clear the target for our hit test
        hitTestEvent.target = null
        // assign the global point
        hitTestEvent.data.global = globalPoint
        // ensure safety of the root
        if (!root) {
          root = this.renderer._lastObjectRendered
        }
        // run the hit test
        this.processInteractive(hitTestEvent, root, null, true)
        // return our found object - it'll be null if we didn't hit anything

        return hitTestEvent.target
      }

      /**
       * Sets the DOM element which will receive mouse/touch events. This is useful for when you have
       * other DOM elements on top of the renderers Canvas element. With this you'll be bale to deletegate
       * another DOM element to receive those events.
       *
       * @param {HTMLCanvasElement} element - the DOM element which will receive mouse and touch events.
       * @param {number} [resolution=1] - The resolution / device pixel ratio of the new element (relative to the canvas).
       */
      InteractionManager.prototype.setTargetElement = function setTargetElement(element) {
        var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1

        this.removeEvents()

        this.interactionDOMElement = element

        this.resolution = resolution

        this.addEvents()
      }

      /**
       * Registers all the DOM events
       *
       * @private
       */


      InteractionManager.prototype.addEvents = function addEvents() {
        if (!this.interactionDOMElement) {
          return
        }

        core.ticker.shared.add(this.update, this, core.UPDATE_PRIORITY.INTERACTION)

        if (window.navigator.msPointerEnabled) {
          this.interactionDOMElement.style['-ms-content-zooming'] = 'none'
          this.interactionDOMElement.style['-ms-touch-action'] = 'none'
        } else if (this.supportsPointerEvents) {
          this.interactionDOMElement.style['touch-action'] = 'none'
        }

        /**
         * These events are added first, so that if pointer events are normalised, they are fired
         * in the same order as non-normalised events. ie. pointer event 1st, mouse / touch 2nd
         */
        if (this.supportsPointerEvents) {
          window.document.addEventListener('pointermove', this.onPointerMove, true)
          this.interactionDOMElement.addEventListener('pointerdown', this.onPointerDown, true)
          // pointerout is fired in addition to pointerup (for touch events) and pointercancel
          // we already handle those, so for the purposes of what we do in onPointerOut, we only
          // care about the pointerleave event
          this.interactionDOMElement.addEventListener('pointerleave', this.onPointerOut, true)
          this.interactionDOMElement.addEventListener('pointerover', this.onPointerOver, true)
          window.addEventListener('pointercancel', this.onPointerCancel, true)
          window.addEventListener('pointerup', this.onPointerUp, true)
        } else {
          window.document.addEventListener('mousemove', this.onPointerMove, true)
          this.interactionDOMElement.addEventListener('mousedown', this.onPointerDown, true)
          this.interactionDOMElement.addEventListener('mouseout', this.onPointerOut, true)
          this.interactionDOMElement.addEventListener('mouseover', this.onPointerOver, true)
          window.addEventListener('mouseup', this.onPointerUp, true)
        }

        // always look directly for touch events so that we can provide original data
        // In a future version we should change this to being just a fallback and rely solely on
        // PointerEvents whenever available
        if (this.supportsTouchEvents) {
          this.interactionDOMElement.addEventListener('touchstart', this.onPointerDown, true)
          this.interactionDOMElement.addEventListener('touchcancel', this.onPointerCancel, true)
          this.interactionDOMElement.addEventListener('touchend', this.onPointerUp, true)
          this.interactionDOMElement.addEventListener('touchmove', this.onPointerMove, true)
        }

        this.eventsAdded = true
      }

      /**
       * Removes all the DOM events that were previously registered
       *
       * @private
       */


      InteractionManager.prototype.removeEvents = function removeEvents() {
        if (!this.interactionDOMElement) {
          return
        }

        core.ticker.shared.remove(this.update, this)

        if (window.navigator.msPointerEnabled) {
          this.interactionDOMElement.style['-ms-content-zooming'] = ''
          this.interactionDOMElement.style['-ms-touch-action'] = ''
        } else if (this.supportsPointerEvents) {
          this.interactionDOMElement.style['touch-action'] = ''
        }

        if (this.supportsPointerEvents) {
          window.document.removeEventListener('pointermove', this.onPointerMove, true)
          this.interactionDOMElement.removeEventListener('pointerdown', this.onPointerDown, true)
          this.interactionDOMElement.removeEventListener('pointerleave', this.onPointerOut, true)
          this.interactionDOMElement.removeEventListener('pointerover', this.onPointerOver, true)
          window.removeEventListener('pointercancel', this.onPointerCancel, true)
          window.removeEventListener('pointerup', this.onPointerUp, true)
        } else {
          window.document.removeEventListener('mousemove', this.onPointerMove, true)
          this.interactionDOMElement.removeEventListener('mousedown', this.onPointerDown, true)
          this.interactionDOMElement.removeEventListener('mouseout', this.onPointerOut, true)
          this.interactionDOMElement.removeEventListener('mouseover', this.onPointerOver, true)
          window.removeEventListener('mouseup', this.onPointerUp, true)
        }

        if (this.supportsTouchEvents) {
          this.interactionDOMElement.removeEventListener('touchstart', this.onPointerDown, true)
          this.interactionDOMElement.removeEventListener('touchcancel', this.onPointerCancel, true)
          this.interactionDOMElement.removeEventListener('touchend', this.onPointerUp, true)
          this.interactionDOMElement.removeEventListener('touchmove', this.onPointerMove, true)
        }

        this.interactionDOMElement = null

        this.eventsAdded = false
      }

      /**
       * Updates the state of interactive objects.
       * Invoked by a throttled ticker update from {@link PIXI.ticker.shared}.
       *
       * @param {number} deltaTime - time delta since last tick
       */


      InteractionManager.prototype.update = function update(deltaTime) {
        this._deltaTime += deltaTime

        if (this._deltaTime < this.interactionFrequency) {
          return
        }

        this._deltaTime = 0

        if (!this.interactionDOMElement) {
          return
        }

        // if the user move the mouse this check has already been done using the mouse move!
        if (this.didMove) {
          this.didMove = false

          return
        }

        this.cursor = null

        // Resets the flag as set by a stopPropagation call. This flag is usually reset by a user interaction of any kind,
        // but there was a scenario of a display object moving under a static mouse cursor.
        // In this case, mouseover and mouseevents would not pass the flag test in dispatchEvent function
        for (var k in this.activeInteractionData) {
          // eslint-disable-next-line no-prototype-builtins
          if (this.activeInteractionData.hasOwnProperty(k)) {
            var interactionData = this.activeInteractionData[k]

            if (interactionData.originalEvent && interactionData.pointerType !== 'touch') {
              var interactionEvent = this.configureInteractionEventForDOMEvent(
                this.eventData, interactionData.originalEvent, interactionData
              )

              this.processInteractive(
                interactionEvent, this.renderer._lastObjectRendered, this.processPointerOverOut, true
              )
            }
          }
        }

        this.setCursorMode(this.cursor)

        // TODO
      }

      /**
       * Sets the current cursor mode, handling any callbacks or CSS style changes.
       *
       * @param {string} mode - cursor mode, a key from the cursorStyles dictionary
       */


      InteractionManager.prototype.setCursorMode = function setCursorMode(mode) {
        mode = mode || 'default'
        // if the mode didn't actually change, bail early
        if (this.currentCursorMode === mode) {
          return
        }
        this.currentCursorMode = mode
        var style = this.cursorStyles[mode]

        // only do things if there is a cursor style for it
        if (style) {
          switch (typeof style === 'undefined' ? 'undefined' : typeof_(style)) {
            case 'string':
              // string styles are handled as cursor CSS
              this.interactionDOMElement.style.cursor = style
              break
            case 'function':
              // functions are just called, and passed the cursor mode
              style(mode)
              break
            case 'object':
              // if it is an object, assume that it is a dictionary of CSS styles,
              // apply it to the interactionDOMElement
              Object.assign(this.interactionDOMElement.style, style)
              break
          }
        } else if (typeof mode === 'string' && !Object.prototype.hasOwnProperty.call(this.cursorStyles, mode)) {
          // if it mode is a string (not a Symbol) and cursorStyles doesn't have any entry
          // for the mode, then assume that the dev wants it to be CSS for the cursor.
          this.interactionDOMElement.style.cursor = mode
        }
      }

      /**
       * Dispatches an event on the display object that was interacted with
       *
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - the display object in question
       * @param {string} eventString - the name of the event (e.g, mousedown)
       * @param {object} eventData - the event data object
       * @private
       */


      InteractionManager.prototype.dispatchEvent = function dispatchEvent(displayObject, eventString, eventData) {
        if (!eventData.stopped) {
          eventData.currentTarget = displayObject
          eventData.type = eventString

          displayObject.emit(eventString, eventData)

          if (displayObject[eventString]) {
            displayObject[eventString](eventData)
          }
        }
      }

      /**
       * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
       * resulting value is stored in the point. This takes into account the fact that the DOM
       * element could be scaled and positioned anywhere on the screen.
       *
       * @param  {PIXI.Point} point - the point that the result will be stored in
       * @param  {number} x - the x coord of the position to map
       * @param  {number} y - the y coord of the position to map
       */


      InteractionManager.prototype.mapPositionToPoint = function mapPositionToPoint(point, x, y) {
        var rect = this.interactionDOMElement.getBoundingClientRect()
        var resolutionMultiplier = navigator.isCocoonJS ? this.resolution : 1.0 / this.resolution
        
        point.x = (x - rect.left) * (this.interactionDOMElement.width / rect.width) * resolutionMultiplier
        point.y = (y - rect.top) * (this.interactionDOMElement.height / rect.height) * resolutionMultiplier
      }

      /**
       * This function is provides a neat way of crawling through the scene graph and running a
       * specified function on all interactive objects it finds. It will also take care of hit
       * testing the interactive objects and passes the hit across in the function.
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - event containing the point that
       *  is tested for collision
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - the displayObject
       *  that will be hit test (recursively crawls its children)
       * @param {Function} [func] - the function that will be called on each interactive object. The
       *  interactionEvent, displayObject and hit will be passed to the function
       * @param {boolean} [hitTest] - this indicates if the objects inside should be hit test against the point
       * @param {boolean} [interactive] - Whether the displayObject is interactive
       * @return {boolean} returns true if the displayObject hit the point
       */


      InteractionManager.prototype.processInteractive = function processInteractive(
        interactionEvent, displayObject, func, hitTest, interactive
      ) {
        if (!displayObject || !displayObject.visible) {
          return false
        }

        var point = interactionEvent.data.global

        // Took a little while to rework this function correctly! But now it is done and nice and optimised. ^_^
        //
        // This function will now loop through all objects and then only hit test the objects it HAS
        // to, not all of them. MUCH faster..
        // An object will be hit test if the following is true:
        //
        // 1: It is interactive.
        // 2: It belongs to a parent that is interactive AND one of the parents children have not already been hit.
        //
        // As another little optimisation once an interactive object has been hit we can carry on
        // through the scenegraph, but we know that there will be no more hits! So we can avoid extra hit tests
        // A final optimisation is that an object is not hit test directly if a child has already been hit.

        interactive = displayObject.interactive || interactive

        var hit = false
        var interactiveParent = interactive

        // Flag here can set to false if the event is outside the parents hitArea or mask
        var hitTestChildren = true

        // If there is a hitArea, no need to test against anything else if the pointer is not within the hitArea
        // There is also no longer a need to hitTest children.
        if (displayObject.hitArea) {
          if (hitTest) {
            displayObject.worldTransform.applyInverse(point, this._tempPoint)
            if (!displayObject.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) {
              hitTest = false
              hitTestChildren = false
            } else {
              hit = true
            }
          }
          interactiveParent = false
        }
        // If there is a mask, no need to test against anything else if the pointer is not within the mask
        else if (displayObject._mask) {
          if (hitTest) {
            if (!displayObject._mask.containsPoint(point)) {
              hitTest = false
              hitTestChildren = false
            }
          }
        }

        // ** FREE TIP **! If an object is not interactive or has no buttons in it
        // (such as a game scene!) set interactiveChildren to false for that displayObject.
        // This will allow PixiJS to completely ignore and bypass checking the displayObjects children.
        if (hitTestChildren && displayObject.interactiveChildren && displayObject.children) {
          var children = displayObject.children

          for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i]

            // time to get recursive.. if this function will return if something is hit..
            var childHit = this.processInteractive(interactionEvent, child, func, hitTest, interactiveParent)

            if (childHit) {
              // its a good idea to check if a child has lost its parent.
              // this means it has been removed whilst looping so its best
              if (!child.parent) {
                continue
              }

              // we no longer need to hit test any more objects in this container as we we
              // now know the parent has been hit
              interactiveParent = false

              // If the child is interactive , that means that the object hit was actually
              // interactive and not just the child of an interactive object.
              // This means we no longer need to hit test anything else. We still need to run
              // through all objects, but we don't need to perform any hit tests.

              if (childHit) {
                if (interactionEvent.target) {
                  hitTest = false
                }
                hit = true
              }
            }
          }
        }

        // no point running this if the item is not interactive or does not have an interactive parent.
        if (interactive) {
          // if we are hit testing (as in we have no hit any objects yet)
          // We also don't need to worry about hit testing if once of the displayObjects children
          // has already been hit - but only if it was interactive, otherwise we need to keep
          // looking for an interactive child, just in case we hit one
          if (hitTest && !interactionEvent.target) {
            // already tested against hitArea if it is defined
            if (!displayObject.hitArea && displayObject.containsPoint) {
              if (displayObject.containsPoint(point)) {
                hit = true
              }
            }
          }

          if (displayObject.interactive) {
            if (hit && !interactionEvent.target) {
              interactionEvent.target = displayObject
            }

            if (func) {
              func(interactionEvent, displayObject, !!hit)
            }
          }
        }

        return hit
      }

      /**
       * Is called when the pointer button is pressed down on the renderer element
       *
       * @private
       * @param {PointerEvent} originalEvent - The DOM event of a pointer button being pressed down
       */
      InteractionManager.prototype.onPointerDown = function onPointerDown(originalEvent) {
        // if we support touch events, then only use those for touch events, not pointer events
        if (this.supportsTouchEvents && originalEvent.pointerType === 'touch') return

        var events = this.normalizeToPointerData(originalEvent)

        /**
         * No need to prevent default on natural pointer events, as there are no side effects
         * Normalized events, however, may have the double mousedown/touchstart issue on the native android browser,
         * so still need to be prevented.
         */

        // Guaranteed that there will be at least one event in events, and all events must have the same pointer type
        if (this.autoPreventDefault && events[0].isNormalized) {
          originalEvent.preventDefault()
        }

        var eventLen = events.length

        for (var i = 0; i < eventLen; i++) {
          var event = events[i]
          var interactionData = this.getInteractionDataForPointerId(event)
          var interactionEvent = this.configureInteractionEventForDOMEvent(
            this.eventData, event, interactionData
          )

          interactionEvent.data.originalEvent = originalEvent

          this.processInteractive(
            interactionEvent, this.renderer._lastObjectRendered,
            this.processPointerDown, true
          )

          this.emit('pointerdown', interactionEvent)
          if (event.pointerType === 'touch') {
            this.emit('touchstart', interactionEvent)
          }
          // emit a mouse event for "pen" pointers, the way a browser would emit a fallback event
          else if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
            var isRightButton = event.button === 2

            this.emit(isRightButton ? 'rightdown' : 'mousedown', this.eventData)
          }
        }
      }

      /**
       * Processes the result of the pointer down check and dispatches the event if need be
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - The display object that was tested
       * @param {boolean} hit - the result of the hit test on the display object
       */
      InteractionManager.prototype.processPointerDown = function processPointerDown(
        interactionEvent, displayObject, hit
      ) {
        var data = interactionEvent.data
        var id = interactionEvent.data.identifier

        if (hit) {
          if (!displayObject.trackedPointers[id]) {
            displayObject.trackedPointers[id] = new _InteractionTrackingData2.default(id)
          }
          this.dispatchEvent(displayObject, 'pointerdown', interactionEvent)

          if (data.pointerType === 'touch') {
            this.dispatchEvent(displayObject, 'touchstart', interactionEvent)
          } else if (data.pointerType === 'mouse' || data.pointerType === 'pen') {
            var isRightButton = data.button === 2

            if (isRightButton) {
              displayObject.trackedPointers[id].rightDown = true
            } else {
              displayObject.trackedPointers[id].leftDown = true
            }

            this.dispatchEvent(displayObject, isRightButton ? 'rightdown' : 'mousedown', interactionEvent)
          }
        }
      }

      /**
       * Is called when the pointer button is released on the renderer element
       *
       * @private
       * @param {PointerEvent} originalEvent - The DOM event of a pointer button being released
       * @param {boolean} cancelled - true if the pointer is cancelled
       * @param {Function} func - Function passed to {@link processInteractive}
       */
      InteractionManager.prototype.onPointerComplete = function onPointerComplete(
        originalEvent, cancelled, func
      ) {
        var events = this.normalizeToPointerData(originalEvent)

        var eventLen = events.length

        // if the event wasn't targeting our canvas, then consider it to be pointerupoutside
        // in all cases (unless it was a pointercancel)
        var eventAppend = originalEvent.target !== this.interactionDOMElement ? 'outside' : ''

        for (var i = 0; i < eventLen; i++) {
          var event = events[i]

          var interactionData = this.getInteractionDataForPointerId(event)

          var interactionEvent = this.configureInteractionEventForDOMEvent(
            this.eventData, event, interactionData
          )

          interactionEvent.data.originalEvent = originalEvent

          // perform hit testing for events targeting our canvas or cancel events
          this.processInteractive(
            interactionEvent, this.renderer._lastObjectRendered, func, cancelled || !eventAppend
          )

          this.emit(cancelled ? 'pointercancel' : 'pointerup' + eventAppend, interactionEvent)

          if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
            var isRightButton = event.button === 2

            this.emit(isRightButton ? 'rightup' + eventAppend : 'mouseup' + eventAppend, interactionEvent)
          } else if (event.pointerType === 'touch') {
            this.emit(cancelled ? 'touchcancel' : 'touchend' + eventAppend, interactionEvent)
            this.releaseInteractionDataForPointerId(event.pointerId, interactionData)
          }
        }
      }

      /**
       * Is called when the pointer button is cancelled
       *
       * @private
       * @param {PointerEvent} event - The DOM event of a pointer button being released
       */


      InteractionManager.prototype.onPointerCancel = function onPointerCancel(event) {
        // if we support touch events, then only use those for touch events, not pointer events
        if (this.supportsTouchEvents && event.pointerType === 'touch') return

        this.onPointerComplete(event, true, this.processPointerCancel)
      }

      /**
       * Processes the result of the pointer cancel check and dispatches the event if need be
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - The display object that was tested
       */


      InteractionManager.prototype.processPointerCancel = function processPointerCancel(interactionEvent, displayObject) {
        var data = interactionEvent.data

        var id = interactionEvent.data.identifier

        if (displayObject.trackedPointers[id] !== undefined) {
          delete displayObject.trackedPointers[id]
          this.dispatchEvent(displayObject, 'pointercancel', interactionEvent)

          if (data.pointerType === 'touch') {
            this.dispatchEvent(displayObject, 'touchcancel', interactionEvent)
          }
        }
      }

      /**
       * Is called when the pointer button is released on the renderer element
       *
       * @private
       * @param {PointerEvent} event - The DOM event of a pointer button being released
       */


      InteractionManager.prototype.onPointerUp = function onPointerUp(event) {
        // if we support touch events, then only use those for touch events, not pointer events
        if (this.supportsTouchEvents && event.pointerType === 'touch') return

        this.onPointerComplete(event, false, this.processPointerUp)
      }

      /**
       * Processes the result of the pointer up check and dispatches the event if need be
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - The display object that was tested
       * @param {boolean} hit - the result of the hit test on the display object
       */


      InteractionManager.prototype.processPointerUp = function processPointerUp(interactionEvent, displayObject, hit) {
        var data = interactionEvent.data

        var id = interactionEvent.data.identifier

        var trackingData = displayObject.trackedPointers[id]

        var isTouch = data.pointerType === 'touch'

        var isMouse = data.pointerType === 'mouse' || data.pointerType === 'pen'
        // need to track mouse down status in the mouse block so that we can emit
        // event in a later block
        var isMouseTap = false

        // Mouse only
        if (isMouse) {
          var isRightButton = data.button === 2

          var flags = _InteractionTrackingData2.default.FLAGS

          var test = isRightButton ? flags.RIGHT_DOWN : flags.LEFT_DOWN

          var isDown = trackingData !== undefined && trackingData.flags & test

          if (hit) {
            this.dispatchEvent(displayObject, isRightButton ? 'rightup' : 'mouseup', interactionEvent)

            if (isDown) {
              this.dispatchEvent(displayObject, isRightButton ? 'rightclick' : 'click', interactionEvent)
              // because we can confirm that the mousedown happened on this object, flag for later emit of pointertap
              isMouseTap = true
            }
          } else if (isDown) {
            this.dispatchEvent(displayObject, isRightButton ? 'rightupoutside' : 'mouseupoutside', interactionEvent)
          }
          // update the down state of the tracking data
          if (trackingData) {
            if (isRightButton) {
              trackingData.rightDown = false
            } else {
              trackingData.leftDown = false
            }
          }
        }

        // Pointers and Touches, and Mouse
        if (hit) {
          this.dispatchEvent(displayObject, 'pointerup', interactionEvent)
          if (isTouch) this.dispatchEvent(displayObject, 'touchend', interactionEvent)

          if (trackingData) {
            // emit pointertap if not a mouse, or if the mouse block decided it was a tap
            if (!isMouse || isMouseTap) {
              this.dispatchEvent(displayObject, 'pointertap', interactionEvent)
            }
            if (isTouch) {
              this.dispatchEvent(displayObject, 'tap', interactionEvent)
              // touches are no longer over (if they ever were) when we get the touchend
              // so we should ensure that we don't keep pretending that they are
              trackingData.over = false
            }
          }
        } else if (trackingData) {
          this.dispatchEvent(displayObject, 'pointerupoutside', interactionEvent)
          if (isTouch) this.dispatchEvent(displayObject, 'touchendoutside', interactionEvent)
        }
        // Only remove the tracking data if there is no over/down state still associated with it
        if (trackingData && trackingData.none) {
          delete displayObject.trackedPointers[id]
        }
      }

      /**
       * Is called when the pointer moves across the renderer element
       *
       * @private
       * @param {PointerEvent} originalEvent - The DOM event of a pointer moving
       */


      InteractionManager.prototype.onPointerMove = function onPointerMove(originalEvent) {
        // if we support touch events, then only use those for touch events, not pointer events
        if (this.supportsTouchEvents && originalEvent.pointerType === 'touch') return

        var events = this.normalizeToPointerData(originalEvent)

        if (events[0].pointerType === 'mouse' || events[0].pointerType === 'pen') {
          this.didMove = true

          this.cursor = null
        }

        var eventLen = events.length

        for (var i = 0; i < eventLen; i++) {
          var event = events[i]

          var interactionData = this.getInteractionDataForPointerId(event)

          var interactionEvent = this.configureInteractionEventForDOMEvent(
            this.eventData, event, interactionData
          )

          interactionEvent.data.originalEvent = originalEvent

          var interactive = event.pointerType === 'touch' ? this.moveWhenInside : true

          this.processInteractive(
            interactionEvent, this.renderer._lastObjectRendered, this.processPointerMove, interactive
          )
          this.emit('pointermove', interactionEvent)
          if (event.pointerType === 'touch') this.emit('touchmove', interactionEvent)
          if (event.pointerType === 'mouse' || event.pointerType === 'pen') this.emit('mousemove', interactionEvent)
        }

        if (events[0].pointerType === 'mouse') {
          this.setCursorMode(this.cursor)

          // TODO BUG for parents interactive object (border order issue)
        }
      }

      /**
       * Processes the result of the pointer move check and dispatches the event if need be
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - The display object that was tested
       * @param {boolean} hit - the result of the hit test on the display object
       */


      InteractionManager.prototype.processPointerMove = function processPointerMove(interactionEvent, displayObject, hit) {
        var data = interactionEvent.data

        var isTouch = data.pointerType === 'touch'

        var isMouse = data.pointerType === 'mouse' || data.pointerType === 'pen'

        if (isMouse) {
          this.processPointerOverOut(interactionEvent, displayObject, hit)
        }

        if (!this.moveWhenInside || hit) {
          this.dispatchEvent(displayObject, 'pointermove', interactionEvent)
          if (isTouch) this.dispatchEvent(displayObject, 'touchmove', interactionEvent)
          if (isMouse) this.dispatchEvent(displayObject, 'mousemove', interactionEvent)
        }
      }

      /**
       * Is called when the pointer is moved out of the renderer element
       *
       * @private
       * @param {PointerEvent} originalEvent - The DOM event of a pointer being moved out
       */


      InteractionManager.prototype.onPointerOut = function onPointerOut(originalEvent) {
        // if we support touch events, then only use those for touch events, not pointer events
        if (this.supportsTouchEvents && originalEvent.pointerType === 'touch') return

        var events = this.normalizeToPointerData(originalEvent)

        // Only mouse and pointer can call onPointerOut, so events will always be length 1
        var event = events[0]

        if (event.pointerType === 'mouse') {
          this.mouseOverRenderer = false
          this.setCursorMode(null)
        }

        var interactionData = this.getInteractionDataForPointerId(event)

        var interactionEvent = this.configureInteractionEventForDOMEvent(
          this.eventData, event, interactionData
        )

        interactionEvent.data.originalEvent = event

        this.processInteractive(
          interactionEvent, this.renderer._lastObjectRendered, this.processPointerOverOut, false
        )

        this.emit('pointerout', interactionEvent)
        if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
          this.emit('mouseout', interactionEvent)
        } else {
          // we can get touchleave events after touchend, so we want to make sure we don't
          // introduce memory leaks
          this.releaseInteractionDataForPointerId(interactionData.identifier)
        }
      }

      /**
       * Processes the result of the pointer over/out check and dispatches the event if need be
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - The interaction event wrapping the DOM event
       * @param {PIXI.Container|PIXI.Sprite|PIXI.extras.TilingSprite} displayObject - The display object that was tested
       * @param {boolean} hit - the result of the hit test on the display object
       */


      InteractionManager.prototype.processPointerOverOut = function processPointerOverOut(interactionEvent, displayObject, hit) {
        var data = interactionEvent.data

        var id = interactionEvent.data.identifier

        var isMouse = data.pointerType === 'mouse' || data.pointerType === 'pen'

        var trackingData = displayObject.trackedPointers[id]

        // if we just moused over the display object, then we need to track that state
        if (hit && !trackingData) {
          trackingData = displayObject.trackedPointers[id] = new _InteractionTrackingData2.default(id)
        }

        if (trackingData === undefined) return

        if (hit && this.mouseOverRenderer) {
          if (!trackingData.over) {
            trackingData.over = true
            this.dispatchEvent(displayObject, 'pointerover', interactionEvent)
            if (isMouse) {
              this.dispatchEvent(displayObject, 'mouseover', interactionEvent)
            }
          }

          // only change the cursor if it has not already been changed (by something deeper in the
          // display tree)
          if (isMouse && this.cursor === null) {
            this.cursor = displayObject.cursor
          }
        } else if (trackingData.over) {
          trackingData.over = false
          this.dispatchEvent(displayObject, 'pointerout', this.eventData)
          if (isMouse) {
            this.dispatchEvent(displayObject, 'mouseout', interactionEvent)
          }
          // if there is no mouse down information for the pointer, then it is safe to delete
          if (trackingData.none) {
            delete displayObject.trackedPointers[id]
          }
        }
      }

      /**
       * Is called when the pointer is moved into the renderer element
       *
       * @private
       * @param {PointerEvent} originalEvent - The DOM event of a pointer button being moved into the renderer view
       */


      InteractionManager.prototype.onPointerOver = function onPointerOver(originalEvent) {
        var events = this.normalizeToPointerData(originalEvent)

        // Only mouse and pointer can call onPointerOver, so events will always be length 1
        var event = events[0]

        var interactionData = this.getInteractionDataForPointerId(event)

        var interactionEvent = this.configureInteractionEventForDOMEvent(
          this.eventData, event, interactionData
        )

        interactionEvent.data.originalEvent = event

        if (event.pointerType === 'mouse') {
          this.mouseOverRenderer = true
        }

        this.emit('pointerover', interactionEvent)
        if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
          this.emit('mouseover', interactionEvent)
        }
      }

      /**
       * Get InteractionData for a given pointerId. Store that data as well
       *
       * @private
       * @param {PointerEvent} event - Normalized pointer event, output from normalizeToPointerData
       * @return {PIXI.interaction.InteractionData} - Interaction data for the given pointer identifier
       */


      InteractionManager.prototype.getInteractionDataForPointerId = function getInteractionDataForPointerId(event) {
        var pointerId = event.pointerId

        var interactionData = void 0

        if (pointerId === MOUSE_POINTER_ID || event.pointerType === 'mouse') {
          interactionData = this.mouse
        } else if (this.activeInteractionData[pointerId]) {
          interactionData = this.activeInteractionData[pointerId]
        } else {
          interactionData = this.interactionDataPool.pop() || new _InteractionData2.default()
          interactionData.identifier = pointerId
          this.activeInteractionData[pointerId] = interactionData
        }
        // copy properties from the event, so that we can make sure that touch/pointer specific
        // data is available
        interactionData.copyEvent(event)
        return interactionData
      }

      /**
       * Return unused InteractionData to the pool, for a given pointerId
       *
       * @private
       * @param {number} pointerId - Identifier from a pointer event
       */
      InteractionManager.prototype.releaseInteractionDataForPointerId = function(pointerId) {
        var interactionData = this.activeInteractionData[pointerId]

        if (interactionData) {
          delete this.activeInteractionData[pointerId]
          interactionData.reset()
          this.interactionDataPool.push(interactionData)
        }
      }

      /**
       * Configure an InteractionEvent to wrap a DOM PointerEvent and InteractionData
       *
       * @private
       * @param {PIXI.interaction.InteractionEvent} interactionEvent - The event to be configured
       * @param {PointerEvent} pointerEvent - The DOM event that will be paired with the InteractionEvent
       * @param {PIXI.interaction.InteractionData} interactionData - The InteractionData that will be paired
       *        with the InteractionEvent
       * @return {PIXI.interaction.InteractionEvent} the interaction event that was passed in
       */
      InteractionManager.prototype.configureInteractionEventForDOMEvent = function(
        interactionEvent, pointerEvent, interactionData
      ) {
        interactionEvent.data = interactionData
        this.mapPositionToPoint(interactionData.global, pointerEvent.clientX, pointerEvent.clientY)

        // This is the way InteractionManager processed touch events before the refactoring, so I've kept
        // it here. But it doesn't make that much sense to me, since mapPositionToPoint already factors
        // in this.resolution, so this just divides by this.resolution twice for touch events...
        if (navigator.isCocoonJS && pointerEvent.pointerType === 'touch') {
          interactionData.global.x = interactionData.global.x / this.resolution
          interactionData.global.y = interactionData.global.y / this.resolution
        }

        // Not really sure why this is happening, but it's how a previous version handled things
        if (pointerEvent.pointerType === 'touch') {
          pointerEvent.globalX = interactionData.global.x
          pointerEvent.globalY = interactionData.global.y
        }

        interactionData.originalEvent = pointerEvent
        interactionEvent.reset()

        return interactionEvent
      }

      /**
       * Ensures that the original event object contains all data that a regular pointer event would have
       *
       * @private
       * @param {TouchEvent|MouseEvent|PointerEvent} event - The original event data from a touch or mouse event
       * @return {PointerEvent[]} An array containing a single normalized pointer event, in the case of a pointer
       *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
       */


      InteractionManager.prototype.normalizeToPointerData = function normalizeToPointerData(event) {
        var normalizedEvents = []
        for (var i = 0, li = event.changedTouches.length; i < li; i++) {
          var touch = event.changedTouches[i]

          if (typeof touch.button === 'undefined') touch.button = event.touches.length ? 1 : 0
          if (typeof touch.buttons === 'undefined') touch.buttons = event.touches.length ? 1 : 0
          if (typeof touch.isPrimary === 'undefined') {
            touch.isPrimary = event.touches.length === 1 && event.type === 'touchstart'
          }
          if (typeof touch.width === 'undefined') touch.width = touch.radiusX || 1
          if (typeof touch.height === 'undefined') touch.height = touch.radiusY || 1
          if (typeof touch.tiltX === 'undefined') touch.tiltX = 0
          if (typeof touch.tiltY === 'undefined') touch.tiltY = 0
          if (typeof touch.pointerType === 'undefined') touch.pointerType = 'touch'
          if (typeof touch.pointerId === 'undefined') touch.pointerId = touch.identifier || 0
          if (typeof touch.pressure === 'undefined') touch.pressure = touch.force || 0.5
          touch.twist = 0
          touch.tangentialPressure = 0
          // TODO: Remove these, as layerX/Y is not a standard, is deprecated, has uneven
          // support, and the fill ins are not quite the same
          // offsetX/Y might be okay, but is not the same as clientX/Y when the canvas's top
          // left is not 0,0 on the page
          if (typeof touch.layerX === 'undefined') touch.layerX = touch.offsetX = touch.clientX
          if (typeof touch.layerY === 'undefined') touch.layerY = touch.offsetY = touch.clientY

          // mark the touch as normalized, just so that we know we did it
          touch.isNormalized = true

          normalizedEvents.push(touch)
        }
        return normalizedEvents
      }

      /**
       * Destroys the interaction manager
       *
       */


      InteractionManager.prototype.destroy = function destroy() {
        this.removeEvents()

        this.removeAllListeners()

        this.renderer = null

        this.mouse = null

        this.eventData = null

        this.interactionDOMElement = null

        this.onPointerDown = null
        this.processPointerDown = null

        this.onPointerUp = null
        this.processPointerUp = null

        this.onPointerCancel = null
        this.processPointerCancel = null

        this.onPointerMove = null
        this.processPointerMove = null

        this.onPointerOut = null
        this.processPointerOverOut = null

        this.onPointerOver = null

        this._tempPoint = null
      }

      return InteractionManager
    }(_eventemitter2.default)

    exports.default = InteractionManager

    core.WebGLRenderer.registerPlugin('interaction', InteractionManager)
    core.CanvasRenderer.registerPlugin('interaction', InteractionManager)

  }, {
    "../core": 65,
    "./InteractionData": 155,
    "./InteractionEvent": 156,
    "./InteractionTrackingData": 158,
    "./interactiveTarget": 160,
    "eventemitter3": 3
  }],
  158: [function ($require, container, exports) {
    container.exports = InteractionTrackingData
  }, {}],
  159: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _InteractionData = $require('./InteractionData')

    Object.defineProperty(exports, 'InteractionData', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_InteractionData).default
      }
    })

    var _InteractionManager = $require('./InteractionManager')

    Object.defineProperty(exports, 'InteractionManager', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_InteractionManager).default
      }
    })

    var _interactiveTarget = $require('./interactiveTarget')

    Object.defineProperty(exports, 'interactiveTarget', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_interactiveTarget).default
      }
    })

    var _InteractionTrackingData = $require('./InteractionTrackingData')

    Object.defineProperty(exports, 'InteractionTrackingData', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_InteractionTrackingData).default
      }
    })

    var _InteractionEvent = $require('./InteractionEvent')

    Object.defineProperty(exports, 'InteractionEvent', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_InteractionEvent).default
      }
    })

    
  }, {
    "./InteractionData": 155,
    "./InteractionEvent": 156,
    "./InteractionManager": 157,
    "./InteractionTrackingData": 158,
    "./interactiveTarget": 160
  }],
  160: [function ($require, container, exports) {
    container.exports = interactiveTarget
  }, {}],
  161: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.parse = parse

    exports.default = function () {
      return function bitmapFontParser(resource, next) {
        // skip if no data or not xml data
        if (!resource.data || resource.type !== _resourceLoader.Resource.TYPE.XML) {
          next()

          return
        }

        // skip if not bitmap font data, using some silly duck-typing
        if (resource.data.getElementsByTagName('page').length === 0 || resource.data.getElementsByTagName('info').length === 0 || resource.data.getElementsByTagName('info')[0].getAttribute('face') === null) {
          next()

          return
        }

        var xmlUrl = !resource.isDataUrl ? path.dirname(resource.url) : ''

        if (resource.isDataUrl) {
          if (xmlUrl === '.') {
            xmlUrl = ''
          }

          if (this.baseUrl && xmlUrl) {
            // if baseurl has a trailing slash then add one to xmlUrl so the replace works below
            if (this.baseUrl.charAt(this.baseUrl.length - 1) === '/') {
              xmlUrl += '/'
            }
          }
        }

        // remove baseUrl from xmlUrl
        xmlUrl = xmlUrl.replace(this.baseUrl, '')

        // if there is an xmlUrl now, it needs a trailing slash. Ensure that it does if the string isn't empty.
        if (xmlUrl && xmlUrl.charAt(xmlUrl.length - 1) !== '/') {
          xmlUrl += '/'
        }

        var pages = resource.data.getElementsByTagName('page')
        var textures = {}

        // Handle completed, when the number of textures
        // load is the same number as references in the fnt file
        var completed = function completed(page) {
          textures[page.metadata.pageFile] = page.texture

          if (Object.keys(textures).length === pages.length) {
            parse(resource, textures)
            next()
          }
        }

        for (var i = 0; i < pages.length; ++i) {
          var pageFile = pages[i].getAttribute('file')
          var url = xmlUrl + pageFile
          var exists = false

          // incase the image is loaded outside
          // using the same loader, resource will be available
          for (var name in this.resources) {
            if (this.resources[name].url === url) {
              this.resources[name].metadata.pageFile = pageFile
              completed(this.resources[name])
              exists = true
              break
            }
          }

          // texture is not loaded, we'll attempt to add
          // it to the load and add the texture to the list
          if (!exists) {
            // Standard loading options for images
            var options = {
              crossOrigin: resource.crossOrigin,
              loadType: _resourceLoader.Resource.LOAD_TYPE.IMAGE,
              metadata: Object.assign({
                pageFile: pageFile
              }, resource.metadata.imageMetadata),
              parentResource: resource
            }

            this.add(url, options, completed)
          }
        }
      }
    }

    var _path = $require('path')

    var path = interop_require_wildcard_(_path)

    var _resourceLoader = $require('resource-loader')

    var _extras = $require('../extras')

        /**
     * Register a BitmapText font from loader resource.
     *
     * @function parseBitmapFontData
     * @memberof PIXI.loaders
     * @param {PIXI.loaders.Resource} resource - Loader resource.
     * @param {PIXI.Texture|PIXI.Texture[]} textures - List of textures for each page.
     */
    function parse(resource, textures) {
      resource.bitmapFont = _extras.BitmapText.registerFont(resource.data, textures)
    }

  }, {
    "../extras": 141,
    "path": 8,
    "resource-loader": 36
  }],
  162: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true
    exports.shared = exports.Resource = exports.textureParser = exports.getResourcePath = exports.spritesheetParser = exports.parseBitmapFontData = exports.bitmapFontParser = exports.Loader = undefined

    var _bitmapFontParser = $require('./bitmapFontParser')

    Object.defineProperty(exports, 'bitmapFontParser', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_bitmapFontParser).default
      }
    })
    Object.defineProperty(exports, 'parseBitmapFontData', {
      enumerable: true,
      get: function get() {
        return _bitmapFontParser.parse
      }
    })

    var _spritesheetParser = $require('./spritesheetParser')

    Object.defineProperty(exports, 'spritesheetParser', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_spritesheetParser).default
      }
    })
    Object.defineProperty(exports, 'getResourcePath', {
      enumerable: true,
      get: function get() {
        return _spritesheetParser.getResourcePath
      }
    })

    var _textureParser = $require('./textureParser')

    Object.defineProperty(exports, 'textureParser', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_textureParser).default
      }
    })

    var _resourceLoader = $require('resource-loader')

    Object.defineProperty(exports, 'Resource', {
      enumerable: true,
      get: function get() {
        return _resourceLoader.Resource
      }
    })

    var _Application = $require('../core/Application')

    var _Application2 = interop_require_default_(_Application)

    var _loader = $require('./loader')

    var _loader2 = interop_require_default_(_loader)

    
    /**
     * This namespace contains APIs which extends the {@link https://github.com/englercj/resource-loader resource-loader} module
     * for loading assets, data, and other resources dynamically.
     * @example
     * const loader = new PIXI.loaders.Loader()
     * loader.add('bunny', 'data/bunny.png')
     *       .add('spaceship', 'assets/spritesheet.json')
     * loader.load((loader, resources) => {
     *    // resources.bunny
     *    // resources.spaceship
     * })
     * @namespace PIXI.loaders
     */
    exports.Loader = _loader2.default


    /**
     * A premade instance of the loader that can be used to load resources.
     * @name shared
     * @memberof PIXI.loaders
     * @type {PIXI.loaders.Loader}
     */
    var shared = new _loader2.default()

    shared.destroy = function () {
      // protect destroying shared loader
    }

    exports.shared = shared

    // Mixin the loader construction

    var AppPrototype = _Application2.default.prototype

    AppPrototype._loader = null

    /**
     * Loader instance to help with asset loading.
     * @name PIXI.Application#loader
     * @type {PIXI.loaders.Loader}
     */
    Object.defineProperty(AppPrototype, 'loader', {
      get: function get() {
        if (!this._loader) {
          var sharedLoader = this._options.sharedLoader

          this._loader = sharedLoader ? shared : new _loader2.default()
        }

        return this._loader
      }
    })

    // Override the destroy function
    // making sure to destroy the current Loader
    AppPrototype._parentDestroy = AppPrototype.destroy
    AppPrototype.destroy = function destroy(removeView, stageOptions) {
      if (this._loader) {
        this._loader.destroy()
        this._loader = null
      }
      this._parentDestroy(removeView, stageOptions)
    }

  }, {
    "../core/Application": 43,
    "./bitmapFontParser": 161,
    "./loader": 163,
    "./spritesheetParser": 164,
    "./textureParser": 165,
    "resource-loader": 36
  }],
  163: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _resourceLoader = $require('resource-loader')

    var _resourceLoader2 = interop_require_default_(_resourceLoader)

    var _blob = $require('resource-loader/lib/middlewares/parsing/blob')

    var _eventemitter = $require('eventemitter3')

    var _eventemitter2 = interop_require_default_(_eventemitter)

    var _textureParser = $require('./textureParser')

    var _textureParser2 = interop_require_default_(_textureParser)

    var _spritesheetParser = $require('./spritesheetParser')

    var _spritesheetParser2 = interop_require_default_(_spritesheetParser)

    var _bitmapFontParser = $require('./bitmapFontParser')

    var _bitmapFontParser2 = interop_require_default_(_bitmapFontParser)

    
    
        
    /**
     *
     * The new loader, extends Resource Loader by Chad Engler: https://github.com/englercj/resource-loader
     *
     * ```js
     * const loader = PIXI.loader; // PixiJS exposes a premade instance for you to use.
     * //or
     * const loader = new PIXI.loaders.Loader(); // you can also create your own if you want
     *
     * const sprites = {}
     *
     * // Chainable `add` to enqueue a resource
     * loader.add('bunny', 'data/bunny.png')
     *       .add('spaceship', 'assets/spritesheet.json')
     * loader.add('scoreFont', 'assets/score.fnt')
     *
     * // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
     * // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
     * loader.pre(cachingMiddleware)
     *
     * // Chainable `use` to add a middleware that runs for each resource, *after* loading that resource.
     * // This is useful to implement custom parsing modules (like spritesheet parsers, spine parser, etc).
     * loader.use(parsingMiddleware)
     *
     * // The `load` method loads the queue of resources, and calls the passed in callback called once all
     * // resources have loaded.
     * loader.load((loader, resources) => {
     *     // resources is an object where the key is the name of the resource loaded and the value is the resource object.
     *     // They have a couple default properties:
     *     // - `url`: The URL that the resource was loaded from
     *     // - `error`: The error that happened when trying to load (if any)
     *     // - `data`: The raw data that was loaded
     *     // also may contain other properties based on the middleware that runs.
     *     sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture)
     *     sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture)
     *     sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture)
     * })
     *
     * // throughout the process multiple signals can be dispatched.
     * loader.onProgress.add(() => {}); // called once per loaded/errored file
     * loader.onError.add(() => {}); // called once per errored file
     * loader.onLoad.add(() => {}); // called once per loaded file
     * loader.onComplete.add(() => {}); // called once when the queued resources all load.
     * ```
     *
     * @see https://github.com/englercj/resource-loader
     *
     * @class
     * @extends module:resource-loader.ResourceLoader
     * @memberof PIXI.loaders
     */
    var Loader = function (_ResourceLoader) {
      inherits_(Loader, _ResourceLoader)

      /**
       * @param {string} [baseUrl=''] - The base url for all resources loaded by this loader.
       * @param {number} [concurrency=10] - The number of resources to load concurrently.
       */
      function Loader(baseUrl, concurrency) {
        class_call_check_(this, Loader)

        var _this = get_constructor_(this, _ResourceLoader.call(this, baseUrl, concurrency))

        _eventemitter2.default.call(_this)

        for (var i = 0; i < Loader._pixiMiddleware.length; ++i) {
          _this.use(Loader._pixiMiddleware[i]())
        }

        // Compat layer, translate the new v2 signals into old v1 events.
        _this.onStart.add(function (l) {
          return _this.emit('start', l)
        })
        _this.onProgress.add(function (l, r) {
          return _this.emit('progress', l, r)
        })
        _this.onError.add(function (e, l, r) {
          return _this.emit('error', e, l, r)
        })
        _this.onLoad.add(function (l, r) {
          return _this.emit('load', l, r)
        })
        _this.onComplete.add(function (l, r) {
          return _this.emit('complete', l, r)
        })
        return _this
      }

      /**
       * Adds a default middleware to the PixiJS loader.
       *
       * @static
       * @param {Function} fn - The middleware to add.
       */


      Loader.addPixiMiddleware = function addPixiMiddleware(fn) {
        Loader._pixiMiddleware.push(fn)
      }

      /**
       * Destroy the loader, removes references.
       */


      Loader.prototype.destroy = function destroy() {
        this.removeAllListeners()
        this.reset()
      }

      return Loader
    }(_resourceLoader2.default)

    for (var k in _eventemitter2.default.prototype) {
      Loader.prototype[k] = _eventemitter2.default.prototype[k]
    }

    Loader._pixiMiddleware = [
      // parse any blob into more usable objects (e.g. Image)
      _blob.blobMiddlewareFactory,
      // parse any Image objects into textures
      _textureParser2.default,
      // parse any spritesheet data into multiple textures
      _spritesheetParser2.default,
      // parse bitmap font data into multiple textures
      _bitmapFontParser2.default
    ]

    // Add custom extentions
    Resource.setExtensionXhrType('fnt', Resource.XHR_RESPONSE_TYPE.DOCUMENT)

    // Copy EE3 prototype (mixin)
    exports.default = Loader
  }, {
    "./bitmapFontParser": 161,
    "./spritesheetParser": 164,
    "./textureParser": 165,
    "eventemitter3": 3,
    "resource-loader": 36,
    "resource-loader/lib/middlewares/parsing/blob": 37
  }],
  164: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    exports.default = function () {
      return function spritesheetParser(resource, next) {
        var imageResourceName = resource.name + '_image'

        // skip if no data, its not json, it isn't spritesheet data, or the image resource already exists
        if (!resource.data || resource.type !== _resourceLoader.Resource.TYPE.JSON || !resource.data.frames || this.resources[imageResourceName]) {
          next()

          return
        }

        var loadOptions = {
          crossOrigin: resource.crossOrigin,
          metadata: resource.metadata.imageMetadata,
          parentResource: resource
        }

        var resourcePath = getResourcePath(resource, this.baseUrl)

        // load the image for this sheet
        this.add(imageResourceName, resourcePath, loadOptions, function onImageLoad(res) {
          if (res.error) {
            next(res.error)

            return
          }

          var spritesheet = new _core.Spritesheet(res.texture.baseTexture, resource.data, resource.url)

          spritesheet.parse(function () {
            resource.spritesheet = spritesheet
            resource.textures = spritesheet.textures
            next()
          })
        })
      }
    }

    exports.getResourcePath = getResourcePath

    var _resourceLoader = $require('resource-loader')

    var _url = $require('url')

    var _url2 = interop_require_default_(_url)

    var _core = $require('../core')

    
    function getResourcePath(resource, baseUrl) {
      // Prepend url path unless the resource image is a data url
      if (resource.isDataUrl) {
        return resource.data.meta.image
      }

      return _url2.default.resolve(resource.url.replace(baseUrl, ''), resource.data.meta.image)
    }

  }, {
    "../core": 65,
    "resource-loader": 36,
    "url": 38
  }],
  165: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    exports.default = function () {
      return function textureParser(resource, next) {
        // create a new texture if the data is an Image object
        if (resource.data && resource.type === _resourceLoader.Resource.TYPE.IMAGE) {
          resource.texture = _Texture2.default.fromLoader(resource.data, resource.url, resource.name)
        }
        next()
      }
    }

    var _resourceLoader = $require('resource-loader')

    var _Texture = $require('../core/textures/Texture')

    var _Texture2 = interop_require_default_(_Texture)

    
  }, {
    "../core/textures/Texture": 115,
    "resource-loader": 36
  }],
  166: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _Texture = $require('../core/textures/Texture')

    var _Texture2 = interop_require_default_(_Texture)

    
        
        
    var tempPoint = new core.Point()
    var tempPolygon = new core.Polygon()

    /**
     * Base mesh class
     * @class
     * @extends PIXI.Container
     * @memberof PIXI.mesh
     */

    var Mesh = function (_core$Container) {
      inherits_(Mesh, _core$Container)

      /**
       * @param {PIXI.Texture} texture - The texture to use
       * @param {Float32Array} [vertices] - if you want to specify the vertices
       * @param {Float32Array} [uvs] - if you want to specify the uvs
       * @param {Uint16Array} [indices] - if you want to specify the indices
       * @param {number} [drawMode] - the drawMode, can be any of the Mesh.DRAW_MODES consts
       */
      function Mesh(texture, vertices, uvs, indices, drawMode) {
        class_call_check_(this, Mesh)

        /**
         * The texture of the Mesh
         *
         * @member {PIXI.Texture}
         * @default PIXI.Texture.EMPTY
         * @private
         */
        var _this = get_constructor_(this, _core$Container.call(this))

        _this._texture = texture || _Texture2.default.EMPTY

        /**
         * The Uvs of the Mesh
         *
         * @member {Float32Array}
         */
        _this.uvs = uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])

        /**
         * An array of vertices
         *
         * @member {Float32Array}
         */
        _this.vertices = vertices || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100])

        /**
         * An array containing the indices of the vertices
         *
         * @member {Uint16Array}
         */
        //  TODO auto generate this based on draw mode!
        _this.indices = indices || new Uint16Array([0, 1, 3, 2])

        /**
         * Version of mesh uvs are dirty or not
         *
         * @member {number}
         */
        _this.dirty = 0

        /**
         * Version of mesh indices
         *
         * @member {number}
         */
        _this.indexDirty = 0

        /**
         * Version of mesh verticies array
         *
         * @member {number}
         */
        _this.vertexDirty = 0

        /**
         * For backwards compatibility the default is to re-upload verticies each render call.
         * Set this to `false` and increase `vertexDirty` to manually re-upload the buffer.
         *
         * @member {boolean}
         */
        _this.autoUpdate = true

        /**
         * The blend mode to be applied to the sprite. Set to `PIXI.BLEND_MODES.NORMAL` to remove
         * any blend mode.
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL
         * @see PIXI.BLEND_MODES
         */
        _this.blendMode = core.BLEND_MODES.NORMAL

        /**
         * Triangles in canvas mode are automatically antialiased, use this value to force triangles
         * to overlap a bit with each other.
         *
         * @member {number}
         */
        _this.canvasPadding = core.settings.MESH_CANVAS_PADDING

        /**
         * The way the Mesh should be drawn, can be any of the {@link PIXI.mesh.Mesh.DRAW_MODES} consts
         *
         * @member {number}
         * @see PIXI.mesh.Mesh.DRAW_MODES
         */
        _this.drawMode = drawMode || Mesh.DRAW_MODES.TRIANGLE_MESH

        /**
         * The default shader that is used if a mesh doesn't have a more specific one.
         *
         * @member {PIXI.Shader}
         */
        _this.shader = null

        /**
         * The tint applied to the mesh. This is a [r,g,b] value. A value of [1,1,1] will remove any
         * tint effect.
         *
         * @member {number}
         */
        _this.tintRgb = new Float32Array([1, 1, 1])

        /**
         * A map of renderer IDs to webgl render data
         *
         * @private
         * @member {object<number, object>}
         */
        _this._glDatas = {}

        /**
         * transform that is applied to UV to get the texture coords
         * its updated independently from texture uvTransform
         * updates of uvs are tied to that thing
         *
         * @member {PIXI.TextureMatrix}
         * @private
         */
        _this._uvTransform = new core.TextureMatrix(_this._texture)

        /**
         * whether or not upload uvTransform to shader
         * if its false, then uvs should be pre-multiplied
         * if you change it for generated mesh, please call 'refresh(true)'
         * @member {boolean}
         * @default false
         */
        _this.uploadUvTransform = false

        /**
         * Plugin that is responsible for rendering this element.
         * Allows to customize the rendering process without overriding '_renderWebGL' & '_renderCanvas' methods.
         * @member {string}
         * @default 'mesh'
         */
        _this.pluginName = 'mesh'
        return _this
      }

      /**
       * Renders the object using the WebGL renderer
       *
       * @private
       * @param {PIXI.WebGLRenderer} renderer - a reference to the WebGL renderer
       */


      Mesh.prototype._renderWebGL = function _renderWebGL(renderer) {
        this.refresh()
        renderer.setObjectRenderer(renderer.plugins[this.pluginName])
        renderer.plugins[this.pluginName].render(this)
      }

      /**
       * Renders the object using the Canvas renderer
       *
       * @private
       * @param {PIXI.CanvasRenderer} renderer - The canvas renderer.
       */


      Mesh.prototype._renderCanvas = function _renderCanvas(renderer) {
        this.refresh()
        renderer.plugins[this.pluginName].render(this)
      }

      /**
       * When the texture is updated, this event will fire to update the scale and frame
       *
       * @private
       */


      Mesh.prototype._onTextureUpdate = function _onTextureUpdate() {
        this._uvTransform.texture = this._texture
        this.refresh()
      }

      /**
       * multiplies uvs only if uploadUvTransform is false
       * call it after you change uvs manually
       * make sure that texture is valid
       */


      Mesh.prototype.multiplyUvs = function multiplyUvs() {
        if (!this.uploadUvTransform) {
          this._uvTransform.multiplyUvs(this.uvs)
        }
      }

      /**
       * Refreshes uvs for generated meshes (rope, plane)
       * sometimes refreshes vertices too
       *
       * @param {boolean} [forceUpdate=false] if true, matrices will be updated any case
       */


      Mesh.prototype.refresh = function refresh(forceUpdate) {
        if (this.autoUpdate) {
          this.vertexDirty++
        }
        if (this._uvTransform.update(forceUpdate)) {
          this._refresh()
        }
      }

      /**
       * re-calculates mesh coords
       * @protected
       */


      Mesh.prototype._refresh = function _refresh() { }
        /* empty */


        /**
         * Returns the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
         *
         */
        

      Mesh.prototype._calculateBounds = function _calculateBounds() {
        // TODO - we can cache local bounds and use them if they are dirty (like graphics)
        this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length)
      }

      /**
       * Tests if a point is inside this mesh. Works only for TRIANGLE_MESH
       *
       * @param {PIXI.Point} point - the point to test
       * @return {boolean} the result of the test
       */


      Mesh.prototype.containsPoint = function containsPoint(point) {
        if (!this.getBounds().contains(point.x, point.y)) {
          return false
        }

        this.worldTransform.applyInverse(point, tempPoint)

        var vertices = this.vertices
        var points = tempPolygon.points
        var indices = this.indices
        var len = this.indices.length
        var step = this.drawMode === Mesh.DRAW_MODES.TRIANGLES ? 3 : 1

        for (var i = 0; i + 2 < len; i += step) {
          var ind0 = indices[i] * 2
          var ind1 = indices[i + 1] * 2
          var ind2 = indices[i + 2] * 2

          points[0] = vertices[ind0]
          points[1] = vertices[ind0 + 1]
          points[2] = vertices[ind1]
          points[3] = vertices[ind1 + 1]
          points[4] = vertices[ind2]
          points[5] = vertices[ind2 + 1]

          if (tempPolygon.contains(tempPoint.x, tempPoint.y)) {
            return true
          }
        }

        return false
      }

      /**
       * The texture that the mesh uses.
       *
       * @member {PIXI.Texture}
       */


      /**
       * Destroys the Mesh object.
       *
       * @param {object|boolean} [options] - Options parameter. A boolean will act as if all
       *  options have been set to that value
       * @param {boolean} [options.children=false] - if set to true, all the children will have
       *  their destroy method called as well. 'options' will be passed on to those calls.
       * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
       *  Should it destroy the texture of the child sprite
       * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
       *  Should it destroy the base texture of the child sprite
       */
      Mesh.prototype.destroy = function destroy(options) {
        // for each webgl data entry, destroy the WebGLGraphicsData
        for (var id in this._glDatas) {
          var data = this._glDatas[id]

          if (data.destroy) {
            data.destroy()
          } else {
            if (data.vertexBuffer) {
              data.vertexBuffer.destroy()
              data.vertexBuffer = null
            }
            if (data.indexBuffer) {
              data.indexBuffer.destroy()
              data.indexBuffer = null
            }
            if (data.uvBuffer) {
              data.uvBuffer.destroy()
              data.uvBuffer = null
            }
            if (data.vao) {
              data.vao.destroy()
              data.vao = null
            }
          }
        }

        this._glDatas = null

        _core$Container.prototype.destroy.call(this, options)
      }

      create_class_(Mesh, [{
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

          if (value) {
            // wait for the texture to load
            if (value.baseTexture.hasLoaded) {
              this._onTextureUpdate()
            } else {
              value.once('update', this._onTextureUpdate, this)
            }
          }
        }

        /**
         * The tint applied to the mesh. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
         *
         * @member {number}
         * @default 0xFFFFFF
         */

      }, {
        key: 'tint',
        get: function get() {
          return core.utils.rgb2hex(this.tintRgb)
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this.tintRgb = core.utils.hex2rgb(value, this.tintRgb)
        }
      }])

      return Mesh
    }(core.Container)

    /**
     * Different drawing buffer modes supported
     *
     * @static
     * @constant
     * @type {object}
     * @property {number} TRIANGLE_MESH
     * @property {number} TRIANGLES
     */


    exports.default = Mesh
    Mesh.DRAW_MODES = {
      TRIANGLE_MESH: 0,
      TRIANGLES: 1
    }

  }, {
    "../core": 65,
    "../core/textures/Texture": 115
  }],
  167: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _Plane2 = $require('./Plane')

    var _Plane3 = interop_require_default_(_Plane2)

    
    
        
    var DEFAULT_BORDER_SIZE = 10

    /**
     * The NineSlicePlane allows you to stretch a texture using 9-slice scaling. The corners will remain unscaled (useful
     * for buttons with rounded corners for example) and the other areas will be scaled horizontally and or vertically
     *
     *```js
     * let Plane9 = new PIXI.NineSlicePlane(PIXI.Texture.fromImage('BoxWithRoundedCorners.png'), 15, 15, 15, 15)
     *  ```
     * <pre>
     *      A                          B
     *    +---+----------------------+---+
     *  C | 1 |          2           | 3 |
     *    +---+----------------------+---+
     *    |   |                      |   |
     *    | 4 |          5           | 6 |
     *    |   |                      |   |
     *    +---+----------------------+---+
     *  D | 7 |          8           | 9 |
     *    +---+----------------------+---+

     *  When changing this objects width and/or height:
     *     areas 1 3 7 and 9 will remain unscaled.
     *     areas 2 and 8 will be stretched horizontally
     *     areas 4 and 6 will be stretched vertically
     *     area 5 will be stretched both horizontally and vertically
     * </pre>
     *
     * @class
     * @extends PIXI.mesh.Plane
     * @memberof PIXI.mesh
     *
     */

    var NineSlicePlane = function (_Plane) {
      inherits_(NineSlicePlane, _Plane)

      /**
       * @param {PIXI.Texture} texture - The texture to use on the NineSlicePlane.
       * @param {int} [leftWidth=10] size of the left vertical bar (A)
       * @param {int} [topHeight=10] size of the top horizontal bar (C)
       * @param {int} [rightWidth=10] size of the right vertical bar (B)
       * @param {int} [bottomHeight=10] size of the bottom horizontal bar (D)
       */
      function NineSlicePlane(texture, leftWidth, topHeight, rightWidth, bottomHeight) {
        class_call_check_(this, NineSlicePlane)

        var _this = get_constructor_(this, _Plane.call(this, texture, 4, 4))

        _this._origWidth = texture.orig.width
        _this._origHeight = texture.orig.height

        /**
         * The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane
         *
         * @member {number}
         * @memberof PIXI.NineSlicePlane#
         * @override
         */
        _this._width = _this._origWidth

        /**
         * The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane
         *
         * @member {number}
         * @memberof PIXI.NineSlicePlane#
         * @override
         */
        _this._height = _this._origHeight

        /**
         * The width of the left column (a)
         *
         * @member {number}
         * @memberof PIXI.NineSlicePlane#
         * @override
         */
        _this._leftWidth = typeof leftWidth !== 'undefined' ? leftWidth : DEFAULT_BORDER_SIZE

        /**
         * The width of the right column (b)
         *
         * @member {number}
         * @memberof PIXI.NineSlicePlane#
         * @override
         */
        _this._rightWidth = typeof rightWidth !== 'undefined' ? rightWidth : DEFAULT_BORDER_SIZE

        /**
         * The height of the top row (c)
         *
         * @member {number}
         * @memberof PIXI.NineSlicePlane#
         * @override
         */
        _this._topHeight = typeof topHeight !== 'undefined' ? topHeight : DEFAULT_BORDER_SIZE

        /**
         * The height of the bottom row (d)
         *
         * @member {number}
         * @memberof PIXI.NineSlicePlane#
         * @override
         */
        _this._bottomHeight = typeof bottomHeight !== 'undefined' ? bottomHeight : DEFAULT_BORDER_SIZE

        _this.refresh(true)
        return _this
      }

      /**
       * Updates the horizontal vertices.
       *
       */


      NineSlicePlane.prototype.updateHorizontalVertices = function updateHorizontalVertices() {
        var vertices = this.vertices

        var h = this._topHeight + this._bottomHeight
        var scale = this._height > h ? 1.0 : this._height / h

        vertices[9] = vertices[11] = vertices[13] = vertices[15] = this._topHeight * scale
        vertices[17] = vertices[19] = vertices[21] = vertices[23] = this._height - this._bottomHeight * scale
        vertices[25] = vertices[27] = vertices[29] = vertices[31] = this._height
      }

      /**
       * Updates the vertical vertices.
       *
       */


      NineSlicePlane.prototype.updateVerticalVertices = function updateVerticalVertices() {
        var vertices = this.vertices

        var w = this._leftWidth + this._rightWidth
        var scale = this._width > w ? 1.0 : this._width / w

        vertices[2] = vertices[10] = vertices[18] = vertices[26] = this._leftWidth * scale
        vertices[4] = vertices[12] = vertices[20] = vertices[28] = this._width - this._rightWidth * scale
        vertices[6] = vertices[14] = vertices[22] = vertices[30] = this._width
      }

      /**
       * Renders the object using the Canvas renderer
       *
       * @private
       * @param {PIXI.CanvasRenderer} renderer - The canvas renderer to render with.
       */


      NineSlicePlane.prototype._renderCanvas = function _renderCanvas(renderer) {
        var context = renderer.context

        context.globalAlpha = this.worldAlpha
        renderer.setBlendMode(this.blendMode)

        var transform = this.worldTransform
        var res = renderer.resolution

        if (renderer.roundPixels) {
          context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0)
        } else {
          context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res)
        }

        var base = this._texture.baseTexture
        var textureSource = base.source
        var w = base.width * base.resolution
        var h = base.height * base.resolution

        this.drawSegment(context, textureSource, w, h, 0, 1, 10, 11)
        this.drawSegment(context, textureSource, w, h, 2, 3, 12, 13)
        this.drawSegment(context, textureSource, w, h, 4, 5, 14, 15)
        this.drawSegment(context, textureSource, w, h, 8, 9, 18, 19)
        this.drawSegment(context, textureSource, w, h, 10, 11, 20, 21)
        this.drawSegment(context, textureSource, w, h, 12, 13, 22, 23)
        this.drawSegment(context, textureSource, w, h, 16, 17, 26, 27)
        this.drawSegment(context, textureSource, w, h, 18, 19, 28, 29)
        this.drawSegment(context, textureSource, w, h, 20, 21, 30, 31)
      }

      /**
       * Renders one segment of the plane.
       * to mimic the exact drawing behavior of stretching the image like WebGL does, we need to make sure
       * that the source area is at least 1 pixel in size, otherwise nothing gets drawn when a slice size of 0 is used.
       *
       * @private
       * @param {CanvasRenderingContext2D} context - The context to draw with.
       * @param {CanvasImageSource} textureSource - The source to draw.
       * @param {number} w - width of the texture
       * @param {number} h - height of the texture
       * @param {number} x1 - x index 1
       * @param {number} y1 - y index 1
       * @param {number} x2 - x index 2
       * @param {number} y2 - y index 2
       */


      NineSlicePlane.prototype.drawSegment = function drawSegment(context, textureSource, w, h, x1, y1, x2, y2) {
        // otherwise you get weird results when using slices of that are 0 wide or high.
        var uvs = this.uvs
        var vertices = this.vertices

        var sw = (uvs[x2] - uvs[x1]) * w
        var sh = (uvs[y2] - uvs[y1]) * h
        var dw = vertices[x2] - vertices[x1]
        var dh = vertices[y2] - vertices[y1]

        // make sure the source is at least 1 pixel wide and high, otherwise nothing will be drawn.
        if (sw < 1) {
          sw = 1
        }

        if (sh < 1) {
          sh = 1
        }

        // make sure destination is at least 1 pixel wide and high, otherwise you get
        // lines when rendering close to original size.
        if (dw < 1) {
          dw = 1
        }

        if (dh < 1) {
          dh = 1
        }

        context.drawImage(textureSource, uvs[x1] * w, uvs[y1] * h, sw, sh, vertices[x1], vertices[y1], dw, dh)
      }

      /**
       * The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane
       *
       * @member {number}
       */


      /**
       * Refreshes NineSlicePlane coords. All of them.
       */
      NineSlicePlane.prototype._refresh = function _refresh() {
        _Plane.prototype._refresh.call(this)

        var uvs = this.uvs
        var texture = this._texture

        this._origWidth = texture.orig.width
        this._origHeight = texture.orig.height

        var _uvw = 1.0 / this._origWidth
        var _uvh = 1.0 / this._origHeight

        uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0
        uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0
        uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1
        uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1

        uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth
        uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth
        uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight
        uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight

        this.updateHorizontalVertices()
        this.updateVerticalVertices()

        this.dirty++

        this.multiplyUvs()
      }

      create_class_(NineSlicePlane, [{
        key: 'width',
        get: function get() {
          return this._width
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._width = value
          this._refresh()
        }

        /**
         * The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane
         *
         * @member {number}
         */

      }, {
        key: 'height',
        get: function get() {
          return this._height
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._height = value
          this._refresh()
        }

        /**
         * The width of the left column
         *
         * @member {number}
         */

      }, {
        key: 'leftWidth',
        get: function get() {
          return this._leftWidth
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._leftWidth = value
          this._refresh()
        }

        /**
         * The width of the right column
         *
         * @member {number}
         */

      }, {
        key: 'rightWidth',
        get: function get() {
          return this._rightWidth
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._rightWidth = value
          this._refresh()
        }

        /**
         * The height of the top row
         *
         * @member {number}
         */

      }, {
        key: 'topHeight',
        get: function get() {
          return this._topHeight
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._topHeight = value
          this._refresh()
        }

        /**
         * The height of the bottom row
         *
         * @member {number}
         */

      }, {
        key: 'bottomHeight',
        get: function get() {
          return this._bottomHeight
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._bottomHeight = value
          this._refresh()
        }
      }])

      return NineSlicePlane
    }(_Plane3.default)

    exports.default = NineSlicePlane

  }, {
    "./Plane": 168
  }],
  168: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _Mesh2 = $require('./Mesh')

    var _Mesh3 = interop_require_default_(_Mesh2)

    
    
        
    /**
     * The Plane allows you to draw a texture across several points and them manipulate these points
     *
     *```js
     * for (let i = 0; i < 20; i++) {
     *     points.push(new PIXI.Point(i * 50, 0))
     * }
     * let Plane = new PIXI.Plane(PIXI.Texture.fromImage("snake.png"), points)
     *  ```
     *
     * @class
     * @extends PIXI.mesh.Mesh
     * @memberof PIXI.mesh
     *
     */
    var Plane = function (_Mesh) {
      inherits_(Plane, _Mesh)

      /**
       * @param {PIXI.Texture} texture - The texture to use on the Plane.
       * @param {number} verticesX - The number of vertices in the x-axis
       * @param {number} verticesY - The number of vertices in the y-axis
       */
      function Plane(texture, verticesX, verticesY) {
        class_call_check_(this, Plane)

        /**
         * Tracker for if the Plane is ready to be drawn. Needed because Mesh ctor can
         * call _onTextureUpdated which could call refresh too early.
         *
         * @member {boolean}
         * @private
         */
        var _this = get_constructor_(this, _Mesh.call(this, texture))

        _this._ready = true

        _this.verticesX = verticesX || 10
        _this.verticesY = verticesY || 10

        _this.drawMode = _Mesh3.default.DRAW_MODES.TRIANGLES
        _this.refresh()
        return _this
      }

      /**
       * Refreshes plane coordinates
       *
       */


      Plane.prototype._refresh = function _refresh() {
        var texture = this._texture
        var total = this.verticesX * this.verticesY
        var verts = []
        var colors = []
        var uvs = []
        var indices = []

        var segmentsX = this.verticesX - 1
        var segmentsY = this.verticesY - 1

        var sizeX = texture.width / segmentsX
        var sizeY = texture.height / segmentsY

        for (var i = 0; i < total; i++) {
          var x = i % this.verticesX
          var y = i / this.verticesX | 0

          verts.push(x * sizeX, y * sizeY)

          uvs.push(x / segmentsX, y / segmentsY)
        }

        //  cons

        var totalSub = segmentsX * segmentsY

        for (var _i = 0; _i < totalSub; _i++) {
          var xpos = _i % segmentsX
          var ypos = _i / segmentsX | 0

          var value = ypos * this.verticesX + xpos
          var value2 = ypos * this.verticesX + xpos + 1
          var value3 = (ypos + 1) * this.verticesX + xpos
          var value4 = (ypos + 1) * this.verticesX + xpos + 1

          indices.push(value, value2, value3)
          indices.push(value2, value4, value3)
        }

        // console.log(indices)
        this.vertices = new Float32Array(verts)
        this.uvs = new Float32Array(uvs)
        this.colors = new Float32Array(colors)
        this.indices = new Uint16Array(indices)

        this.dirty++
        this.indexDirty++

        this.multiplyUvs()
      }

      /**
       * Clear texture UVs when new texture is set
       *
       * @private
       */


      Plane.prototype._onTextureUpdate = function _onTextureUpdate() {
        _Mesh3.default.prototype._onTextureUpdate.call(this)

        // wait for the Plane ctor to finish before calling refresh
        if (this._ready) {
          this.refresh()
        }
      }

      return Plane
    }(_Mesh3.default)

    exports.default = Plane

  }, {
    "./Mesh": 166
  }],
  169: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _Mesh2 = $require('./Mesh')

    var _Mesh3 = interop_require_default_(_Mesh2)

    
    
        
    /**
     * The rope allows you to draw a texture across several points and them manipulate these points
     *
     *```js
     * for (let i = 0; i < 20; i++) {
     *     points.push(new PIXI.Point(i * 50, 0))
     * }
     * let rope = new PIXI.Rope(PIXI.Texture.fromImage("snake.png"), points)
     *  ```
     *
     * @class
     * @extends PIXI.mesh.Mesh
     * @memberof PIXI.mesh
     *
     */
    var Rope = function (_Mesh) {
      inherits_(Rope, _Mesh)

      /**
       * @param {PIXI.Texture} texture - The texture to use on the rope.
       * @param {PIXI.Point[]} points - An array of {@link PIXI.Point} objects to construct this rope.
       */
      function Rope(texture, points) {
        class_call_check_(this, Rope)

        /**
         * An array of points that determine the rope
         *
         * @member {PIXI.Point[]}
         */
        var _this = get_constructor_(this, _Mesh.call(this, texture))

        _this.points = points

        /**
         * An array of vertices used to construct this rope.
         *
         * @member {Float32Array}
         */
        _this.vertices = new Float32Array(points.length * 4)

        /**
         * The WebGL Uvs of the rope.
         *
         * @member {Float32Array}
         */
        _this.uvs = new Float32Array(points.length * 4)

        /**
         * An array containing the color components
         *
         * @member {Float32Array}
         */
        _this.colors = new Float32Array(points.length * 2)

        /**
         * An array containing the indices of the vertices
         *
         * @member {Uint16Array}
         */
        _this.indices = new Uint16Array(points.length * 2)

        /**
         * refreshes vertices on every updateTransform
         * @member {boolean}
         * @default true
         */
        _this.autoUpdate = true

        _this.refresh()
        return _this
      }

      /**
       * Refreshes
       *
       */


      Rope.prototype._refresh = function _refresh() {
        var points = this.points

        // if too little points, or texture hasn't got UVs set yet just move on.
        if (points.length < 1 || !this._texture._uvs) {
          return
        }

        // if the number of points has changed we will need to recreate the arraybuffers
        if (this.vertices.length / 4 !== points.length) {
          this.vertices = new Float32Array(points.length * 4)
          this.uvs = new Float32Array(points.length * 4)
          this.colors = new Float32Array(points.length * 2)
          this.indices = new Uint16Array(points.length * 2)
        }

        var uvs = this.uvs

        var indices = this.indices
        var colors = this.colors

        uvs[0] = 0
        uvs[1] = 0
        uvs[2] = 0
        uvs[3] = 1

        colors[0] = 1
        colors[1] = 1

        indices[0] = 0
        indices[1] = 1

        var total = points.length

        for (var i = 1; i < total; i++) {
          // time to do some smart drawing!
          var index = i * 4
          var amount = i / (total - 1)

          uvs[index] = amount
          uvs[index + 1] = 0

          uvs[index + 2] = amount
          uvs[index + 3] = 1

          index = i * 2
          colors[index] = 1
          colors[index + 1] = 1

          index = i * 2
          indices[index] = index
          indices[index + 1] = index + 1
        }

        // ensure that the changes are uploaded
        this.dirty++
        this.indexDirty++

        this.multiplyUvs()
        this.refreshVertices()
      }

      /**
       * refreshes vertices of Rope mesh
       */


      Rope.prototype.refreshVertices = function refreshVertices() {
        var points = this.points

        if (points.length < 1) {
          return
        }

        var lastPoint = points[0]
        var nextPoint = void 0
        var perpX = 0
        var perpY = 0

        // this.count -= 0.2

        var vertices = this.vertices
        var total = points.length

        for (var i = 0; i < total; i++) {
          var point = points[i]
          var index = i * 4

          if (i < points.length - 1) {
            nextPoint = points[i + 1]
          } else {
            nextPoint = point
          }

          perpY = -(nextPoint.x - lastPoint.x)
          perpX = nextPoint.y - lastPoint.y

          var ratio = (1 - i / (total - 1)) * 10

          if (ratio > 1) {
            ratio = 1
          }

          var perpLength = Math.sqrt(perpX * perpX + perpY * perpY)
          var num = this._texture.height / 2; // (20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio

          perpX /= perpLength
          perpY /= perpLength

          perpX *= num
          perpY *= num

          vertices[index] = point.x + perpX
          vertices[index + 1] = point.y + perpY
          vertices[index + 2] = point.x - perpX
          vertices[index + 3] = point.y - perpY

          lastPoint = point
        }
      }

      /**
       * Updates the object transform for rendering
       *
       * @private
       */


      Rope.prototype.updateTransform = function updateTransform() {
        if (this.autoUpdate) {
          this.refreshVertices()
        }
        this.containerUpdateTransform()
      }

      return Rope
    }(_Mesh3.default)

    exports.default = Rope

  }, {
    "./Mesh": 166
  }],
  170: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _Mesh = $require('../Mesh')

    var _Mesh2 = interop_require_default_(_Mesh)

    
        
    /**
     * Renderer dedicated to meshes.
     *
     * @class
     * @private
     * @memberof PIXI
     */
    var MeshSpriteRenderer = function () {
      /**
       * @param {PIXI.CanvasRenderer} renderer - The renderer this downport works for
       */
      function MeshSpriteRenderer(renderer) {
        class_call_check_(this, MeshSpriteRenderer)

        this.renderer = renderer
      }

      /**
       * Renders the Mesh
       *
       * @param {PIXI.mesh.Mesh} mesh - the Mesh to render
       */


      MeshSpriteRenderer.prototype.render = function render(mesh) {
        var renderer = this.renderer
        var context = renderer.context

        var transform = mesh.worldTransform
        var res = renderer.resolution

        if (renderer.roundPixels) {
          context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0)
        } else {
          context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res)
        }

        renderer.context.globalAlpha = mesh.worldAlpha
        renderer.setBlendMode(mesh.blendMode)

        if (mesh.drawMode === _Mesh2.default.DRAW_MODES.TRIANGLE_MESH) {
          this._renderTriangleMesh(mesh)
        } else {
          this._renderTriangles(mesh)
        }
      }

      /**
       * Draws the object in Triangle Mesh mode
       *
       * @private
       * @param {PIXI.mesh.Mesh} mesh - the Mesh to render
       */


      MeshSpriteRenderer.prototype._renderTriangleMesh = function _renderTriangleMesh(mesh) {
        // draw triangles!!
        var length = mesh.vertices.length / 2

        for (var i = 0; i < length - 2; i++) {
          // draw some triangles!
          var index = i * 2

          this._renderDrawTriangle(mesh, index, index + 2, index + 4)
        }
      }

      /**
       * Draws the object in triangle mode using canvas
       *
       * @private
       * @param {PIXI.mesh.Mesh} mesh - the current mesh
       */


      MeshSpriteRenderer.prototype._renderTriangles = function _renderTriangles(mesh) {
        // draw triangles!!
        var indices = mesh.indices
        var length = indices.length

        for (var i = 0; i < length; i += 3) {
          // draw some triangles!
          var index0 = indices[i] * 2
          var index1 = indices[i + 1] * 2
          var index2 = indices[i + 2] * 2

          this._renderDrawTriangle(mesh, index0, index1, index2)
        }
      }

      /**
       * Draws one of the triangles that from the Mesh
       *
       * @private
       * @param {PIXI.mesh.Mesh} mesh - the current mesh
       * @param {number} index0 - the index of the first vertex
       * @param {number} index1 - the index of the second vertex
       * @param {number} index2 - the index of the third vertex
       */


      MeshSpriteRenderer.prototype._renderDrawTriangle = function _renderDrawTriangle(mesh, index0, index1, index2) {
        var context = this.renderer.context
        var uvs = mesh.uvs
        var vertices = mesh.vertices
        var texture = mesh._texture

        if (!texture.valid) {
          return
        }

        var base = texture.baseTexture
        var textureSource = base.source
        var textureWidth = base.width
        var textureHeight = base.height

        var u0 = void 0
        var u1 = void 0
        var u2 = void 0
        var v0 = void 0
        var v1 = void 0
        var v2 = void 0

        if (mesh.uploadUvTransform) {
          var ut = mesh._uvTransform.mapCoord

          u0 = (uvs[index0] * ut.a + uvs[index0 + 1] * ut.c + ut.tx) * base.width
          u1 = (uvs[index1] * ut.a + uvs[index1 + 1] * ut.c + ut.tx) * base.width
          u2 = (uvs[index2] * ut.a + uvs[index2 + 1] * ut.c + ut.tx) * base.width
          v0 = (uvs[index0] * ut.b + uvs[index0 + 1] * ut.d + ut.ty) * base.height
          v1 = (uvs[index1] * ut.b + uvs[index1 + 1] * ut.d + ut.ty) * base.height
          v2 = (uvs[index2] * ut.b + uvs[index2 + 1] * ut.d + ut.ty) * base.height
        } else {
          u0 = uvs[index0] * base.width
          u1 = uvs[index1] * base.width
          u2 = uvs[index2] * base.width
          v0 = uvs[index0 + 1] * base.height
          v1 = uvs[index1 + 1] * base.height
          v2 = uvs[index2 + 1] * base.height
        }

        var x0 = vertices[index0]
        var x1 = vertices[index1]
        var x2 = vertices[index2]
        var y0 = vertices[index0 + 1]
        var y1 = vertices[index1 + 1]
        var y2 = vertices[index2 + 1]

        var canvasPadding = mesh.canvasPadding / this.renderer.resolution

        if (canvasPadding > 0) {
          var paddingX = canvasPadding / Math.abs(mesh.worldTransform.a)
          var paddingY = canvasPadding / Math.abs(mesh.worldTransform.d)
          var centerX = (x0 + x1 + x2) / 3
          var centerY = (y0 + y1 + y2) / 3

          var normX = x0 - centerX
          var normY = y0 - centerY

          var dist = Math.sqrt(normX * normX + normY * normY)

          x0 = centerX + normX / dist * (dist + paddingX)
          y0 = centerY + normY / dist * (dist + paddingY)

          //

          normX = x1 - centerX
          normY = y1 - centerY

          dist = Math.sqrt(normX * normX + normY * normY)
          x1 = centerX + normX / dist * (dist + paddingX)
          y1 = centerY + normY / dist * (dist + paddingY)

          normX = x2 - centerX
          normY = y2 - centerY

          dist = Math.sqrt(normX * normX + normY * normY)
          x2 = centerX + normX / dist * (dist + paddingX)
          y2 = centerY + normY / dist * (dist + paddingY)
        }

        context.save()
        context.beginPath()

        context.moveTo(x0, y0)
        context.lineTo(x1, y1)
        context.lineTo(x2, y2)

        context.closePath()

        context.clip()

        // Compute matrix transform
        var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2
        var deltaA = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2
        var deltaB = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2
        var deltaC = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2
        var deltaD = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2
        var deltaE = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2
        var deltaF = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2

        context.transform(deltaA / delta, deltaD / delta, deltaB / delta, deltaE / delta, deltaC / delta, deltaF / delta)

        context.drawImage(textureSource, 0, 0, textureWidth * base.resolution, textureHeight * base.resolution, 0, 0, textureWidth, textureHeight)

        context.restore()
        this.renderer.invalidateBlendMode()
      }

      /**
       * Renders a flat Mesh
       *
       * @private
       * @param {PIXI.mesh.Mesh} mesh - The Mesh to render
       */


      MeshSpriteRenderer.prototype.renderMeshFlat = function renderMeshFlat(mesh) {
        var context = this.renderer.context
        var vertices = mesh.vertices
        var length = vertices.length / 2

        // this.count++

        context.beginPath()

        for (var i = 1; i < length - 2; ++i) {
          // draw some triangles!
          var index = i * 2

          var x0 = vertices[index]
          var y0 = vertices[index + 1]

          var x1 = vertices[index + 2]
          var y1 = vertices[index + 3]

          var x2 = vertices[index + 4]
          var y2 = vertices[index + 5]

          context.moveTo(x0, y0)
          context.lineTo(x1, y1)
          context.lineTo(x2, y2)
        }

        context.fillStyle = '#FF0000'
        context.fill()
        context.closePath()
      }

      /**
       * destroy the the renderer.
       *
       */


      MeshSpriteRenderer.prototype.destroy = function destroy() {
        this.renderer = null
      }

      return MeshSpriteRenderer
    }()

    exports.default = MeshSpriteRenderer


    core.CanvasRenderer.registerPlugin('mesh', MeshSpriteRenderer)

  }, {
    "../../core": 65,
    "../Mesh": 166
  }],
  171: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _Mesh = $require('./Mesh')

    Object.defineProperty(exports, 'Mesh', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Mesh).default
      }
    })

    var _MeshRenderer = $require('./webgl/MeshRenderer')

    Object.defineProperty(exports, 'MeshRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_MeshRenderer).default
      }
    })

    var _CanvasMeshRenderer = $require('./canvas/CanvasMeshRenderer')

    Object.defineProperty(exports, 'CanvasMeshRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasMeshRenderer).default
      }
    })

    var _Plane = $require('./Plane')

    Object.defineProperty(exports, 'Plane', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Plane).default
      }
    })

    var _NineSlicePlane = $require('./NineSlicePlane')

    Object.defineProperty(exports, 'NineSlicePlane', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_NineSlicePlane).default
      }
    })

    var _Rope = $require('./Rope')

    Object.defineProperty(exports, 'Rope', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_Rope).default
      }
    })

    
  }, {
    "./Mesh": 166,
    "./NineSlicePlane": 167,
    "./Plane": 168,
    "./Rope": 169,
    "./canvas/CanvasMeshRenderer": 170,
    "./webgl/MeshRenderer": 172
  }],
  172: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _pixiGlCore = $require('pixi-gl-core')

    var _pixiGlCore2 = interop_require_default_(_pixiGlCore)

    var _Mesh = $require('../Mesh')

    var _Mesh2 = interop_require_default_(_Mesh)

    var _path = $require('path')

    
        
        
    var matrixIdentity = core.Matrix.IDENTITY

    /**
     * WebGL renderer plugin for tiling sprites
     *
     * @class
     * @memberof PIXI
     * @extends PIXI.ObjectRenderer
     */

    var MeshRenderer = function (_core$ObjectRenderer) {
      inherits_(MeshRenderer, _core$ObjectRenderer)

      /**
       * constructor for renderer
       *
       * @param {WebGLRenderer} renderer The renderer this tiling awesomeness works for.
       */
      function MeshRenderer(renderer) {
        class_call_check_(this, MeshRenderer)

        var _this = get_constructor_(this, _core$ObjectRenderer.call(this, renderer))

        _this.shader = null
        return _this
      }

      /**
       * Sets up the renderer context and necessary buffers.
       *
       * @private
       */


      MeshRenderer.prototype.onContextChange = function onContextChange() {
        var gl = this.renderer.gl

        this.shader = new core.Shader(gl, 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n', 'varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n')
      }

      /**
       * renders mesh
       *
       * @param {PIXI.mesh.Mesh} mesh mesh instance
       */


      MeshRenderer.prototype.render = function render(mesh) {
        var renderer = this.renderer
        var gl = renderer.gl
        var texture = mesh._texture

        if (!texture.valid) {
          return
        }

        var glData = mesh._glDatas[renderer.CONTEXT_UID]

        if (!glData) {
          renderer.bindVao(null)

          glData = {
            shader: this.shader,
            vertexBuffer: _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, mesh.vertices, gl.STREAM_DRAW),
            uvBuffer: _pixiGlCore2.default.GLBuffer.createVertexBuffer(gl, mesh.uvs, gl.STREAM_DRAW),
            indexBuffer: _pixiGlCore2.default.GLBuffer.createIndexBuffer(gl, mesh.indices, gl.STATIC_DRAW),
            // build the vao object that will render..
            vao: null,
            dirty: mesh.dirty,
            indexDirty: mesh.indexDirty,
            vertexDirty: mesh.vertexDirty
          }

          // build the vao object that will render..
          glData.vao = new _pixiGlCore2.default.VertexArrayObject(gl).addIndex(glData.indexBuffer).addAttribute(glData.vertexBuffer, glData.shader.attributes.aVertexPosition, gl.FLOAT, false, 2 * 4, 0).addAttribute(glData.uvBuffer, glData.shader.attributes.aTextureCoord, gl.FLOAT, false, 2 * 4, 0)

          mesh._glDatas[renderer.CONTEXT_UID] = glData
        }

        renderer.bindVao(glData.vao)

        if (mesh.dirty !== glData.dirty) {
          glData.dirty = mesh.dirty
          glData.uvBuffer.upload(mesh.uvs)
        }

        if (mesh.indexDirty !== glData.indexDirty) {
          glData.indexDirty = mesh.indexDirty
          glData.indexBuffer.upload(mesh.indices)
        }

        if (mesh.vertexDirty !== glData.vertexDirty) {
          glData.vertexDirty = mesh.vertexDirty
          glData.vertexBuffer.upload(mesh.vertices)
        }

        renderer.bindShader(glData.shader)

        glData.shader.uniforms.uSampler = renderer.bindTexture(texture)

        renderer.state.setBlendMode(core.utils.correctBlendMode(mesh.blendMode, texture.baseTexture.premultipliedAlpha))

        if (glData.shader.uniforms.uTransform) {
          if (mesh.uploadUvTransform) {
            glData.shader.uniforms.uTransform = mesh._uvTransform.mapCoord.toArray(true)
          } else {
            glData.shader.uniforms.uTransform = matrixIdentity.toArray(true)
          }
        }
        glData.shader.uniforms.translationMatrix = mesh.worldTransform.toArray(true)

        glData.shader.uniforms.uColor = core.utils.premultiplyRgba(mesh.tintRgb, mesh.worldAlpha, glData.shader.uniforms.uColor, texture.baseTexture.premultipliedAlpha)

        var drawMode = mesh.drawMode === _Mesh2.default.DRAW_MODES.TRIANGLE_MESH ? gl.TRIANGLE_STRIP : gl.TRIANGLES

        glData.vao.draw(drawMode, mesh.indices.length, 0)
      }

      return MeshRenderer
    }(core.ObjectRenderer)

    exports.default = MeshRenderer


    core.WebGLRenderer.registerPlugin('mesh', MeshRenderer)

  }, {
    "../../core": 65,
    "../Mesh": 166,
    "path": 8,
    "pixi-gl-core": 15
  }],
  173: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _utils = $require('../core/utils')

        
        
    /**
     * The ParticleContainer class is a really fast version of the Container built solely for speed,
     * so use when you need a lot of sprites or particles. The tradeoff of the ParticleContainer is that most advanced
     * functionality will not work. ParticleContainer implements the basic object transform (position, scale, rotation)
     * and some advanced functionality like tint (as of v4.5.6).
     * Other more advanced functionality like masking, children, filters, etc will not work on sprites in this batch.
     *
     * It's extremely easy to use :
     *
     * ```js
     * let container = new ParticleContainer()
     *
     * for (let i = 0; i < 100; ++i)
     * {
     *     let sprite = new PIXI.Sprite.fromImage("myImage.png")
     *     container.addChild(sprite)
     * }
     * ```
     *
     * And here you have a hundred sprites that will be rendered at the speed of light.
     *
     * @class
     * @extends PIXI.Container
     * @memberof PIXI.particles
     */
    var ParticleContainer = function (_core$Container) {
      inherits_(ParticleContainer, _core$Container)

      /**
       * @param {number} [maxSize=1500] - The maximum number of particles that can be rendered by the container.
       *  Affects size of allocated buffers.
       * @param {object} [properties] - The properties of children that should be uploaded to the gpu and applied.
       * @param {boolean} [properties.vertices=false] - When true, vertices be uploaded and applied.
       *                  if sprite's ` scale/anchor/trim/frame/orig` is dynamic, please set `true`.
       * @param {boolean} [properties.position=true] - When true, position be uploaded and applied.
       * @param {boolean} [properties.rotation=false] - When true, rotation be uploaded and applied.
       * @param {boolean} [properties.uvs=false] - When true, uvs be uploaded and applied.
       * @param {boolean} [properties.tint=false] - When true, alpha and tint be uploaded and applied.
       * @param {number} [batchSize=16384] - Number of particles per batch. If less than maxSize, it uses maxSize instead.
       * @param {boolean} [autoResize=false] If true, container allocates more batches in case
       *  there are more than `maxSize` particles.
       */
      function ParticleContainer() {
        var maxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500
        var properties = arguments[1]
        var batchSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16384
        var autoResize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

        class_call_check_(this, ParticleContainer)

        // Making sure the batch size is valid
        // 65535 is max vertex index in the index buffer (see ParticleRenderer)
        // so max number of particles is 65536 / 4 = 16384
        var _this = get_constructor_(this, _core$Container.call(this))

        var maxBatchSize = 16384

        if (batchSize > maxBatchSize) {
          batchSize = maxBatchSize
        }

        if (batchSize > maxSize) {
          batchSize = maxSize
        }

        /**
         * Set properties to be dynamic (true) / static (false)
         *
         * @member {boolean[]}
         * @private
         */
        _this._properties = [false, true, false, false, false]

        /**
         * @member {number}
         * @private
         */
        _this._maxSize = maxSize

        /**
         * @member {number}
         * @private
         */
        _this._batchSize = batchSize

        /**
         * @member {object<number, WebGLBuffer>}
         * @private
         */
        _this._glBuffers = {}

        /**
         * for every batch stores _updateID corresponding to the last change in that batch
         * @member {number[]}
         * @private
         */
        _this._bufferUpdateIDs = []

        /**
         * when child inserted, removed or changes position this number goes up
         * @member {number[]}
         * @private
         */
        _this._updateID = 0

        /**
         * @member {boolean}
         *
         */
        _this.interactiveChildren = false

        /**
         * The blend mode to be applied to the sprite. Apply a value of `PIXI.BLEND_MODES.NORMAL`
         * to reset the blend mode.
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL
         * @see PIXI.BLEND_MODES
         */
        _this.blendMode = core.BLEND_MODES.NORMAL

        /**
         * If true, container allocates more batches in case there are more than `maxSize` particles.
         * @member {boolean}
         * @default false
         */
        _this.autoResize = autoResize

        /**
         * Used for canvas renderering. If true then the elements will be positioned at the
         * nearest pixel. This provides a nice speed boost.
         *
         * @member {boolean}
         * @default true
         */
        _this.roundPixels = true

        /**
         * The texture used to render the children.
         *
         * @readonly
         * @member {BaseTexture}
         */
        _this.baseTexture = null

        _this.setProperties(properties)

        /**
         * The tint applied to the container.
         * This is a hex value. A value of 0xFFFFFF will remove any tint effect.
         *
         * @private
         * @member {number}
         * @default 0xFFFFFF
         */
        _this._tint = 0
        _this.tintRgb = new Float32Array(4)
        _this.tint = 0xFFFFFF
        return _this
      }

      /**
       * Sets the private properties array to dynamic / static based on the passed properties object
       *
       * @param {object} properties - The properties to be uploaded
       */


      ParticleContainer.prototype.setProperties = function setProperties(properties) {
        if (properties) {
          this._properties[0] = 'vertices' in properties || 'scale' in properties ? !!properties.vertices || !!properties.scale : this._properties[0]
          this._properties[1] = 'position' in properties ? !!properties.position : this._properties[1]
          this._properties[2] = 'rotation' in properties ? !!properties.rotation : this._properties[2]
          this._properties[3] = 'uvs' in properties ? !!properties.uvs : this._properties[3]
          this._properties[4] = 'tint' in properties || 'alpha' in properties ? !!properties.tint || !!properties.alpha : this._properties[4]
        }
      }

      /**
       * Updates the object transform for rendering
       *
       * @private
       */


      ParticleContainer.prototype.updateTransform = function updateTransform() {
        // TODO don't need to!
        this.displayObjectUpdateTransform()
        //  PIXI.Container.prototype.updateTransform.call( this )
      }

      /**
       * The tint applied to the container. This is a hex value.
       * A value of 0xFFFFFF will remove any tint effect.
       ** IMPORTANT: This is a webGL only feature and will be ignored by the canvas renderer.
       * @member {number}
       * @default 0xFFFFFF
       */


      /**
       * Renders the container using the WebGL renderer
       *
       * @private
       * @param {PIXI.WebGLRenderer} renderer - The webgl renderer
       */
      ParticleContainer.prototype.renderWebGL = function renderWebGL(renderer) {
        var _this2 = this

        if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
          return
        }

        if (!this.baseTexture) {
          this.baseTexture = this.children[0]._texture.baseTexture
          if (!this.baseTexture.hasLoaded) {
            this.baseTexture.once('update', function () {
              return _this2.onChildrenChange(0)
            })
          }
        }

        renderer.setObjectRenderer(renderer.plugins.particle)
        renderer.plugins.particle.render(this)
      }

      /**
       * Set the flag that static data should be updated to true
       *
       * @private
       * @param {number} smallestChildIndex - The smallest child index
       */


      ParticleContainer.prototype.onChildrenChange = function onChildrenChange(smallestChildIndex) {
        var bufferIndex = Math.floor(smallestChildIndex / this._batchSize)

        while (this._bufferUpdateIDs.length < bufferIndex) {
          this._bufferUpdateIDs.push(0)
        }
        this._bufferUpdateIDs[bufferIndex] = ++this._updateID
      }

      /**
       * Renders the object using the Canvas renderer
       *
       * @private
       * @param {PIXI.CanvasRenderer} renderer - The canvas renderer
       */


      ParticleContainer.prototype.renderCanvas = function renderCanvas(renderer) {
        if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
          return
        }

        var context = renderer.context
        var transform = this.worldTransform
        var isRotated = true

        var positionX = 0
        var positionY = 0

        var finalWidth = 0
        var finalHeight = 0

        renderer.setBlendMode(this.blendMode)

        context.globalAlpha = this.worldAlpha

        this.displayObjectUpdateTransform()

        for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i]

          if (!child.visible) {
            continue
          }

          var frame = child._texture.frame

          context.globalAlpha = this.worldAlpha * child.alpha

          if (child.rotation % (Math.PI * 2) === 0) {
            // this is the fastest  way to optimise! - if rotation is 0 then we can avoid any kind of setTransform call
            if (isRotated) {
              context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx * renderer.resolution, transform.ty * renderer.resolution)

              isRotated = false
            }

            positionX = child.anchor.x * (-frame.width * child.scale.x) + child.position.x + 0.5
            positionY = child.anchor.y * (-frame.height * child.scale.y) + child.position.y + 0.5

            finalWidth = frame.width * child.scale.x
            finalHeight = frame.height * child.scale.y
          } else {
            if (!isRotated) {
              isRotated = true
            }

            child.displayObjectUpdateTransform()

            var childTransform = child.worldTransform

            if (renderer.roundPixels) {
              context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx * renderer.resolution | 0, childTransform.ty * renderer.resolution | 0)
            } else {
              context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx * renderer.resolution, childTransform.ty * renderer.resolution)
            }

            positionX = child.anchor.x * -frame.width + 0.5
            positionY = child.anchor.y * -frame.height + 0.5

            finalWidth = frame.width
            finalHeight = frame.height
          }

          var resolution = child._texture.baseTexture.resolution

          context.drawImage(child._texture.baseTexture.source, frame.x * resolution, frame.y * resolution, frame.width * resolution, frame.height * resolution, positionX * renderer.resolution, positionY * renderer.resolution, finalWidth * renderer.resolution, finalHeight * renderer.resolution)
        }
      }

      /**
       * Destroys the container
       *
       * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
       *  have been set to that value
       * @param {boolean} [options.children=false] - if set to true, all the children will have their
       *  destroy method called as well. 'options' will be passed on to those calls.
       * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
       *  Should it destroy the texture of the child sprite
       * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
       *  Should it destroy the base texture of the child sprite
       */


      ParticleContainer.prototype.destroy = function destroy(options) {
        _core$Container.prototype.destroy.call(this, options)

        if (this._buffers) {
          for (var i = 0; i < this._buffers.length; ++i) {
            this._buffers[i].destroy()
          }
        }

        this._properties = null
        this._buffers = null
        this._bufferUpdateIDs = null
      }

      create_class_(ParticleContainer, [{
        key: 'tint',
        get: function get() {
          return this._tint
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
          this._tint = value
          void (0, _utils.hex2rgb)(value, this.tintRgb)
        }
      }])

      return ParticleContainer
    }(core.Container)

    exports.default = ParticleContainer

  }, {
    "../core": 65,
    "../core/utils": 125
  }],
  174: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _ParticleContainer = $require('./ParticleContainer')

    Object.defineProperty(exports, 'ParticleContainer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_ParticleContainer).default
      }
    })

    var _ParticleRenderer = $require('./webgl/ParticleRenderer')

    Object.defineProperty(exports, 'ParticleRenderer', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_ParticleRenderer).default
      }
    })
    
  }, {
    "./ParticleContainer": 173,
    "./webgl/ParticleRenderer": 176
  }],
  175: [function ($require, container, exports) {
    container.exports = ParticleBuffer
  }, {
    "../../core/utils/createIndicesForQuads": 123,
    "pixi-gl-core": 15
  }],
  176: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _ParticleShader = $require('./ParticleShader')

    var _ParticleShader2 = interop_require_default_(_ParticleShader)

    var _ParticleBuffer = $require('./ParticleBuffer')

    var _ParticleBuffer2 = interop_require_default_(_ParticleBuffer)

    var _utils = $require('../../core/utils')
    
    /**
     * @author Mat Groves
     *
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original PixiJS version!
     * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that they now
     * share 4 bytes on the vertex buffer
     *
     * Heavily inspired by LibGDX's ParticleRenderer:
     * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/ParticleRenderer.java
     */

    /**
     *
     * @class
     * @private
     * @memberof PIXI
     */
    var ParticleRenderer = function (_core$ObjectRenderer) {
      inherits_(ParticleRenderer, _core$ObjectRenderer)

      /**
       * @param {PIXI.WebGLRenderer} renderer - The renderer this sprite batch works for.
       */
      function ParticleRenderer(renderer) {
        class_call_check_(this, ParticleRenderer)

        // 65535 is max vertex index in the index buffer (see ParticleRenderer)
        // so max number of particles is 65536 / 4 = 16384
        // and max number of element in the index buffer is 16384 * 6 = 98304
        // Creating a full index buffer, overhead is 98304 * 2 = 196Ko
        // let numIndices = 98304

        /**
         * The default shader that is used if a sprite doesn't have a more specific one.
         *
         * @member {PIXI.Shader}
         */
        var _this = get_constructor_(this, _core$ObjectRenderer.call(this, renderer))

        _this.shader = null

        _this.indexBuffer = null

        _this.properties = null

        _this.tempMatrix = new core.Matrix()

        _this.CONTEXT_UID = 0
        return _this
      }

      /**
       * When there is a WebGL context change
       *
       * @private
       */


      ParticleRenderer.prototype.onContextChange = function onContextChange() {
        var gl = this.renderer.gl

        this.CONTEXT_UID = this.renderer.CONTEXT_UID

        // setup default shader
        this.shader = new _ParticleShader2.default(gl)

        this.properties = [
          // verticesData
          {
            attribute: this.shader.attributes.aVertexPosition,
            size: 2,
            uploadFunction: this.uploadVertices,
            offset: 0
          },
          // positionData
          {
            attribute: this.shader.attributes.aPositionCoord,
            size: 2,
            uploadFunction: this.uploadPosition,
            offset: 0
          },
          // rotationData
          {
            attribute: this.shader.attributes.aRotation,
            size: 1,
            uploadFunction: this.uploadRotation,
            offset: 0
          },
          // uvsData
          {
            attribute: this.shader.attributes.aTextureCoord,
            size: 2,
            uploadFunction: this.uploadUvs,
            offset: 0
          },
          // tintData
          {
            attribute: this.shader.attributes.aColor,
            size: 1,
            unsignedByte: true,
            uploadFunction: this.uploadTint,
            offset: 0
          }
        ]
      }

      /**
       * Starts a new particle batch.
       *
       */


      ParticleRenderer.prototype.start = function start() {
        this.renderer.bindShader(this.shader)
      }

      /**
       * Renders the particle container object.
       *
       * @param {PIXI.ParticleContainer} container - The container to render using this ParticleRenderer
       */


      ParticleRenderer.prototype.render = function render(container) {
        var children = container.children
        var maxSize = container._maxSize
        var batchSize = container._batchSize
        var renderer = this.renderer
        var totalChildren = children.length

        if (totalChildren === 0) {
          return
        } else if (totalChildren > maxSize) {
          totalChildren = maxSize
        }

        var buffers = container._glBuffers[renderer.CONTEXT_UID]

        if (!buffers) {
          buffers = container._glBuffers[renderer.CONTEXT_UID] = this.generateBuffers(container)
        }

        var baseTexture = children[0]._texture.baseTexture

        // if the uvs have not updated then no point rendering just yet!
        this.renderer.setBlendMode(core.utils.correctBlendMode(container.blendMode, baseTexture.premultipliedAlpha))

        var gl = renderer.gl

        var m = container.worldTransform.copy(this.tempMatrix)

        m.prepend(renderer._activeRenderTarget.projectionMatrix)

        this.shader.uniforms.projectionMatrix = m.toArray(true)

        this.shader.uniforms.uColor = core.utils.premultiplyRgba(container.tintRgb, container.worldAlpha, this.shader.uniforms.uColor, baseTexture.premultipliedAlpha)

        // make sure the texture is bound..
        this.shader.uniforms.uSampler = renderer.bindTexture(baseTexture)

        var updateStatic = false

        // now lets upload and render the buffers..
        for (var i = 0, j = 0; i < totalChildren; i += batchSize, j += 1) {
          var amount = totalChildren - i

          if (amount > batchSize) {
            amount = batchSize
          }

          if (j >= buffers.length) {
            if (!container.autoResize) {
              break
            }
            buffers.push(this._generateOneMoreBuffer(container))
          }

          var buffer = buffers[j]

          // we always upload the dynamic
          buffer.uploadDynamic(children, i, amount)

          var bid = container._bufferUpdateIDs[j] || 0

          updateStatic = updateStatic || buffer._updateID < bid
          // we only upload the static content when we have to!
          if (updateStatic) {
            buffer._updateID = container._updateID
            buffer.uploadStatic(children, i, amount)
          }

          // bind the buffer
          renderer.bindVao(buffer.vao)
          buffer.vao.draw(gl.TRIANGLES, amount * 6)
        }
      }

      /**
       * Creates one particle buffer for each child in the container we want to render and updates internal properties
       *
       * @param {PIXI.ParticleContainer} container - The container to render using this ParticleRenderer
       * @return {PIXI.ParticleBuffer[]} The buffers
       */


      ParticleRenderer.prototype.generateBuffers = function generateBuffers(container) {
        var gl = this.renderer.gl
        var buffers = []
        var size = container._maxSize
        var batchSize = container._batchSize
        var dynamicPropertyFlags = container._properties

        for (var i = 0; i < size; i += batchSize) {
          buffers.push(new _ParticleBuffer2.default(gl, this.properties, dynamicPropertyFlags, batchSize))
        }

        return buffers
      }

      /**
       * Creates one more particle buffer, because container has autoResize feature
       *
       * @param {PIXI.ParticleContainer} container - The container to render using this ParticleRenderer
       * @return {PIXI.ParticleBuffer} generated buffer
       * @private
       */


      ParticleRenderer.prototype._generateOneMoreBuffer = function _generateOneMoreBuffer(container) {
        var gl = this.renderer.gl
        var batchSize = container._batchSize
        var dynamicPropertyFlags = container._properties

        return new _ParticleBuffer2.default(gl, this.properties, dynamicPropertyFlags, batchSize)
      }

      /**
       * Uploads the verticies.
       *
       * @param {PIXI.DisplayObject[]} children - the array of display objects to render
       * @param {number} startIndex - the index to start from in the children array
       * @param {number} amount - the amount of children that will have their vertices uploaded
       * @param {number[]} array - The vertices to upload.
       * @param {number} stride - Stride to use for iteration.
       * @param {number} offset - Offset to start at.
       */


      ParticleRenderer.prototype.uploadVertices = function uploadVertices(children, startIndex, amount, array, stride, offset) {
        var w0 = 0
        var w1 = 0
        var h0 = 0
        var h1 = 0

        for (var i = 0; i < amount; ++i) {
          var sprite = children[startIndex + i]
          var texture = sprite._texture
          var sx = sprite.scale.x
          var sy = sprite.scale.y
          var trim = texture.trim
          var orig = texture.orig

          if (trim) {
            // if the sprite is trimmed and is not a tilingsprite then we need to add the
            // extra space before transforming the sprite coords..
            w1 = trim.x - sprite.anchor.x * orig.width
            w0 = w1 + trim.width

            h1 = trim.y - sprite.anchor.y * orig.height
            h0 = h1 + trim.height
          } else {
            w0 = orig.width * (1 - sprite.anchor.x)
            w1 = orig.width * -sprite.anchor.x

            h0 = orig.height * (1 - sprite.anchor.y)
            h1 = orig.height * -sprite.anchor.y
          }

          array[offset] = w1 * sx
          array[offset + 1] = h1 * sy

          array[offset + stride] = w0 * sx
          array[offset + stride + 1] = h1 * sy

          array[offset + stride * 2] = w0 * sx
          array[offset + stride * 2 + 1] = h0 * sy

          array[offset + stride * 3] = w1 * sx
          array[offset + stride * 3 + 1] = h0 * sy

          offset += stride * 4
        }
      }

      /**
       *
       * @param {PIXI.DisplayObject[]} children - the array of display objects to render
       * @param {number} startIndex - the index to start from in the children array
       * @param {number} amount - the amount of children that will have their positions uploaded
       * @param {number[]} array - The vertices to upload.
       * @param {number} stride - Stride to use for iteration.
       * @param {number} offset - Offset to start at.
       */


      ParticleRenderer.prototype.uploadPosition = function uploadPosition(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; i++) {
          var spritePosition = children[startIndex + i].position

          array[offset] = spritePosition.x
          array[offset + 1] = spritePosition.y

          array[offset + stride] = spritePosition.x
          array[offset + stride + 1] = spritePosition.y

          array[offset + stride * 2] = spritePosition.x
          array[offset + stride * 2 + 1] = spritePosition.y

          array[offset + stride * 3] = spritePosition.x
          array[offset + stride * 3 + 1] = spritePosition.y

          offset += stride * 4
        }
      }

      /**
       *
       * @param {PIXI.DisplayObject[]} children - the array of display objects to render
       * @param {number} startIndex - the index to start from in the children array
       * @param {number} amount - the amount of children that will have their rotation uploaded
       * @param {number[]} array - The vertices to upload.
       * @param {number} stride - Stride to use for iteration.
       * @param {number} offset - Offset to start at.
       */


      ParticleRenderer.prototype.uploadRotation = function uploadRotation(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; i++) {
          var spriteRotation = children[startIndex + i].rotation

          array[offset] = spriteRotation
          array[offset + stride] = spriteRotation
          array[offset + stride * 2] = spriteRotation
          array[offset + stride * 3] = spriteRotation

          offset += stride * 4
        }
      }

      /**
       *
       * @param {PIXI.DisplayObject[]} children - the array of display objects to render
       * @param {number} startIndex - the index to start from in the children array
       * @param {number} amount - the amount of children that will have their rotation uploaded
       * @param {number[]} array - The vertices to upload.
       * @param {number} stride - Stride to use for iteration.
       * @param {number} offset - Offset to start at.
       */


      ParticleRenderer.prototype.uploadUvs = function uploadUvs(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; ++i) {
          var textureUvs = children[startIndex + i]._texture._uvs

          if (textureUvs) {
            array[offset] = textureUvs.x0
            array[offset + 1] = textureUvs.y0

            array[offset + stride] = textureUvs.x1
            array[offset + stride + 1] = textureUvs.y1

            array[offset + stride * 2] = textureUvs.x2
            array[offset + stride * 2 + 1] = textureUvs.y2

            array[offset + stride * 3] = textureUvs.x3
            array[offset + stride * 3 + 1] = textureUvs.y3

            offset += stride * 4
          } else {
            // TODO you know this can be easier!
            array[offset] = 0
            array[offset + 1] = 0

            array[offset + stride] = 0
            array[offset + stride + 1] = 0

            array[offset + stride * 2] = 0
            array[offset + stride * 2 + 1] = 0

            array[offset + stride * 3] = 0
            array[offset + stride * 3 + 1] = 0

            offset += stride * 4
          }
        }
      }

      /**
       *
       * @param {PIXI.DisplayObject[]} children - the array of display objects to render
       * @param {number} startIndex - the index to start from in the children array
       * @param {number} amount - the amount of children that will have their rotation uploaded
       * @param {number[]} array - The vertices to upload.
       * @param {number} stride - Stride to use for iteration.
       * @param {number} offset - Offset to start at.
       */


      ParticleRenderer.prototype.uploadTint = function uploadTint(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; ++i) {
          var sprite = children[startIndex + i]
          var premultiplied = sprite._texture.baseTexture.premultipliedAlpha
          var alpha = sprite.alpha
          // we dont call extra function if alpha is 1.0, that's faster
          var argb = alpha < 1.0 && premultiplied ? (0, _utils.premultiplyTint)(sprite._tintRGB, alpha) : sprite._tintRGB + (alpha * 255 << 24)

          array[offset] = argb
          array[offset + stride] = argb
          array[offset + stride * 2] = argb
          array[offset + stride * 3] = argb

          offset += stride * 4
        }
      }

      /**
       * Destroys the ParticleRenderer.
       *
       */


      ParticleRenderer.prototype.destroy = function destroy() {
        if (this.renderer.gl) {
          this.renderer.gl.deleteBuffer(this.indexBuffer)
        }

        _core$ObjectRenderer.prototype.destroy.call(this)

        this.shader.destroy()

        this.indices = null
        this.tempMatrix = null
      }

      core.WebGLRenderer.registerPlugin('particle', ParticleRenderer)

      return ParticleRenderer
    }(core.ObjectRenderer)

    exports.default = ParticleRenderer
  }, {
    "../../core": 65,
    "../../core/utils": 125,
    "./ParticleBuffer": 175,
    "./ParticleShader": 177
  }],
  177: [function ($require, container, exports) {
    container.exports = ParticleShader
  }, {
    "../../core/Shader": 44
  }],
  178: [function ($require, container, exports) {
    make_sign()
  }, {}],
  179: [function ($require, container, exports) {
    make_is_integer()
  }, {}],
  180: [function ($require, container, exports) {
    'use strict'

    var _objectAssign = $require('object-assign')

    var _objectAssign2 = interop_require_default_(_objectAssign)

    
    if (!Object.assign) {
      Object.assign = _objectAssign2.default
    } // References:
    // https://github.com/sindresorhus/object-assign
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

  }, {
    "object-assign": 6
  }],
  181: [function ($require, container, exports) {
    'use strict'

    $require('./Object.assign')

    $require('./requestAnimationFrame')

    $require('./Math.sign')

    $require('./Number.isInteger')

    if (!window.ArrayBuffer) {
      window.ArrayBuffer = Array
    }

    if (!window.Float32Array) {
      window.Float32Array = Array
    }

    if (!window.Uint32Array) {
      window.Uint32Array = Array
    }

    if (!window.Uint16Array) {
      window.Uint16Array = Array
    }

  }, {
    "./Math.sign": 178,
    "./Number.isInteger": 179,
    "./Object.assign": 180,
    "./requestAnimationFrame": 182
  }],
  182: [function ($require, container, exports) {
    make_animation_frame_stuff()
  }, {}],
  183: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../core')

    var core = interop_require_wildcard_(_core)

    var _CountLimiter = $require('./limiters/CountLimiter')

    var _CountLimiter2 = interop_require_default_(_CountLimiter)

    
        
    var SharedTicker = core.ticker.shared

    /**
     * Default number of uploads per frame using prepare plugin.
     *
     * @static
     * @memberof PIXI.settings
     * @name UPLOADS_PER_FRAME
     * @type {number}
     * @default 4
     */
    core.settings.UPLOADS_PER_FRAME = 4

    /**
     * The prepare manager provides functionality to upload content to the GPU. BasePrepare handles
     * basic queuing functionality and is extended by {@link PIXI.prepare.WebGLPrepare} and {@link PIXI.prepare.CanvasPrepare}
     * to provide preparation capabilities specific to their respective renderers.
     *
     * @example
     * // Create a sprite
     * const sprite = new PIXI.Sprite.fromImage('something.png')
     *
     * // Load object into GPU
     * app.renderer.plugins.prepare.upload(sprite, () => {
     *
     *     //Texture(s) has been uploaded to GPU
     *     app.stage.addChild(sprite)
     *
     * })
     *
     * @abstract
     * @class
     * @memberof PIXI.prepare
     */

    var BasePrepare = function () {
      /**
       * @param {PIXI.SystemRenderer} renderer - A reference to the current renderer
       */
      function BasePrepare(renderer) {
        var _this = this

        class_call_check_(this, BasePrepare)

        /**
         * The limiter to be used to control how quickly items are prepared.
         * @type {PIXI.prepare.CountLimiter|PIXI.prepare.TimeLimiter}
         */
        this.limiter = new _CountLimiter2.default(core.settings.UPLOADS_PER_FRAME)

        /**
         * Reference to the renderer.
         * @type {PIXI.SystemRenderer}
         * @protected
         */
        this.renderer = renderer

        /**
         * The only real difference between CanvasPrepare and WebGLPrepare is what they pass
         * to upload hooks. That different parameter is stored here.
         * @type {PIXI.prepare.CanvasPrepare|PIXI.WebGLRenderer}
         * @protected
         */
        this.uploadHookHelper = null

        /**
         * Collection of items to uploads at once.
         * @type {Array<*>}
         * @private
         */
        this.queue = []

        /**
         * Collection of additional hooks for finding assets.
         * @type {Array<Function>}
         * @private
         */
        this.addHooks = []

        /**
         * Collection of additional hooks for processing assets.
         * @type {Array<Function>}
         * @private
         */
        this.uploadHooks = []

        /**
         * Callback to call after completed.
         * @type {Array<Function>}
         * @private
         */
        this.completes = []

        /**
         * If prepare is ticking (running).
         * @type {boolean}
         * @private
         */
        this.ticking = false

        /**
         * 'bound' call for prepareItems().
         * @type {Function}
         * @private
         */
        this.delayedTick = function () {
          // unlikely, but in case we were destroyed between tick() and delayedTick()
          if (!_this.queue) {
            return
          }
          _this.prepareItems()
        }

        // hooks to find the correct texture
        this.registerFindHook(findText)
        this.registerFindHook(findTextStyle)
        this.registerFindHook(findMultipleBaseTextures)
        this.registerFindHook(findBaseTexture)
        this.registerFindHook(findTexture)

        // upload hooks
        this.registerUploadHook(drawText)
        this.registerUploadHook(calculateTextStyle)
      }

      /**
       * Upload all the textures and graphics to the GPU.
       *
       * @param {Function|PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text} item -
       *        Either the container or display object to search for items to upload, the items to upload themselves,
       *        or the callback function, if items have been added using `prepare.add`.
       * @param {Function} [done] - Optional callback when all queued uploads have completed
       */


      BasePrepare.prototype.upload = function upload(item, done) {
        if (typeof item === 'function') {
          done = item
          item = null
        }

        // If a display object, search for items
        // that we could upload
        if (item) {
          this.add(item)
        }

        // Get the items for upload from the display
        if (this.queue.length) {
          if (done) {
            this.completes.push(done)
          }

          if (!this.ticking) {
            this.ticking = true
            SharedTicker.addOnce(this.tick, this, core.UPDATE_PRIORITY.UTILITY)
          }
        } else if (done) {
          done()
        }
      }

      /**
       * Handle tick update
       *
       * @private
       */


      BasePrepare.prototype.tick = function tick() {
        setTimeout(this.delayedTick, 0)
      }

      /**
       * Actually prepare items. This is handled outside of the tick because it will take a while
       * and we do NOT want to block the current animation frame from rendering.
       *
       * @private
       */


      BasePrepare.prototype.prepareItems = function prepareItems() {
        this.limiter.beginFrame()
        // Upload the graphics
        while (this.queue.length && this.limiter.allowedToUpload()) {
          var item = this.queue[0]
          var uploaded = false

          if (item && !item._destroyed) {
            for (var i = 0, len = this.uploadHooks.length; i < len; i++) {
              if (this.uploadHooks[i](this.uploadHookHelper, item)) {
                this.queue.shift()
                uploaded = true
                break
              }
            }
          }

          if (!uploaded) {
            this.queue.shift()
          }
        }

        // We're finished
        if (!this.queue.length) {
          this.ticking = false

          var completes = this.completes.slice(0)

          this.completes.length = 0

          for (var _i = 0, _len = completes.length; _i < _len; _i++) {
            completes[_i]()
          }
        } else {
          // if we are not finished, on the next rAF do this again
          SharedTicker.addOnce(this.tick, this, core.UPDATE_PRIORITY.UTILITY)
        }
      }

      /**
       * Adds hooks for finding items.
       *
       * @param {Function} addHook - Function call that takes two parameters: `item:*, queue:Array`
       *          function must return `true` if it was able to add item to the queue.
       * @return {PIXI.BasePrepare} Instance of plugin for chaining.
       */


      BasePrepare.prototype.registerFindHook = function registerFindHook(addHook) {
        if (addHook) {
          this.addHooks.push(addHook)
        }

        return this
      }

      /**
       * Adds hooks for uploading items.
       *
       * @param {Function} uploadHook - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
       *          function must return `true` if it was able to handle upload of item.
       * @return {PIXI.BasePrepare} Instance of plugin for chaining.
       */


      BasePrepare.prototype.registerUploadHook = function registerUploadHook(uploadHook) {
        if (uploadHook) {
          this.uploadHooks.push(uploadHook)
        }

        return this
      }

      /**
       * Manually add an item to the uploading queue.
       *
       * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text|*} item - Object to
       *        add to the queue
       * @return {PIXI.CanvasPrepare} Instance of plugin for chaining.
       */


      BasePrepare.prototype.add = function add(item) {
        // Add additional hooks for finding elements on special
        // types of objects that
        for (var i = 0, len = this.addHooks.length; i < len; i++) {
          if (this.addHooks[i](item, this.queue)) {
            break
          }
        }

        // Get childen recursively
        if (item instanceof core.Container) {
          for (var _i2 = item.children.length - 1; _i2 >= 0; _i2--) {
            this.add(item.children[_i2])
          }
        }

        return this
      }

      /**
       * Destroys the plugin, don't use after this.
       *
       */


      BasePrepare.prototype.destroy = function destroy() {
        if (this.ticking) {
          SharedTicker.remove(this.tick, this)
        }
        this.ticking = false
        this.addHooks = null
        this.uploadHooks = null
        this.renderer = null
        this.completes = null
        this.queue = null
        this.limiter = null
        this.uploadHookHelper = null
      }

      return BasePrepare
    }()

    /**
     * Built-in hook to find multiple textures from objects like AnimatedSprites.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Texture object was found.
     */


    exports.default = BasePrepare

    function findMultipleBaseTextures(item, queue) {
      var result = false

      // Objects with mutliple textures
      if (item && item._textures && item._textures.length) {
        for (var i = 0; i < item._textures.length; i++) {
          if (item._textures[i] instanceof core.Texture) {
            var baseTexture = item._textures[i].baseTexture

            if (queue.indexOf(baseTexture) === -1) {
              queue.push(baseTexture)
              result = true
            }
          }
        }
      }

      return result
    }

    /**
     * Built-in hook to find BaseTextures from Sprites.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Texture object was found.
     */
    function findBaseTexture(item, queue) {
      // Objects with textures, like Sprites/Text
      if (item instanceof core.BaseTexture) {
        if (queue.indexOf(item) === -1) {
          queue.push(item)
        }

        return true
      }

      return false
    }

    /**
     * Built-in hook to find textures from objects.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Texture object was found.
     */
    function findTexture(item, queue) {
      if (item._texture && item._texture instanceof core.Texture) {
        var texture = item._texture.baseTexture

        if (queue.indexOf(texture) === -1) {
          queue.push(texture)
        }

        return true
      }

      return false
    }

    /**
     * Built-in hook to draw PIXI.Text to its texture.
     *
     * @private
     * @param {PIXI.WebGLRenderer|PIXI.CanvasPrepare} helper - Not used by this upload handler
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function drawText(helper, item) {
      if (item instanceof core.Text) {
        // updating text will return early if it is not dirty
        item.updateText(true)

        return true
      }

      return false
    }

    /**
     * Built-in hook to calculate a text style for a PIXI.Text object.
     *
     * @private
     * @param {PIXI.WebGLRenderer|PIXI.CanvasPrepare} helper - Not used by this upload handler
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function calculateTextStyle(helper, item) {
      if (item instanceof core.TextStyle) {
        var font = item.toFontString()

        core.TextMetrics.measureFont(font)

        return true
      }

      return false
    }

    /**
     * Built-in hook to find Text objects.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Text object was found.
     */
    function findText(item, queue) {
      if (item instanceof core.Text) {
        // push the text style to prepare it - this can be really expensive
        if (queue.indexOf(item.style) === -1) {
          queue.push(item.style)
        }
        // also push the text object so that we can render it (to canvas/texture) if needed
        if (queue.indexOf(item) === -1) {
          queue.push(item)
        }
        // also push the Text's texture for upload to GPU
        var texture = item._texture.baseTexture

        if (queue.indexOf(texture) === -1) {
          queue.push(texture)
        }

        return true
      }

      return false
    }

    /**
     * Built-in hook to find TextStyle objects.
     *
     * @private
     * @param {PIXI.TextStyle} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.TextStyle object was found.
     */
    function findTextStyle(item, queue) {
      if (item instanceof core.TextStyle) {
        if (queue.indexOf(item) === -1) {
          queue.push(item)
        }

        return true
      }

      return false
    }

  }, {
    "../core": 65,
    "./limiters/CountLimiter": 186
  }],
  184: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _BasePrepare2 = $require('../BasePrepare')

    var _BasePrepare3 = interop_require_default_(_BasePrepare2)

    
        
        
    var CANVAS_START_SIZE = 16

    /**
     * The prepare manager provides functionality to upload content to the GPU
     * This cannot be done directly for Canvas like in WebGL, but the effect can be achieved by drawing
     * textures to an offline canvas.
     * This draw call will force the texture to be moved onto the GPU.
     *
     * An instance of this class is automatically created by default, and can be found at renderer.plugins.prepare
     *
     * @class
     * @extends PIXI.prepare.BasePrepare
     * @memberof PIXI.prepare
     */

    var CanvasPrepare = function (_BasePrepare) {
      inherits_(CanvasPrepare, _BasePrepare)

      /**
       * @param {PIXI.CanvasRenderer} renderer - A reference to the current renderer
       */
      function CanvasPrepare(renderer) {
        class_call_check_(this, CanvasPrepare)

        var _this = get_constructor_(this, _BasePrepare.call(this, renderer))

        _this.uploadHookHelper = _this

        /**
         * An offline canvas to render textures to
         * @type {HTMLCanvasElement}
         * @private
         */
        _this.canvas = document.createElement('canvas')
        _this.canvas.width = CANVAS_START_SIZE
        _this.canvas.height = CANVAS_START_SIZE

        /**
         * The context to the canvas
         * @type {CanvasRenderingContext2D}
         * @private
         */
        _this.ctx = _this.canvas.getContext('2d')

        // Add textures to upload
        _this.registerUploadHook(uploadBaseTextures)
        return _this
      }

      /**
       * Destroys the plugin, don't use after this.
       *
       */


      CanvasPrepare.prototype.destroy = function destroy() {
        _BasePrepare.prototype.destroy.call(this)
        this.ctx = null
        this.canvas = null
      }

      return CanvasPrepare
    }(_BasePrepare3.default)

    /**
     * Built-in hook to upload PIXI.Texture objects to the GPU.
     *
     * @private
     * @param {*} prepare - Instance of CanvasPrepare
     * @param {*} item - Item to check
     * @return {boolean} If item was uploaded.
     */


    exports.default = CanvasPrepare

    function uploadBaseTextures(prepare, item) {
      if (item instanceof core.BaseTexture) {
        var image = item.source

        // Sometimes images (like atlas images) report a size of zero, causing errors on windows phone.
        // So if the width or height is equal to zero then use the canvas size
        // Otherwise use whatever is smaller, the image dimensions or the canvas dimensions.
        var imageWidth = image.width === 0 ? prepare.canvas.width : Math.min(prepare.canvas.width, image.width)
        var imageHeight = image.height === 0 ? prepare.canvas.height : Math.min(prepare.canvas.height, image.height)

        // Only a small subsections is required to be drawn to have the whole texture uploaded to the GPU
        // A smaller draw can be faster.
        prepare.ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, prepare.canvas.width, prepare.canvas.height)

        return true
      }

      return false
    }

    core.CanvasRenderer.registerPlugin('prepare', CanvasPrepare)

  }, {
    "../../core": 65,
    "../BasePrepare": 183
  }],
  185: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _WebGLPrepare = $require('./webgl/WebGLPrepare')

    Object.defineProperty(exports, 'webgl', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_WebGLPrepare).default
      }
    })

    var _CanvasPrepare = $require('./canvas/CanvasPrepare')

    Object.defineProperty(exports, 'canvas', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CanvasPrepare).default
      }
    })

    var _BasePrepare = $require('./BasePrepare')

    Object.defineProperty(exports, 'BasePrepare', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_BasePrepare).default
      }
    })

    var _CountLimiter = $require('./limiters/CountLimiter')

    Object.defineProperty(exports, 'CountLimiter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_CountLimiter).default
      }
    })

    var _TimeLimiter = $require('./limiters/TimeLimiter')

    Object.defineProperty(exports, 'TimeLimiter', {
      enumerable: true,
      get: function get() {
        return interop_require_default_(_TimeLimiter).default
      }
    })

    
  }, {
    "./BasePrepare": 183,
    "./canvas/CanvasPrepare": 184,
    "./limiters/CountLimiter": 186,
    "./limiters/TimeLimiter": 187,
    "./webgl/WebGLPrepare": 188
  }],
  186: [function ($require, container, exports) {
    container.exports = CountLimiter
  }, {}],
  187: [function ($require, container, exports) {
    container.exports = TimeLimiter
  }, {}],
  188: [function ($require, container, exports) {
    'use strict'

    exports.__esModule = true

    var _core = $require('../../core')

    var core = interop_require_wildcard_(_core)

    var _BasePrepare2 = $require('../BasePrepare')

    var _BasePrepare3 = interop_require_default_(_BasePrepare2)

    
        
        
    /**
     * The prepare manager provides functionality to upload content to the GPU.
     *
     * An instance of this class is automatically created by default, and can be found at renderer.plugins.prepare
     *
     * @class
     * @extends PIXI.prepare.BasePrepare
     * @memberof PIXI.prepare
     */
    var WebGLPrepare = function (_BasePrepare) {
      inherits_(WebGLPrepare, _BasePrepare)

      /**
       * @param {PIXI.WebGLRenderer} renderer - A reference to the current renderer
       */
      function WebGLPrepare(renderer) {
        class_call_check_(this, WebGLPrepare)

        var _this = get_constructor_(this, _BasePrepare.call(this, renderer))

        _this.uploadHookHelper = _this.renderer

        // Add textures and graphics to upload
        _this.registerFindHook(findGraphics)
        _this.registerUploadHook(uploadBaseTextures)
        _this.registerUploadHook(uploadGraphics)
        return _this
      }

      return WebGLPrepare
    }(_BasePrepare3.default)
    /**
     * Built-in hook to upload PIXI.Texture objects to the GPU.
     *
     * @private
     * @param {PIXI.WebGLRenderer} renderer - instance of the webgl renderer
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */


    exports.default = WebGLPrepare

    function uploadBaseTextures(renderer, item) {
      if (item instanceof core.BaseTexture) {
        // if the texture already has a GL texture, then the texture has been prepared or rendered
        // before now. If the texture changed, then the changer should be calling texture.update() which
        // reuploads the texture without need for preparing it again
        if (!item._glTextures[renderer.CONTEXT_UID]) {
          renderer.textureManager.updateTexture(item)
        }

        return true
      }

      return false
    }

    /**
     * Built-in hook to upload PIXI.Graphics to the GPU.
     *
     * @private
     * @param {PIXI.WebGLRenderer} renderer - instance of the webgl renderer
     * @param {PIXI.DisplayObject} item - Item to check
     * @return {boolean} If item was uploaded.
     */
    function uploadGraphics(renderer, item) {
      if (item instanceof core.Graphics) {
        // if the item is not dirty and already has webgl data, then it got prepared or rendered
        // before now and we shouldn't waste time updating it again
        if (item.dirty || item.clearDirty || !item._webGL[renderer.plugins.graphics.CONTEXT_UID]) {
          renderer.plugins.graphics.updateGraphics(item)
        }

        return true
      }

      return false
    }

    /**
     * Built-in hook to find graphics.
     *
     * @private
     * @param {PIXI.DisplayObject} item - Display object to check
     * @param {Array<*>} queue - Collection of items to upload
     * @return {boolean} if a PIXI.Graphics object was found.
     */
    function findGraphics(item, queue) {
      if (item instanceof core.Graphics) {
        queue.push(item)

        return true
      }

      return false
    }

    core.WebGLRenderer.registerPlugin('prepare', WebGLPrepare)

  }, {
    "../../core": 65,
    "../BasePrepare": 183
  }],
  189: [function ($require, container, exports) {
    void (function (global) {
      'use strict'

      exports.__esModule = true
      exports.loader = exports.prepare = exports.particles = exports.mesh = exports.loaders = exports.interaction = exports.filters = exports.extras = exports.extract = exports.accessibility = undefined

      var _polyfill = $require('./polyfill')

      Object.keys(_polyfill).forEach(function (key) {
        if (key === "default" || key === "__esModule") return
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function get() {
            return _polyfill[key]
          }
        })
      })

      var _core = $require('./core')

      Object.keys(_core).forEach(function (key) {
        if (key === "default" || key === "__esModule") return
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: function get() {
            return _core[key]
          }
        })
      })

      var _deprecation = $require('./deprecation')

      var _deprecation2 = interop_require_default_(_deprecation)

      var _accessibility = $require('./accessibility')

      var accessibility = interop_require_wildcard_(_accessibility)

      var _extract = $require('./extract')

      var extract = interop_require_wildcard_(_extract)

      var _extras = $require('./extras')

      var extras = interop_require_wildcard_(_extras)

      var _filters = $require('./filters')

      var filters = interop_require_wildcard_(_filters)

      var _interaction = $require('./interaction')

      var interaction = interop_require_wildcard_(_interaction)

      var _loaders = $require('./loaders')

      var loaders = interop_require_wildcard_(_loaders)

      var _mesh = $require('./mesh')

      var mesh = interop_require_wildcard_(_mesh)

      var _particles = $require('./particles')

      var particles = interop_require_wildcard_(_particles)

      var _prepare = $require('./prepare')

      var prepare = interop_require_wildcard_(_prepare)

            
      // export core
      _core.utils.mixins.performMixins()

      /**
       * Alias for {@link PIXI.loaders.shared}.
       * @name loader
       * @memberof PIXI
       * @type {PIXI.loader.Loader}
       */

      // handle mixins now, after all code has been added, including deprecation

      // export libs
      // import polyfills. Done as an export to make sure polyfills are imported first
      var loader = loaders.shared || null

      exports.accessibility = accessibility
      exports.extract = extract
      exports.extras = extras
      exports.filters = filters
      exports.interaction = interaction
      exports.loaders = loaders
      exports.mesh = mesh
      exports.particles = particles
      exports.prepare = prepare
      exports.loader = loader

      // Apply the deprecations

      if (typeof _deprecation2.default === 'function') {
        (0, _deprecation2.default)(exports)
      }

      // Always export PixiJS globally.
      global.PIXI = exports; // eslint-disable-line

    }).call(
      this,
      typeof global !== "undefined" ? global :
        typeof self !== "undefined" ? self :
          typeof window !== "undefined" ? window :
            {}
    )

  }, {
    "./accessibility": 42,
    "./core": 65,
    "./deprecation": 131,
    "./extract": 133,
    "./extras": 141,
    "./filters": 153,
    "./interaction": 159,
    "./loaders": 162,
    "./mesh": 171,
    "./particles": 174,
    "./polyfill": 181,
    "./prepare": 185
  }]
}

const super_incude = custom_require(modules_desc, {}, [189])
export default super_incude(189)
