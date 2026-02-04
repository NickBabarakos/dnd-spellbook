using spellbook_backend.DTOs;
using spellbook_backend.Models;

namespace spellbook_backend.Extensions;

/// <summary>
/// Provides extension methods for <see cref="IQueryable{Spell}"/> to dynamically build database queries.
/// Allows filtering, sorting, and pagination logic to be chained in a clean and readable manner.
/// </summary>
public static class SpellQueryExtensions
{
    // --- Basic Filters ---
    /// <summary>
    /// Filters spells by name using a case-insensitive search.
    /// </summary>
    /// <param name="query">The current queryable object.</param>
    /// <param name="name">The search term. If null or empty, no filter is applied.</param>
    public static IQueryable<Spell> FilterByName(this IQueryable<Spell> query, string? name)
    {
        if(string.IsNullOrEmpty(name)){ return query;}
        return query.Where(s=> s.Name.ToLower().Contains(name.ToLower()));
    }

    /// <summary>
    /// Filters spells that belong to any of the specified schools of magic.
    /// </summary>
    public static IQueryable<Spell> FilterBySchool(this IQueryable<Spell> query, string[]? schoolOfMagic)
    {
        if(schoolOfMagic == null || schoolOfMagic.Length<=0){ return query;}
        return query.Where(s=> schoolOfMagic.Contains(s.SchoolOfMagic));
    }

    /// <summary>
    /// Filters spells based on their level (0=Cantrip, 1-9)
    /// </summary>
    public static IQueryable<Spell> FilterByLevel (this IQueryable<Spell> query, int[]? level)
    {
        if(level == null || level.Length<=0) { return query;}
        return query.Where(s=> level.Contains(s.Level));
    }

    /// <summary>
    /// Filters spells based on their source book (e.g. PHB, Tasha's)
    /// </summary>
    public static IQueryable<Spell> FilterBySource (this IQueryable<Spell> query, string[]? source)
    {
        if(source==null || source.Length<=0) {return query;}
        return query.Where(s=> source.Contains(s.Source));
    }

    /// <summary>
    /// Filters spells that contain at least one of the specified tags.
    /// </summary>
    public static IQueryable<Spell> FilterByTags (this IQueryable<Spell> query, string[]? tags)
    {
        if(tags==null || tags.Length<=0) { return query;}
        return query.Where(s=> s.Tags.Any(t => tags.Contains(t)));
    }

    /// <summary>
    /// Filters spells based on their Ritual status.
    /// </summary>
    public static IQueryable<Spell> FilterIsRitual (this IQueryable<Spell> query, bool? isRitual)
    {
        if(isRitual == null){ return query;}
        return query.Where(s=> isRitual == s.IsRitual);
    }

    // --- JSON Metadata Filters (Querying the JSONB column)---

    /// <summary>
    /// Filters spells with a casting time greater than, lesser than or equal to the specified value.
    /// Queries the JSON 'Metadata' Column
    /// </summary>
    public static IQueryable<Spell> FilterMinCastingTime (this IQueryable<Spell> query, int? minCastingTime)
    {
        if(minCastingTime == null) { return query;}
        return query.Where(s=> s.MetaData.CastingTime >= minCastingTime);
    }

    public static IQueryable<Spell> FilterMaxCastingTime (this IQueryable<Spell> query, int? maxCastingTime)
    {
        if(maxCastingTime == null) { return query;}
        return query.Where(s=> s.MetaData.CastingTime <= maxCastingTime);
    }

    public static IQueryable<Spell> FilterMinRange (this IQueryable<Spell> query, int? minRange)
    {
        if(minRange == null) { return query;}
        return query.Where(s=> s.MetaData.Range >= minRange);
    } 

    public static IQueryable<Spell> FilterMaxRange (this IQueryable<Spell> query, int? maxRange)
    {
        if(maxRange == null) { return query;}
        return query.Where(s=> s.MetaData.Range <= maxRange);
    }

    public static IQueryable<Spell> FilterMinAverageDamage (this IQueryable<Spell> query, int? minAverageDamage)
    {
        if(minAverageDamage == null) { return query;}
        return query.Where(s=> s.MetaData.AverageDamage >= minAverageDamage);
    }

    public static IQueryable<Spell> FilterMaxAverageDamage(this IQueryable<Spell> query, int? maxAverageDamage)
    {
        if(maxAverageDamage == null) {return query;}
        return query.Where(s=> s.MetaData.AverageDamage <= maxAverageDamage);
    }

       public static IQueryable<Spell> FilterMinTargets(this IQueryable<Spell> query, int? minTargets)
    {
        if(minTargets  == null){ return query;}
        return query.Where(s=> s.MetaData.Targets >= minTargets);
    }

    public static IQueryable<Spell> FilterMaxTargets(this IQueryable<Spell> query, int? maxTargets)
    {
        if(maxTargets == null){return query;}
        return query.Where(s=> s.MetaData.Targets <= maxTargets);
    }

        public static IQueryable<Spell> FilterMinDuration(this IQueryable<Spell> query, int? minDuration)
    {
        if(minDuration == null) {return query;}
        return query.Where(s=> s.MetaData.Duration >= minDuration);
    }

    public static IQueryable<Spell> FilterMaxDuration(this IQueryable<Spell> query, int? maxDuration)
    {
        if(maxDuration == null) {return query;}
        return query.Where(s=> s.MetaData.Duration <= maxDuration); 
    }

    /// <summary>
    /// Filters based on the damage dice type (e.g "d6", "d8").
    /// Checks inside the JSON array within the Metadata column.
    /// </summary>
    public static IQueryable<Spell> FilterDamageDie(this IQueryable<Spell> query, string[]? damageDie)
    {
        if(damageDie == null || damageDie.Length<=0) {return query;}
        return query.Where(s=> s.MetaData.DamageDie != null &&
                               s.MetaData.DamageDie.Any(t=> damageDie.Contains(t)));
            
    }

    public static IQueryable<Spell> FilterTargetRelationship(this IQueryable<Spell> query, string[]? targetRelationship)
    {
        if(targetRelationship==null || targetRelationship.Length<=0) { return query;}
        return query.Where(s=> s.MetaData.TargetRelationship.Any(t=> targetRelationship.Contains(t)));
    }
    
    //--- Relational Filters (One-to-Many ClassSpells)---
    /// <summary>
    /// Filters spells available to a specific Class (e.g. Wizard)
    /// </summary>
    public static IQueryable<Spell> FilterByClass (this IQueryable<Spell> query, string? spellList)
    {
        if(string.IsNullOrEmpty(spellList)) { return query;}
        return query.Where(s => s.ClassSpells.Any(cs => cs.ClassName.ToLower() == spellList.ToLower()));
    }


    /// <summary>
    /// Filters spells with a minimum/maximum rating for a specific Class.
    /// Required 'spellList' to be provided to  contextually check the rating.
    /// </summary>
    public static IQueryable<Spell> FilterByMinRating(this IQueryable<Spell> query, int? minRating, string spellList)
    {
        if(minRating == null || string.IsNullOrEmpty(spellList)) {return query;}
        return query.Where(s=> s.ClassSpells.Any(cs=> 
                            cs.ClassName.ToLower() == spellList.ToLower() &&
                            cs.Rating >= minRating
        ));
    }

    public static IQueryable<Spell> FilterByMaxRating (this IQueryable<Spell> query, int? maxRating, string spellList)
    {
        if(maxRating == null || string.IsNullOrEmpty(spellList)) {return query;}
        return query.Where(s=> s.ClassSpells.Any(cs=>
                                cs.ClassName.ToLower() == spellList.ToLower() &&
                                cs.Rating <= maxRating
        ));
    }

    //--- Core Logic ---
    /// <summary>
    /// Applies pagination logic (Skip/Take) to the query.
    /// Defaults to Page 1 and PageSize 20 if invalid values are provided.
    /// </summary>
    public static IQueryable<Spell> ApplyPagination(this IQueryable<Spell> query, int page, int pageSize)
    {
        if(page <=0) page=1;
        if(pageSize<=0) pageSize=20;
        return query.Skip((page-1)*pageSize).Take(pageSize);
    }


    /// <summary>
    /// Master method that applies all filter criteria from the <see cref="SpellFilterDto"/>
    /// </summary>

    public static IQueryable<Spell> ApplyFilters (this IQueryable<Spell> query, SpellFilterDto filters)
    {
        return query
            .FilterByName(filters.Name)
            .FilterByClass(filters.SpellList)
            .FilterBySchool(filters.SchoolOfMagic)
            .FilterByLevel(filters.Level)
            .FilterBySource(filters.Source)
            .FilterByTags(filters.Tags)
            .FilterIsRitual(filters.IsRitual)
            // JSON Filters
            .FilterMinCastingTime(filters.MinCastingTime)
            .FilterMaxCastingTime(filters.MaxCastingTime)
            .FilterMinRange(filters.MinRange)
            .FilterMaxRange(filters.MaxRange)
            .FilterMinAverageDamage(filters.MinAverageDamage)
            .FilterMaxAverageDamage(filters.MaxAverageDamage)
            .FilterDamageDie(filters.DamageDie)
            .FilterMinTargets(filters.MinTargets)
            .FilterMaxTargets(filters.MaxTargets)
            .FilterTargetRelationship(filters.TargetRelationship)
            .FilterMinDuration(filters.MinDuration)
            .FilterMaxDuration(filters.MaxDuration)
            // Relational Rating Filters
            .FilterByMinRating(filters.MinRating, filters.SpellList)
            .FilterByMaxRating(filters.MaxRating, filters.SpellList);
        
    }

    /// <summary>
    /// Applies dynamic sorting based on the requested field and order (ASC/DESC)
    /// Handles complex sorting logic for 'Rating' which depends on the selected Class.
    /// </summary>
    public static IQueryable<Spell> ApplySorting(this IQueryable<Spell> query, SpellFilterDto filter)
    {
        bool isDesc = !string.IsNullOrEmpty(filter.SortOrder) && filter.SortOrder.ToLower() == "desc";
        string sortBy = string.IsNullOrEmpty(filter.SortBy) ? "name" : filter.SortBy.ToLower();

        switch (sortBy)
        {
            case "level":
                return isDesc 
                    ? query.OrderByDescending(s=> s.Level).ThenBy(s=> s.Name)
                    : query.OrderBy(s=> s.Level).ThenBy(s=> s.Name);
            case "rating":
            //If no class is selected, we cannot sort by rating. Fallback to sorting by name.
                if (string.IsNullOrEmpty(filter.SpellList))
                {
                    return query.OrderBy(s=>s.Name);
                }
                //Sort by the rating of the specific class using a subquery select.
                if (isDesc)
                {
                    return query
                        .OrderByDescending(s=> s.ClassSpells
                            .Where(cs=> cs.ClassName.ToLower() == filter.SpellList.ToLower())
                            .Select(cs => cs.Rating)
                            .FirstOrDefault())
                        .ThenBy(s=> s.Name);
                }
                else
                {
                    return query 
                        .OrderBy(s=> s.ClassSpells
                            .Where(cs => cs.ClassName.ToLower() == filter.SpellList.ToLower())
                            .Select(cs => cs.Rating)
                            .FirstOrDefault())
                        .ThenBy(s=> s.Name);
                }
                case "name":
                default:
                    return isDesc 
                        ? query.OrderByDescending(s=> s.Name)
                        : query.OrderBy(s=> s.Name);
            
        }
    }

}