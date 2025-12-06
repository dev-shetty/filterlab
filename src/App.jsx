import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Basics from "./pages/Basics"
import Filters from "./pages/Filters"
import Playground from "./pages/Playground"
import Creative from "./pages/Creative"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/creative" element={<Creative />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
