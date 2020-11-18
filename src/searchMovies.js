// useState is a react hook. Manage state in a functional component w/o overhead of class component
import React, {useState} from "react";

export default function SearchMovies(){

    // Initial value is empty string, then assign state (index 0 of the return array) to query
    const [query, setQuery] = useState('');

    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();
        console.log("submitting...");
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a662712626815555702f1c6320550397&language=en-US&query=${query}&page=1&include_adult=false`;

        try { 
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
        } catch(err){
            console.error(err)
        }
    }
    
    return (
        //empty tags accommodating having only 1 parent element but no unneeded divs
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {/* filter by movies that only have a poster, and then loop over those */}
                {movies.filter(movie => movie.poster_path).map(movie => 
                    <div className="card" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="{movie.title + `poster`}" className="card--image"/>
                        <div className="card--content">
                            <h3 className="card--title">
                                {movie.title}
                            </h3>
                            <p>
                                <small>RELEASE DATE: {movie.release_date}</small>
                            </p>
                            <p>
                                <small>RATING: {movie.vote_average}</small>
                            </p>
                            <p className="card--desc">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                    )}
            </div>
        </>
    )
}

 