import React from "react"
import { useParams } from "react-router-dom"
import EpisodePlayer from "../components/EpisodePlayer"

function PodcastDetails() {
    const { id } = useParams() // Getting podcast id's from url parameters
    const [show, setShow] = React.useState([]) // Storing podcast show details
    const [error, setError] = React.useState() // Get fetch errors
    const [loading, setLoading] = React.useState(false) // Loading state
    const [expandSeason, setExpandSeason] = React.useState(null) // Expansion of a season
    const [selectedEpisode, setSelectedEpisode] = React.useState(null) // Tracking selected episode

    // Fetching podcast shows
    React.useEffect(() => {
        // Load podcast show data from api
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

    // Displaying loading state
    if(loading) {
        return <h1>Loading.......</h1> 
    }

    // Displaying error message
    if(error) {
        return <h1>{`There was an error: ${error.message}`}</h1>
    }

    // Handling the selection of an episode for playing
    function handleEpisodeClick(episode) {
        setSelectedEpisode(episode)
    }

    // Toggle showing or hiding episodes for a specific season
    function toggleSeason(seasonId) {
        setExpandSeason((prev) => (prev === seasonId ? null : seasonId))
    }

    // Close the episode player
    function closeEpisodePlayer() {
        setSelectedEpisode(null)
    }

    return (
        <div className="bg-sky-500">
            {/* Podcast header section with title and description */}
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-7 bg-cyan-950 w-full py-10 px-4">
                        <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl bg-sky-700 rounded-md p-4 text-center">{show.title}</h1>
                        <p className="font-text text-xl sm:text-lg text-zinc-300 m-4 text-center">{show.description}</p>
                    </div>
                    <h2 className="font-text text-3xl sm:text-4xl lg:text-5xl bg-sky-900 rounded-sm w-auto p-4 text-center text-gray-300 mt-6">SEASONS</h2>
            </div>

        {/* Seasons grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-10">
                    {show.seasons && show.seasons.length > 0 ? (
                    // Mapping through seasons and displaying their details
                    show.seasons.map(season => (
                    <div key={season.season} className="flex flex-col gap-4 m-10">
                    {/* Season header with image, title and length of episodes */}
                        <div className="flex gap-4 items-center">
                                <img src={season.image} alt="" className="w-28 sm:w-36 md:w-48" />
                                <div>
                                    <h2 className="font-extrabold text-white text-2xl font-heading sm:text-xl">{season.title}</h2>
                                    <h3 className="font-text text-zinc-800 sm:text-base">{`Episodes: ${season.episodes.length}`}</h3>
                                </div>
                        </div>
                        
                    {/* Button for expanding or collapsing season episodes */}
                        <button onClick={() => toggleSeason(season.season)} className="bg-sky-900 text-white px-4 py-2 rounded font-semibold">{expandSeason === season.season ? "Hide Episodes" : "Show Episodes" }</button>
                        
                    {/* Conditionally render episodes when season is expanded */}
                        {expandSeason === season.season && (
                             <ul className="space-y-4">
                                    {season.episodes.map((episode, index) => (
                                        <li key={index} onClick={() => handleEpisodeClick(episode)} className="font-heading font-extrabold text-sky-400 text-3xl cursor-pointer m-4 p-7 border-2 rounded-lg bg-cyan-900">{`Episode ${index + 1}: ${episode.title}`} <p className="font-text font-medium text-zinc-200 text-lg sm:text-base mt-2">{episode.description}</p> </li>
                        ))}
                             </ul>
                        
                    )}
                    </div>
                    ))
                    ) : (
                        <p className="text-center text-white font-text text-xl">No seasons available</p>
                    )}
         </div>

        {/* Episode player component, rendered when an episode is selected */}
         {selectedEpisode && (
    <div className="fixed bottom-0 left-0 right-0">
        <EpisodePlayer
            episode={selectedEpisode} // Passes the selected episode
            onFavourite={(episode, isFavourite) =>
                console.log(
                    `${episode.title} is now ${
                        isFavourite ? "a favourite" : "not a favourite"
                    }`
                )
            }
                onClose={closeEpisodePlayer}
        />
    </div>
)}
         </div>
        
    )
}

export default PodcastDetails