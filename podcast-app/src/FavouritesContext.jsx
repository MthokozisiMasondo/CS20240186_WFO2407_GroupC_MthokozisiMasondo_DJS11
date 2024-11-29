import React, { createContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favouriteEpisodes") || "[]");
        setFavourites(storedFavourites);
    }, []);

    function updateFavourites(newFavourites) {
        localStorage.setItem("favouriteEpisodes", JSON.stringify(newFavourites));
        setFavourites(newFavourites);
    }

    return (
        <FavouritesContext.Provider value={{ favourites, updateFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export { FavouritesContext, FavouritesProvider };
