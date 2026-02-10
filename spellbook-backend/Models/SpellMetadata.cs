namespace spellbook_backend.Models;
/// <summary>
/// Contains the technical statistics and mechanics of a spell.
/// Designed to be serialized as a JSON object within the Spell entity.
/// </summary>
public class SpellMetaData
{
    public string[] ActionType {get;set;} = [];
    public int CastingTime {get; set;} 
    public int Duration {get; set;}
    public int Range {get; set;}
    public string[] Components {get; set;} = [];
    public int? Targets {get; set;}
    public string?[] TargetRelationship {get; set;} = [];
    public string?[] AttackType {get; set;} = [];
    public string?[] RollType {get; set;} = [];
    public string?[] Ability {get; set;} = [];
    public int? AverageDamage {get; set;} 
    public string?[] DamageDie {get; set;} =[];
    public string?[] DamageType {get; set;} =[];
    public string?[] Conditions {get; set;} = [];
}