import { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
}