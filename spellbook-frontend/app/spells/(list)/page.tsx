import SpellTable from "@/components/SpellTable";
import { fetchSpells } from "@/lib/spells";

interface SpellsPageProps{
    searchParams: Promise<{[key:string]: string | string[] | undefined}>;
}

export default async function SpellsPage({searchParams}: SpellsPageProps){
    const params =  await searchParams;
    const selectedClass = typeof params.spellList === 'string' ? params.spellList : undefined;
    const spells = await fetchSpells(params);

    return(
        <div className="container mx-auto p-4">
            <div className="py-10">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Spells for {selectedClass ? selectedClass.toUpperCase() : "All Classes"}
                </h1>
            
                <SpellTable
                    spells={spells}
                    spellList={selectedClass}
                />
            </div>
        </div>
    )
}