namespace spellbook_backend.DTOs;

/// <summary>
/// Represents a simplified view of a Spell, optimized for API responses.
/// Hides database-specific implementation details.
/// </summary>
public record SpellResponseDto
{
    public int Id { get; init;}
    public string Name {get; init;} = string.Empty;
    public string SchoolOfMagic {get; init;} = string.Empty;
    public int Level {get; init;}
    public string Source {get; init;} = string.Empty;
    public string[] Tags {get; init;} = [];
    public bool IsRitual { get; init;}
    /// <summary>
    /// The rating of the spell specifically for the requested Class.
    /// returns 0 if no Class context was given
    /// </summary>
    public int Rating {get; init;}
    public string Description{get; init; } = string.Empty;
    /// <summary>
    /// Detailed mechanics (Range, Casting Time, etc.) flattened from the internal JSON structure.
    /// </summary>
    public SpellMetaDataResponseDto MetaData {get; init;} = new();
}

public class SpellMetaDataResponseDto
{
    public int? CastingTime{get; init;}
    public int? Range {get; init;}
    public string[] Components {get; init;} = [];
    public int? Duration {get; init;}
}