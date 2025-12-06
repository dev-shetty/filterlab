import React, { useState, useRef, useEffect } from "react"
import { Upload, Download, RefreshCw, Code } from "lucide-react"
import { applyFilter, getFilterCode } from "../utils/imageProcessing"

const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Load default image
  useEffect(() => {
    const img = new Image()
    img.src =
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      setImageSrc(img.src)
      drawImage(img)
    }
  }, [])

  const drawImage = (img, filter = null) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

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

    if (filter) {
      const imageData = ctx.getImageData(0, 0, width, height)
      const filteredData = applyFilter(imageData, filter)
      ctx.putImageData(filteredData, 0, 0)
    }
  }

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter)
    const img = new Image()
    img.src = imageSrc
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      drawImage(img, filter)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImageSrc(event.target.result)
          setSelectedFilter(null)
          drawImage(img)
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = "filtered-image.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const basicFilters = [
    { id: "grayscale", name: "Grayscale" },
    { id: "sepia", name: "Sepia" },
    { id: "invert", name: "Invert" },
    { id: "threshold", name: "Threshold" },
    { id: "red-tint", name: "Red Tint" },
    { id: "blue-tint", name: "Blue Tint" },
  ]

  const socialFilters = [
    { id: "clarendon", name: "Clarendon" },
    { id: "juno", name: "Juno" },
    { id: "ludwig", name: "Ludwig" },
  ]

  const allFilters = [...basicFilters, ...socialFilters]

  return (
    <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Left: Canvas Area */}
      <div className="lg:col-span-2 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Filter Lab</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-black border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              <Upload size={18} />
              <span>Upload</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={downloadImage}
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors font-medium"
            >
              <Download size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="flex-1 bg-black/40 rounded-3xl border border-white/10 flex items-center justify-center p-4 overflow-hidden relative group">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
          {selectedFilter && (
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">
              {allFilters.find((f) => f.id === selectedFilter)?.name} Applied
            </div>
          )}
        </div>
      </div>

      {/* Right: Controls & Code */}
      <div className="flex flex-col space-y-6 overflow-y-auto pr-2">
        <div className="bg-surface p-6 rounded-3xl border border-white/5 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <RefreshCw size={20} className="text-primary" />
            Presets
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted mb-3 uppercase tracking-wider">
                Social
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                      selectedFilter === filter.id
                        ? "bg-white text-black border-white shadow-lg scale-105"
                        : "bg-surface text-muted border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted mb-3 uppercase tracking-wider">
                Basic
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleFilterClick(null)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                    !selectedFilter
                      ? "bg-white text-black border-white shadow-lg scale-105"
                      : "bg-surface text-muted border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Normal
                </button>
                {basicFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                      selectedFilter === filter.id
                        ? "bg-white text-black border-white shadow-lg scale-105"
                        : "bg-surface text-muted border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-white/5 flex-1 flex flex-col min-h-[300px]">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Code size={20} className="text-secondary" />
            How it works
          </h2>
          <div className="flex-1 bg-black/50 rounded-xl p-4 font-mono text-sm text-green-400 overflow-auto border border-white/5">
            <pre className="whitespace-pre-wrap">
              {getFilterCode(selectedFilter)}
            </pre>
          </div>
          <p className="text-xs text-muted mt-4">
            * This code runs for every single pixel in the image!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Filters
