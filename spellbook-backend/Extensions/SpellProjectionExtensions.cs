using spellbook_backend.DTOs;
using spellbook_backend.Models;

namespace spellbook_backend.Extensions;

/// <summary>
/// Provides extension methods to project database entities into Data Transfer Objects (DTOs).
/// Ensures that only the necessary data fields are retrieved from the database, optimizing network traffic and performance.
/// </summary>
public static class SpellProjectionExtensions
{
    /// <summary>
    /// Transform the generic <see cref="Spell"/> query into a specific <see cref="SpellResponseDto"/> query.
    /// This method generates a SQL SELECT statement that retrieves only the required columns.  
    /// </summary>
    /// <param name="query">The source queryable of Spell entities.</param>
    /// <param name="spellList">
    /// The specific character class (e.g. "Wizard") context.
    /// Used to calculate the correct 'Rating' for the spell within that class's context.
    /// </param>
    /// <returns>An <see cref="IQueryable{SpellResponseDto}"/> ready for execution</returns>
    public static IQueryable<SpellResponseDto> ProjectToDto(this IQueryable<Spell> query, string? spellList)
    {
        // The .Select() method translates to the SQL SELECT clause.
        return query.Select(s=> new SpellResponseDto
        {
            Id = s.Id,
            Name = s.Name,
            SchoolOfMagic = s.SchoolOfMagic,
            Level = s.Level,
            Source = s.Source,
            Tags = s.Tags,
            IsRitual = s.IsRitual,
            //Conditional Projection based in external parameter (spellList). 
            Rating = string.IsNullOrEmpty(spellList)
                        ? 0
                        : s.ClassSpells
                            .Where(cs => cs.ClassName.ToLower() == spellList.ToLower())
                            .Select(cs => cs.Rating)
                            .FirstOrDefault(),
            Description = s.Description,
            //Maps the internal domain model (SpellMetaData) to the public API model (SpellMetaDataResponseDto)
            MetaData = new SpellMetaDataResponseDto
            {
                CastingTime = s.MetaData.CastingTime,
                Range = s.MetaData.Range,
                Components = s.MetaData.Components, 
                Duration = s.MetaData.Duration
            }
        });
    }
}