using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace spellbook_backend.Models;

/// <summary>
/// Represents a spell in the system.
/// This is the primary entity stored in the "Spells" database table.
/// </summary>

public class Spell
{
    /// <summary>
    /// The unique identifier for the spell (Primary Key)
    /// </summary>
    public int Id {get; set;}
    /// <summary>
    /// The Official name of the Spell (e.g. Acid Splash)
    /// </summary>
    public string Name {get; set;}  = string.Empty;
    /// <summary>
    /// The School of Magic the spells belongs to (e.g. Evocation, Necromancy)
    /// </summary>
    public string SchoolOfMagic {get; set;} = string.Empty;
    /// <summary>
    /// The power level of the Spell.
    /// <value> 0 for Cantrips, 1-9 for leveled spells </value>
    /// </summary>
    public int Level {get; set;} 
    /// <summary>
    /// The source book for reference document (e.g. "Player's Handbook")
    /// </summary>
    public string Source {get; set;} = string.Empty;
    /// <summary>
    /// A collection of keywords associated with the spell for quick filtering.
    /// Stored as a PostgreSQL Array.
    /// </summary>
    public string[] Tags {get; set;} = [];
    /// <summary>
    /// Indicates if the spell can be cast as a ritual (taking longer time but consuming no spell slot)
    /// </summary>
    public bool IsRitual {get; set;} 
    /// <summary>
    /// The full text description of the spell's effects.
    /// </summary>
    public string Description {get; set;} = string.Empty;
    /// <summary>
    /// Detailed statistical data about the spell (Casting Time, Range, Damage)
    /// <remarks>
    /// This property is mapped to a JSONB column in the database, not a separate table
    /// </remarks>
    /// </summary>
    public SpellMetaData MetaData {get; set;} = new();
    /// <summary>
    /// Navigation Property: The relationship between this spell and the character classes (Wizard, Cleric, etc.) that can learn it.
    /// One Spell can be available to multiple Classes.
    /// </summary>
    public ICollection<ClassSpell> ClassSpells {get; set;} = []; //Νεα Navigation Property: Ένα Spell μπορεί να έχει πολλές καταχωρητήσεις ClassSpell

}