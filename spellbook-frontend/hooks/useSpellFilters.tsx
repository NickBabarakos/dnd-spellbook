import { useState } from "react";

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

export default function useSpellFilters(){
    const [filters, setFilters] = useState<SpellFilters>({});

    const updateFilters = (key: keyof SpellFilters, value: any) => {
        setFilters(prev => ({...prev, [key]:value}));
    }

    const clearFilters = () => {
        setFilters({});
    }

    const buildQueryString = () => {
        const params = new URLSearchParams();

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