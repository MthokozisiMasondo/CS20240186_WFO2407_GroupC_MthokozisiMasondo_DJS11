import React, { useContext } from "react"
import { FavouritesContext } from "../FavouritesContext"

function Favourites() {
    const { favourites } = useContext(FavouritesContext)

    if (favourites.length === 0) {
        return <h1 className="text-center text-2xl mt-10">No favourites added yet.</h1>
    }

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            <h1 className="font-heading text-4xl text-center mb-8">My Favourites</h1>
            <div className="grid grid-cols-3 gap-6">
                {favourites.map((fav, index) => (
                    <div key={index} className="shadow-lg rounded-lg p-4 bg-white">
                        <h2 className="font-heading text-2xl">{fav.title}</h2>
                        <p className="text-gray-600">Episode {fav.episode}</p>
                        <p className="text-gray-400">{fav.showTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favourites
