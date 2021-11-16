import Canvas from './canvas'

export interface WaveOptions {
  amplitude?: number
  waveNumber?: number
  phase?: number
  frequency?: number
  resolution?: number
  speed?: number

  yOffset?: number
  color?: string
}

export default class Wave {
  offset = 0
  canvas: Canvas

  amplitude: number // vertical size
  waveNumber: number // related to wavelength (rad/m)
  phase: number // where the wave is in the cycle (0 to 2Pi)
  frequency: number // related to period (rad/s)
  resolution: number // number of points
  yOffset: number // an offset to draw the wave somewhere else in the canvas

  speed: number // a time multiplier
  color: string

  pointsY: number[]
  selectedIndex?: number

  constructor(canvas: Canvas, options?: WaveOptions) {
    this.canvas = canvas

    this.amplitude = options?.amplitude ?? 30
    this.waveNumber = options?.waveNumber ?? 0.01
    this.phase = options?.phase ?? 0
    this.frequency = options?.frequency ?? 1
    this.resolution = options?.resolution ?? 20
    this.yOffset = options?.yOffset ?? 100
    this.color = options?.color ?? '#FFFFFF'

    this.speed = 5

    this.pointsY = []
    for (let i = 0; i < this.resolution; i++) {
      this.pointsY.push(0)
    }

    this.selectedIndex = undefined
  }

  setSelectedIndex(index?: number) {
    if (index !== this.selectedIndex) {
      this.selectedIndex = index
    }
  }

  /**
   * y(x,t) = A sin(kx - wt + p)
   * y: vertical position
   * A: amplitude
   * k: wave number
   * x: horizontal position
   * w: angular frequency
   * t: time
   * p: phase
   */
  draw(t: number = 1) {
    const newT = (t / 10000) * this.speed

    this.canvas.ctx.strokeStyle = this.color
    this.canvas.ctx.beginPath()

    for (let i = 0; i <= this.resolution; i++) {
      const x = (i / this.resolution) * this.canvas.container.clientWidth
      const y =
        this.amplitude *
        Math.sin(this.waveNumber * x - this.frequency * newT + this.phase)

      this.pointsY[i] = y + this.yOffset

      // AS LINE
      // this.canvas.ctx.lineWidth = 1
      // this.canvas.ctx.lineTo(x, y + this.yOffset)
      // this.canvas.ctx.stroke()

      // AS CIRCLE
      this.canvas.drawCircle([x, y + this.yOffset], 2, this.color)

      if (i === this.selectedIndex) {
        // this.canvas.drawCircle([x, y + this.yOffset], 2, this.color)
        this.canvas.drawCircle([x, y + this.yOffset], 5, this.color)
      }
    }
  }

  checkYCollision(index: number, y: number, error: number = 0) {
    return y > this.pointsY[index] - error && y < this.pointsY[index] + error
  }
}
