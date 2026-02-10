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
    public static IQueryable<Spell> FilterBySpellList(this IQueryable<Spell> query, string spellList){
        if(string.IsNullOrEmpty(spellList)) {return query;}
        return query.Where(s=> s.SpellLists.Any(sl => sl.ToLower() == spellList.ToLower()));
    }
    public static IQueryable<Spell> FilterByName(this IQueryable<Spell> query, string? name)
    {
        if(string.IsNullOrEmpty(name)){ return query;}
        return query.Where(s=> s.Name.ToLower().Contains(name.ToLower()));
    }

    public static IQueryable<Spell> FilterByLevel(this IQueryable<Spell> query, string[]? level)
    {
        if(level == null || level.Length<=0) { return query;}
        return query.Where(s=> level.Contains(s.Level));
    }


    public static IQueryable<Spell> FilterBySchool(this IQueryable<Spell> query, string[]? schoolOfMagic)
    {
        if(schoolOfMagic == null || schoolOfMagic.Length<=0){ return query;}
        return query.Where(s=> schoolOfMagic.Contains(s.SchoolOfMagic));
    }


    // --- JSON Metadata Filters (Querying the JSONB column)---
    public static IQueryable<Spell> FilterByActionType (this IQueryable<Spell> query, string[]? actionType)
    {
        if(actionType == null || actionType.Length <=0) {return query;}
        return query.Where(s=> s.MetaData.ActionType != null && 
                               s.MetaData.ActionType.Any(t=> actionType.Contains(t)));
    }

    public static IQueryable<Spell> FilterMinCastingTime (this IQueryable<Spell> query, int? minCastingTime)
    {
        if(minCastingTime == null) { return query;}
        return query.Where(s=> s.MetaData.CastingTime >= minCastingTime);
    }

    public static IQueryable<Spell> FilterMaxCastingTime (this IQueryable<Spell> query, int? maxCastingTime){
        if(maxCastingTime == null) { return query;}
        return query.Where(s=> s.MetaData.CastingTime <= maxCastingTime);
    }
    public static IQueryable<Spell> FilterMinDuration(this IQueryable<Spell> query, int? minDuration){
        if(minDuration == null) {return query;}
        return query.Where(s=> s.MetaData.Duration >= minDuration);
    }

    public static IQueryable<Spell> FilterMaxDuration(this IQueryable<Spell> query, int? maxDuration)
    {
        if(maxDuration == null) {return query;}
        return query.Where(s=> s.MetaData.Duration <= maxDuration); 
    }
    public static IQueryable<Spell> FilterByComponents(this IQueryable<Spell> query, string[]? components){
        if(components == null || components.Length <= 0) {return query;}
        return query.Where(s => s.MetaData.Components != null &&
                                s.MetaData.Components.Any(t=> components.Contains(t)));
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
    public static IQueryable<Spell> FilterByTargetRelationship(this IQueryable<Spell> query, string[]? targetRelationship)
    {
        if(targetRelationship==null || targetRelationship.Length<=0) { return query;}
        return query.Where(s=> s.MetaData.TargetRelationship.Any(t=> targetRelationship.Contains(t)));
    }

    public static IQueryable<Spell> FilterByAttackType(this IQueryable<Spell> query, string[]? attackType)
    {
        if(attackType == null || attackType.Length<=0) {return query;}
        return query.Where(s=> s.MetaData.AttackType != null && 
                               s.MetaData.AttackType.Any(t=> attackType.Contains(t)));
    }

    public static IQueryable<Spell> FilterByRollType(this IQueryable<Spell> query, string[]? rollType){
        if(rollType == null || rollType.Length<=0) {return query;}
        return query.Where(s=> s.MetaData.RollType != null && 
                            s.MetaData.RollType.Any(t=> rollType.Contains(t)));
    }

    public static IQueryable<Spell> FilterByAbility(this IQueryable<Spell> query, string[]? ability){
        if(ability == null || ability.Length<=0) {return query;}
        return query.Where(s=> s.MetaData.Ability != null &&
                               s.MetaData.Ability.Any(t=> ability.Contains(t)));
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

    public static IQueryable<Spell> FilterByDamageDie(this IQueryable<Spell> query, string[]? damageDie){
        if(damageDie == null || damageDie.Length<=0) {return query;}
        return query.Where(s=> s.MetaData.DamageDie != null &&
                               s.MetaData.DamageDie.Any(t=> damageDie.Contains(t)));
            
    }

    public static IQueryable<Spell> FilterByDamageType(this IQueryable<Spell> query, string[]? damageType)
    {
        if(damageType == null || damageType.Length<=0) {return query;}
        return query.Where(s=> s.MetaData.DamageType != null && 
                               s.MetaData.DamageType.Any(t=> damageType.Contains(t)));
    }

    public static IQueryable<Spell> FilterByConditions(this IQueryable<Spell> query, string[]? conditions)
    {
        if(conditions == null || conditions.Length <=0) { return query;}
        return query.Where(s=> s.MetaData.Conditions != null &&
                               s.MetaData.Conditions.Any(t=> conditions.Contains(t)));
    }

    public static IQueryable<Spell> FilterByRating(this IQueryable<Spell> query, string[]? rating, string spellList)
    {
        if(rating == null || rating.Length <= 0) {return query;}
        return query.Where(s=> s.ClassSpells.Any(cs =>
                               cs.ClassName.ToLower() == spellList.ToLower() && 
                               rating.Contains(cs.Rating)
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
        if(pageSize<=0) pageSize=500;
        return query.Skip((page-1)*pageSize).Take(pageSize);
    }

    public static IQueryable<Spell> OrderByName(this IQueryable<Spell> query)
    {
        return query.OrderBy(s=>s.Name);
    }


    /// <summary>
    /// Master method that applies all filter criteria from the <see cref="SpellFilterDto"/>
    /// </summary>

    public static IQueryable<Spell> ApplyFilters (this IQueryable<Spell> query, SpellFilterDto filters)
    {
        return query
            .FilterBySpellList(filters.SpellList)
            .FilterByName(filters.SpellName)
            .FilterByLevel(filters.Level)
            .FilterBySchool(filters.SchoolOfMagic)
            // JSON Filters
            .FilterByActionType(filters.ActionType)
            .FilterMinCastingTime(filters.MinCastingTime)
            .FilterMaxCastingTime(filters.MaxCastingTime)
            .FilterMinDuration(filters.MinDuration)
            .FilterMaxDuration(filters.MaxDuration)
            .FilterByComponents(filters.Components)
            .FilterMinRange(filters.MinRange)
            .FilterMaxRange(filters.MaxRange)
            .FilterMinTargets(filters.MinTargets)
            .FilterMaxTargets(filters.MaxTargets)
            .FilterByTargetRelationship(filters.TargetRelationship)
            .FilterByAttackType(filters.AttackType)
            .FilterByRollType(filters.RollType)
            .FilterByAbility(filters.Ability)
            .FilterMinAverageDamage(filters.MinAverageDamage)
            .FilterMaxAverageDamage(filters.MaxAverageDamage)
            .FilterByDamageDie(filters.DamageDie)
            .FilterByDamageType(filters.DamageType)
            .FilterByConditions(filters.Conditions)
            // Relational Rating Filters
            .FilterByRating(filters.Rating, filters.SpellList);
    }
}