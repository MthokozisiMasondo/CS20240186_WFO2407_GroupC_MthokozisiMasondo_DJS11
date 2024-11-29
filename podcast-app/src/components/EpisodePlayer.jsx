import React, { useState, useRef, useEffect, useContext } from "react"
import { Play, Pause, SkipForward, SkipBack, Star, Volume2, VolumeX } from "lucide-react"
import { FavouritesContext } from "../FavouritesContext"

function EpisodePlayer({ episode, onFavourite, onClose }) {
    const [playing, setPlaying] = useState(false) // Playing audio
    const [progress, setProgress] = useState(0) // Playback progress (0-100%)
    const [volume, setVolume] = useState(0.5) // Audio volume
    const [favourite, setFavourite] = useState(false) // Favourite episodes
    const audioRef = useRef(null) // Ref for audio element
    const { favourites, updateFavourites } = useContext(FavouritesContext)

    useEffect(() => {
        setFavourite(favourites.some(fav => fav.title === episode.title))
    }, [favourites, episode])

    const audioElement = audioRef.current // Reference to the audio element in the DOM

    // Toggle favourite status using episode title as unique identifier
    function toggleFavourite() {
        const favourites = JSON.parse(localStorage.getItem('favourite') || '[]')
        
        // Check if this episode (by title) is already in favourites
        const isCurrentlyFavourite = favourites.some(fav => fav.title === episode.title)
        
        let updatedFavourites
        if (isCurrentlyFavourite) {
            // Remove from favourites
            updatedFavourites = favourites.filter(fav => fav.title !== episode.title)
        } else {
            // Add to favourites
            const favouriteEpisode = {
                title: episode.title,
                episode: episode.episode,
                file: episode.file
            }
            updatedFavourites = [...favourites, favouriteEpisode]
        }
        // Update favourites
        localStorage.setItem('favouriteEpisodes', JSON.stringify(updatedFavourites))
        updateFavourites(updatedFavourites)
    }

    // Resetting state and load new audio when episode changes
    useEffect(() => {
        if(!audioElement) return

        // Pause current audio and reset
        audioElement.pause()
        audioElement.currentTime = 0
        setPlaying(false)
        setProgress(0)

        // Load new episode file
            audioElement.src = episode.file
            audioElement.load()

    }, [episode, audioElement])

    // Progress tracking
    useEffect(() => {
        // Checking if audio element exists
        if(!audioElement) return 

         // Calculating and updating progress percentage
        function updateProgress() {
            if (audioElement.duration) {
            const percentage = (audioElement.currentTime / audioElement.duration) * 100 || 0
            setProgress(percentage)
            }
        }

        audioElement.addEventListener("timeupdate", updateProgress)

        return () => {
            audioElement.removeEventListener("timeupdate", updateProgress)
        }
    }, [audioElement])

    // Handling play and pause button
    function togglePlay() {
        if(!audioElement) return 
        try {
        if(playing) {
            audioElement.pause()
        } else {
            audioElement.play()
        }
        setPlaying(!playing)
        } catch (err) {
            console.error("Error playing audio:", err.message)
        }
}

    // Handling audio progress
    function handleProgress(e) {
        const changeProgress = Number(e.target.value)
        if (!audioElement || !audioElement.duration) return; // prevent errors

        audioElement.currentTime = (changeProgress / 100) * audioElement.duration
        setProgress(changeProgress)
    }

    // Handling audio volume
    function handleVolume(e) {
        const newVolume = Number(e.target.value)
        if (!audioElement) return; // preventing errors

        audioElement.volume = newVolume
        setVolume(newVolume)
    }

    // Skip forward by 10 seconds
    function skipForward() {
        if(audioElement) {
        audioElement.currentTime += 10
        }
    }

    // Skip backwards by 10 seconds
    function skipBackward() {
        if(audioElement) {
        audioElement.currentTime -= 10
        }
    }
   
return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Audio element with preload and end event handling */}
        <audio ref={audioRef} preload="auto" onEnded={() => setPlaying(false)} />
        
        <div className="flex flex-col justify-center items-center mb-4">

                <div className="flex flex-col sm:flex-row sm:space-x-16 md:space-x-16 lg:space-x-32 items-center justify-center">
                    {/* Favourite toggle button */}
                    <button onClick={toggleFavourite}><Star color="gray" fill={favourite ? "yellow" : "none"} /></button>

                    {/* Episode display */}
                    <div className="flex flex-col justify center items-center space-y-2 sm:space-y-4">
                        <h2 className="font-heading font-extrabold text-2xl">{episode.title}</h2>
                        <p className="font-text text-gray-600 text-xl sm:text-xl">Episode {episode.episode}</p>
                    </div>
                    
                    {/* Close button for the episode player */}
                    <button onClick={onClose} className="text-2xl text-gray-600 sm:ml-auto">X</button>

                </div>  

                {/* Audio control buttons */}
                <div className="space-x-10 sm:space-x-16 mt-7 flex justify-center items-center">

                    {/* Skip backward button */}
                    <button onClick={skipBackward}><SkipBack /></button>

                    {/* Play and pause toggle button */}
                    <button onClick={togglePlay}>{playing ? <Pause /> : <Play />}</button>

                    {/* Skip forward button */}
                    <button onClick={skipForward}><SkipForward /></button>

                </div>

        </div>

        {/* Progress bar for audio */}
        <div className="mb-4">
            <input type="range" min="0" max="100" value={progress} onChange={handleProgress} className="w-full"/>
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-center sm:space-x-4">
            <button>{volume === 0 ? <VolumeX /> : <Volume2 />}</button>

            {/* Volume slider */}
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} className="w-full sm:w-1/3" />
        </div>

    </div>
)
}

export default EpisodePlayer 
