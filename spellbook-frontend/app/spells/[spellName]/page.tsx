import { fetchSpellByName } from "@/lib/spells";
import { formatCastingTime, formatDuration , formatRange } from "@/lib/formatters";
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
    const hasMaterials = Boolean(spell?.metaData.materials);

    const specificRating = spellList 
        ? spell.ratings.find(r=> r.className.toLowerCase() === spellList.toLowerCase())?.rating
        :null;

    return(
        <div className="container mx-auto px-4 py-12 flex justify-center items-start min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-4xl bg-paper border-border-subtle rounded-xl shadow-2xl shadow-brand/10 overflow-hidden">

                {/*Header Section */}
                <div className="p-8 border-b border-border-subtle bg-paper/50">
                    <h1 className="text-5xl font-extrabold tracking-tight text-brand mb-4 drop-shadow-sm">{spell.name}</h1>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full bg-paper-hover text-text-main text-sm font-medium border border-border-strong">{spell.level}</span>
                        <span className="px-3 py-1 rounded-full bg-paper-hover text-text-main text-sm font-medium border border-border-strong">{spell.schoolOfMagic}</span>
                        <span className="px-3 py-1 rounded-full bg-paper-hover text-muted text-sm italic border border-border-subtle/50">{spell.source}</span>
                    </div>
                </div>

            {/*Stats Grid*/}
            <div className="grid grid-cols-2 md:grid-cols-4 bg-background/30 border-b border-border-subtle divide-y md:divide-y-0 md:divide-x divide-border-sublte">

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-paper-hover transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted mb-1">Casting Time</span>
                    <span className="font-medium text-foreground">
                        {formatCastingTime(spell.metaData.castingTime)} 
                        {spell.metaData.isRitual && <span className="text-zinc-500 ml-1 text-xs">R</span>}</span>
                </div>

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-paper-hover transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted mb-1">Range</span>
                    <span className="font-medium text-foreground">{formatRange(spell.metaData.range)}</span>
                </div>

                <div className={`p-4 flex flex-col items-center justify-center text-center transition-colors ${hasMaterials ? 'bg-brand/10' : 'hover:bg-paper-hover'}`}>
                    <span className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${hasMaterials ? 'text-brand' : 'text-muted'}`}>Components</span>
                    <span className={`font-medium text-sm ${hasMaterials ? 'text-brand' : 'text-foreground'}`}>{spell.metaData.components.join(", ")}</span>
                </div>

                <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-paper-hover transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted mb-1">Duration</span>
                    <span className="font-medium text-foreground">
                        {formatDuration(spell.metaData.duration)}</span>
                </div>
            </div>
            {spell.metaData.materials && (
                <div className="mx-8 mt-2 mb-4 p-4 bg-brand/5 border-l-4 border-brand rounded-r-lg flex items-center gap-4 shadow-inner">
                    <div className="shrink-0 flex items-center justify-center bg-brand/20 border border-brand/40 px-2 py-1 rounded">
                        <span className="text=[10px] uppercase font-black text-brand tracking-tighter">
                            Material Cost
                        </span>
                    </div>
                        <div className="flex-1">
                            <p className="text-sm text-bright/80 italic leading-relaxed">
                                {spell.metaData.materials}
                            </p>
                        </div>
                </div>
            )}
            

            <div className="p-8 space-y-8">

            {/* Singe Class View (accessed via Spell List)*/}
            {spellList && specificRating && (
                <div className="flex items-center justify-between bg-linear-to-r from-brand/20 to-transparent border-l-4 border-brand p-4 rounded-r-lg">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-brand/80 tracking-wider">RPGBOT Review</span>
                        <span className="text-foreground font-medium">Rating for <span className="text-white capitalize">
                            {spellList}</span></span>
                    </div>

                    <div className="bg-paper/80 px-4 py-2 rounded-lg border border-border-subtle shadow-sm">
                        <StarRating rating={specificRating}/>
                    </div>
                </div>
            )}

            {/*General View (accessed via Direct Link/Search)*/}
            {!spellList && spell.ratings.length >0 && (
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-text-main border-b border-border-sublte pb-2">Class Ratings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {spell.ratings.map((rate)=> (
                            <div key={rate.className} className="flex items-center justify-between bg-paper p-3 rounded border border-border-subtle">
                                <span className="font-medium text-foreground">{rate.className}</span>
                                <StarRating rating={rate.rating} />
                            </div>
                        ))}
                    </div> 
                </div>
            )}
            
            {/*Description*/}
            <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-text-main leading-8 first-letter:text-5xl first-letter:font-bold first-letter:text-brand first-letter:mr-3 first-letter:float-left ">
                    {spell.description}
                </p>
            </div>
        </div>
    </div>
    </div>
    );
}