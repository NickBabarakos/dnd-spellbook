namespace spellbook_backend.Models;
/// <summary>
/// Contains the technical statistics and mechanics of a spell.
/// Designed to be serialized as a JSON object within the Spell entity.
/// </summary>
public class SpellMetaData
{
    /// <summary>
    /// Time required to cast the spell (in seconds: 0=Bonus Action, 6=Actions, 60=1 Minute)
    /// </summary>
    public int? CastingTime {get; set;} 
    /// <summary>
    /// The maximum distances (in ft) the spell effect can reach.
    /// </summary>
    public int? Range {get; set;}
    /// <summary>
    /// The required components: V (Verbal), S (Somatic), M (Material)
    /// </summary>
    public string[] Components {get; set;} = [];
    /// <summary>
    /// The estimated average damage output of the spell (useful for sorting by damage)
    /// </summary>
    public int? AverageDamage {get; set;}
    /// <summary>
    /// The dice notation for damage (e.g. ["d6"]).
    /// </summary>
    public string[]? DamageDie {get; set;}
    /// <summary>
    /// The number of distinct targets the spell can affect.
    /// </summary>
    public int? Targets {get; set;}
    /// <summary>
    /// Defines who the spell targets (eg. "Enemy", "Ally", "Self").
    /// </summary>
    public string[] TargetRelationship {get; set;}=[];
    /// <summary>
    /// The duration of the spell in seconds.
    /// </summary>
    public int? Duration{get; set;}

}