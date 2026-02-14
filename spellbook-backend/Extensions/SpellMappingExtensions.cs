using spellbook_backend.DTOs;
using spellbook_backend.Models;

namespace spellbook_backend.Extensions;

public static class SpellMappingExtensions
{ 
    public static Spell MapSpell(this CreateSpellDto req)
    {
        return new Spell{
            Name = req.Name,
            Level = req.Level,
            Source = req.Source,
            SchoolOfMagic = req.SchoolOfMagic,
            Description = req.Description,
            SpellLists = req.SpellLists.Select(sl => sl.ClassName).ToArray(),
            ClassSpells = req.SpellLists.Select(item => new ClassSpell
            {
                ClassName = item.ClassName,
                Rating = item.Rating
            }).ToList(),
            MetaData = new SpellMetaData
            {
                ActionType = req.ActionType,
                CastingTime = req.CastingTime,
                Duration = req.Duration,
                Range = req.Range,
                Components = req.Components ?? [],
                Targets = req.Targets,
                TargetRelationship = req.TargetRelationship ?? [],
                AttackType = req.AttackType ?? [],
                RollType = req.RollType ?? [],
                Ability = req.Ability ?? [],
                AverageDamage = req.AverageDamage,
                DamageDie = req.DamageDie ?? [],
                DamageType = req.DamageType ?? [],
                Conditions = req.Conditions ?? [],
                Materials = req.Materials
            } 
        };
    }
}
