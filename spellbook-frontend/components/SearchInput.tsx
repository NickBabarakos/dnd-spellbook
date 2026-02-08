interface SearchInputProps{
    inputValue?: string;
    onChange: (value: string | undefined ) => void;
}

export default function SearchInput({inputValue, onChange}: SearchInputProps){

    const handleInputChange = (valueStr: string) => {
        const val = valueStr === '' ? undefined : valueStr;
        onChange(val);
    };

    return(
        <div className="flex items-center space-x-2">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Spell Name..."
                    value={inputValue ?? ''}
                    onChange={(e)=> handleInputChange(e.target.value)}
                    className=" w-full bg-zinc-900 broder border-zinc-700 rounded-md 
                                px-3 py-2 text-sm text-zinc-200 
                                focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 
                                transition-all duration-200 placeholder-zinc-500"
                />
            </div>
        </div>

    )

}