import React from 'react'
import Hero from './Hero'
import RecentBooks from './RecentBooks'
import Sale from './Sale'
import About from './About'

function Home() {
  return (
    <div className='bg-[#82A3A1] lg:px-24 px-8 py-8 font-medium'>
      <Hero />
      <RecentBooks />
      <About />
      <Sale />
    </div>
  )
}

export default Home