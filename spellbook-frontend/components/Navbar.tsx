import Link from 'next/link';

export default function Navbar(){
    return(
        <nav className="h-16 border-b border-border-subtle bg-background flex items-center px-6">
            {/*Logo Area */}
            <div className="text-xl font-bold text-brand tracking-wider">
                <Link href="/">
                    SPELLBOOK
                </Link>
            </div>

            <div className="ml-auto">
            </div>


        </nav>
    )
}