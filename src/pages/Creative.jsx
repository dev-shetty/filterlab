import React, { useState, useRef, useEffect } from "react"
import { Grid, Download } from "lucide-react"

const Creative = () => {
  const canvasRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef(new Image())

  useEffect(() => {
    const img = imgRef.current
    img.src =
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      setImageLoaded(true)
      draw()
    }
  }, [])

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const img = imgRef.current

    // Resize canvas to fit image while maintaining aspect ratio, max height 600
    const aspectRatio = img.width / img.height
    const maxHeight = 600
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

    // Draw 6 frames
    const frameHeight = height / 6
    const frameSourceHeight = img.height / 6

    for (let i = 0; i < 6; i++) {
      // Draw the slice
      ctx.drawImage(
        img,
        0,
        i * frameSourceHeight,
        img.width,
        frameSourceHeight, // Source
        0,
        i * frameHeight,
        width,
        frameHeight // Destination
      )

      // Apply darkness overlay
      // Opacity increases from 0 to 0.8
      const opacity = (i / 5) * 0.8

      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      ctx.fillRect(0, i * frameHeight, width, frameHeight)

      // Add a white border between frames
      if (i > 0) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, i * frameHeight, width, 2)
      }
    }
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = "creative-frames.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Left: Canvas Area */}
      <div className="lg:col-span-2 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Creative Frames</h1>
          <button
            onClick={downloadImage}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-black border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <Download size={18} />
            <span>Save Art</span>
          </button>
        </div>

        <div className="flex-1 bg-black/40 rounded-3xl border border-white/10 flex items-center justify-center p-4 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
        </div>
      </div>

      {/* Right: Explanation */}
      <div className="bg-surface p-8 rounded-3xl border border-white/5 h-fit space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Grid className="text-secondary" size={24} />
          <h2 className="text-2xl font-bold">The Logic</h2>
        </div>

        <div className="space-y-6 text-muted leading-relaxed">
          <p>This effect splits the image into 6 equal horizontal frames.</p>
          <p>
            For each frame, we apply a black overlay with increasing opacity.
          </p>

          <div className="bg-black/30 p-4 rounded-xl font-mono text-sm text-green-400 border border-white/5">
            <pre className="whitespace-pre-wrap">
              {`// Loop 6 times
for (let i = 0; i < 6; i++) {
  
  // 1. Draw the image slice
  ctx.drawImage(...)

  // 2. Calculate opacity
  // 0% -> 80%
  const opacity = (i / 5) * 0.8;
  
  // 3. Draw black overlay
  ctx.fillStyle = \`rgba(0,0,0,\${opacity})\`;
  ctx.fillRect(...)
}`}
            </pre>
          </div>

          <p>
            This is a simple example of how you can use code to create artistic
            effects that would be tedious to do manually.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Creative
