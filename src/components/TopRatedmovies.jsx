import React from 'react'
import { useContext , useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import { motion } from 'framer-motion';
import { WatchListContext } from '../Context/WatchList';
import toast from './../../node_modules/react-hot-toast/src/index';
import { Helmet } from "react-helmet";

export default function TopRatedmovies() {

    const [ Ratedmovies , SetRatedMovies ]=useState([]);
    let {AddToWatchList} = useContext(WatchListContext);

    async function TopRatedMovies() {
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZhMmQyNWJiZTY4ZDhmMDkyMWMxMzM5ZjY0NjJhMyIsIm5iZiI6MTc0NzIzMTQxNy4xMTgsInN1YiI6IjY4MjRhMmI5YTlkMzRmNzcwMjdlODY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-g3W6MEpmR4lia2VFoV_CNYXfAODK2ohAEyA9PIk1kY'
    }
    };

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(res => { 
            console.log("Top Rated Movies");
            console.log(res.results);
            SetRatedMovies(res.results);

        }  )
        .catch(err => console.error(err));
        
    }

        useEffect(()=>{
            TopRatedMovies()
        },[]);

  async function AddingToList(id) {

    let res = await AddToWatchList(id)
    console.log(res);
    if(res.success === true){
      toast.success("Movie is added")
    }else{
      toast.error("movie not added")
    }
  }
  return (

    <>
      <Helmet>
        <title>Top Rated</title>
      </Helmet>
    
    <motion.h1
    initial={{ y: '-100%' }}     
    animate={{ y: 0 }}           
    transition={{ duration: 1.5, ease: 'easeOut' }} 
    className='py-6 text-3xl font-semibold font-aladin text-center' > <i className="fa-solid text-yellow-600 fa-ranking-star"></i> Top rated movies 
    </motion.h1>
    
    <div className="grid grid-cols-12 gap-4">
      {/* Card */}
      {/* https://image.tmdb.org/t/p/w500/  => Base URL */}
        {!Ratedmovies || Ratedmovies.length === 0 ? <Loader/> 
        : 
        (

        <>
        {Ratedmovies.map((movie)=>{
          return (
              <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }} // triggers when 40% of card is visible
              
              key={movie.id} className="col-span-6 md:col-span-4 lg:col-span-2 overflow-hidden cursor-pointer group text-white rounded-2xl hover:drop-shadow-2xl transition-all duration-100 relative">  
              
                <Link to={`/Moviedetails/${movie.id}`}>
                      {/* Image */}
                      <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="Posterimg"
                      className="w-full h-full object-cover hover:scale-110 transition-all duration-200 ease-in-out"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10"/>
                 </Link>
  
                  {/*  Text content (on top of gradient) */}
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
                  className="flex bg-red-600 text-white justify-center items-center rounded-full absolute md:bottom-4 bottom-3 right-1 md:right-5 w-8 h-8 hover:bg-white hover:text-red-600  ">
                      <button>
                          <i
                          onClick={()=>{
                            AddingToList(movie.id)
                          }} 
                          className ="fa-solid fa-heart text-xl"></i>
                      </button>                  </motion.div>
                  </div>
              </motion.div>
          )
        })}  
        </>




        )
    
    
    
    }
      
    </div>
    </>

)
}
