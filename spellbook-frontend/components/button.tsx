
interface ButtonProps{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
}

export default function Button({children, onClick, className="", type="button"}: ButtonProps){
    return(
        <button 
            type={type}
            onClick={onClick}
            className={`font-bold transition-all duration-200 active:scale-95 flex items-center justify-center tracking-widest ${className}`}
        >
            {children}
        </button>
    );
}