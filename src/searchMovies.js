// useState is a react hook. Manage state in a functional component w/o overhead of class component
import React, {useState} from "react";

export default function SearchMovies(){

    // Initial value is empty string, then assign state (index 0 of the return array) to query
    const [query, setQuery] = useState('');
    
    const searchMovies = async (e) => {
        e.preventDefault();
        console.log("submitting...");
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a662712626815555702f1c6320550397&language=en-US&query=${query}&page=1&include_adult=false`;

        try { 
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
        } catch(err){
            console.error(err)
        }
    }
    
    return (
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query"
                placeholder="i.e. Jurassic Park"
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
            <button className="button" type="submit">Search</button>
        </form>
    )
}

 