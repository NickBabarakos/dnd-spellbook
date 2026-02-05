export interface SpellMetaData{
    castingTime: number | null;
    range: number | null;
    components: string[];
    duration: number | null;

}

export interface SpellResponseData{
    id: number;
    name: string;
    schoolOfMagic: string;
    level: number;
    source: string;
    tags: string[];
    isRitual: boolean;
    rating: number;
    description: string;
    metaData: SpellMetaData;

};

export interface SpellSummary{
    id: number;
    name: string;
};

