import { createContext } from "react"

export let WatchListContext  = createContext("")

export function WatchListContextProvider ({children}){


    function AddToWatchList(movieID){
        const options = {
                method: 'POST',
                body: JSON.stringify({
                    media_type:"movie",
                    media_id: movieID,
                    watchlist: true
                }),
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZhMmQyNWJiZTY4ZDhmMDkyMWMxMzM5ZjY0NjJhMyIsIm5iZiI6MTc0NzIzMTQxNy4xMTgsInN1YiI6IjY4MjRhMmI5YTlkMzRmNzcwMjdlODY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-g3W6MEpmR4lia2VFoV_CNYXfAODK2ohAEyA9PIk1kY'
                }
                };

              return  fetch('https://api.themoviedb.org/3/account/22010488/watchlist', options)
                .then(res => res.json())
                .then(res => res )
                .catch(err => err );
    }

    function GetMovies(){
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZhMmQyNWJiZTY4ZDhmMDkyMWMxMzM5ZjY0NjJhMyIsIm5iZiI6MTc0NzIzMTQxNy4xMTgsInN1YiI6IjY4MjRhMmI5YTlkMzRmNzcwMjdlODY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-g3W6MEpmR4lia2VFoV_CNYXfAODK2ohAEyA9PIk1kY'
            }
            };

          return  fetch('https://api.themoviedb.org/3/account/22010488/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(res => res.json())
            .then(res => res)
            .catch(err => err);
    }

    function Delete(movieID){
        const options = {
                method: 'POST',
                body: JSON.stringify({
                    media_type:"movie",
                    media_id: movieID,
                    watchlist: false
                }),
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDZhMmQyNWJiZTY4ZDhmMDkyMWMxMzM5ZjY0NjJhMyIsIm5iZiI6MTc0NzIzMTQxNy4xMTgsInN1YiI6IjY4MjRhMmI5YTlkMzRmNzcwMjdlODY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-g3W6MEpmR4lia2VFoV_CNYXfAODK2ohAEyA9PIk1kY'
                }
                };

              return  fetch('https://api.themoviedb.org/3/account/22010488/watchlist', options)
                .then(res => res.json())
                .then(res => res )
                .catch(err => err );
    }

    return <WatchListContext.Provider value={{ AddToWatchList , GetMovies , Delete}}>
        {children}
    </WatchListContext.Provider>
}