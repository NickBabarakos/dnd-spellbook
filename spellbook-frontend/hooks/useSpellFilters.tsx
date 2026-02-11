import { useState } from "react";
import { useSearchParams } from "next/navigation";

export interface SpellFilters{
    spellName?: string;
    level?: string[];
    actionType?: string[];
    schoolOfMagic?: string[];
    rating?: string[];
    minCastingTime?: number;
    maxCastingTime?: number;
    minDuration?: number;
    maxDuration?: number;
    components?: string[];
    minRange?: number;
    maxRange?: number;
    minTargets?: number;
    maxTargets?: number;
    targetRelationship?: string[];
    attackType?: string[];
    rollType?: string[];
    ability?: string[];
    minAverageDamage?: number;
    maxAverageDamage?: number;
    damageDie?: string[];
    damageType?: string[];
    conditions?: string[];
}

const ARRAY_KEYS: (keyof SpellFilters)[] =[
    "level", "actionType", "schoolOfMagic", "rating", "components", "targetRelationship", "attackType", "rollType", "ability",
    "damageDie", "damageType", "conditions"
];

const NUMBER_KEYS: (keyof SpellFilters)[] =[
    "minCastingTime", "maxCastingTime", "minDuration", "maxDuration", "minRange", "maxRange", "minTargets", "maxTargets",
    "minAverageDamage", "maxAverageDamage"
];

const STRING_KEYS: (keyof SpellFilters)[] = ["spellName"];

export default function useSpellFilters(){
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<SpellFilters>(()=> {
        const initialFilters: any = {};

        ARRAY_KEYS.forEach((key)=> {
            const values = searchParams.getAll(key);
            if(values.length > 0){ initialFilters[key]= values;}
        });

        NUMBER_KEYS.forEach((key)=> {
            const value = searchParams.get(key);
            if(value){ initialFilters[key] = Number(value);}
        });

        STRING_KEYS.forEach((key) => {
            const value = searchParams.get(key);
            if(value){ initialFilters[key] = value;}
        });

        return initialFilters as SpellFilters;
    });

    const updateFilters = (key: keyof SpellFilters, value: any) => {
        setFilters(prev => ({...prev, [key]:value}));
    }

    const clearFilters = () => {
        setFilters({});
    }

    const buildQueryString = () => {
        const params = new URLSearchParams();

        const currentSpellList = searchParams.get('spellList');

        if(currentSpellList){ params.append('spellList', currentSpellList);}

        Object.entries(filters).forEach(([key,value]) => { 
            if(value === undefined || value === null || value === ""){return;}

            if(Array.isArray(value)){
                if(value.length === 0){return;}
                else{
                    value.forEach((item) => {
                        params.append(key,item.toString());
                    });
                    return;
                }
            }

            params.append(key, value.toString());
            
        });
        return params.toString();
                                
    }

    return{filters, updateFilters, clearFilters, buildQueryString}

}