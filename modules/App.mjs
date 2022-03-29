import { Canvas } from './canvas/Canvas.mjs'
import { ShapeStar } from './canvas/ShapeStar.mjs'

export class App {
  _rootEl
  _canvasMaster
  _canvasSlave

  /**
   * @param rootEl {HTMLDivElement}
   */
  constructor (rootEl) {
    this._rootEl = rootEl
  }

  /**
   */
  start () {
    this._canvasMaster = new Canvas(this._rootEl, 20, 20, 600, 600)
    this._canvasSlave = new Canvas(this._rootEl, 20, 640, 600, 50)
    this._canvasMaster.onClick(() => {
      this._setCanvasSlaveColor(this._canvasMaster.background)
    })

    this._canvasMaster.addShape(this._createStar(120, 210, '#fd0040'))
    this._canvasMaster.addShape(this._createStar(300, 210, '#0065fd'))
    this._canvasMaster.addShape(this._createStar(480, 210, '#00e179'))
    this._canvasMaster.addShape(this._createStar(210, 390, '#fdb500'))
    this._canvasMaster.addShape(this._createStar(390, 390, '#000000'))

    this._canvasMaster.render()
    this._canvasSlave.render()
  }

  /**
   * @param x {number}
   * @param y {number}
   * @param color {string}
   * @return {ShapeStar}
   * @private
   */
  _createStar(x, y, color) {
    const shape = new ShapeStar(x, y, 30, 60, color)
    shape.onClick(() => {
      this._setCanvasSlaveColor(color)
    })
    return shape
  }

  _setCanvasSlaveColor(color) {
    this._canvasSlave.background = color
    this._canvasSlave.render()
  }
}
