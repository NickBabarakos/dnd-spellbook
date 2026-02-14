interface RangeFilterProps{
    min?: number;
    max?: number;
    onChange: (min: number | undefined, max: number | undefined) => void;
    unit?: string;
}

export default function RangeFilter({min, max, onChange, unit}: RangeFilterProps){

    const handleInputChange = (valueStr: string, type: 'min' | 'max') => {
        const val = valueStr === '' ? undefined : Number(valueStr);

        if(type === 'min'){
            onChange(val, max);
        } else {
            onChange(min, val);
        }
    };

    return(
        <div className="flex items-center space-x-2">
            {/*Min Input*/}
            <div className="relative flex-1">
                <input 
                    type="number"
                    placeholder="Min"
                    value={min ?? ''}
                    onChange={(e) => handleInputChange(e.target.value, 'min')}
                    className="w-full bg-paper border border-border-subtle rounded-md px-3 py-2 text-sm text-foreground focus:outline-none
                                focus:border-brand focus:ring-1 focus:ring-brand transition-all duration-200 placeholder-text-muted no-spiner
                               "
                /> 
            </div>

            <span className="text-zinc-500">-</span>

            {/*Max Input */}
            <div className="relative flex-1">
                <input 
                    type="number"
                    placeholder="Max"
                    value={max??''}
                    onChange={(e) => handleInputChange(e.target.value, 'max')}
                    className=" w-full big-zinc-800 border border-zinc-700 rounded-md 
                                px-3 py-2 text-sm text-zinc-200 
                                focus: outline-none focus:border-red-500 focus: ring-1 foucs: ring-red-500 
                                transition-all duration-200 
                                placeholder-zinc-500 no-spiner
                    "
            />
            </div>

            {/*Unit Label*/}
            {unit && (
                <span className="text-s text-zinc-500 font-medium w-3 text-right">
                    {unit}
                </span>
            )}
        </div>
    );
}