const BACKGROUND_COLOR = '#468EA4'

export default class Canvas {
  canvas: HTMLCanvasElement
  container: HTMLDivElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, container: HTMLDivElement) {
    this.container = container
    this.canvas = canvas
    this.canvas.height = container.clientHeight
    this.canvas.width = container.clientWidth
    this.ctx = this.canvas.getContext('2d')!

    this.clear()
  }

  clear() {
    this.ctx.fillStyle = BACKGROUND_COLOR
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawCircle(center: [x: number, y: number], radius: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.arc(center[0], center[1], radius, 0, Math.PI * 2)
    this.ctx.fill()
  }
}
