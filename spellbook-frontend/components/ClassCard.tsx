import Link from 'next/link';

interface ClassCardProps{
    name: string;
    value: string;
}

export default function ClassCard({name, value}: ClassCardProps){
    return(
        <Link href={`/spells?spellList=${value}`}className="group">
            <div className="bg-paper border border-border-subtle rounded-xl p-6 h-full transition-all duration-300 
            hover:bg-paper-hover hover:border-brand hover:shadow-lg hover:shadow-brand/20">
                <h3 className="text-xl font-bold text-bright group-hover:text-brand transition-colors">
                    {name}
                </h3>

                <p className="text-muted text-sm mt-2">
                    Browser spells for {name}
                </p>
            </div>
        </Link>
    );
}