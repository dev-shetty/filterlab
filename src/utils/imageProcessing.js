const applyGrayscale = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // Average method: (r + g + b) / 3
    // Luminosity method: 0.21 R + 0.72 G + 0.07 B
    const avg = (r + g + b) / 3
    data[i] = avg
    data[i + 1] = avg
    data[i + 2] = avg
  }
}

const applySepia = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
  }
}

const applyInvert = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]
    data[i + 1] = 255 - data[i + 1]
    data[i + 2] = 255 - data[i + 2]
  }
}

const applyThreshold = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const avg = (r + g + b) / 3
    const val = avg > 128 ? 255 : 0
    data[i] = val
    data[i + 1] = val
    data[i + 2] = val
  }
}

const applyRedTint = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] + 40)
  }
}

const applyBlueTint = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i + 2] = Math.min(255, data[i + 2] + 40)
  }
}

const applyClarendon = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]

    // Increase contrast and saturation, add blue tint to shadows
    // Simple approximation
    r = (r - 128) * 1.2 + 128
    g = (g - 128) * 1.2 + 128
    b = (b - 128) * 1.2 + 128

    // Blue tint in shadows
    if (r < 100) b = Math.min(255, b + 20)

    data[i] = Math.min(255, Math.max(0, r))
    data[i + 1] = Math.min(255, Math.max(0, g))
    data[i + 2] = Math.min(255, Math.max(0, b))
  }
}

const applyJuno = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]

    // High contrast, warm tint (red/yellow), increased saturation
    r = (r - 128) * 1.15 + 128
    g = (g - 128) * 1.15 + 128
    b = (b - 128) * 1.15 + 128

    // Warm tint
    r = Math.min(255, r + 10)
    g = Math.min(255, g + 5)

    data[i] = Math.min(255, Math.max(0, r))
    data[i + 1] = Math.min(255, Math.max(0, g))
    data[i + 2] = Math.min(255, Math.max(0, b))
  }
}

const applyLudwig = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]

    // Slight desaturation, high contrast, warm highlights
    // Desaturate slightly
    const gray = 0.2989 * r + 0.587 * g + 0.114 * b
    r = gray * 0.1 + r * 0.9
    g = gray * 0.1 + g * 0.9
    b = gray * 0.1 + b * 0.9

    // High contrast
    r = (r - 128) * 1.1 + 128
    g = (g - 128) * 1.1 + 128
    b = (b - 128) * 1.1 + 128

    // Warm highlights
    if (r > 150) r = Math.min(255, r + 10)

    data[i] = Math.min(255, Math.max(0, r))
    data[i + 1] = Math.min(255, Math.max(0, g))
    data[i + 2] = Math.min(255, Math.max(0, b))
  }
}

const filters = {
  grayscale: applyGrayscale,
  sepia: applySepia,
  invert: applyInvert,
  threshold: applyThreshold,
  "red-tint": applyRedTint,
  "blue-tint": applyBlueTint,
  clarendon: applyClarendon,
  juno: applyJuno,
  ludwig: applyLudwig,
}

export const applyFilter = (imageData, filterType) => {
  const data = imageData.data
  const filter = filters[filterType]
  if (filter) {
    filter(data)
  }
  return imageData
}

export const applyAdjustments = (imageData, adjustments) => {
  const data = imageData.data
  const { brightness, contrast, saturation } = adjustments

  // Pre-calculate contrast factor
  const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast))

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]

    // Apply Brightness
    r += brightness
    g += brightness
    b += brightness

    // Apply Contrast
    r = contrastFactor * (r - 128) + 128
    g = contrastFactor * (g - 128) + 128
    b = contrastFactor * (b - 128) + 128

    // Apply Saturation
    if (saturation !== 0) {
      const gray = 0.2989 * r + 0.587 * g + 0.114 * b
      r = -gray * saturation + r * (1 + saturation)
      g = -gray * saturation + g * (1 + saturation)
      b = -gray * saturation + b * (1 + saturation)
    }

    // Clamp values
    data[i] = Math.min(255, Math.max(0, r))
    data[i + 1] = Math.min(255, Math.max(0, g))
    data[i + 2] = Math.min(255, Math.max(0, b))
  }
  return imageData
}

export const getFilterCode = (filterType) => {
  switch (filterType) {
    case "grayscale":
      return `// Grayscale Filter
// We convert RGB to a single gray value based on luminosity
const gray = 0.21 * r + 0.72 * g + 0.07 * b;
pixel.r = gray;
pixel.g = gray;
pixel.b = gray;`
    case "sepia":
      return `// Sepia Filter
// We mix RGB values with specific weights to create a warm, brownish tone
pixel.r = (r * 0.393) + (g * 0.769) + (b * 0.189);
pixel.g = (r * 0.349) + (g * 0.686) + (b * 0.168);
pixel.b = (r * 0.272) + (g * 0.534) + (b * 0.131);`
    case "invert":
      return `// Invert Filter
// We subtract each color value from the maximum (255)
pixel.r = 255 - r;
pixel.g = 255 - g;
pixel.b = 255 - b;`
    case "threshold":
      return `// Threshold (Black & White)
// If the average brightness is above 128, make it white, else black
const avg = (r + g + b) / 3;
const val = avg > 128 ? 255 : 0;
pixel.r = val;
pixel.g = val;
pixel.b = val;`
    case "red-tint":
      return `// Red Tint
// Simply increase the Red channel
pixel.r = Math.min(255, r + 40);
// Green and Blue remain unchanged`
    case "blue-tint":
      return `// Blue Tint
// Simply increase the Blue channel
pixel.b = Math.min(255, b + 40);
// Red and Green remain unchanged`
    case "clarendon":
      return `// Clarendon Filter
// 1. Increase Contrast (make darks darker, lights lighter)
pixel.r = (r - 128) * 1.2 + 128;
pixel.g = (g - 128) * 1.2 + 128;
pixel.b = (b - 128) * 1.2 + 128;

// 2. Add Blue Tint to Shadows
if (pixel.r < 100) {
  pixel.b = Math.min(255, pixel.b + 20);
}`
    case "juno":
      return `// Juno Filter
// 1. High Contrast
pixel.r = (r - 128) * 1.15 + 128;
pixel.g = (g - 128) * 1.15 + 128;
pixel.b = (b - 128) * 1.15 + 128;

// 2. Warm Tint (Boost Red and Green)
pixel.r += 10;
pixel.g += 5;`
    case "ludwig":
      return `// Ludwig Filter
// 1. Slight Desaturation
const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
pixel.r = gray * 0.1 + r * 0.9;
pixel.g = gray * 0.1 + g * 0.9;
pixel.b = gray * 0.1 + b * 0.9;

// 2. Boost Contrast
pixel.r = (r - 128) * 1.1 + 128;
// ... (same for g and b)

// 3. Warm Highlights
if (pixel.r > 150) pixel.r += 10;`
    default:
      return `// Select a filter to see how it works!`
  }
}
