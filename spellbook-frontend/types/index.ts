export interface SpellMetaData{
    castingTime: number;
    duration: number;
    range: number;
    components: string[];
    isRitual: boolean;

}

export interface SpellResponseData{
    id: number;
    name: string;
    level: string;
    source: string;
    schoolOfMagic: string;
    rating: string;
    description: string;
    metaData: SpellMetaData;

};

export interface SpellSummary{
    id: number;
    name: string;
};
 
