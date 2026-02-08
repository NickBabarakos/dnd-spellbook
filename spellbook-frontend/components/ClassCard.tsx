import Link from 'next/link';

interface ClassCardProps{
    name: string;
    value: string;
}

export default function ClassCard({name, value}: ClassCardProps){
    return(
        <Link href={`/spells?spellList=${value}`}className="group">
            <div className="bg-surface border border-border rounded-xl p-6 h-full transition-all duration-300 
            hover:bg-surface-hover hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {name}
                </h3>

                <p className="text-muted text-sm mt-2">
                    Browser spells for {name}
                </p>
            </div>
        </Link>
    );
}