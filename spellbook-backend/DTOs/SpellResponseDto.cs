namespace spellbook_backend.DTOs;

/// <summary>
/// Represents a simplified view of a Spell, optimized for API responses.
/// Hides database-specific implementation details.
/// </summary>
public record SpellResponseDto
{
    public int Id { get; init;}
    public string Name {get; init;} = string.Empty;
    public string Level {get; init;} = string.Empty;
    public string Source {get; init;} = string.Empty;
    public string SchoolOfMagic {get; init;} = string.Empty;
    public List<ClassRatingResponseDto> Ratings {get; set;} = [];
    public string Description{get; init; } = string.Empty;
    public SpellMetaDataResponseDto MetaData {get; init;} = new();
}

public class SpellMetaDataResponseDto
{
    public int CastingTime{get; init;}
    public int Duration {get; init;}
    public int Range {get; init;}
    public string[] Components {get; init;} = [];
    public bool IsRitual {get; set;}
    public string Materials {get; set;} = string.Empty;
}

public class ClassRatingResponseDto
{
    public string ClassName {get; init; } = string.Empty;
    public string Rating {get; init; } = string.Empty;
}

public class SpellSummaryDto
{
    public int Id {get; init;}
    public string Name {get; init;} = string.Empty;
}