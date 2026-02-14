function getTimeText(seconds: number): string{
    if(seconds < 60) return `${seconds} seconds`;

    if(seconds<3600){
        const mins = Math.floor(seconds/60);
        return `${mins} Minutes${mins > 1 ? 's' : ''}`;
    }

    if(seconds < 86400){
        const hours = Math.floor(seconds/3600);
        return `${hours} Hour${hours > 1? 's': ''}`;
    }

    const days = Math.floor(seconds/86400);
    return `${days} Day${days > 1 ? 's' : ''}`;
}

export function formatCastingTime(seconds: number):string{
    if(seconds === 0) return "Bonus Action";
    if(seconds === 6) return "1 Action";

    return getTimeText(seconds);
}

export function formatRange(range: number):string{
    if(range === 0) return "Self";
    if(range === 5) return "Self(5ft)";
    return `${range} ft`; 
}

export function formatDuration(seconds: number):string{
    if(seconds === 0) return "Instantaneous";
    if(seconds === 18) return "1 Round";
    return getTimeText(seconds);
}