import React from "react"
import { Link, useParams } from "react-router-dom"

function PodcastDetails() {
    const { id } = useParams()
    const [show, setShow] = React.useState([])
    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [expandSeason, setExpandSeason] = React.useState(null)

    React.useEffect(() => {
        async function loadPodcastShow() {
            setLoading(true)
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
                const showData = await response.json()
                setShow(showData)
            } catch(error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        loadPodcastShow()
    }, [id])

    if(loading) {
        return <h1>Loading.......</h1> 
    }

    if(error) {
        return <h1>{`There was an error: ${error.message}`}</h1>
    }

    const toggleSeason = (seasonId) => {
        setExpandSeason((prev) => (prev === seasonId ? null : seasonId))
    }

    return (
        <div className="bg-sky-500">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-heading font-bold text-white text-6xl bg-cyan-950 w-full text-center py-14">{show.title}</h1>
                <h2 className="font-text text-4xl bg-sky-900 w-48 text-center text-gray-300">Seasons:</h2>
            </div>

            <div className="grid grid-cols-3 m-20">
                    {show.seasons && show.seasons.length > 0 ? (
                    show.seasons.map(season => (
                    <div key={season.season} className="flex flex-col gap-4 m-10">
                        <div className="flex">
                            <div>
                                <img src={season.image} alt="" className="w-48" />
                            </div>
                        
                            <div>
                                <h2 className="font-semibold text-white text-2xl font-heading">{season.title}</h2>
                                <h3 className="font-text text-zinc-800">{`Episodes: ${season.episodes.length}`}</h3>
                            </div>
                        </div>
                        
                        <button onClick={() => toggleSeason(season.season)} className="bg-sky-900 text-white px-4 py-2 rounded font-semibold">{expandSeason === season.season ? "Hide Episodes" : "Show Episodes" }</button>
                        
                        {expandSeason === season.season && (
                             <ul>
                            {season.episodes.map((episode, index) => (
                                <li key={index} className="font-heading font-extrabold text-sky-400 text-3xl m-4 p-7 border-2 rounded-lg bg-cyan-900">{`Episode ${index + 1}: ${episode.title}`} <p className="font-text font-medium text-zinc-200 text-lg">{episode.description}</p> </li>
                            
                        ))}
                            </ul>
                        
                    )}
                    </div>
                    ))
                    ) : (
                        <p>No seasons available</p>
                    )}
         </div>
         </div>
        
    )
}

export default PodcastDetails