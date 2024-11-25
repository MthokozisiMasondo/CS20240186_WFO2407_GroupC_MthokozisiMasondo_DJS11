import React from "react"
import Logo from "../assets/logo.png"
import SearchIcon from "../assets/search.png"
import Favourites from "../assets/favourites.png"

function Header() {
    return (
        <header className="w-auto flex items-center justify-between p-7">

            <div className="w-20 m-4 flex flex-col items-center">
                <img src={Logo} alt="Lalela Podcast Logo" className="w-14" />
                <h2 className="font-logo text-2xl font-semibold">LALELA</h2>
            </div>

            <div className="flex gap-4">
                <input type="text" placeholder="Search" className="border-2 border-sky-300 px-4 rounded-2xl w-64 h-12" />
                <button className="border-2 border-sky-300 rounded-3xl">
                    <img src={SearchIcon} alt="" className="w-8" />
                </button>
                </div>

                <div className="flex flex-col items-center m-4">
                <button>
                    <img src={Favourites} alt="" className="w-12" />
                </button>
                <p className="font-text">Favourites</p>
            </div>

        </header>
    )
}

export default Header