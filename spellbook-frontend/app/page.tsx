import SearchBar from "@/components/SearchBar";
import ClassCard from "@/components/ClassCard";
import { DND_CLASSES } from "@/constants/classes";


 
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/*Hero Section*/}
      <section className="flex flex-col items-center text-center py-20 gap-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-bright">Dungeons & Dragons Spellbook Database</h1>
        <h3 className="text-xl text-muted max-w-2xl">Search for spells, filter based on name, class and other custom filters.</h3>
        <div className="w-full max-w-md bg-paper p-4 rounded-lg border border-border-subtle">
          <SearchBar/>
        </div>
      </section>

      {/*Grid Section*/}
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-bright">
          Browser by Class 
        </h2>

        {/* Grid Set Up: Mobile(1 column), Tablet(2 columns) , Laptop (3 columns), Desktop (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols3 lg:grid-cols-4 gap-4">
          {DND_CLASSES.map((c)=> (
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
