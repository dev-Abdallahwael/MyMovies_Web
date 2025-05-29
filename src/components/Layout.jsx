import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <>    
    <div className=" bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Navbar/>
        <div className=' container md:px-0 px-3 '>
          <Outlet/>
        </div>
        <Footer/>
    </div>
    </>
  )
}
