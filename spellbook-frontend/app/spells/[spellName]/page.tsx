import { fetchSpellByName } from "@/lib/spells";
import { formatCastingTime, formatDuration } from "@/lib/formatters";
import StarRating from "@/components/StarRating";
import { notFound } from "next/navigation";

interface SpellInformationPageProps{
    params: Promise<{spellName: string}>;
    searchParams: Promise<{spellList: string}>
}

export default async function SpellInformationPage({params, searchParams}: SpellInformationPageProps){
    const {spellName} = await params;
    const {spellList} = await searchParams;
    const decodedName = decodeURIComponent(spellName);
    const spell = await fetchSpellByName(decodedName, spellList);

    if(!spell){notFound();}

    return(
        <div className="container mx-auto px-4 py-12 flex justify-center items-start min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-4xl bg-zinc-900 border-zinc-800 rounded-xl shadow-2xl shadow-red-900/10 overflow-hidden">

                {/*Header Section */}
                <div className="p-8 border-b border-zinc-800 bg-zinc-900/50">
                    <h1 className="text-5xl font-extrabold tracking-tight text-red-500 mb-4 drop-shadow-sm">{spell.name}</h1>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium border border-zinc-700">{spell.level}</span>
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium border border-zinc-700">{spell.schoolOfMagic}</span>
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-sm italic border border-zinc-700/50">{spell.source}</span>
                    </div>
                </div>

            {/*Stats Grid*/}
            <div className="grid grid-cols-2 md:grid-cols-4 bg-zinc-950/30 border-b border-zinc-800 divide-y md:divide-y-0 md:divide-x divide-zinc-800">

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-800/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Casting Time</span>
                    <span className="font-medium text-zinc-200">
                        {formatCastingTime(spell.metaData.castingTime)} 
                        {spell.metaData.isRitual && <span className="text-zinc-500 ml-1 text-xs">R</span>}</span>
                </div>

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-800/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Range</span>
                    <span className="font-medium text-zinc-200">{spell.metaData.range}ft</span>
                </div>

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-800/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Components</span>
                    <span className="font-medium text-zinc-200 text-sm">{spell.metaData.components.join(", ")}</span>
                </div>

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-800/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Duration</span>
                    <span className="font-medium text-zinc-200">
                        {formatDuration(spell.metaData.duration)}</span>
                </div>
            </div>

            <div className="p-8 space-y-8">

            {/*Rating Section*/}
            {spellList && spell.rating && (
                <div className="flex items-center justify-between bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-600 p-4 rounded-r-lg">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-red-500/80 tracking-wider">RPGBOT Review</span>
                        <span className="text-zinc-300 font-medium">Rating for <span className="text-white capitalize">
                            {spellList}</span>
                        </span>
                    </div>
                    
                    <div className="bg-zinc-900/80 px-4 py-2 rounded-lg border border-zinc-800 shadow-sm">
                        <StarRating rating={spell.rating}/>
                    </div>
                </div>
            )}
            
            {/*Description*/}
            <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-zinc-300 leading-8 first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-3 first-letter:float-left">
                    {spell.description}
                </p>
            </div>
        </div>
    </div>
    </div>
    );
}