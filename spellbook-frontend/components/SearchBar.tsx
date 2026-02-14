'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import Button from './button';
import useSpellAutoComplete from '@/hooks/useSpellAutocomplete';


export default function SearchBar(){
    const router = useRouter();
    const {suggestions, filterSpells} = useSpellAutoComplete();
    const [query, setQuery] = useState("");
    
    const handleSearch = () => {
        filterSpells("");
        if(!query.trim()) return; 
        router.push(`/spells/${encodeURIComponent(query)}`);
    };

    const handleSelectSuggestion =(spellName: string)=>{
        setQuery(spellName);
        filterSpells("");
        router.push(`/spells/${encodeURIComponent(spellName)}`);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value;
        setQuery(val);
        filterSpells(val);
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleSearch();
        }
    };

    return(
        <div className="relative w-full max-w-2xl mx-auto m-2">
            <div className="flex items-stretch bg-paper rounded-xl overflow-hidden border border-border-subtle focus-within:border-brand transition-all shadow-2xl">
                <input 
                    type="text"
                    placeholder="Enter spell name..."
                    className="flex-1 px-6 py-5 bg-transparent text-bright placeholder-text-muted focus:outline-none font-medium text-lg"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <Button 
                    onClick={handleSearch}
                    className="bg-brand hover:bg-brand-hover text-white px-10 font-bold uppercase tracking-widest text-sm transition-colors rounded-none border-none min-h-full">
                    Search
                </Button>
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full mt-1 bg-paper rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto border border-border-subtle py-2">
                    <div className="px-6 py-3 cursor-pointer text-left text-muted hover:bg-paper-hover hover:text-brand transition-all font-medium border-b last:border-0 border-border-subtle/50">
                        Suggested Spells
                    </div>
                    {suggestions.map((spellName)=> (
                        <li 
                            key={spellName}
                            onClick={()=> handleSelectSuggestion(spellName)}
                            className="px-6 py-3 cursor-pointer text-left text-zinc-400 hover:bg-zinc-800 hover:text-red-500 transition-all font-medium border-b last:border-0 border-zinc-800/50">
                                <span className="font-medium">{spellName}</span>
                            </li>
                    ))}
                </ul>
            )}
        </div>
    );
}