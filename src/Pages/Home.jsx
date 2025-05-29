import React from 'react'
import Movies from '../components/Movies'
import Popular from '../components/Popular'
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
          <Helmet>
        <title>Upcoming and popular</title>
      </Helmet>
    <motion.h1 
    initial={{ y: '-100%' }}     
    animate={{ y: 0 }}           
    transition={{ duration: 1.5, ease: 'easeOut' }} 
    className='py-4 text-3xl font-semibold  font-aladin text-center' > <i className="fa-solid fa-calendar-days "></i> Upcoming </motion.h1>
      <Movies/>
      
    <h1 className='py-6  text-3xl font-semibold font-aladin text-center' >
      <i className="fa-solid fa-fire text-orange-600"></i> Trending now
    </h1>

    <Popular/>
    </>
  )
}