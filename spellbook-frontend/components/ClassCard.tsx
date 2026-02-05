import Link from 'next/link';

interface ClassCardProps{
    name: string;
    value: string;
    className?: string;
}

export default function ClassCard({name, value, className=""}: ClassCardProps){
    return(
        <Link 
            href={`/spells?spellList=${value}`}
            className={`
                    block p-6 text-center border border-zinc-800 rounded-r-xl 
                    bg-zinc-900 text-zinc-100 font-bold text-lg 
                    hover:border-red-600 hover:scale-105 transition-all duration-200  
                    shadow-lg hover-red-900/20  
                    ${className}
                `}
        >
            {name}
        </Link>
    );
}