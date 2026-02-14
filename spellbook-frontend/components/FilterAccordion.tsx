import {useState} from 'react';

interface FilterProps{
    children: React.ReactNode;
    name: string;
    isActive: boolean;
}

export  default function FilterAccordion({children, name, isActive}:FilterProps){
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () =>{
        setIsOpen(!isOpen);
    }

    return(
        <div className='filter-wrapper flex flex-col mb-2'>
            <button
                onClick={()=> toggleOpen()} 
                className={`w-full flex justify-between items-center px-3 py-2
                            border rounded-md transition-all duration-200
                            font-medium text-base group
                    ${isActive 
                        ? 'border-brand text-brand bg-brand/10'
                        : 'border-border-subtle text-foreground hover:border-border-strong hover:bg-paper-hover'
                    }`}
                >
                    <span className="text-left">{name}</span>
                    <div className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                        <svg 
                            className="w-3 h-3 fill-current"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" />
                        </svg>
                    
                    </div>
            </button>
            {isOpen && (
                <div className='filter-menu p-2 mt-1 border-x border-b border-border-subtle rounded-b-md bg-paper/50'>
                    {children}
                </div>)}
        </div>
    )


}