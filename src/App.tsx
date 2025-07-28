import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import JobSearch from './pages/JobSearch'
import ProductMarketing from './pages/ProductMarketing'
import PostJob from './pages/PostJob'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-100">
        <Header />
        <ChatWidget />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/product-marketing" element={<ProductMarketing />} />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 