import useSpellFilters from "@/hooks/useSpellFilters";
import SpellFilters from "@/components/SpellFilters";

interface SpellsPageProps{
    searchParams: Promise<{ spellList?: string}>;
}

export default async function SpellsPage({searchParams}: SpellsPageProps){
    const params =  await searchParams;
    const selectedClass = params?.spellList;

    return(
        <div className="container mx-auto p-4">
            <div className="py-10">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Spells for {selectedClass ? selectedClass.toUpperCase() : "All Classes"}
                </h1>
                
                <p className="text-center text-muted">
                    Fetching spells for {selectedClass}...
                </p>
            </div>
        </div>
    )
}