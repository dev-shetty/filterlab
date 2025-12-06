import React, { useState, useEffect, useRef } from "react"
import { ZoomIn, ZoomOut } from "lucide-react"

const RGBMixer = () => {
  const [r, setR] = useState(100)
  const [g, setG] = useState(150)
  const [b, setB] = useState(200)

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold mb-4">How Colors Work</h2>
        <p className="text-muted text-lg">
          Every color on your screen is a mix of Red, Green, and Blue light. By
          adjusting the intensity of each (0-255), we can create over 16 million
          colors.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="font-mono text-red-400">Red</label>
              <span className="font-mono">{r}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={r}
              onChange={(e) => setR(parseInt(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-red-500 bg-gradient-to-r from-black to-red-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="font-mono text-green-400">Green</label>
              <span className="font-mono">{g}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={g}
              onChange={(e) => setG(parseInt(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-green-500 bg-gradient-to-r from-black to-green-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="font-mono text-blue-400">Blue</label>
              <span className="font-mono">{b}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-blue-500 bg-gradient-to-r from-black to-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className="w-64 h-64 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-100 border-4 border-white/10"
          style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
        />
        <div className="font-mono text-xl bg-black/30 px-4 py-2 rounded-lg">
          rgb({r}, {g}, {b})
        </div>
        <div className="font-mono text-muted">
          #{r.toString(16).padStart(2, "0")}
          {g.toString(16).padStart(2, "0")}
          {b.toString(16).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}

const PixelZoom = () => {
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef(new Image())

  useEffect(() => {
    const img = imgRef.current
    img.src =
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      setImageLoaded(true)
      draw()
    }
  }, [])

  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (imageLoaded) draw()
  }, [zoom, pan, imageLoaded])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const dx = e.clientX - lastMousePos.current.x
    const dy = e.clientY - lastMousePos.current.y

    lastMousePos.current = { x: e.clientX, y: e.clientY }

    setPan((prev) => ({
      x: prev.x - dx / zoom, // Invert direction for natural feel
      y: prev.y - dy / zoom,
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const img = imgRef.current

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Disable image smoothing for pixelated look when zoomed
    ctx.imageSmoothingEnabled = zoom < 10

    // Calculate center crop with pan offset
    const centerX = img.width / 2 + pan.x
    const centerY = img.height / 2 + pan.y

    const viewWidth = img.width / zoom
    const viewHeight = img.height / zoom

    const sx = centerX - viewWidth / 2
    const sy = centerY - viewHeight / 2

    ctx.drawImage(
      img,
      sx,
      sy,
      viewWidth,
      viewHeight,
      0,
      0,
      canvas.width,
      canvas.height
    )
  }

  return (
    <div className="bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-2">The Pixel</h2>
          <p className="text-muted max-w-md">
            An image is just a grid of pixels. Zoom in to see the individual
            squares that make up the picture.
          </p>
        </div>
        <div className="flex items-center space-x-4 bg-black/20 p-2 rounded-xl">
          <button
            onClick={() => setZoom(Math.max(1, zoom / 1.5))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ZoomOut size={20} />
          </button>
          <span className="font-mono w-16 text-center">
            {Math.round(zoom)}x
          </span>
          <button
            onClick={() => setZoom(Math.min(100, zoom * 1.5))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>

      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-white/10 bg-black">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className={`w-full h-full object-contain ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            Loading demo image...
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted">
        {zoom > 20
          ? "Now you can see individual pixels!"
          : "Keep zooming in..."}
      </p>
    </div>
  )
}

const Basics = () => {
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Back to Basics
        </h1>
        <p className="text-xl text-muted">
          Before we understand filters, we must understand the image itself.
        </p>
      </div>

      <RGBMixer />
      <PixelZoom />
    </div>
  )
}

export default Basics
