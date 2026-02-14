import { SpellFilters as FilterType} from '../hooks/useSpellFilters';
import FilterAccordion from './FilterAccordion';
import SearchInput from './SearchInput';
import MultiSelectButtons from './MultiSelectButtons';
import RangeFilter from './RangeFilter';
import * as SpellConstants from '@/constants/spells';

interface SpellFilterProps{
    filters: FilterType;
    updateFilters: (key: keyof FilterType, value: any) => void;
    clearFilters: () => void;
    buildQueryString: () => string;
    onApply: ()=> void;
}

export default function SpellFilters({filters, updateFilters, clearFilters, buildQueryString, onApply}:SpellFilterProps){


    return(
        <div className="space-y-2 p-2">

            {/*Filters*/}
            <div className="mb-4">
                <label className="text-sm font-medium text-zinc-400 mb-1 block">Search Spell</label>
                <SearchInput 
                    inputValue={filters.spellName}
                    onChange={(val)=> updateFilters("spellName",val)}
                    onEnter={onApply}
                />
            </div>

            <FilterAccordion name="Level" isActive={(filters.level?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.levels]}
                    selectedValues={filters.level || []}
                    onChange={(vals) => updateFilters("level", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Action Type" isActive={(filters.actionType?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.actionTypes]}
                    selectedValues={filters.actionType || []}
                    onChange={(vals)=> updateFilters("actionType", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="School of Magic" isActive={(filters.schoolOfMagic?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.schoolsOfMagic]}
                    selectedValues={filters.schoolOfMagic || []}
                    onChange={(vals)=> updateFilters("schoolOfMagic", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="RPGBOT Rating" isActive={(filters.rating?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.ratings]}
                    selectedValues={filters.rating || []}
                    onChange={(vals)=> updateFilters("rating", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Casting Time (sec)" isActive={filters.minCastingTime !== undefined || filters.maxCastingTime !== undefined}>
                <RangeFilter
                    min={filters.minCastingTime}
                    max={filters.maxCastingTime}
                    unit="s"
                    onChange={(min,max)=> {
                        updateFilters("minCastingTime",min);
                        updateFilters("maxCastingTime",max);
                    }}
                />    
            </FilterAccordion> 

            <FilterAccordion name="Duration (sec)" isActive={filters.minDuration !== undefined || filters.maxDuration !== undefined}>
                <RangeFilter
                    min={filters.minDuration}
                    max={filters.maxDuration}
                    unit="s"
                    onChange={(min,max)=> {
                        updateFilters("minDuration",min);
                        updateFilters("maxDuration",max);
                    }}
                />
            </FilterAccordion>

            <FilterAccordion name="Components" isActive={(filters.components?.length || 0)>0 }>
                    <MultiSelectButtons
                        options={[...SpellConstants.components]}
                        selectedValues={filters.components || []}
                        onChange={(vals)=> updateFilters("components", vals)}
                    />
            </FilterAccordion>

            <FilterAccordion name="Range (ft)" isActive={filters.minRange !== undefined || filters.maxRange !== undefined }>
                <RangeFilter
                    min={filters.minRange}
                    max={filters.maxRange}
                    unit="ft"
                    onChange={(min,max)=> {
                        updateFilters("minRange",min);
                        updateFilters("maxRange",max);
                    }}
                />
            </FilterAccordion>

            <FilterAccordion name="Targets" isActive={filters.minTargets !== undefined || filters.maxTargets !== undefined}>
                <RangeFilter
                    min={filters.minTargets}
                    max={filters.maxTargets}
                    onChange={(min,max)=> {
                        updateFilters("minTargets",min);
                        updateFilters("maxTargets",max);
                    }}
                />
            </FilterAccordion>

            <FilterAccordion name="Target Relationship" isActive={(filters.targetRelationship?.length || 0)>0}>
                <MultiSelectButtons 
                    options={[...SpellConstants.targetRelationships]}
                    selectedValues={filters.targetRelationship || []}
                    onChange={(vals) => updateFilters("targetRelationship", vals)}
                />
            </FilterAccordion>
            
            <FilterAccordion name="Attack Type" isActive={(filters.attackType?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.attackTypes]}
                    selectedValues={filters.attackType || []}
                    onChange={(vals) => updateFilters("attackType", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Roll Type" isActive={(filters.rollType?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.rollTypes]}
                    selectedValues={filters.rollType || []}
                    onChange={(vals)=> updateFilters("rollType",vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Abilities" isActive={(filters.ability?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.abilities]}
                    selectedValues={filters.ability || []}
                    onChange={(vals)=> updateFilters("ability", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Average Damage" isActive={filters.minAverageDamage !== undefined || filters.maxAverageDamage !== undefined}>
                <RangeFilter
                    min={filters.minAverageDamage}
                    max={filters.maxAverageDamage}
                    onChange={(min,max) => {
                        updateFilters("minAverageDamage",min);
                        updateFilters("maxAverageDamage",max);
                    }}
                />
            </FilterAccordion>

            <FilterAccordion name="Damage Die" isActive={(filters.damageDie?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.damageDie]}
                    selectedValues={filters.damageDie || []}
                    onChange={(vals) => updateFilters("damageDie", vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Damage Type" isActive={(filters.damageType?.length || 0)>0}>
                <MultiSelectButtons
                    options={[...SpellConstants.damageType]}
                    selectedValues={filters.damageType || []}
                    onChange={(vals) => updateFilters("damageType",vals)}
                />
            </FilterAccordion>

            <FilterAccordion name="Conditions" isActive={(filters.conditions?.length || 0)>0}>
                <MultiSelectButtons 
                    options={[...SpellConstants.conditions]}
                    selectedValues={filters.conditions || []}
                    onChange={(vals) => updateFilters("conditions",vals)}
                />
            </FilterAccordion>
        
        </div>
    );
}
