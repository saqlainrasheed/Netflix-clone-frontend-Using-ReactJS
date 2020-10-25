  import React,{useState,useEffect} from 'react'
  import axios from 'axios';
  import './Row.css';
  import Youtube from 'react-youtube';
  import movieTrailer from 'movie-trailer';

  const imageBaseURL = 'https://image.tmdb.org/t/p/original/'

  function Row({ title, fetchUrl, isLargeImage }) {

    const [movies, setMovies] = useState([]);
    const [trailerURL,setTrailerURL ] = useState('');
    
    useEffect(()=>{
      let fetchData = async () => {
        const request = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
        setMovies(request.data.results);
        return request;
      };
      fetchData();
    },[fetchUrl]) 

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const handleClick = (movie) => {
      if(trailerURL){
        setTrailerURL("");
      } else{
        movieTrailer(movie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get('v'))
        }).catch(err => console.log("Error loading trailer"))
      }
    }
    
    return (
      <div className="row">
        <h2>{title}</h2>
          <div className="row_posters">
            {movies.map((movie) => (
              <img 
                key={movie.id}
                onClick ={()=>handleClick(movie)}
                className={`row_poster ${isLargeImage && "row_posterLarge"}`}
                src={`${imageBaseURL}${isLargeImage ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}  />
              ))}
          </div> 

          {trailerURL && <Youtube videoId={trailerURL} opts={opts}  />}
        </div>
    )
  }
  
  export default Row
  