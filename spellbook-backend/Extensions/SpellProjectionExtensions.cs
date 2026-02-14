using spellbook_backend.DTOs;
using spellbook_backend.Models;

namespace spellbook_backend.Extensions;

/// <summary>
/// Provides extension methods to project database entities into Data Transfer Objects (DTOs).
/// Ensures that only the necessary data fields are retrieved from the database, optimizing network traffic and performance.
/// </summary>
public static class SpellProjectionExtensions
{
    public static IQueryable<SpellResponseDto> ProjectToDto(this IQueryable<Spell> query, string? spellList)
    {
        // The .Select() method translates to the SQL SELECT clause.
        return query.Select(s=> new SpellResponseDto
        {
            Id = s.Id,
            Name = s.Name,
            Level = s.Level,
            Source = s.Source,
            SchoolOfMagic = s.SchoolOfMagic,
            //Conditional Projection based in external parameter (spellList). 
            Ratings = s.ClassSpells 
                .Where(cs => string.IsNullOrEmpty(spellList) || cs.ClassName.ToLower() == spellList.ToLower())
                .Select(cs => new ClassRatingResponseDto
                {
                    ClassName = cs.ClassName,
                    Rating = cs.Rating
                }).ToList(),

            Description = s.Description,
            //Maps the internal domain model (SpellMetaData) to the public API model (SpellMetaDataResponseDto)
            MetaData = new SpellMetaDataResponseDto
            {
                CastingTime = s.MetaData.CastingTime,
                Range = s.MetaData.Range,
                Components = s.MetaData.Components, 
                Duration = s.MetaData.Duration,
                IsRitual = s.MetaData.ActionType != null && s.MetaData.ActionType.Contains("Ritual"),
                Materials = s.MetaData.Materials ?? string.Empty
            }
        });
    }

    public static IQueryable<SpellSummaryDto> ProjectToSummaryDto(this IQueryable<Spell> query)
    {
        return query.Select(s => new SpellSummaryDto
        {
            Id = s.Id,
            Name = s.Name
        });
    }
}