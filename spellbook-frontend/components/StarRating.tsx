import React from "react";

interface StarRatingProps{
    rating: string;
}

export default function StarRating({rating}: StarRatingProps){
    const starCount = parseInt(rating);

    if(isNaN(starCount) || starCount <1) return null;

    const getColorClass = (count : number) => {
        switch(count) {
            case 1: return "text-star-1";
            case 2: return "text-star-2";
            case 3: return "text-star-3";
            case 4: return "text-star-4";
            default: return "text-muted";
        }
    };

    const colorClass= getColorClass(starCount);

    return(
        <div className="flex items-center gap-1" title={rating}>
            {[...Array(starCount)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-4 h-5 fill-current ${colorClass}`}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"/>

                </svg>
            ))}
        </div>
    );
}