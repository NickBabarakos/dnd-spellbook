using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace spellbook_backend.DTOs;

public class CreateSpellDto
{
    [Required]
    [MaxLength(100)]
    public string Name {get; set;} = string.Empty;
    [Required]
    public string Level {get; set;} = string.Empty;
    [Required]
    [MaxLength(100)]
    public string Source {get; set;} = string.Empty;
    [Required]
    [MaxLength(100)]
    public string SchoolOfMagic {get; set;} = string.Empty;
    [Required]
    public string Description {get; set;} = string.Empty;
    [Required]
    [MinLength(1, ErrorMessage = "A spell must belong to at least one class.")]
    public List<CreateClassRatingDto> SpellLists {get; set;} = [];
    [Required]
    public string[] ActionType {get; set;} = [];
    [Required]
    public int CastingTime {get; set;}
    [Required]
    public int Duration {get; set;}
    [Required]
    public int Range {get; set;}
    public string[]? Components {get; set;} = [];
    public int? Targets {get; set;}
     public string?[] TargetRelationship {get; set;} = [];
    public string?[] AttackType {get; set;} = [];
    public string?[] RollType {get; set;} = [];
    public string?[] Ability {get; set;} = [];
    public int? AverageDamage {get; set;} 
    public string?[] DamageDie {get; set;} =[];
    public string?[] DamageType {get; set;} =[];
    public string?[] Conditions {get; set;} = [];
    public string? Materials {get; set;}
  
}

public class CreateClassRatingDto
{
    public string ClassName {get; set; } = string.Empty;
    public string Rating {get; set;} = string.Empty;
}

