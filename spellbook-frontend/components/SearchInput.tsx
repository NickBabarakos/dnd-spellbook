interface SearchInputProps{
    inputValue?: string;
    onChange: (value: string | undefined ) => void;
    onEnter?: () => void; 
}

export default function SearchInput({inputValue, onChange, onEnter}: SearchInputProps){

    const handleInputChange = (valueStr: string) => {
        const val = valueStr === '' ? undefined : valueStr;
        onChange(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && onEnter){ onEnter();}
    }

    return(
        <div className="flex items-center space-x-2">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Spell Name..."
                    value={inputValue ?? ''}
                    onChange={(e)=> handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className=" w-full bg-paper border border-border-subtle rounded-md px-3 py-2 text-sm text-foreground focus:outline-none
                                focus:border-brand focus:ring-1 focus:ring-brand transition-all duration-200 placeholder-text-muted"
                />
            </div>
        </div>

    )

}