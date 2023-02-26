import React from "react";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({placeholder, clicked, searchPhrase, setSearchPrase, setClicked}) => {
    return (
        <div className="search">
            <div className = "searchInputs">
                <input type="text"/>
                <div className = "searchIcons">
                    {/* search Icon */}
                    <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                    />
                </div>
            </div>
            <div className ="searchResults">

            </div>
        </div>
    );
}
export default SearchBar;