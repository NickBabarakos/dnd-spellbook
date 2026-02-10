using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace spellbook_backend.Models;

/// <summary>
/// Represents a spell in the system.
/// This is the primary entity stored in the "Spells" database table.
/// </summary>

public class Spell 
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public string Level {get; set;} = string.Empty;
    public string Source {get; set;} = string.Empty;
    public string SchoolOfMagic {get; set;} = string.Empty;
    public string[] SpellLists {get; set;} = [];
    public string Description {get; set;} = string.Empty;
    public SpellMetaData MetaData {get; set;} = new();
    public ICollection<ClassSpell> ClassSpells {get;set;} = [];
}