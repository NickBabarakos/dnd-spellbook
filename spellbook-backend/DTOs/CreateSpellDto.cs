using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace spellbook_backend.DTOs;

public class CreateSpellDto
{
    [Required]
    [MaxLength(100)]
    public string Name {get; set;} = string.Empty;
    [Required]
    [MaxLength(100)]
    public string SchoolOfMagic {get; set;} = string.Empty;
    [Required]
    public int Level {get; set;}
    [Required]
    [MaxLength(100)]
    public string Source {get; set;} = string.Empty;
    public string[]? Tags {get; set;} = [];
    [Required]
    public bool IsRitual {get; set;} = false;
    [Required]
    [MinLength(1, ErrorMessage = "A spell must belong to at least one class.")]
    public List<CreateClassRatingDto> SpellLists {get; set;} = [];
    [Required]
    public string Description {get; set;} = string.Empty;
    [Required]
    public int Range {get; set;}
    public int? Targets {get; set;}
    public string[]? DamageDie {get; set;} = [];
    [Required]
    public string[] Components {get; set;} = [];
    [Required]
    public int CastingTime {get; set;} 
    public int? AverageDamage {get; set;}
    public string[]? TargetRelationship {get; set;} = [];
    [Required]
    public int Duration {get; set;}
  
}

public class CreateClassRatingDto
{
    public string ClassName {get; set; } = string.Empty;
    public int Rating {get; set;} 
}
