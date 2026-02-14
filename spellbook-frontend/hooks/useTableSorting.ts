import { useState, useMemo } from "react";
import { sortConfig, SpellResponseData } from "@/types";

const getValue = (spell: SpellResponseData, key: string)=>{
        const k = key.toLowerCase();

        if(k === 'name') return spell.name;
        if(k === 'school of magic') return spell.schoolOfMagic;
        if(k === 'casting time') return spell.metaData.castingTime;
        if(k === 'range') return spell.metaData.range;
        if(k === 'duration') return spell.metaData.duration;
        if(k === 'rating') return parseInt(spell.ratings[0]?.rating ?? "0");
        if(k === 'components') return spell.metaData.components.join(", ");

        return "";
}


export default function useTableSorting(items: SpellResponseData[]){
    const [sortConfig, setSortConfig] = useState<sortConfig | null>(null);


    const sortedItems = useMemo(()=>{
        if(!sortConfig || !sortConfig.direction) return items;

        const sortableItems = [...items];

        sortableItems.sort((a,b)=> {
            const aValue = getValue(a, sortConfig.key);
            const bValue = getValue(b, sortConfig.key);

            let comparison = 0;

            if(typeof aValue === 'string' && typeof bValue==='string'){
                comparison = aValue.localeCompare(bValue);
            } else if(typeof aValue === "number" && typeof bValue === "number"){
                comparison = aValue - bValue;
            }
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
        
        return sortableItems;
    }, [items, sortConfig]);

    

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' | null = 'asc';

        if(sortConfig && sortConfig.key === key){
            if(sortConfig.direction === 'asc') direction = 'desc';
            else if (sortConfig.direction === 'desc') direction = null;
            else direction = 'asc'
        }

        setSortConfig(direction ? {key, direction}: null);
    }

    return {sortedItems, sortConfig, requestSort};
}
