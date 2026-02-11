import {SpellResponseData} from "@/types";

const API_BASE_URL = process.env.API_URL; 

interface SearchParamsProps{
    [key: string]: string | string[] | undefined;
}

export async function fetchSpells(searchParams: SearchParamsProps): Promise<SpellResponseData[]>{
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key,value]) => {
        if(value === undefined || value === null || value === '') return;
        if(Array.isArray(value)){
            value.forEach(item => params.append(key, item));
        }else{
            params.append(key, value);
        }
    });

    try{
        const res = await fetch(`${API_BASE_URL}/spells?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
            cache: 'no-store'
        });

        if(!res.ok){
            const errorText = await res.text();
            console.error(`Error fetching spells: ${res.status}-${errorText}`);
            throw new Error(`Failed to fetch spells: ${res.status}`);
        }

        return await res.json();
    } catch(error){
        console.error("API Call failed:", error);
        return[];
    }
}
export async function fetchSpellByName(name: string, spellList: string): Promise<SpellResponseData | null>{
    const encodedName = encodeURIComponent(name);
    let url = `${API_BASE_URL}/spells/by-name/${encodedName}`;
    if(spellList){ url += `?spellList=${spellList}`};

    try{
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if(res.status === 404){
            return null;
        }
        if(!res.ok){ throw new Error(`Failed to fetch spell: ${res.status}`);}

        return await res.json();
    }catch(error){
        console.error("Single Spell Fetch failed:", error);
        return null;
    }
}
