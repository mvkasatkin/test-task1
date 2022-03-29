/**
 * @param width {number}
 * @param height {number}
 * @return {HTMLCanvasElement}
 */
export function createCanvasElement(width, height, scale = true) {
  const canvas = document.createElement('canvas')
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')

  if (scale && window.devicePixelRatio > 1) { // адаптация для дисплеев высокой плотности, таких как Retina
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  return canvas
}

/**
 * @param cx {number}
 * @param cy {number}
 * @param r1 {number}
 * @param r2 {number}
 * @param spikes {number}
 * @return {[number, number][]}
 */
export function getStarPoints(cx, cy, r1, r2, spikes = 5) {
  const result = []

  let x = cx
  let y = cy
  let rotate = Math.PI / 2 * 3
  const step = Math.PI / spikes

  result.push([cx, cy - r2])
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rotate) * r2
    y = cy + Math.sin(rotate) * r2
    result.push([x, y])
    rotate += step

    x = cx + Math.cos(rotate) * r1
    y = cy + Math.sin(rotate) * r1
    result.push([x, y])
    rotate += step
  }
  result.push([cx, cy - r2])

  return result
}

/**
 * @param r {number}
 * @param g {number}
 * @param b {number}
 * @return {string}
 */
export function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw new Error('Invalid color')
  return ((r << 16) | (g << 8) | b).toString(16)
}
