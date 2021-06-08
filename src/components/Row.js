import React, { useState, useEffect } from 'react'
import axios from '../axios';
import "../Row.css";

const base_url = "https://image.tmdb.org/t/p/original/"

function Row( { title, fetchUrl, isLargeRow } ) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a speficic condition/variable
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); //required because we are using fetchUrl outside of the function. 

    //mapping each movie image to an img tag
    const mapMoveImage = 
        movies.map(movie =>(
            <img 
            key={movie.id}
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
                {/** several row__poster */}

                {mapMoveImage}
            </div>


            

        </div>
    )
}

export default Row
