import React from "react"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl -z-10 transform scale-75 opacity-20"></div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.1]">
          Behind the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
            Pixels
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted max-w-2xl leading-relaxed font-light">
          We use Instagram filters every day. But have you ever wondered how
          they actually work?
          <span className="block mt-2 text-white font-medium">
            It's not magic—it's math.
          </span>
        </p>

        <div className="flex gap-4 pt-8">
          <Link
            to="/basics"
            className="group px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
          >
            Start Learning
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Topics Preview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-surface border border-white/10 hover:border-white/30 transition-colors group">
          <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
            1
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">The Basics</h3>
          <p className="text-muted leading-relaxed">
            Understand what a pixel really is and how RGB values create every
            color you see.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-surface border border-white/10 hover:border-white/30 transition-colors group">
          <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
            2
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Filters Logic</h3>
          <p className="text-muted leading-relaxed">
            Dive into the code behind your favorite filters like Sepia,
            Grayscale, and more.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-surface border border-white/10 hover:border-white/30 transition-colors group">
          <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
            3
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Create Art</h3>
          <p className="text-muted leading-relaxed">
            Use your new knowledge to create unique effects and generate your
            own art.
          </p>
        </div>
      </div>

      {/* About Me */}
      <div className="relative rounded-2xl overflow-hidden bg-surface border border-white/10 p-12 md:p-20 text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">About Me</h2>
        <p className="text-xl text-muted max-w-2xl mx-auto font-light">
          Hi, I'm a CS Engineer passionate about demystifying technology. I
          believe in digging deep into the "rabbit hole" of how things work.
          Always be curious!
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
