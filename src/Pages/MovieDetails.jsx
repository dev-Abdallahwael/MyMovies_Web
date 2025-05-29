import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function MovieDetails() {

    let {id}= useParams();
    const [MovieDetails , SetMovieDetails] = useState({});

    function GetMoviesDetails(){
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZhMmQyNWJiZTY4ZDhmMDkyMWMxMzM5ZjY0NjJhMyIsIm5iZiI6MTc0NzIzMTQxNy4xMTgsInN1YiI6IjY4MjRhMmI5YTlkMzRmNzcwMjdlODY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-g3W6MEpmR4lia2VFoV_CNYXfAODK2ohAEyA9PIk1kY'
        }
    };
        fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
        .then(res => res.json())
        .then(res =>{
            console.log(res)
            SetMovieDetails(res);
        } )
        .catch(err => console.error(err)); 
    }
    useEffect(() => {
        GetMoviesDetails();
    },[])

  return (
    <>
          <Helmet>
        <title>Movie Details</title>
      </Helmet>
      <motion.div
              initial={{ opacity:0 ,  y: 50 }}     
        animate={{opacity:1, y: 0 }}           
        transition={{ duration: 1.5, ease: 'easeOut' }} 
      
      className=' py-4 capitalize text-lg md:flex  gap-10 md:gap-28 '>
        {/* Left content */}
        <div
        className=' min-w-fit mx-auto md:pb-0 pb-3'>
            <img                     
            src={`https://image.tmdb.org/t/p/w500/${MovieDetails?.poster_path}`}
            alt="Posterimg"
            className='bg-contain  w-full rounded-2xl  drop-shadow-2xl' />
        </div>
        {/* Right content */}
        <div
            initial={{ x: '100%' }}     
            animate={{ x: 0 }}           
            transition={{ duration: 2.5, ease: 'easeOut' }}         
        >
            {/* title and genres */}
            <div 
            className='space-y-3'> 
                <h1 className=' font-semibold text-2xl'>{MovieDetails?.title}</h1>
                <div className='flex gap-10 pb-5'> 
                    {MovieDetails?.genres?.map((element)=>{
                        return <h2 className='  dark:text-gray-400 text-gray-700 border-2 p-2 rounded-xl border-red-700 border-opacity-70' >{element.name}</h2>
                    })}
                </div>
            </div>
            {/* Overview */}
            <div  
            className='space-y-3 pb-5'>
                <h1 className='font-semibold text-xl'><i className="fa-solid fa-book-open text-gray-800"></i> Overview :</h1>
                <p className='text-gray-500'>{MovieDetails.overview}</p>
            </div>
            {/* Other info */}
           <div className='flex md:gap-28 gap-5'>
                    <div className=' space-y-4 dark:text-white dark:bg-slate-900 bg-slate-100 p-4 rounded-2xl drop-shadow-xl hover:border-red-600 transition hover:border-2 duration-500 ease-in-out hover:scale-110'>
                        <h1 className='font-semibold text-xl' ><i className="fa-solid fa-video  dark:text-gray-400 text-gray-800"></i> Production companies</h1>
                        <div className='md:flex flex-wrap md:gap-4 gap-3 border-b-2 pb-3'>
                        {MovieDetails.production_companies?.map((ele) => {
                            return ele.logo_path && (
                            <img
                                key={ele.id}
                                className='md:w-14 md:h-14 w-10 h-10 object-contain mx-auto'
                                src={`https://image.tmdb.org/t/p/w500/${ele.logo_path}`}
                                alt={ele.name}
                            />
                            );
                        })}
                        </div>

                        <h1 className='font-semibold text-xl'><i className="fa-solid fa-percent   dark:text-gray-400 text-gray-800"></i> Rating : <span className=' text-red-700 text-lg'>{MovieDetails.vote_average} <i className="fa-solid fa-star text-yellow-500"></i></span></h1> 
                    </div>

                    <div  
>
                        <div className='space-y-4  dark:text-white dark:bg-slate-900 bg-slate-100 p-4 rounded-2xl drop-shadow-xl hover:border-red-600 transition hover:border-2 duration-500 ease-in-out hover:scale-110'>
                            <h1 className='font-semibold text-xl'><i className="fa-solid fa-money-check-dollar  dark:text-gray-400  text-gray-800"></i> Budget</h1>
                            <h1 className='text-gray-800  dark:text-white border-b-2 pb-3'>{MovieDetails.budget} <i className='fa-solid fa-dollar font-semibold'></i></h1>

                            <h1 className='font-semibold text-xl'><i className="fa-solid fa-calendar-days   dark:text-gray-400 text-gray-800"></i> Release date :<span className=' text-red-700 text-lg'> {new Date(MovieDetails.release_date).toDateString()} </span></h1>
                            
                        </div>
                    </div>
           </div>
        </div>
      </motion.div>
    </>
  )
}
