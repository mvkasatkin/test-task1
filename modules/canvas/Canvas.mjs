import { createCanvasElement } from '../../utils/canvas.js'

export class Canvas {
  /**
   * @type {string}
   */
  background

  /**
   * @type {ShapeAbstract[]}
   */
  _shapes = []
  _rootEl
  _canvasEl
  _x
  _y
  _width
  _height
  _listeners = []

  /**
   * @param rootEl {HTMLDivElement}
   * @param x {number}
   * @param y {number}
   * @param width {number}
   * @param height {number}
   * @param background {string}
   */
  constructor(rootEl, x, y, width, height, background = '#ffffff') {
    this._rootEl = rootEl
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this.background = background
    this._initCanvasElement()
  }

  /**
   * @return {CanvasRenderingContext2D}
   */
  getCtx() {
    return this._canvasEl.getContext('2d')
  }

  /**
   * @param shape {ShapeAbstract}
   */
  addShape(shape) {
    shape.setCanvas(this)
    this._shapes.push(shape)
  }

  /**
   */
  render() {
    const ctx = this.getCtx()
    ctx.fillStyle = this.background
    ctx.fillRect(0, 0, this._width, this._height)
    this._shapes.forEach(shape => shape.render())
  }

  /**
   * @param f {Function} (x, y) => void
   * @return {Function} unsubscribe
   */
  onClick(f) {
    this._listeners.push(f)
    return () => this._listeners = this._listeners.filter(i => i !== f)
  }

  _initCanvasElement() {
    const canvasEl = createCanvasElement(this._width, this._height)
    canvasEl.addEventListener('click', ({ offsetX, offsetY }) => {
      this._listeners.forEach(f => f(offsetX, offsetY))
    })
    canvasEl.classList.add('canvas')
    canvasEl.style.position = 'absolute'
    canvasEl.style.top = `${this._y}px`
    canvasEl.style.left = `${this._x}px`

    this._canvasEl = canvasEl
    this._rootEl.appendChild(this._canvasEl)
  }
}
