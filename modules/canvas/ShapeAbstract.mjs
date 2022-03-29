import { createCanvasElement } from '../../utils/canvas.js'

/**
 * @abstract
 */
export class ShapeAbstract {
  _x
  _y
  _width
  _height
  _canvas
  _shadow
  _ctx
  _shadowCtx
  _listeners = []

  /**
   * @param x {number}
   * @param y {number}
   * @param width {number}
   * @param height {number}
   */
  constructor (x, y, width, height) {
    if (new.target === ShapeAbstract) {
      throw new TypeError("Cannot construct abstract instances directly")
    }

    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._shadow = createCanvasElement(this._width, this._height, false)
    this._shadowCtx = this._shadow.getContext('2d')
  }

  /**
   * @param canvas {Canvas}
   */
  setCanvas(canvas) {
    this._canvas = canvas
    this._ctx = this._canvas.getCtx()
    this._canvas.onClick((x, y) => this._handleCanvasClick(x, y))
  }

  /**
   * @abstract
   */
  render() {
    throw new Error("Abstract method is not implemented")
  }

  /**
   * @param f {Function} () => void
   * @return {Function} unsubscribe
   */
  onClick(f) {
    this._listeners.push(f)
    return () => this._listeners = this._listeners.filter(i => i !== f)
  }

  /**
   * @param x {number}
   * @param y {number}
   * @protected
   */
  _handleCanvasClick(x, y) {
    const shadowX = x - this._x
    const shadowY = y - this._y
    const data = this._shadowCtx.getImageData(shadowX, shadowY, 1, 1).data
    const match = Array.from(data).reduce((a, i) => a || !!i, false)
    if (match) {
      this._listeners.forEach(f => f())
    }
  }

  /**
   * @protected
   */
  _beginPath() {
    this._ctx.beginPath()
    this._shadowCtx.beginPath()
  }

  /**
   * @param x {number}
   * @param y {number}
   * @protected
   */
  _moveTo(x, y) {
    this._ctx.moveTo(x, y)
    this._shadowCtx.moveTo(x - this._x, y - this._y)
  }

  /**
   * @param x {number}
   * @param y {number}
   * @protected
   */
  _lineTo(x, y) {
    this._ctx.lineTo(x, y)
    this._shadowCtx.lineTo(x - this._x, y - this._y)
  }

  /**
   * @param strokeWidth {number|null}
   * @param strokeColor {string|null}
   * @param fillColor {string|null}
   * @protected
   */
  _closePath(strokeWidth, strokeColor, fillColor) {
    this._ctx.closePath()
    this._shadowCtx.closePath()

    if (strokeWidth) {
      this._ctx.lineWidth = 1
      this._shadowCtx.lineWidth = 1
      if (strokeColor) {
        this._ctx.strokeStyle = strokeColor
        this._shadowCtx.strokeStyle = strokeColor
      }
      this._ctx.stroke()
      this._shadowCtx.stroke()
    }

    if (fillColor) {
      this._ctx.fillStyle = fillColor
      this._ctx.fill()
      this._shadowCtx.fillStyle = fillColor
      this._shadowCtx.fill()
    }
  }
}
