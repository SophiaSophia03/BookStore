import React from 'react'
import Hero from './Hero'
import RecentBooks from './RecentBooks'
import Sale from './Sale'
import About from './About'

function Home() {
  return (
    <div>
      <Hero />
      <RecentBooks />
      <About />
      <Sale />
    </div>
  )
}

export default Home