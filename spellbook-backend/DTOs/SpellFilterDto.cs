namespace spellbook_backend.DTOs;

/// <summary>
/// Contains all supported filter parameters for querying the spell database.
/// Values are bound from the HTTP Query String (e.g., ?level=3&schoolOfMagic=evocation).
/// </summary>
public class SpellFilterDto
{
    /// <summary>
    /// Search by partial spell name (case-insensitive)
    /// </summary>
    public string? Name {get; set;}

    /// <summary>
    /// Filter by one or more schools (e.g. "evocation", "necromancy").
    /// </summary>
    public string[]? SchoolOfMagic {get; set;} 
    
    /// <summary>
    /// Filter by spell level (0=Cantrip, 1-9)
    /// </summary>
    public int[]? Level {get; set;}

    /// <summary>
    /// Filter by source book (e.g PHB, Tasha)
    /// </summary>
    public string[]? Source {get; set;} 

    /// <summary>
    /// The character class context (e.g. "wizard", "cleric").
    /// Critical for calculating the correct Rating for the spells.
    /// </summary>
    public string SpellList {get; set;} = string.Empty; 

    /// <summary>
    /// Filter by tags (e.g. "fire", "healing")
    /// </summary>
    public string[]? Tags {get; set;} //All the tags

    public bool? IsRitual {get; set;}

    //---MetaData Filters (JSON)---
    public int? MinCastingTime {get; set;}
    public int? MaxCastingTime {get; set;}
    public int? MinRange {get; set;}
    public int? MaxRange{get; set;}
    public int? MinAverageDamage {get; set;}
    public int? MaxAverageDamage {get; set;}
    public string[]? DamageDie {get; set;}
    public int? MinTargets {get; set;}
    public int? MaxTargets {get; set;}
    public string[]? TargetRelationship {get; set;}
    public int? MinDuration {get; set;}
    public int? MaxDuration {get; set;}

    //---Rating Filters---
    /// <summary>
    /// Minimum rating values (1-4). Requires 'SpellList' to be set.
    /// </summary>
    public int? MinRating {get; set;}
    public int? MaxRating{get; set;}

    //---Pagination & Sorting---
    /// <summary>
    /// The page number to retrieve (Default: 1)
    /// </summary>
    public int Page {get; set;}

    /// <summary>
    /// Number of items per page (Default: 20)
    /// </summary>
    public int PageSize{get; set;}

    /// <summary>
    /// Field to sort by (e.g. "name", "level", "rating").
    /// </summary>
    public string? SortBy{get; set;}
    /// <summary>
    /// Sort direction: "asc" (ascending) or "desc" (descending).
    /// </summary>
    public string? SortOrder{get; set;}
}