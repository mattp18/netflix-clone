import React, { useState, useEffect } from 'react'
import axios from '../axios';
import "../Row.css";
import YouTube from 'react-youtube';

const base_url = "https://image.tmdb.org/t/p/original/"

function Row( { title, fetchUrl, isLargeRow } ) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippet of code which runs based on a speficic condition/variable
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); //required because we are using fetchUrl outside of the function. 

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=94fe7b34b355eb40584d5a16d89cc50f`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
      };

    //mapping each movie image to an img tag
    const mapMoveImage = 
        movies.map(movie =>(
            <img 
            key={movie.id}
            onClick={() => handleClick(movie)}
            className= {`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}
                />
        ));
    

    console.log(movies);

    return (
        <div className="row">
            <h2>{ title }</h2>

            <div className="row__posters">
                {mapMoveImage}
            </div>
            { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
