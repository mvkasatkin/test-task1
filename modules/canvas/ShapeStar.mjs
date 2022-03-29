import { ShapeAbstract } from './ShapeAbstract.mjs'
import { getStarPoints } from '../../utils/canvas.js'

export class ShapeStar extends ShapeAbstract {
  _cx
  _cy
  _r1
  _r2
  _color

  /**
   * @param cx {number}
   * @param cy {number}
   * @param r1 {number}
   * @param r2 {number}
   * @param color {string}
   */
  constructor (cx, cy, r1, r2, color) {
    super(cx - r2, cy - r2, r2 * 2, r2 * 2) // x, y, width, height
    this._cx = cx
    this._cy = cy
    this._r1 = r1
    this._r2 = r2
    this._color = color
  }

  /**
   */
  render() {
    const starPoints = getStarPoints(this._cx, this._cy, this._r1, this._r2, 5)
    this._beginPath()
    this._moveTo(...starPoints.shift())
    starPoints.forEach(([x, y]) => this._lineTo(x, y))
    this._closePath(1, this._color, this._color)
  }
}
