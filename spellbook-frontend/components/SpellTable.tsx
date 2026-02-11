import { SpellResponseData } from "@/types";
import Link from 'next/link';

interface SpellTableProps{
    spells: SpellResponseData[];
    spellList?: string;
}

export default function SpellTable( {spells, spellList}: SpellTableProps){
    if(!spells || spells.length === 0){
        return <div className="text-center p-4">No spells found.</div>
    }

    return(
        <div className="overflow-hidden rounded-lg border border-zinc-700">
            <table className="w-full text-left text-sm text-zinc-400">

                <thead className="bg-zinc-800 text-zinc-200 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">School of Magic</th>
                        <th className="px-6 py-3">Casting Time</th>
                        <th className="px-6 py-3">Range</th>
                        <th className="px-6 py-3">Duration</th>
                        <th className="px-6 py-3">Components</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                    {spells.map((spell)=> {
                        const href= spellList 
                            ? `/spells/${encodeURIComponent(spell.name)}?spellList=${spellList}`
                            : `/spells/${encodeURIComponent(spell.name)}`;

                        return(
                            <tr key={spell.id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">
                                <Link href={href} className="hover:text-red-400 hover:underline"> {spell.name}</Link>
                            </td>
                            <td className="px-6 py-4">{spell.schoolOfMagic}</td>
                            <td className="px-6 py-4">{spell.metaData.castingTime}</td>
                            <td className="px-6 py-4">{spell.metaData.range}</td>
                            <td className="px-6 py-4">{spell.metaData.duration}</td>
                            <td className="px-6 py-4">{spell.metaData.components.join(", ")}</td>
                        </tr>
                        );

                })}
                </tbody>
            </table>
        </div>
    );

}