import { useEffect, useState } from "react";
import { fetchSpellAllNames } from "@/lib/spells";
import { SpellSummary } from "@/types";


export default function useSpellAutoComplete(){
   const [allSpells, setAllSpells] = useState<SpellSummary[]>([]);
   const [suggestions, setSuggestions] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(()=> {
    const loadSpells = async()=>{
        setIsLoading(true);
        console.log("Fetching spell names...");
        const data = await fetchSpellAllNames();
        console.log("Fetched Data:",data);
        if(data){setAllSpells(data);} else {console.log("No data returned");}
        setIsLoading(false);
    };
    loadSpells();
   }, []);

   const filterSpells = (query: string) => {
    if(!query){
        setSuggestions([]);
        return;
    }

    const lowerQuery = query.toLowerCase();

    const matches = allSpells
        .filter((spell)=>  spell.name.toLowerCase().includes(lowerQuery))
        .map((spell)=> spell.name);
    console.log("Query:", query, "Matches:", matches);

    setSuggestions(matches);
    
    

   }

   return{suggestions, isLoading, filterSpells}
}