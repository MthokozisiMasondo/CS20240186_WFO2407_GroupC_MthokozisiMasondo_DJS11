import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
    const [shows, setShows] = React.useState([])
    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        async function loadShows() {
            setLoading(true)
            try {
                const response = await fetch("https://podcast-api.netlify.app/")
                const showsData = await response.json()
                setShows(showsData)
            } catch(error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        loadShows()
    }, [])

    const availableShows = shows.map(show => {
   return ( 
    <div key={show.id}>
        <Link to={`id/${show.id}`}>

            <div key={show.id} className="flex gap-4 w-full shadow-md bg-cyan-950 border-2 rounded-lg">

                <div className="rounded-lg shadow-md overflow-hidden">
                    <img src={show.image} alt={`Photo for ${show.title}`} className="w-40 object-cover"/>
                </div>
                    
                <div className="mt-4">
                    <h3 className="font-heading font-extrabold text-2xl text-gray-50">{show.title}</h3>
                    <p className="font-text text-xl text-gray-400">{`Seasons: ${show.seasons}`}</p>
                </div>
            </div>   
        </Link>
    </div>
    )})


    if(loading) {
        return <h1>Loading.......</h1> 
    }

    if(error) {
        return <h1>{`There was an error: ${error.message}`}</h1>
    }

    return (
    <div className="bg-sky-500">
        <div className="bg-home mt-7 w-full h-screen bg-cover bg-center">
            <p className="text-white font-heading text-5xl text-center p-14">"Podcasts for every vibe, every time!"</p>
        </div>

        <div>
        <h1 className=""></h1>
            <div>
            { shows.length > 0 ? (
              <div className="grid grid-cols-3 gap-6 m-10">  
                {availableShows}
              </div>
                
            ) : (
                <h1>Loading.....</h1>
            )
            }
            </div>

        </div>

    </div>
    )
}

export default Home