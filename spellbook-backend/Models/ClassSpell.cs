namespace spellbook_backend.Models;

/// <summary>
/// A joining entity that links a Spell to a specific Character Class (e.g. Wizard).
/// Allows extending the relationship with extra data like "Rating"
/// </summary>
public class ClassSpell
{
    /// <summary>
    /// Primary Key for this specific association.
    /// </summary>
    public int Id {get; set;} 
    /// <summary>
    /// Foreign Key: Points to the Spell.
    /// </summary>
    public int SpellId {get; set;} 
    /// <summary>
    /// The name of the class that has access to this spell (e.g. "Wizard").
    /// Acts as a logical Foreign Key/ Grouping Identifier.
    /// </summary>
    public string ClassName {get; set;} = string.Empty;
    /// <summary>
    /// A custom rating (1-4) indicating how good this spell is for this specific class (from the Website RPGBOT)
    /// </summary>
    public string Rating {get; set;} = string.Empty;
}