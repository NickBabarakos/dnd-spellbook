'use client'
import {useState} from 'react';
import Button from './button';


export default function SearchBar(){
    const [query, setQuery] = useState("");
    
    const handleSearch = () => {
        console.log("Search for:", query);
        alert(`Search for: ${query}`);

    };

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleSearch();
        }
    };

    return(
        <div className="flex w-full gap-2">

            <input 
                type="text"
                placeholder="Enter spell name..."
                className="flex-1 px-4 py-2 border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <Button 
                onClick={handleSearch}
                className="bg-red-600 text-white hover:bg-red-700">
                    Search
            </Button>
        
        </div>

    );
}