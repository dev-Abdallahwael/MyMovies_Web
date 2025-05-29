import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { WatchListContext } from '../Context/WatchList';
import toast from './../../node_modules/react-hot-toast/src/index';
import Nomovies from '../components/Nomovies';
import { Helmet } from 'react-helmet';
export default function List() {

    let {GetMovies , Delete } = useContext(WatchListContext);
    let [Watchlist ,SetWatchList] = useState([]);

      async function Movieslist() {
        let res = await GetMovies();
        console.log(res.results);
        SetWatchList(res.results);
      }

      useEffect(()=>{
        Movieslist();
      },[])



        async function handleDelete(movieID) {
        const res = await Delete(movieID);
        if (res.success === true) {
            toast.success("Movie removed");
            Movieslist(); // <--- just re-fetch the list
        } else {
            toast.error("Failed to remove movie. Try again.");
        }
        }

      
  return ( 
    <>
      <Helmet>
        <title>WatchList</title>
      </Helmet>
       <motion.h1 
        initial={{ y: '-100%' }}     
        animate={{ y: 0 }}           
        transition={{ duration: 1.5, ease: 'easeOut' }} 
        className='py-8 text-3xl font-semibold  font-aladin text-center' > <i className="fas fa-list"></i> Watch List </motion.h1>
         <div className=" mb-72 grid grid-cols-12 gap-4">

           { !Watchlist || Watchlist.length === 0 ? (  <Nomovies/>  )
           :  
           (
             <>
             {Watchlist.map((movie) => (
             <motion.div
                 key={movie.id}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1.5, ease: 'easeOut' }}
                 viewport={{ once: true, amount: 0.4 }}
                 className="  col-span-6 md:col-span-4 lg:col-span-2 overflow-hidden cursor-pointer group text-white rounded-2xl hover:drop-shadow-2xl transition-all duration-100 relative"
             >
               <Link to={`/Moviedetails/${movie.id}`}>              
                 <img
                 src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                 alt={movie.title}
                 className="w-full h-full object-cover hover:scale-110 transition-all duration-200 ease-in-out"
                 />
     
                 <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10" />
                </Link>
          
                 <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
                 <h2 className="capitalize md:text-xl text-lg font-semibold line-clamp-3">
                     {movie.title}
                 </h2>
                 <h3 className="capitalize text-sm font-semibold">
                     {new Date(movie.release_date).toDateString()}
                 </h3>
                 <motion.div
                     whileHover={{ scale: 1.4 }}
                     whileTap={{ scale: 0.4 }}
                     className="flex bg-red-600 text-white justify-center items-center rounded-full absolute md:bottom-4 bottom-3 right-1 md:right-5 w-8 h-8 hover:bg-white hover:text-red-600"
                 >
                    <button
                      onClick={()=>{
                          handleDelete(movie.id);
                      }}
                    >
                        <i  className="fa-solid fa-trash text-xl"></i>
                    </button>
                 </motion.div>
                 </div>
             </motion.div>
             ))}
             
             </>             
           )
        }
         </div>

    </>
  )
}
