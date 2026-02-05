
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
            className={`px-6 py-2 font-bold transition-all active:scale-95 ${className}`}
        >
            {children}
        </button>
    );
}