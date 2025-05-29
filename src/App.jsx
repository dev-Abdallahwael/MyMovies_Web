import "@fortawesome/fontawesome-free/css/all.min.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import NowPlaying from "./Pages/NowPlaying";
import TopRatedmovies from "./components/TopRatedmovies";
import { WatchListContextProvider } from "./Context/WatchList";
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import List from "./Pages/List";

function App() {
  const routes = createBrowserRouter([
    { path:'/',element: <Layout/> ,
       children:[
      {index: true , element: <Home/>},
      {path: 'Moviedetails/:id' , element: <MovieDetails/>},
      {path : 'Nowplaying' , element : <NowPlaying/>},
      {path : 'TopRated' , element : <TopRatedmovies/>},
      {path : 'WatchList' , element : <List/>},
    ] }
  ])
  return (
    <>
    <WatchListContextProvider>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </WatchListContextProvider>
    </>
  )
}

export default App
