import '../../globals.css';
import Sidebar from '@/components/Sidebar';


export default function SpellListLayout({children}: Readonly<{children : React.ReactNode}>){
    return(
        <div className="flex h-full overflow-hidden">
            <div className="hidden md:flex flex-col w-60 lg:w-96 flex-none h-full">
                <Sidebar/>
            </div>

            <div className="flex flex-col flex-1 p-4 overflow-hidden">
                {children}
            </div>

        </div>
    );

}