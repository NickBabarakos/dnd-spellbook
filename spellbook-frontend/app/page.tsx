import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import ClassCard from "@/components/ClassCard";

const dndClasses = [
  {name: "Artificer", value: "artificer"},
  {name: "Bard", value: "bard"},
  {name: "Cleric", value: "cleric"},
  {name: "Druid", value: "druid"},
  {name: "Fighter(Eldritch Knight)", value: "fighter"},
  {name: "Paladin", value: "paladin"},
  {name: "Ranger", value: "ranger"},
  {name: "Rogue(Arcane Trickster)", value: "rogue"},
  {name: "Sorcerer", value: "sorcerer"},
  {name: "Warlock", value: "warlock"},
  {name: "Wizard", value: "wizard"}
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/*Hero Section*/}
      <section className="flex flex-col items-center text-center py-20 gap-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Dungeons & Dragons Spellbook Database</h1>
        <h3 className="text-xl text-muted-foreground max-w-2xl">Search for spells, filter based on name, class and other custom filters.</h3>
        <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg">
          <SearchBar/>
        </div>
      </section>

      {/*Grid Section*/}
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Browser by Class 
        </h2>

        {/* Grid Set Up: Mobile(1 column), Tablet(2 columns) , Laptop (3 columns), Desktop (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols3 lg:grid-cols-4 gap-4">
          {dndClasses.map((c)=> (
            <ClassCard
              key={c.value}
              name={c.name}
              value={c.value}
            />
          ))}

        </div>

      </section>
      
    </div>
  );
}
