using Microsoft.EntityFrameworkCore;
using spellbook_backend.Models; 
namespace spellbook_backend.Data; 

/// <summary>
/// Represents the session with the database and acts as a Unit of Work.
/// Manages the entity configuration and the connection to the PostgreSQL database.
/// </summary>
public class SpellbookContext : DbContext
{
    /// <summary>
    /// Initializes a new Instance of the <see cref="SpellbookContext"/> class.
    /// Configured via Dependency Injection in Program.cs. 
    /// </summary>
    /// <param name="options">Configuration options (e.g. connection string, provider).</param>
    public SpellbookContext(DbContextOptions<SpellbookContext> options) : base(options)
    {
        
    }
    /// <summary>
    /// Represents the collection of Spells in the database.
    /// </summary>
    public DbSet<Spell> Spells { get; set;}
    /// <summary>
    /// Represents the join table linking Spells to Character Classes.
    /// </summary>
    public DbSet<ClassSpell> ClassSpells {get; set;}

    /// <summary>
    /// Configures the database model using the Fluent API.
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //-- JSON Column Configuration ---
        //Configures 'SpellMetaData' as an Owned Entity stored as a JSONB column
        //within the 'Spells' table, rather than a separate table.
        // Requires PostgreSQL 9.4+ and Npqsql provider.
        modelBuilder.Entity<Spell>()
            .OwnsOne(spell => spell.MetaData, builder =>
            {
                builder.ToJson();
            });
        
        //--Relationships---
        //Defines a One-to-Many relationship between Spell and ClassSpell.
        modelBuilder.Entity<Spell>()
            .HasMany(s=>s.ClassSpells) 
            .WithOne()                      // Unidirectional relationship (Classpell has no navigation property to Spell)
            .HasForeignKey(cs => cs.SpellId) 
            .IsRequired(); 

        //--- Database Indexes (Performance Optimization) --

        //Index on Foreign Key to speed up JOIN operations.
        modelBuilder.Entity<ClassSpell>()
            .HasIndex(cs => cs.SpellId);
        
        //Index to optimize queries filtering by specific Class
        modelBuilder.Entity<ClassSpell>()
            .HasIndex(cs=> cs.ClassName);
        
        //Composite Index to optimize sorting by Rating within a specific Class.
        modelBuilder.Entity<ClassSpell>()
            .HasIndex(cs=> new{ cs.ClassName, cs.Rating});
    }    
    
}

