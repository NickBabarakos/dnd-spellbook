interface MultiSelectProps{
    options: string[];
    selectedValues: string[];
    onChange: (newValues: string[]) => void;
}

export default function MultiSelectButtons({options, selectedValues, onChange}: MultiSelectProps){
    
    const handleToggle = (option: string) => {
        if(selectedValues.includes(option)){
            const newValues = selectedValues.filter((item) => item !== option);
            onChange(newValues);
        } else{
            const newValues = [...selectedValues, option];
            onChange(newValues);
        }
    };

    return(
        <div className="flex flex-wrap gap-2">
            {options.map((option)=> {
                const isSelected = selectedValues.includes(option);

                return(
                    <button 
                        key={option}
                        onClick={()=> handleToggle(option)}
                        className={`px-3 py-1.5 rounded-md text-sx font-semibold transition-colors duration-200 border 
                                    ${isSelected 
                                      ? 'bg-brand text-white border-brand'                                                          //Selected
                                      : 'bg-paper-hover text-muted border-border-subtle hover:border-border-strong hover:text-bright' //Not Selected
                                    }
                            `}
                    >{option}</button>
                );
            })}
        </div>
    );
}