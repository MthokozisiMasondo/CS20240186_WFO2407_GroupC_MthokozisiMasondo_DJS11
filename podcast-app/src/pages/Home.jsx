import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
    const [shows, setShows] = React.useState([]) // Stores list of podcast shows
    const [error, setError] = React.useState() // Stores errors
    const [loading, setLoading] = React.useState(false) // Tracks loading state

     // New state for sorting and filtering
     const [sortOrder, setSortOrder] = React.useState('asc')
     const [availableGenres, setAvailableGenres] = React.useState([])
     const [selectedGenres, setSelectedGenres] = React.useState([])

    // Fetch podcast shows when component mounts
    React.useEffect(() => {
        async function loadShows() {
            setLoading(true)
            try {
                const response = await fetch("https://podcast-api.netlify.app") 
                const showsData = await response.json()
                setShows(showsData)

                // Extract unique genres from all shows
                const uniqueGenres = [...new Set(
                    showsData.flatMap(show => show.genres)
                )]

                // Fetch genre details for each unique genre
                const genrePromises = uniqueGenres.map(genreId => 
                    fetch(`https://podcast-api.netlify.app/genre/${genreId}`).then(res => res.json())
                )
                const genres = await Promise.all(genrePromises);
                setAvailableGenres(genres)
            } catch(error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        loadShows()
    }, [])

     // Sorting function for shows
     const sortShows = (shows) => {
        return [...shows].sort((a, b) => {
            const comparison = a.title.localeCompare(b.title)
            return sortOrder === 'asc' ? comparison : -comparison
        })
    }

     // Filtering function for shows
     const filterShows = (shows) => {
        if (selectedGenres.length === 0) return shows

        return shows.filter(show => 
            show.genres.some(genreId => 
                selectedGenres.includes(genreId)
            )
        )
    }

// Prepare processed shows
const processedShows = sortShows(filterShows(shows))

    // Turning shows into card components
    const availableShows = processedShows.map(show => (
    <div key={show.id} className="w-full">
        {/* Link to individual podcast details page */}
        <Link to={`id/${show.id}`}>
            <div className="flex gap-4 w-full shadow-md bg-cyan-950 border-2 rounded-lg">

                <div className="rounded-lg shadow-md overflow-hidden">
                    <img src={show.image} alt={`Photo for ${show.title}`} className="w-40 object-cover"/>
                </div>
                    
                <div className="mt-4">
                    <h3 className="font-heading font-extrabold text-2xl text-gray-50">{show.title}</h3>
                    <p className="font-text text-xl text-gray-400">{`Seasons: ${show.seasons}`}</p>
                    <p className="font-text text-zinc-200">{`Last update: ${new Date(show.updated).toLocaleDateString()}`}</p>
                </div>
            </div>   
        </Link>
    </div>
    ))

    if(loading) {
        return <h1>Loading.......</h1> 
    }

    if(error) {
        return <h1>{`There was an error: ${error.message}`}</h1>
    }


// Rendering logic goes in the return statement

    return (
    <div className="bg-sky-500">
        {/* Hero section with background image and slogan */}
        <div className="bg-home mt-7 w-full h-screen bg-cover bg-center">
            <p className="text-white font-heading text-3xl lg:text-5xl text-center p-4 sm:p-14">"Podcasts for every vibe, every time!"</p>
        </div>

         {/* Sorting and filtering controls */}
         <div className="flex flex-wrap justify-center items-center gap-4 my-4 px-4">
                {/* Sort Button */}
                <button 
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="bg-sky-700 text-white px-4 py-2 rounded"
                >
                    Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                </button>

                {/* Genre Filters */}
                <div className="flex flex-wrap gap-2">
                    {availableGenres.map(genre => (
                        <button
                            key={genre.id}
                            onClick={() => {
                                setSelectedGenres(prev => 
                                    prev.includes(genre.id)
                                        ? prev.filter(id => id !== genre.id)
                                        : [...prev, genre.id]
                                )
                            }}
                            className={`px-4 py-2 rounded ${
                                selectedGenres.includes(genre.id) 
                                    ? 'bg-sky-900 text-white' 
                                    : 'bg-sky-200 text-sky-900'
                            }`}
                        >
                            {genre.title}
                        </button>
                    ))}
                </div>
            </div>

        <div>
        <h1 className=""></h1>
            {/* Podcast shows grid */} 
            <div>
            { shows.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4 mb-24 md:m-10 mb-16">  
                {availableShows}
              </div>
                
            ) : (
                <h1 className="text-center font-heading text-3xl">Loading.....</h1>
            )
            }
            </div>

        </div>

    </div>
    )
}

export default Home