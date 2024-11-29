import React from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import Favourites from "../assets/favourites.png" 

// Header container
function Header() {
    return (
        <header className="w-full flex items-center justify-between p-7 flex-wrap">

            <div className="w-20 m-4 flex flex-col items-center sm:w-auto">
                <Link to="/">
                    <img src={Logo} alt="Lalela Podcast Logo" className="w-14" />
                </Link>
                <h2 className="font-logo text-2xl font-semibold">LALELA</h2>
            </div>

                <div className="flex flex-col items-center m-4 sm:w-auto">
                    <Link to="/favourites">
                        <button>
                            <img src={Favourites} alt="Favourites" className="w-12" />
                        </button>
                    </Link>
                        <p className="font-text">Favourites</p>
                </div> 

        </header>
    )
}

export default Header