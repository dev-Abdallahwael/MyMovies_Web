import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import { motion } from 'framer-motion';
import { WatchListContext } from '../Context/WatchList';
import toast from './../../node_modules/react-hot-toast/src/index';
import Nomovies from './Nomovies';

export default function Movies() {

    const [ movies , SetMovies ]=useState([]);
    const [searchmov , SetSearchMov ] = useState([])
    let {AddToWatchList} = useContext(WatchListContext);
    
  function GetUpcomingMovies() {
       const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZhMmQyNWJiZTY4ZDhmMDkyMWMxMzM5ZjY0NjJhMyIsIm5iZiI6MTc0NzIzMTQxNy4xMTgsInN1YiI6IjY4MjRhMmI5YTlkMzRmNzcwMjdlODY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-g3W6MEpmR4lia2VFoV_CNYXfAODK2ohAEyA9PIk1kY'
            }
        };
            fetch('https://api.themoviedb.org/3/movie/upcoming', options)
           .then(res => res.json())
           .then(res =>{
            console.log(res.results);
            SetMovies(res.results);
            SetSearchMov(res.results);
           } )
           .catch(err => console.error(err));
    }
    useEffect(()=>{
        GetUpcomingMovies()
    },[]);

    function SearchMovies(e) {
      const value = e.target.value.toLowerCase();

      if (value === "") {
        SetSearchMov(movies);
      } else {
        let myMov = movies;
        let filtermovie = myMov.filter((mov) => {
          return mov.title.toLowerCase().includes(value);
        });
        SetSearchMov(filtermovie);
      }
}

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
            <form className="max-w-md mx-auto my-3">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        onInput={(e) => {
                            SearchMovies(e);
                        }}
                        type="search" id="default-search" className="block w-full p-3 ps-10 text-lg text-black border-2 border-gray-400 rounded-xl bg-gray-50  focus:border-red-500 transition-all duration-150" placeholder="Search Upcoming..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>

            <div className="grid grid-cols-12 gap-4">
                {/* Card */}
                {/* https://image.tmdb.org/t/p/w500/  => Base URL */}

                {
                    !movies || movies.length === 0 ? (
                        <Loader />
                    ) : (
                        <>
                            {searchmov.length === 0 ? (
                                <Nomovies/>
                            ) : (
                                searchmov.map((movie) => {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1.5, ease: 'easeOut' }}
                                            viewport={{ once: true, amount: 0.4 }} // triggers when 40% of card is visible
                                            key={movie.id}
                                            className="col-span-6 md:col-span-4 lg:col-span-2 overflow-hidden cursor-pointer group text-white rounded-2xl hover:drop-shadow-2xl transition-all duration-100 relative">

                                            <Link to={`Moviedetails/${movie.id}`}>
                                                {/* Image */}
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                    alt="Posterimg"
                                                    className="w-full h-full object-cover hover:scale-110 transition-all duration-200 ease-in-out"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10" />
                                            </Link>

                                            {/* Text content (on top of gradient) */}
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
                                                            onClick={() => {
                                                                AddingToList(movie.id);
                                                            }}
                                                            className="fa-solid fa-heart text-xl"></i>
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </>
                    )
                }
            </div>
        </>
    );
}

