import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Camera, Layers, Sliders, Grid, Home } from "lucide-react"

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-sm ${
        isActive
          ? "bg-white text-black font-medium"
          : "text-muted hover:text-text hover:bg-white/10"
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-white selection:text-black font-sans">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-white group-hover:bg-white/90 transition-colors">
              <Camera className="text-black" size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight">FilterLab</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/basics" icon={Grid} label="Basics" />
            <NavItem to="/filters" icon={Layers} label="Filters" />
            <NavItem to="/playground" icon={Sliders} label="Playground" />
            <NavItem to="/creative" icon={Grid} label="Creative" />
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-muted text-sm">
        <p>© 2025 FilterLab.</p>
      </footer>
    </div>
  )
}

export default Layout
