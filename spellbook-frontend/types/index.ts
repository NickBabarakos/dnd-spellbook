export interface SpellMetaData{
    castingTime: number;
    duration: number;
    range: number;
    components: string[];
    isRitual: boolean;
    materials: string;
}

export interface ClassRating{
    className: string;
    rating: string;
}

export interface SpellResponseData{
    id: number;
    name: string;
    level: string;
    source: string;
    schoolOfMagic: string;
    ratings: ClassRating[];
    description: string;
    metaData: SpellMetaData;

};

export interface SpellSummary{
    id: number;
    name: string;
};
 
export interface sortConfig{
    key: keyof SpellResponseData | string;
    direction: 'asc' | 'desc' | null;
}