import Canvas from './canvas'
import Wave from './wave'

class App {
  canvas: Canvas
  waves: Wave[]

  constructor(canvasEl: HTMLCanvasElement, container: HTMLDivElement) {
    this.canvas = new Canvas(canvasEl, container)

    const waves: Wave[] = []
    const resolution = 120

    for (let i = 0; i < 80; i++) {
      waves.push(
        new Wave(this.canvas, {
          amplitude: 30 + Math.random() * 10,
          waveNumber: 0.01 - Math.random() * 0.005,
          frequency: 0.5 + Math.random() * 1.5,
          yOffset: 50 + i * 20,
          resolution: resolution,
        }),
      )
    }

    this.waves = waves

    container.addEventListener('mousemove', (e) => {
      const indexRange = container.clientWidth / resolution
      const index = Math.floor((e.offsetX + indexRange / 2) / indexRange)
      if (index < resolution) {
        this.waves.map((wave) => {
          if (wave.checkYCollision(index, e.offsetY, 10)) {
            wave.setSelectedIndex(index)
          } else {
            wave.setSelectedIndex()
          }
        })
      }
    })
  }

  render(t?: number) {
    this.canvas.clear()

    this.waves.map((wave) => {
      wave.draw(t)
    })
  }

  mainLoop(t?: number) {
    this.render(t)
    window.requestAnimationFrame(this.mainLoop.bind(this))
  }
}

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas')
  const container = document.getElementById('app')

  const app = new App(canvas as HTMLCanvasElement, container as HTMLDivElement)
  app.mainLoop()
})
