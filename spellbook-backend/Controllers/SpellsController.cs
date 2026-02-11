using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spellbook_backend.Data;
using spellbook_backend.DTOs;
using spellbook_backend.Extensions;

namespace spellbook_backend.Controllers;

/// <summary>
/// The main API controller handling spell-related operations.
/// Exposes endpoints for searching, filtering and retrieving spell data.
/// </summary>
[ApiController]
[Route("api/[controller]")] //Maps to: api/spells
public class SpellsController : ControllerBase
{
    private readonly SpellbookContext _context;

    /// <summary>
    /// Initializes a new instance of <see cref="SpellController"/>
    /// </summary>
    public SpellsController(SpellbookContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves a paginated list of spells based on complex filter criteria.
    /// Supports filtering by class, level, school, tags and metadata (range, damage, etc.)
    /// </summary>
    /// <param name="filter">
    /// The filter parameters bound from the HTTP Query String.
    /// </param>
    /// <returns> A list of <see cref="SpellResponseDto"/> objects</returns>
    /// <response code="200">Returns the requested spells.</response>
    [HttpGet]
    public async Task<IActionResult> GetSpells([FromQuery] SpellFilterDto filter)
    {
        //1. Initialize Query (Deferred Execution)
        //We start with the full set of spells but do not execute any SQL yet/
        var query = _context.Spells.AsQueryable()
                    .ApplyFilters(filter) //Dynamically adds WHERE clauses
                    .OrderByName()
                    .ApplyPagination(filter.Page, filter.PageSize); // Adds OFFSET/LIMIT (page/page size)

        
        //2. Projection & Execution
        //Convert to DTO to select only necessary columns.
        //ToListAsync() triggers the actual SQL execution against the database.
        var results = await query
                .ProjectToDto(filter.SpellList)
                .ToListAsync();

        return Ok(results);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSpell(int id)
    {
        var spell = await _context.Spells
            .Include(s=> s.ClassSpells)
            .FirstOrDefaultAsync(s=> s.Id == id);
        
        if(spell == null){ return NotFound(); }

        return Ok(spell);
    }

    [HttpGet("by-name/{name}")]
    public async Task<IActionResult> GetSpellByName(string name, [FromQuery] string? spellList)
    {
        var spell = await _context.Spells
            .AsNoTracking()
            .Where(s=> s.Name.ToLower() == name.ToLower())
            .ProjectToDto(spellList)
            .FirstOrDefaultAsync();

            if(spell == null){ return NotFound($"Spell with name '{name} not found.");}
            return Ok(spell);
    }

    [HttpPost]
    public async Task<IActionResult> AddSpell([FromBody] CreateSpellDto data)
    {
        var newSpell = data.MapSpell();
        _context.Spells.Add(newSpell);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSpell), new {id=newSpell.Id}, newSpell);
    }
}