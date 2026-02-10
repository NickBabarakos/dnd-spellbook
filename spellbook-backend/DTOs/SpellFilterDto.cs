namespace spellbook_backend.DTOs;

/// <summary>
/// Contains all supported filter parameters for querying the spell database.
/// Values are bound from the HTTP Query String (e.g., ?level=3&schoolOfMagic=evocation).
/// </summary>
public class SpellFilterDto
{
    public string? SpellName {get; set;} = string.Empty; 
    public string SpellList {get; set;} = string.Empty; 
    public string[]? Level {get; set;} 
    public string[]? ActionType {get; set;} 
    public string[]? SchoolOfMagic {get; set;} 
    public string[]? Rating {get; set;}
    public int? MinCastingTime {get; set;} 
    public int? MaxCastingTime {get; set;} 
    public int? MinDuration {get; set;} 
    public int? MaxDuration {get; set;} 
    public string[]? Components {get; set;} 
    public int? MinRange {get; set;} 
    public int? MaxRange {get; set;} 
    public int? MinTargets {get; set;} 
    public int? MaxTargets {get; set;} 
    public string[]? TargetRelationship {get; set;} 
    public string[]? AttackType {get; set;} 
    public string[]? RollType {get; set;} 
    public string[]? Ability {get; set;} 
    public int? MinAverageDamage {get; set;} 
    public int? MaxAverageDamage {get; set;} 
    public string[]? DamageDie {get; set;} 
    public string[]? DamageType {get; set;} 
    public string[]? Conditions {get; set;}
    public int Page {get; set;} = 1;
    public int PageSize {get; set;} = 500;
}