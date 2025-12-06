import React, { useState, useRef, useEffect } from "react"
import { Sliders, RotateCcw } from "lucide-react"
import { applyAdjustments } from "../utils/imageProcessing"

const Playground = () => {
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [saturation, setSaturation] = useState(0)

  const canvasRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef(new Image())

  useEffect(() => {
    const img = imgRef.current
    img.src =
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1000&auto=format&fit=crop"
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      setImageLoaded(true)
      draw()
    }
  }, [])

  useEffect(() => {
    if (imageLoaded) draw()
  }, [brightness, contrast, saturation, imageLoaded])

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const img = imgRef.current

    // Resize canvas to fit image while maintaining aspect ratio, max height 500
    const aspectRatio = img.width / img.height
    const maxHeight = 500
    const maxWidth = 800

    let width = img.width
    let height = img.height

    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }
    if (width > maxWidth) {
      width = maxWidth
      height = width / aspectRatio
    }

    canvas.width = width
    canvas.height = height

    ctx.drawImage(img, 0, 0, width, height)

    const imageData = ctx.getImageData(0, 0, width, height)
    const adjustedData = applyAdjustments(imageData, {
      brightness,
      contrast,
      saturation,
    })
    ctx.putImageData(adjustedData, 0, 0)
  }

  const reset = () => {
    setBrightness(0)
    setContrast(0)
    setSaturation(0)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Left: Canvas Area */}
      <div className="lg:col-span-2 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Playground</h1>
          <button
            onClick={reset}
            className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-white/10 rounded-lg transition-colors text-sm"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex-1 bg-black/40 rounded-3xl border border-white/10 flex items-center justify-center p-4 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
        </div>
      </div>

      {/* Right: Controls */}
      <div className="bg-surface p-8 rounded-3xl border border-white/5 h-fit space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="text-accent" size={24} />
          <h2 className="text-2xl font-bold">Adjustments</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="font-medium">Brightness</label>
              <span className="font-mono text-muted">{brightness}</span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="font-medium">Contrast</label>
              <span className="font-mono text-muted">{contrast}</span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
              className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="font-medium">Saturation</label>
              <span className="font-mono text-muted">{saturation}</span>
            </div>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={saturation}
              onChange={(e) => setSaturation(parseFloat(e.target.value))}
              className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-muted leading-relaxed">
            These sliders change the math behind every pixel.
            <br />
            <br />
            <strong>Brightness</strong> adds a constant value to R, G, and B.
            <br />
            <strong>Contrast</strong> expands the difference between light and
            dark pixels.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Playground
