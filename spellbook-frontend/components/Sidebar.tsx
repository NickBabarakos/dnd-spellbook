'use client';

import { useRouter, useSearchParams } from "next/navigation";
import SpellFilters from "./SpellFilters";
import useSpellFilters from "@/hooks/useSpellFilters";

export default function Sidebar(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const { filters, updateFilters, clearFilters, buildQueryString} = useSpellFilters();

    const handleSearch = () => {
        const queryString = buildQueryString();
        router.push(`/spells?${queryString}`);
    };

    const handleClear = () => {
        clearFilters();
        const currentList = searchParams.get('spellList');
        if(currentList){
            router.push(`/spells?spellList=${currentList}`);
        }else{router.push('/spells')};
    }

    return(
        <aside className="h-full flex flex-col bg-background border-r border-border overflow-hidden">
            <div className="p-4 border-b border-border">
                <h2 className="font-bold text-xl">Spell Filters</h2>
            </div>

            {/*Scrollable Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <SpellFilters
                    filters={filters}
                    updateFilters={updateFilters}
                    clearFilters={clearFilters}
                    buildQueryString={buildQueryString}
                    onApply={handleSearch}
                />
            </div>

            <div className="flex flex-col gap-2 p-4 border-t border-border bg-background">
                <button 
                    onClick={handleSearch}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors">
                        Apply Filters 
                </button>
                <button 
                    onClick={handleClear}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors"
                > Clear Filters
                </button>
            </div>
        </aside>
    );
}