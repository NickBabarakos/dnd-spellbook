"use client";

import { SpellResponseData } from "@/types";
import { formatRange, formatCastingTime, formatDuration } from "@/lib/formatters";
import StarRating from "./StarRating";
import Link from 'next/link';
import useTableSorting from "@/hooks/useTableSorting";
import TriangleIcon from "./icons/TriangleIcon";

interface SpellTableProps{
    spells: SpellResponseData[];
    spellList?: string;
}

export default function SpellTable( {spells, spellList}: SpellTableProps){
    
    const {sortedItems, sortConfig, requestSort} = useTableSorting(spells);
    
    if(!spells || spells.length === 0){ return <div className="text-center p-4">No spells found.</div>}

    const renderHeader = (label: string, key: string) => {
        const isActive = sortConfig?.key === key;

        return(
            <th 
                onClick={()=> requestSort(key)}
                className={`px-6 py-3 cursor-pointer transition-all duration-200 select-none group 
                    ${isActive ? 'bg-paper text-brand' : 'hover:bg-paper-hover hover:text-bright'}`}
            >
                <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">{label}</span>
                    {isActive && (
                        <div className="transition-transform duration-300">
                            <TriangleIcon
                                className={`w-3 h-3 fill-current transition-transform duration-300
                                    ${sortConfig.direction === 'desc'? 'rotate-180' : 'rotate-0'}`}
                            />
                        </div>
                    )}
                </div>
            </th>
        );
    };
    

    return(
        <div className="overflow-hidden rounded-lg border border-border-subtle">
            <table className="w-full text-left text-sm text-muted">

                <thead className="bg-paper-hover text-bright uppercase font-medium">
                    <tr>
                        {renderHeader('Name', 'name')}
                        {renderHeader('School', 'school of magic')}
                        {renderHeader('Casting Time', 'casting time')}
                        {renderHeader('Range', 'range')}
                        {renderHeader('Duration', 'duration')}
                        {renderHeader('Components', 'components')}
                        {renderHeader('Rating', 'rating')}

                    </tr>
                </thead>

                <tbody className="divide-y divide-border-subtle bg-background">
                    {sortedItems.map((spell)=> {
                        const href= spellList 
                            ? `/spells/${encodeURIComponent(spell.name)}?spellList=${spellList}`
                            : `/spells/${encodeURIComponent(spell.name)}`;
                        const specificRating = spell.ratings.length > 0
                                    ? spell.ratings[0].rating
                                    : "0";
                                

                        return(
                            <tr key={spell.id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">
                                <Link href={href} className="hover:text-brand-hover hover:underline"> {spell.name}</Link>
                            </td>
                            <td className="px-6 py-4">{spell.schoolOfMagic}</td>
                            <td className="px-6 py-4">{formatCastingTime(spell.metaData.castingTime)}</td>
                            <td className="px-6 py-4">{formatRange(spell.metaData.range)}</td>
                            <td className="px-6 py-4">{formatDuration(spell.metaData.duration)}</td>
                            <td className="px-6 py-4">{spell.metaData.components.join(", ")}</td>
                            <td className="px-6 py-4"><StarRating rating={specificRating}/></td>
                        </tr>
                        );

                })}
                </tbody>
            </table>
        </div>
    );

}