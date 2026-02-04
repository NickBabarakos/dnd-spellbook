using spellbook_backend.DTOs;
using spellbook_backend.Models;

namespace spellbook_backend.Extensions;

public static class SpellMappingExtensions
{
    public static Spell MapSpell(this CreateSpellDto req)
    {
        return new Spell{
            Name = req.Name,
            SchoolOfMagic = req.SchoolOfMagic,
            Level = req.Level,
            Source = req.Source,
            Tags = req.Tags ?? [],
            IsRitual = req.IsRitual,
            Description = req.Description,
            ClassSpells = req.SpellLists.Select(item => new ClassSpell
            {
                ClassName = item.ClassName,
                Rating = item.Rating
            }).ToList(),
            MetaData = new SpellMetaData
            {
                CastingTime = req.CastingTime,
                Range = req.Range,
                Components = req.Components,
                AverageDamage = req.AverageDamage,
                DamageDie = req.DamageDie,
                Targets = req.Targets,
                TargetRelationship = req.TargetRelationship ?? [],
                Duration = req.Duration 
            } 
        };
    }
}
